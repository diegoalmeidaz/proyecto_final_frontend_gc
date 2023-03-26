import { createContext, useState, useEffect } from "react";
import { apiClient } from "../core/api_base_url";
import { onLogout, onGetUser } from "../core/api_users";
import { getUserInfo } from "../core/api_users";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem("cart");
    return localData ? JSON.parse(localData) : [];
  });
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const getProducts = async () => {
    const { data } = await apiClient.get("/items");
    setProducts(data);
    // console.log(data);
};

  

  const handleLogin = (loggedInUser) => {
    console.log("Logged in user:", loggedInUser);
    setUser(loggedInUser);
    setIsLoggedIn(true);
  };

  const checkUser = async () => {
    try {
      const user = await getUserInfo(); 
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const updateUser = async () => {
    try {
      const userInfo = await getUserInfo();
      setUser(userInfo);
    } catch (error) {
      console.error("Error al actualizar la información del usuario:", error);
    }
  };
  

  useEffect(() => {
    const fetchUser = async () => {
      if (isLoggedIn) {
        const user = await getUserInfo();
        setUser(user);
      }
    };
  
    fetchUser();
  }, [isLoggedIn]);

  useEffect(() => {
    getProducts();
    checkUser();
  }, []);

  const clearCart = () => {
    setCart([]);
  };

  const handleLogout = async () => {
    try {
      await onLogout();
      setIsLoggedIn(false);
      setUser(null);
      clearCart();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const addedItem = (product) => {
    const idProduct = product.item_id;
    const findProduct = cart.find((p) => p.item_id === idProduct);

    if (findProduct) {
      const newCart = cart.map((p) =>
        p.id === idProduct ? { ...p, count: p.count + 1 } : p
      );
      setCart(newCart);
    } else {
      setCart([...cart, { ...product, count: 1 }]);
    } 
  };

  const takeProduct = (index) => {
    const newCart = [...cart];
    const product = newCart[index];

    if (product.count === 1) {
      newCart.splice(index, 1);
    } else {
      newCart[index] = { ...product, count: product.count - 1 };
    }

    setCart(newCart);
  };

  const addProduct = (index) => {
    const newCart = [...cart];
    const product = newCart[index];

    newCart[index] = { ...product, count: product.count + 1 };

    setCart(newCart);
  };

  return (
    <Context.Provider
      value={{
        products,
        cart,
        setCart,
        addedItem,
        addProduct,
        takeProduct,
        user,
        isLoggedIn,
        handleLogout,
        checkUser,
        handleLogin,
        updateUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { ContextProvider };
export default Context;