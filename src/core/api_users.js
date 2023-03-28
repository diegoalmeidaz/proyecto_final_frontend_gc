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
  // console.log('All users from API:', response.data.users);
  return response.data.users; 
}

export async function getUserInfo() {
  try {
    const response = await apiClient.get('/users/me');
    return response.data.user; 
  } catch (error) {
    console.error('Error al obtener la información del usuario:', error);
    return null;
  }
}

export async function updateUser(user_id, userData) {
  const response = await apiClient.put(`/users/updateinfo/${user_id}`, userData);
  return response.data;
}

// Funcion para poder modificar el passowrd en el user Edit info
export async function updatePassword(userId, newPassword) {
  const passwordData = {
    newPassword: newPassword,
  };
  return await apiClient.put(`/users/${userId}/password`, passwordData);
}


// seccion para registrar a un admin: En proceso de creacion

export async function onRegistrationAdmin(registrationData) {
  return await apiClient.post('/users/register_admin', registrationData);
}




// Obtenemos la informacion de de usuario por id: 

export async function getUserInfoById(userId) {
  try {
    const response = await apiClient.get(`/users/user/${userId}`); // Cambia la ruta según la API
    return response.data.user;
  } catch (error) {
    console.error(`Error al obtener la información del usuario con ID ${userId}:`, error);
    return null;
  }
}