import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/img/logo_gc_sin_fondo_100x100.png";

const Navbar = () => {
  const { user, isLoggedIn, handleLogout } = useContext(Context);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart } = useContext(Context);
  const total = cart.reduce((a, { count, price }) => a + price * count, 0);
  console.log("User object:", user);

  const logout = (e) => {
    e.preventDefault();
    handleLogout();
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [isLoggedIn]);

  return (
    <nav className="bg-pink-100 shadow-lg">
      <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <div>
            <Link
              className="text-red-700 text-2xl font-bold md:text-3xl hover:text-gray-300"
              to="/"
            >
              <img
                src={Logo}
                alt="Guapa Carlota logo"
                className="mr-2 h-8 w-8 md:h-12 md:w-12"
              />
            </Link>
          </div>

          <div className="flex md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-400 focus:outline-none focus:text-gray-400"
              aria-label="toggle menu"
              onClick={toggleMobileMenu}
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

        <div
          className={`${
            mobileMenuOpen ? "block" : "hidden"
          } z-10 md:flex md:items-center transition-all duration-300`}
        >
          <div className="flex flex-col md:flex-row md:mx-6">
            <Link
              className="my-1 text-red-500 text-lg md:mx-4 md:my-0 hover:text-red-700"
              to="/"
            >
              Como Funciona
            </Link>
            <Link
              className="my-1 text-red-500 text-lg md:mx-4 md:my-0 hover:text-red-700"
              to="/dresses"
            >
              Catálogo
            </Link>
            <Link
              className="my-1 text-red-500 text-lg md:mx-4 md:my-0 hover:text-red-700"
              to="/cart"
            >
              🗓️ Total:{" "}
              {total.toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
              })}
            </Link>
          </div>
          <div className="flex items-center">
            {isLoggedIn ? (
              <>
                <Link to="/ruta-a-la-pagina-especifica">
                  <span className="text-red-500 text-lg mr-4 font-bold">
                    Guapa {user ? user.name : ""}
                  </span>
                </Link>

                <button
                  onClick={logout}
                  className="text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login">
                <button className="text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-700">
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

export default Navbar;
