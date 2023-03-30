import { useState, useEffect } from "react";
import { getUserInfo, updateUser, updatePassword } from "../../core/api_users";
// import { updateUserRole } from "../../core/api_userRoles";
import '../../styles/userEdit.css'
// import {
//   getUserRolesByUserId,
//   updateUserInfoAndRole,
// } from "../../core/api_userRoles";
// import bcrypt from "bcryptjs";



const UserEdit = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    username: "",
    name: "",
    lastname: "",
    phone: "",
  });
  const [address, setAddress] = useState("");
  const [, setRoleUser] = useState(false);
  const [, setRoleRenter] = useState(false);
  const [, setError] = useState(false);
  const [, setSuccess] = useState(false);

// original pre netlify
  // const [address, setAddress] = useState("");
  // const [roleUser, setRoleUser] = useState(false);
  // const [roleRenter, setRoleRenter] = useState(false);
  // const [error, setError] = useState(false);
  // const [success, setSuccess] = useState(false);




  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserInfo();
        // console.log("userData:", userData);
        if (userData) {
          const userId = userData.user_id;
          // console.log("User ID (in fetchUser):", userId); // Aquí

          const rolesData = await getUserInfo(userId);

          // console.log("rolesData:", rolesData);

          if (rolesData) {
            setValues((prevState) => ({ ...prevState, ...userData }));
            setAddress(userData.address || "");

            setRoleUser(rolesData.includes("user"));
            setRoleRenter(rolesData.includes("renter"));
          } else {
            console.error("Error al obtener los roles del usuario.");
          }
        } else {
          console.error("Error al obtener datos del usuario.");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchUser();
  }, []);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmitInfo = async (e) => {
    e.preventDefault();
  
    const updatedUserInfo = {
      ...values,
      address,
    };
  
    try {
      const userId = values.user_id;
      // console.log("User ID:", userId);
      await updateUser(userId, updatedUserInfo);
      setError("");
      setSuccess("Información del usuario actualizada correctamente.");
      alert("Información del usuario actualizada correctamente."); // Añade alerta de navegador
    } catch (error) {
      handleError(error);
    }
  };



  const onSubmitPassword = async (e) => {
    e.preventDefault();
  
    if (values.password) {
      try {
        const userId = values.user_id;
        await updatePassword(userId, values.password);
        setError("");
        setSuccess("Contraseña actualizada correctamente.");
        // console.log(values.password) con esto miro el password que tipio el muchacho
        alert("Contraseña actualizada correctamente.");
      } catch (error) {
        handleError(error);
      }
    } else {
      setError("Debes ingresar una nueva contraseña.");
      setSuccess("");
    }
  };
  
  


// dejaremos la funcionalidad de cambio de rol para despues. Ahora estan todos creandose como "renters" ... 
// cuando la tienda opere mas grande, incluiremos la logica de cambio de rol.

  // const onSubmitRole = async (e) => {
  //   e.preventDefault();

  //   const updatedUserRoles = roleUser
  //     ? roleRenter
  //       ? [3]
  //       : [1]
  //     : roleRenter
  //     ? [2]
  //     : [];

  //   try {
  //     const userId = values.user_id;
  //     await updateUserRole(userId, updatedUserRoles);
  //     setError("");
  //     setSuccess("Rol del usuario actualizado correctamente.");
  //     alert("Contraseña actualizada correctamente."); // alerta de navegador para exito en rol
  //   } catch (error) {
  //     handleError(error);
  //   }
  // };




  const handleError = (error) => {
    if (error.response && error.response.data && error.response.data.errors) {
      setError(error.response.data.errors[0].msg);
    } else {
      setError("Error desconocido al actualizar la información del usuario.");
    }
    setSuccess("");
  };








  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        backgroundImage:
          'url("https://media.glamourmagazine.co.uk/photos/63ea4c67eeb41169a4f2de05/master/pass/WEDDING%20GUEST%20130223%20main.jpg")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        opacity: 0.8,
      }}
    >
      <div className="bg-white p-6 rounded-md shadow-md user-edit-container">
        {/* Sección 1: Información de usuario */}
        <form onSubmit={onSubmitInfo} className="w-full max-w-md px-4">
          <h1 className="text-2xl font-bold mb-4">Editar usuario</h1>

          {/* Nombre */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Nombre
            </label>
            <input
              onChange={onChange}
              type="text"
              className="form-control appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              value={values.name}
              placeholder="Guapa"
            />
          </div>
          {/* Apellido */}
          <div className="mb-6">
            <label
              htmlFor="lastname"
              className="block text-gray-700 font-bold mb-2"
            >
              Apellido
            </label>
            <input
              onChange={onChange}
              type="string"
              value={values.lastname}
              className="form-control appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastname"
              name="lastname"
              placeholder="Carlota"
              required
            />
          </div>

           {/* Mail */}
           <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              eMail
            </label>
            <input
              onChange={onChange}
              type="string"
              value={values.email}
              className="form-control appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              placeholder="guapa@carlota.com"
              required
            />
          </div>

          {/* Dirección */}
          <div className="mb-6">
            <label
              htmlFor="address"
              className="block text-gray-700 font-bold mb-2"
            >
              Dirección
            </label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              type="string"
              value={address}
              className="form-control appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              name="addres"
              placeholder="Calle Guapa 123, Las Condes. Santiago"
              required
            />
          </div>

          {/* Teléfono */}
          <div className="mb-6">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-bold mb-2"
            >
              Teléfono
            </label>
            <input
              onChange={onChange}
              type="string"
              value={values.phone}
              className="form-control appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              name="phone"
              placeholder="+56 9 98422809"
              required
            />
          </div>
          
         




          <button
            type="submit"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Guardar
          </button>

          
        </form>

        

        {/* Sección 2: Cambiar contraseña */}
        <form onSubmit={onSubmitPassword} className="w-full max-w-md px-4 mt-8">
          <h1 className="text-2xl font-bold mb-4">Cambiar contraseña</h1>

          {/* Nueva contraseña */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Nueva contraseña
            </label>
            <input
              onChange={onChange}
              type="password"
              className="form-control appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              value={values.password}
              placeholder="Ingresa una nueva contraseña"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cambiar contraseña
          </button>
        </form>

        {/* Sección 3: Seleccionar rol */}
        {/* <form onSubmit={onSubmitRole} className="w-full max-w-md px-4 mt-8">
          <h1 className="text-2xl font-bold mb-4">Seleccionar rol</h1>

   
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">Roles</label>
            <div>
              <input
                onChange={() => setRoleUser(!roleUser)}
                type="checkbox"
                className="mr-2"
                id="roleUser"
                name="roleUser"
                checked={roleUser}
              />
              <label htmlFor="roleUser" className="text-gray-700 font-bold">
                Usuario
              </label>
            </div>
            <div>
              <input
                onChange={() => setRoleRenter(!roleRenter)}
                type="checkbox"
                className="mr-2"
                id="roleRenter"
                name="roleRenter"
                checked={roleRenter}
              />
              <label htmlFor="roleRenter" className="text-gray-700 font-bold">
                Arrendador
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Actualizar rol
          </button>
        </form> */}
      </div>
    </div>
  );
};

export default UserEdit;
