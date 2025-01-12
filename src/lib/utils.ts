import type { Coord } from './types'

export function render_latex(input: string): string {
	return window.MathJax?.tex2svg(input, { display: false }).outerHTML ?? ''
}

export function agree(pos1: Coord, pos2: Coord) {
	return pos1.x === pos2.x && pos1.y === pos2.y
}

export function repeat_string(str: string, times: number) {
	let result = ''
	for (let i = 0; i < times; i++) {
		result += str
	}
	return result
}

export function deduplicate<T>(arr: T[]): T[] {
	return [...new Set<T>(arr)]
}
