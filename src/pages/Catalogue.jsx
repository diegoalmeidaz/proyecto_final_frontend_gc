import { useMemo, useState } from 'react';
import SearchBar from '../components/catalogueComponents/SearchBar';
import Select from '../components/Select';
import { useItems } from '../core/hooks';
import ItemsContainer from '../components/catalogueComponents/ItemsContainer';
import { useSearchParams } from 'react-router-dom';
import ColorFilters from '../components/catalogueComponents/ColorFilters';
import PriceFilter from '../components/catalogueComponents/PriceFilter';
import SizeFilters from '../components/catalogueComponents/SizeFilters';
import BrandFilter from '../components/catalogueComponents/BrandFilter';
import IndependentDesignerFilter from '../components/catalogueComponents/IndependentDesignerFilter';


export default function Root() {
  const [search, setSearch] = useSearchParams();
  const getItems = useItems();
  const items = useMemo(() => getItems.data?.products ?? [], [getItems.data]);
  const itemCounts = useMemo(
    () =>
      items.reduce((initial, item) => {
        if (!isNaN(initial[item.category])) {
          initial[item.category] += 1;
        } else {
          initial[item.category] = 1;
        }

        return initial;
      }, {}),
    [items],
  );
  const maxPrice = (getItems.data?.maxPrice ?? 0);

  const [filtersVisible, setFiltersVisible] = useState(false);
  

  return (
    <div className="mw9 center ph4 bg-white min-vh-100 br bl b--light-gray">
      <div className="flex bb b--black-10 justify-between items-center mb4">
        <h1>Vestidos</h1>

        <button
          className="lg:hidden btn bn fw5 pa2 pv2 w-100 tl bg-white hover-light-purple rounded"
          onClick={() => setFiltersVisible(!filtersVisible)}
        >
          Filtros
        </button>
      </div>

      <div className="flex">
        <div
          className={`w-25 mr4 ${
            filtersVisible ? 'block' : 'hidden lg:block'
          }`}
          style={{
            position: 'sticky',
            top: '20px',
            backgroundColor: filtersVisible ? 'white' : 'transparent',
            zIndex: filtersVisible ? '10' : '0',
          }}
        >
          <div>
            <ul className="list pa0 ma0 pb3 bb b--black-10">
              <li className="f6 fw5 silver mb2">
                <div className="flex justify-between">
                  Filtros
                  <span>{items.length} Products</span>
                </div>
              </li>
              <li>
                <button className="btn bn fw5 pa0 pv2 w-100 tl bg-transparent hover-light-purple flex justify-between">
                  Vestidos
                  <span>{itemCounts['Vestidos'] ?? 0}</span>
                </button>
              </li>
              <li>
                <button className="btn bn fw5 pa0 pv2 w-100 tl bg-transparent hover-light-purple flex justify-between">
                  Zapatos
                  <span>{itemCounts['Zapatos'] ?? 0}</span>
                </button>
              </li>
              <li>
                <button className="btn bn fw5 pa0 pv2 w-100 tl bg-transparent hover-light-purple flex justify-between">
                  Accesorios
                  <span>{itemCounts['Accesorios'] ?? 0}</span>
                </button>
              </li>
            </ul>

            <SearchBar />

            <ColorFilters />

            <SizeFilters />

            <BrandFilter />

            <IndependentDesignerFilter/>

            <PriceFilter maxPrice={maxPrice} />
          </div>
        </div>

        <ItemsContainer />
      </div>
    </div>
  );
}
