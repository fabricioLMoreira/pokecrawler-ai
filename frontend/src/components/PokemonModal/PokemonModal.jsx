import React from "react";
import "./PokemonModal.css";

const PokemonModal = ({ pokemon, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="modal-close" onClick={onClose}>X</button>
      <img src={pokemon.sprite} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
      <p><strong>Tipo:</strong> {pokemon.type_primary} {pokemon.type_secondary && ` / ${pokemon.type_secondary}`}</p>
    </div>
  </div>
);

export default PokemonModal;
