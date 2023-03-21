import { apiClient } from './api_base_url';

export async function getUserRoles() {
  const token = localStorage.getItem('token');
  const response = await apiClient.get('/roles', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.data.user_roles;
}

export async function updateUserRoles(roleUser, roleRenter) {
  const token = localStorage.getItem('token');
  const response = await apiClient.put(
    '/user_roles',
    {
      roleUser,
      roleRenter,
    },
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  return response.data;
}
