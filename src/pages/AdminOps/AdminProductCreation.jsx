import React, { useState, useContext, useEffect } from "react";
import { createItem } from "../../core/api_items";
import Context from "../../context/Context";
import FormInput from "../../components/AdminOpsComponents/FormInput";
import FormTextarea from "../../components/AdminOpsComponents/FormTarea";
import FormCheckbox from "../../components/AdminOpsComponents/FormCheckbox";

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
  { id: "renter_name", label: "Nombre del arrendador", type: "text", required: true },
  { id: "renter_lastname", label: "Apellido del arrendador", type: "text", required: true },
  { id: "renter_email", label: "Correo electrónico del arrendador", type: "email" },
  { id: "size", label: "Tamaño", type: "text", required: true },
  { id: "purchase_year", label: "Año de compra", type: "number" },
  { id: "purchase_country", label: "País de compra", type: "text" },
  { id: "laundry_charge", label: "Costo de lavandería", type: "number" },
  { id: "renters_commision", label: "Comisión del arrendador", type: "number", step: "0.00001" },
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

function CreateProduct() {
    const initialValues = fields.reduce(
      (acc, field) => ({ ...acc, [field.id]: field.type === "checkbox" ? false : "" }),
      {}
    );
    const [formData, setFormData] = useState(initialValues);
    const { user } = useContext(Context);
    
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const renterFields = fields.filter(
      (field) => ![
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

    useEffect(() => {
      if (user !== null) {
        setLoading(false);
      }
    }, [user]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      let newItem = {
        ...formData,
        user_id: user.user_id,
        role_id: user.role,
        renter_name: user.name,
      renter_lastname: user.lastname,
      renter_email: user.email,



        availability: false, // establece la disponibilidad como FALSE por defecto
      };
    
      if (user.role === "renter") {
        newItem = {
          ...newItem,
        price: formData.price || 0,
        renters_commision: formData.renters_commision || 0,
        safe_deposit: formData.safe_deposit || 0,
        laundry_charge: formData.laundry_charge || 0,
        is_like: formData.is_like || false,
        };
      }

      if (user.role === "admin") {
        newItem = {
          ...newItem,
          is_like: formData.is_like || false,
        };
      }


    
      console.log("Datos del formulario:", newItem);
      console.log("Valor de brand en newItem:", newItem.brand);
      try {
        await createItem(newItem);
        alert("Producto creado con éxito");
        setFormData(initialValues);
      } catch (error) {
        alert("Error al crear el producto, debes completar todos los campos de información");
      }
    };


    if (loading) {
      return <div>Cargando...</div>;
    }
  
    return (
      <div className="min-h-screen bg-cover bg-no-repeat bg-center flex flex-col justify-between" style={{ backgroundImage: 'url("https://media.glamourmagazine.co.uk/photos/63ea4c67eeb41169a4f2de05/master/pass/WEDDING%20GUEST%20130223%20main.jpg")' }}>
        <div className="container mx-auto">
          <div className="bg-white p-6 rounded-md shadow-md mx-auto mt-16 mb-16 max-w-lg">
            <h1 className="text-2xl font-bold mb-4 text-center text-red-500">Crear producto</h1>
            <form onSubmit={handleSubmit}>
              {(user.role === "admin" ? fields : renterFields).map((field) => {
                if (field.type === "text" || field.type === "number" || field.type === "email") {
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
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Crear producto
              </button>
            </form>
          </div>
        </div>
      </div>
    );
    
}

export default CreateProduct;