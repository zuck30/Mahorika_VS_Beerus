import React from 'react';
import { GameState } from '../types/game.types';
import beerusImg from '../images/beerus.png';
import mahoragaImg from '../images/mahoraga.png';

interface BattleArenaProps {
  gameState: GameState;
}

const BattleArena: React.FC<BattleArenaProps> = ({ gameState }) => {
  return (
    <section className="battle-arena">
      <div className="fighter beerus">
        <div className="fighter-image-container">
          <img src={beerusImg} alt="Beerus" className="fighter-image" />
          <div className="aura purple-aura"></div>
        </div>
        <div className="stats">
          <h3>Beerus</h3>
          <div className="health-bar-container">
            <div
              className="health-bar"
              style={{ width: `${gameState.divineEnergy}%` }}
            ></div>
          </div>
          <p className="health-text">{Math.ceil(gameState.divineEnergy)}/100 Divine Energy</p>
          <div className="sub-stat">Hakai Power: {Math.floor(gameState.hakaiPower)}%</div>
        </div>
      </div>

      <div className="vs-divider">
        <div className="vs-text">VS</div>
      </div>

      <div className="fighter mahoraga">
        <div className="fighter-image-container">
          <img src={mahoragaImg} alt="Mahoraga" className="fighter-image" />
          <div className="aura green-aura"></div>
          <div className="adaptation-wheel" style={{ transform: `rotate(${gameState.adaptation * 3.6}deg)` }}>
            {/* Adaptation wheel visual */}
          </div>
        </div>
        <div className="stats">
          <h3>Mahoraga & Rika</h3>
          <div className="health-bar-container">
            <div
              className="health-bar green"
              style={{ width: `${gameState.mahoHealth}%` }}
            ></div>
          </div>
          <p className="health-text">{Math.ceil(gameState.mahoHealth)}/100 HP</p>
          <div className="adaptation-stats">
            Adaptation: {Math.floor(gameState.adaptation)}%
          </div>
          <div className="sub-stat">Rika CE: {Math.floor(gameState.rikaEnergy)}%</div>
        </div>
      </div>
    </section>
  );
};

export default BattleArena;