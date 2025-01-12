import type { StorageData } from './types'
import { StorageDataSchema } from './schemas'

const storage_key = 'data'

export function get_stored_data(
	window_width: number = window.innerWidth,
): StorageData {
	const default_data = {
		diagram: { nodes: [], arrows: [] },
		step: 0,
		tile_size: window_width < 600 ? 50 : 100,
	}
	try {
		const data = localStorage.getItem(storage_key)
		if (!data) return default_data
		return StorageDataSchema.parse(JSON.parse(data))
	} catch (err) {
		console.error(err)
		return default_data
	}
}

export function save_data(data: StorageData) {
	try {
		localStorage.setItem(storage_key, JSON.stringify(data))
	} catch (err) {
		console.error(err)
	}
}
