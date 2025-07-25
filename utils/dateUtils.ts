export const isNewDay = (lastDate: string): boolean => {
  const today = new Date().toDateString();
  return lastDate !== today;
};

export const getTodayString = (): string => {
  return new Date().toDateString();
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getDaysUntilReset = (): number => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  return Math.ceil((tomorrow.getTime() - now.getTime()) / (1000 * 60 * 60));
};
