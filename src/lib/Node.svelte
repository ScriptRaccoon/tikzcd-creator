<script lang="ts">
	type Props = {
		x: number
		y: number
		selected: boolean
		handle_click: () => void
		aria_label: string
	}

	let { x, y, selected, handle_click, aria_label }: Props = $props()
</script>

<button
	class="node"
	style:--x="{x}px"
	style:--y="{y}px"
	aria-label={aria_label}
	onclick={handle_click}
	class:selected
>
	<div class="circle"></div>
</button>

<style>
	.node {
		position: absolute;
		left: var(--x);
		top: var(--y);
		translate: -50% -50%;
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
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

	.node:not(.selected):hover .circle {
		opacity: 1;
		scale: 1;
	}

	.node.selected .circle {
		opacity: 1;
		scale: 1.25;
	}
</style>
