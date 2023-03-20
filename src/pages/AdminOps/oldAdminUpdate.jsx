
// ESTE Admin update estaba funcionando pero sin los filtros claves.


import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Context from "../../context/Context";
import { getSingleItem, updateItem, deleteItem } from "../../core/api_items";
import FormInput from "../../components/AdminOpsComponents/FormInput";
import FormTextarea from "../../components/AdminOpsComponents/FormTarea";
import FormCheckbox from "../../components/AdminOpsComponents/FormCheckbox";
import Switch from "react-switch";
import axios from "axios"

const fields = [
  { id: "item_id", label: "Item_Id", type: "text", required: true },
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







  {
    id: "availability",
    label: "Disponibilidad",
    type: "switch",
  },
];

function AdminProductUpdate() {
  const { item_id } = useParams();
  const [productToUpdate, setProductToUpdate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const product = await getSingleItem(item_id);
        setProductToUpdate(product);
  
        // Establece los valores iniciales después de cargar el producto
        setFormValues(() => {
          return fields.reduce((acc, field) => {
            acc[field.id] = product[field.id] ? product[field.id] : "";
            return acc;
          }, {});
        });
      } catch (error) {
        console.error("Error al obtener el producto:", error);
        alert("Hubo un error al obtener el producto");
      }
      setIsLoading(false);
    };
  
    fetchProduct();
  }, [item_id]);

  
  
const [formValues, setFormValues] = useState({});
const initialValues = fields.reduce(
  (acc, field) => {
    acc[field.id] = productToUpdate ? productToUpdate[field.id] : "";
    return acc;
  },
  {}
);


  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleCheckboxChange = (e) => { 
    const { name, checked } = e.target;
    setFormValues({ ...formValues, [name]: checked });
  };

  const handleSwitchChange = (checked, name) => {
    setFormValues({ ...formValues, [name]: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateItem(item_id, formValues);
      alert("Producto actualizado con éxito");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      alert("Hubo un error al actualizar el producto");
    }

    setIsSubmitting(false);
  };

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        await deleteItem(item_id);
        alert("Producto eliminado con éxito");
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        alert("Hubo un error al eliminar el producto");
      }
    }
  };
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
          Agregar FOTO DINAMICA PARA QUE SE VEA DEBAJO DEL TITULO
          <form onSubmit={handleSubmit}>
            {fields.map((field) => {
              if (field.type === "textarea") {
                return (
                  <FormTextarea
                    key={field.id}
                    label={field.label}
                    name={field.id}
                    value={formValues[field.id]}
                    onChange={handleChange}
                    required={field.required}
                  />
                );
              } else if (field.type === "checkbox") {
                return (
                  <FormCheckbox
                    key={field.id}
                    label={field.label}
                    name={field.id}
                    checked={formValues[field.id]}
                    onChange={handleCheckboxChange}
                  />
                );
              } else if (field.type === "switch") {
                return (
                  <div key={field.id} className="flex justify-between items-center mt-4">
                    <label htmlFor={field.id} className="mr-4">
                      {formValues[field.id] ? "Producto disponible" : "Producto no disponible"}
                    </label>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                      <Switch
                        onChange={(checked) => handleSwitchChange(checked, field.id)}
                        checked={formValues[field.id]}
                        offColor="#ccc"
                        onColor="#32CD32" // Color verde cuando esté activado
                        className="react-switch gray-switch"
                        height={22}
                        width={48}
                        handleDiameter={24}
                      />
                    </div>
                  </div>
                );
              } else {
                return (
                  <FormInput
                    key={field.id}
                    label={field.label}
                    name={field.id}
                    type={field.type}
                    value={formValues[field.id]}
                    onChange={handleChange}
                    required={field.required}
                  />
                );
              }
            })}
  
            <button type="submit" disabled={isSubmitting} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4 w-full">
              Actualizar producto
            </button>
            <button type="button" onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4 w-full">
              Eliminar producto
            </button>
          </form>
        </div>
      </div>
    </div>
  );
          }  

export default AdminProductUpdate;

