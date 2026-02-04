import React from 'react';

interface RulesModalProps {
  show: boolean;
  onClose: () => void;
}

const RulesModal: React.FC<RulesModalProps> = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="rules-overlay" style={{ display: 'flex' }}>
      <div className="rules-container">
        <div className="rules-header">
          <h2 className="rules-title">Battle Rules</h2>
          <button onClick={onClose} className="close-rules">✕</button>
        </div>

        <div className="rule-item">
          <h3 className="rule-title">Beerus: The Destroyer</h3>
          <p>Beerus has 100 HP. He uses <strong>Hakai</strong> to deal massive damage. Each Hakai attempt costs Divine Energy. If he reaches 100% Hakai Power, his next attack is fatal!</p>
        </div>

        <div className="rule-item">
          <h3 className="rule-title">Mahoraga: The Adaptor</h3>
          <p>Mahoraga adapts to everything. Every time Beerus attacks, Mahoraga's <strong>Adaptation</strong> increases. High adaptation reduces incoming damage and increases counter-attack power.</p>
        </div>

        <div className="rule-item">
          <h3 className="rule-title">Rika: Queen of Curses</h3>
          <p>Rika provides <strong>Sustain</strong> and Cursed Energy. She can heal Mahoraga and accelerate his adaptation. Her CE connection is vital for survival.</p>
        </div>

        <div className="rule-item">
          <h3 className="rule-title">Victory Condition</h3>
          <p>Defeat Beerus by reducing his HP to 0 before he adapts to your presence or obliterates you with a 100% Hakai!</p>
        </div>

        <div style={{ marginTop: '20px' }}>
          <button
            onClick={onClose}
            className="jjk-btn reset-btn"
            style={{ width: '100%' }}
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default RulesModal;
