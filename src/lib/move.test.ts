import type { Diagram } from './types'
import { move_diagram } from './move'

let sample_diagram: Diagram

beforeEach(() => {
	sample_diagram = {
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
})

describe('move_diagram', () => {
	it('moves a diagram to the left', () => {
		const expected_diagram: Diagram = {
			nodes: [
				{ id: 'n1', label: 'A', pos: { x: -1, y: 0 } },
				{ id: 'n2', label: 'B', pos: { x: 0, y: 0 } },
				{ id: 'n3', label: 'C', pos: { x: -1, y: 1 } },
				{ id: 'n4', label: 'D', pos: { x: 0, y: 1 } },
			],
			arrows: [
				{
					id: 'a1',
					variant: 'rightarrow',
					start: { x: -1, y: 0 },
					end: { x: 0, y: 0 },
					label_above: 'a',
				},
				{
					id: 'a2',
					variant: 'rightarrow',
					start: { x: 0, y: 0 },
					end: { x: 0, y: 1 },
					label_above: 'b',
				},
				{
					id: 'a3',
					variant: 'rightarrow',
					start: { x: -1, y: 0 },
					end: { x: -1, y: 1 },
					label_below: 'c',
				},
				{
					id: 'a4',
					variant: 'rightarrow',
					start: { x: -1, y: 1 },
					end: { x: 0, y: 1 },
					label_below: 'd',
				},
			],
		}

		move_diagram(sample_diagram, 'x', -1)
		expect(sample_diagram).toEqual(expected_diagram)
	})
})

describe('move_right', () => {
	it('moves a diagram to the right', () => {
		const expected_diagram: Diagram = {
			nodes: [
				{ id: 'n1', label: 'A', pos: { x: 1, y: 0 } },
				{ id: 'n2', label: 'B', pos: { x: 2, y: 0 } },
				{ id: 'n3', label: 'C', pos: { x: 1, y: 1 } },
				{ id: 'n4', label: 'D', pos: { x: 2, y: 1 } },
			],
			arrows: [
				{
					id: 'a1',
					variant: 'rightarrow',
					start: { x: 1, y: 0 },
					end: { x: 2, y: 0 },
					label_above: 'a',
				},
				{
					id: 'a2',
					variant: 'rightarrow',
					start: { x: 2, y: 0 },
					end: { x: 2, y: 1 },
					label_above: 'b',
				},
				{
					id: 'a3',
					variant: 'rightarrow',

					start: { x: 1, y: 0 },
					end: { x: 1, y: 1 },
					label_below: 'c',
				},
				{
					id: 'a4',
					variant: 'rightarrow',
					start: { x: 1, y: 1 },
					end: { x: 2, y: 1 },
					label_below: 'd',
				},
			],
		}

		move_diagram(sample_diagram, 'x', 1)
		expect(sample_diagram).toEqual(expected_diagram)
	})
})

describe('move_up', () => {
	it('moves a diagram upwards', () => {
		const expected_diagram: Diagram = {
			nodes: [
				{ id: 'n1', label: 'A', pos: { x: 0, y: -1 } },
				{ id: 'n2', label: 'B', pos: { x: 1, y: -1 } },
				{ id: 'n3', label: 'C', pos: { x: 0, y: 0 } },
				{ id: 'n4', label: 'D', pos: { x: 1, y: 0 } },
			],
			arrows: [
				{
					id: 'a1',
					variant: 'rightarrow',
					start: { x: 0, y: -1 },
					end: { x: 1, y: -1 },
					label_above: 'a',
				},
				{
					id: 'a2',
					variant: 'rightarrow',
					start: { x: 1, y: -1 },
					end: { x: 1, y: 0 },
					label_above: 'b',
				},
				{
					id: 'a3',
					variant: 'rightarrow',
					start: { x: 0, y: -1 },
					end: { x: 0, y: 0 },
					label_below: 'c',
				},
				{
					id: 'a4',
					variant: 'rightarrow',
					start: { x: 0, y: 0 },
					end: { x: 1, y: 0 },
					label_below: 'd',
				},
			],
		}

		move_diagram(sample_diagram, 'y', -1)
		expect(sample_diagram).toEqual(expected_diagram)
	})
})

describe('move_down', () => {
	it('moves a diagram down', () => {
		const expected_diagram: Diagram = {
			nodes: [
				{ id: 'n1', label: 'A', pos: { x: 0, y: 1 } },
				{ id: 'n2', label: 'B', pos: { x: 1, y: 1 } },
				{ id: 'n3', label: 'C', pos: { x: 0, y: 2 } },
				{ id: 'n4', label: 'D', pos: { x: 1, y: 2 } },
			],
			arrows: [
				{
					id: 'a1',
					variant: 'rightarrow',
					start: { x: 0, y: 1 },
					end: { x: 1, y: 1 },
					label_above: 'a',
				},
				{
					id: 'a2',
					variant: 'rightarrow',
					start: { x: 1, y: 1 },
					end: { x: 1, y: 2 },
					label_above: 'b',
				},
				{
					id: 'a3',
					variant: 'rightarrow',
					start: { x: 0, y: 1 },
					end: { x: 0, y: 2 },
					label_below: 'c',
				},
				{
					id: 'a4',
					variant: 'rightarrow',
					start: { x: 0, y: 2 },
					end: { x: 1, y: 2 },
					label_below: 'd',
				},
			],
		}

		move_diagram(sample_diagram, 'y', 1)
		expect(sample_diagram).toEqual(expected_diagram)
	})
})
