/**
  Converts an object to a string and returns it.
  @param {object} obj - The object to convert to a string.
  @returns {string} The string representation of the input object, or an empty string if the object is falsy.
*/
const stringifyObject = (obj: object): string => (JSON.stringify(obj) || '').toString();

/**
  The position parameter should only accept values between 1 and 26, and that the returned string will always be uppercase.
  @function
  @param {number} position - The position of a character in the alphabet (1-based)
  @returns {string} - The corresponding character in the alphabet
*/
const getChar = (position: number): string => String.fromCharCode(Number(position) + 64);

/**
  The input string should only contain alphanumeric characters, and that the returned string will always be in the format of "XXXXX-X", where "X" represents any alphanumeric character.
  @function
  @param {string} str - The input string
  @returns {string} - A unique identifier based on the input string
*/
const getId = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  };

  return `${(hash.toString().substring(0, 5)).replace('-', '')}-${getChar(Math.abs(hash % 10))}`;
};

/**
  Check if a class exists in the current document's head styles.
  The className parameter should only be a string, and that the function will return null if the class does not exist in the document's head styles.
  @param {any} className - The class name to check for.
  @returns {(boolean | null)} Returns true if the class exists, null if it does not.
*/
const classExists = (className: string): (boolean | null) => {
  const styleTags = Array.from(document.head.getElementsByTagName('style'));

  for (const styleTag of styleTags) {
    const styleTagText = styleTag.textContent || '';
    const styleRules = styleTagText.split('}');
    for (const styleRule of styleRules) {
      const selector = styleRule.split('{')[0].trim();
      if ((selector).replace(' ', '') === className) {
        return true;
      };
    };
  };

  return null;
};

/**
  Converts a CSS object to a string.
  @param {object} cssObject - The CSS object to be converted to a string.
  @returns {string} - The resulting CSS string.
*/
const cssObjectToString = (cssObject: object): string => {
  const cssStrings: any[] = [];
  const cssString = stringifyObject(cssObject);

  /**
    Recursive function that traverses the CSS object and builds the CSS string.
    The cssObject parameter should only be an object and that the returned string will always be a valid CSS string.
    @param {any} obj - The current object being traversed.
    @param {string} [selector='', newScope=false] - The current selector and whether a new scope is being created.
  */
  function traverse(obj: { [key: string]: any }, selector: string = '', newScope: boolean = false) {
    const pointer = `${cssStrings?.length ? '}' : ''}.dom-${getId(cssString)} ${newScope ? selector : ''} { `;
    cssStrings.push(pointer);

    for (const property in obj) {
      if (typeof obj[property] === 'object') {
        traverse(obj[property], property, true);
      } else {
        const cssProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();
        const value = obj[property];
        if (value) {
          cssStrings.push(`${cssProperty}: ${value}; `);
        };
      };
    };
    !newScope && cssStrings.push(' }');
  };

  traverse(cssObject);
  return cssStrings.join('');
};

/**
  The first parameter should always be a React component and the second parameter should always be a function that takes in props and returns an object representing CSS styles, 
  and that the returned function will always return a higher-order component that applies the styles to the passed in component and adds a unique className.
  @function
  @param {React.Component} Component - A React component that will be styled
  @param {Function} styles - A function that takes in props and returns an object representing CSS styles
  @returns {Function} - A higher-order component that applies the styles to the passed in component and adds a unique className
*/
const styled = <P extends object, C extends React.ComponentType<P>>(
  Component: C | string,
  styles: (props: P) => object,
): React.FunctionComponent<React.PropsWithChildren<P & { className?: string }>> => {
  return (props: React.PropsWithChildren<P & { className?: string }>) => {
    const sortedObject: { [key: string]: any } = {};
    const styleProps: { [key: string]: any } = styles(props);

    if (styleProps) {
      Object.keys(styleProps).sort().forEach(key => {
        if (styleProps.hasOwnProperty(key)) {
          sortedObject[key] = styleProps[key];
        };
      });
    };

    const cssString = stringifyObject(sortedObject);
    const styling = `${cssObjectToString(sortedObject)}`;

    if (!classExists(`.dom-${getId(cssString)}`)) {
      const style = document.createElement('style');
      style.innerHTML = styling;
      document.head.appendChild(style);
    };

    return (
      <Component {...props as P} className={`dom-${getId(cssString)}${!!props?.className ? ` ${props?.className}` : ''}`} >
        {props.children}
      </Component>
    );
  };
};

export default styled;
