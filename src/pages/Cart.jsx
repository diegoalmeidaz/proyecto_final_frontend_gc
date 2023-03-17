import { useContext } from "react";
import Context from "../context/Context";

const Cart = () => {
  const { cart, addProduct, takeProduct } = useContext(Context);

  const totalOrder = (count, price) => {
    const total = count * price;
    return total;
  };

  const total = cart.reduce((a, { count, price }) => a + price * count, 0);

  return (
    <>
      <div className="flex flex-col d-block mt-12 col-auto items-center justify-center min-h-[calc(100vh-104px)]">
        <div className="bg-gray-200 m-auto p-5 items-center">
          <h5 className="mb-3 font-bold text-lg">TU PEDIDO:</h5>
          <div className="p-4 bg-white align-middle">
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

                <div className="flex justify-end items-center">
                  <h6 className="text-success text-lg font-semibold mr-3">
                    {totalOrder(item.count, item.price).toLocaleString(
                      "es-CL",
                      {
                        style: "currency",
                        currency: "CLP",
                      }
                    )}
                  </h6>
                  <button
                    className="px-3 py-2 text-white bg-red-600 rounded-md mr-2"
                    onClick={() => takeProduct(i)}
                  >
                    -
                  </button>
                  <b className="mx-2 text-gray-600 font-semibold">
                    {item.count}
                  </b>
                  <button
                    className="px-3 py-2 text-white bg-blue-600 rounded-md ml-2"
                    onClick={() => addProduct(i)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
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
      </div>
    </>
  );
};

export default Cart;
