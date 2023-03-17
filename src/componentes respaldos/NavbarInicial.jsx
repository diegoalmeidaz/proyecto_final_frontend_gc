import { Link } from "react-router-dom";
import { useContext } from "react";

import Context from "../context/Context";

const Navbar = () => {
  const { cart } = useContext(Context);
  const total = cart.reduce(
    (a, { count, price }) => a + price * count,
    0
  );
  
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

          
        </div>

        <div className="md:flex items-center">
          <div className="flex flex-col md:flex-row md:mx-6">
            <Link
              className="my-1 text-white text-lg md:mx-4 md:my-0 hover:text-gray-400"
              to="/"
            >
              Inicio
            </Link>
            <Link
              className="my-1 text-white text-lg md:mx-4 md:my-0 hover:text-gray-400"
              to="/carrito"
            >
              🛒 Total: {total.toLocaleString(
                  "es-CL",
                  {
                      style: "currency",
                      currency: "CLP",
                  }
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;