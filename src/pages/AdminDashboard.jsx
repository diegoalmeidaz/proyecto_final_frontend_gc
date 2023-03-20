import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaEdit,
  FaClipboardList,
  FaUserFriends,
  FaUserEdit,
} from "react-icons/fa";
import Context from "../context/Context"

function AdminDashboard() {
  const { user } = useContext(Context);
  const userRole = user ? user.role : "renter";

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        backgroundImage:
          'url("https://media.glamourmagazine.co.uk/photos/63ea4c67eeb41169a4f2de05/master/pass/WEDDING%20GUEST%20130223%20main.jpg")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        opacity: 0.8,
      }}
    >
      <div className="bg-white p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Centro de Comando Carlota
        </h1>
        <p className="text-center mb-8">
          Bienvenido al centro de comando de Guapa Carlota. Desde aquí podrás gestionar
          productos, actualizar tu informacion, ver tus ordenes pasadas y prontamente mas opciones!!
        </p>
        <div className="flex flex-wrap justify-center">
          <div className="text-center m-2">
            <Link
              to="/create_product"
              className="bg-red-500 hover:bg-red-600 text-pink-100 font-bold py-4 px-4 rounded-full w-16 h-16 flex justify-center items-center mb-2 mx-auto"
            >
              <FaPlus />
            </Link>
            <p>Crear Vestido Para Arriendo</p>
          </div>
          <div className="text-center m-2">
            <Link
              to="/admin_catalogue_view"
              className="bg-red-500 hover:bg-red-600 text-pink-100 font-bold py-4 px-4 rounded-full w-16 h-16 flex justify-center items-center mb-2 mx-auto"
            >
              <FaEdit />
            </Link>
            <p>Editar tus vestidos</p>
          </div><div className="text-center m-2">
            <Link
              to="/admin_catalogue_view"
              className="bg-red-500 hover:bg-red-600 text-pink-100 font-bold py-4 px-4 rounded-full w-16 h-16 flex justify-center items-center mb-2 mx-auto"
            >
              <FaUserEdit />
            </Link>
            <p>Modifica Tus Datos</p>
          </div>
          {userRole === "admin" && (
            <>
              <div className="text-center m-2">
                <Link
                  to="/admin/orders"
                  className="bg-red-500 hover:bg-red-600 text-pink-100 font-bold py-4 px-4 rounded-full w-16 h-16 flex justify-center items-center mb-2 mx-auto"
                >
                  <FaClipboardList />
                </Link>
                <p>Órdenes de trabajo</p>
              </div>
              <div className="text-center m-2">
                <Link
                  to="/admin/all-users"
                  className="bg-red-500 hover:bg-red-600 text-pink-100 font-bold py-4 px-4 rounded-full w-16 h-16 flex justify-center items-center mb-2 mx-auto"
                >
                  <FaUserFriends />
                </Link>
                <p>Ver Todos los Usuarios</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
