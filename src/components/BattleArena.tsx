import React from 'react';
import { GameState } from '../types/game.types';
import beerusImg from '../images/beerus.png';
import mahoragaImg from '../images/mahoraga.png';
import rikaImg from '../images/rika.png';

interface BattleArenaProps {
  gameState: GameState;
}

const BattleArena: React.FC<BattleArenaProps> = ({ gameState }) => {
  return (
    <section className="battle-arena">
      <div className="character-card beerus-card">
        <div className="avatar-container beerus-avatar">
          <img src={beerusImg} alt="Beerus" className="avatar-img" />
          <div className="aura purple-aura"></div>
        </div>
        <div className="stats-container">
          <h3 className="character-name beerus-name">Beerus</h3>
          <div className="stat-bar divine-bar">
            <div className="stat-label">
              <span>Divine Energy</span>
              <span>{Math.ceil(gameState.divineEnergy)}/100</span>
            </div>
            <div className="stat-progress">
              <div
                className="stat-fill"
                style={{ width: `${gameState.divineEnergy}%` }}
              ></div>
            </div>
          </div>
          <div className="stat-bar hakai-bar">
            <div className="stat-label">
              <span>Hakai Power</span>
              <span>{Math.floor(gameState.hakaiPower)}%</span>
            </div>
            <div className="stat-progress">
              <div
                className="stat-fill"
                style={{ width: `${gameState.hakaiPower}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="vs-container">
        <div className="vs-badge">VS</div>
      </div>

      <div className="character-card maho-card">
        <div style={{ position: 'relative' }}>
          <div className="avatar-container maho-avatar">
            <img src={mahoragaImg} alt="Mahoraga" className="avatar-img" />
            <div className="aura green-aura"></div>
          </div>
          <div className="avatar-container rika-avatar">
            <img src={rikaImg} alt="Rika" className="avatar-img" />
          </div>
          <div className="rika-tag">Queen of Curses</div>
        </div>

        <div className="stats-container">
          <h3 className="character-name maho-name">Mahoraga & Rika</h3>
          <div className="stat-bar">
            <div className="stat-label">
              <span>HP</span>
              <span>{Math.ceil(gameState.mahoHealth)}/100</span>
            </div>
            <div className="stat-progress">
              <div
                className="stat-fill"
                style={{ width: `${gameState.mahoHealth}%`, backgroundColor: '#4caf50' }}
              ></div>
            </div>
          </div>

          <div className="stat-bar adaptation-bar">
            <div className="stat-label">
              <span>Adaptation</span>
              <span>{Math.floor(gameState.adaptation)}%</span>
            </div>
            <div className="stat-progress">
              <div
                className="stat-fill"
                style={{ width: `${gameState.adaptation}%` }}
              ></div>
            </div>
          </div>

          <div className="stat-bar energy-bar">
            <div className="stat-label">
              <span>Rika CE</span>
              <span>{Math.floor(gameState.rikaEnergy)}%</span>
            </div>
            <div className="stat-progress">
              <div
                className="stat-fill"
                style={{ width: `${gameState.rikaEnergy}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BattleArena;
