export const formatAmount = (amount: string, decimals: number): string => {
  const formattedAmount = parseInt(amount, 10) / 10 ** decimals;
  return formattedAmount.toString();
};
