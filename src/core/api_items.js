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

export async function updateItem(itemId, itemData) {
  const response = await apiClient.put(`/items/${itemId}`, itemData);
  return response.data;
}

export async function deleteItem(itemId) {
  const response = await apiClient.delete(`/items/${itemId}`);
  return response.data;
}
