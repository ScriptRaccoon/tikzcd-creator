import { describe, it, expect } from 'vitest'

import { encode, decode, encode_diagram, decode_diagram } from './encoding'
import type { Diagram } from './types'

describe('encode and decode for objects', () => {
	it('should recover the original object', () => {
		const obj = { a: 1, b: '2', c: true }
		const str = encode(obj)

		expect(decode(str)).toEqual(obj)
	})

	it('should encode to a string in base64', () => {
		const obj = { a: 1, b: '2', c: true }
		const str = encode(obj)

		expect(str).toBe('eyJhIjoxLCJiIjoiMiIsImMiOnRydWV9')
	})

	it('should encode different objects into different strings', () => {
		const obj1 = { a: 1, b: '2', c: true }
		const obj2 = { a: 2, b: '3', c: false }
		const str1 = encode(obj1)
		const str2 = encode(obj2)

		expect(str1).not.toEqual(str2)
	})

	it('should encode equal objects into the same string', () => {
		const obj1 = { a: 1, b: '2', c: true }
		const obj2 = { a: 1, b: '2', c: true }

		expect(obj1).not.toBe(obj2)
		expect(obj1).toEqual(obj2)

		const str1 = encode(obj1)
		const str2 = encode(obj2)

		expect(str1).toBe(str2)
	})

	it('should decode an invalid string to null', () => {
		const invalid_str = 'hi'
		const decoded = decode(invalid_str)

		expect(decoded).toEqual(null)
	})
})

describe('encode and decode for diagrams', () => {
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

	it('should recover the original diagram', () => {
		const encoded = encode_diagram(sample_diagram)
		expect(encoded).toBeTypeOf('string')

		const decoded = decode_diagram(encoded)
		expect(decoded).toEqual(sample_diagram)
	})

	it('should encode a diagram to a string in base64', () => {
		const expected =
			'eyJub2RlcyI6W3siaWQiOiJuMSIsImxhYmVsIjoiQSIsInBvcy' +
			'I6eyJ4IjowLCJ5IjowfX0seyJpZCI6Im4yIiwibGFiZWwiOiJC' +
			'IiwicG9zIjp7IngiOjEsInkiOjB9fV0sImFycm93cyI6W3siaW' +
			'QiOiJhMSIsInZhcmlhbnQiOiJSaWdodGFycm93Iiwic3RhcnQi' +
			'OnsieCI6MCwieSI6MH0sImVuZCI6eyJ4IjoxLCJ5IjowfSwibG' +
			'FiZWxfYWJvdmUiOiJmIn1dfQ=='
		const encoded = encode_diagram(sample_diagram)

		expect(encoded).toBe(expected)
	})

	it('should decode an invalid diagram to null', () => {
		const invalid_diagram = {
			nodez: [],
			arrowz: [],
		}
		// @ts-expect-error invalid diagram is not a diagram
		const encoded = encode_diagram(invalid_diagram)
		const decoded = decode_diagram(encoded)

		expect(decoded).toEqual(null)
	})
})
