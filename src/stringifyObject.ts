import { isEmpty } from './isEmpty';

export const stringifyObject = (obj: object): string => !isEmpty(obj) ? (JSON.stringify(obj) || '').toString() : '';
