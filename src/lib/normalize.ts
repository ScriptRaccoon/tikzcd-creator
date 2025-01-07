import { get_ranges } from './code-generator'
import type { Coord, Diagram } from './types'

export function normalize(diagram: Diagram): Diagram {
	const copy: Diagram = JSON.parse(JSON.stringify(diagram))

	const [xrange, yrange] = get_ranges(diagram)

	for (const node of copy.nodes) {
		node.pos = transform_coord(node.pos, xrange, yrange)
	}

	for (const arrow of copy.arrows) {
		for (const key of ['start', 'end'] as const) {
			arrow[key] = transform_coord(arrow[key], xrange, yrange)
		}
	}

	return copy
}

function transform_coord(
	coord: Coord,
	xrange: number[],
	yrange: number[],
): Coord {
	const x_shift = get_left_emptiness(xrange, coord.x)
	const y_shift = get_left_emptiness(yrange, coord.y)
	return { x: coord.x - x_shift, y: coord.y - y_shift }
}

function get_left_emptiness(range: number[], val: number) {
	const min = Math.min(...range)
	let amount = 0
	for (let i = min; i < val; i++) {
		if (!range.includes(i)) amount++
	}
	return amount
}
