import { apiClient } from './api_base_url';
import { encryptData, decryptData } from './encryption';

export async function getUserRoles() {
  const token = localStorage.getItem('token');
  const response = await apiClient.get('/roles', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return decryptData(response.data.user_roles);
}

export async function updateUserRoles(roleUser, roleRenter) {
  const token = localStorage.getItem('token');
  const response = await apiClient.put(
    '/user_roles',
    encryptData({
      roleUser,
      roleRenter,
    }),
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  return response.data;
}
