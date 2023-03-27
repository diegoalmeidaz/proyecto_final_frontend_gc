import { useContext, useState, useEffect } from "react";
import Context from "../../context/Context";
import "../../styles/EditOrder.css";
import { useNavigate } from "react-router-dom";
import {
  getOrderById,
  updateOrder,
  getOrders,
  getOrdersByUser,
} from "../../core/api_orders";
import { decryptData } from "../../core/encryption";

const EditOrder = () => {
  const { user, isLoggedIn } = useContext(Context);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (user && !isLoggedIn) {
      alert("Debes iniciar sesión para modificar una orden");
      navigate("/"); // Redirige al usuario a la página principal si no está logueado
    } else if (user && isLoggedIn) {
      loadOrders();
    }
  }, [user, isLoggedIn, navigate]);

  const loadOrders = async () => {
    try {
      const fetchedOrders = await getOrdersByUser(user.user_id); // Cambiado a getOrdersByUser()
      setOrders(fetchedOrders.slice(0, 5));
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  const handleSelectOrder = async (orderId) => {
    try {
      const fetchedOrder = await getOrderById(orderId);
      console.log("Fetched order by ID:", fetchedOrder);
      setSelectedOrderId(orderId);
      
      // Desencripta los campos encriptados antes de establecerlos en el estado
      const decryptedOrderData = {
        ...fetchedOrder,
        delivery_address: decryptData(fetchedOrder.delivery_address),
        payment_method: decryptData(fetchedOrder.payment_method),
      };
      
      setOrderData(decryptedOrderData);
    } catch (error) {
      console.error("Error fetching order by ID:", error);
    }
  };

  const handleFieldChange = (e) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      const updatedOrder = await updateOrder(selectedOrderId, orderData);
      alert("Cambios guardados con éxito");
      setOrderData(updatedOrder);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <div className="container mx-auto px-4 mt-20 mb-12">
        <h2 className="text-2xl font-bold mb-5">Tus 5 últimas órdenes:</h2>
        <div className="bg-white rounded-lg shadow-md p-6 mb-10">
          {orders.map((order) => (
            <div key={order.order_id} className="border-b border-gray-200 py-2">
              <button onClick={() => handleSelectOrder(order.order_id)}>
                Orden #{order.order_id} - Total:{" "}
                {order.total_price.toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}
              </button>
            </div>
          ))}
        </div>

        {orderData && (
          <>
            <h2 className="text-2xl font-bold mb-5">Modificar orden:</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Renderizar los campos de la orden para su edición */}
              <div className="mt-4">
                <label
                  htmlFor="deliveryAddress"
                  className="block text-sm font-medium"
                >
                  Dirección de retiro de vestidos:
                </label>
                <input
                  type="text"
                  id="deliveryAddress"
                  name="delivery_address"
                  value={orderData.delivery_address}
                  onChange={handleFieldChange}
                  className="block w-full mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              {/* COMENTARIO: Dejaremos el modulo de pago reservado para mas adelante dado que aun no se puede pagar en la app .. y los manejos de $$ estan siendo a mano */}
              {/* <div className="mt-4">
                <label
                  htmlFor="paymentMethod"
                  className="block text-sm font-medium"
                >
                  Método de pago:
                </label>
                <input
                  type="text"
                  id="paymentMethod"
                  name="payment_method"
                  value={orderData.payment_method}
                  onChange={handleFieldChange}
                  className="block w-full mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div> */}
              <div className="mt-4">
                <label
                  htmlFor="visitDate"
                  className="block text-sm font-medium"
                >
                  Fecha de visita para prueba:
                </label>
                <input
                  type="date"
                  id="visitDate"
                  name="visit_date"
                  value={formatDate(orderData.visit_date)}
                  onChange={handleFieldChange}
                  className="block w-full mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="rentalDate"
                  className="block text-sm font-medium"
                >
                  Fecha de arriendo de vestido:
                </label>
                <input
                  type="date"
                  id="rentalDate"
                  name="rental_date"
                  value={formatDate(orderData.rental_date)}
                  onChange={handleFieldChange}
                  className="block w-full mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <button
                className="mt-6 px-3 py-2 text-white bg-green-600 rounded-md"
                onClick={handleSaveChanges}
              >
                Guardar cambios
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EditOrder;
