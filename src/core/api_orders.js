import { apiClient } from './api_items';

export const createOrder = (orderData) => apiClient.post('/orders', orderData);
export const updateOrder = (orderId, orderData) => apiClient.put(`/orders/${orderId}`, orderData);
export const deleteOrder = (orderId) => apiClient.delete(`/orders/${orderId}`);
export const getOrders = () => apiClient.get('/orders');
export const getOrderById = (orderId) => apiClient.get(`/orders/${orderId}`);
