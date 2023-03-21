import { apiClient } from "./api_base_url";

export async function getUserRolesByUserId(userId) {
  const response = await apiClient.get(`/user_roles/user/${userId}`);
  return response.data;
}

export async function updateUserRole(userId, newRoleId) {
  console.log("Enviando datos:", { userId, role_id: newRoleId }); // Aquí está el console.log

  const response = await apiClient.put(`/user_roles/user-info-role/${userId}`, {
    role_id: newRoleId,
  });
  return response.data;
}

export async function updateUserInfoAndRole(userId, updatedUserInfo) {
  console.log("Enviando datos:", updatedUserInfo); // Aquí está el console.log

  const response = await apiClient.put(
    `/user_roles/user-info-role/${userId}`,
    updatedUserInfo
  );
  return response.data;
}
