<script lang="ts">
	import ArrowComponent from './Arrow.svelte'
	import Node from './Node.svelte'
	import type { StepIndex } from './step.config'
	import type { Arrow, Coord } from './types'
	import { noop } from './utils'
	import LabelInput from './LabelInput.svelte'

	const tile_size = 100

	type Props = {
		nodes: Coord[]
		arrows: Arrow[]
		node_labels: Record<string, string>
		step: StepIndex
	}

	let {
		nodes = $bindable(),
		arrows = $bindable(),
		node_labels = $bindable(),
		step
	}: Props = $props()

	let label_coord = $state<Coord | null>(null)

	const key = (coord: Coord) => `${coord.x}|${coord.y}`

	let grid_size = $state<{ x: number; y: number }>({ x: 1, y: 1 })
	const grid_padding = 25

	$effect(() => {
		grid_size.x = Math.floor((window.innerWidth - 2 * grid_padding) / tile_size)
		grid_size.y = Math.floor(
			(window.innerHeight - 2 * grid_padding) / tile_size
		)
	})

	let start_coord = $state<Coord | null>(null)

	let grid_element = $state<HTMLElement | null>(null)
	let mouse_pos = $state<{ x: number; y: number }>({ x: 0, y: 0 })

	$effect(() => {
		window.addEventListener('mousemove', update_mouse_pos)
		window.addEventListener('keydown', handle_keydown)
		return () => {
			window.removeEventListener('mousemove', update_mouse_pos)
			window.removeEventListener('keydown', handle_keydown)
		}
	})

	function update_mouse_pos(e: MouseEvent) {
		if (!grid_element) return
		const rect = grid_element.getBoundingClientRect()
		mouse_pos.x = e.clientX - rect.left
		mouse_pos.y = e.clientY - rect.top
	}

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
			delete node_labels[key({ x, y })]
		} else {
			nodes.push({ x, y })
		}
	}

	function create_arrow(x: number, y: number) {
		if (start_coord) {
			if (start_coord.x !== x || start_coord.y !== y) {
				const id = crypto.randomUUID()
				const arrow = { id, start: start_coord, end: { x, y } }
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

	const click_actions = {
		0: noop,
		1: toggle_node,
		2: create_arrow,
		3: create_label,
		4: noop
	} as const

	function handle_node_click(x: number, y: number) {
		click_actions[step](x, y)
	}

	function remove_arrow(id: string) {
		arrows = arrows.filter((arrow) => arrow.id != id)
	}
</script>

<div class="grid-wrapper">
	<div
		class="grid"
		style:--x={grid_size.x}
		style:--y={grid_size.y}
		style:--tile-size="{tile_size}px"
		bind:this={grid_element}
	>
		{#each { length: grid_size.y } as _, y}
			{#each { length: grid_size.x } as _, x}
				{@const selected = nodes.some((node) => node.x == x && node.y == y)}
				<span class="tile">
					{#if y > 0 && x > 0}
						<Node
							aria_label="node at {x}, {y}"
							handle_click={() => handle_node_click(x, y)}
							{selected}
							hoverable={[1, 2, 3].includes(step)}
							clickable={[1, 2, 3].includes(step)}
							label={node_labels[key({ x, y })]}
						/>
					{/if}
				</span>
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
				editable={step === 2}
			></ArrowComponent>
		{/each}

		{#if start_coord && grid_element}
			<ArrowComponent
				start={{
					x: start_coord.x * tile_size,
					y: start_coord.y * tile_size
				}}
				end={mouse_pos}
				editable={false}
			/>
		{/if}

		{#if step === 3 && label_coord}
			{#key key(label_coord)}
				<LabelInput
					aria_label="label for node at {label_coord.x}, {label_coord.y}"
					x={label_coord.x * tile_size}
					y={label_coord.y * tile_size}
					bind:label={node_labels[key(label_coord)]}
				/>
			{/key}
		{/if}
	</div>
</div>

<style>
	.grid-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100vh;
	}

	.grid {
		display: inline-grid;
		grid-template-columns: repeat(var(--x), var(--tile-size));
		grid-template-rows: repeat(var(--y), var(--tile-size));
		outline: 1px solid var(--line-color);
		position: relative;
	}

	.tile {
		border: 1px solid var(--line-color);
		position: relative;
	}
</style>
