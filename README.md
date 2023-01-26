## Contributing

Contributions are always welcome!

Feel free to open PR's with changes and upgrades.


## Distribution & Usage

Each written line of code is open to the public and freely available.

Do as you please with it, no responsability taken on the owners behalf.

Am not responsable for any damages or potential changes brought by other contributors, if any.

## How to

This code exports a function "styled" that takes two parameters, a React component and an object with CSS styles. 

The function then generates a unique class name based on the styles object and adds the styles to the head of the document using the class name. 

The function then returns a new component that has the generated class name added to its className prop and renders the original component with the added class name. 

It also has a check to see if the same class already exists, if it does it will not add the same class again.

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
