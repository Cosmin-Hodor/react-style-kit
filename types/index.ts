// types/index.ts

// Types used in styled.ts
export type StyledProps<P extends object> = P & {
  className?: string;
};

export type CSSObject = {
  [key: string]: string | number | CSSObject;
};

export type cssStringHolder = {
  [key: string]: string[];
  main: string[];
  newScope: string[];
};