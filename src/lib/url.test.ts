import type { StorageData } from './types'
import { generate_URL, get_data_from_URL } from './url'

describe('generate_URL', () => {
	it('generates a URL with a diagram, a step and a tile size', () => {
		vi.spyOn(window, 'location', 'get').mockReturnValueOnce({
			...window.location,
			href: 'http://example.com/',
		})

		const data: StorageData = {
			diagram: {
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
			},
			step: 1,
			tile_size: 32,
		}
		const url = generate_URL(data)
		const expected_url =
			'http://example.com/?d=' +
			'eyJub2RlcyI6W3siaWQiOiJuMSIsImxhYmVsIjoiQSIsInBvcy' +
			'I6eyJ4IjowLCJ5IjowfX0seyJpZCI6Im4yIiwibGFiZWwiOiJC' +
			'IiwicG9zIjp7IngiOjEsInkiOjB9fSx7ImlkIjoibjMiLCJsYW' +
			'JlbCI6IkMiLCJwb3MiOnsieCI6MCwieSI6MX19LHsiaWQiOiJu' +
			'NCIsImxhYmVsIjoiRCIsInBvcyI6eyJ4IjoxLCJ5IjoxfX1dLC' +
			'JhcnJvd3MiOlt7ImlkIjoiYTEiLCJ2YXJpYW50IjoicmlnaHRh' +
			'cnJvdyIsInN0YXJ0Ijp7IngiOjAsInkiOjB9LCJlbmQiOnsieC' +
			'I6MSwieSI6MH0sImxhYmVsX2Fib3ZlIjoiYSJ9LHsiaWQiOiJh' +
			'MiIsInZhcmlhbnQiOiJyaWdodGFycm93Iiwic3RhcnQiOnsieC' +
			'I6MSwieSI6MH0sImVuZCI6eyJ4IjoxLCJ5IjoxfSwibGFiZWxf' +
			'YWJvdmUiOiJiIn0seyJpZCI6ImEzIiwidmFyaWFudCI6InJpZ2' +
			'h0YXJyb3ciLCJzdGFydCI6eyJ4IjowLCJ5IjowfSwiZW5kIjp7' +
			'IngiOjAsInkiOjF9LCJsYWJlbF9iZWxvdyI6ImMifSx7ImlkIj' +
			'oiYTQiLCJ2YXJpYW50IjoicmlnaHRhcnJvdyIsInN0YXJ0Ijp7' +
			'IngiOjAsInkiOjF9LCJlbmQiOnsieCI6MSwieSI6MX0sImxhYm' +
			'VsX2JlbG93IjoiZCJ9XX0%3D' +
			'&s=1' +
			'&t=32'
		expect(url).toBe(expected_url)
	})
})

describe('get_data_from_URL', () => {
	const sample_diagram_string =
		'eyJub2RlcyI6W3siaWQiOiI1ZTVhNzcwMC1jYzNhLTQxYTctYjhiZS0yMG' +
		'NmYTNjNmM5MDAiLCJwb3MiOnsieCI6MiwieSI6OX0sImxhYmVsIjoiQSJ9' +
		'LHsiaWQiOiI5Y2FlMWMwNC0wMzEyLTQwNGQtODQ1ZC02YmRkOGNhYjg1OG' +
		'IiLCJwb3MiOnsieCI6NCwieSI6OX0sImxhYmVsIjoiQiJ9XSwiYXJyb3dz' +
		'IjpbeyJpZCI6IjI0ZTNkNGZiLTRiYzktNDQ1NC1hYmNiLWIyODlhZTMwNz' +
		'dkNCIsInZhcmlhbnQiOiJkYXNoZWQiLCJzdGFydCI6eyJ4IjoyLCJ5Ijo5' +
		'fSwiZW5kIjp7IngiOjQsInkiOjl9LCJsYWJlbF9hYm92ZSI6ImYifV19'

	it("returns null if the URL doesn't have any parameter", () => {
		vi.spyOn(window, 'location', 'get').mockReturnValueOnce({
			...window.location,
			href: 'http://example.com',
		})
		const data = get_data_from_URL()
		expect(data).toBeNull()
	})

	it("returns null if the URL doesn't have the d-parameter", () => {
		vi.spyOn(window, 'location', 'get').mockReturnValueOnce({
			...window.location,
			href: 'http://example.com?s=1&t=100',
		})
		const data = get_data_from_URL()
		expect(data).toBeNull()
	})

	it("returns null if the URL doesn't have the s-parameter", () => {
		vi.spyOn(window, 'location', 'get').mockReturnValueOnce({
			...window.location,
			href: 'http://example.com?d=abc&t=100',
		})
		const data = get_data_from_URL()
		expect(data).toBeNull()
	})

	it("returns null if the URL doesn't have the t-parameter", () => {
		vi.spyOn(window, 'location', 'get').mockReturnValueOnce({
			...window.location,
			href: 'http://example.com?d=abc&s=1',
		})
		const data = get_data_from_URL()
		expect(data).toBeNull()
	})

	it('returns null if the diagram is invalid', () => {
		vi.spyOn(window, 'location', 'get').mockReturnValueOnce({
			...window.location,
			href: 'http://example.com?d=invalid&s=1&t=100',
		})
		const data = get_data_from_URL()
		expect(data).toBeNull()
	})

	it('returns null if the step is invalid', () => {
		vi.spyOn(window, 'location', 'get').mockReturnValueOnce({
			...window.location,
			href: `http://example.com?d=${sample_diagram_string}&s=invalid&t=100`,
		})
		const data = get_data_from_URL()
		expect(data).toBeNull()
	})

	it('returns null if the step is too big', () => {
		vi.spyOn(window, 'location', 'get').mockReturnValueOnce({
			...window.location,
			href: `http://example.com?d=${sample_diagram_string}&s=100&t=100`,
		})
		const data = get_data_from_URL()
		expect(data).toBeNull()
	})

	it('returns null if the step is too small', () => {
		vi.spyOn(window, 'location', 'get').mockReturnValueOnce({
			...window.location,
			href: `http://example.com?d=${sample_diagram_string}&s=-1&t=100`,
		})
		const data = get_data_from_URL()
		expect(data).toBeNull()
	})

	it('returns null if the tile size is invalid', () => {
		vi.spyOn(window, 'location', 'get').mockReturnValueOnce({
			...window.location,
			href: `http://example.com?d=${sample_diagram_string}&s=1&t=invalid`,
		})
		const data = get_data_from_URL()
		expect(data).toBeNull()
	})

	it('returns the data from the URL if it is valid', () => {
		vi.spyOn(window, 'location', 'get').mockReturnValueOnce({
			...window.location,
			href: `http://example.com?d=${sample_diagram_string}&s=1&t=32`,
		})
		const expected_data = {
			diagram: {
				nodes: [
					{
						id: '5e5a7700-cc3a-41a7-b8be-20cfa3c6c900',
						pos: { x: 2, y: 9 },
						label: 'A',
					},
					{
						id: '9cae1c04-0312-404d-845d-6bdd8cab858b',
						pos: { x: 4, y: 9 },
						label: 'B',
					},
				],
				arrows: [
					{
						id: '24e3d4fb-4bc9-4454-abcb-b289ae3077d4',
						start: { x: 2, y: 9 },
						end: { x: 4, y: 9 },
						variant: 'dashed',
						label_above: 'f',
					},
				],
			},
			step: 1,
			tile_size: 32,
		}

		const data = get_data_from_URL()
		expect(data).toEqual(expected_data)
	})
})
