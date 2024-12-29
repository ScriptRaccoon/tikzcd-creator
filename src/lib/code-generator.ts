import type { Arrow, Coord, Diagram } from './types'
import { agree, repeat_string } from './utils'

function get_arrow_direction(start: Coord, end: Coord): string | null {
	let result = ''

	const x_distance = end.x - start.x
	const y_distance = end.y - start.y

	if (y_distance > 0) {
		result += repeat_string('d', y_distance)
	} else if (y_distance < 0) {
		result += repeat_string('u', -y_distance)
	}

	if (x_distance > 0) {
		result += repeat_string('r', x_distance)
	} else if (x_distance < 0) {
		result += repeat_string('l', -x_distance)
	}

	return result
}

function get_deliminiter(
	x: number,
	max_x: number,
	y: number,
	max_y: number
): string {
	if (x < max_x) {
		return '& '
	} else if (y < max_y) {
		return '\\\\ '
	}
	return ''
}

function get_node_code(diag: Diagram, x: number, y: number): string {
	const node_here = diag.nodes.find((node) => agree(node.pos, { x, y }))
	if (node_here) {
		return `${node_here.label} `
	}
	return ''
}

function get_arrow_code(arrow: Arrow): string {
	const direction = get_arrow_direction(arrow.start, arrow.end)
	let arrow_code = `\\ar{${direction}}`
	if (arrow.label_above) {
		arrow_code += `{${arrow.label_above}}`
	}
	if (arrow.label_below) {
		arrow_code += `[swap]{${arrow.label_below}}`
	}
	return arrow_code
}

function get_arrows_code(diag: Diagram, x: number, y: number) {
	let code = ''
	const arrows_here = diag.arrows.filter((arrow) =>
		agree(arrow.start, { x, y })
	)
	for (const arrow of arrows_here) {
		if (agree(arrow.start, arrow.end)) continue
		const arrow_code = get_arrow_code(arrow)
		code += `${arrow_code} `
	}
	return code
}

function get_node_range(diag: Diagram) {
	const minimal_x = Math.min(...diag.nodes.map((node) => node.pos.x))
	const maximal_x = Math.max(...diag.nodes.map((node) => node.pos.x))
	const minimal_y = Math.min(...diag.nodes.map((node) => node.pos.y))
	const maximal_y = Math.max(...diag.nodes.map((node) => node.pos.y))
	return { minimal_y, maximal_y, minimal_x, maximal_x }
}

export function get_tikzcd_code(diag: Diagram): string {
	let code = ' '

	const { minimal_y, maximal_y, minimal_x, maximal_x } = get_node_range(diag)

	for (let y = minimal_y; y <= maximal_y; y++) {
		for (let x = minimal_x; x <= maximal_x; x++) {
			code += get_node_code(diag, x, y)
			code += get_arrows_code(diag, x, y)
			code += get_deliminiter(x, maximal_x, y, maximal_y)
		}
	}
	return `\\begin{tikzcd}${code}\\end{tikzcd}`
}
