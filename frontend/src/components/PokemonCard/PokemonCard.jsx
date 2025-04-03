import React from "react";
import "./PokemonCard.css";

const PokemonCard = ({ pokemon, onOpenModal }) => {
  return (
    <div className="pokemon-card" onClick={() => onOpenModal(pokemon)}>
      <div className="pokemon-sprite">
        <img src={pokemon.sprite} alt={pokemon.name} />
      </div>
      <div className="pokemon-info">
        <h3>{pokemon.name}</h3>
        <div className="pokemon-types">
          {pokemon.type_primary && <p className="pokemon-type">{pokemon.type_primary}</p>}
          {pokemon.type_secondary && <p className="pokemon-type">{pokemon.type_secondary}</p>}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
