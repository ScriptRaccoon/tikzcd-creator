import { DiagramSchema } from './schemas'
import type { Diagram } from './types'

export function encode(obj: unknown): string {
	return btoa(JSON.stringify(obj))
}

export function decode(str: string): unknown {
	try {
		return JSON.parse(atob(str))
	} catch {
		return null
	}
}

export function encode_diagram(diagram: Diagram): string {
	return encode(diagram)
}

export function decode_diagram(str: string): Diagram | null {
	const { data } = DiagramSchema.safeParse(decode(str))
	return data ?? null
}
