import React from "react";
import { classExists } from "./classExists";
import { cssObjectToString } from "./cssObjectToString";
import { getId } from "./getId";
import { isEmpty } from "./isEmpty";
import { stringifyObject } from "./stringifyObject";

const styled = <P extends object, C extends React.ComponentType<P>>(
	Component: C | string,
	styles: (props: P) => object
): React.FunctionComponent<React.PropsWithChildren<P & { className?: string }>> => {
	return (props: React.PropsWithChildren<P & { className?: string }>) => {
		const sortedObject: { [key: string]: any } = {};
		const styleProps: { [key: string]: any } = styles(props);

		if (styleProps && !isEmpty(styleProps)) {
			Object.keys(styleProps)
				.sort()
				.forEach((key) => {
					if (styleProps.hasOwnProperty(key)) {
						sortedObject[key] = styleProps[key];
					}
				});
		}

		const cssString = stringifyObject(sortedObject);
		const styling = `${cssObjectToString(sortedObject)}`;

		if (!classExists(`.dom-${getId(cssString)}`) && !isEmpty(cssString)) {
			const style = document.createElement("style");
			style.innerHTML = styling;
			document.head.appendChild(style);
		}

		const builtClassNames = `${!isEmpty(cssString) ? `dom-${getId(cssString)}` : ""}${!!props.className ? ` ${props.className}` : ""}`;

		return (
			<Component {...(props as P)} {...(!isEmpty(builtClassNames) && { className: builtClassNames })}>
				{props.children}
			</Component>
		);
	};
};

export default styled;
