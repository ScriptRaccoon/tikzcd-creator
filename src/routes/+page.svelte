<script lang="ts">
	import CodeDisplay from '$lib/components/CodeDisplay.svelte'
	import Grid from '$lib/components/Grid.svelte'
	import Menu from '$lib/components/Menu.svelte'
	import Step from '$lib/components/Step.svelte'

	import { get_stored_data, save_data } from '$lib/storage'
	import { move_down, move_left, move_right, move_up } from '$lib/move'
	import { type Diagram, type StepIndex } from '$lib/types'

	const initial_data = get_stored_data()

	let diagram = $state<Diagram>(initial_data.diagram)
	let step = $state<StepIndex>(initial_data.step)
	let tile_size = $state<number>(initial_data.tile_size)

	function reset() {
		diagram.nodes = []
		diagram.arrows = []
		step = 1
	}

	function zoom(value: -1 | 1) {
		tile_size = Math.max(10, tile_size + value * 10)
	}

	$effect(() => {
		save_data({ diagram, step, tile_size })
	})
</script>

<Step bind:step {reset}>
	{#if step === 6}
		<CodeDisplay {diagram} />
	{/if}
</Step>

<Grid bind:diagram {step} {tile_size} />

{#if step >= 1}
	<Menu
		clear_diagram={reset}
		move_left={() => move_left(diagram)}
		move_right={() => move_right(diagram)}
		move_up={() => move_up(diagram)}
		move_down={() => move_down(diagram)}
		{zoom}
	/>
{/if}
