import { get_stored_data, save_data } from './storage'
import type { StorageData } from './types'

const error_spy = vi.spyOn(console, 'error').mockImplementation(() => {})

const sample_data: StorageData = {
	diagram: {
		nodes: [{ id: 'n1', label: 'A', pos: { x: 0, y: 0 } }],
		arrows: [
			{
				id: 'a1',
				variant: 'rightarrow',
				start: { x: 0, y: 0 },
				end: { x: 1, y: 0 },
			},
		],
	},
	step: 1,
	tile_size: 100,
}

beforeAll(() => {
	localStorage.clear()
})

afterEach(() => {
	localStorage.clear()
	error_spy.mockClear()
})

describe('get_stored_data', () => {
	it('should return default data if localStorage is empty (desktop)', () => {
		const data = get_stored_data(1024)
		expect(data).toEqual({
			diagram: { nodes: [], arrows: [] },
			step: 0,
			tile_size: 100,
		})
	})

	it('should return default data if localStorage is empty (mobile)', () => {
		const data = get_stored_data(500)
		expect(data).toEqual({
			diagram: { nodes: [], arrows: [] },
			step: 0,
			tile_size: 50,
		})
	})

	it('should return default data if the stored data is invalid', () => {
		localStorage.setItem('data', 'invalid')
		const data = get_stored_data()
		expect(data).toEqual({
			diagram: { nodes: [], arrows: [] },
			step: 0,
			tile_size: 100,
		})
		expect(error_spy).toHaveBeenCalledWith(
			new SyntaxError(`Unexpected token 'i', "invalid" is not valid JSON`),
		)
	})

	it('should return parsed data from localStorage', () => {
		localStorage.setItem('data', JSON.stringify(sample_data))
		const data = get_stored_data()
		expect(data).toEqual(sample_data)
	})
})

describe('save_data', () => {
	it('should save data to localStorage', () => {
		save_data(sample_data)
		const expected_string = `{"diagram":{"nodes":[{"id":"n1","label":"A","pos":{"x":0,"y":0}}],"arrows":[{"id":"a1","variant":"rightarrow","start":{"x":0,"y":0},"end":{"x":1,"y":0}}]},"step":1,"tile_size":100}`
		expect(localStorage.getItem('data')).toBe(expected_string)
	})

	it('should not save anything when not possible', () => {
		vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
			throw new Error('storage is full')
		})
		save_data(sample_data)
		expect(localStorage.getItem('data')).toBeNull()
		expect(error_spy).toHaveBeenCalledWith(new Error('storage is full'))
	})
})
