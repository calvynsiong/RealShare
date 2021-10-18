import React from 'react';

const useDateDifference = (createdAt: Date, updatedAt: Date) => {
  let time: string = '';

  let seconds: number = Math.floor(
    (updatedAt.getTime() - createdAt.getTime()) / 1000
  );
  let minutes: number = Math.floor(seconds / 60);
  let hours: number = Math.floor(minutes / 60);
  let days: number = Math.floor(hours / 24);

  hours = hours - days * 24;
  minutes = minutes - days * 24 * 60 - hours * 60;
  seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

  if (days > 0) time = `${days as unknown as string} days`;
  else if (hours > 0) time = `${hours as unknown as string} h`;
  else if (minutes > 0) time = `${minutes as unknown as string} min`;
  else time = `${seconds as unknown as string} s`;

  return time;
};

export default useDateDifference;
