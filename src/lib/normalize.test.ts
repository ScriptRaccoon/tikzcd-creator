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
})
