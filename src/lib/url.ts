import { decode_diagram, encode_diagram } from './encoding'
import { STEPS } from './step.config'
import type { StorageData } from './types'

export function generate_URL(data: StorageData): string {
	const encoded_diagram = encode_diagram(data.diagram)

	const url = new URL(window.location.href)
	url.searchParams.set('d', encoded_diagram)
	url.searchParams.set('s', data.step.toString())
	url.searchParams.set('t', data.tile_size.toString())

	return url.toString()
}

export function get_data_from_URL(): StorageData | null {
	const url = new URL(window.location.href)
	const diagram_parameter = url.searchParams.get('d')
	const step_parameter = url.searchParams.get('s')
	const tile_size_parameter = url.searchParams.get('t')

	if (!diagram_parameter || !step_parameter || !tile_size_parameter) return null

	const diagram = decode_diagram(diagram_parameter)
	if (!diagram) return null

	const step = parseInt(step_parameter)
	if (Number.isNaN(step) || step < 0 || step >= STEPS.length) return null

	const tile_size = parseInt(tile_size_parameter)
	if (Number.isNaN(tile_size) || tile_size < 1) return null

	remove_params(url)

	return { diagram, step, tile_size }
}

export function remove_params(url: URL) {
	url.searchParams.delete('d')
	url.searchParams.delete('s')
	url.searchParams.delete('t')
	history.replaceState(null, '', url.toString())
	return url
}
