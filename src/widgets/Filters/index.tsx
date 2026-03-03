import { useEffect, useRef, useState } from 'react';
import './style/index.css';
import { Menu } from 'lucide-react';
import { CustomSelect } from '../CustomSelect';
import { InputField } from '../InputField';
import type { SortOrder, UserSortableField } from '../../entities/user/model/types';

export type SortBy = SortOrder;
export type SortFields = UserSortableField;

export interface SingleFilter {
  field: SortFields | '';
  value: string;
}

const SORT_OPTIONS: SortBy[] = ['No Sort', 'Ascend', 'Descend'];
const SORT_FIELDS: SortFields[] = ['firstName', 'lastName', 'maidenName', 'age', 'gender', 'phone'];

interface ISortControlsProps {
  sortField: SortFields | '';
  sortBy: SortBy;
  onSortFieldChange: (field: SortFields | '') => void;
  onSortByChange: (order: SortBy) => void;
}

interface IFiltersMenuProps {
  filter: SingleFilter;
  onFilterFieldChange: (field: SortFields | '') => void;
  onFilterValueChange: (value: string) => void;
  onReset: () => void;
}

export function SortControls({ sortField, sortBy, onSortFieldChange, onSortByChange }: ISortControlsProps) {
  return (
    <div className='filtersGrid'>
      <CustomSelect
        label='Sort field'
        value={sortField || 'No Sort'}
        setValue={(value) => {
          const nextValue = typeof value === 'function' ? value(sortField || 'No Sort') : value;
          onSortFieldChange(nextValue === 'No Sort' ? '' : (nextValue as SortFields));
        }}
        options={['No Sort', ...SORT_FIELDS]}
      />
      <CustomSelect
        label='Sort order'
        value={sortBy}
        setValue={(value) => onSortByChange(typeof value === 'function' ? value(sortBy) : value)}
        options={SORT_OPTIONS}
      />
    </div>
  );
}

export function FiltersMenu({ filter, onFilterFieldChange, onFilterValueChange, onReset }: IFiltersMenuProps) {
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
    <>
      <button type='button' className='filterMenuButton' onClick={() => setIsOpen(true)}>
        <Menu className='filterMenuIcon' />
      </button>

      {isOpen ? (
        <div className='filtersModalOverlay' onClick={() => setIsOpen(false)}>
          <div className='filtersModalContent' onClick={(event) => event.stopPropagation()} ref={containerRef}>
            <div className='filtersModalHeader'>
              <h3>Filters</h3>
              <button type='button' className='filterMenuButton' onClick={() => setIsOpen(false)}>
                ✕
              </button>
            </div>
            <div className='filtersModalBody'>
              <CustomSelect
                label='Filter field'
                value={filter.field || 'No Filter'}
                setValue={(value) => {
                  const nextValue = typeof value === 'function' ? value(filter.field || 'No Filter') : value;
                  onFilterFieldChange(nextValue === 'No Filter' ? '' : (nextValue as SortFields));
                }}
                options={['No Filter', ...SORT_FIELDS]}
              />

              <label key='filter-value' className='filterInputLabel'>
                Filter value
                <InputField
                  value={filter.value}
                  onChange={(event) => onFilterValueChange(event.target.value)}
                  placeholder='Type to filter'
                  disabled={!filter.field}
                />
              </label>

              <button type='button' className='filterResetButton' onClick={onReset}>
                Reset filters and sorting
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
