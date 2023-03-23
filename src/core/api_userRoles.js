import { apiClient } from "./api_base_url";
import { encryptData, decryptData, decryptUserRoles } from './encryption';


export async function getUserRolesByUserId(userId) {
    try {
      const response = await apiClient.get(`/user_roles/user/${userId}`);
      return decryptUserRoles(response.data);
    } catch (error) {
      console.error('Error al obtener los roles del usuario:', error);
      return null;
    }
  }

  export async function updateUserRole(userId, newRoleId) {
    const encryptedData = encryptData({ role_id: newRoleId });
    console.log("Datos encriptados en updateUserRole:", encryptedData);
    const response = await apiClient.put(`/user_roles/user/${userId}`, encryptedData);
    return response.data;
  }
  

export async function updateUserInfoAndRole(userId, updatedUserInfo) {
    const encryptedData = encryptData(updatedUserInfo);
    console.log("Datos encriptados en updateUserInfoAndRole:", encryptedData);
    const response = await apiClient.put(`/user_roles/user-info-role/${userId}`, encryptedData);
    return response.data;
  }
