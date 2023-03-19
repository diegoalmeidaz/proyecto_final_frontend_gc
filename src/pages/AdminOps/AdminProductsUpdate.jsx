import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Context from "../../context/Context";

import { getSingleItem, updateItem, createItem } from "../../core/api_items";
import axios from "axios";
import FormInput from "../../components/AdminOpsComponents/FormInput";
import FormTextarea from "../../components/AdminOpsComponents/FormTarea";
import FormCheckbox from "../../components/AdminOpsComponents/FormCheckbox";
import Switch from "react-switch";

const fields = [
  { id: "name", label: "Nombre", type: "text", required: true },
  { id: "color", label: "Color", type: "text", required: true },
  { id: "price", label: "Precio Arriendo", type: "number", required: true },
  { id: "brand", label: "Marca", type: "text", required: true },
  { id: "category", label: "Categoría", type: "text" },
  { id: "src", label: "URL de la imagen", type: "text", required: true },
  { id: "description", label: "Descripción", type: "textarea", required: true },
  {
    id: "short_description",
    label: "Descripción corta",
    type: "textarea",
    required: true,
  },
  {
    id: "renter_name",
    label: "Nombre del arrendador",
    type: "text",
    required: true,
  },
  {
    id: "renter_lastname",
    label: "Apellido del arrendador",
    type: "text",
    required: true,
  },
  {
    id: "renter_email",
    label: "Correo electrónico del arrendador",
    type: "email",
  },
  { id: "size", label: "Tamaño", type: "text", required: true },
  { id: "purchase_year", label: "Año de compra", type: "number" },
  { id: "purchase_country", label: "País de compra", type: "text" },
  { id: "laundry_charge", label: "Costo de lavandería", type: "number" },
  {
    id: "renters_commision",
    label: "Comisión del arrendador",
    type: "number",
    step: "0.00001",
  },
  { id: "safe_deposit", label: "Depósito de seguridad", type: "number" },
  {
    id: "independent_designer_dress",
    label: "Vestido de diseñador independiente",
    type: "checkbox",
  },
  {
    id: "purchase_price_paid_by_renter",
    label: "Precio de compra pagado por el arrendador",
    type: "text",
  },
];

function AdminProductUpdate() {
  const { item_id } = useParams(); // Obtén el item_id de la ruta.
  const [productToUpdate, setProductToUpdate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      const product = await getSingleItem(item_id);
      setProductToUpdate(product);
      setIsLoading(false);
    };

    fetchProduct();
  }, [item_id]);

  const initialValues = fields.reduce(
    (acc, field) => ({
      ...acc,
      [field.id]: field.type === "checkbox" ? false : "",
    }),
    {}
  );

  const [formData, setFormData] = useState(initialValues);
  const { user } = useContext(Context);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const renterFields = fields.filter(
    (field) =>
      ![
        "price",
        "renters_commision",
        "safe_deposit",
        "laundry_charge",
        "renter_name",
        "renter_lastname",
        "renter_email",
      ].includes(field.id)
  );

  const [loading, setLoading] = useState(true);
  const isUpdate = !!productToUpdate;

  const toggleAvailability = async () => {
    try {
      // Cambia el estado de disponibilidad
      const newAvailability = !formData.availability;

      // Realiza la solicitud PUT para actualizar la disponibilidad del producto
      await axios.put(`http://localhost:8000/items/${formData.item_id}`, {
        availability: newAvailability,
      });

      // Actualiza el estado del producto en tu componente
      setFormData({ ...formData, availability: newAvailability });

      // Muestra un mensaje de éxito
      alert("La disponibilidad del producto ha sido actualizada");
    } catch (error) {
      // Maneja el error si la solicitud falla
      console.error(
        "Error al actualizar la disponibilidad del producto:",
        error
      );
      alert("Hubo un error al actualizar la disponibilidad del producto");
    }
  };

  useEffect(() => {
    if (user !== null) {
      setLoading(false);
    }
    if (isUpdate) {
      setFormData(productToUpdate);
    }
  }, [user, productToUpdate, isUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... Aquí iría el código para definir "newItem" sin cambios
    let newItem = {
      ...formData,
      user_id: user.user_id,
      role_id: user.role,
      renter_name: user.name,
      renter_lastname: user.lastname,
      renter_email: user.email,
    };

    if (user.role === "renter") {
      newItem = {
        ...newItem,
        price: formData.price,
        renters_commision: formData.renters_commision,
        safe_deposit: formData.safe_deposit,
        laundry_charge: formData.laundry_charge,
      };
    }

    console.log("Datos del formulario:", newItem);
    try {
      if (isUpdate) {
        await updateItem(newItem);
        alert("Producto actualizado con éxito");
      } else {
        await createItem(newItem);
        alert("Producto creado con éxito");
        setFormData(initialValues);
      }
    } catch (error) {
      alert(`Error al ${isUpdate ? "actualizar" : "crear"} el producto`);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat bg-center flex flex-col justify-between"
      style={{
        backgroundImage:
          'url("https://media.glamourmagazine.co.uk/photos/63ea4c67eeb41169a4f2de05/master/pass/WEDDING%20GUEST%20130223%20main.jpg")',
      }}
    >
      <div className="container mx-auto">
        <div className="bg-white p-6 rounded-md shadow-md mx-auto mt-16 mb-16 max-w-lg">
          <h1 className="text-2xl font-bold mb-4 text-center text-red-500">
            Modificar Producto
          </h1>
          {/* Agrega un componente para mostrar la imagen del producto */}
          {formData.src && (
            <div className="mb-4">
              <img
                src={formData.src}
                alt={formData.name}
                className="mx-auto w-full h-64 object-cover object-center"
              />
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {(user.role === "admin" ? fields : renterFields).map((field) => {
              if (
                field.type === "text" ||
                field.type === "number" ||
                field.type === "email"
              ) {
                return (
                  <FormInput
                    key={field.id}
                    name={field.id}
                    type={field.type}
                    label={field.label}
                    value={formData[field.id]}
                    onChange={handleChange}
                    required={field.required}
                    step={field.step}
                  />
                );
              } else if (field.type === "textarea") {
                return (
                  <FormTextarea
                    key={field.id}
                    name={field.id}
                    label={field.label}
                    value={formData[field.id]}
                    onChange={handleChange}
                    required={field.required}
                  />
                );
              } else if (field.type === "checkbox") {
                return (
                  <FormCheckbox
                    key={field.id}
                    name={field.id}
                    label={field.label}
                    checked={formData[field.id]}
                    onChange={handleChange}
                  />
                );
              }
              return null;
            })}
            <div className="flex justify-between items-center">
              <label htmlFor="availability" className="mr-4">
                {formData.availability
                  ? "Producto disponible"
                  : "Producto no disponible"}
              </label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <Switch
                  onChange={toggleAvailability}
                  checked={formData.availability}
                  offColor="#ccc"
                  onColor="#32CD32" // Color verde cuando esté activado
                  className="react-switch gray-switch"
                  height={22}
                  width={48}
                  handleDiameter={24}
                />
                
              </div>
            </div>

            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4 w-full"
            >
              {isUpdate ? "Actualizar" : "Crear"} producto
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminProductUpdate;
