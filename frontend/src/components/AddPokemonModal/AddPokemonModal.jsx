import React, { useState } from "react";
import "./AddPokemonModal.css";
import { createPokemon } from "../../services/pokemonApi";

const AddPokemonModal = ({ onClose, onAdd, token, types }) => {
  const [name, setName] = useState("");
  const [typePrimary, setTypePrimary] = useState("");
  const [typeSecondary, setTypeSecondary] = useState("");
  const [url, setUrl] = useState("");
  const [sprite, setSprite] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || !typePrimary.trim() || !url.trim()) {
      setError("Nome, tipo primário e URL são campos obrigatórios.");
      return;
    }

    setIsSaving(true);
    setError("");

    try {
      const newPokemon = await createPokemon(
        {
          name,
          type_primary: typePrimary,
          type_secondary: typeSecondary || null,
          url,
          sprite: sprite || null,
        },
        token
      );

      onAdd(newPokemon);
    } catch (err) {
      setError("Erro ao adicionar Pokémon.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2>Adicionar Pokémon</h2>

        {error && <div className="modal-error">{error}</div>}

        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <label>
            Nome:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>

          <label>
            Tipo Primário:
            <select value={typePrimary} onChange={(e) => setTypePrimary(e.target.value)}>
              <option value="">-- Selecionar tipo --</option>
              {types.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>

          <label>
            Tipo Secundário:
            <select value={typeSecondary} onChange={(e) => setTypeSecondary(e.target.value)}>
              <option value="">-- Nenhum --</option>
              {types.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>

          <label>
            URL:
            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
          </label>

          <label>
            Sprite:
            <input type="text" value={sprite} onChange={(e) => setSprite(e.target.value)} />
          </label>
        </form>

        <div className="modal-actions">
          <button type="button" onClick={onClose} disabled={isSaving}>Cancelar</button>
          <button type="button" onClick={handleSave} disabled={isSaving}>
            {isSaving ? "A guardar..." : "Adicionar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPokemonModal;
