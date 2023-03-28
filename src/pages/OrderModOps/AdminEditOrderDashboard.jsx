import React, { useEffect, useState, useContext } from "react";
import Context from "../../context/Context";
import {
  getOrders,
  updateOrderStatus,
  deleteOrder,
} from "../../core/api_orders";
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

  const renderOrder = (order) => {
    if (!order.userInfo || !order.userInfo.name) {
      return null;
    }

    return (
      <OrderCard
        key={order.id}
        order={order}
        onUpdateStatus={handleUpdateStatus}
        onDeleteOrder={handleDeleteOrder}
      />
    );
  };

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
      ? filteredOrders.map(renderOrder)
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
      <h2 className="admin-h2">Órdenes confirmadas</h2>
      <div className="orders-container">
        {renderOrdersByStatus("confirmado")}
      </div>
    </div>
  );
};

const OrderCard = ({ order, onUpdateStatus, onDeleteOrder }) => (
  <div
    className="admin-order admin-container my-4 p-4 border border-gray-300 rounded"
  >
    <h2 className="admin-card-title font-bold text-xl mb-2">
      {order.userInfo.name}
    </h2>
    <p className="text-gray-700">{order.userInfo.email}</p>
    <p>Fecha de visita: {order.visit_date}</p>
    <p>Fecha de alquiler: {order.rental_date}</p>
    <p>Productos:</p>
    <ul className="admin-ul list-disc list-inside">
      {order.orderDetails &&
        order.orderDetails.map((item) => (
          <li key={item.item_id} className="admin-li">
            Ítem ID: {item.item_id} - Cantidad: {item.quantity} - Precio: {item.price}
          </li>
        ))}
    </ul>

    <select
      className="border border-gray-300 px-2 py-1 rounded"
      value={order.status_order}
      onChange={(e) => {
        order.new_status = e.target.value;
      }}
    >
      <option value="en proceso">En proceso</option>
      <option value="error en confirmar">Error en confirmar</option>
      <option value="confirmado">Confirmado</option>
    </select>
    <button
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2"
      onClick={() => onDeleteOrder(order.id)}
    >
      Eliminar
    </button>
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2"
      onClick={() => {
        if (order.new_status) {
          onUpdateStatus(order.id, order.new_status);
        }
      }}
    >
      Actualizar
    </button>
  </div>
);

export default AdminOrderDashboard;

