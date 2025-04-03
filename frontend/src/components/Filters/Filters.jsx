import React from "react";
import "./Filters.css";

const Filters = ({ search, setSearch, filterType, setFilterType, types }) => {
  return (
    <div className="filtros">
      <input
        type="text"
        placeholder="Pesquisar Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
        <option value="">Todos os tipos</option>
        {(types || []).map((tipo) => (
          <option key={tipo} value={tipo}>
            {tipo}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
