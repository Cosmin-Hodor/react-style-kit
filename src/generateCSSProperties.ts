import { CSSObject, StyleMapEntry } from '../types';
import { generateMediaQueryStyles } from './generateMediaQueries';

const processNestedCSSObject = (nestedCSSObject: CSSObject, parentSelector: string, className: string): [string, string] => {
	let nestedCSSProps = '';
	let mediaQueries = '';

	for (const nestedProperty in nestedCSSObject) {
		if (nestedProperty.startsWith('@media')) {
			// Store media queries separately
			const mediaQueryCSSObject = nestedCSSObject[nestedProperty];
			if (typeof mediaQueryCSSObject === 'object' && !Array.isArray(mediaQueryCSSObject)) {
				const mediaQueryCondition = nestedProperty.substring(7).trim();
				mediaQueries += generateMediaQueryStyles(mediaQueryCSSObject as CSSObject, mediaQueryCondition, className);
			}
		} else if (typeof nestedCSSObject[nestedProperty] === 'object') {
			// Recursively process nested objects
			const [nestedStyles, nestedMediaQueries] = processNestedCSSObject(nestedCSSObject[nestedProperty], `${parentSelector}${nestedProperty}`, className);
			nestedCSSProps += nestedStyles;
			mediaQueries += nestedMediaQueries;
		} else {
			// Handle regular CSS properties
			const cssProperty = nestedProperty.replace(/([A-Z])/g, '-$1').toLowerCase();
			nestedCSSProps += `${cssProperty}: ${nestedCSSObject[nestedProperty]}; `;
		}
	}
	return [` ${parentSelector} { ${nestedCSSProps} }`, mediaQueries];
};

export const generateCSSProperties = (obj: StyleMapEntry, className: string) => {
	let cssProps = '';
	let mediaQueries = '';

	for (const property in obj) {
		if (typeof obj[property] === 'object') {
			// Process all nested objects
			const [nestedStyles, nestedMediaQueries] = processNestedCSSObject(obj[property] as any, `${property}`, className);
			cssProps += nestedStyles;
			mediaQueries += nestedMediaQueries;
		} else {
			// Handle top-level CSS properties
			const cssProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();
			cssProps += `${cssProperty}: ${obj[property]}; `;
		}
	}

	// Return the combined class properties and append media queries at the end
	return `${cssProps.length > 0 ? `.${className} { ${cssProps} }` : ''}${mediaQueries}`;
};
