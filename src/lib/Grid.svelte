<script lang="ts">
	import ArrowComponent from './Arrow.svelte';
	import type { Arrow, Coord } from './types';

	type Props = {
		nodes: Coord[];
		arrows: Arrow[];
		node_labels: Record<string, string>;
		step: number;
	};

	let {
		nodes = $bindable(),
		arrows = $bindable(),
		node_labels = $bindable(),
		step
	}: Props = $props();

	let label_coord = $state<Coord | null>(null);

	const key = (coord: Coord) => `${coord.x}|${coord.y}`;

	let size = $state<{ x: number; y: number }>({ x: 1, y: 1 });
	const grid_padding = 25;

	$effect(() => {
		size.x = Math.floor((window.innerWidth - 2 * grid_padding) / 100);
		size.y = Math.floor((window.innerHeight - 2 * grid_padding) / 100);
	});

	let start_coord = $state<Coord | null>(null);

	let grid_element = $state<HTMLElement | null>(null);
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
		if (step === 1) {
			const existing_node = nodes.find((node) => node.x == x && node.y == y);
			if (existing_node) {
				nodes = nodes.filter((node) => node != existing_node);
			} else {
				nodes.push({ x, y });
			}
		} else if (step === 2) {
			if (start_coord) {
				if (start_coord.x !== x || start_coord.y !== y) {
					const id = crypto.randomUUID();
					const arrow = { id, start: start_coord, end: { x, y } };
					arrows.push(arrow);
					start_coord = null;
				} else {
					start_coord = null;
				}
			} else {
				start_coord = { x, y };
			}
		} else if (step === 3) {
			if (label_coord && label_coord.x == x && label_coord.y === y) {
				label_coord = null;
			} else {
				label_coord = { x, y };
			}
		}
	}

	function remove_arrow(id: string) {
		arrows = arrows.filter((arrow) => arrow.id != id);
	}

	$inspect(node_labels);
</script>

<div class="grid-wrapper step-{step}">
	<div
		class="grid"
		style:--x={size.x}
		style:--y={size.y}
		bind:this={grid_element}
	>
		{#each { length: size.y } as _, y}
			{#each { length: size.x } as _, x}
				{@const selected = nodes.some((node) => node.x == x && node.y == y)}
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

		{#each arrows as arrow (arrow.id)}
			<ArrowComponent
				start={{
					x: arrow.start.x * 100,
					y: arrow.start.y * 100
				}}
				end={{
					x: arrow.end.x * 100,
					y: arrow.end.y * 100
				}}
				handle_remove={() => remove_arrow(arrow.id)}
				editable={step === 2}
			></ArrowComponent>
		{/each}

		{#if start_coord && grid_element}
			<ArrowComponent
				start={{
					x: start_coord.x * 100,
					y: start_coord.y * 100
				}}
				end={mouse_pos}
				editable={false}
			/>
		{/if}

		{#if step === 3 && label_coord}
			<input
				class="node_label_input"
				type="text"
				id={label_coord.toString()}
				bind:value={node_labels[key(label_coord)]}
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

	.grid-wrapper.step-0 .node {
		pointer-events: none;
	}

	.grid-wrapper:is(.step-1, .step-2) .node {
		&:not(.selected):hover {
			opacity: 1;
			scale: 1;
		}
	}

	.node_label_input {
		position: absolute;
		bottom: 0;
		left: 0;
		border: 1px solid var(--accent-color);
		padding: 0.5rem 1rem;
	}
</style>
