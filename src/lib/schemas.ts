import { z } from 'zod'

import { STEPS } from './step.config'

export const CoordSchema = z.object({
	x: z.number(),
	y: z.number()
})

export const NodeSchema = z.object({
	id: z.string(),
	pos: CoordSchema,
	label: z.string().optional()
})

export const ArrowSchema = z.object({
	id: z.string(),
	start: CoordSchema,
	end: CoordSchema,
	variant: z.enum(['rightarrow', 'dashed', 'Rightarrow', 'equal']),
	label_above: z.string().optional(),
	label_below: z.string().optional()
})

export const DiagramSchema = z.object({
	nodes: z.array(NodeSchema),
	arrows: z.array(ArrowSchema)
})

export const StepIndexSchema = z
	.number()
	.int()
	.min(0)
	.max(STEPS.length - 1)

export const StorageDataSchema = z.object({
	diagram: DiagramSchema,
	step: z
		.number()
		.int()
		.min(0)
		.max(STEPS.length - 1)
})
