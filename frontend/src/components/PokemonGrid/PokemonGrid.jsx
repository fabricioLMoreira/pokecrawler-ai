import React from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import "./PokemonGrid.css";

const PokemonGrid = ({ pokemons, openModal }) => {
  return (
    <div className="pokemon-grid">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} openModal={openModal} />
      ))}
    </div>
  );
};

export default PokemonGrid;
