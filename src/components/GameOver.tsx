import React from 'react';

interface GameOverProps {
  winner: 'beerus' | 'mahoraga' | 'stalemate';
  onReset: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ winner, onReset }) => {
  const getVictoryClass = () => {
    if (winner === 'beerus') return 'victory-beerus';
    if (winner === 'mahoraga') return 'victory-mahoraga';
    return 'victory-stalemate';
  };

  const getWinnerText = () => {
    if (winner === 'beerus') return 'HAKAI! BEERUS WINS';
    if (winner === 'mahoraga') return 'ADAPTED! MAHORAGA WINS';
    return 'STALEMATE';
  };

  return (
    <div className={`game-over ${getVictoryClass()}`} style={{ display: 'flex' }}>
      <div className="game-over-content">
        <h2 className="game-over-title">{getWinnerText()}</h2>
        <p style={{ marginBottom: '30px', color: '#aaa' }}>
          {winner === 'beerus'
            ? "The Destroyer has wiped out the curse and the shikigami."
            : "The Eight-Handled Sword has successfully adapted to destruction."}
        </p>
        <button onClick={onReset} className="jjk-btn reset-btn">
          NEW BATTLE
        </button>
      </div>
    </div>
  );
};

export default GameOver;
