import { apiClient } from './api_base_url';

export async function getUserRolesByUserId(userId) {
  const token = localStorage.getItem('token');
  const response = await apiClient.get(`/user_roles/${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function updateUserRole(userId, newRoleId) {
  const token = localStorage.getItem('token');
  const response = await apiClient.put(
    `/user_roles/${userId}`,
    {
      role_id: newRoleId,
    },
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  return response.data;
}
