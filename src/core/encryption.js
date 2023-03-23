import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

export function encryptData(data) {
  return AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
}

// Función de desencriptación específica para el objeto de datos del usuario
export function decryptUserData(data) {
  console.log('Input to decryptUserData:', data);
  const decryptedData = {
    user_id: Number(data.user_id),
    username: decrypt(data.username),
    email: decrypt(data.email),
    role: decrypt(data.role),
    name: decrypt(data.name),
    lastname: decrypt(data.lastname),
    address: decrypt(data.address),
    phone: decrypt(data.phone),
    
  };
  console.log('Decrypted user data:', decryptedData);
  return decryptedData;
}

// Función de desencriptación genérica para otros objetos JSON
export function decryptData(encryptedData) {
  const bytes = AES.decrypt(encryptedData, SECRET_KEY);
  const decryptedData = JSON.parse(bytes.toString(Utf8));
  console.log('Decrypted data:', decryptedData);
  return decryptedData;
}

export function decrypt(encryptedText) {
  const bytes = AES.decrypt(encryptedText, SECRET_KEY);
  return bytes.toString(Utf8);
}


// Función de desencriptación específica para el objeto de roles del usuario
export function decryptUserRoles(data) {
    console.log('Input to decryptUserRoles:', data);
  
    if (!data || !data.encryptedData) {
      console.error('Invalid data provided to decryptUserRoles:', data);
      return null;
    }
  
    const decryptedString = decrypt(data.encryptedData);
  
    try {
      const decryptedData = JSON.parse(decryptedString);
      console.log('Decrypted user roles:', decryptedData);
      return decryptedData;
    } catch (error) {
      console.error('Error parsing decrypted user roles:', error);
      return null;
    }
  }
  

