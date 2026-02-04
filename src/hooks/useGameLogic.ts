import { useState, useCallback, useEffect } from 'react';
import { GameState, LogEntry } from '../types/game.types';
import { generateId } from '../utils/game.utils';

const createLogEntry = (message: string, type: LogEntry['type']): LogEntry => ({
  id: generateId(),
  message,
  type,
  timestamp: Date.now(),
});

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
  isAdapting: false,
  autoSustainUsed: false,
  battleLog: [
    { id: generateId(), message: '[DOMAIN EXPANSION: SYSTEM OVERRIDE] Battle begins...', type: 'system', timestamp: Date.now() },
    { id: generateId(), message: 'Rules of the domain established. Adaptation vs Erasure.', type: 'system', timestamp: Date.now() },
  ],
};

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>(initialState);

  // Adaptation Loop
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (gameState.isAdapting && !gameState.isGameOver) {
      interval = setInterval(() => {
        setGameState(prev => {
          if (prev.isGameOver || !prev.isAdapting) return prev;

          const increment = 5 + (prev.hakaiAttempts * 1.5);
          const newAdaptation = Math.min(100, prev.adaptation + increment);

          let nextState = {
            ...prev,
            adaptation: newAdaptation,
            adaptationResistance: newAdaptation,
            hakaiPower: Math.max(0, 100 - newAdaptation),
          };

          const newLogs: LogEntry[] = [...prev.battleLog];

          if (newAdaptation >= 100) {
            nextState = { ...nextState, isGameOver: true, winner: 'mahoraga', isAdapting: false };
            newLogs.unshift(createLogEntry('ADAPTATION COMPLETE: Hakai phenomenon fully analyzed and invalidated.', 'mahoraga'));
            newLogs.unshift(createLogEntry('System override achieved. Force has been rendered irrelevant.', 'system'));
          } else if (Math.floor(newAdaptation / 25) > Math.floor(prev.adaptation / 25)) {
            newLogs.unshift(createLogEntry(`Adaptation: ${Math.round(newAdaptation)}% - Hakai effectiveness decreasing.`, 'mahoraga'));
          }

          nextState.battleLog = newLogs.slice(0, 20);
          return nextState;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [gameState.isAdapting, gameState.isGameOver]);

  const executeHakai = useCallback(() => {
    setGameState(prev => {
      if (prev.isGameOver || prev.divineEnergy <= 0) return prev;

      const newHakaiAttempts = prev.hakaiAttempts + 1;
      const effectiveDamage = Math.max(10, prev.hakaiPower - prev.adaptationResistance);
      const newMahoHealth = Math.max(0, prev.mahoHealth - effectiveDamage);
      const newDivineEnergy = Math.max(0, prev.divineEnergy - 15);
      const newHakaiPower = Math.max(0, 100 - prev.adaptationResistance);

      const newLogs: LogEntry[] = [
        createLogEntry(`Hakai #${newHakaiAttempts} executed! Divine energy unleashed.`, 'beerus'),
        ...prev.battleLog,
      ];

      let newState: GameState = {
        ...prev,
        hakaiAttempts: newHakaiAttempts,
        mahoHealth: newMahoHealth,
        divineEnergy: newDivineEnergy,
        hakaiPower: newHakaiPower,
        isAdapting: newHakaiAttempts === 1 ? true : prev.isAdapting,
        battleLog: newLogs.slice(0, 20),
      };

      if (newMahoHealth <= 0) {
        newState = { ...newState, isGameOver: true, winner: 'beerus' };
        newState.battleLog = [
            createLogEntry('Target erased from existence. Hakai successful.', 'beerus'),
            ...newState.battleLog
        ].slice(0, 20);
      } else if (newDivineEnergy <= 0) {
        newState = { ...newState, isGameOver: true, winner: 'stalemate' };
        newState.battleLog = [
            createLogEntry('Beerus divine energy depleted! Adaptation outlasts power.', 'system'),
            ...newState.battleLog
        ].slice(0, 20);
      }

      return newState;
    });
  }, []);

  const accelerateAdaptation = useCallback(() => {
    setGameState(prev => {
      if (prev.isGameOver || prev.adaptation >= 100) return prev;

      const newLogs: LogEntry[] = [...prev.battleLog];

      if (!prev.isAdapting) {
        newLogs.unshift(createLogEntry('Manual adaptation acceleration initiated.', 'mahoraga'));
        return { ...prev, isAdapting: true, battleLog: newLogs.slice(0, 20) };
      } else {
        const newAdaptation = Math.min(100, prev.adaptation + 20);
        newLogs.unshift(createLogEntry('Adaptation accelerated! Wheel spinning faster...', 'mahoraga'));
        return {
          ...prev,
          adaptation: newAdaptation,
          adaptationResistance: newAdaptation,
          hakaiPower: Math.max(0, 100 - newAdaptation),
          battleLog: newLogs.slice(0, 20),
        };
      }
    });
  }, []);

  const activateSustain = useCallback((auto = false) => {
    setGameState(prev => {
      if (prev.isGameOver || prev.rikaEnergy <= 0) return prev;

      const newLogs: LogEntry[] = [...prev.battleLog];
      if (!auto) {
        newLogs.unshift(createLogEntry('Infinite CE channel activated! Sustaining Mahoraga...', 'rika'));
      } else {
        newLogs.unshift(createLogEntry('Auto-sustain triggered! Preventing deletion...', 'rika'));
      }

      const newMahoHealth = Math.min(100, prev.mahoHealth + 35);
      const newRikaEnergy = Math.max(0, prev.rikaEnergy - 12);

      return {
        ...prev,
        mahoHealth: newMahoHealth,
        rikaEnergy: newRikaEnergy,
        autoSustainUsed: auto ? true : prev.autoSustainUsed,
        battleLog: newLogs.slice(0, 20),
      };
    });
  }, []);

  // Auto-sustain check
  useEffect(() => {
    if (gameState.mahoHealth < 30 && !gameState.autoSustainUsed && gameState.rikaEnergy > 0 && !gameState.isGameOver) {
      activateSustain(true);
    }
  }, [gameState.mahoHealth, gameState.autoSustainUsed, gameState.rikaEnergy, gameState.isGameOver, activateSustain]);

  const resetGame = useCallback(() => {
    setGameState(initialState);
  }, []);

  return {
    gameState,
    executeHakai,
    accelerateAdaptation,
    activateSustain,
    resetGame,
  };
};
