import { browser } from '$app/environment'
import type { Diagram, StepIndex } from './types'

const storage_key = 'data'

type StorageData = {
	diagram: Diagram
	step: StepIndex
}

const default_data: StorageData = {
	diagram: { nodes: [], arrows: [] },
	step: 0
}

export function get_stored_data(): StorageData {
	if (!browser) return default_data

	try {
		const data = localStorage.getItem(storage_key)
		if (!data) return default_data
		return JSON.parse(data)
	} catch (err) {
		console.error(err)
		return default_data
	}
}

export function save_data(data: { diagram: Diagram; step: StepIndex }) {
	if (!browser) return

	try {
		localStorage.setItem(storage_key, JSON.stringify(data))
	} catch (err) {
		console.error(err)
	}
}
