import React, { useEffect, useState, useMemo } from "react";
// import { onGetItems } from "../../core/products";
import { formatPrice } from "../../core/utils";
import { getUserInfo } from "../../core/api_users";
import SearchBar from "../../components/catalogueComponents/SearchBar";
import ColorFilters from "../../components/catalogueComponents/ColorFilters";
// import PriceFilter from "../../components/catalogueComponents/PriceFilter";
import SizeFilters from "../../components/catalogueComponents/SizeFilters";
import BrandFilter from "../../components/catalogueComponents/BrandFilter";
// import IndependentDesignerFilter from "../../components/catalogueComponents/IndependentDesignerFilter";
import { useItems } from "../../core/hooks";

function AdminCards() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");

  const { data: itemsData } = useItems();
  const items = useMemo(() => itemsData?.products ?? [], [itemsData]);

  useEffect(() => {
    setProducts(items);
  }, [items]);

  useEffect(() => {
    getUserInfo().then((user) => {
      setUserRole(user.role);
      setUserId(user.user_id);
    });
  }, []);

  const visibleProducts = useMemo(() => {
    return userRole === "admin"
      ? products
      : products.filter((product) => product.user_id === userId);
  }, [products, userRole, userId]);

  useEffect(() => {
    setFilteredProducts(visibleProducts);
  }, [visibleProducts]);

  // const [filtersVisible, setFiltersVisible] = useState(false);

  return (
    <div className="w-75 mx-auto items-container">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 mb-4 md:mb-0 md:mr-4">
          <SearchBar />
          <ColorFilters />
          <SizeFilters />
          <BrandFilter />
        </div>

        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 product-grid pt-2 justify-center items-center">
            {visibleProducts.map((product) => (
              <div
                key={product.item_id}
                className="w-full w-50-l p-3 mb-4 bg-white shadow-md rounded block md:inline-block md:max-w-xs"
              >
                <div className="flex flex-col h-full">
                  <img
                    style={{ objectFit: "cover", height: "420px" }}
                    alt={product.name}
                    loading="lazy"
                    className="img flex-auto bg-gray flex justify-center items-center rounded-t"
                    src={product.src}
                  />

                  <div className="pt-3 pb-5 flex flex-col">
                    <b className="mb-1">{product.name}</b>
                    {/* <i className="mb-3 text-gray-500">{product.description}</i> */}
                    {userRole === "admin" && product.item_id && (
                      <span>ID del producto: {product.item_id}</span>
                    )}
                    <span>Marca: {product.brand}</span>
                    <span>Talla: {product.size}</span>
                    <span>Color: {product.color}</span>
                    <span>
                      {product.availability ? "Habilitado" : "No Habilitado"}
                    </span>{" "}
                    {userRole === "admin" &&
                      product.renter_name &&
                      product.renter_lastname && (
                        <span>
                          Arrendado por: {product.renter_name}{" "}
                          {product.renter_lastname}
                        </span>
                      )}
                    {/* Agrega esta línea */}
                    <p className="my-0 font-bold text-black">
                      Precio Arriendo: {formatPrice(product.price)}
                    </p>
                  </div>

                  <div className="flex justify-center items-center space-y-4 pb-4">
                    <a href={`/admin_product_update/${product.item_id}`}>
                      <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
                        Editar producto
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCards;
