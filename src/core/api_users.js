import { apiClient } from './api_base_url';

export async function onRegistration(registrationData) {
  return await apiClient.post('/users/register', registrationData);
}

export async function onLogin(loginData) {
  const response = await apiClient.post('/users/login', loginData);
  localStorage.setItem('token', response.data.access_token);
  return response.data.user;
}

export async function onLogout() {
  return await apiClient.get('/users/logout');
}

export async function fetchProtectedInfo() {
  return await apiClient.get('/users/protected');
}

export async function onGetUser() {
  const response = await apiClient.get('/users/get-users');
  return response.data.users; // Cambio para recibir datos ya desencriptados
}

export async function getUserInfo() {
  try {
    const response = await apiClient.get('/users/me');
    return response.data.user; // Cambio para recibir datos ya desencriptados
  } catch (error) {
    console.error('Error al obtener la información del usuario:', error);
    return null;
  }
}

export async function updateUser(user_id, userData) {
  const response = await apiClient.put(`/users/updateinfo/${user_id}`, userData);
  return response.data;
}



// Agrega la función updatePassword aquí
export async function updatePassword(userId, newPassword) {
  const passwordData = {
    newPassword: newPassword,
  };
  return await apiClient.put(`/users/${userId}/password`, passwordData);
}
