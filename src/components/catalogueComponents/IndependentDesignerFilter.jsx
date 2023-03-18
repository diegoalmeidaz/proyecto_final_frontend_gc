import CollapsibleList from './CollapsibleList';
import { useState } from 'react';
import { useItems } from '../../core/hooks';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { useSearchParams } from 'react-router-dom';
import FilterToggle from './FilterToggle';

export default function IndependentDesignerFilter() {
  const [search, setSearch] = useSearchParams();
  const independentDesigner = search.get('independentDesigner') === 'true';
  const [isChecked, setIsChecked] = useState(independentDesigner);
  const getItems = useItems();

  const onIndependentDesignerChange = (checked) => {
    setIsChecked(checked);
  };

  const hasFilter = independentDesigner;
  return (
    <CollapsibleList
      defaultVisible={hasFilter}
      title={<span>Diseñador<br />Independiente</span>}
      actionButton={
        <FilterToggle
          visible={isChecked}
          active={hasFilter}
          onApply={() => {
            search.set('independentDesigner', isChecked);
            setSearch(search, {
              replace: true,
            });
          }}
          onClear={() => {
            search.delete('independentDesigner');
            setIsChecked(false);
            setSearch(search, {
              replace: true,
            });
          }}
        />
      }
    >
      <li className="pv2">
        <div className="flex items-center">
          <Checkbox.Root
            id="independentDesigner"
            name="independentDesigner"
            onCheckedChange={onIndependentDesignerChange}
            checked={isChecked}
            className="checkbox lh-solid flex items-center justify-center pa0 bg-white w125 h125 br2 bn"
          >
            <Checkbox.Indicator>
              <CheckIcon className="checkbox__icon w125 h125" />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <label htmlFor="independentDesigner" className="ml3 fw5 f5">
            Diseñador Independiente
          </label>
        </div>
      </li>
    </CollapsibleList>
  );
}
