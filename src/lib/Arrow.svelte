<script lang="ts">
	type Props = {
		start: { x: number; y: number };
		end: { x: number; y: number };
		editable: boolean;
	};

	const { start, end, editable }: Props = $props();

	const padding = 20;

	let length = $derived(
		Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2) - 2.5 * padding
	);

	let angle = $derived(Math.atan2(end.y - start.y, end.x - start.x));

	let angle_deg = $derived((180 / Math.PI) * angle);

	let padded_start_x = $derived(start.x + Math.cos(angle) * padding);
	let padded_start_y = $derived(start.y + Math.sin(angle) * padding);
</script>

<div
	class="arrow"
	class:editable
	style:--x="{padded_start_x}px"
	style:--y="{padded_start_y}px"
	style:--length="{length}px"
	style:--angle="{angle_deg}deg"
>
	<div class="tip"></div>
</div>

<style>
	.arrow {
		--thickness: 4px;
		position: absolute;
		transform-origin: left;
		top: var(--y);
		left: var(--x);
		width: var(--length);
		height: var(--thickness);
		translate: 0px calc(-0.5 * var(--thickness));
		rotate: var(--angle);
		background-color: var(--accent-color);
	}

	.arrow:not(.editable) {
		pointer-events: none;
	}

	.tip {
		position: absolute;
		right: -10px;
		width: 20px;
		--height: 20px;
		height: var(--height);
		translate: 0px calc(0.5 * var(--thickness) - 0.5 * var(--height));
		background-color: inherit;
		clip-path: polygon(0% 10%, 100% 50%, 0% 90%);
	}
</style>
