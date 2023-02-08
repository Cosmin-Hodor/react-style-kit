## Contributing

Contributions are always welcome!

Feel free to open PR's with changes and upgrades.


## Distribution & Usage

Each written line of code is open to the public and freely available.

Do as you please with it, no responsability taken on the owners behalf.

Am not responsable for any damages or potential changes brought by other contributors, if any.

## About

This code exports a Higher-Order Component (HOC) called styled that allows for defining styles for a given component. 

The component and its styles are passed as arguments to styled, which returns a new functional component that wraps the given component. 

When the functional component is rendered, it checks whether a style class matching the styles for the component exists. If it does not, the styles are added to the head of the HTML document as a new style tag. 

The returned component then adds a class to its className property that corresponds to the defined styles, so that the styles are applied to the component when it is rendered.

- stringifyObject - Given an object, it returns a string representation of it or an empty string if the object is empty.

- getChar - Given a number, it returns the corresponding character from the ASCII table using String.fromCharCode.

- getId - Given a string, it generates a hash code from the string and returns a modified string in the format of "hash-char".

- classExists - Given a class name, it checks if the class already exists in the document's head styles and returns true if it exists, false otherwise.

- cssObjectToString - Given an object representing styles in CSS, it converts the object to a string representation of CSS.

- styled - Given a React component and styles, it returns a Higher-Order Component (HOC) that applies the styles to the given component and returns the styled component. The styles are added to the document head if they do not exist.

### Code example:

```
import styled from './styled';

const Container = styled('div', (props) => ({
  background: props.bg,
  width: '200px',
  height: '100px',
}));

<Container bg={'red'}>
  This is a simple React component
</Container>
```
