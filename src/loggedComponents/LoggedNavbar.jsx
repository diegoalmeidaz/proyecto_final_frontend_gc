import { Link } from "react-router-dom";
import { useContext } from "react";
import { useSelector } from "react-redux";

import Context from "../context/Context";

const NavbarLogged = () => {
  const { cart } = useContext(Context);
  const total = cart.reduce((a, { count, price }) => a + price * count, 0);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  return (
    <nav className="bg-blue-500 shadow-lg">
      <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <div>
            <Link
              className="text-white text-2xl font-bold md:text-3xl hover:text-gray-300"
              to="/"
            >
              👗 Guapa Carlota
            </Link>
          </div>

          <div className="flex md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-400 focus:outline-none focus:text-gray-400"
              aria-label="toggle menu"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="hidden md:flex items-center">
          <div className="flex flex-col md:flex-row md:mx-6">
            <Link
              className="my-1 text-white text-lg md:mx-4 md:my-0 hover:text-gray-400"
              to="/"
            >
              Inicio
            </Link>
            <Link
              className="my-1 text-white text-lg md:mx-4 md:my-0 hover:text-gray-400"
              to="/dresses"
            >
              Catálogo
            </Link>
            <Link
              className="my-1 text-white text-lg md:mx-4 md:my-0 hover:text-gray-400"
              to="/cart"
            >
              🛒 Total:{" "}
              {total.toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
              })}
            </Link>
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <p className="text-white mr-4">{`Bienvenido, ${user.name}`}</p>
            ) : (
              <Link to="/login">
                <button className="text-white bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-500">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarLogged;