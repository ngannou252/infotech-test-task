import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './style/index.css';
import { TablePagination } from '../TablePagination';
import { type SingleFilter, type SortBy, type SortFields } from '../Filters';
import { getUsers } from '../../entities/user/api/usersApi';
import { DATA_FIELDS, PAGE_OPTIONS, type IData } from './model/constants';
import { useColumnResize } from './model/useColumnResize';
import { TableToolbar } from './ui/TableToolbar';
import { TableContent } from './ui/TableContent';
import { SelectedUserModal } from './ui/SelectedUserModal';

export interface ITableProps {
  data?: IData[];
}

export const Table: React.FC<ITableProps> = ({ data = [] }) => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(25);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedRow, setSelectedRow] = useState<IData | null>(null);
  const [sortField, setSortField] = useState<SortFields | ''>('');
  const [sortBy, setSortBy] = useState<SortBy>('No Sort');
  const [filter, setFilter] = useState<SingleFilter>({ field: '', value: '' });
  const [rows, setRows] = useState<IData[]>(data);
  const [totalItems, setTotalItems] = useState<number>(data.length);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reloadAttempt, setReloadAttempt] = useState<number>(0);

  const requestIdRef = useRef<number>(0);

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const normalizedCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (normalizedCurrentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visibleRows = useMemo(() => rows, [rows]);
  const { widths, startResize } = useColumnResize(DATA_FIELDS.length);

  const handleItemsPerPageChange: React.Dispatch<React.SetStateAction<number>> = (value) => {
    const nextValue = typeof value === 'function' ? value(itemsPerPage) : value;
    setItemsPerPage(nextValue);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSortField('');
    setSortBy('No Sort');
    setFilter({ field: '', value: '' });
    setCurrentPage(1);
  };

  const handleSelectRow = useCallback((row: IData) => {
    setSelectedRow(row);
  }, []);

  useEffect(() => {
    const skip = (normalizedCurrentPage - 1) * itemsPerPage;
    const currentRequestId = requestIdRef.current + 1;
    const abortController = new AbortController();

    requestIdRef.current = currentRequestId;

    queueMicrotask(() => {
      if (requestIdRef.current === currentRequestId) {
        setErrorMessage(null);
        setIsLoading(true);
      }
    });

    void getUsers({
      limit: itemsPerPage,
      skip,
      sortField: sortField || null,
      sortOrder: sortBy,
      filterField: filter.field || null,
      filterValue: filter.value,
      signal: abortController.signal,
    })
      .then((response) => {
        if (requestIdRef.current !== currentRequestId) {
          return;
        }

        setRows(response.users);
        setTotalItems(response.total);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        if (requestIdRef.current === currentRequestId) {
          console.log(error);
          setErrorMessage(error instanceof Error ? error.message : 'Unexpected error. Please try again.');
        }
      })
      .finally(() => {
        if (requestIdRef.current === currentRequestId) {
          setIsLoading(false);
        }
      });

    return () => {
      abortController.abort();
    };
  }, [itemsPerPage, normalizedCurrentPage, sortField, sortBy, filter.field, filter.value, reloadAttempt]);

  return (
    <>
      <TableToolbar
        itemsPerPage={itemsPerPage}
        pageOptions={PAGE_OPTIONS}
        sortField={sortField}
        sortBy={sortBy}
        filter={filter}
        onItemsPerPageChange={handleItemsPerPageChange}
        onSortFieldChange={(field) => {
          setSortField(field);
          setCurrentPage(1);
        }}
        onSortByChange={(order) => {
          setSortBy(order);
          setCurrentPage(1);
        }}
        onFilterFieldChange={(field) => {
          setFilter((prevState) => ({ ...prevState, field, value: field ? prevState.value : '' }));
          setCurrentPage(1);
        }}
        onFilterValueChange={(value) => {
          setFilter((prevState) => ({ ...prevState, value }));
          setCurrentPage(1);
        }}
        onResetFilters={handleResetFilters}
      />

      <div className='tableWrap'>
        <TableContent
          isLoading={isLoading}
          errorMessage={errorMessage}
          rows={visibleRows}
          onRetry={() => setReloadAttempt((attempt) => attempt + 1)}
          onRowSelect={handleSelectRow}
          widths={widths}
          onResizeStart={startResize}
        />
      </div>

      <TablePagination
        totalItems={totalItems}
        normalizedCurrentPage={normalizedCurrentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        setCurrentPage={setCurrentPage}
      />

      {selectedRow && <SelectedUserModal selectedRow={selectedRow} onClose={() => setSelectedRow(null)} />}
    </>
  );
};
