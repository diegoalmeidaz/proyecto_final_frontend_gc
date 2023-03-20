import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onLogout } from '../core/api_users';

const LogoutSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      onLogout(); // Llamada a la función logout que cerrará la sesión del usuario
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-red-500">Has cerrado sesión correctamente</h1>
        <p className="text-gray-600">Serás redirigido a la página principal en unos segundos...</p>
      </div>
    </div>
  );
};

export default LogoutSuccess;
