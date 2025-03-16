export const skipCalculation = (page: number, take: number): number => {
  return (page - 1) * take;
};
