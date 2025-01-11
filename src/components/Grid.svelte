<script lang="ts">
	import type { Diagram, StepIndex } from '../lib/types'

	import Editor from './Editor.svelte'

	type Props = {
		diagram: Diagram
		step: StepIndex
		tile_size: number
	}

	let { diagram = $bindable(), step, tile_size }: Props = $props()

	let grid_cols = $state(1)
	let grid_rows = $state(1)

	$effect(() => {
		grid_cols = Math.floor(window.innerWidth / tile_size)
		grid_rows = Math.floor(window.innerHeight / tile_size)
	})

	let grid_element = $state<HTMLElement | null>(null)
	let mouse_pos = $state<{ x: number; y: number }>({ x: 0, y: 0 })

	function update_mouse_pos(e: MouseEvent) {
		if (!grid_element) return
		const rect = grid_element.getBoundingClientRect()
		mouse_pos.x = e.clientX - rect.left
		mouse_pos.y = e.clientY - rect.top
	}
</script>

<svelte:window onmousemove={update_mouse_pos} />

<div class="grid" style:--tile-size="{tile_size}px" bind:this={grid_element}>
	<Editor bind:diagram {step} {grid_cols} {grid_rows} {mouse_pos} {tile_size} />
</div>

<style>
	.grid {
		position: relative;
		width: 100vw;
		height: 100vh;
		background-image: linear-gradient(
				to right,
				var(--line-color) 1px,
				transparent 1px
			),
			linear-gradient(to bottom, var(--line-color) 1px, transparent 1px);
		background-size: var(--tile-size) var(--tile-size);
		background-position: -0.5px -0.5px;
	}
</style>
