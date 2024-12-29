<script lang="ts">
	import Grid from '$lib/components/Grid.svelte'
	import Step from '$lib/components/Step.svelte'
	import type { StepIndex } from '$lib/step.config'
	import type { Node, Arrow } from '$lib/types'

	let nodes = $state<Node[]>([])
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
