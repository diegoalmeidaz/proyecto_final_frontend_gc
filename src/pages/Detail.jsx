import { useParams } from "react-router-dom";
import { useSingleItem } from "../core/hooks";
import { formatPrice } from "../core/utils";
import "../styles/Detail.css";
import { useContext } from "react";
import Context from "../context/Context";
import { useState } from "react";

const Detail = () => {
  const { item_id } = useParams();

  const itemsData = useSingleItem(item_id);

  const productInfo = itemsData.item;

  const { addedItem } = useContext(Context);

  const [isZoomed, setIsZoomed] = useState(false);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  if (itemsData.isLoading) {
    return <p>Loading...</p>;
  }

  if (itemsData.error) {
    return <p>Error: {itemsData.error.message}</p>;
  }

  return (
    <>
      {productInfo ? (
        <div className="w-75 mx-auto mt-20">
          <div className="flex flex-wrap flex-row-l flex-column justify-center items-center md:justify-center md:items-center min-h-screen">

          <div className="w-100 w-50-l ph3 mb-mobile bg-white text-black p-4 rounded-lg shadow-md w-full md:w-3/5 lg:w-2/5">

              <div className="img-container">
                <img
                  src={productInfo.src}
                  className={`detail-img${isZoomed ? " zoomed" : ""}`}
                  alt={productInfo.name}
                  onClick={toggleZoom}
                />
                {isZoomed && (
                  <div className="zoomed-overlay">
                    <button className="close-button" onClick={toggleZoom}>
                      X
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="w-100 w-50-l ph3 mb-mobile">
              <div className="flex flex-column">
                <h5 className="card-title mb-2 text-capitalize">
                  {productInfo.name}
                </h5>
                <hr />
                <p className="card-text mb-2 mt-2">{productInfo.description}</p>
                <hr />
                <ul className="mt-2 mb-2">
                  <li>Marca: {productInfo.brand}</li>
                  <li>Talla: {productInfo.size}</li>
                  <li>Color: {productInfo.color}</li>
                </ul>
                <hr />
                <div className="col justify-content-around mt-3">
                  <h4 className="precio">
                    Precio Arriendo:{" "}
                    {productInfo.price.toLocaleString("es-CL", {
                      style: "currency",
                      currency: "CLP",
                    })}
                  </h4>
                  <button
                    style={{ width: "70%" }}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 text-sm rounded mt-2 mx-auto"
                    onClick={() => addedItem(productInfo)}
                  >
                    Añadir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Detail;
