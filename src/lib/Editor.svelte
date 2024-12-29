<script lang="ts">
	import ArrowComponent from './Arrow.svelte'
	import { tile_size } from './constants'
	import Label from './Label.svelte'
	import NodeComponent from './Node.svelte'
	import Positioner from './Positioner.svelte'
	import type { StepIndex } from './step.config'
	import type { Arrow, Coord, Node } from './types'

	type Props = {
		nodes: Node[]
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

	let next_arrow_start = $state<Coord | null>(null)

	$effect(() => {
		window.addEventListener('keydown', handle_keydown)
		return () => {
			window.removeEventListener('keydown', handle_keydown)
		}
	})

	function handle_keydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			next_arrow_start = null
		}
	}

	function toggle_node(x: number, y: number) {
		const existing_node = nodes.find(
			(node) => node.pos.x == x && node.pos.y == y
		)
		if (existing_node) {
			nodes = nodes.filter((node) => node != existing_node)
		} else {
			const new_node = {
				pos: { x, y },
				label: ''
			}
			nodes.push(new_node)
		}
	}

	function create_arrow(x: number, y: number) {
		if (!next_arrow_start) {
			next_arrow_start = { x, y }
			return
		}

		if (next_arrow_start.x == x && next_arrow_start.y == y) {
			next_arrow_start = null
			return
		}

		const id = crypto.randomUUID()

		const new_arrow = {
			id,
			start: next_arrow_start,
			end: { x, y },
			label_above: '',
			label_below: ''
		}
		arrows.push(new_arrow)

		next_arrow_start = null
	}

	function remove_arrow(id: string) {
		arrows = arrows.filter((arrow) => arrow.id != id)
	}

	function handle_node_click(x: number, y: number) {
		if (step === 1) {
			toggle_node(x, y)
		} else if (step === 2) {
			create_arrow(x, y)
		}
	}
</script>

{#if step === 1 || step === 2}
	{#each { length: grid_rows + 1 } as _, y}
		{#each { length: grid_cols + 1 } as _, x}
			{@const selected = nodes.some(
				(node) => node.pos.x == x && node.pos.y == y
			)}
			<Positioner x={x * tile_size} y={y * tile_size}>
				<NodeComponent
					aria_label="node at {x}, {y}"
					handle_click={() => handle_node_click(x, y)}
					{selected}
				/>
			</Positioner>
		{/each}
	{/each}
{/if}

{#if step >= 3}
	{#each nodes as node}
		<Positioner x={node.pos.x * tile_size} y={node.pos.y * tile_size}>
			<Label
				aria_label="label for node at {node.pos.x}, {node.pos.y}"
				size="large"
				bind:label={node.label}
				editable={step === 3}
			></Label>
		</Positioner>
	{/each}
{/if}

{#if step >= 2}
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
{/if}

{#if step === 2 && next_arrow_start}
	<ArrowComponent
		start={{
			x: next_arrow_start.x * tile_size,
			y: next_arrow_start.y * tile_size
		}}
		end={mouse_pos}
		removable={false}
		labellable={false}
		label_above=""
		label_below=""
		show_labels={false}
	/>
{/if}
