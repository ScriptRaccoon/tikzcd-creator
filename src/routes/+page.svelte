<script lang="ts">
	import Grid from '$lib/Grid.svelte'
	import Step from '$lib/Step.svelte'
	import type { StepIndex } from '$lib/step.config'
	import type { Coord, Arrow } from '$lib/types'

	let nodes = $state<Coord[]>([])
	let arrows = $state<Arrow[]>([])

	let step = $state<StepIndex>(0)

	function reset() {
		nodes = []
		arrows = []
		step = 1
	}
</script>

<Grid bind:nodes bind:arrows {step} />

<Step bind:step {reset} />
