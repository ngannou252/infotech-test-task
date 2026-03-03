import { CustomSelect } from '../../CustomSelect';
import { FiltersMenu, SortControls, type SingleFilter, type SortBy, type SortFields } from '../../Filters';
import './TableToolbar/style/index.css';

interface ITableToolbarProps {
  itemsPerPage: number;
  pageOptions: number[];
  sortField: SortFields | '';
  sortBy: SortBy;
  filter: SingleFilter;
  onItemsPerPageChange: React.Dispatch<React.SetStateAction<number>>;
  onSortFieldChange: (field: SortFields | '') => void;
  onSortByChange: (sortBy: SortBy) => void;
  onFilterFieldChange: (field: SortFields | '') => void;
  onFilterValueChange: (value: string) => void;
  onResetFilters: () => void;
}

export const TableToolbar: React.FC<ITableToolbarProps> = ({
  itemsPerPage,
  pageOptions,
  sortField,
  sortBy,
  filter,
  onItemsPerPageChange,
  onSortFieldChange,
  onSortByChange,
  onFilterFieldChange,
  onFilterValueChange,
  onResetFilters,
}) => {
  return (
    <div className='tableToolbar'>
      <div className='tableToolbarControls'>
        <CustomSelect label='Items per page' value={itemsPerPage} setValue={onItemsPerPageChange} options={pageOptions} />

        <SortControls sortField={sortField} sortBy={sortBy} onSortFieldChange={onSortFieldChange} onSortByChange={onSortByChange} />
      </div>

      <FiltersMenu
        filter={filter}
        onFilterFieldChange={onFilterFieldChange}
        onFilterValueChange={onFilterValueChange}
        onReset={onResetFilters}
      />
    </div>
  );
};
