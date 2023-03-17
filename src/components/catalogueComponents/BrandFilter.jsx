import { useState } from 'react';
import { useItems } from '../../core/hooks';
import { getUniqueValues } from '../../core/utils';
import CollapsibleList from './CollapsibleList';
import FilterToggle from './FilterToggle';
import { useSearchParams } from 'react-router-dom';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';

export default function BrandFilter() {
  const [search, setSearch] = useSearchParams();
  const filteredBrands = search.get('brands')?.split(',') ?? [];
  const [brands, setBrands] = useState(filteredBrands);
  const getItems = useItems();
  const items = getItems.data?.products ?? [];
  const allBrands = getUniqueValues(items, 'brand');
  const groupedItems = allBrands
    .map((brand) => ({
      label: brand,
      name: brand,
      value: brand,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
  const onBrandChange = (brand) => (checked) => {
    let _brands = brands.slice();

    if (checked) {
      _brands.push(brand);
    } else {
      _brands = _brands.filter((_brand) => _brand !== brand);
    }

    setBrands(_brands);
  };
  const hasFilters = filteredBrands.length > 0;

  return (
    <CollapsibleList
      defaultVisible={hasFilters}
      title="Marca"
      actionButton={
        <FilterToggle
          visible={brands.length > 0}
          active={hasFilters}
          onApply={() => {
            search.set('brands', brands.join(','));
            setSearch(search, {
              replace: true,
            });
          }}
          onClear={() => {
            search.delete('brands');
            setBrands([]);
            setSearch(search, {
              replace: true,
            });
          }}
        />
      }
    >
      {groupedItems.map((field, key) => (
        <li key={key} className="pv2">
          <div className="flex items-center">
            <Checkbox.Root
              id={field.name}
              name={field.name}
              onCheckedChange={onBrandChange(field.value)}
              checked={brands.includes(field.value)}
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
