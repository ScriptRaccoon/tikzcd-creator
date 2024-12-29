import { z } from 'zod'

export const CoordSchema = z.object({
	x: z.number(),
	y: z.number()
})

export const NodeSchema = z.object({
	id: z.string(),
	pos: CoordSchema,
	label: z.string()
})

export const ArrowSchema = z.object({
	id: z.string(),
	start: CoordSchema,
	end: CoordSchema,
	label_above: z.string(),
	label_below: z.string()
})

export const DiagramSchema = z.object({
	nodes: z.array(NodeSchema),
	arrows: z.array(ArrowSchema)
})
