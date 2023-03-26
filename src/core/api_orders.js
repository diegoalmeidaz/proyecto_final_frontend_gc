// api_orders.js
import { apiClient } from "./api_base_url";
import { encryptData, decryptData, encryptOrderData } from "./encryption";

// Obtener una orden por ID
export async function getOrderById(order_id) {
  try {
    const response = await apiClient.get(`/orders/${order_id}`);

    const decryptedOrder = {
      ...response.data,
      delivery_address: decryptData(response.data.delivery_address),
      payment_method: decryptData(response.data.payment_method),
    };

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

    console.log('Decrypted orderData:', decryptedOrderData);

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
export async function updateOrderStatus(order_id, order_status) {
  try {
    await apiClient.put(`/orders/status/${order_id}`, { order_status });
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


