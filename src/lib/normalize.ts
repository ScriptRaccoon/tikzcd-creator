import type { Diagram } from './types'

export function normalize(diagram: Diagram): Diagram {
	const x_range = [...new Set(diagram.nodes.map((node) => node.pos.x))]
	const x_min = Math.min(...x_range)
	const y_range = [...new Set(diagram.nodes.map((node) => node.pos.y))]
	const y_min = Math.min(...y_range)

	const normalized_nodes = []

	for (const node of diagram.nodes) {
		const x_shift = get_left_emptiness(x_range, x_min, node.pos.x)
		const y_shift = get_left_emptiness(y_range, y_min, node.pos.y)
		const normalized_node = {
			...node,
			pos: { x: node.pos.x - x_shift, y: node.pos.y - y_shift }
		}
		normalized_nodes.push(normalized_node)
	}

	return { nodes: normalized_nodes, arrows: [] }
}

function get_left_emptiness(range: number[], min: number, val: number) {
	let amount = 0
	for (let i = min; i < val; i++) {
		if (!range.includes(i)) {
			amount++
		}
	}
	return amount
}
