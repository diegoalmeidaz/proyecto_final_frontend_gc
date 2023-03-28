import { useItems } from '../../core/hooks';
import { BarLoader } from 'react-spinners';
import { useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Context from '../../context/Context';
import { formatPrice } from '../../core/utils';

export default function ItemsContainer() {
  const getProducts = useItems();
  const items = getProducts.data?.products ?? [];
  const [search] = useSearchParams();

  const { addedItem } = useContext(Context);
  const navigate = useNavigate();

  const filteredColors = search.get('colors')?.split(',') ?? [];
  const maxPrice = parseFloat(search.get('price') ?? 0);
  const independentDesigner = search.get('independentDesigner') === 'true';

  let filteredItems = [];

  if (items.length) {
    filteredItems = items.filter((item) => {
      if (!item.availability) return false;
      if (independentDesigner && !item.independent_designer_dress) return false;
      if (filteredColors.length && !filteredColors.includes(item.color)) return false;
      if (maxPrice && item.price > maxPrice) return false;

      return true;
    });
  }
  if (getProducts.isLoading) {
    return (
      <div className="flex w-75">
        <BarLoader height={8} width="100%" />
      </div>
    );
  }

  return (
    <div className="w-75 mx-auto items-container">
      <div className="flex flex-wrap product-grid pt2 justify-center items-center">
        {filteredItems.map((item) => {
          return (
            <div key={item.item_id} className="w-100 w-50-l ph3 mb-mobile">
              <div className="link black hover-light-purple">
                <div className="flex flex-column h-100">
                  <img
                    style={{ objectFit: 'cover', height: '420px' }}
                    alt=""
                    loading="lazy"
                    className="img flex-auto bg-gray flex justify-center items-center"
                    src={item.src}
                  />

                  <div className="pt3 pb5 flex flex-column">
                    <b className="mb1">{item.name}</b>
                    <i className="mb3 gray">{item.short_description}</i>
                    <span>Marca: {item.brand}</span>
                    <span>Talla: {item.size}</span>
                    <span>Color: {item.color}</span>
                    

                    <p className="ma0 b black">Precio Arriendo: {formatPrice(item.price)}</p>
                  </div>

                  <div className="flex flex-col justify-center items-center space-y-4">
                    <div className="w-50">
                      <button
                        className="w-full bg-pink-100 hover:bg-pink-200 text-red-500 font-bold py-2 px-4 rounded"
                        onClick={() => navigate(`/detail/${item.item_id}`)}
                      >
                        Ver Mas
                      </button>
                    </div>
                    <div className="w-50">
                      <button
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mb-20"
                        onClick={() => addedItem(item)}
                      >
                        Añadir
                      </button>
                      <hr className='mb-5'/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
