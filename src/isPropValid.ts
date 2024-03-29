export const htmlAttributes: string[] = [
	// Global Attributes
	'accesskey',
	'class',
	'className',
	'contenteditable',
	'data-*',
	'dir',
	'draggable',
	'hidden',
	'id',
	'lang',
	'style',
	'tabindex',
	'title',
	'translate',

	// Event Attributes
	'onabort',
	'onautocomplete',
	'onautocompleteerror',
	'onblur',
	'oncancel',
	'oncanplay',
	'oncanplaythrough',
	'onchange',
	'onclick',
	'onclose',
	'oncontextmenu',
	'oncopy',
	'oncuechange',
	'oncut',
	'ondblclick',
	'ondrag',
	'ondragend',
	'ondragenter',
	'ondragexit',
	'ondragleave',
	'ondragover',
	'ondragstart',
	'ondrop',
	'ondurationchange',
	'onemptied',
	'onended',
	'onerror',
	'onfocus',
	'oninput',
	'oninvalid',
	'onkeydown',
	'onkeypress',
	'onkeyup',
	'onload',
	'onloadeddata',
	'onloadedmetadata',
	'onloadstart',
	'onmousedown',
	'onmouseenter',
	'onmouseleave',
	'onmousemove',
	'onmouseout',
	'onmouseover',
	'onmouseup',
	'onmousewheel',
	'onpaste',
	'onpause',
	'onplay',
	'onplaying',
	'onprogress',
	'onratechange',
	'onreset',
	'onresize',
	'onscroll',
	'onseeked',
	'onseeking',
	'onselect',
	'onshow',
	'onstalled',
	'onsubmit',
	'onsuspend',
	'ontimeupdate',
	'ontoggle',
	'onvolumechange',
	'onwaiting',
	'onwheel',

	// Form and Input Attributes
	'accept',
	'accept-charset',
	'action',
	'align',
	'alt',
	'autocomplete',
	'autofocus',
	'checked',
	'disabled',
	'enctype',
	'for',
	'form',
	'formaction',
	'formenctype',
	'formmethod',
	'formnovalidate',
	'formtarget',
	'height',
	'list',
	'max',
	'maxlength',
	'min',
	'minlength',
	'multiple',
	'name',
	'novalidate',
	'pattern',
	'placeholder',
	'readonly',
	'required',
	'selected',
	'size',
	'src',
	'step',
	'target',
	'type',
	'value',
	'defaultvalue',
	'width',

	// Media Attributes
	'autoplay',
	'buffered',
	'controls',
	'crossorigin',
	'loop',
	'muted',
	'playsinline',
	'poster',
	'preload',
	'src',
	'volume',

	// Link and Meta Attributes
	'charset',
	'content',
	'href',
	'hreflang',
	'http-equiv',
	'media',
	'rel',
	'rev',
	'sizes',
	'srcset',
	'type',
];

const filterHTMLAttributes = (props: { [key: string]: any }) => {
	const validHTMLAttributes = new Set(htmlAttributes);
	return Object.keys(props)
		.filter((key: string) => validHTMLAttributes.has(key.toLowerCase()))
		.reduce((obj: any, key: any) => {
			obj[key] = props[key];
			return obj;
		}, {});
};

export default filterHTMLAttributes;
