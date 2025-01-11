<script lang="ts">
	import CodeDisplay from './components/CodeDisplay.svelte'
	import Grid from './components/Grid.svelte'
	import Menu from './components/Menu.svelte'
	import Step from './components/Step.svelte'

	import { get_stored_data, save_data } from './lib/storage'
	import { move_diagram } from './lib/move'
	import { type Diagram, type StepIndex, type StorageData } from './lib/types'
	import { generate_URL, get_data_from_URL } from './lib/url'
	import Heading from './components/Heading.svelte'
	import Dialog from './components/Dialog.svelte'

	const data_from_URL = get_data_from_URL()
	const initial_data: StorageData = data_from_URL ?? get_stored_data()

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

	function share_URL() {
		const url = generate_URL({ diagram, step, tile_size })
		navigator.clipboard.writeText(url)
	}
</script>

<Heading />

<Step bind:step {reset}>
	{#if step === 6}
		<CodeDisplay {diagram} />
	{/if}
</Step>

<Grid bind:diagram {step} {tile_size} />

{#if step >= 1}
	<Menu
		clear_diagram={reset}
		move={(axis, value) => move_diagram(diagram, axis, value)}
		{zoom}
		{share_URL}
	/>
{/if}

<Dialog />
