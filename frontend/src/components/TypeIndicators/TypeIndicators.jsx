import React from "react";
import "./TypeIndicators.css";

const TypeIndicators = ({ pokemons, typeFilter }) => {
  // Só mostra se houver um filtro de tipo ativo
  if (!typeFilter) return null;

  const typeCounts = {};

  pokemons.forEach(p => {
    const types = [p.type_primary, p.type_secondary].filter(Boolean);
    types.forEach(type => {
      const lower = type.toLowerCase();
      typeCounts[lower] = (typeCounts[lower] || 0) + 1;
    });
  });

  const selectedType = typeFilter.toLowerCase();
  const count = typeCounts[selectedType];

  if (!count) return null;

  return (
    <div className="type-indicators">
      <span className="type-count">
        {typeFilter.charAt(0).toUpperCase() + typeFilter.slice(1)}: {count}
      </span>
    </div>
  );
};

export default TypeIndicators;
