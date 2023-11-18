import React from 'react';
import { CSSObject } from '../types';
import { getId } from '../utils/getId';
import { isEmpty } from '../utils/isEmpty';
import { stringifyObject } from '../utils/stringifyObject';
import { cssObjectToString } from './cssObjectToString';
import { classExists } from './classExists';
import filterHTMLAttributes from './isPropValid';

// The main `styled` function to create styled components
const styled = <P extends object, C extends React.ComponentType<P & { className?: string } & any>>(
	Component: C | string,
	styles: (props: P & { className?: string }) => CSSObject
): React.FunctionComponent<React.PropsWithChildren<P & { className?: string }>> => {
	return (props: React.PropsWithChildren<P & { className?: string }>) => {
		const styleProps = styles(props);
		// Flatten the style properties to a single-level object

		// Generate a unique class name for the component
		const cssString = stringifyObject(styleProps);
		const className = `dom-${getId(cssString)}`;

		// Create a new style element and append it to the document head if the class does not exist
		if (!classExists(className) && !isEmpty(cssString)) {
			const style = document.createElement('style');
			style.setAttribute('data-class', className);
			style.innerHTML = cssObjectToString(styleProps, className);
			document.head.appendChild(style);
		}

		// Combine generated class name with any existing class names passed as props
		const builtClassNames = `${className}${props.className ? ` ${props.className}` : ''}`;
		const validProps = filterHTMLAttributes(props);

		// Return the React element with applied styles
		return React.createElement(Component, { ...validProps, className: builtClassNames }, props.children);
	};
};

export default styled;
