export const getDefaultDateRange = () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const startDate = `${year}-${month.toString().padStart(2, "0")}-01`;
  const lastDay = new Date(year, month, 0).getDate();
  const endDate = `${year}-${month.toString().padStart(2, "0")}-${lastDay
    .toString()
    .padStart(2, "0")}`;

  return { startDate, endDate };
};
