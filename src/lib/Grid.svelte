<script lang="ts">
	import { step } from './state.svelte';

	let size = $state({ x: 1, y: 1 });
	const padding = 25;

	let node_keys = $state<string[]>([]);

	const k = (x: number, y: number) => `${x}_${y}`;

	$effect(() => {
		size.x = Math.floor((window.innerWidth - 2 * padding) / 100);
		size.y = Math.floor((window.innerHeight - 2 * padding) / 100);
	});

	function handle_node_click(x: number, y: number) {
		if (step.value === 1) {
			const key = k(x, y);
			if (node_keys.includes(key)) {
				node_keys = node_keys.filter((c) => c != key);
			} else {
				node_keys.push(k(x, y));
			}
		}
	}
</script>

<div class="grid-wrapper" class:active={step.value == 1}>
	<div class="grid" style:--x={size.x} style:--y={size.y}>
		{#each { length: size.y } as _, y}
			{#each { length: size.x } as _, x}
				<span class="tile">
					{#if y > 0 && x > 0}
						<button
							aria-label="toggle node"
							class="node"
							onclick={() => handle_node_click(x, y)}
							class:selected={node_keys.includes(k(x, y))}
						>
						</button>
					{/if}
				</span>
			{/each}
		{/each}
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
		grid-template-columns: repeat(var(--x), 100px);
		grid-template-rows: repeat(var(--y), 100px);
		outline: 1px solid #333;
	}

	.tile {
		border: 1px solid #333;
		position: relative;
	}

	.node {
		--size: 20px;
		position: absolute;
		width: var(--size);
		height: var(--size);
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		top: calc(-0.5 * var(--size) - 1px);
		left: calc(-0.5 * var(--size) - 1px);
		background-color: white;
		transition: all 200ms;
		pointer-events: none;
	}

	.node:not(.selected) {
		opacity: 0;
		scale: 0.5;
	}

	.node.selected {
		scale: 1.5;
	}

	.node::before {
		position: absolute;
		content: '';
		width: 65px;
		height: 65px;
		border-radius: 50%;
	}

	.grid-wrapper.active .node {
		pointer-events: initial;

		&:not(.selected):hover {
			opacity: 1;
			scale: 1;
		}
	}
</style>
