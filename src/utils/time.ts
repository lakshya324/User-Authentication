export const unixToUTC = (unix: number) => {
  return new Date(unix * 1000).toUTCString();
};

export const unixToDate = (unix: number) => {
  return new Date(unix * 1000);
};

export const dateToUnix = (date: Date) => {
  return Math.floor(date.getTime() / 1000);
};
