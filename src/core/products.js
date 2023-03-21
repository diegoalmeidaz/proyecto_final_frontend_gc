import { apiClient } from './api_base_url';

export async function onGetItems() {
  const response = await apiClient.get('/items');
  return response.data;
}

export async function onCreateItem(itemData) {
  const response = await apiClient.post('/items', itemData);
  return response.data;
}

export async function onUpdateItem(itemData) {
  const response = await apiClient.put(`/items/${itemData.id}`, itemData);
  return response.data;
}
