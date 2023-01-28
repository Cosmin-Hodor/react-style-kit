/**
  Returns an alphabete character at specificed position
  @function
  @param {number} position - The position of a character in the alphabet (1-based)
  @returns {string} - The corresponding character in the alphabet
*/
const getChar = (position: number): string => String.fromCharCode(Number(position) + 64);

/**
  Generates a unique hash number from a seed string
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
  @param {any} className - The class name to check for.
  @returns {(boolean | null)} Returns true if the class exists, null if it does not.
*/
const classExists = (className: any) => {
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
  @param {any} cssObject - The CSS object to be converted to a string.
  @returns {string} - The resulting CSS string.
*/
const cssObjectToString = (cssObject: any) => {
  const cssStrings: any[] = [];
  const cssString = (JSON.stringify(cssObject) || '').toString();

  /**
    Recursive function that traverses the CSS object and builds the CSS string.
    @param {any} obj - The current object being traversed.
    @param {string} [selector='', newScope=false] - The current selector and whether a new scope is being created.
  */
  function traverse(obj: any, selector = '', newScope = false) {
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

type SortedCSSObject = {
  [key: string]: string,
};

/**
  @function
  @param {React.Component} Component - A React component that will be styled
  @param {Function} styles - A function that takes in props and returns an object representing CSS styles
  @returns {Function} - A higher-order component that applies the styles to the passed in component and adds a unique className
*/
const styled = (Component: any, styles: (props: any) => any) => {
  return (props: any) => {
    let sortedObject: SortedCSSObject = {};
    Object.keys(styles(props)).sort().forEach(key => sortedObject[key] = styles(props)[key]);
    const cssString = (JSON.stringify(sortedObject) || '').toString();
    const styling = `${cssObjectToString(sortedObject)}`;

    if (!classExists(`.dom-${getId(cssString)}`)) {
      document.head.insertAdjacentHTML("beforeend", `<style>${styling}</style>`)
    };

    return (
      <Component {...props} className={`dom-${getId(cssString)}${!!props?.className ? ` ${props?.className}` : ''}`} >
        {props.children}
      </Component>
    );
  };
};

export default styled;
