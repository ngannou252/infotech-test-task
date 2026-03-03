import type React from 'react';
import './style/index.css';

interface IInputFieldProps<T extends string | number> {
  label?: string;
  placeholder?: string;
  value?: T;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

export function InputField<T extends string | number>({ placeholder = '', value, onChange, disabled = false }: IInputFieldProps<T>) {
  return (
    <div className='inputWrapper'>
      <input placeholder={placeholder} value={value} onChange={onChange} disabled={disabled} />
    </div>
  );
}
