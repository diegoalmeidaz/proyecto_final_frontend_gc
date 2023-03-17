import CollapsibleList from './CollapsibleList';
import { getUniqueValues } from '../../core/utils';
import { useState } from 'react';
import { useItems } from '../../core/hooks';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { useSearchParams } from 'react-router-dom';
import FilterToggle from './FilterToggle';

export default function SizeFilters() {
  const [search, setSearch] = useSearchParams();
  const filteredSizes = search.get('sizes')?.split(',') ?? [];
  const [sizes, setSizes] = useState(filteredSizes);
  const getItems = useItems();
  const items = getItems.data?.products ?? [];
  const allSizes = getUniqueValues(items, 'size');

  const groupedItems = allSizes
    .map((size) => ({
      label: size,
      name: size,
      value: size,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
  const onSizeChange = (size) => (checked) => {
    let _sizes = sizes.slice();

    if (checked) {
      _sizes.push(size);
    } else {
      _sizes = _sizes.filter((_size) => _size !== size);
    }

    setSizes(_sizes);
  };
  const hasFilters = filteredSizes.length > 0;
  return (
    <CollapsibleList
      defaultVisible={hasFilters}
      title="Talla"
      actionButton={
        <FilterToggle
          visible={sizes.length > 0}
          active={hasFilters}
          onApply={() => {
            search.set('sizes', sizes.join(','));
            setSearch(search, {
              replace: true,
            });
          }}
          onClear={() => {
            search.delete('sizes');
            setSizes([]);
            setSearch(search, {
              replace: true,
            });
          }}
        />
      }
    >

{groupedItems
        .filter((f) => {
          if (filteredSizes.length === 0) {
            return true;
          }

          return filteredSizes.includes(f.value);
        })
        .map((field, key) => (
          <li key={key} className="pv2">
            <div className="flex items-center">
              <Checkbox.Root
                id={field.name}
                name={field.name}
                disabled={hasFilters}
                onCheckedChange={onSizeChange(field.value)}
                checked={sizes.includes(field.value)}
                className="checkbox lh-solid flex items-center justify-center pa0 bg-white w125 h125 br2 bn"
              >
                <Checkbox.Indicator>
                  <CheckIcon className="checkbox__icon w125 h125" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label htmlFor={field.name} className="ml3 fw5 f5">
                {field.label}
              </label>
            </div>
          </li>
        ))}
    </CollapsibleList>
  );
}

