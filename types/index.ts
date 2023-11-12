export type CSSObject = { [key: string]: string | CSSObject };
export type StyleMapEntry = { [key: string]: string };
export interface CssStringHolder {
	main: string[];
	media: string[];
}
