declare module 'react-style-kit' {
  const styled: (tag: string, styles: Function) => React.ComponentType<any>;
  export default styled;
}