import React, { useEffect, useState, useContext } from "react";
import Context from "../../context/Context";
import {
  getOrders,
  updateOrderStatus,
  deleteOrder,
  getOrdersDetails,
} from "../../core/api_orders";
import { getUserInfoById } from "../../core/api_users";
import "../../styles/AdminEditOrderDashboard.css";
import { decrypt } from "../../core/encryption";

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
      const ordersWithDetails = await Promise.all(
        allOrders.map(async (order) => {
          const userInfo = await getUserById(order.user_id);
          const orderDetails = await getOrdersDetails(order.order_id);
          return { ...order, userInfo, orderDetails };
        })
      );

      setOrders(ordersWithDetails);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const [collapsedStatus, setCollapsedStatus] = useState({
    enProceso: true,
    errorEnConfirmar: true,
    completada: true,
    cancelada: true,
  });

  const toggleCollapse = (status) => {
    setCollapsedStatus({
      ...collapsedStatus,
      [status]: !collapsedStatus[status],
    });
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
    <div className="main-container admin-dashboard">
      <h1 className="admin-h1 text-4xl font-semibold text-center my-6 text-red-500">Dashboard de Administrador</h1>
      <h2 className="admin-h2 text-2xl font-semibold text-center my-4 text-black">1. Órdenes pendientes de procesar</h2>
      <button
        className="admin-toggle-btn bg-pink-100 hover:bg-pink-200 text-red-500 font-bold py-1 px-4 rounded mb-4"
        onClick={() => toggleCollapse("enProceso")}
      >
        Pincha aquí para ver órdenes pendientes de procesar
      </button>
      {collapsedStatus.enProceso && (
        <div className="orders-container flex flex-wrap justify-center items-center">
          {renderOrdersByStatus("en proceso")}
        </div>
      )}
  
      <h2 className="admin-h2 text-2xl font-semibold text-center my-4">2. Órdenes con errores en confirmación</h2>
      <button
        className="admin-toggle-btn bg-pink-100 hover:bg-pink-200 text-red-500 font-bold py-1 px-4 rounded mb-4"
        onClick={() => toggleCollapse("errorEnConfirmar")}
      >
        Pinche aquí para ver órdenes relacionadas
      </button>
      {collapsedStatus.errorEnConfirmar && (
        <div className="orders-container flex flex-wrap justify-center items-center">
          {renderOrdersByStatus("error en confirmar")}
        </div>
      )}
  
      <h2 className="admin-h2 text-2xl font-semibold text-center my-4">3. Órdenes completadas</h2>
      <button
        className="admin-toggle-btn bg-pink-100 hover:bg-pink-200 text-red-500 font-bold py-1 px-4 rounded mb-4"
        onClick={() => toggleCollapse("completada")}
      >
        Pinche aquí para ver órdenes relacionadas
      </button>
      {collapsedStatus.completada && (
        <div className="orders-container flex flex-wrap justify-center items-center">
          {renderOrdersByStatus("completada")}
        </div>
      )}
  
      <h2 className="admin-h2 text-2xl font-semibold text-center my-4">4. Órdenes canceladas</h2>
      <button
        className="admin-toggle-btn bg-pink-100 hover:bg-pink-200 text-red-500 font-bold py-1 px-4 rounded mb-4"
        onClick={() => toggleCollapse("cancelada")}
      >
        Pinche aquí para ver órdenes relacionadas
      </button>
      {collapsedStatus.cancelada && (
        <div className="orders-container flex flex-wrap justify-center items-center">
          {renderOrdersByStatus("cancelada")}
        </div>
      )}
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
    <div className="order-card bg-white shadow-md p-6 rounded-md mb-6">
      <h3 className="font-bold">Orden #{order.order_id}</h3>
      <p>
        <span className="font-bold text-blue-800">Usuario:</span>{" "}
        {order.userInfo.name} {order.userInfo.lastname}
      </p>
      <p>
        <span className="font-bold text-blue-800">Email:</span>{" "}
        {order.userInfo.email}
      </p>
      {/* <p>Direccion de recogida: {decrypt(order.delivery_address)}</p> */}
      <p>
        <span className="font-bold text-blue-800">
          Fecha de creación orden:
        </span>{" "}
        {new Date(order.created_at).toLocaleString()}
      </p>
      <p>
        <span className="font-bold text-blue-800">Fecha de visita:</span>{" "}
        {new Date(order.visit_date).toLocaleString()}
      </p>
      <p>
        <span className="font-bold text-blue-800">Fecha de arriendo:</span>{" "}
        {new Date(order.rental_date).toLocaleString()}
      </p>
      <p>
        <span className="font-bold text-blue-800">Status:</span>{" "}
        {order.status_order}
      </p>
      {order.orderDetails && (
        <>
          <p>
            <span className="font-bold text-blue-800">
              Detalles de la orden:
            </span>
          </p>
          <ul>
            {order.orderDetails.map((detail) => (
              <li key={detail.item_id}>
                id: {detail.item_id} ({detail.quantity})
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="actions mt-4 grid grid-cols-2 gap-2">
        <button
          className="bg-yellow-300 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleUpdateStatus("en proceso")}
        >
          En proceso
        </button>
        <button
          className="bg-green-300 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleUpdateStatus("completada")}
        >
          Completada
        </button>
        <button
          className="bg-red-300 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleUpdateStatus("error en confirmar")}
        >
          Error en confirmar
        </button>
        <button
          className="bg-blue-300 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleUpdateStatus("cancelada")}
        >
          Cancelada
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded col-span-2"
          onClick={handleDeleteOrder}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default AdminOrderDashboard;
