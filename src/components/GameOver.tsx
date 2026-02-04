import React from 'react';

interface GameOverProps {
  winner: string;
  onReset: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ winner, onReset }) => {
  return (
    <div className="game-over-overlay">
      <div className="game-over-content">
        <h1 className="game-over-title">BATTLE CONCLUDED</h1>
        <p className="winner-announcement">
          {winner === 'Beerus' ? 'THE GOD OF DESTRUCTION PREVAILS' : 'THE EIGHT-HANDLED SWORD DIVERGENT SILA DIVINE GENERAL MAHORAGA HAS ADAPTED'}
        </p>
        <button className="btn reset-btn" onClick={onReset}>
          RESTART TIMELINE
        </button>
      </div>
    </div>
  );
};

export default GameOver;