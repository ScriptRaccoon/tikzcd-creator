import { agree, deduplicate, render_latex, repeat_string } from './utils'

describe('render_latex', () => {
	afterEach(() => {
		delete window.MathJax
	})

	const tex2svg = (input: string) => {
		const span = document.createElement('span')
		span.className = 'math'
		span.textContent = input
		span.setAttribute('tabindex', '0')
		return span
	}

	it('renders "a = b" with mocked MathJax', () => {
		window.MathJax = { tex2svg }
		expect(render_latex('a = b')).toBe('<span class="math">a = b</span>')
	})

	it('returns an empty string if MathJax is not defined', () => {
		expect(render_latex('a = b')).toBe('')
	})
})

describe('agree', () => {
	it('returns "true" for {x:2,y:3} and {x:2,y:3}', () => {
		expect(agree({ x: 2, y: 3 }, { x: 2, y: 3 })).toBe(true)
	})

	it('returns "false" for {x:2,y:3} and {x:2,y:2}', () => {
		expect(agree({ x: 2, y: 3 }, { x: 2, y: 2 })).toBe(false)
	})
})

describe('repeat_string', () => {
	it("returns 'x'", () => {
		expect(repeat_string('y', 1)).toBe('y')
	})

	it("returns 'aaaa'", () => {
		expect(repeat_string('a', 4)).toBe('aaaa')
	})

	it('returns the empty string', () => {
		expect(repeat_string('a', 0)).toBe('')
		expect(repeat_string('a', -1)).toBe('')
	})
})

describe('deduplicate', () => {
	it('removes duplicates', () => {
		expect(deduplicate([5, 6, 2, 2, 6])).toEqual([5, 6, 2])
	})

	it('does not change arrays without duplicates', () => {
		expect(deduplicate([5, 6, 2])).toEqual([5, 6, 2])
	})
})
