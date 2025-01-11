import { arrow_codes, arrow_variants } from './constants'

describe('constants', () => {
	it('provides arrow codes for every arrow variant', () => {
		expect(Object.keys(arrow_codes)).toEqual(arrow_variants)
	})
})
