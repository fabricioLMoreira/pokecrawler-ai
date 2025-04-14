import React from "react";
import "./Header.css";
import pokeball from "../../assets/img/pokeball.svg";

const Header = ({ user, onLogout, onLoginClick }) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <img src={pokeball} alt="Pokéball" className="header-icon" />
        <h1>Pokecrawler - V.0.0.3 Beta</h1>

        {/* Zona de autenticação à direita */}
        <div className="header-user-info">
          {user ? (
            <>
              <span>Olá, <strong>{user}</strong></span>
              <button onClick={onLogout}>Logout</button>
            </>
          ) : (
            <button onClick={onLoginClick}>Login</button>
          )}
        </div>
      </div>

      <div className="header-divider"></div>
    </header>
  );
};

export default Header;
