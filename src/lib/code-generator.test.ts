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
				{ id: 'n2', label: 'B', pos: { x: 1, y: 0 } },
			],
			arrows: [
				{
					id: 'a1',
					variant: 'rightarrow',
					start: { x: 0, y: 0 },
					end: { x: 1, y: 0 },
					label_above: 'f',
				},
			],
		}
		const expected_code = `\\begin{tikzcd} A \\ar{r}{f} & B \\end{tikzcd}`
		const actual_code = get_tikzcd_code(sample_diagram)
		expect(actual_code).toBe(expected_code)
	})

	it('returns the code of a single right-shifted arrow', () => {
		const sample_diagram: Diagram = {
			nodes: [
				{ id: 'n1', label: 'A', pos: { x: 0, y: 0 } },
				{ id: 'n2', label: 'B', pos: { x: 1, y: 0 } },
			],
			arrows: [
				{
					id: 'a1',
					variant: 'rightarrow',
					start: { x: 0, y: 0 },
					end: { x: 1, y: 0 },
					label_above: 'f',
					shift: 1,
				},
			],
		}
		const expected_code = `\\begin{tikzcd} A \\ar[shift right=0.4ex]{r}{f} & B \\end{tikzcd}`
		const actual_code = get_tikzcd_code(sample_diagram)
		expect(actual_code).toBe(expected_code)
	})

	it('returns the code of a single left-shifted arrow', () => {
		const sample_diagram: Diagram = {
			nodes: [
				{ id: 'n1', label: 'A', pos: { x: 0, y: 0 } },
				{ id: 'n2', label: 'B', pos: { x: 1, y: 0 } },
			],
			arrows: [
				{
					id: 'a1',
					variant: 'rightarrow',
					start: { x: 0, y: 0 },
					end: { x: 1, y: 0 },
					label_above: 'f',
					shift: -1,
				},
			],
		}
		const expected_code = `\\begin{tikzcd} A \\ar[shift left=0.4ex]{r}{f} & B \\end{tikzcd}`
		const actual_code = get_tikzcd_code(sample_diagram)
		expect(actual_code).toBe(expected_code)
	})

	it('returns the code of two parallel shifted dashed arrows', () => {
		const sample_diagram: Diagram = {
			nodes: [
				{ id: 'n1', label: 'A', pos: { x: 0, y: 0 } },
				{ id: 'n2', label: 'B', pos: { x: 1, y: 0 } },
			],
			arrows: [
				{
					id: 'a1',
					variant: 'dashed',
					start: { x: 0, y: 0 },
					end: { x: 1, y: 0 },
					label_above: 'f',
					shift: 1,
				},
				{
					id: 'a2',
					variant: 'dashed',
					start: { x: 0, y: 0 },
					end: { x: 1, y: 0 },
					label_above: 'g',
					shift: -1,
				},
			],
		}
		const expected_code = `\\begin{tikzcd} A \\ar[dashed, shift right=0.4ex]{r}{f} \\ar[dashed, shift left=0.4ex]{r}{g} & B \\end{tikzcd}`
		const actual_code = get_tikzcd_code(sample_diagram)
		expect(actual_code).toBe(expected_code)
	})

	it('returns the code of a 0-shifted arrow', () => {
		const sample_diagram: Diagram = {
			nodes: [
				{ id: 'n1', label: 'A', pos: { x: 0, y: 0 } },
				{ id: 'n2', label: 'B', pos: { x: 1, y: 0 } },
			],
			arrows: [
				{
					id: 'a1',
					variant: 'rightarrow',
					start: { x: 0, y: 0 },
					end: { x: 1, y: 0 },
					label_above: 'f',
					shift: 0,
				},
			],
		}
		const expected_code = `\\begin{tikzcd} A \\ar{r}{f} & B \\end{tikzcd}`
		const actual_code = get_tikzcd_code(sample_diagram)
		expect(actual_code).toBe(expected_code)
	})

	it('returns the code of a single Rightarrow with a label', () => {
		const sample_diagram: Diagram = {
			nodes: [
				{ id: 'n1', label: 'A', pos: { x: 0, y: 0 } },
				{ id: 'n2', label: 'B', pos: { x: 1, y: 0 } },
			],
			arrows: [
				{
					id: 'a1',
					variant: 'Rightarrow',
					start: { x: 0, y: 0 },
					end: { x: 1, y: 0 },
					label_above: 'f',
				},
			],
		}
		const expected_code = `\\begin{tikzcd} A \\ar[Rightarrow]{r}{f} & B \\end{tikzcd}`
		const actual_code = get_tikzcd_code(sample_diagram)
		expect(actual_code).toBe(expected_code)
	})

	it('returns the code of a single dashed arrow with a label', () => {
		const sample_diagram: Diagram = {
			nodes: [
				{ id: 'n1', label: 'A', pos: { x: 0, y: 0 } },
				{ id: 'n2', label: 'B', pos: { x: 1, y: 0 } },
			],
			arrows: [
				{
					id: 'a1',
					variant: 'dashed',
					start: { x: 0, y: 0 },
					end: { x: 1, y: 0 },
					label_above: 'f',
				},
			],
		}
		const expected_code = `\\begin{tikzcd} A \\ar[dashed]{r}{f} & B \\end{tikzcd}`
		const actual_code = get_tikzcd_code(sample_diagram)
		expect(actual_code).toBe(expected_code)
	})

	it('returns the code of a single dash arrow with a label', () => {
		const sample_diagram: Diagram = {
			nodes: [
				{ id: 'n1', label: 'A', pos: { x: 0, y: 0 } },
				{ id: 'n2', label: 'B', pos: { x: 1, y: 0 } },
			],
			arrows: [
				{
					id: 'a1',
					variant: 'dash',
					start: { x: 0, y: 0 },
					end: { x: 1, y: 0 },
					label_above: 'f',
				},
			],
		}
		const expected_code = `\\begin{tikzcd} A \\ar[dash]{r}{f} & B \\end{tikzcd}`
		const actual_code = get_tikzcd_code(sample_diagram)
		expect(actual_code).toBe(expected_code)
	})

	it('returns the code of a single equals arrow with a label', () => {
		const sample_diagram: Diagram = {
			nodes: [
				{ id: 'n1', label: 'A', pos: { x: 0, y: 0 } },
				{ id: 'n2', label: 'B', pos: { x: 1, y: 0 } },
			],
			arrows: [
				{
					id: 'a1',
					variant: 'equal',
					start: { x: 0, y: 0 },
					end: { x: 1, y: 0 },
					label_above: 'f',
				},
			],
		}
		const expected_code = `\\begin{tikzcd} A \\ar[equal]{r}{f} & B \\end{tikzcd}`
		const actual_code = get_tikzcd_code(sample_diagram)
		expect(actual_code).toBe(expected_code)
	})

	it('returns the code of a single equals arrow with a label', () => {
		const sample_diagram: Diagram = {
			nodes: [
				{ id: 'n1', label: 'A', pos: { x: 0, y: 0 } },
				{ id: 'n2', label: 'B', pos: { x: 1, y: 0 } },
			],
			arrows: [
				{
					id: 'a1',
					variant: 'equal',
					start: { x: 0, y: 0 },
					end: { x: 1, y: 0 },
					label_above: 'f',
				},
			],
		}
		const expected_code = `\\begin{tikzcd} A \\ar[equal]{r}{f} & B \\end{tikzcd}`
		const actual_code = get_tikzcd_code(sample_diagram)
		expect(actual_code).toBe(expected_code)
	})

	it('returns the code of a single left arrow with a label', () => {
		const sample_diagram: Diagram = {
			nodes: [
				{ id: 'n1', label: 'A', pos: { x: 0, y: 0 } },
				{ id: 'n2', label: 'B', pos: { x: 1, y: 0 } },
			],
			arrows: [
				{
					id: 'a1',
					variant: 'rightarrow',
					start: { x: 1, y: 0 },
					end: { x: 0, y: 0 },
					label_above: 'f',
				},
			],
		}
		const expected_code = `\\begin{tikzcd} A & B \\ar{l}{f} \\end{tikzcd}`
		const actual_code = get_tikzcd_code(sample_diagram)
		expect(actual_code).toBe(expected_code)
	})

	it('returns the code of a single arrow without a label', () => {
		const sample_diagram: Diagram = {
			nodes: [
				{ id: 'n1', label: 'A', pos: { x: 0, y: 0 } },
				{ id: 'n2', label: 'B', pos: { x: 1, y: 0 } },
			],
			arrows: [
				{
					id: 'a1',
					variant: 'rightarrow',
					start: { x: 0, y: 0 },
					end: { x: 1, y: 0 },
				},
			],
		}
		const expected_code = `\\begin{tikzcd} A \\ar{r} & B \\end{tikzcd}`
		const actual_code = get_tikzcd_code(sample_diagram)
		expect(actual_code).toBe(expected_code)
	})

	it('returns the code of a single arrow with a swapped label', () => {
		const sample_diagram: Diagram = {
			nodes: [
				{ id: 'n1', label: 'A', pos: { x: 0, y: 0 } },
				{ id: 'n2', label: 'B', pos: { x: 1, y: 0 } },
			],
			arrows: [
				{
					id: 'a1',
					variant: 'rightarrow',
					start: { x: 0, y: 0 },
					end: { x: 1, y: 0 },
					label_below: 'f',
				},
			],
		}
		const expected_code = `\\begin{tikzcd} A \\ar{r}[swap]{f} & B \\end{tikzcd}`
		const actual_code = get_tikzcd_code(sample_diagram)
		expect(actual_code).toBe(expected_code)
	})

	it('returns the code of a single arrow with two labels', () => {
		const sample_diagram: Diagram = {
			nodes: [
				{ id: 'n1', label: 'A', pos: { x: 0, y: 0 } },
				{ id: 'n2', label: 'B', pos: { x: 1, y: 0 } },
			],
			arrows: [
				{
					id: 'a1',
					variant: 'rightarrow',
					start: { x: 0, y: 0 },
					end: { x: 1, y: 0 },
					label_above: 'g',
					label_below: 'f',
				},
			],
		}
		const expected_code = `\\begin{tikzcd} A \\ar{r}{g}[swap]{f} & B \\end{tikzcd}`
		const actual_code = get_tikzcd_code(sample_diagram)
		expect(actual_code).toBe(expected_code)
	})

	it('returns the code of a single arrow without nodes', () => {
		const sample_diagram: Diagram = {
			nodes: [],
			arrows: [
				{
					id: 'a1',
					variant: 'rightarrow',
					start: { x: 0, y: 0 },
					end: { x: 1, y: 0 },
					label_above: 'f',
				},
			],
		}
		const expected_code = `\\begin{tikzcd} \\ar{r}{f} & \\end{tikzcd}`
		const actual_code = get_tikzcd_code(sample_diagram)
		expect(actual_code).toBe(expected_code)
	})

	it('returns the code of a single arrow with unlabelled nodes', () => {
		const sample_diagram: Diagram = {
			nodes: [
				{ id: 'n1', pos: { x: 0, y: 0 } },
				{ id: 'n2', pos: { x: 1, y: 0 } },
			],
			arrows: [
				{
					id: 'a1',
					variant: 'rightarrow',
					start: { x: 0, y: 0 },
					end: { x: 1, y: 0 },
					label_above: 'f',
				},
			],
		}
		const expected_code = `\\begin{tikzcd} \\ar{r}{f} & \\end{tikzcd}`
		const actual_code = get_tikzcd_code(sample_diagram)
		expect(actual_code).toBe(expected_code)
	})

	it('returns the code of a single long arrow', () => {
		const sample_diagram: Diagram = {
			nodes: [
				{ id: 'n1', label: 'A', pos: { x: 0, y: 0 } },
				{ id: 'n2', label: 'B', pos: { x: 2, y: 0 } },
			],
			arrows: [
				{
					id: 'a1',
					variant: 'rightarrow',
					start: { x: 0, y: 0 },
					end: { x: 2, y: 0 },
					label_below: 'f',
				},
			],
		}
		const expected_code = `\\begin{tikzcd} A \\ar{rr}[swap]{f} & & B \\end{tikzcd}`
		const actual_code = get_tikzcd_code(sample_diagram)
		expect(actual_code).toBe(expected_code)
	})

	it('returns the code of a single arrow with relative distance', () => {
		const sample_diagram: Diagram = {
			nodes: [
				{ id: 'n1', label: 'A', pos: { x: 4, y: 5 } },
				{ id: 'n2', label: 'B', pos: { x: 5, y: 5 } },
			],
			arrows: [
				{
					id: 'a1',
					variant: 'rightarrow',
					start: { x: 4, y: 5 },
					end: { x: 5, y: 5 },
					label_above: 'f',
				},
			],
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
				{ id: 'n4', label: 'D', pos: { x: 1, y: 1 } },
			],
			arrows: [],
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
				{ id: 'n4', label: 'D', pos: { x: 1, y: 1 } },
			],
			arrows: [
				{
					id: 'a1',
					variant: 'rightarrow',
					start: { x: 0, y: 0 },
					end: { x: 1, y: 0 },
					label_above: 'a',
				},
				{
					id: 'a2',
					variant: 'rightarrow',
					start: { x: 1, y: 0 },
					end: { x: 1, y: 1 },
					label_above: 'b',
				},
				{
					id: 'a3',
					variant: 'rightarrow',
					start: { x: 0, y: 0 },
					end: { x: 0, y: 1 },
					label_below: 'c',
				},
				{
					id: 'a4',
					variant: 'rightarrow',
					start: { x: 0, y: 1 },
					end: { x: 1, y: 1 },
					label_below: 'd',
				},
			],
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
				{ id: 'n3', label: 'Z', pos: { x: 2, y: 0 } },
			],
			arrows: [
				{
					id: 'a1',
					variant: 'rightarrow',
					label_above: 'f',
					start: { x: 0, y: 0 },
					end: { x: 2, y: 0 },
				},
				{
					id: 'a2',
					variant: 'rightarrow',
					label_below: 'g',
					start: { x: 0, y: 0 },
					end: { x: 1, y: 1 },
				},
				{
					id: 'a3',
					variant: 'rightarrow',
					label_below: 'h',
					start: { x: 1, y: 1 },
					end: { x: 2, y: 0 },
				},
			],
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
				{ id: 'n3', label: 'Z', pos: { x: 2, y: 0 } },
			],
			arrows: [
				{
					id: 'a1',
					variant: 'rightarrow',
					label_above: 'f',
					start: { x: 2, y: 0 },
					end: { x: 0, y: 0 },
				},
				{
					id: 'a2',
					variant: 'rightarrow',
					label_above: 'g',
					start: { x: 2, y: 0 },
					end: { x: 1, y: 1 },
				},
				{
					id: 'a3',
					variant: 'rightarrow',
					label_above: 'h',
					start: { x: 1, y: 1 },
					end: { x: 0, y: 0 },
				},
			],
		}
		const expected_code = `\\begin{tikzcd} X & & Z \\ar{ll}{f} \\ar{dl}{g} \\\\ & Y \\ar{ul}{h} & \\end{tikzcd}`
		const actual_code = get_tikzcd_code(sample_diagram)
		expect(actual_code).toBe(expected_code)
	})

	it('returns the code of an equalizer diagram', () => {
		const sample_diagram: Diagram = {
			nodes: [
				{ id: 'n1', pos: { x: 1, y: 1 }, label: 'A' },
				{ id: 'n2', pos: { x: 2, y: 1 }, label: 'B' },
				{ id: 'n3', pos: { x: 0, y: 1 }, label: 'E' },
				{ id: 'n4', pos: { x: 0, y: 0 }, label: 'T' },
			],
			arrows: [
				{
					id: 'a1',
					start: { x: 0, y: 1 },
					end: { x: 1, y: 1 },
					variant: 'rightarrow',
					label_below: '\\iota',
				},
				{
					id: 'a2',
					start: { x: 0, y: 0 },
					end: { x: 0, y: 1 },
					variant: 'dashed',
					label_below: '\\exists !',
				},
				{
					id: 'a3',
					start: { x: 0, y: 0 },
					end: { x: 1, y: 1 },
					variant: 'rightarrow',
					label_above: 'a',
				},
				{
					id: 'a4',
					start: { x: 1, y: 1 },
					end: { x: 2, y: 1 },
					variant: 'rightarrow',
					label_above: 'f',
					shift: -1,
				},
				{
					id: 'a5',
					start: { x: 1, y: 1 },
					end: { x: 2, y: 1 },
					variant: 'rightarrow',
					label_below: 'g',
					shift: 1,
				},
			],
		}
		const expected_code = `\\begin{tikzcd} T \\ar[dashed]{d}[swap]{\\exists !} \\ar{dr}{a} & & \\\\ E \\ar{r}[swap]{\\iota} & A \\ar[shift left=0.4ex]{r}{f} \\ar[shift right=0.4ex]{r}[swap]{g} & B \\end{tikzcd}`
		const actual_code = get_tikzcd_code(sample_diagram)
		expect(actual_code).toBe(expected_code)
	})

	it('does not render looped arrows for now', () => {
		const sample_diagram: Diagram = {
			nodes: [
				{ id: 'n1', label: 'A', pos: { x: 0, y: 0 } },
				{ id: 'n2', label: 'B', pos: { x: 1, y: 0 } },
			],
			arrows: [
				{
					id: 'a1',
					variant: 'rightarrow',
					start: { x: 0, y: 0 },
					end: { x: 0, y: 0 },
				},
			],
		}
		const expected_code = `\\begin{tikzcd} A & B \\end{tikzcd}`
		const actual_code = get_tikzcd_code(sample_diagram)
		expect(actual_code).toBe(expected_code)
	})
})
