<script lang="ts">
	type Props = {
		x: number;
		y: number;
		selected: boolean;
		hoverable: boolean;
		clickable: boolean;
		handle_click: () => void;
	};

	let { x, y, selected, hoverable, clickable, handle_click }: Props = $props();
</script>

<button
	aria-label="node at {x}, {y}"
	class="node"
	onclick={handle_click}
	class:selected
	class:hoverable
	disabled={!clickable}
>
</button>

<style>
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

	.node:disabled {
		pointer-events: none;
	}

	.node.hoverable:not(.selected):hover {
		opacity: 1;
		scale: 1;
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
</style>
