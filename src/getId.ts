import { getChar } from './getChar';

export const getId = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const parsedHash = hash.toString().substring(0, 5).replace('-', '');

  return `${parsedHash}-${getChar(Math.abs((parseInt(parsedHash) % 10 || 1)))}`;
};
