import React from "react";
import Catalogue from "./pages/Catalogue";
import "./styles/global.css";
import { BrowserRouter, Route, Routes, Outlet, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ContextProvider } from "./context/Context";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./core/api_items";
import Login from "./pages/Login";
import { Provider } from 'react-redux';
import store from './core/store';
import Register from './pages/Register'
import { useSelector } from 'react-redux'
import Cart from './pages/Cart'
import AdminProducts from './pages/AdminProducts';
import Success from './components/Success' 

const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)

  return <>{isAuth ? <Outlet /> : <Navigate to='/login' />}</>
  
}

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)

  return <>{!isAuth ? <Outlet /> : <Navigate to='/login' />}</>
}

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ContextProvider>
              <Navbar />
              <div style={{ marginTop: "79px" }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/dresses" element={<Catalogue />} />
                  <Route path="/login" element={<RestrictedRoutes><Login /></RestrictedRoutes>} />
                  <Route path="/register" element={<RestrictedRoutes><Register /></RestrictedRoutes>} />
                  <Route path="/success" element={<PrivateRoutes><Success /></PrivateRoutes>} />
                  <Route path="/dashboard" element={<PrivateRoutes><AdminProducts /></PrivateRoutes>} />
                 
                  <Route path="/cart" element={<PrivateRoutes><Cart /></PrivateRoutes>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Footer />
            </ContextProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    </React.StrictMode>
  );
}

export default App;