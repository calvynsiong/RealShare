export const capitalize = (str: string): string => {
  return str[0].toUpperCase() + str.substring(1);
};
export const shorten = (str: string, limit: number = 50): string => {
  return str.length < limit ? str : str.substring(0, limit) + '...';
};

export const minutesToMs = (minutes: number): number => {
  return minutes * 60 * 1000;
};
