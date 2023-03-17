import { useState } from "react";
import { onLogin } from "../core/api_users";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../core/authSlice";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import Context from '../context/Context';

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate(); 



  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await onLogin(values);
      dispatch(authenticateUser());

      localStorage.setItem("isAuth", "true");

      
      navigate("/success");
    } catch (error) {
      console.log(error.response.data.errors[0].msg);
      setError(error.response.data.errors[0].msg);
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
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        <form onSubmit={(e) => onSubmit(e)}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-bold mb-2"
            >
              Username
            </label>
            <input
              onChange={(e) => onChange(e)}
              type="username"
              className="form-control appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              name="username"
              value={values.username}
              placeholder="GuapaCarlota"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Contraseña
            </label>
            <input
              onChange={(e) => onChange(e)}
              type="password"
              value={values.password}
              className="form-control appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              placeholder="contraseña"
              required
            />
          </div>

          <div style={{ color: "red", margin: "10px 0" }}>{error}</div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Entrar
          </button>
        </form>

        <div className="flex flex-col mt-4">
          <p>
            ¿No tienes cuenta?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
