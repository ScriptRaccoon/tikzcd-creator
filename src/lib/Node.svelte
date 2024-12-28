<script lang="ts">
	import { render_latex } from './utils';

	type Props = {
		x: number;
		y: number;
		selected: boolean;
		hoverable: boolean;
		clickable: boolean;
		label: string | undefined;
		handle_click: () => void;
	};

	let { x, y, selected, hoverable, clickable, handle_click, label }: Props =
		$props();
</script>

<button
	aria-label="node at {x}, {y}"
	class="node"
	onclick={handle_click}
	class:selected
	class:hoverable
	disabled={!clickable}
>
	{#if label}
		<span class="label">
			{@html render_latex(label)}
		</span>
	{:else}
		<div class="circle"></div>
	{/if}
</button>

<style>
	.node {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		transform: translate(calc(-50% - 1px), calc(-50% - 1px));
		width: 60px;
		height: 60px;
		border-radius: 50%;
	}

	.circle {
		position: absolute;
		width: 20px;
		height: 20px;
		background-color: white;
		border-radius: 50%;
		transition:
			opacity 200ms,
			scale 200ms;
	}

	.node:not(.selected) .circle {
		opacity: 0;
		scale: 0;
	}

	.node.selected .circle {
		opacity: 1;
		scale: 1.25;
	}

	.node.hoverable:not(.selected):hover .circle {
		opacity: 1;
		scale: 1;
	}

	.node:disabled {
		cursor: initial;
	}

	.label {
		font-size: 2rem;
	}
</style>
