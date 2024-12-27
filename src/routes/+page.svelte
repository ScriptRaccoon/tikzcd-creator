<script lang="ts">
	import Grid from '$lib/Grid.svelte';
	import Step from '$lib/Step.svelte';
	import type { Coord, Arrow } from '$lib/types';

	let nodes = $state<Coord[]>([]);
	let arrows = $state<Arrow[]>([]);
	let node_labels = $state<Record<string, string>>({});

	let step = $state<number>(0);

	function reset() {
		nodes = [];
		arrows = [];
		step = 1;
	}
</script>

<Grid bind:nodes bind:arrows bind:node_labels {step} />

<Step bind:step {reset} />
