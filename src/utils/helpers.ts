export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

export const formatCurrency = (amount: number): string => {
  return `€${amount.toFixed(2)}`;
};

export const calculateEqualSplit = (total: number, peopleCount: number): number => {
  if (peopleCount === 0) return 0;
  return parseFloat((total / peopleCount).toFixed(2));
};