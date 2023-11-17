import { CSSObject, CssStringHolder, StyleMapEntry } from '../types';
import { styleMap } from './classExists';
import processCssObject from './processCssObject';

export type StyleMapEntryExtended = {
	[key: string]: string | CSSObject;
};

// Function to convert a CSS object into a CSS string with proper formatting
export const cssObjectToString = (cssObject: CSSObject, className: string): string => {
	const cssStrings: CssStringHolder = {
		main: [],
		media: [],
	};

	// Stringify the current and parent objects for ID generation
	let isExtended = false;
	let nonExtendedStyles: StyleMapEntryExtended = {};

	// Loop through existing styles to find if the current style extends any of them
	for (const [cachedClassName, cachedCssObject] of styleMap.entries()) {
		const cachedClassValues = Object.keys(cachedCssObject).filter((key) => cachedCssObject[key] === cssObject[key]);
		const mirrorObjectHasAllProperties = cachedClassValues.length === Object.keys(cachedCssObject).length;

		// Check if the current CSS object is an extension of an existing one
		if (mirrorObjectHasAllProperties) {
			isExtended = true;

			// Exclude properties that are already defined in the extended class
			for (const property in cssObject) {
				if (!cachedClassValues.includes(property)) {
					nonExtendedStyles[property] = cssObject[property];
				}
			}

			// Update the style tag in the DOM to include the new class name if necessary
			const styleTag = document.querySelector(`style[data-class="${cachedClassName}"]`);
			if (styleTag) {
				if (!styleTag.innerHTML.includes(className)) {
					const updatedCssContent = styleTag.innerHTML.replace(cachedClassName, `${cachedClassName}, .${className}`);
					styleTag.innerHTML = updatedCssContent;
				}
			}
			break;
		}
	}

	// Process the CSS object depending on whether it extends an existing class or not
	processCssObject(isExtended ? nonExtendedStyles : (cssObject as any), cssStrings, className);

	// Add the processed CSS object to the style map
	styleMap.set(className, cssObject as StyleMapEntry);

	// Combine and return all generated CSS strings, placing media queries last
	return [...cssStrings.main, ...cssStrings.media].join('');
};
