import { CSSObject, StyleMapEntry } from '../types';
import { generateMediaQueryStyles } from './generateMediaQueries';

// Function to generate CSS property strings from a StyleMapEntry
export const generateCSSProperties = (obj: StyleMapEntry, className: string) => {
	let cssProps = '';
	let mediaQueries = '';

	for (const property in obj) {
		if (property.startsWith('@media')) {
			// Ensure obj[property] is treated as an object
			const mediaQueryCSSObject = obj[property];

			if (typeof mediaQueryCSSObject === 'object' && !Array.isArray(mediaQueryCSSObject)) {
				const mediaQueryCondition = property.substring(7).trim();
				mediaQueries += generateMediaQueryStyles(mediaQueryCSSObject as CSSObject, mediaQueryCondition, className);
			}
		} else {
			// Handle regular CSS properties
			const cssProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();
			cssProps += `${cssProperty}: ${obj[property]}; `;
		}
	}

	// Combine class properties and media queries correctly
	return `${cssProps.length > 0 ? `.${className} { ${cssProps} }` : ''} ${mediaQueries}`;
};
