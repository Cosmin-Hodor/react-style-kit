import { CSSObject, StyleMapEntry } from "../types";

// Function to flatten a nested CSS object into a single-level object with concatenated keys
export const flattenCSSObject = (cssObject: CSSObject, prefix: string = ''): StyleMapEntry => {
  let result: StyleMapEntry = {};
  for (const key in cssObject) {
      const value = cssObject[key];
      // Directly assign string values
      if (typeof value === 'string') {
          result[prefix + key] = value;
      } else if (typeof value === 'object') {
          // Recursively flatten nested objects
          const nestedResult = flattenCSSObject(value, prefix + key + '-');
          result = { ...result, ...nestedResult };
      }
  }
  return result;
};