import { browser } from '$app/environment'

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

export const is_desktop = browser && window.matchMedia('(hover: hover)').matches
