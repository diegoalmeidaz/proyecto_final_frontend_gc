import { useItems } from '../core/hooks';
import { BarLoader } from 'react-spinners';
import axios from 'axios';
import { apiClient } from '../core/api_base_url';

export default function LoggedItemsContainer() {
  const getProducts = useItems();
  const products = getProducts.data?.products ?? [];

  const like = async (id) => {
    await axios.put(`http://localhost:8000/items/like/${id}`);
    getProducts.refetch();
  };

  if (getProducts.isLoading) {
    return (
      <div className="flex w-75">
        <BarLoader height={8} width="100%" />
      </div>
    );
  }

  return (
    <div className="w-75">
      <div className="flex flex-wrap product-grid pt2">
        {products.map((product) => {
          return (
            <div key={product.name} className="w-100 w-50-l ph3">
              <a className="link black hover-light-purple" href="/t">
                <div className="flex flex-column h-100">
                  <img
                    style={{ objectFit: 'cover', height: '420px' }}
                    alt=""
                    loading="lazy"
                    className="img flex-auto bg-gray"
                    src={product.src}
                  />

                  <div className="pt3 pb5 flex flex-column">
                    <b className="mb1">{product.name}</b>
                    <i className="mb3 gray">{product.color.join(', ')}</i>
                    <p className="ma0 b black">${product.price / 100}</p>
                  </div>
                  <div>
                    <i
                      onClick={() => like(product.id)}
                      className={`fa-heart fa-xl ${
                        product.likes ? 'text-red-500' : 'text-gray-400'
                      }`}
                    ></i>
                    <span className="ms-1">{product.likes}</span>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
