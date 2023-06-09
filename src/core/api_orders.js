// api_orders.js
import { apiClient } from "./api_base_url";
import { decryptData, encryptOrderData } from "./encryption";

// Obtener orden por ID
export async function getOrderById(order_id) {
  try {
    const response = await apiClient.get(`/orders/${order_id}`);

    // Desencriptar la información sensible antes de enviarla al cliente
    console.log("Encrypted order data:", response.data);

    const decryptedOrder = {
      ...response.data,
      delivery_address: response.data.delivery_address ? decryptData(response.data.delivery_address) : null,
      payment_method: response.data.payment_method ? decryptData(response.data.payment_method) : null,
    };

    console.log("Decrypted order data del getOrderByID:", decryptedOrder); // Agrega esta línea
    return decryptedOrder;
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    throw error;
  }
}



// Crear una nueva orden
export async function createOrder(orderData) {
  try {
    console.log('Original orderData:', orderData);

    const encryptedOrderData = {
      ...orderData,
      delivery_address: encryptOrderData(orderData.delivery_address),
      payment_method: encryptOrderData(orderData.payment_method),
    };

    console.log('Encrypted orderData:', encryptedOrderData);

    const response = await apiClient.post(`/orders`, encryptedOrderData);

    const decryptedOrderData = {
      ...response.data,
      delivery_address: decryptData(response.data.delivery_address),
      payment_method: decryptData(response.data.payment_method),
    };

    console.log('Decrypted orderData del createOrder:', decryptedOrderData);

    return decryptedOrderData;
  } catch (error) {
    console.error('Error in createOrder:', error);
    throw error;
  }
}

// Eliminar una orden
export async function deleteOrder(order_id) {
  try {
    await apiClient.delete(`/orders/${order_id}`);
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
}

// Obtener órdenes como administrador
export async function getOrdersByAdmin() {
  try {
    const response = await apiClient.get(`/orders/admin`);

    return response.data;
  } catch (error) {
    console.error("Error fetching orders by admin:", error);
    throw error;
  }
}

// Actualizar el estado de una orden
export async function updateOrderStatus(order_id, status_order) {
  try {
    await apiClient.put(`/orders/status/${order_id}`, { status_order });
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
}

// Actualizar una orden
export async function updateOrder(order_id, orderData) {
  try {
    const response = await apiClient.put(`/orders/${order_id}`, orderData);

    const decryptedOrder = {
      ...response.data,
      delivery_address: decryptData(response.data.delivery_address),
      payment_method: decryptData(response.data.payment_method),
    };

    return decryptedOrder;
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
}

// Obtener todas las órdenes
export async function getOrders() {
  try {
    const response = await apiClient.get('/orders');
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}

// Obtener órdenes por usuario
export async function getOrdersByUser(user_id) {
  try {
    const response = await apiClient.get(`/orders/user/${user_id}`);

    // Desencriptar la información sensible antes de enviarla al cliente
    const decryptedOrders = response.data.map((order) => {
      console.log("Encrypted order data:", order);

      const decryptedOrder = {
        ...order,
        delivery_address: order.delivery_address ? decryptData(order.delivery_address) : null,
        payment_method: order.payment_method ? decryptData(order.payment_method) : null,
      };

      console.log("Decrypted order data del getOrderByUser:", decryptedOrder); // Agrega esta línea
      return decryptedOrder;
    });

    return decryptedOrders;
  } catch (error) {
    console.error("Error fetching orders by user:", error);
    throw error;
  }
}

export async function getOrdersWithDetails() {
  try {
    const response = await apiClient.get('/orders/details');
    return response.data;
  } catch (error) {
    console.error('Error fetching orders with details:', error);
    throw error;
  }
}



// Crear una nueva orden con detalles
export async function createOrderWithDetails(orderData) {
  try {
    console.log('Original orderData with details:', orderData);

    const encryptedOrderData = {
      ...orderData,
      delivery_address: encryptOrderData(orderData.delivery_address),
      payment_method: encryptOrderData(orderData.payment_method),
      order_details: orderData.order_details.map((detail) => ({
        ...detail,
        product_name: encryptOrderData(detail.product_name),
      })),
    };

    console.log('Encrypted orderData with details:', encryptedOrderData);

    const response = await apiClient.post(`/orders/with-details`, encryptedOrderData);

    const decryptedOrderData = {
      ...response.data,
      delivery_address: decryptData(response.data.delivery_address),
      payment_method: decryptData(response.data.payment_method),
      order_details: response.data.order_details ? response.data.order_details.map((detail) => ({
        ...detail,
        product_name: decryptData(detail.product_name),
      })) : [],
    };

    console.log('Decrypted orderData with details from createOrderWithDetails:', decryptedOrderData);

    return decryptedOrderData;
  } catch (error) {
    console.error('Error in createOrderWithDetails:', error);
    throw error;
  }
}



export async function getOrdersDetails(order_id) {
  try {
    const response = await apiClient.get(`/orders/details/${order_id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}


