import { StyleMapEntry, CssStringHolder } from '../types';
import { generateCSSProperties } from './generateCSSProperties';

export const processCssObject = (obj: StyleMapEntry, cssStrings: CssStringHolder, className: string): void => {
	const cssProperties = generateCSSProperties(obj, className);

	if (cssProperties) {
		cssStrings.main.push(cssProperties);
	}
};

export default processCssObject;
