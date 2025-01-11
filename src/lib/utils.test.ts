import { agree, deduplicate, repeat_string } from './utils'

describe('agree', () => {
	it('returns `true` for {x:2,y:3} and {x:2,y:3}', () => {
		expect(agree({ x: 2, y: 3 }, { x: 2, y: 3 })).toBe(true)
	})

	it('returns `false` for {x:2,y:3} and {x:2,y:2}', () => {
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
