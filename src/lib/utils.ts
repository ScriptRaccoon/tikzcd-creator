export const noop = () => {}

export function render_latex(input: string): string {
	// @ts-ignore
	if (typeof MathJax !== undefined) {
		// @ts-ignore
		return MathJax.tex2svg(input, { em: 12, ex: 6, display: false }).outerHTML
	}
	return ''
}
