import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaEdit,
  FaClipboardList,
  FaUserFriends,
} from "react-icons/fa";
import Context from "../context/Context"

function AdminDashboard() {
  const { user } = useContext(Context);
  const userRole = user ? user.rol : "renter";

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
          Dashboard del administrador
        </h1>
        <p className="text-center mb-8">
          Bienvenido al panel de administración. Desde aquí podrás gestionar
          productos, órdenes de trabajo y usuarios del sitio.
        </p>
        <div className="flex flex-wrap justify-center">
          <div className="text-center m-2">
            <Link
              to="/admin/product-create"
              className="bg-red-500 hover:bg-red-600 text-pink-100 font-bold py-4 px-4 rounded-full w-16 h-16 flex justify-center items-center mb-2 mx-auto"
            >
              <FaPlus />
            </Link>
            <p>Crear producto</p>
          </div>
          <div className="text-center m-2">
            <Link
              to="/admin/cards"
              className="bg-red-500 hover:bg-red-600 text-pink-100 font-bold py-4 px-4 rounded-full w-16 h-16 flex justify-center items-center mb-2 mx-auto"
            >
              <FaEdit />
            </Link>
            <p>Editar productos</p>
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
                <p>Usuarios</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
