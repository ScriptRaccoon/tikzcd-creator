<script lang="ts">
	import { render_latex } from './utils';

	type Props = {
		selected: boolean;
		hoverable: boolean;
		clickable: boolean;
		handle_click: () => void;
		label: string | undefined;
		aria_label: string;
	};

	let {
		selected,
		hoverable,
		clickable,
		handle_click,
		label,
		aria_label
	}: Props = $props();
</script>

<button
	aria-label={aria_label}
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
		/* shift 1px for tile outline */
		transform: translate(calc(-50% - 1px), calc(-50% - 1px));
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
	}

	.circle {
		position: absolute;
		width: 1.25rem;
		height: 1.25rem;
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
