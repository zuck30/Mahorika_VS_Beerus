import React from 'react';

interface RulesModalProps {
  onClose: () => void;
}

const RulesModal: React.FC<RulesModalProps> = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Battle Rules</h2>
        <div className="rules-list">
          <div className="rule-item">
            <strong>Hakai:</strong> Beerus attempts to erase Mahoraga. Success chance decreases as Mahoraga adapts.
          </div>
          <div className="rule-item">
            <strong>Adaptation:</strong> Mahoraga adapts over time, reducing Beerus's damage and increasing his own.
          </div>
          <div className="rule-item">
            <strong>Sustain Flow:</strong> A defensive stance that temporarily reduces incoming damage.
          </div>
          <div className="rule-item">
            <strong>Victory:</strong> Reduce the opponent's HP to 0 or survive long enough to adapt completely.
          </div>
        </div>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RulesModal;