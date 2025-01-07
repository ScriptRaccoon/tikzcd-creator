<script lang="ts">
	import { is_desktop } from '$lib/constants'
	import type { Coord, Diagram, Arrow, StepIndex } from '$lib/types'
	import { agree } from '$lib/utils'

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
		tile_size: number
	}

	let {
		diagram = $bindable(),
		step,
		grid_cols,
		grid_rows,
		mouse_pos,
		tile_size,
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
			const id = crypto.randomUUID()
			const new_node = {
				id,
				pos,
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

		const new_arrow: Arrow = {
			id,
			variant: 'rightarrow',
			start: next_arrow_start,
			end: pos,
		}
		diagram.arrows.push(new_arrow)

		next_arrow_start = null
	}

	function remove_arrow(arrow: Arrow) {
		diagram.arrows = diagram.arrows.filter((_arrow) => _arrow != arrow)
	}

	function handle_node_click(pos: Coord) {
		if (step === 1) {
			toggle_node(pos)
		} else if (step === 2) {
			create_arrow(pos)
		}
	}
</script>

{#if step === 1 || step === 2 || step === 3}
	{#each { length: grid_rows + 1 } as _, y}
		{#each { length: grid_cols + 1 } as _, x}
			{@const selected = diagram.nodes.some((node) =>
				agree(node.pos, { x, y }),
			)}
			<Positioner x={x * tile_size} y={y * tile_size}>
				<NodeComponent
					aria_label="node at {x}, {y}, {selected ? 'selected' : 'unselected'}"
					handle_click={() => handle_node_click({ x, y })}
					{selected}
					interactive={step <= 2}
					starting={next_arrow_start != null &&
						agree({ x, y }, next_arrow_start)}
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
				y: arrow.start.y * tile_size,
			}}
			end={{
				x: arrow.end.x * tile_size,
				y: arrow.end.y * tile_size,
			}}
			handle_remove={() => remove_arrow(arrow)}
			removable={step === 2}
			bind:variant={arrow.variant}
			variantable={step === 3}
		></ArrowComponent>
	{/each}
{/if}

{#if is_desktop && step === 2 && next_arrow_start}
	<ArrowComponent
		start={{
			x: next_arrow_start.x * tile_size,
			y: next_arrow_start.y * tile_size,
		}}
		end={mouse_pos}
		removable={false}
		variant={'rightarrow'}
		variantable={false}
	/>
{/if}

{#if step >= 4}
	{#each diagram.nodes as node (node.id)}
		<Positioner x={node.pos.x * tile_size} y={node.pos.y * tile_size}>
			<Label
				id={`node-label-${node.id}`}
				aria_label="label for node at {node.pos.x}, {node.pos.y}"
				size="large"
				bind:label={node.label}
				editable={step === 4}
				variant="normal"
			></Label>
		</Positioner>
	{/each}
{/if}

{#if step >= 5}
	{#each diagram.arrows as arrow (arrow.id)}
		{@const angle_deg =
			Math.atan2(arrow.end.y - arrow.start.y, arrow.end.x - arrow.start.x) *
			(180 / Math.PI)}
		<Positioner
			x={0.5 * tile_size * (arrow.start.x + arrow.end.x)}
			y={0.5 * tile_size * (arrow.start.y + arrow.end.y)}
		>
			<div class="arrow_labels" style:--angle-deg="{angle_deg}deg">
				<div class="rotation-correction">
					<Label
						id={`arrow-label-above-${arrow.id}`}
						aria_label="Create label above the arrow"
						size="small"
						editable={step === 5}
						bind:label={arrow.label_above}
						variant="accent"
					/>
				</div>
				<div class="rotation-correction">
					<Label
						id={`arrow-label-below-${arrow.id}`}
						aria_label="Create label below the arrow"
						size="small"
						editable={step === 5}
						bind:label={arrow.label_below}
						variant="accent"
					/>
				</div>
			</div>
		</Positioner>
	{/each}
{/if}

<style>
	.arrow_labels {
		rotate: var(--angle-deg);
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.rotation-correction {
		rotate: calc(-1 * var(--angle-deg));
	}
</style>
