<script lang="ts">
	type Props = {
		start: { x: number; y: number };
		end: { x: number; y: number };
		editable: boolean;
	};

	const { start, end, editable }: Props = $props();

	let length = $derived(
		Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2)
	);

	let angle = $derived(
		(180 / Math.PI) * Math.atan2(end.y - start.y, end.x - start.x)
	);
</script>

<div
	class="arrow"
	class:editable
	style:--pos_x="{start.x}px"
	style:--pos_y="{start.y}px"
	style:--length="{length}px"
	style:--angle="{angle}deg"
></div>

<style>
	.arrow {
		--thickness: 4px;
		position: absolute;
		transform-origin: left;
		top: var(--pos_y);
		left: var(--pos_x);
		width: var(--length);
		height: var(--thickness);
		translate: 0px calc(-0.5 * var(--thickness));
		rotate: var(--angle);
		background-color: orange;
	}
	.arrow:not(.editable) {
		pointer-events: none;
	}
</style>
