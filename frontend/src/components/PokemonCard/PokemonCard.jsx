import React from "react";
import "./PokemonCard.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const PokemonCard = ({ pokemon, openModal, user, onEdit, onDelete }) => {
  const handleClick = () => {
    openModal(pokemon);
  };

  return (
    <div className="pokemon-card" onClick={handleClick}>
      {user && (
        <div className="card-icons">
          <FaEdit
            className="edit-icon"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(pokemon);
            }}
          />
          <FaTrash
            className="delete-icon"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(pokemon.id);
            }}
          />
        </div>
      )}

      <div className="pokemon-sprite">
        <img src={pokemon.sprite} alt={pokemon.name} />
      </div>

      <div className="pokemon-info">
        <h3>{pokemon.name}</h3>
        <div className="pokemon-types">
          {pokemon.type_primary && (
            <span className="pokemon-type">{pokemon.type_primary}</span>
          )}
          {pokemon.type_secondary && (
            <span className="pokemon-type">{pokemon.type_secondary}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
