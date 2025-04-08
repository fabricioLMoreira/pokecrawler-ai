import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <svg
        className="pokeball"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Parte vermelha */}
        <path d="M0,50 a50,50 0 1,1 100,0" fill="#ff0000" />
        {/* Parte branca */}
        <path d="M0,50 a50,50 0 0,0 100,0" fill="#ffffff" />
        {/* Círculo central */}
        <circle cx="50" cy="50" r="15" fill="#ffffff" stroke="#000" strokeWidth="6" />
        <circle cx="50" cy="50" r="7" fill="#000000" />
      </svg>
    </div>
  );
};

export default Loading;
