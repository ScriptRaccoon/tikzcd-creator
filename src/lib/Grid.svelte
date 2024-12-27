<script lang="ts">
	import Arrow from './Arrow.svelte';
	import { step } from './state.svelte';

	let size = $state({ x: 1, y: 1 });

	$effect(() => {
		size.x = Math.floor((window.innerWidth - 2 * padding) / 100);
		size.y = Math.floor((window.innerHeight - 2 * padding) / 100);
	});

	const padding = 25;

	let nodes = $state<string[]>([]);
	let arrows = $state<string[]>([]);

	let start_node = $state<{ x: number; y: number } | null>(null);

	let grid_element = $state<HTMLElement | null>(null);

	const k = (x: number, y: number) => `${x},${y}`;

	let mouse_pos = $state<{ x: number; y: number }>({ x: 0, y: 0 });

	$effect(() => {
		window.addEventListener('mousemove', update_mouse_pos);
		return () => window.removeEventListener('mousemove', update_mouse_pos);
	});

	function update_mouse_pos(e: MouseEvent) {
		if (!grid_element) return;
		const rect = grid_element.getBoundingClientRect();
		mouse_pos.x = e.clientX - rect.left;
		mouse_pos.y = e.clientY - rect.top;
	}

	function handle_node_click(x: number, y: number) {
		if (step.value === 1) {
			const key = k(x, y);
			if (nodes.includes(key)) {
				nodes = nodes.filter((_node) => _node != key);
			} else {
				nodes.push(k(x, y));
			}
		} else if (step.value === 2) {
			const node = { x, y };
			if (start_node) {
				if (start_node !== node) {
					const arrow = `${start_node}->${node}`;
					arrows.push(arrow);
					start_node = null;
				} else {
					start_node = null;
				}
			} else {
				start_node = node;
			}
		}
	}
</script>

<div class="grid-wrapper step-{step.value}">
	<div
		class="grid"
		style:--x={size.x}
		style:--y={size.y}
		bind:this={grid_element}
	>
		{#each { length: size.y } as _, y}
			{#each { length: size.x } as _, x}
				{@const selected = nodes.includes(k(x, y))}
				<span class="tile">
					{#if y > 0 && x > 0}
						<button
							aria-label="toggle node"
							class="node"
							onclick={() => handle_node_click(x, y)}
							class:selected
						>
						</button>
					{/if}
				</span>
			{/each}
		{/each}
		{#if start_node && grid_element}
			<Arrow
				start={{
					x: start_node.x * 100,
					y: start_node.y * 100
				}}
				end={mouse_pos}
			/>
		{/if}
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
		position: relative;
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

	.grid-wrapper:is(.step-1, .step-2) .node {
		pointer-events: initial;

		&:not(.selected):hover {
			opacity: 1;
			scale: 1;
		}
	}

	.grid-wrapper.step-2 .node {
		pointer-events: initial;
	}
</style>
