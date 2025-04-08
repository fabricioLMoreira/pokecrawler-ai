import React, { useEffect, useState } from "react";
import { getAllPokemons, getPokemonTypes } from "../services/pokemonApi";
import Header from "../components/Header/Header";
import Filters from "../components/Filters/Filters";
import Pagination from "../components/Pagination/Pagination";
import PokemonGrid from "../components/PokemonGrid/PokemonGrid";
import PokemonModal from "../components/PokemonModal/PokemonModal";
import Loading from "../components/Loading/Loading";
import "./Home.css";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Carrega Pokémons e Tipos
  useEffect(() => {
    getAllPokemons()
      .then((res) => {
        setPokemons(res.data);
        setFilteredPokemons(res.data);
      })
      .catch((err) => console.error("Erro ao obter pokémons:", err));

    getPokemonTypes()
      .then((res) => setTypes(res.data))
      .catch((err) => console.error("Erro ao obtem tipos:", err));
  }, []);

  // Aplica filtros
  useEffect(() => {
    const results = pokemons.filter((p) => {
      const termo = search.toLowerCase();

      const matchesName = p.name.toLowerCase().includes(termo);
      const matchesPrimaryType = p.type_primary?.toLowerCase().includes(termo);
      const matchesSecondaryType = p.type_secondary?.toLowerCase().includes(termo);

      const matchesSearch = matchesName || matchesPrimaryType || matchesSecondaryType;

      const matchesTypeFilter =
        !typeFilter ||
        p.type_primary?.toLowerCase() === typeFilter.toLowerCase() ||
        p.type_secondary?.toLowerCase() === typeFilter.toLowerCase();

      return matchesSearch && matchesTypeFilter;
    });

    setFilteredPokemons(results);
    setCurrentPage(1);
  }, [search, typeFilter, pokemons]);

  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentPokemons = filteredPokemons.slice(indexOfFirst, indexOfLast);

  const openModal = (pokemon) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
    setIsModalOpen(false);
  };

  if (pokemons.length === 0) return <Loading />;

  return (
    <div className="app-container">
      <Header />

      <Filters
        search={search}
        setSearch={setSearch}
        typeFilter={typeFilter}
        setFilterType={setTypeFilter}
        types={types}
      />

      <PokemonGrid
        pokemons={currentPokemons}
        openModal={openModal}
        selectedPokemon={selectedPokemon}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />

      {isModalOpen && selectedPokemon && (
        <PokemonModal pokemon={selectedPokemon} onClose={closeModal} />
      )}
    </div>
  );
};

export default Home;
