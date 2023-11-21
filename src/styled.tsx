import React from 'react';
import { CSSObject, HTMLAttributes } from '../types';
import { getId } from '../utils/getId';
import { isEmpty } from '../utils/isEmpty';
import { stringifyObject } from '../utils/stringifyObject';
import { cssObjectToString } from './cssObjectToString';
import { classExists } from './classExists';
import filterHTMLAttributes from './isPropValid';

// The main `styled` function to create styled components
const styled = <P extends object, C extends React.ComponentType<HTMLAttributes>>(
	Component: C | string,
	styles: (props: P & HTMLAttributes) => CSSObject
): React.FunctionComponent<React.PropsWithChildren<P & HTMLAttributes>> => {
	return (props: React.PropsWithChildren<P & HTMLAttributes>) => {
		const { children, ...rest } = props || {};
		const validProps = filterHTMLAttributes(rest);

		const cssObject = styles(props);
		const cssString = stringifyObject(cssObject);
		const className = `dom-${getId(cssString)}`;

		// Create a new style element and append it to the document head if the class does not exist
		if (!classExists(className) && !isEmpty(cssString)) {
			const style = document.createElement('style');
			style.setAttribute('data-class', className);
			style.innerHTML = cssObjectToString(cssObject, className);
			document.head.appendChild(style);
		}

		// Combine generated class name with any existing class names passed as props
		const builtClassNames = `${className}${validProps.className ? ` ${validProps.className}` : ''}`;

		return (
			<Component {...validProps} className={builtClassNames}>
				{children}
			</Component>
		);
	};
};

export default styled;
