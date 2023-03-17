import { useContext } from 'react';
import Context from '../context/Context';

const Wishlist = () => {
  const { wishlist, removeItem } = useContext(Context);

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Mi Wishlist</h2>

      {wishlist.length === 0 && (
        <p className="text-gray-500 text-center">Aún no has agregado ningún producto a tu wishlist</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {wishlist.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />

            <div className="p-4">
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-gray-700 mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <button
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded"
                  onClick={() => removeItem(item.id)}
                >
                  Eliminar
                </button>
                <p className="font-bold text-xl">${item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
