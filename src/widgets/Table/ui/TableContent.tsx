import { LoaderCircle } from 'lucide-react';
import { HTTPErrorAlert } from '../../../shared/ui/HTTPErrorAlert';
import { TableHeader } from './TableHeader';
import type { IData } from '../model/constants';
import { TableRow } from './TableRow';
import './TableContent/style/index.css';

interface ITableContentProps {
  isLoading: boolean;
  errorMessage: string | null;
  rows: IData[];
  onRetry: () => void;
  onRowSelect: (row: IData) => void;
  widths: number[];
  onResizeStart: (columnIndex: number) => (event: React.MouseEvent) => void;
}

export const TableContent: React.FC<ITableContentProps> = ({
  isLoading,
  errorMessage,
  rows,
  onRetry,
  onRowSelect,
  widths,
  onResizeStart,
}) => {
  if (isLoading) {
    return (
      <div className='tableLoader'>
        <LoaderCircle className='tableLoaderIcon' />
      </div>
    );
  }

  if (errorMessage) {
    return <HTTPErrorAlert message={errorMessage} onRetry={onRetry} />;
  }

  return (
    <div className='scrollWrap'>
      <table className='tableContentTable'>
        <TableHeader widths={widths} onResizeStart={onResizeStart} />

        <tbody>
          {rows.map((row, rowIndex) => (
            <TableRow key={`${row.email}-${rowIndex}`} row={row} onSelect={onRowSelect} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
