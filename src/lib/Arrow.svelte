<script lang="ts">
	import { faXmark } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	type Props = {
		start: { x: number; y: number };
		end: { x: number; y: number };
		handle_remove?: () => void;
		editable: boolean;
	};

	const { start, end, handle_remove, editable }: Props = $props();

	const padding = 30;
	const tip_size = 20;

	let length = $derived(
		Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2) -
			2 * padding -
			0.5 * tip_size
	);

	let angle = $derived(Math.atan2(end.y - start.y, end.x - start.x));

	let angle_deg = $derived((180 / Math.PI) * angle);

	let padded_start_x = $derived(start.x + Math.cos(angle) * padding);
	let padded_start_y = $derived(start.y + Math.sin(angle) * padding);
</script>

<div
	class="arrow"
	style:--x="{padded_start_x}px"
	style:--y="{padded_start_y}px"
	style:--length="{length}px"
	style:--angle="{angle_deg}deg"
>
	<div class="tip" style:--size="{tip_size}px"></div>

	{#if editable && handle_remove !== undefined}
		<button aria-label="delete arrow" onclick={handle_remove}>
			<Fa icon={faXmark} />
		</button>
	{/if}
</div>

<style>
	.arrow {
		--thickness: 3px;
		position: absolute;
		transform-origin: left;
		top: var(--y);
		left: var(--x);
		width: var(--length);
		height: var(--thickness);
		translate: 0 calc(-0.5 * var(--thickness));
		rotate: var(--angle);
		background-color: var(--accent-color);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.tip {
		position: absolute;
		right: calc(-0.5 * var(--size));
		width: var(--size);
		height: var(--size);
		background-color: inherit;
		clip-path: polygon(0% 10%, 100% 50%, 0% 90%);
	}

	button {
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
		background-color: var(--danger-color);
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 200ms;
		opacity: 0;
	}

	button::before {
		content: '';
		position: absolute;
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
	}

	button:hover {
		opacity: 1;
	}
</style>
