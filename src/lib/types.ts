export type Coord = { x: number; y: number }

export type Node = { pos: Coord; label: string }

export type Arrow = {
	id: string
	start: Coord
	end: Coord
	label_above: string
	label_below: string
}

export type Diagram = {
	nodes: Node[]
	arrows: Arrow[]
}
