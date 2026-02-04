import React, { useState } from 'react';
import Header from './components/Header';
import BattleArena from './components/BattleArena';
import Controls from './components/Controls';
import BattleLog from './components/BattleLog';
import RulesModal from './components/RulesModal';
import GameOver from './components/GameOver';
import { useGameLogic } from './hooks/useGameLogic';
import './styles/App.css';

const App: React.FC = () => {
  const [showRules, setShowRules] = useState(false);
  const {
    gameState,
    executeHakai,
    accelerateAdaptation,
    activateSustain,
    resetGame,
  } = useGameLogic();

  return (
    <div className="app">
      <div className="jjk-glitch" />
      
      <Header />

      <main className="game-container">
        <BattleArena gameState={gameState} />
        <BattleLog battleLog={gameState.battleLog} hakaiAttempts={gameState.hakaiAttempts} />
        <Controls
          executeHakai={executeHakai}
          accelerateAdaptation={accelerateAdaptation}
          activateSustain={activateSustain}
          resetGame={resetGame}
          isGameOver={gameState.isGameOver}
        />
      </main>

      <div className="rules-toggle">
        <button className="rules-btn" onClick={() => setShowRules(true)}>?</button>
      </div>

      <RulesModal show={showRules} onClose={() => setShowRules(false)} />
      
      {gameState.isGameOver && gameState.winner && (
        <GameOver winner={gameState.winner} onReset={resetGame} />
      )}
    </div>
  );
};

export default App;