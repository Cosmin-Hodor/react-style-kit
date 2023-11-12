import { isEmpty } from './isEmpty';

// Function to convert an object to a JSON string if it is not empty
export const stringifyObject = (obj: object): string => (!isEmpty(obj) ? JSON.stringify(obj) : '');
