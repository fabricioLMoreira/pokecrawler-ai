import React, { useState } from "react";
import { login } from "../../services/pokemonApi";
import "./LoginModal.css";
import pokeball from "../../assets/img/pokeball.svg";

const LoginModal = ({ onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await login(username, password);
      setError("");
      onLoginSuccess();
      onClose();
    } catch (err) {
      setError("Utilizador ou password inválidas.");
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="login-card slide-in" onClick={(e) => e.stopPropagation()}>
        <img src={pokeball} alt="Pokéball" className="login-icon" />
        <h2>Bem-vindo Treinador!</h2>

        {error && <div className="login-error">{error}</div>}

        <input
          type="text"
          placeholder="Utilizador"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="login-buttons">
          <button onClick={onClose}>Cancelar</button>
          <button onClick={handleLogin}>Entrar</button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
