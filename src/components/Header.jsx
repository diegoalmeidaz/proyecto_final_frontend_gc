import React from "react";

const Header = () => {
  return (
    <div
      className="header bg-cover bg-center h-screen flex flex-col justify-center items-center text-white relative text-center md:h-auto md:bg-blue-500 md:py-4 md:pb-8 md:px-6"
      style={{
        backgroundImage: `url('https://cdn.cliqueinc.com/posts/298975/designer-dresses-for-women-298975-1648835599732-promo.700x0c.jpg')`,
        height: "60vh",
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

export default Header;
