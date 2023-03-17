import React, { useState, useEffect } from 'react';
import { onGetItems, onCreateItem, onUpdateItem } from '../core/products';
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
    <div>
      <h1>Administrar productos</h1>

      <form onSubmit={addItem}>
        <input
          type="text"
          name="name"
          placeholder="Nombre del producto"
          value={newItem.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={newItem.price}
          onChange={handleInputChange}
          required
        />
        <label>
          Publicado:
          <input
            type="checkbox"
            name="published"
            checked={newItem.published}
            onChange={handleCheckboxChange}
          />
        </label>
        <button type="submit">Agregar producto</button>
      </form>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price} - Publicado: {item.published ? 'Sí' : 'No'}
            <button onClick={() => toggleItemPublished(item)}>
              {item.published ? 'No publicar' : 'Publicar'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProducts;
