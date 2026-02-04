import React from 'react';

interface ControlsProps {
  executeHakai: () => void;
  accelerateAdaptation: () => void;
  activateSustain: () => void;
  resetGame: () => void;
  isGameOver: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  executeHakai,
  accelerateAdaptation,
  activateSustain,
  resetGame,
  isGameOver,
}) => {
  return (
    <div className="controls-container">
      {!isGameOver ? (
        <>
          <button className="jjk-btn hakai-btn" onClick={executeHakai}>
            HAKAI
          </button>
          <button className="jjk-btn adapt-btn" onClick={accelerateAdaptation}>
            Accelerate Adaptation
          </button>
          <button className="jjk-btn sustain-btn" onClick={activateSustain}>
            Sustain Flow
          </button>
        </>
      ) : (
        <button className="jjk-btn reset-btn" onClick={resetGame}>
          Restart Battle
        </button>
      )}
    </div>
  );
};

export default Controls;
