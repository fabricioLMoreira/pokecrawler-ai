import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [pokemonsPorPagina, setPokemonsPorPagina] = useState(10);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPaginas = Math.ceil(filteredPokemons.length / pokemonsPorPagina);

  const proximaPagina = () => {
    setPaginaAtual((prev) => (prev < totalPaginas ? prev + 1 : prev));
  };

  const paginaAnterior = () => {
    setPaginaAtual((prev) => (prev > 1 ? prev - 1 : prev));
  };

  // Carrega Pokémon e Tipos ao iniciar
  useEffect(() => {
    axios.get("http://localhost:8000/pokemons")
      .then(response => {
        setPokemons(response.data);
        setFilteredPokemons(response.data);
      })
      .catch(error => console.error("Erro ao obter os Pokémon:", error));

    axios.get("http://localhost:8000/pokemons/types/list")
      .then(response => {
        setTipos(response.data);
      })
      .catch(error => console.error("Erro ao obter os tipos:", error));
  }, []);

  // Filtragem por nome e tipo
  useEffect(() => {
    let filtrados = pokemons;

    if (pesquisa) {
      filtrados = filtrados.filter(pokemon =>
        pokemon.name.toLowerCase().includes(pesquisa.toLowerCase())
      );
    }

    if (filtroTipo) {
      filtrados = filtrados.filter(pokemon =>
        pokemon.type_primary === filtroTipo || pokemon.type_secondary === filtroTipo
      );
    }

    setFilteredPokemons(filtrados);
    setPaginaAtual(1);
  }, [pesquisa, filtroTipo, pokemons]);

  const openModal = (pokemon) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
    setIsModalOpen(false);
  };

  const indiceUltimo = paginaAtual * pokemonsPorPagina;
  const indicePrimeiro = indiceUltimo - pokemonsPorPagina;
  const pokemonsPagina = filteredPokemons.slice(indicePrimeiro, indiceUltimo);

  return (
    <div className="app-container">
      <header>
        <h1>Pokédex</h1>
      </header>

      {/* Filtros */}
      <div className="filtros">
        <input
          type="text"
          placeholder="Pesquisar Pokémon..."
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
        />

        <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
          <option value="">Todos os tipos</option>
          {tipos.map(tipo => (
            <option key={tipo} value={tipo}>{tipo}</option>
          ))}
        </select>
      </div>

      {/* Grid de Pokémon */}
      <main>
        <div className="pokemon-grid">
          {pokemonsPagina.length > 0 ? (
            pokemonsPagina.map((pokemon) => (
              <div 
                key={pokemon.id} 
                className="pokemon-card"
                onClick={() => openModal(pokemon)}
              >
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
            ))
          ) : (
            <p>Nenhum Pokémon encontrado...</p>
          )}
        </div>
      </main>

      {/* Modal de Detalhes */}
      {isModalOpen && selectedPokemon && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>X</button>
            <img src={selectedPokemon.sprite} alt={selectedPokemon.name} />
            <h2>{selectedPokemon.name}</h2>
            <p><strong>Tipo:</strong> {selectedPokemon.type_primary} {selectedPokemon.type_secondary && ` / ${selectedPokemon.type_secondary}`}</p>
          </div>
        </div>
      )}

      {/* Paginação */}
      <div className="paginacao">
        <button onClick={paginaAnterior} disabled={paginaAtual === 1}>Anterior</button>

        {Array.from({ length: totalPaginas }, (_, i) => (
          <button 
            key={i} 
            onClick={() => setPaginaAtual(i + 1)}
            className={paginaAtual === i + 1 ? "ativo" : ""}
          >
            {i + 1}
          </button>
        ))}

        <button onClick={proximaPagina} disabled={paginaAtual === totalPaginas}>Próximo</button>

        {/* Seletor de Tamanho da Página */}
        <select value={pokemonsPorPagina} onChange={(e) => setPokemonsPorPagina(Number(e.target.value))}>
          <option value="5">5 por página</option>
          <option value="10">10 por página</option>
          <option value="20">20 por página</option>
          <option value="50">50 por página</option>
        </select>
      </div>
    </div>
  );
}

export default App;
