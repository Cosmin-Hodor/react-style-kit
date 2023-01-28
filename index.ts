const getChar = (position: number) => String.fromCharCode(Number(position) + 64);

const getId = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  };

  return `${(hash.toString().substring(0, 5)).replace('-', '')}-${getChar(Math.abs(hash % 10))}`;
};


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

const cssObjectToString = (cssObject: any) => {
  const cssStrings: any[] = [];
  const cssString = (JSON.stringify(cssObject) || '').toString();

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
