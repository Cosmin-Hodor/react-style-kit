const isEmpty = (value: object | string | []) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string' && value.length === 0) return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === 'object' && Object.keys(value).length === 0) return true;
  return false;
};

const stringifyObject = (obj: object): string => !isEmpty(obj) ? (JSON.stringify(obj) || '').toString() : '';

const getChar = (position: number): string => String.fromCharCode(Number(position) + 64);

const getId = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  };

  const parsedHash = hash.toString().substring(0, 5).replace('-', '')

  return `${parsedHash}-${getChar(Math.abs((parseInt(parsedHash) % 10 || 1)))}`;
};

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

const cssObjectToString = (cssObject: object, parentObject?: object): string => {
  type cssStringHolder = {
    [key: string]: string[],
    main: string[],
    newScope: string[],
  };

  const cssStrings: cssStringHolder = {
    main: [],
    newScope: [],
    media: [],
  };

  const cssString = stringifyObject(cssObject);
  const parentString = parentObject && stringifyObject(parentObject);

  function traverse(obj: { [key: string]: any }, selector: string = '', newScope: boolean = false) {
    const stringHolder = newScope ? 'newScope' : 'main';

    const pointer = `${cssStrings[stringHolder].length && !newScope ? '}' : ''} .dom-${getId(parentString || cssString)}${newScope ? selector : ''} { `;
    cssStrings[stringHolder].push(pointer);

    for (const property in obj) {
      if (typeof obj[property] === 'object') {
        if (property.startsWith('@media') || property.startsWith('[class')) {
          const mediaRules = cssObjectToString(obj[property], obj);
          cssStrings.media.push(` ${property} { ${mediaRules} } `);
        } else {
          traverse(obj[property], property, true);
        }
      } else {
        const cssProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();
        const value = obj[property];
        if (value) {
          cssStrings[stringHolder].push(`${cssProperty}: ${value}; `);
        };
      };
    };
    cssStrings[stringHolder].push(' }');
  };

  if (!isEmpty(cssObject)) {
    traverse(cssObject);
  };

  return [...cssStrings.main, ...cssStrings.newScope, ...cssStrings.media].join('');
};

const styled = <P extends object, C extends React.ComponentType<P>>(
  Component: C | string,
  styles: (props: P) => object,
): React.FunctionComponent<React.PropsWithChildren<P & any>> => {
  return (props: React.PropsWithChildren<P & any>) => {
    const sortedObject: { [key: string]: any } = {};
    const styleProps: { [key: string]: any } = styles(props);

    if (styleProps && !isEmpty(styleProps)) {
      Object.keys(styleProps).sort().forEach(key => {
        if (styleProps.hasOwnProperty(key)) {
          sortedObject[key] = styleProps[key];
        };
      });
    };

    const cssString = stringifyObject(sortedObject);
    const styling = `${cssObjectToString(sortedObject)}`;

    if (!classExists(`.dom-${getId(cssString)}`) && !isEmpty(cssString)) {
      const style = document.createElement('style');
      style.innerHTML = styling;
      document.head.appendChild(style);
    };

    const builtClassNames = `${!isEmpty(cssString) ? `dom-${getId(cssString)}` : ''}${!!props.className ? ` ${props.className}` : ''}`;

    return (
      <Component {...props as P} {...!isEmpty(builtClassNames) && { className: builtClassNames }} >
        {props.children}
      </Component>
    );
  };
};

export default styled;
