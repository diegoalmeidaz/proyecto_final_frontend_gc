import React, { useState, useContext } from "react";
import { createItem } from "../../core/api_items";
import Context from "../../context/Context";

function CreateProduct() {
  const [formData, setFormData] = useState({
    name: "",
    color: "",
    price: "",
    category: "",
    src: "",
    description: "",
    short_description: "",
    renter_name: "",
    renter_lastname: "",
    size: "",
    availability: false,
    purchase_year: "",
    purchase_country: "",
    renter_email: "",
    laundry_charge: "",
    renters_commision: "",
    safe_deposit: "",
    independent_designer_dress: false,
    purchase_price_paid_by_renter: "",
  });

  const { user } = useContext(Context);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = {
      ...formData,
      user_id: user.user_id,
      role_id: user.role_id,
    };
    try {
      await createItem(newItem);
      alert("Producto creado con éxito");
      setFormData({
        name: "",
        color: "",
        price: "",
        category: "",
        src: "",
        description: "",
        short_description: "",
        renter_name: "",
        renter_lastname: "",
        size: "",
        availability: false,
        purchase_year: "",
        purchase_country: "",
        renter_email: "",
        laundry_charge: "",
        renters_commision: "",
        safe_deposit: "",
        independent_designer_dress: false,
        purchase_price_paid_by_renter: "",
      });
    } catch (error) {
      alert("Error al crear el producto");
      console.error("Error al crear el producto:", error);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage:
          'url("https://media.glamourmagazine.co.uk/photos/63ea4c67eeb41169a4f2de05/master/pass/WEDDING%20GUEST%20130223%20main.jpg")',
      }}
    >
      <div className="bg-white p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Crear producto</h1>
        <form onSubmit={handleSubmit}>
          {/* Aquí irían los campos de entrada del formulario */}
          {/* Añade más campos aquí */}
          {/* Campo name */}
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">
              Nombre<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border rounded w-full p-2"
            />
          </div>

          {/* Campo color */}
          <div className="mb-4">
            <label htmlFor="color" className="block mb-2">
              Color<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              required
              className="border rounded w-full p-2"
            />
          </div>

          {/* Campo price */}
          <div className="mb-4">
            <label htmlFor="price" className="block mb-2">
              Precio<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="border rounded w-full p-2"
            />
          </div>

          {/* Campo category */}
          <div className="mb-4">
            <label htmlFor="category" className="block mb-2">
              Categoría
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>

          {/* Campo src */}
          <div className="mb-4">
            <label htmlFor="src" className="block mb-2">
              URL de la imagen<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="src"
              name="src"
              value={formData.src}
              onChange={handleChange}
              required
              className="border rounded w-full p-2"
            />
          </div>

          {/* Campo description */}
          <div className="mb-4">
            <label htmlFor="description" className="block mb-2">
              Descripción<span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="border rounded w-full p-2"
              rows="4"
            ></textarea>
          </div>

          {/* Campo short_description */}
          <div className="mb-4">
            <label htmlFor="short_description" className="block mb-2">
              Descripción corta<span className="text-red-500">*</span>
            </label>
            <textarea
              id="short_description"
              name="short_description"
              value={formData.short_description}
              onChange={handleChange}
              required
              className="border rounded w-full p-2"
              rows="2"
            ></textarea>
          </div>

          {/* Campo renter_name */}
          <div className="mb-4">
            <label htmlFor="renter_name" className="block mb-2">
              Nombre del arrendador<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="renter_name"
              name="renter_name"
              value={formData.renter_name}
              onChange={handleChange}
              required
              className="border rounded w-full p-2"
            />
          </div>

          {/* Campo renter_lastname */}
          <div className="mb-4">
            <label htmlFor="renter_lastname" className="block mb-2">
              Apellido del arrendador<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="renter_lastname"
              name="renter_lastname"
              value={formData.renter_lastname}
              onChange={handleChange}
              required
              className="border rounded w-full p-2"
            />
          </div>

          {/* Campo renter_email */}
          <div className="mb-4">
            <label htmlFor="renter_email" className="block mb-2">
              Correo electrónico del arrendador
            </label>
            <input
              type="email"
              id="renter_email"
              name="renter_email"
              value={formData.renter_email}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>

          {/* Campo size */}
          <div className="mb-4">
            <label htmlFor="size" className="block mb-2">
              Tamaño<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="size"
              name="size"
              value={formData.size}
              onChange={handleChange}
              required
              className="border rounded w-full p-2"
            />
          </div>

          {/* Campo purchase_year */}
          <div className="mb-4">
            <label htmlFor="purchase_year" className="block mb-2">
              Año de compra
            </label>
            <input
              type="number"
              id="purchase_year"
              name="purchase_year"
              value={formData.purchase_year}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>

          {/* Campo purchase_country */}
          <div className="mb-4">
            <label htmlFor="purchase_country" className="block mb-2">
              País de compra
            </label>
            <input
              type="text"
              id="purchase_country"
              name="purchase_country"
              value={formData.purchase_country}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>

          {/* Campo laundry_charge */}
          <div className="mb-4">
            <label htmlFor="laundry_charge" className="block mb-2">
              Costo de lavandería
            </label>
            <input
              type="number"
              id="laundry_charge"
              name="laundry_charge"
              value={formData.laundry_charge}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>

          {/* Campo renters_commision */}
          <div className="mb-4">
            <label htmlFor="renters_commision" className="block mb-2">
              Comisión del arrendador
            </label>
            <input
              type="number"
              id="renters_commision"
              name="renters_commision"
              value={formData.renters_commision}
              onChange={handleChange}
              className="border rounded w-full p-2"
              step="0.00001"
            />
          </div>

          {/* Campo safe_deposit */}
          <div className="mb-4">
            <label htmlFor="safe_deposit" className="block mb-2">
              Depósito de seguridad
            </label>
            <input
              type="number"
              id="safe_deposit"
              name="safe_deposit"
              value={formData.safe_deposit}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>

          {/* Campo independent_designer_dress */}
          <div className="mb-4">
            <label htmlFor="independent_designer_dress" className="block mb-2">
              Vestido de diseñador independiente
            </label>
            <input
              type="checkbox"
              id="independent_designer_dress"
              name="independent_designer_dress"
              checked={formData.independent_designer_dress}
              onChange={handleCheckboxChange}
              className="border rounded"
            />
          </div>

          {/* Campo purchase_price_paid_by_renter */}
          <div className="mb-4">
            <label
              htmlFor="purchase_price_paid_by_renter"
              className="block mb-2"
            >
              Precio de compra pagado por el arrendador
            </label>
            <input
              type="text"
              id="purchase_price_paid_by_renter"
              name="purchase_price_paid_by_renter"
              value={formData.purchase_price_paid_by_renter}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>

          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Crear producto
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;
