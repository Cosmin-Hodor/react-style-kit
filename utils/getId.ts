import { getChar } from "./getChar";

// Function to generate a unique ID based on a string input
export const getId = (str: string): string => {
  let hash = 0;
  // Hash calculation using character codes
  for (const char of str) {
      hash = char.charCodeAt(0) + ((hash << 5) - hash);
  }

  // Convert hash to a string, trim to 5 characters, and remove any '-' characters
  const parsedHash = hash.toString().substring(0, 5).replace('-', '');
  // Return a formatted ID using the hash and a character based on the hash value
  return `${parsedHash}-${getChar(Math.abs(parseInt(parsedHash, 10) % 10 || 1))}`;
};