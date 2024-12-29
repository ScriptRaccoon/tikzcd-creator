<script lang="ts">
	import ArrowComponent from './Arrow.svelte'
	import { tile_size } from './constants'
	import NodeComponent from './Node.svelte'
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
		if (next_arrow_start) {
			if (next_arrow_start.x !== x || next_arrow_start.y !== y) {
				const id = crypto.randomUUID()
				const arrow = {
					id,
					start: next_arrow_start,
					end: { x, y },
					label_above: '',
					label_below: ''
				}
				arrows.push(arrow)
				next_arrow_start = null
			} else {
				next_arrow_start = null
			}
		} else {
			next_arrow_start = { x, y }
		}
	}

	function handle_node_click(x: number, y: number) {
		if (step === 1) {
			toggle_node(x, y)
		} else if (step === 2) {
			create_arrow(x, y)
		}
	}

	function remove_arrow(id: string) {
		arrows = arrows.filter((arrow) => arrow.id != id)
	}
</script>

{#if step === 1 || step === 2}
	{#each { length: grid_rows + 1 } as _, y}
		{#each { length: grid_cols + 1 } as _, x}
			{@const selected = nodes.some(
				(node) => node.pos.x == x && node.pos.y == y
			)}
			<NodeComponent
				x={x * tile_size + 0.5}
				y={y * tile_size + 0.5}
				aria_label="node at {x}, {y}"
				handle_click={() => handle_node_click(x, y)}
				{selected}
			/>
		{/each}
	{/each}
{/if}

{#if step >= 2}
	{#each arrows as arrow (arrow.id)}
		<ArrowComponent
			start={{
				x: arrow.start.x * tile_size + 0.5,
				y: arrow.start.y * tile_size + 0.5
			}}
			end={{
				x: arrow.end.x * tile_size + 0.5,
				y: arrow.end.y * tile_size + 0.5
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
			x: next_arrow_start.x * tile_size + 0.5,
			y: next_arrow_start.y * tile_size + 0.5
		}}
		end={mouse_pos}
		removable={false}
		labellable={false}
		label_above=""
		label_below=""
		show_labels={false}
	/>
{/if}
