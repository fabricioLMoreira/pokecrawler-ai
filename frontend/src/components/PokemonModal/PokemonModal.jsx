import React from "react";
import "./PokemonModal.css";

const PokemonModal = ({ pokemon, onClose }) => (
<div className="modal-overlay" onClick={onClose}>
  <div className="modal-card" onClick={(e) => e.stopPropagation()}>
    <button className="close-button" onClick={onClose}>×</button>

    <div className="modal-content">
      <img src={pokemon.sprite} alt={pokemon.name} className="modal-sprite" />
      <h2 className="modal-name">{pokemon.name}</h2>
      <div className="modal-types">
        {pokemon.type_primary && <span className="modal-type">{pokemon.type_primary}</span>}
        {pokemon.type_secondary && <span className="modal-type">{pokemon.type_secondary}</span>}
      </div>
    </div>
  </div>
</div>


);

export default PokemonModal;
