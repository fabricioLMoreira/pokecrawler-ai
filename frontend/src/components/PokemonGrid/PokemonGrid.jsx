import React from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import "./PokemonGrid.css";

const PokemonGrid = ({ pokemons, openModal }) => {
  if (!pokemons || pokemons.length === 0) {
    return <p>Nenhum Pokémon encontrado...</p>;
  }

  return (
    <div className="pokemon-grid">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          onOpenModal={openModal}
        />
      ))}
    </div>
  );
};

export default PokemonGrid;
