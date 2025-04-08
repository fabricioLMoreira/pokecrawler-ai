import React from "react";
import "./Header.css";
import pokeball from "../../assets/img/pokeball.svg";

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <img src={pokeball} alt="Pokéball" className="header-icon" />
        <h1>Pokecrawler</h1>
      </div>
      <div className="header-divider"></div>
    </header>
  );
};

export default Header;
