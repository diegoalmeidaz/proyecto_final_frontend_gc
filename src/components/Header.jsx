import React from "react";

const bannerStyles = {
  height: "60vh",
  position: "relative",
  borderTop: "2px solid white",
  borderBottom: "2px solid white"
};

const Banner1 = () => {
  return (
    <div
      className="header bg-cover bg-center h-screen flex flex-col justify-center items-center text-white text-center md:h-auto md:bg-blue-500 md:py-4 md:pb-8 md:px-6"
      style={{
        backgroundImage: `url('https://cdn.cliqueinc.com/posts/298975/designer-dresses-for-women-298975-1648835599732-promo.700x0c.jpg')`,
        ...bannerStyles
      }}
    >
      <div className="overlay absolute inset-0 bg-black opacity-40 z-10"></div>
      <h1 className="text-5xl font-bold mb-4 text-shadow z-20">Guapa Carlota</h1>
      <h6 className="text-lg font-medium text-shadow z-20">
        ¡Tu próximo evento con nueva tenida!
      </h6>
    </div>
  );
};

const Banner2 = () => {
  return (
    <div
      className="header bg-cover bg-center h-screen flex flex-col justify-center items-center text-white text-center md:h-auto md:bg-blue-500 md:py-4 md:pb-8 md:px-6"
      style={{
        backgroundImage: `url('https://think-feel-discover.com/wp-content/uploads/2021/06/LondonFashionWeekStreetStyle2021_LFW_Dressesstyle_ThinkFeelDiscover_ChrysanthiKosmatou_FashionEditor_Blogger_Vlogger.JPG212.jpg')`,
        ...bannerStyles
      }}
    >
      <div className="overlay absolute inset-0 bg-black opacity-40 z-10"></div>
      <h1 className="text-5xl font-bold mb-4 text-shadow z-20">Rentabiliza tu Closet!</h1>
      <h6 className="text-lg font-medium text-shadow z-20">
        Gana dinero con nuestro club
      </h6>
      <a
        href="/register"
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 z-20"
      >
        Regístrate
      </a>
    </div>
  );
};

const Banner3 = () => {
  return (
    <div
      className="header bg-cover bg-center h-screen flex flex-col justify-center items-center text-white text-center md:h-auto md:bg-blue-500 md:py-4 md:pb-8 md:px-6"
      style={{
        backgroundImage: `url('https://media.istockphoto.com/id/1295901898/photo/young-black-woman-with-curly-hair-in-yellow-dress-and-with-styles-attitude-laughing-happy.jpg?s=612x612&w=0&k=20&c=1TyAV7zs-mqE8CadNeuisB7h78r4KYJAQROlGdowva8=')`,
        ...bannerStyles
      }}
    >
      <div className="overlay absolute inset-0 bg-black opacity-40 z-10"></div>
      <ul className="space-y-2 z-20">
        <li className="text-xl font-bold text-shadow">Prendas únicas</li>
        <li className="text-xl font-bold text-shadow">Telas diferentes</li>
        <li className="text-xl font-bold text-shadow">Moda Circular</li>
        <li className="text-xl font-bold text-shadow">Lujo Accesible</li>
      </ul>
      <a
        href="/dresses"
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 z-20"
      >
        Revisa nuestro catálogo de vestidos
      </a>
    </div>
  );
};

const Header = () => {
  return (
    <div style={{ zIndex: 10 }}>
      <Banner1 />
      <Banner3 />
      <Banner2 />
    </div>
  );
};

export default Header;
