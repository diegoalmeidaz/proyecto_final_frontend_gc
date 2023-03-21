import "../styles/Footer.css";


import React, { useState, useEffect } from "react";

function Footer() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const viewportHeight = window.innerHeight;
    const fullHeight = document.body.clientHeight;
  
    console.log("isHidden:", scrollY > fullHeight * 0.8 - viewportHeight);
    setIsHidden(scrollY > fullHeight * 0.8 - viewportHeight);
  };

  return (
    <footer
      className={`bg-pink-100 text-red-500 fixed bottom-0 w-full py-3 text-center font-semibold ${
        isHidden ? "hide" : ""
      }`}
    >
      Guapa Carlota
    </footer>
  );
}

export default Footer;
