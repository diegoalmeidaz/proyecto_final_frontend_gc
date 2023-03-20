import axios from 'axios';
import { QueryClient } from 'react-query';

const apiClient = axios.create({
  baseURL: "http://localhost:8000/",
});

const queryClient = new QueryClient();

export { apiClient, queryClient };

export async function getItems() {
  const response = await apiClient.get('/items');
  return response.data;
}

export async function createItem(itemData) {
  console.log("Item data to be sent:", itemData); // agregamos este console log para ver si esta mandando los datos necesarios
  const response = await apiClient.post('/items', itemData);
  return response.data;
}

export const updateItem = async (item_id, itemData) => {
  try {
    const response = await axios.put(`http://localhost:8000/items/${item_id}`, itemData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    throw error;
  }
};

export async function deleteItem(itemId) {
  const response = await apiClient.delete(`/items/${itemId}`);
  return response.data;
}

export async function getSingleItem(itemId) {
  const response = await apiClient.get(`/items/${itemId}`);
  return response.data;
}
