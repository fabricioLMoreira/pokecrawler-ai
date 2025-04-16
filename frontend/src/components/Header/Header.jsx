
import React, { useContext } from "react";
import "./Header.css";
import pokeball from "../../assets/img/pokeball.svg";
import { AuthContext } from "../../context/AuthProvider";

const Header = () => {
  const { user, login, logout } = useContext(AuthContext);

  return (
    <header className="app-header">
      <div className="header-content">
        <img src={pokeball} alt="Pokéball" className="header-icon" />
        <h1>Pokecrawler - V.0.0.8 Beta</h1>

        <div className="header-user-info">
          {user ? (
            <>
              <span>Olá, <strong>{user}</strong></span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <button onClick={login}>Entrar</button>
          )}
        </div>
      </div>

      <div className="header-divider"></div>
    </header>
  );
};

export default Header;
