import axios from 'axios';
import { QueryClient } from 'react-query';
import { apiClient } from './api_base_url';



const queryClient = new QueryClient();

export { queryClient };

export async function getItems() {
  const response = await apiClient.get('/items');
  return response.data;
}

export async function createItem(itemData) {
  // console.log("Item data to be sent:", itemData); // agregamos este console log para ver si esta mandando los datos necesarios
  const response = await apiClient.post('/items', itemData);
  return response.data;
}

export const updateItem = async (item_id, itemData) => {
  try {
    const response = await apiClient.put(`/items/${item_id}`, itemData);
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

export async function getSingleItem(item_id) {
  const response = await apiClient.get(`/items/${item_id}`);
  // console.log("getSingleItem response:", response);
  return response.data;
}



