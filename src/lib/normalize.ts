import type { Coord, Diagram } from './types'
import { deduplicate } from './utils'

export function normalize(diagram: Diagram): Diagram {
	const copy: Diagram = JSON.parse(JSON.stringify(diagram))

	const xrange = deduplicate([
		...diagram.nodes.map((node) => node.pos.x),
		...diagram.arrows.map((arrow) => arrow.start.x),
		...diagram.arrows.map((arrow) => arrow.end.x)
	])

	const yrange = deduplicate([
		...diagram.nodes.map((node) => node.pos.y),
		...diagram.arrows.map((arrow) => arrow.start.y),
		...diagram.arrows.map((arrow) => arrow.end.y)
	])

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
	yrange: number[]
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
