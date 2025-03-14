import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [tipos, setTipos] = useState([]); // Correção para carregar os tipos corretamente
  const [pesquisa, setPesquisa] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const pokemonsPorPagina = 10; // Exibir 10 por página

  useEffect(() => {
    axios.get("http://localhost:8000/pokemons")
      .then(response => {
        setPokemons(response.data);
        setFilteredPokemons(response.data);
      })
      .catch(error => console.error("Erro ao obter os Pokémon:", error));

    axios.get("http://localhost:8000/types") // Corrigir chamada para carregar os tipos
      .then(response => {
        setTipos(response.data);
      })
      .catch(error => console.error("Erro ao obter os tipos:", error));
  }, []);

  useEffect(() => {
    let filtrados = pokemons;

    if (pesquisa) {
      filtrados = filtrados.filter(pokemon =>
        pokemon.name.toLowerCase().includes(pesquisa.toLowerCase())
      );
    }

    if (filtroTipo) {
      filtrados = filtrados.filter(pokemon =>
        pokemon.type.includes(filtroTipo)
      );
    }

    setFilteredPokemons(filtrados);
    setPaginaAtual(1); // Resetar para a primeira página ao filtrar
  }, [pesquisa, filtroTipo, pokemons]);

  // Paginação
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

      <main>
        <div className="pokemon-grid">
          {pokemonsPagina.length > 0 ? (
            pokemonsPagina.map((pokemon) => (
              <div key={pokemon.id} className="pokemon-card">
                <div className="pokemon-image">
                  <img src={pokemon.image} alt={pokemon.name} />
                </div>
                <h3>{pokemon.name}</h3>
                <p className="pokemon-type">{pokemon.type}</p>
              </div>
            ))
          ) : (
            <p>Nenhum Pokémon encontrado...</p>
          )}
        </div>
      </main>

      {/* Paginação */}
      <div className="paginacao">
        {Array.from({ length: Math.ceil(filteredPokemons.length / pokemonsPorPagina) }, (_, i) => (
          <button 
            key={i} 
            onClick={() => setPaginaAtual(i + 1)}
            className={paginaAtual === i + 1 ? "ativo" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
