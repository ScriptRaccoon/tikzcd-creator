<script lang="ts">
	import Grid from '$lib/Grid.svelte';
	import Step from '$lib/Step.svelte';
	import type { Coord, Arrow } from '$lib/types';

	let nodes = $state<Coord[]>([]);
	let arrows = $state<Arrow[]>([]);
	let step = $state<number>(0);

	$inspect(nodes);
</script>

<Grid bind:nodes bind:arrows {step} />

<Step bind:step />
