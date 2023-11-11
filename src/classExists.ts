export const classExists = (className: string): boolean | null => {
	const styleTags = Array.from(document.head.getElementsByTagName("style"));

	for (const styleTag of styleTags) {
		const styleTagText = styleTag.textContent || "";
		const styleRules = styleTagText.split("}");
		for (const styleRule of styleRules) {
			const selector = styleRule.split("{")[0].trim();
			if (selector.replace(" ", "") === className) {
				return true;
			}
		}
	}

	return null;
};
