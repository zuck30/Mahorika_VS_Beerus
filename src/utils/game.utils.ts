export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const calculateDamage = (baseDamage: number, resistance: number): number => {
  const effectiveness = (100 - resistance) / 100;
  return baseDamage * effectiveness;
};

export const formatPercentage = (value: number): string => {
  return `${Math.round(value)}%`;
};