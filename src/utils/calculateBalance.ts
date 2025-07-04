import type { IMoney } from "@/types/moneyType";

export const calculateBalance = (data: IMoney[]) => {
  const income = data
    .filter((item) => item.status.toLowerCase() === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const expense = data
    .filter((item) => item.status.toLowerCase() === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  return (income - expense).toLocaleString();
};
