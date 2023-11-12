import { StyleMapEntry } from '../types';

export const styleMap = new Map<string, StyleMapEntry>();

// Function to check if a className already exists in the style map
export const classExists = (className: string): boolean => styleMap.has(className);
