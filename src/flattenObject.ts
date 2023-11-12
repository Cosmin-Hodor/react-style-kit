import { CSSObject, StyleMapEntry } from '../types';

// Function to flatten a nested CSS object into a single-level object with concatenated keys
export const flattenCSSObject = (cssObject: CSSObject, prefix: string = '', preserveMediaQueries: boolean = false): StyleMapEntry => {
	let result: StyleMapEntry = {};
	for (const key in cssObject) {
		const value = cssObject[key];
		// Directly assign string values
		if (typeof value === 'string') {
			result[prefix + key] = value;
		} else if (typeof value === 'object') {
			// Check if it's a media query and whether it should be preserved
			if (preserveMediaQueries && key.startsWith('@media')) {
				// If it's a media query, add it to the result as is, without flattening
				// Ensure that the value is serialized as a string
				result[key] = JSON.stringify(value); // Serialize the object to a string
			} else {
				// Recursively flatten nested objects
				const nestedResult = flattenCSSObject(value, prefix + key + '-', preserveMediaQueries);
				result = { ...result, ...nestedResult };
			}
		}
	}
	return result;
};
