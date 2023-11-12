## Contributing

Contributions are always welcome!

Feel free to open PR's with changes and upgrades.

## Distribution & Usage

Each written line of code is open to the public and freely available.

Do as you please with it, no responsibility taken on the owner's behalf.

I am not responsible for any damages or potential changes brought by other contributors, if any.

## About

This code offers a dynamic approach to manage CSS styles in React applications. It includes a variety of utility functions and a style management system that can be integrated into React components.

Key functionalities include:

- `stringifyObject`: Converts an object to its string representation, or returns an empty string if the object is empty.

- `getChar`: Given a number, returns the corresponding ASCII character.

- `getId`: Generates a unique hash string based on input, useful for creating unique class names.

- `classExists`: Checks if a given class name already exists in the document's head styles.

- `cssObjectToString`: Transforms a CSS object into a string representation of CSS styles.

- `generateMediaQueryStyles` and `generateCSSProperties`: Functions for processing CSS objects, including media queries, into CSS strings.

- `processCssObject`: Processes a given CSS object, appending the generated styles to the document's head and managing style reuse.

- `styleMap`: A Map object that keeps track of existing styles to prevent duplicates.

The system is designed to generate and inject CSS styles dynamically into the HTML document's head, facilitating efficient style management in React applications.
It does not duplicate CSS styles and even more, inherits CSS properties from other CSS classes for newly created components, if any are available.

### Code example:

```
import styled from './styled';

// Without props
const Container = styled('div', () => ({
  display: 'flex',
  justifyContent: 'center',
  // other styles...
}));

// With props
const Container = styled('div', (props) => ({
  display: 'flex',
  justifyContent: 'center',
  ...props.bg && {
    background: props.bg,
  },
  // other styles...
}));

// With media query
const Container = styled('div', () => ({
  display: 'flex',
  justifyContent: 'center',
  // other styles...

  '@media (max-width: 720px)': {  
    flexDirection: 'column',
  },
}));

<Container>
  This is a dynamically styled React component
</Container>
```

## To Do
- Expand type definitions to cover more HTML attributes and ensure better type safety.
- Enhance media query handling for more complex styling scenarios.
- Implement caching mechanisms for improved performance.
