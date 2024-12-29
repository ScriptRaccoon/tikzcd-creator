import { describe, it, expect } from 'vitest'
import { get_tikzcd_code } from './code-generator'
import type { Diagram } from './types'

describe('get_tikzcd_code', () => {
	it("returns the 'tikzcd' tag for an empty diagram", () => {
		const sample_diagram: Diagram = { nodes: [], arrows: [] }
		const expected_code = `\\begin{tikzcd} \\end{tikzcd}`
		const actual_code = get_tikzcd_code(sample_diagram)
		expect(actual_code).toBe(expected_code)
	})

	it('returns the code of a single right arrow with a label', () => {
		const sample_diagram: Diagram = {
			nodes: [
				{ id: 'n1', label: 'A', pos: { x: 0, y: 0 } },
				{ id: 'n2', label: 'B', pos: { x: 1, y: 0 } }
			],
			arrows: [
				{
					id: 'a1',
					start: { x: 0, y: 0 },
					end: { x: 1, y: 0 },
					label_above: 'f',
					label_below: ''
				}
			]
		}
		const expected_code = `\\begin{tikzcd} A \\ar{r}{f} & B \\end{tikzcd}`
		const actual_code = get_tikzcd_code(sample_diagram)
		expect(actual_code).toBe(expected_code)
	})

	it('returns the code of a single left arrow with a label', () => {
		const sample_diagram: Diagram = {
			nodes: [
				{ id: 'n1', label: 'A', pos: { x: 0, y: 0 } },
				{ id: 'n2', label: 'B', pos: { x: 1, y: 0 } }
			],
			arrows: [
				{
					id: 'a1',
					start: { x: 1, y: 0 },
					end: { x: 0, y: 0 },
					label_above: 'f',
					label_below: ''
				}
			]
		}
		const expected_code = `\\begin{tikzcd} A & B \\ar{l}{f} \\end{tikzcd}`
		const actual_code = get_tikzcd_code(sample_diagram)
		expect(actual_code).toBe(expected_code)
	})

	it('returns the code of a single arrow without a label', () => {
		const sample_diagram: Diagram = {
			nodes: [
				{ id: 'n1', label: 'A', pos: { x: 0, y: 0 } },
				{ id: 'n2', label: 'B', pos: { x: 1, y: 0 } }
			],
			arrows: [
				{
					id: 'a1',
					start: { x: 0, y: 0 },
					end: { x: 1, y: 0 },
					label_above: '',
					label_below: ''
				}
			]
		}
		const expected_code = `\\begin{tikzcd} A \\ar{r} & B \\end{tikzcd}`
		const actual_code = get_tikzcd_code(sample_diagram)
		expect(actual_code).toBe(expected_code)
	})

	it('returns the code of a single arrow with a swapped label', () => {
		const sample_diagram: Diagram = {
			nodes: [
				{ id: 'n1', label: 'A', pos: { x: 0, y: 0 } },
				{ id: 'n2', label: 'B', pos: { x: 1, y: 0 } }
			],
			arrows: [
				{
					id: 'a1',
					start: { x: 0, y: 0 },
					end: { x: 1, y: 0 },
					label_above: '',
					label_below: 'f'
				}
			]
		}
		const expected_code = `\\begin{tikzcd} A \\ar{r}[swap]{f} & B \\end{tikzcd}`
		const actual_code = get_tikzcd_code(sample_diagram)
		expect(actual_code).toBe(expected_code)
	})

	it('returns the code of a single arrow with two labels', () => {
		const sample_diagram: Diagram = {
			nodes: [
				{ id: 'n1', label: 'A', pos: { x: 0, y: 0 } },
				{ id: 'n2', label: 'B', pos: { x: 1, y: 0 } }
			],
			arrows: [
				{
					id: 'a1',
					start: { x: 0, y: 0 },
					end: { x: 1, y: 0 },
					label_above: 'g',
					label_below: 'f'
				}
			]
		}
		const expected_code = `\\begin{tikzcd} A \\ar{r}{g}[swap]{f} & B \\end{tikzcd}`
		const actual_code = get_tikzcd_code(sample_diagram)
		expect(actual_code).toBe(expected_code)
	})

	it('returns the code of a single long arrow', () => {
		const sample_diagram: Diagram = {
			nodes: [
				{ id: 'n1', label: 'A', pos: { x: 0, y: 0 } },
				{ id: 'n2', label: 'B', pos: { x: 2, y: 0 } }
			],
			arrows: [
				{
					id: 'a1',
					start: { x: 0, y: 0 },
					end: { x: 2, y: 0 },
					label_above: '',
					label_below: 'f'
				}
			]
		}
		const expected_code = `\\begin{tikzcd} A \\ar{rr}[swap]{f} & & B \\end{tikzcd}`
		const actual_code = get_tikzcd_code(sample_diagram)
		expect(actual_code).toBe(expected_code)
	})

	it('returns the code of a single arrow with relative distance', () => {
		const sample_diagram: Diagram = {
			nodes: [
				{ id: 'n1', label: 'A', pos: { x: 4, y: 5 } },
				{ id: 'n2', label: 'B', pos: { x: 5, y: 5 } }
			],
			arrows: [
				{
					id: 'a1',
					start: { x: 4, y: 5 },
					end: { x: 5, y: 5 },
					label_above: 'f',
					label_below: ''
				}
			]
		}
		const expected_code = `\\begin{tikzcd} A \\ar{r}{f} & B \\end{tikzcd}`
		const actual_code = get_tikzcd_code(sample_diagram)
		expect(actual_code).toBe(expected_code)
	})

	it('returns the code of a square without arrows', () => {
		const sample_diagram: Diagram = {
			nodes: [
				{ id: 'n1', label: 'A', pos: { x: 0, y: 0 } },
				{ id: 'n2', label: 'B', pos: { x: 1, y: 0 } },
				{ id: 'n3', label: 'C', pos: { x: 0, y: 1 } },
				{ id: 'n4', label: 'D', pos: { x: 1, y: 1 } }
			],
			arrows: []
		}
		const expected_code = `\\begin{tikzcd} A & B \\\\ C & D \\end{tikzcd}`
		const actual_code = get_tikzcd_code(sample_diagram)
		expect(actual_code).toBe(expected_code)
	})

	it('returns the code of a square with arrows', () => {
		const sample_diagram: Diagram = {
			nodes: [
				{ id: 'n1', label: 'A', pos: { x: 0, y: 0 } },
				{ id: 'n2', label: 'B', pos: { x: 1, y: 0 } },
				{ id: 'n3', label: 'C', pos: { x: 0, y: 1 } },
				{ id: 'n4', label: 'D', pos: { x: 1, y: 1 } }
			],
			arrows: [
				{
					id: 'a1',
					start: { x: 0, y: 0 },
					end: { x: 1, y: 0 },
					label_above: 'a',
					label_below: ''
				},
				{
					id: 'a2',
					start: { x: 1, y: 0 },
					end: { x: 1, y: 1 },
					label_above: 'b',
					label_below: ''
				},
				{
					id: 'a3',
					start: { x: 0, y: 0 },
					end: { x: 0, y: 1 },
					label_above: '',
					label_below: 'c'
				},
				{
					id: 'a4',
					start: { x: 0, y: 1 },
					end: { x: 1, y: 1 },
					label_above: '',
					label_below: 'd'
				}
			]
		}
		const expected_code = `\\begin{tikzcd} A \\ar{r}{a} \\ar{d}[swap]{c} & B \\ar{d}{b} \\\\ C \\ar{r}[swap]{d} & D \\end{tikzcd}`
		const actual_code = get_tikzcd_code(sample_diagram)
		expect(actual_code).toBe(expected_code)
	})

	it('returns the code of a triangle with arrows and labels', () => {
		const sample_diagram: Diagram = {
			nodes: [
				{ id: 'n1', label: 'X', pos: { x: 0, y: 0 } },
				{ id: 'n2', label: 'Y', pos: { x: 1, y: 1 } },
				{ id: 'n3', label: 'Z', pos: { x: 2, y: 0 } }
			],
			arrows: [
				{
					id: 'a1',
					label_above: 'f',
					label_below: '',
					start: { x: 0, y: 0 },
					end: { x: 2, y: 0 }
				},
				{
					id: 'a2',
					label_above: '',
					label_below: 'g',
					start: { x: 0, y: 0 },
					end: { x: 1, y: 1 }
				},
				{
					id: 'a3',
					label_above: '',
					label_below: 'h',
					start: { x: 1, y: 1 },
					end: { x: 2, y: 0 }
				}
			]
		}
		const expected_code = `\\begin{tikzcd} X \\ar{rr}{f} \\ar{dr}[swap]{g} & & Z \\\\ & Y \\ar{ur}[swap]{h} & \\end{tikzcd}`
		const actual_code = get_tikzcd_code(sample_diagram)
		expect(actual_code).toBe(expected_code)
	})

	it('returns the code of a reversed triangle', () => {
		const sample_diagram: Diagram = {
			nodes: [
				{ id: 'n1', label: 'X', pos: { x: 0, y: 0 } },
				{ id: 'n2', label: 'Y', pos: { x: 1, y: 1 } },
				{ id: 'n3', label: 'Z', pos: { x: 2, y: 0 } }
			],
			arrows: [
				{
					id: 'a1',
					label_above: 'f',
					label_below: '',
					start: { x: 2, y: 0 },
					end: { x: 0, y: 0 }
				},
				{
					id: 'a2',
					label_above: 'g',
					label_below: '',
					start: { x: 2, y: 0 },
					end: { x: 1, y: 1 }
				},
				{
					id: 'a3',
					label_above: 'h',
					label_below: '',
					start: { x: 1, y: 1 },
					end: { x: 0, y: 0 }
				}
			]
		}
		const expected_code = `\\begin{tikzcd} X & & Z \\ar{ll}{f} \\ar{dl}{g} \\\\ & Y \\ar{ul}{h} & \\end{tikzcd}`
		const actual_code = get_tikzcd_code(sample_diagram)
		expect(actual_code).toBe(expected_code)
	})

	it('does not render looped arrows for now', () => {
		const sample_diagram: Diagram = {
			nodes: [
				{ id: 'n1', label: 'A', pos: { x: 0, y: 0 } },
				{ id: 'n2', label: 'B', pos: { x: 1, y: 0 } }
			],
			arrows: [
				{
					id: 'a1',
					start: { x: 0, y: 0 },
					end: { x: 0, y: 0 },
					label_above: '',
					label_below: ''
				}
			]
		}
		const expected_code = `\\begin{tikzcd} A & B \\end{tikzcd}`
		const actual_code = get_tikzcd_code(sample_diagram)
		expect(actual_code).toBe(expected_code)
	})
})