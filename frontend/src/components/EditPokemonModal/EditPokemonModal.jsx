import React, { useState, useEffect } from "react";
import "./EditPokemonModal.css";
import { updatePokemon } from "../../services/pokemonApi";

const EditPokemonModal = ({ pokemon, onClose, onUpdate, token }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (pokemon) {
      setName(pokemon.name || "");
    }
  }, [pokemon]);

  const handleSave = async () => {
    if (!name.trim()) {
      setError("Campo nome é obrigatório.");
      return;
    }

    setIsSaving(true);
    setError("");

    try {
      const updated = await updatePokemon(
        pokemon.id,
        {
          name,
          type_primary: pokemon.type_primary,
          type_secondary: pokemon.type_secondary,
        },
        token
      );

      onUpdate(updated);
    } catch (err) {
      setError("Erro ao atualizar o Pokémon.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2>Editar Pokémon</h2>

        {error && <div className="modal-error">{error}</div>}

        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <label>
            Nome:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome"
            />
          </label>

          <label>
            Tipo Primário:
            <input
              type="text"
              value={pokemon.type_primary}
              disabled
            />
          </label>

          {pokemon.type_secondary && (
            <label>
              Tipo Secundário:
              <input
                type="text"
                value={pokemon.type_secondary}
                disabled
              />
            </label>
          )}
        </form>

        <div className="modal-actions">
          <button type="button" onClick={onClose} disabled={isSaving}>Cancelar</button>
          <button type="button" onClick={handleSave} disabled={isSaving}>
            {isSaving ? "A guardar..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPokemonModal;
