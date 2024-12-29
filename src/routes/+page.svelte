<script lang="ts">
	import Grid from '$lib/components/Grid.svelte'
	import Step from '$lib/components/Step.svelte'
	import type { StepIndex } from '$lib/step.config'
	import { type Diagram } from '$lib/types'

	let diagram = $state<Diagram>({ nodes: [], arrows: [] })
	let step = $state<StepIndex>(0)

	function reset() {
		diagram.nodes = []
		diagram.arrows = []
		step = 1
	}
</script>

<Grid bind:diagram {step} />

<Step bind:step {reset} />
