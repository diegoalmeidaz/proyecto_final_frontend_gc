import React, { useEffect, useState, useContext } from "react";
import Context from "../../context/Context";
import { getOrders, updateOrderStatus, deleteOrder } from "../../core/api_orders";
import { getUserInfoById } from "../../core/api_users";
import "../../styles/AdminEditOrderDashboard.css";

const AdminOrderDashboard = () => {
  const { user } = useContext(Context);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user && user.role === "admin") {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const allOrders = await getOrders();
      const ordersWithUserInfo = await Promise.all(
        allOrders.map(async (order) => {
          const userInfo = await getUserById(order.user_id);
          return { ...order, userInfo };
        })
      );

      setOrders(ordersWithUserInfo);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const getUserById = async (userId) => {
    const foundUser = await getUserInfoById(userId);
    return foundUser || {}; // Si foundUser es undefined, devuelve un objeto vacío
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrder(orderId);
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  if (!user || user.role !== "admin") {
    return <h1 className="admin-h1">No tienes permiso para ver esta página</h1>;
  }

  if (isLoading) {
    return <h1 className="admin-h1">Cargando...</h1>;
  }

  const ordersByStatus = (status) => {
    return orders.filter(
      (order) =>
        order.status_order &&
        order.status_order.toLowerCase() === status.toLowerCase()
    );
  };

  const renderOrdersByStatus = (status) => {
    const filteredOrders = ordersByStatus(status);
    return filteredOrders.length
      ? filteredOrders.map((order, index) => (
          <OrderCard
            key={index}
            order={order}
            onUpdateStatus={handleUpdateStatus}
            onDeleteOrder={handleDeleteOrder}
          />
        ))
      : "No hay órdenes en esta categoría";
  };

  return (
    <div className="admin-dashboard">
      <h1 className="admin-h1">Dashboard de Administrador</h1>
      <h2 className="admin-h2">Órdenes pendientes de procesar</h2>
      <div className="orders-container">
        {renderOrdersByStatus("en proceso")}
      </div>
      <h2 className="admin-h2">Órdenes con errores en confirmación</h2>
      <div className="orders-container">
        {renderOrdersByStatus("error en confirmar")}
      </div>
      <h2 className="admin-h2">Órdenes completadas</h2>
      <div className="orders-container">
        {renderOrdersByStatus("completada")}
      </div>
      <h2 className="admin-h2">Órdenes canceladas</h2>
      <div className="orders-container">
        {renderOrdersByStatus("cancelada")}
      </div>
    </div>
  );
};

const OrderCard = ({ order, onUpdateStatus, onDeleteOrder }) => {
  const handleUpdateStatus = (newStatus) => {
    onUpdateStatus(order.order_id, newStatus);
  };

  const handleDeleteOrder = () => {
    onDeleteOrder(order.order_id);
  };

  return (
    <div className="order-card">
      <h3>Orden #{order.order_id}</h3>
      <p>Usuario: {order.userInfo.name}</p>
      <p>Email: {order.userInfo.email}</p>
      <p>Fecha de creación: {new Date(order.created_at).toLocaleString()}</p>
      <p>Status: {order.status_order}</p>
      <div className="actions">
        <button onClick={() => handleUpdateStatus("en proceso")}>
          En proceso
        </button>
        <button onClick={() => handleUpdateStatus("completada")}>
          Completada
        </button>
        <button onClick={() => handleUpdateStatus("error en confirmar")}>
          Error en confirmar
        </button>
        <button onClick={() => handleUpdateStatus("cancelada")}>
          Cancelada
        </button>
        <button onClick={handleDeleteOrder}>Eliminar</button>
      </div>
    </div>
  );
};

export default AdminOrderDashboard;

