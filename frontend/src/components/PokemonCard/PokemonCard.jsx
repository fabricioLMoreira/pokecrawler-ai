import React from "react";
import "./PokemonCard.css";

const PokemonCard = ({ pokemon, openModal }) => {
  const handleClick = () => {
    openModal(pokemon);
  };

  return (
    <div className="pokemon-card" onClick={handleClick}>
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
