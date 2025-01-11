import type { Diagram } from './types'

export function move_diagram(diagram: Diagram, axis: 'x' | 'y', value: 1 | -1) {
	for (const node of diagram.nodes) {
		node.pos[axis] += value
	}
	for (const arrow of diagram.arrows) {
		arrow.start[axis] += value
		arrow.end[axis] += value
	}
}
