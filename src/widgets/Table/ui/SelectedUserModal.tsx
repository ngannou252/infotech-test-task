import { DATA_FIELDS, type IData, type DataKey } from '../model/constants';
import './SelectedUserModal/style/index.css';

interface ISelectedUserModalProps {
  selectedRow: IData;
  onClose: () => void;
}

export const SelectedUserModal: React.FC<ISelectedUserModalProps> = ({ selectedRow, onClose }) => {
  return (
    <div className='modalOverlay' onClick={onClose}>
      <div className='modalContent' onClick={(event) => event.stopPropagation()}>
        <div className='modalHeader'>
          <h3>User details</h3>
          <button type='button' className='modalCloseButton' onClick={onClose}>
            ✕
          </button>
        </div>

        <div className='modalBody'>
          {DATA_FIELDS.map((field: DataKey) => (
            <div className='modalRow' key={field}>
              <span className='modalLabel'>{field}</span>
              <span>{selectedRow[field]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
