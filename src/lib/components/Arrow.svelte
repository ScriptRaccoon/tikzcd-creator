<script lang="ts">
	import { faXmark } from '@fortawesome/free-solid-svg-icons'
	import { fade } from 'svelte/transition'
	import Fa from 'svelte-fa'

	import { arrow_padding, arrow_tip_size } from '$lib/constants'
	import Label from './Label.svelte'

	type Props = {
		id: string
		start: { x: number; y: number }
		end: { x: number; y: number }
		handle_remove?: () => void
		removable: boolean
		labellable: boolean
		label_above?: string
		label_below?: string
		show_labels: boolean
	}

	let {
		id,
		start,
		end,
		handle_remove,
		removable,
		labellable,
		label_above = $bindable(),
		label_below = $bindable(),
		show_labels
	}: Props = $props()

	let length = $derived(
		Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2) -
			2 * arrow_padding -
			0.5 * arrow_tip_size
	)

	let angle = $derived(Math.atan2(end.y - start.y, end.x - start.x))
	let angle_deg = $derived(angle * (180 / Math.PI))

	let padded_start_x = $derived(start.x + Math.cos(angle) * arrow_padding)
	let padded_start_y = $derived(start.y + Math.sin(angle) * arrow_padding)
</script>

<div
	class="arrow"
	style:--x="{padded_start_x}px"
	style:--y="{padded_start_y}px"
	style:--length="{length}px"
	style:--angle-deg="{angle_deg}deg"
	transition:fade|global={{ duration: 150 }}
>
	{#if show_labels}
		<div class="label_buttons">
			<div class="rotation-correction">
				<Label
					id={`arrow-label-above-${id}`}
					aria_label="Create label above the arrow"
					size="small"
					editable={labellable}
					bind:label={label_above}
					variant="accent"
				/>
			</div>
			<div class="rotation-correction">
				<Label
					id={`arrow-label-below-${id}`}
					aria_label="Create label below the arrow"
					size="small"
					editable={labellable}
					bind:label={label_below}
					variant="accent"
				/>
			</div>
		</div>
	{/if}

	<div class="tip" style:--size="{arrow_tip_size}px"></div>

	{#if removable && handle_remove !== undefined}
		<button
			class="remove-btn"
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
		rotate: var(--angle-deg);
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

	.remove-btn {
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
		background-color: var(--danger-color);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	@media (hover: hover) {
		.remove-btn {
			transition: opacity 200ms;
			opacity: 0;
		}

		.remove-btn:hover {
			opacity: 1;
		}
	}

	.remove-btn::before {
		content: '';
		position: absolute;
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
	}

	.label_buttons {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		translate: 5px; /* center including arrow tip */
	}

	.rotation-correction {
		rotate: calc(-1 * var(--angle-deg));
	}
</style>
