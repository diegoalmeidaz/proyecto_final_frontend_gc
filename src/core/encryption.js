import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;



export function encryptData(data) {
  console.log('Data to encrypt:', data); // Agrega esta línea
  const stringifiedData = JSON.stringify(data);
  const encryptedData = CryptoJS.AES.encrypt(stringifiedData, SECRET_KEY).toString();
  console.log('Encrypted data:', encryptedData); // Agrega esta línea
  return encryptedData;
}

// Función de desencriptación específica para el objeto de datos del usuario
export function decryptUserData(data) {
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
  return decryptedData;
}

// Función de desencriptación genérica para otros objetos JSON
export function decryptData(encryptedData) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
}

export function decrypt(encryptedText) {
  console.log("Encrypted text to decrypt:", encryptedText);
  const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);
  console.log("Decrypted bytes:", bytes);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Función de desencriptación específica para el objeto de roles del usuario
export function decryptUserRoles(data) {
  if (!data || !data.encryptedData) {
    console.error('Invalid data provided to decryptUserRoles:', data);
    return null;
  }

  const decryptedString = decrypt(data.encryptedData);

  try {
    const decryptedData = JSON.parse(decryptedString);
    return decryptedData;
  } catch (error) {
    console.error('Error parsing decrypted user roles:', error);
    return null;
  }
}




export function encryptOrderData(data) {
  console.log('CryptoJS:', CryptoJS);
  console.log('SECRET_KEY:', SECRET_KEY);
  console.log('Order data to encrypt:', data);

  // Prueba de encriptación
  const testEncryption = CryptoJS.AES.encrypt('test', SECRET_KEY).toString();
  console.log('Test encryption:', testEncryption);

  const stringifiedData = JSON.stringify(data);
  const encryptedData = CryptoJS.AES.encrypt(stringifiedData, SECRET_KEY).toString();
  console.log('Encrypted order data:', encryptedData);
  return encryptedData;
}
