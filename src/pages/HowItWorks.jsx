import React from "react";
import { FaCalendarAlt, FaTshirt, FaCar, FaEnvelope, FaTruckPickup } from "react-icons/fa";

const HowItWorks = () => {
  return (
    <div className="px-4 py-8 md:px-12 md:py-16">
      <h2 className="text-center text-3xl font-bold mb-8 text-red-500">Cómo funciona</h2>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="flex-1">
            <div className="flex items-center space-x-4">
              <FaCalendarAlt className="text-3xl text-red-500" />
              <h3 className="text-xl font-bold">Paso 1</h3>
            </div>
            <p className="mt-2">
              Agenda tu visita a nuestro showroom para que te pruebes lo que te gusta sin costo alguno.
            </p>
          </div>
        </div>
        <hr className="border-t border-pink-100" />
        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="flex-1">
            <div className="flex items-center space-x-4">
              <FaTshirt className="text-3xl text-red-500" />
              <h3 className="text-xl font-bold">Paso 2</h3>
            </div>
            <p className="mt-2">
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
              <h3 className="text-xl font-bold">Paso 3</h3>
            </div>
            <p className="mt-2">
              Retira tu tenida el día previamente coordinado y sé la más guapa del evento!
            </p>
          </div>
        </div>
        <hr className="border-t border-pink-100" />
        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="flex-1">
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-3xl text-red-500" />
              <h3 className="text-xl font-bold">Paso 4</h3>
            </div>
            <p className="mt-2">
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
              <h3 className="text-xl font-bold">Paso 5</h3>
            </div>
            <p className="mt-2">
              Recuerda que si quieres, nosotras podemos pasar a retirar la tenida con previa coordinación.
              <br />
              Este servicio tiene un costo extra de $4.000.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
