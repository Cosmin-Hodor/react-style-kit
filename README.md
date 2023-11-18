## Contributing

Contributions are always welcome!

Feel free to open PR's with changes and upgrades.

## Distribution & Usage

Each written line of code is open to the public and freely available.

Do as you please with it, no responsibility taken on the owner's behalf.

## Get started

You can either download the package and import styled.tsx in your project or simply do ``npm i react-style-kit``.
Link to NPM library: https://www.npmjs.com/package/react-style-kit

## About

This code offers a dynamic approach to manage CSS styles in React applications. It includes a variety of utility functions and a style management system that can be integrated into React components.

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
