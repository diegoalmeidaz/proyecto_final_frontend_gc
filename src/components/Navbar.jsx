import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/img/logo_gc_sin_fondo_100x100.png";
import "../styles/Navbar.css";
import { decrypt } from "crypto-js/aes";


const Navbar = () => {
  const { user, isLoggedIn, handleLogout } = useContext(Context);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart } = useContext(Context);
  const total = cart.reduce((a, { count }) => a + count, 0);

  // antigua funcion de indicador de carrito .. ahora va a quedar como numero de vestidos
  // const total = cart.reduce((a, { count, price }) => a + price * count, 0);

  const logout = (e) => {
    e.preventDefault();
    handleLogout();
    navigate("/logoutsucces");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [isLoggedIn]);


  
  return (
    <nav className="navbar">
      <div className="container">
      <div className="logoContainer">
  <div className="logoText">
    <Link className="logo" to="/">
      <img src={Logo} alt="Guapa Carlota logo" />
      Guapa Carlota
    </Link>
  </div>
          <button
            className={`hamburger ${mobileMenuOpen ? "opened" : ""}`}
            aria-label="toggle menu"
            onClick={toggleMobileMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div
          className={`navLinks ${mobileMenuOpen ? "active" : ""}`}
        >
          <Link to="/como_funciona" className="mt-2">Como Funciona</Link>
          <Link to="/dresses" className="mt-2">Catálogo</Link>
          <Link to="/cart" className="mt-2">
            👗 Vestidos en tu orden:{" "}
            {total.toLocaleString("es-CL", {
              //style: "string",
              //currency: "CLP",
            })}
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="userInfo, mt-2">
                ❤️ Guapa {user ? user.name : ""}
              </Link>
              <button onClick={logout} className="loginBtn">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="loginBtn">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
  
  
  
};

export default Navbar;
