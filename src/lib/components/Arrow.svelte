<script lang="ts">
	import { faXmark } from '@fortawesome/free-solid-svg-icons'
	import { fade } from 'svelte/transition'
	import Fa from 'svelte-fa'
	import Label from './Label.svelte'

	type Props = {
		start: { x: number; y: number }
		end: { x: number; y: number }
		handle_remove?: () => void
		removable: boolean
		labellable: boolean
		label_above: string
		label_below: string
		show_labels: boolean
	}

	let {
		start,
		end,
		handle_remove,
		removable,
		labellable,
		label_above = $bindable(),
		label_below = $bindable(),
		show_labels
	}: Props = $props()

	const padding = 30
	const tip_size = 20

	let length = $derived(
		Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2) -
			2 * padding -
			0.5 * tip_size
	)

	let angle = $derived(Math.atan2(end.y - start.y, end.x - start.x))

	let angle_deg = $derived((180 / Math.PI) * angle)

	let padded_start_x = $derived(start.x + Math.cos(angle) * padding)
	let padded_start_y = $derived(start.y + Math.sin(angle) * padding)
</script>

<div
	class="arrow"
	style:--x="{padded_start_x}px"
	style:--y="{padded_start_y}px"
	style:--length="{length}px"
	style:--angle="{angle_deg}deg"
	transition:fade|global={{ duration: 150 }}
>
	{#if show_labels}
		<div class="label_buttons">
			<div class="rotation_correction">
				<Label
					aria_label="Create label above the arrow"
					size="small"
					editable={labellable}
					bind:label={label_above}
					variant="accent"
				/>
			</div>
			<div class="rotation_correction">
				<Label
					aria_label="Create label below the arrow"
					size="small"
					editable={labellable}
					bind:label={label_below}
					variant="accent"
				/>
			</div>
		</div>
	{/if}

	<div class="tip" style:--size="{tip_size}px"></div>

	{#if removable && handle_remove !== undefined}
		<button
			class="remove_btn"
			aria-label="delete arrow"
			onclick={handle_remove}
		>
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

	.remove_btn {
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

	.remove_btn::before {
		content: '';
		position: absolute;
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
	}

	.remove_btn:hover {
		opacity: 1;
	}

	.label_buttons {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		translate: 5px; /* center including arrow tip */
	}

	.rotation_correction {
		rotate: calc(-1 * var(--angle));
	}
</style>
