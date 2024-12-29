import { z } from 'zod'

import type {
	ArrowSchema,
	CoordSchema,
	DiagramSchema,
	NodeSchema,
	StepSchema
} from './schemas'

export type Coord = z.infer<typeof CoordSchema>
export type Node = z.infer<typeof NodeSchema>
export type Arrow = z.infer<typeof ArrowSchema>
export type Diagram = z.infer<typeof DiagramSchema>
export type StepIndex = z.infer<typeof StepSchema>
