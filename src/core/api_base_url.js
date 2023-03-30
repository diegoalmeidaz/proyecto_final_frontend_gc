import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://proyectofinalbackendgc-production.up.railway.app/',
  withCredentials: true,
});


apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});