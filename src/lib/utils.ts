export function render_latex(input: string): string {
	// @ts-ignore
	if (typeof MathJax !== undefined) {
		// @ts-ignore
		return MathJax.tex2svg(input, { display: false }).outerHTML
	}
	return ''
}
