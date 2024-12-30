import type { Diagram } from './types'

function move_along(diagram: Diagram, axis: 'x' | 'y', value: 1 | -1) {
	for (const node of diagram.nodes) {
		node.pos[axis] += value
	}
	for (const arrow of diagram.arrows) {
		arrow.start[axis] += value
		arrow.end[axis] += value
	}
}

export function move_left(diagram: Diagram) {
	move_along(diagram, 'x', -1)
}

export function move_right(diagram: Diagram) {
	move_along(diagram, 'x', +1)
}

export function move_up(diagram: Diagram) {
	move_along(diagram, 'y', -1)
}

export function move_down(diagram: Diagram) {
	move_along(diagram, 'y', +1)
}
