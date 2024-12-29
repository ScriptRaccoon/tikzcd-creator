import { browser } from '$app/environment'
import type { StorageData } from './types'
import { StorageDataSchema } from './schemas'

const storage_key = 'data'

const default_data: StorageData = {
	diagram: { nodes: [], arrows: [] },
	step: 0
}

export function get_stored_data(): StorageData {
	if (!browser) return default_data

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
	if (!browser) return

	try {
		localStorage.setItem(storage_key, JSON.stringify(data))
	} catch (err) {
		console.error(err)
	}
}
