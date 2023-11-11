import { cssStringHolder } from "../packaged/types";
import { getId } from "./getId";
import { isEmpty } from "./isEmpty";
import { stringifyObject } from "./stringifyObject";

export const cssObjectToString = (cssObject: object, parentObject?: object): string => {
	const cssStrings: cssStringHolder = {
		main: [],
		newScope: [],
		media: [],
	};

	const cssString = stringifyObject(cssObject);
	const parentString = parentObject && stringifyObject(parentObject);

	function traverse(obj: { [key: string]: any }, selector: string = "", newScope: boolean = false) {
		const stringHolder = newScope ? "newScope" : "main";

		const pointer = `${cssStrings[stringHolder].length && !newScope ? "}" : ""} .dom-${getId(parentString || cssString)}${newScope ? selector : ""} { `;
		cssStrings[stringHolder].push(pointer);

		for (const property in obj) {
			if (typeof obj[property] === "object") {
				if (property.startsWith("@media") || property.startsWith("[class")) {
					const mediaRules = cssObjectToString(obj[property], obj);
					cssStrings.media.push(` ${property} { ${mediaRules} } `);
				} else {
					traverse(obj[property], property, true);
				}
			} else {
				const cssProperty = property.replace(/([A-Z])/g, "-$1").toLowerCase();
				const value = obj[property];
				if (value) {
					cssStrings[stringHolder].push(`${cssProperty}: ${value}; `);
				}
			}
		}
		cssStrings[stringHolder].push(" }");
	}

	if (!isEmpty(cssObject)) {
		traverse(cssObject);
	}

	return [...cssStrings.main, ...cssStrings.newScope, ...cssStrings.media].join("");
};
