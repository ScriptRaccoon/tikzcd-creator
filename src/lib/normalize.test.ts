import { describe, it, expect } from 'vitest'
import type { Diagram } from './types'
import { normalize } from './normalize'

describe('normalize', () => {
	it('should normalize two nodes in x-direction', () => {
		const diagram: Diagram = {
			nodes: [
				{ id: 'n1', pos: { x: 0, y: 0 }, label: 'A' },
				{ id: 'n2', pos: { x: 5, y: 0 }, label: 'B' }
			],
			arrows: []
		}
		const normalized_diagram: Diagram = {
			nodes: [
				{ id: 'n1', pos: { x: 0, y: 0 }, label: 'A' },
				{ id: 'n2', pos: { x: 1, y: 0 }, label: 'B' }
			],
			arrows: []
		}
		expect(normalize(diagram)).toEqual(normalized_diagram)
	})

	it('should normalize multiple nodes in x-direction', () => {
		const diagram: Diagram = {
			nodes: [
				{ id: 'n1', pos: { x: 0, y: 2 }, label: 'A' },
				{ id: 'n2', pos: { x: 2, y: 3 }, label: 'B' },
				{ id: 'n2', pos: { x: 6, y: 4 }, label: 'C' }
			],
			arrows: []
		}
		const normalized_diagram: Diagram = {
			nodes: [
				{ id: 'n1', pos: { x: 0, y: 2 }, label: 'A' },
				{ id: 'n2', pos: { x: 1, y: 3 }, label: 'B' },
				{ id: 'n2', pos: { x: 2, y: 4 }, label: 'C' }
			],
			arrows: []
		}
		expect(normalize(diagram)).toEqual(normalized_diagram)
	})

	it('should normalize two nodes in y-direction', () => {
		const diagram: Diagram = {
			nodes: [
				{ id: 'n1', pos: { x: 3, y: 0 }, label: 'A' },
				{ id: 'n2', pos: { x: 3, y: 2 }, label: 'B' }
			],
			arrows: []
		}
		const normalized_diagram: Diagram = {
			nodes: [
				{ id: 'n1', pos: { x: 3, y: 0 }, label: 'A' },
				{ id: 'n2', pos: { x: 3, y: 1 }, label: 'B' }
			],
			arrows: []
		}
		expect(normalize(diagram)).toEqual(normalized_diagram)
	})

	it('should normalize a rectangle of nodes', () => {
		const diagram: Diagram = {
			nodes: [
				{ id: 'n1', pos: { x: 0, y: 0 }, label: 'A' },
				{ id: 'n2', pos: { x: 5, y: 0 }, label: 'B' },
				{ id: 'n3', pos: { x: 5, y: 7 }, label: 'C' },
				{ id: 'n4', pos: { x: 0, y: 7 }, label: 'D' }
			],
			arrows: []
		}
		const normalized_diagram: Diagram = {
			nodes: [
				{ id: 'n1', pos: { x: 0, y: 0 }, label: 'A' },
				{ id: 'n2', pos: { x: 1, y: 0 }, label: 'B' },
				{ id: 'n3', pos: { x: 1, y: 1 }, label: 'C' },
				{ id: 'n4', pos: { x: 0, y: 1 }, label: 'D' }
			],
			arrows: []
		}
		expect(normalize(diagram)).toEqual(normalized_diagram)
	})

	it('should normalize a triangle of nodes', () => {
		const diagram: Diagram = {
			nodes: [
				{ id: 'n1', pos: { x: 0, y: 0 }, label: 'A' },
				{ id: 'n2', pos: { x: 5, y: 0 }, label: 'B' },
				{ id: 'n3', pos: { x: 2, y: 5 }, label: 'C' }
			],
			arrows: []
		}
		const normalized_diagram: Diagram = {
			nodes: [
				{ id: 'n1', pos: { x: 0, y: 0 }, label: 'A' },
				{ id: 'n2', pos: { x: 2, y: 0 }, label: 'B' },
				{ id: 'n3', pos: { x: 1, y: 1 }, label: 'C' }
			],
			arrows: []
		}
		expect(normalize(diagram)).toEqual(normalized_diagram)
	})

	it('should normalize a trapezoid of nodes', () => {
		const diagram: Diagram = {
			nodes: [
				{ id: 'n1', pos: { x: 1, y: 0 }, label: 'A' },
				{ id: 'n2', pos: { x: 5, y: 0 }, label: 'B' },
				{ id: 'n3', pos: { x: 6, y: 7 }, label: 'C' },
				{ id: 'n4', pos: { x: 0, y: 7 }, label: 'D' }
			],
			arrows: []
		}
		const normalized_diagram: Diagram = {
			nodes: [
				{ id: 'n1', pos: { x: 1, y: 0 }, label: 'A' },
				{ id: 'n2', pos: { x: 2, y: 0 }, label: 'B' },
				{ id: 'n3', pos: { x: 3, y: 1 }, label: 'C' },
				{ id: 'n4', pos: { x: 0, y: 1 }, label: 'D' }
			],
			arrows: []
		}
		expect(normalize(diagram)).toEqual(normalized_diagram)
	})

	it('should normalize a long arrow in x-direction', () => {
		const diagram: Diagram = {
			nodes: [
				{ id: 'n1', pos: { x: 0, y: 0 }, label: 'A' },
				{ id: 'n2', pos: { x: 5, y: 0 }, label: 'B' }
			],
			arrows: [
				{
					id: 'a1',
					start: { x: 0, y: 0 },
					end: { x: 5, y: 0 },
					label_above: 'f',
					label_below: ''
				}
			]
		}
		const normalized_diagram: Diagram = {
			nodes: [
				{ id: 'n1', pos: { x: 0, y: 0 }, label: 'A' },
				{ id: 'n2', pos: { x: 1, y: 0 }, label: 'B' }
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
		expect(normalize(diagram)).toEqual(normalized_diagram)
	})

	it('should preserve normalized diagrams', () => {
		const normalized_diagram: Diagram = {
			nodes: [
				{ id: 'n1', pos: { x: 0, y: 0 }, label: 'A' },
				{ id: 'n2', pos: { x: 1, y: 0 }, label: 'B' },
				{ id: 'n3', pos: { x: 0, y: 1 }, label: 'C' }
			],
			arrows: [
				{
					id: 'a1',
					start: { x: 0, y: 0 },
					end: { x: 1, y: 0 },
					label_above: '',
					label_below: ''
				},
				{
					id: 'a2',
					start: { x: 0, y: 0 },
					end: { x: 0, y: 1 },
					label_above: '',
					label_below: ''
				}
			]
		}

		expect(normalize(normalized_diagram)).toEqual(normalized_diagram)
	})

	it('should normalize a rectangle of arrows', () => {
		const diagram: Diagram = {
			nodes: [
				{ id: 'n1', pos: { x: 0, y: 0 }, label: 'A' },
				{ id: 'n2', pos: { x: 5, y: 0 }, label: 'B' },
				{ id: 'n3', pos: { x: 5, y: 7 }, label: 'C' },
				{ id: 'n4', pos: { x: 0, y: 7 }, label: 'D' }
			],
			arrows: [
				{
					id: 'a1',
					start: { x: 0, y: 0 },
					end: { x: 5, y: 0 },
					label_above: '',
					label_below: ''
				},
				{
					id: 'a2',
					start: { x: 5, y: 0 },
					end: { x: 5, y: 7 },
					label_above: '',
					label_below: ''
				},
				{
					id: 'a3',
					end: { x: 0, y: 0 },
					start: { x: 0, y: 7 },
					label_above: '',
					label_below: ''
				},
				{
					id: 'a4',
					end: { x: 0, y: 7 },
					start: { x: 5, y: 7 },
					label_above: '',
					label_below: ''
				}
			]
		}
		const normalized_diagram: Diagram = {
			nodes: [
				{ id: 'n1', pos: { x: 0, y: 0 }, label: 'A' },
				{ id: 'n2', pos: { x: 1, y: 0 }, label: 'B' },
				{ id: 'n3', pos: { x: 1, y: 1 }, label: 'C' },
				{ id: 'n4', pos: { x: 0, y: 1 }, label: 'D' }
			],
			arrows: [
				{
					id: 'a1',
					start: { x: 0, y: 0 },
					end: { x: 1, y: 0 },
					label_above: '',
					label_below: ''
				},
				{
					id: 'a2',
					start: { x: 1, y: 0 },
					end: { x: 1, y: 1 },
					label_above: '',
					label_below: ''
				},
				{
					id: 'a3',
					end: { x: 0, y: 0 },
					start: { x: 0, y: 1 },
					label_above: '',
					label_below: ''
				},
				{
					id: 'a4',
					end: { x: 0, y: 1 },
					start: { x: 1, y: 1 },
					label_above: '',
					label_below: ''
				}
			]
		}
		expect(normalize(diagram)).toEqual(normalized_diagram)
	})

	it('should normalize a triangle of long arrows, regardless of position', () => {
		const diagram: Diagram = {
			nodes: [
				{ id: 'n1', pos: { x: 4, y: 2 }, label: 'A' },
				{ id: 'n2', pos: { x: 8, y: 2 }, label: 'B' },
				{ id: 'n3', pos: { x: 5, y: 10 }, label: 'C' }
			],
			arrows: [
				{
					id: 'a1',
					start: { x: 4, y: 2 },
					end: { x: 8, y: 2 },
					label_above: 'f',
					label_below: ''
				},
				{
					id: 'a2',
					start: { x: 4, y: 2 },
					end: { x: 5, y: 10 },
					label_above: 'g',
					label_below: ''
				},
				{
					id: 'a3',
					start: { x: 5, y: 10 },
					end: { x: 8, y: 2 },
					label_above: 'h',
					label_below: ''
				}
			]
		}
		const normalized_diagram: Diagram = {
			nodes: [
				{ id: 'n1', pos: { x: 4, y: 2 }, label: 'A' },
				{ id: 'n2', pos: { x: 6, y: 2 }, label: 'B' },
				{ id: 'n3', pos: { x: 5, y: 3 }, label: 'C' }
			],
			arrows: [
				{
					id: 'a1',
					start: { x: 4, y: 2 },
					end: { x: 6, y: 2 },
					label_above: 'f',
					label_below: ''
				},
				{
					id: 'a2',
					start: { x: 4, y: 2 },
					end: { x: 5, y: 3 },
					label_above: 'g',
					label_below: ''
				},
				{
					id: 'a3',
					start: { x: 5, y: 3 },
					end: { x: 6, y: 2 },
					label_above: 'h',
					label_below: ''
				}
			]
		}
		expect(normalize(diagram)).toEqual(normalized_diagram)
	})
})
