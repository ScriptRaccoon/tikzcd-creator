import type { Arrow, Coord, Diagram } from './types'
import { agree, deduplicate, repeat_string } from './utils'

export function get_tikzcd_code(diagram: Diagram): string {
	let code = ' '

	const [xrange, yrange] = get_ranges(diagram)
	const xmin = Math.min(...xrange)
	const xmax = Math.max(...xrange)
	const ymin = Math.min(...yrange)
	const ymax = Math.max(...yrange)

	for (let y = ymin; y <= ymax; y++) {
		for (let x = xmin; x <= xmax; x++) {
			code += get_node_code(diagram, x, y)
			code += get_arrows_code(diagram, x, y)
			code += get_deliminiter(x, xmax, y, ymax)
		}
	}
	return `\\begin{tikzcd}${code}\\end{tikzcd}`
}

export function get_ranges(diagram: Diagram): [number[], number[]] {
	const xrange = deduplicate([
		...diagram.nodes.map((node) => node.pos.x),
		...diagram.arrows.map((arrow) => arrow.start.x),
		...diagram.arrows.map((arrow) => arrow.end.x),
	])

	const yrange = deduplicate([
		...diagram.nodes.map((node) => node.pos.y),
		...diagram.arrows.map((arrow) => arrow.start.y),
		...diagram.arrows.map((arrow) => arrow.end.y),
	])
	return [xrange, yrange]
}

function get_node_code(diagram: Diagram, x: number, y: number): string {
	const node_here = diagram.nodes.find((node) => agree(node.pos, { x, y }))
	if (node_here?.label) {
		return `${node_here.label} `
	}
	return ''
}

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

function get_arrow_options(arrow: Arrow): string {
	const option_1 = arrow.variant === 'rightarrow' ? null : arrow.variant
	const option_2 = arrow.shift
		? arrow.shift > 0
			? `shift right=${arrow.shift * 0.4}ex`
			: `shift left=${-arrow.shift * 0.4}ex`
		: null
	const options = [option_1, option_2].filter((opt) => opt != null)
	return options.join(', ')
}

function get_arrow_code(arrow: Arrow): string {
	const direction = get_arrow_direction(arrow.start, arrow.end)
	let arrow_code = `\\ar`

	const options = get_arrow_options(arrow)
	if (options) {
		arrow_code += `[${options}]`
	}

	arrow_code += `{${direction}}`

	if (arrow.label_above) {
		arrow_code += `{${arrow.label_above}}`
	}

	if (arrow.label_below) {
		arrow_code += `[swap]{${arrow.label_below}}`
	}

	return arrow_code
}

function get_arrows_code(diagram: Diagram, x: number, y: number) {
	let code = ''

	const arrows_here = diagram.arrows.filter((arrow) =>
		agree(arrow.start, { x, y }),
	)

	for (const arrow of arrows_here) {
		if (agree(arrow.start, arrow.end)) continue
		const arrow_code = get_arrow_code(arrow)
		code += `${arrow_code} `
	}

	return code
}

function get_deliminiter(
	x: number,
	xmax: number,
	y: number,
	ymax: number,
): string {
	if (x < xmax) {
		return '& '
	} else if (y < ymax) {
		return '\\\\ '
	}
	return ''
}
