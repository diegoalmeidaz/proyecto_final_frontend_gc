
import axios from 'axios'
axios.defaults.withCredentials = true

export async function onRegistration(registrationData) {
  return await axios.post(
    'http://localhost:8000/users/register',
    registrationData
  )
}

export async function onLogin(loginData) {
  const response = await axios.post('http://localhost:8000/users/login', loginData);
  localStorage.setItem('token', response.data.access_token); // Asumiendo que el token se devuelve en el objeto 'data' con la clave 'access_token'
  return response.data.user;
}

export async function onLogout() {
  return await axios.get('http://localhost:8000/users/logout')
}

export async function fetchProtectedInfo() {
  return await axios.get('http://localhost:8000/users/protected')
}

export async function onGetUser() {
  return await axios.get('http://localhost:8000/users/get-users')
}

export async function getUserInfo() {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:8000/users/me', {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data.user;
  } catch (error) {
    console.error('Error al obtener la información del usuario:', error);
    return null;
  }
}

export async function updateUser(userData) {
  const token = localStorage.getItem('token');
  return await axios.put('http://localhost:8000/users/update', userData, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
}