import React, { useEffect, useState, useContext } from "react";
import {
  getAllPokemons,
  getPokemonTypes,
  deletePokemon
} from "../services/pokemonApi";
import { AuthContext } from "../context/AuthProvider";
import Header from "../components/Header/Header";
import Filters from "../components/Filters/Filters";
import Pagination from "../components/Pagination/Pagination";
import PokemonGrid from "../components/PokemonGrid/PokemonGrid";
import PokemonModal from "../components/PokemonModal/PokemonModal";
import EditPokemonModal from "../components/EditPokemonModal/EditPokemonModal";
import AddPokemonModal from "../components/AddPokemonModal/AddPokemonModal";
import TypeIndicators from "../components/TypeIndicators/TypeIndicators";
import Loading from "../components/Loading/Loading";
import "./Home.css";

const Home = () => {
  const { user, token, login, logout, isLoading } = useContext(AuthContext);

  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    getAllPokemons(token)
      .then((res) => {
        setPokemons(res.data);
        setFilteredPokemons(res.data);
      })
      .catch((err) => console.error("Erro ao obter pokémons:", err));

    getPokemonTypes(token)
      .then((res) => setTypes(res.data))
      .catch((err) => console.error("Erro ao obter tipos:", err));
  }, [token]);

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

  // 👉 Contador de pokémons por tipo (baseado nos filtros)
  const typeCounts = {};
  filteredPokemons.forEach(p => {
    const types = [p.type_primary, p.type_secondary].filter(Boolean);
    types.forEach(type => {
      const lowerType = type.toLowerCase();
      typeCounts[lowerType] = (typeCounts[lowerType] || 0) + 1;
    });
  });

  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentPokemons = filteredPokemons.slice(indexOfFirst, indexOfLast);

  const openViewModal = (pokemon) => {
    setSelectedPokemon(pokemon);
    setIsViewModalOpen(true);
  };

  const openEditModal = (pokemon) => {
    setSelectedPokemon(pokemon);
    setIsEditModalOpen(true);
  };

  const closeModals = () => {
    setSelectedPokemon(null);
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Tens a certeza que queres remover este Pokémon?");
    if (!confirmed || !token) return;

    try {
      await deletePokemon(id, token);
      setPokemons((prev) => prev.filter((p) => p.id !== id));
      setFilteredPokemons((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Erro ao remover:", err);
    }
  };

  const handleUpdate = async (updated) => {
    setPokemons((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setFilteredPokemons((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    closeModals();
  };

  const handleAdd = (newPokemon) => {
    setPokemons((prev) => [...prev, newPokemon]);
    setFilteredPokemons((prev) => [...prev, newPokemon]);
    closeModals();
  };

  if (isLoading) return <Loading />;

  return (
    <div className="app-container">
      <Header user={user} onLogout={logout} onLoginClick={login} />

      <main className="main-content">
        <div className="filters-bar">
          <div className="filters-group">
            <Filters
              search={search}
              setSearch={setSearch}
              typeFilter={typeFilter}
              setFilterType={setTypeFilter}
              types={types}
            />
          </div>
        </div>

        {/* Indicador de tipo selecionado (aparece apenas com filtro) */}
        <TypeIndicators pokemons={filteredPokemons} typeFilter={typeFilter} />

        <PokemonGrid
          pokemons={currentPokemons}
          openModal={openViewModal}
          user={user}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      </main>

      {isViewModalOpen && selectedPokemon && (
        <PokemonModal pokemon={selectedPokemon} onClose={closeModals} />
      )}

      {isEditModalOpen && selectedPokemon && (
        <EditPokemonModal
          pokemon={selectedPokemon}
          onClose={closeModals}
          onUpdate={handleUpdate}
          token={token}
        />
      )}

      {isAddModalOpen && (
        <AddPokemonModal
          onClose={closeModals}
          onAdd={handleAdd}
          token={token}
          types={types}
        />
      )}
    </div>
  );
};

export default Home;
