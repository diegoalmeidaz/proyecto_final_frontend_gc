import { useContext, useState } from "react";
import Context from "../context/Context";
import "../styles/Cart.css";

const Cart = () => {
  const { cart, addProduct, takeProduct } = useContext(Context);

  const totalOrder = (count, price) => {
    const total = count * price;
    return total;
  };

  const total = cart.reduce((a, { count, price }) => a + price * count, 0);

  // State para manejar la fecha de visita y de alquiler
  const [visitDate, setVisitDate] = useState("");
  const [rentalDate, setRentalDate] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  // Función para manejar la fecha de visita y de alquiler
  const handleVisitDateChange = (e) => {
    setVisitDate(e.target.value);
  };

  const handleRentalDateChange = (e) => {
    setRentalDate(e.target.value);
  };

  const handleDeliveryAddressChange = (e) => {
    setDeliveryAddress(e.target.value);
  };

  return (
    <>
      <div className="container mx-auto px-4 mt-20 mb-12">
        <h2 className="text-2xl font-bold mb-5">Tu pedido:</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          {cart.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-2 border-b border-gray-200"
            >
              <div className="flex justify-start items-center">
                <img
                  src={item.src}
                  width="50"
                  alt=""
                  className="rounded-md"
                />
                <h6 className="ml-3 text-capitalize text-gray-600 font-semibold text-sm">
                  {item.name}
                </h6>
              </div>

              <div className="flex flex-col sm:flex-row justify-end items-center">
                <h6 className="text-success text-lg font-semibold mb-2 sm:mb-0 sm:mr-3">
                  {totalOrder(item.count, item.price).toLocaleString(
                    "es-CL",
                    {
                      style: "currency",
                      currency: "CLP",
                    }
                  )}
                </h6>
                <div className="flex">
                  <button
                    className="px-3 py-1 text-white bg-red-600 rounded-md mr-2 mb-2 sm:mb-0"
                    onClick={() => takeProduct(i)}
                  >
                    -
                  </button>
                  <b className="mx-2 text-gray-600 font-semibold">
                    {item.count}
                  </b>
                  <button
                    className="px-3 py-1 text-white bg-blue-600 rounded-md ml-2"
                    onClick={() => addProduct(i)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
             <div className="mt-4">
            <label htmlFor="visitDate" className="block text-sm font-medium">
              Fecha de visita para prueba:
            </label>
                <input
                  type="date"
                  id="visitDate"
                  value={visitDate}
                  onChange={handleVisitDateChange}
                  className="block w-full mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
             </div>
          <div className="mt-4">
            <label htmlFor="rentalDate" className="block text-sm font-medium">
              Fecha de arriendo de vestido:
            </label>
                <input
                  type="date"
                  id="rentalDate"
                  value={rentalDate}
                  onChange={handleRentalDateChange}
                  className="block w-full mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
             </div>
          <div className="mt-4">
            <label htmlFor="deliveryAddress" className="block text-sm font-medium">
              Dirección de entrega:
            </label>
                <input
                  type="text"
                  id="deliveryAddress"
                  value={deliveryAddress}
                  onChange={handleDeliveryAddressChange}
                  className="block w-full mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
          <h2 className="my-4 text-xl font-bold">
            Total:{" "}
                {total.toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}
              </h2>
              <button className="px-3 py-2 text-white bg-green-600 rounded-md">
            Pagar
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;