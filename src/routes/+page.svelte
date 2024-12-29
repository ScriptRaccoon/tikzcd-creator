<script lang="ts">
	import CodeDisplay from '$lib/components/CodeDisplay.svelte'
	import Grid from '$lib/components/Grid.svelte'
	import Step from '$lib/components/Step.svelte'

	import type { StepIndex } from '$lib/step.config'
	import { get_stored_data, save_data } from '$lib/storage'
	import { type Diagram } from '$lib/types'

	const initial_data = get_stored_data()

	let diagram = $state<Diagram>(initial_data.diagram)
	let step = $state<StepIndex>(initial_data.step)

	function reset() {
		diagram.nodes = []
		diagram.arrows = []
		step = 1
	}

	$effect(() => {
		save_data({ diagram, step })
	})
</script>

<Grid bind:diagram {step} />

<Step bind:step {reset} />

{#if step === 5}
	<CodeDisplay {diagram} />
{/if}
