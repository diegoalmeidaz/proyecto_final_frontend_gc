import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';

const Success = () => {
  const navigate = useNavigate();
  const {user} = useContext(Context)

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-green-600">¡Éxito! Te has logueado correctamente {user ? user.name : ''}!</h1>
        <p className="text-gray-600">Serás redirigido a la página principal en unos segundos...</p>
      </div>
    </div>
  );
};

export default Success;
