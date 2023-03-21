import { useState, useEffect } from "react";
import { getUserInfo, updateUser } from "../../core/api_users";
import { getUserRoles} from "../../core/api_roles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserRolesByUserId, updateUserInfoAndRole } from "../../core/api_userRoles";

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
  const [roleUser, setRoleUser] = useState(false);
  const [roleRenter, setRoleRenter] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserInfo();
        console.log("userData:", userData);
    
        if (userData) {
          const userId = userData.user_id;
          const rolesData = await getUserRolesByUserId(userId);
    
          console.log("rolesData:", rolesData);
    
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

  const onSubmit = async (e) => {
  e.preventDefault();

  // Actualiza la información del usuario con los valores actuales
  const updatedUserInfo = {
    ...values,
    address,
    roles: roleUser ? (roleRenter ? [3] : [1]) : roleRenter ? [2] : [],
  };

  try {
    // Llama a updateUserInfoAndRole con el userId y la información actualizada del usuario
    const userId = values.user_id;
    await updateUserInfoAndRole(userId, updatedUserInfo);

    setError("");
    setSuccess("Información del usuario actualizada correctamente.");
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      setError(error.response.data.errors[0].msg);
    } else {
      setError('Error desconocido al actualizar la información del usuario.');
    }
    setSuccess("");
  }
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
      <div className="bg-white p-6 rounded-md shadow-md">
        <form onSubmit={(e) => onSubmit(e)} className="w-full max-w-md px-4">
          <h1 className="text-2xl font-bold mb-4">Editar usuario</h1>

          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Nombre
            </label>
            <input
              onChange={(e) => onChange(e)}
              type="text"
              className="form-control appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              value={values.name}
              placeholder="Guapa"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="Lastname"
              className="block text-gray-700 font-bold mb-2"
            >
              Apellido
            </label>
            <input
              onChange={(e) => onChange(e)}
              type="string"
              value={values.lastname}
              className="form-control appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastname"
              name="lastname"
              placeholder="Carlota"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="Lastname"
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
              placeholder="Guapa Street 123, Las Condes. Santiago"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="Lastname"
              className="block text-gray-700 font-bold mb-2"
            >
              Telefono
            </label>
            <input
              onChange={(e) => onChange(e)}
              type="string"
              value={values.phone}
              className="form-control appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              name="phone"
              placeholder="+56 9 98422809"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Nueva contraseña
            </label>
            <input
              onChange={(e) => onChange(e)}
              type="password"
              className="form-control appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              value={values.password}
              placeholder="Nueva contraseña"
            />
          </div>

          <div className="form-group">
            <label htmlFor="role"></label>
            <select
              id="role"
              name="role"
              value={roleUser ? "user" : roleRenter ? "renter" : ""}
              onChange={(e) => {
                setRoleUser(e.target.value === "user");
                setRoleRenter(e.target.value === "renter");
              }}
            >
              <option value="">Selecciona un rol</option>
              <option value="user">Usuario</option>
              <option value="renter">Renter</option>
            </select>
          </div>

          <div style={{ color: "red", margin: "10px 0" }}>{error}</div>
          <div style={{ color: "green", margin: "10px 0" }}>{success}</div>

          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEdit;
