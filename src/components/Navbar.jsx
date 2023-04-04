import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/img/logo_gc_sin_fondo_100x100.png";
import "../styles/Navbar.css";
// import { decrypt } from "crypto-js/aes";

const Navbar = () => {
  const { user, isLoggedIn, handleLogout } = useContext(Context);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart } = useContext(Context);
  const total = cart.reduce((a, { count }) => a + count, 0);

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
      <div className="navbarContainer">
        <Link className="logo" to="/">
          <img src={Logo} alt="Guapa Carlota logo" />
          Guapa Carlota
        </Link>
        <button
          className={`hamburger ${mobileMenuOpen ? "opened" : ""}`}
          aria-label="toggle menu"
          onClick={toggleMobileMenu}
          
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={`navLinks ${mobileMenuOpen ? "active" : ""}`}>
          <Link to="/como_funciona" className="mt-2 text-red-500 hover:text-red-800">Como Funciona</Link>
          <Link to="/dresses" className="mt-2 text-red-500 hover:text-red-800">Catálogo</Link>
          <Link to="/cart" className="mt-2 text-red-500 hover:text-red-800">
            👗 Vestidos en tu orden:{" "}
            {total.toLocaleString("es-CL", {})}
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="userInfo, mt-2 text-red-500 text-bold hover:text-red-800">
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


// comentario prueba subida github nuevo nombre repo




// Codigo a probar implementando despues build (post entrega):

// import { useContext, useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Context from "../context/Context";
// import { useNavigate } from "react-router-dom";
// import Logo from "../assets/img/logo_gc_sin_fondo_100x100.png";
// import "../styles/Navbar.css";

// const Navbar = () => {
//   const { user, isLoggedIn, handleLogout } = useContext(Context);
//   const navigate = useNavigate();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [loginState, setLoginState] = useState(isLoggedIn);
//   const { cart } = useContext(Context);
//   const total = cart.reduce((a, { count }) => a + count, 0);

//   useEffect(() => {
//     setLoginState(isLoggedIn);
//   }, [isLoggedIn]);

//   const logout = (e) => {
//     e.preventDefault();
//     handleLogout();
//     navigate("/logoutsucces");
//   };

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen);
//   };

//   useEffect(() => {
//     setMobileMenuOpen(false);
//   }, [loginState]);

//   return (
//     <nav className="navbar">
//       <div className="navbarContainer">
//         <Link className="logo" to="/">
//           <img src={Logo} alt="Guapa Carlota logo" />
//           Guapa Carlota
//         </Link>
//         <button
//           className={`hamburger ${mobileMenuOpen ? "opened" : ""}`}
//           aria-label="toggle menu"
//           onClick={toggleMobileMenu}
//         >
//           <span></span>
//           <span></span>
//           <span></span>
//         </button>
//         <div className={`navLinks ${mobileMenuOpen ? "active" : ""}`}>
//           <Link to="/como_funciona" className="mt-2 text-red-500 hover:text-red-800">Como Funciona</Link>
//           <Link to="/dresses" className="mt-2 text-red-500 hover:text-red-800">Catálogo</Link>
//           <Link to="/cart" className="mt-2 text-red-500 hover:text-red-800">
//             👗 Vestidos en tu orden:{" "}
//             {total.toLocaleString("es-CL", {})}
//           </Link>
//           {loginState ? (
//             <>
//               <Link to="/dashboard" className="userInfo, mt-2 text-red-500 text-bold hover:text-red-800">
//                 ❤️ Guapa {user ? user.name : ""}
//               </Link>
//               <button onClick={logout} className="loginBtn">
//                 Logout
//               </button>
//             </>
//           ) : (
//             <Link to="/login" className="loginBtn">
//               Login
//             </Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
