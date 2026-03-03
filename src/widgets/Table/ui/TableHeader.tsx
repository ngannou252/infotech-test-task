import { DATA_FIELDS, type DataKey } from '../model/constants';
import './TableHeader/style/index.css';

interface ITableHeaderProps {
  widths: number[];
  onResizeStart: (columnIndex: number) => (event: React.MouseEvent) => void;
}

export const TableHeader: React.FC<ITableHeaderProps> = ({ widths, onResizeStart }) => {
  return (
    <>
      <colgroup>
        {widths.map((width, index) => (
          <col key={index} width={width === 0 ? undefined : width} />
        ))}
      </colgroup>

      <thead>
        <tr>
          {DATA_FIELDS.map((key: DataKey, index: number) => (
            <th key={key} className='tableHeadCell'>
              <div className='tableHeadInner'>{key}</div>

              <div className='tableHeadBorder'></div>

              <span
                onMouseDown={onResizeStart(index)}
                onClick={(event) => event.preventDefault()}
                className='tableResizeHandle'
              />
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
};
