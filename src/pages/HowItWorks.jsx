import React from "react";
import { FaCalendarAlt, FaTshirt, FaCar, FaEnvelope, FaTruckPickup } from "react-icons/fa";

const HowItWorks = () => {
  return (
    <div
      className="how-it-works-container bg-cover bg-center h-screen flex flex-col justify-center items-center text-white text-center md:h-auto md:bg-blue-500 md:py-4 md:pb-8 md:px-6"
      style={{
        backgroundImage: `url(${require("../assets/img/flaca.png")})`,
        minHeight: "125vh",
      }}
    >
      <div
        className="overlay-container absolute inset-0 z-10 flex items-center justify-center"
        style={{ width: "100%", height: "100%" }}
      >
        <div className="overlay bg-black opacity-0" style={{ width: "90%", height: "80%" }}></div>
      </div>
      <div className="z-20 w-full">
        <h2 className="text-center text-3xl font-bold mb-8 text-shadow">Cómo funciona Guapa Carlota</h2>
        <div className="px-4 py-8 md:px-12 md:py-16">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
              <div className="flex-1">
                <div className="flex items-center space-x-4">
                  <FaCalendarAlt className="text-3xl text-red-500" />
                  <h3 className="text-xl font-bold text-shadow">Paso 1</h3>
                </div>
                <p className="mt-2 text-shadow">
                  Agenda tu visita a nuestro showroom para que te pruebes lo que te gusta sin costo alguno.
                </p>
              </div>
            </div>
            <hr className="border-t border-pink-100" />
            <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
              <div className="flex-1">
                <div className="flex items-center space-x-4">
                  <FaTshirt className="text-3xl text-red-500" />
                  <h3 className="text-xl font-bold text-shadow">Paso 2</h3>
                </div>
                <p className="mt-2 text-shadow">
                  Elige la tenida que te gusta y resérvala para la fecha de tu evento.
                  <br />
                  <strong>*Para reservar tendrás que abonar el valor de arriendo + la garantía*</strong>
                </p>
              </div>
            </div>
            <hr className="border-t border-pink-100" />
            <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
              <div className="flex-1">
                <div className="flex items-center space-x-4">
                  <FaCar className="text-3xl text-red-500" />
                  <h3 className="text-xl font-bold text-shadow">Paso 3</h3>
                </div>
                <p className="mt-2 text-shadow">
                  Retira tu tenida el día previamente coordinado y sé
                  la más guapa del evento!
                </p>
              </div>
            </div>
            <hr className="border-t border-pink-100" />
            <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
              <div className="flex-1">
                <div className="flex items-center space-x-4">
                  <FaEnvelope className="text-3xl text-red-500" />
                  <h3 className="text-xl font-bold text-shadow">Paso 4</h3>
                </div>
                <p className="mt-2 text-shadow">
                  Devuelve la tenida el día domingo o lunes am y el martes de devolvemos la garantía.
                  <br />
                  <strong>*Nosotras nos encargamos de la tintorería*</strong>
                </p>
              </div>
            </div>
            <hr className="border-t border-pink-100" />
            <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
              <div className="flex-1">
                <div className="flex items-center space-x-4">
                  <FaTruckPickup className="text-3xl text-red-500" />
                  <h3 className="text-xl font-bold text-shadow">Paso 5</h3>
                </div>
                <p className="mt-2 text-shadow">
                  Recuerda que si quieres, nosotras podemos pasar a retirar la tenida con previa coordinación.
                  <br />
                  Este servicio tiene un costo extra de $4.000.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
