import React, { useEffect, useState } from "react";
import "./PokemonModal.css";
import pokeball from "../../assets/img/pokeball.svg";

const PokemonModal = ({ pokemon, onClose }) => {
  const [showSprite, setShowSprite] = useState(false);
  const [triggerFlash, setTriggerFlash] = useState(false);

  useEffect(() => {
    // Trigger da explosão ligeiramente antes da imagem
    const flashTimer = setTimeout(() => setTriggerFlash(true), 700);
    const spriteTimer = setTimeout(() => setShowSprite(true), 800);

    return () => {
      clearTimeout(spriteTimer);
      clearTimeout(flashTimer);
    };
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>

        <div className="modal-content">
          <div className="sprite-area">
            {!showSprite ? (
              <>
                <img
                  src={pokeball}
                  alt="A abrir Pokébola..."
                  className="pokeball-loader"
                />
                {triggerFlash && <div className="explosion-flash" />}
              </>
            ) : (
              <img
                src={pokemon.sprite}
                alt={pokemon.name}
                className="modal-sprite"
              />
            )}
          </div>

          <h2 className="modal-name">{pokemon.name}</h2>
          <div className="modal-types">
            {pokemon.type_primary && <span className="modal-type">{pokemon.type_primary}</span>}
            {pokemon.type_secondary && <span className="modal-type">{pokemon.type_secondary}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;
