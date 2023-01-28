## Contributing

Contributions are always welcome!

Feel free to open PR's with changes and upgrades.


## Distribution & Usage

Each written line of code is open to the public and freely available.

Do as you please with it, no responsability taken on the owners behalf.

Am not responsable for any damages or potential changes brought by other contributors, if any.

## How to

This code exports a single function styled that takes two arguments: a React component and a function that returns a CSS object.

The styled function generates a unique class name based on the CSS object passed to it, and checks if that class name already exists in the page's head tag.

If the class name does not exist, it creates a new style tag with the styles defined in the CSS object, and adds the class name to the React component.

The generated class name is a combination of a 5-digit hash of the CSS object, and a character derived from the last digit of the hash.

The code uses some utility functions getChar, getId, classExists and cssObjectToString to achieve this.

- getChar takes a position and returns the character that corresponds to that position in the ASCII table.

- getId takes a string, creates a hash from it, and returns a 5-digit hash plus a character that corresponds to the last digit of the hash.

- classExists takes a className, looks in the head tag for all the style tags, checks all the rules in the style tags and returns true if the className passed as argument exists in any of the rules.

- cssObjectToString takes in one parameter, "cssObject", which is of type "any". It converts the "cssObject" to a string and creates an array called "cssStrings" to store the resulting CSS string. The function then uses a recursive helper function called "traverse" to iterate through the properties and values of the "cssObject" and appends them to the "cssStrings" array in the proper CSS syntax. Finally, the function returns the "cssStrings" array joined as a single string.

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

#### Support
If you enjoy the work and want to reward it, you can [buy me a coffee](https://www.buymeacoffee.com/CHodor), although it really isn't required!

Freedom of knowledge should be a universal right.

Enjoy!
