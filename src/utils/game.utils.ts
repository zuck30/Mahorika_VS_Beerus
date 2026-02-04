export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const formatPercentage = (value: number): string => {
  return `${Math.round(value)}%`;
};