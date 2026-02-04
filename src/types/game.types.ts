export interface GameState {
  hakaiPower: number;
  divineEnergy: number;
  mahoHealth: number;
  rikaEnergy: number;
  adaptation: number;
  adaptationResistance: number;
  hakaiAttempts: number;
  isGameOver: boolean;
  winner: 'beerus' | 'mahoraga' | 'stalemate' | null;
  battleLog: LogEntry[];
}

export interface LogEntry {
  id: string;
  message: string;
  type: 'beerus' | 'mahoraga' | 'rika' | 'system';
  timestamp: number;
}

export interface CharacterStats {
  name: string;
  color: string;
  icon: string;
  borderColor: string;
}