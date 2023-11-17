import { CSSObject, StyleMapEntry } from '../types';
import { generateMediaQueryStyles } from './generateMediaQueries';

const processNestedCSSObject = (nestedCSSObject: CSSObject, parentSelector: string, className: string): string => {
	let nestedCSSProps = '';
	for (const nestedProperty in nestedCSSObject) {
		if (nestedProperty.startsWith('@media')) {
			// Handle media queries
			const mediaQueryCSSObject = nestedCSSObject[nestedProperty];
			if (typeof mediaQueryCSSObject === 'object' && !Array.isArray(mediaQueryCSSObject)) {
				const mediaQueryCondition = nestedProperty.substring(7).trim();
				nestedCSSProps += generateMediaQueryStyles(mediaQueryCSSObject as CSSObject, mediaQueryCondition, className);
			}
		} else if (typeof nestedCSSObject[nestedProperty] === 'object') {
			// Recursively process nested objects (like &:hover)
			nestedCSSProps += processNestedCSSObject(nestedCSSObject[nestedProperty], `${parentSelector}${nestedProperty}`, className);
		} else {
			// Handle regular and keyframes CSS properties
			console.log(nestedCSSObject);
			console.log('nestedProperty: ', nestedProperty);

			const cssProperty = nestedProperty.replace(/([A-Z])/g, '-$1').toLowerCase();
			nestedCSSProps += `${cssProperty}: ${nestedCSSObject[nestedProperty]}; `;
		}
	}
	return `${parentSelector} { ${nestedCSSProps} }`;
};

export const generateCSSProperties = (obj: StyleMapEntry, className: string) => {
	let cssProps = '';

	for (const property in obj) {
		if (typeof obj[property] === 'object') {
			// Process all nested objects including @keyframes and nested selectors
			cssProps += processNestedCSSObject(obj[property] as any, `${property}`, className);
		} else {
			// Handle top-level CSS properties
			const cssProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();
			cssProps += `${cssProperty}: ${obj[property]}; `;
		}
	}

	// Return the combined class properties
	return `${cssProps.length > 0 ? `.${className} { ${cssProps} }` : ''}`;
};
