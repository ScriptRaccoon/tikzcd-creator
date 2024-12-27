<script lang="ts">
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
	class:labelled={label && label.length > 0}
>
	<span class="label">{label}</span>
</button>

<style>
	.node {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		transform: translate(-50%, -50%);
	}

	.label {
		font-size: 1.25rem;
	}

	.node:not(.labelled) {
		--size: 20px;
		width: var(--size);
		height: var(--size);
		border-radius: 50%;
		transform: initial;
		top: calc(-0.5 * var(--size) - 1px);
		left: calc(-0.5 * var(--size) - 1px);
		background-color: white;
		transition:
			opacity 200ms,
			scale 200ms;
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
