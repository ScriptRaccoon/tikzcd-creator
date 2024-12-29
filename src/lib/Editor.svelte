<script lang="ts">
	import ArrowComponent from './Arrow.svelte'
	import { tile_size } from './constants'
	import Node from './Node.svelte'
	import type { StepIndex } from './step.config'
	import type { Arrow, Coord } from './types'
	import { noop } from './utils'

	type Props = {
		nodes: Coord[]
		arrows: Arrow[]
		step: StepIndex
		grid_cols: number
		grid_rows: number
		mouse_pos: Coord
	}

	let {
		nodes = $bindable(),
		arrows = $bindable(),
		step,
		grid_cols,
		grid_rows,
		mouse_pos
	}: Props = $props()

	let label_coord = $state<Coord | null>(null)

	let start_coord = $state<Coord | null>(null)

	let grid_element = $state<HTMLElement | null>(null)

	$effect(() => {
		window.addEventListener('keydown', handle_keydown)
		return () => {
			window.removeEventListener('keydown', handle_keydown)
		}
	})

	function handle_keydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			if (start_coord) start_coord = null
			if (label_coord) label_coord = null
		}
	}

	function toggle_node(x: number, y: number) {
		const existing_node = nodes.find((node) => node.x == x && node.y == y)
		if (existing_node) {
			nodes = nodes.filter((node) => node != existing_node)
		} else {
			nodes.push({ x, y })
		}
	}

	function create_arrow(x: number, y: number) {
		if (start_coord) {
			if (start_coord.x !== x || start_coord.y !== y) {
				const id = crypto.randomUUID()
				const arrow = {
					id,
					start: start_coord,
					end: { x, y },
					label_above: '',
					label_below: ''
				}
				arrows.push(arrow)
				start_coord = null
			} else {
				start_coord = null
			}
		} else {
			start_coord = { x, y }
		}
	}

	function create_label(x: number, y: number) {
		if (label_coord && label_coord.x == x && label_coord.y === y) {
			label_coord = null
		} else {
			label_coord = { x, y }
		}
	}

	const node_click_actions = {
		0: noop,
		1: toggle_node,
		2: create_arrow,
		3: create_label,
		4: noop,
		5: noop
	} as const

	function handle_node_click(x: number, y: number) {
		node_click_actions[step](x, y)
	}

	function remove_arrow(id: string) {
		arrows = arrows.filter((arrow) => arrow.id != id)
	}
</script>

{#each { length: grid_rows + 1 } as _, y}
	{#each { length: grid_cols + 1 } as _, x}
		{@const selected = nodes.some((node) => node.x == x && node.y == y)}
		<Node
			x={x * tile_size + 1}
			y={y * tile_size + 1}
			aria_label="node at {x}, {y}"
			handle_click={() => handle_node_click(x, y)}
			{selected}
			hoverable={[1, 2, 3].includes(step)}
			clickable={[1, 2, 3].includes(step)}
		/>
	{/each}
{/each}

{#each arrows as arrow (arrow.id)}
	<ArrowComponent
		start={{
			x: arrow.start.x * tile_size,
			y: arrow.start.y * tile_size
		}}
		end={{
			x: arrow.end.x * tile_size,
			y: arrow.end.y * tile_size
		}}
		handle_remove={() => remove_arrow(arrow.id)}
		removable={step === 2}
		labellable={step === 4}
		bind:label_above={arrow.label_above}
		bind:label_below={arrow.label_below}
		show_labels={step >= 4}
	></ArrowComponent>
{/each}

{#if step === 2 && start_coord && grid_element}
	<ArrowComponent
		start={{
			x: start_coord.x * tile_size,
			y: start_coord.y * tile_size
		}}
		end={mouse_pos}
		removable={false}
		labellable={false}
		label_above=""
		label_below=""
		show_labels={false}
	/>
{/if}
