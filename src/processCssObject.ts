import { StyleMapEntry, CssStringHolder } from '../types';
import { generateCSSProperties } from './generateCSSProperties';
import { getId } from '../utils/getId';

export const processCssObject = (obj: StyleMapEntry, cssStrings: CssStringHolder, parentString: string, cssString: string): void => {
	const className = `dom-${getId(parentString || cssString)}`;
	const cssProperties = generateCSSProperties(obj, className);

	if (cssProperties) {
		cssStrings.main.push(cssProperties);
	}
};

export default processCssObject;
