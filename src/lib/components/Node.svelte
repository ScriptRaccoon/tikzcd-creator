<script lang="ts">
	import { fade } from 'svelte/transition'

	type Props = {
		selected: boolean
		handle_click: () => void
		aria_label: string
		interactive: boolean
		starting: boolean
	}

	let { selected, handle_click, aria_label, interactive, starting }: Props =
		$props()
</script>

<button
	transition:fade|global={{ duration: 150 }}
	class="node"
	aria-label={aria_label}
	onclick={handle_click}
	class:selected
	class:starting
	disabled={!interactive}
>
	<div class="circle"></div>
</button>

<style>
	.node {
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.node.starting {
		animation: rotate 14s linear infinite;
		outline: 2px dashed #fffa;
		outline-offset: -0.25rem;
	}

	@keyframes rotate {
		to {
			rotate: 1turn;
		}
	}

	.node[disabled] {
		cursor: initial;
	}

	.circle {
		position: absolute;
		width: 1.25rem;
		height: 1.25rem;
		background-color: var(--node-color);
		border-radius: 50%;
		transition:
			opacity 200ms,
			scale 200ms;
	}

	.node:not(.selected) .circle {
		opacity: 0;
		scale: 0;
	}

	.node:not(.selected):not([disabled]):hover .circle {
		opacity: 1;
		scale: 1;
	}

	.node.selected .circle {
		opacity: 1;
		scale: 1.25;
	}
</style>
