
// recordar que como la funcionalidad de los favoritos aun no esta en linea tuvimos que dejar el is_liked como falso cada vez que se envia el request.
// Cuando se habilite el modulo hay que hacer generar un checkbox para esto.
// tuve que dejarlo asi para cuando mandara la consulta no se cayera porque se estaba mandando un dato vacio y la consulta se caia. 

import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Context from "../../context/Context";
import { getSingleItem, updateItem, deleteItem } from "../../core/api_items";
import FormInput from "../../components/AdminOpsComponents/FormInput";
import FormTextarea from "../../components/AdminOpsComponents/FormTarea";
import FormCheckbox from "../../components/AdminOpsComponents/FormCheckbox";
import Switch from "react-switch";
import { apiClient } from "../../core/api_base_url";

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
  const { item_id } = useParams();
  const [productToUpdate, setProductToUpdate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const product = await getSingleItem(item_id);
        setProductToUpdate(product);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
        alert("Hubo un error al obtener el producto");
      }
      setIsLoading(false);
    };

    fetchProduct();
  }, [item_id]);

  const initialValues = fields.reduce(
    (acc, field) => ({
      ...acc,
      [field.id]: field.type === "checkbox" ? false : "",
    }),
    { availability: false } // Agrega "availability" al objeto initialValues
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

  const updateFormData = (product) => {
    const updatedProduct = {};
  
    for (const key in product) {
      updatedProduct[key] = product[key] === null ? "" : product[key];
    }
  
    setFormData(updatedProduct);
  };
  

  

  useEffect(() => {
    if (user !== null) {
      setLoading(false);
    }
    if (isUpdate) {
      updateFormData(productToUpdate);
    }
  }, [user, productToUpdate, isUpdate]);

  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let newItem = {
      ...formData,
      user_id: user.user_id,
     
      renter_name: user.name,
      renter_lastname: user.lastname,
      renter_email: user.email,
      is_liked: formData.is_liked || false,
      
    };
  
    if (user.role === "renter") {
      newItem = {
        ...newItem,
        price: formData.price,
        renters_commision: formData.renters_commision,
        safe_deposit: formData.safe_deposit,
        laundry_charge: formData.laundry_charge,
        is_liked: formData.is_liked || false,// este fue el fix, sin embargo esto tiene que mantenerse dinamico, 
      };
    }
  
    // console.log("Datos del formulario:", newItem);
    try {
      if (productToUpdate) {
        await updateItem(item_id, newItem);
        alert("Producto actualizado con éxito");
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      if (error.response) {
        
       // console.log("Datos de la respuesta del servidor:", error.response.data);
        console.log("Código de estado:", error.response.status);
        console.log("Encabezados:", error.response.headers);
      } else if (error.request) {
        // La solicitud se realizó pero no se recibió ninguna respuesta
        console.log("Datos de la solicitud:", error.request);
      } else {
        // Algo ocurrió al configurar la solicitud que provocó un error
        console.log("Error en la configuración de la solicitud:", error.message);
      }
      alert("Error al actualizar el producto");
    }
  };
  

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        await deleteItem(item_id);
        alert("Producto eliminado correctamente");
        navigate("/admin_catalogue_view"); // Redirige a la ruta AdminCards
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        alert("Hubo un error al eliminar el producto");
      }
    }
  };

  const toggleAvailability = async () => {
    try {
      // Cambia el estado de disponibilidad
      const newAvailability = !formData.availability;

      // Realiza la solicitud PUT para actualizar la disponibilidad del producto
      await apiClient.put(`/items/${item_id}`, {
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
          {formData.src && (
            <div className="mb-4">
              
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
             {user.role === "admin" && (
            <>
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
            </>
          )}
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4 w-full"
          >
            {isUpdate ? "Actualizar" : "Crear"} producto
          </button>
          {user.role === "admin" && isUpdate && (
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4 w-full"
            >
              Eliminar producto
            </button>
          )}
        </form>
      </div>
    </div>
  </div>
);
}

export default AdminProductUpdate;



