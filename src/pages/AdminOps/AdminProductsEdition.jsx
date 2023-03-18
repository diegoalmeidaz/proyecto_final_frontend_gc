import React, { useState, useEffect } from 'react';
import { onGetItems, onCreateItem, onUpdateItem } from '../../core/products';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminProducts = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '', published: false });
  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const response = await onGetItems();
    setItems(response.data.items);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setNewItem({ ...newItem, [name]: checked });
  };

  const addItem = async (event) => {
    event.preventDefault();
    await onCreateItem(newItem);
    setNewItem({ name: '', price: '', published: false });
    loadItems();
  };

  const toggleItemPublished = async (item) => {
    const updatedItem = { ...item, published: !item.published };
    await onUpdateItem(updatedItem);
    loadItems();
  };

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="max-w-screen-md mx-auto px-4">
      <h1 className="text-3xl font-semibold">Administrar productos</h1>

      <form className="my-4" onSubmit={addItem}>
        <div className="flex flex-col mb-4">
          <label className="text-lg font-semibold mb-1" htmlFor="name">
            Nombre del producto
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="py-2 px-3 border border-gray-300 rounded"
            placeholder="Nombre del producto"
            value={newItem.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex flex-col mb-4">
          <label className="text-lg font-semibold mb-1" htmlFor="price">
            Precio
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="py-2 px-3 border border-gray-300 rounded"
            placeholder="Precio"
            value={newItem.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="published"
            name="published"
            className="mr-2"
            checked={newItem.published}
            onChange={handleCheckboxChange}
          />
          <label className="text-lg font-semibold" htmlFor="published">
            Publicado
          </label>
        </div>

        <button
          type="submit"
          className="py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded"
        >
          Agregar producto
        </button>
      </form>

      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="border rounded-lg px-4 py-2 flex justify-between items-center"
          >
            <div>
              {item.name} - {item.price} - Publicado: {item.published ? 'Sí' : 'No'}
            </div>
            <button
              onClick={() => toggleItemPublished(item)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              {item.published ? 'No publicar' : 'Publicar'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProducts;
