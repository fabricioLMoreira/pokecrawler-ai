import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  getAllPokemons,
  getPokemonTypes,
} from "../services/pokemonApi";
import Header from "../components/Header/Header";
import Filters from "../components/Filters/Filters";
import Pagination from "../components/Pagination/Pagination";
import PokemonGrid from "../components/PokemonGrid/PokemonGrid";
import PokemonModal from "../components/PokemonModal/PokemonModal";
import LoginModal from "../components/LoginModal/LoginModal";
import Loading from "../components/Loading/Loading";
import "./Home.css";

const Home = () => {
  const [user, setUser] = useState(null);
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };

  // Verifica se já existe token
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded.preferred_username);
      } catch (err) {
        console.error("Token inválido:", err);
        localStorage.removeItem("access_token");
      }
    }
    setLoadingUser(false);
  }, []);

  // Carrega dados sem login
  useEffect(() => {
    getAllPokemons()
      .then((res) => {
        setPokemons(res.data);
        setFilteredPokemons(res.data);
      })
      .catch((err) => console.error("Erro ao obter pokémons:", err));
  
    getPokemonTypes()
      .then((res) => setTypes(res.data))
      .catch((err) => console.error("Erro ao obter tipos:", err));
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

  if (loadingUser) return <Loading />;

  return (
    <div className="app-container">
      <Header
        user={user}
        onLogout={handleLogout}
        onLoginClick={() => setShowLoginModal(true)}
      />

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
        user={user}
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

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={() => {
            const token = localStorage.getItem("access_token");
            const decoded = jwtDecode(token);
            setUser(decoded.preferred_username);
            setShowLoginModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Home;
