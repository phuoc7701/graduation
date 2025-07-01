import React, { useEffect } from "react";
import "./StarBackground.css";

const StarBackground = () => {
  useEffect(() => {
    const starField = document.getElementById("star-field");
    function createStar() {
      const star = document.createElement("div");
      star.className = "star";
      star.style.left = `${Math.random() * 100}vw`;
      star.style.animationDuration = `${2 + Math.random() * 3}s`;
      star.style.opacity = Math.random();
      starField.appendChild(star);

      setTimeout(() => {
        star.remove();
      }, 5000);
    }
    const interval = setInterval(createStar, 150);
    return () => clearInterval(interval);
  }, []);
  return <div id="star-field"></div>;
};

export default StarBackground;