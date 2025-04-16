import React from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import "./PokemonGrid.css";

const PokemonGrid = ({ pokemons, openModal, user, onEdit, onDelete }) => {
  return (
    <div className="pokemon-grid">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          openModal={openModal}
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default PokemonGrid;
