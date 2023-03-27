import React from "react";
import Step1 from "../assets/img/Steps/Paso1.PNG";
import Step2 from "../assets/img/Steps/Paso2.PNG";
import Step3 from "../assets/img/Steps/Paso3.PNG";
import Step4 from "../assets/img/Steps/Paso4.PNG";
import Step5 from "../assets/img/Steps/Paso5.PNG";





const MiniLanding = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-5 md:grid-rows-2 gap-4 h-full">
          <div className="relative h-full">
            <img
              src={Step1}
              alt="Paso 1"
              className="w-full h-full object-fit"
            />
            <div className="absolute inset-0 border-2 border-white shadow-lg"></div>
          </div>
          <div className="relative h-full col-span-2">
            <img
              src={Step2}
              alt="Paso 2"
              className="w-full h-full object-fit"
            />
            <div className="absolute inset-0 border-2 border-white shadow-lg"></div>
          </div>
          <div className="relative h-full">
            <img
              src={Step3}
              alt="Paso 3"
              className="w-full h-full object-fit"
            />
            <div className="absolute inset-0 border-2 border-white shadow-lg"></div>
          </div>
          <div className="relative h-full col-span-2 row-span-2">
            <img
              src={Step4}
              alt="Paso 4"
              className="w-full h-full object-fit"
            />
            <div className="absolute inset-0 border-2 border-white shadow-lg"></div>
          </div>
          <div className="relative h-full">
            <img
              src={Step5}
              alt="Paso 5"
              className="w-full h-full object-fit"
            />
            <div className="absolute inset-0 border-2 border-white shadow-lg"></div>
          </div>
        </div>
      );
    };

export default MiniLanding;
