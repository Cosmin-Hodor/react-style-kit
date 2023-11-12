import { CSSObject, StyleMapEntry } from "../types";
import { getId } from "../utils/getId";
import { stringifyObject } from "../utils/stringifyObject";
import { styleMap } from "./classExists";
import { flattenCSSObject } from "./flattenObject";

// Function to convert a CSS object into a CSS string with proper formatting
export const cssObjectToString = (cssObject: CSSObject, parentObject?: object): string => {
  // Holder for different types of CSS strings
  interface CssStringHolder {
      main: string[];
      newScope: string[];
      media: string[];
  }

  const cssStrings: CssStringHolder = {
      main: [],
      newScope: [],
      media: [],
  };

  // Stringify the current and parent objects for ID generation
  const cssString = stringifyObject(cssObject);
  const parentString = parentObject ? stringifyObject(parentObject) : '';
  let isExtended = false;
  let nonExtendedStyles: StyleMapEntry = {};

  // Flatten the CSS object to a single-level object
  const flattenedCSSObject = flattenCSSObject(cssObject);

  // Loop through existing styles to find if the current style extends any of them
  for (const [cachedClassName, cachedCssObject] of styleMap.entries()) {
      const cachedClassValues = Object.keys(cachedCssObject).filter((key) => cachedCssObject[key] === cssObject[key]);
      const mirrorObjectHasAllProperties = cachedClassValues.length === Object.keys(cachedCssObject).length;

      // Check if the current CSS object is an extension of an existing one
      if (mirrorObjectHasAllProperties) {
          isExtended = true;

          // Exclude properties that are already defined in the extended class
          for (const property in flattenedCSSObject) {
              if (!cachedClassValues.includes(property)) {
                  nonExtendedStyles[property] = flattenedCSSObject[property];
              }
          }

          // Update the style tag in the DOM to include the new class name if necessary
          const styleTag = document.querySelector(`style[data-class="${cachedClassName}"]`);
          if (styleTag) {
              const newClassName = `dom-${getId(parentString || cssString)}`;
              if (!styleTag.innerHTML.includes(newClassName)) {
                  const updatedCssContent = styleTag.innerHTML.replace(cachedClassName, `${cachedClassName}, .${newClassName}`);
                  styleTag.innerHTML = updatedCssContent;
              }
          }
          break;
      }
  }

  // Function to generate CSS property strings from an object
  const generateCSSProperties = (obj: StyleMapEntry) => {
      let cssProps = '';
      for (const property in obj) {
          // Convert camelCase to kebab-case for CSS properties
          const cssProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();
          cssProps += `${cssProperty}: ${obj[property]}; `;
      }
      return cssProps;
  };

  // Function to process a CSS object into CSS strings
  const processCssObject = (obj: StyleMapEntry, selector: string = '', newScope: boolean = false) => {
      const cssProperties = generateCSSProperties(obj);
      if (cssProperties) {
          const selectorPrefix = newScope ? selector : '';
          // Generate the final CSS strings and add them to the appropriate holder array
          cssStrings[newScope ? 'newScope' : 'main'].push(`.dom-${getId(parentString || cssString)}${selectorPrefix} { ${cssProperties} }`);
      }
  };

  // Process the CSS object depending on whether it extends an existing class or not
  processCssObject(isExtended ? nonExtendedStyles : flattenedCSSObject);

  // Add the processed CSS object to the style map
  styleMap.set(`dom-${getId(parentString || cssString)}`, flattenedCSSObject);

  // Combine and return all generated CSS strings
  return [...cssStrings.main, ...cssStrings.newScope, ...cssStrings.media].join('');
};