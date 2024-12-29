import type { Coord } from './types'

export function render_latex(input: string): string {
	// @ts-ignore
	if (typeof MathJax !== undefined) {
		// @ts-ignore
		return MathJax.tex2svg(input, { display: false }).outerHTML
	}
	return ''
}

export function agree(start: Coord, end: Coord) {
	return start.x === end.x && start.y === end.y
}

export function repeat_string(str: string, times: number) {
	let result = ''
	for (let i = 0; i < times; i++) {
		result += str
	}
	return result
}

export function get_coord_key(x: number, y: number) {
	return `${x}_${y}`
}
