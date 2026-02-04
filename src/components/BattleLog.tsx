import React, { useEffect, useRef } from 'react';
import { LogEntry } from '../types/game.types';

interface BattleLogProps {
  battleLog: LogEntry[];
  hakaiAttempts: number;
}

const BattleLog: React.FC<BattleLogProps> = ({ battleLog, hakaiAttempts }) => {
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [battleLog]);

  return (
    <div className="battle-log-container">
      <div className="log-header">
        <span>Infinite Void Transcript</span>
        <span className="hakai-count">Erasure Attempts: {hakaiAttempts}</span>
      </div>
      <div className="battle-log">
        {battleLog.map((log) => (
          <div key={log.id} className={`log-entry ${log.type}`}>
             <span className="log-timestamp">[{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span> {log.message}
          </div>
        ))}
        <div ref={logEndRef} />
      </div>
    </div>
  );
};

export default BattleLog;