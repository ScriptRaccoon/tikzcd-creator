<script lang="ts">
	import type { StepIndex } from '../step.config'
	import type { Coord, Diagram } from '../types'
	import { tile_size } from '../constants'
	import { agree } from '../utils'

	import ArrowComponent from './Arrow.svelte'
	import Label from './Label.svelte'
	import NodeComponent from './Node.svelte'
	import Positioner from './Positioner.svelte'

	type Props = {
		diagram: Diagram
		step: StepIndex
		grid_cols: number
		grid_rows: number
		mouse_pos: Coord
	}

	let {
		diagram = $bindable(),
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

	function toggle_node(pos: Coord) {
		const existing_node = diagram.nodes.find((node) => agree(node.pos, pos))
		if (existing_node) {
			diagram.nodes = diagram.nodes.filter((node) => node != existing_node)
		} else {
			const new_node = {
				pos,
				label: ''
			}
			diagram.nodes.push(new_node)
		}
	}

	function create_arrow(pos: Coord) {
		if (!next_arrow_start) {
			next_arrow_start = pos
			return
		}

		if (agree(next_arrow_start, pos)) {
			next_arrow_start = null
			return
		}

		const id = crypto.randomUUID()

		const new_arrow = {
			id,
			start: next_arrow_start,
			end: pos,
			label_above: '',
			label_below: ''
		}
		diagram.arrows.push(new_arrow)

		next_arrow_start = null
	}

	function remove_arrow(id: string) {
		diagram.arrows = diagram.arrows.filter((arrow) => arrow.id != id)
	}

	function handle_node_click(pos: Coord) {
		if (step === 1) {
			toggle_node(pos)
		} else if (step === 2) {
			create_arrow(pos)
		}
	}
</script>

{#if step === 1 || step === 2}
	{#each { length: grid_rows + 1 } as _, y}
		{#each { length: grid_cols + 1 } as _, x}
			{@const selected = diagram.nodes.some((node) =>
				agree(node.pos, { x, y })
			)}
			<Positioner x={x * tile_size} y={y * tile_size}>
				<NodeComponent
					aria_label="node at {x}, {y}"
					handle_click={() => handle_node_click({ x, y })}
					{selected}
				/>
			</Positioner>
		{/each}
	{/each}
{/if}

{#if step >= 2}
	{#each diagram.arrows as arrow (arrow.id)}
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

{#if step >= 3}
	{#each diagram.nodes as node}
		<Positioner x={node.pos.x * tile_size} y={node.pos.y * tile_size}>
			<Label
				aria_label="label for node at {node.pos.x}, {node.pos.y}"
				size="large"
				bind:label={node.label}
				editable={step === 3}
				variant="normal"
			></Label>
		</Positioner>
	{/each}
{/if}
