import { CSSObject } from '../types';

// Function to generate CSS property strings from a nested CSSObject (for media queries)
export const generateMediaQueryStyles = (cssObject: CSSObject, mediaQueryCondition: string, className: string): string => {
	let styles = '';

	for (const key in cssObject) {
		const value = cssObject[key];
		if (typeof value === 'string') {
			// Convert camelCase to kebab-case for CSS properties
			const cssProperty = key.replace(/([A-Z])/g, '-$1').toLowerCase();
			styles += `${cssProperty}: ${value}; `;
		}
	}

	return `@media ${mediaQueryCondition} { .${className} { ${styles} } }`;
};
