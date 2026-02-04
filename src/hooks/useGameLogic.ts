import { useState, useCallback } from 'react';
import { GameState, LogEntry } from '../types/game.types';
import { generateId, calculateDamage } from '../utils/game.utils';

const initialState: GameState = {
  hakaiPower: 100,
  divineEnergy: 100,
  mahoHealth: 100,
  rikaEnergy: 100,
  adaptation: 0,
  adaptationResistance: 0,
  hakaiAttempts: 0,
  isGameOver: false,
  winner: null,
  battleLog: [
    { id: generateId(), message: '[SYSTEM INITIALIZED] Domain established...', type: 'system', timestamp: Date.now() },
    { id: generateId(), message: 'Beerus: "Hmph. Interesting constructs. Let\'s see how long you last."', type: 'beerus', timestamp: Date.now() },
    { id: generateId(), message: 'Mahoraga\'s wheel begins turning... Analyzing phenomena...', type: 'mahoraga', timestamp: Date.now() },
    { id: generateId(), message: 'Rika establishes infinite CE connection with Mahoraga', type: 'rika', timestamp: Date.now() },
  ],
};

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>(initialState);

  const addLogEntry = useCallback((message: string, type: LogEntry['type']) => {
    setGameState(prev => ({
      ...prev,
      battleLog: [
        { id: generateId(), message, type, timestamp: Date.now() },
        ...prev.battleLog,
      ].slice(0, 20),
    }));
  }, []);

  const checkGameOver = useCallback((state: GameState) => {
    if (state.mahoHealth <= 0) {
      setGameState(prev => ({ ...prev, isGameOver: true, winner: 'beerus' }));
      addLogEntry('Mahoraga has been erased from existence!', 'system');
      return true;
    }
    
    if (state.adaptation >= 100) {
      setGameState(prev => ({ ...prev, isGameOver: true, winner: 'mahoraga' }));
      addLogEntry('Mahoraga has fully adapted! Hakai is now irrelevant!', 'system');
      return true;
    }
    
    if (state.divineEnergy <= 0) {
      setGameState(prev => ({ ...prev, isGameOver: true, winner: 'stalemate' }));
      addLogEntry('Beerus has exhausted his divine energy! Stalemate!', 'system');
      return true;
    }
    
    return false;
  }, [addLogEntry]);

  const executeHakai = useCallback(() => {
    if (gameState.isGameOver) return;

    setGameState(prev => {
      const adaptationResistance = prev.adaptation;
      const hakaiEffectiveness = (100 - adaptationResistance) / 100;
      const damage = 25 * hakaiEffectiveness;
      
      const newMahoHealth = Math.max(0, prev.mahoHealth - damage);
      const newDivineEnergy = Math.max(0, prev.divineEnergy - 15);
      const newHakaiAttempts = prev.hakaiAttempts + 1;
      
      const adaptationIncrease = 15 + (prev.hakaiAttempts * 2);
      const newAdaptation = Math.min(100, prev.adaptation + adaptationIncrease);
      const newAdaptationResistance = Math.min(100, prev.adaptationResistance + (adaptationIncrease * 0.7));

      const newState = {
        ...prev,
        hakaiPower: hakaiEffectiveness * 100,
        divineEnergy: newDivineEnergy,
        mahoHealth: newMahoHealth,
        adaptation: newAdaptation,
        adaptationResistance: newAdaptationResistance,
        hakaiAttempts: newHakaiAttempts,
      };

      addLogEntry(`Beerus uses Hakai! Effectiveness: ${(hakaiEffectiveness * 100).toFixed(1)}%`, 'beerus');
      addLogEntry(`Mahoraga takes ${damage.toFixed(1)} damage. Adaptation +${adaptationIncrease}%`, 'mahoraga');

      checkGameOver(newState);
      return newState;
    });
  }, [gameState.isGameOver, addLogEntry, checkGameOver]);

  const accelerateAdaptation = useCallback(() => {
    if (gameState.isGameOver) return;

    setGameState(prev => {
      const newAdaptation = Math.min(100, prev.adaptation + 10);
      const newAdaptationResistance = Math.min(100, prev.adaptationResistance + 7);
      const rikaCost = 5;
      const newRikaEnergy = Math.max(0, prev.rikaEnergy - rikaCost);

      addLogEntry(`Mahoraga focuses on adaptation... +10% progress`, 'mahoraga');

      return {
        ...prev,
        adaptation: newAdaptation,
        adaptationResistance: newAdaptationResistance,
        rikaEnergy: newRikaEnergy,
      };
    });
  }, [gameState.isGameOver, addLogEntry]);

  const activateSustain = useCallback(() => {
    if (gameState.isGameOver) return;

    setGameState(prev => {
      const healAmount = 30;
      const newMahoHealth = Math.min(100, prev.mahoHealth + healAmount);
      const sustainCost = 20;
      const newRikaEnergy = Math.max(0, prev.rikaEnergy - sustainCost);

      addLogEntry(`Rika channels infinite CE! Mahoraga heals ${healAmount}%`, 'rika');

      return {
        ...prev,
        mahoHealth: newMahoHealth,
        rikaEnergy: newRikaEnergy,
      };
    });
  }, [gameState.isGameOver, addLogEntry]);

  const resetGame = useCallback(() => {
    setGameState(initialState);
    addLogEntry('Domain has been reset. Battle recommences!', 'system');
  }, [addLogEntry]);

  return {
    gameState,
    executeHakai,
    accelerateAdaptation,
    activateSustain,
    resetGame,
  };
};