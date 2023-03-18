
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
    const response = await axios.get('http://localhost:8000/users/me');
    return response.data.user;
  } catch (error) {
    console.error('Error al obtener la información del usuario:', error);
    return null;
  }
}
