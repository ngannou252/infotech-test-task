import { useEffect, useRef, useState } from 'react';
import './style/index.css';

interface ICustomSelectProps<T extends string | number> {
  label?: string;
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  options: T[];
}

export function CustomSelect<T extends string | number>({
  label,
  value,
  setValue,
  options,
}: ICustomSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='customSelectContainer' ref={containerRef}>
      {label ? <label className='customSelectLabel'>{label}</label> : null}
      <button
        className='customSelectTrigger'
        type='button'
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        {value}
        <span className={`customSelectArrow ${isOpen ? 'open' : ''}`}>▾</span>
      </button>

      {isOpen ? (
        <ul className='customSelectDropdown'>
          {options.map((option) => (
            <li key={option}>
              <button
                className={`customSelectOption ${option === value ? 'selected' : ''}`}
                type='button'
                onClick={() => {
                  setValue(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
