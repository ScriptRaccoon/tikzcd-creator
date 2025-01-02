import { browser } from '$app/environment'

const get_tile_size = () => {
	if (!browser) return 100
	return window.innerWidth > 900 ? 100 : 50
}

export const tile_size = get_tile_size()
export const arrow_padding = 30
export const arrow_tip_size = 20
export const arrow_variants = [
	'rightarrow',
	'dashed',
	'Rightarrow',
	'dash',
	'equal'
] as const

export const arrow_codes = {
	rightarrow: '\\to',
	dashed: '\\dashrightarrow',
	Rightarrow: '\\Rightarrow',
	dash: '-',
	equal: '='
} as const
