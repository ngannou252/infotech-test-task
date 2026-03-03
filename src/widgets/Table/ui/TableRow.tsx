import { memo } from 'react';
import { DATA_FIELDS, type IData, type DataKey } from '../model/constants';
import './TableRow/style/index.css';

interface ITableRowProps {
  row: IData;
  onSelect: (row: IData) => void;
}

const TableRowComponent = ({ row, onSelect }: ITableRowProps) => {
  return (
    <tr className='tableBodyRow' onClick={() => onSelect(row)}>
      {DATA_FIELDS.map((key: DataKey) => (
        <td key={`${row.email}-${key}`} className='tableBodyCell'>
          {row[key]}
        </td>
      ))}
    </tr>
  );
};

function areRowsEqual(prevProps: ITableRowProps, nextProps: ITableRowProps) {
  return prevProps.row === nextProps.row && prevProps.onSelect === nextProps.onSelect;
}

export const TableRow = memo(TableRowComponent, areRowsEqual);

TableRow.displayName = 'TableRow';
