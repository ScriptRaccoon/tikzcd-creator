<script lang="ts">
	import { faCog, faXmark } from '@fortawesome/free-solid-svg-icons'
	import { fade } from 'svelte/transition'
	import Fa from 'svelte-fa'

	import { arrow_padding, arrow_tip_size } from '$lib/constants'
	import type { Arrow } from '$lib/types'
	import ArrowSelector from './ArrowSelector.svelte'

	type Props = {
		start: { x: number; y: number }
		end: { x: number; y: number }
		handle_remove?: () => void
		removable: boolean
		variant: Arrow['variant']
		variantable: boolean
	}

	let {
		start,
		end,
		handle_remove,
		removable,
		variant = $bindable(),
		variantable
	}: Props = $props()

	let has_tip = $derived(variant !== 'equal' && variant !== 'dash')

	let number_lines = $derived(
		variant === 'equal' || variant == 'Rightarrow' ? 2 : 1
	)

	let length = $derived(
		Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2) -
			2 * arrow_padding -
			(has_tip ? 0.75 * arrow_tip_size : 0)
	)

	let angle = $derived(Math.atan2(end.y - start.y, end.x - start.x))

	let padded_start_x = $derived(start.x + Math.cos(angle) * arrow_padding)
	let padded_start_y = $derived(start.y + Math.sin(angle) * arrow_padding)

	let show_variant_selector = $state(false)

	$effect(() => {
		if (variant) show_variant_selector = false
	})
</script>

<div
	class="arrow {variant}"
	style:--x="{padded_start_x}px"
	style:--y="{padded_start_y}px"
	style:--length="{length}px"
	style:--angle="{angle * (180 / Math.PI)}deg"
	transition:fade|global={{ duration: 150 }}
>
	<div class="lines">
		{#each { length: number_lines }}
			<div class="line"></div>
		{/each}
	</div>

	{#if has_tip}
		<div class="tip" style:--size="{arrow_tip_size}px"></div>
	{/if}

	{#if removable && handle_remove !== undefined}
		<button
			class="remove-btn"
			aria-label="delete arrow"
			onclick={handle_remove}
		>
			<Fa icon={faXmark} />
		</button>
	{/if}

	{#if variantable}
		{#if show_variant_selector}
			<ArrowSelector
				{angle}
				bind:selected_variant={variant}
				update_variant={() => (show_variant_selector = false)}
			/>
		{:else}
			<button
				class="variant-opener"
				onclick={() => (show_variant_selector = true)}
			>
				<Fa icon={faCog} />
			</button>
		{/if}
	{/if}
</div>

<style>
	.arrow {
		position: absolute;
		transform-origin: left;
		top: var(--y);
		left: var(--x);
		width: var(--length);
		rotate: var(--angle);
		display: flex;
		justify-content: center;
		align-items: center;
		translate: 0% -50%;
	}

	.lines {
		position: absolute;
		width: 100%;
		display: grid;
		gap: 0.25rem;
		align-items: center;
	}

	.line {
		background: var(--accent-color);
		height: 0.2rem;
	}

	.tip {
		position: absolute;
		right: calc(-0.75 * var(--size));
		width: var(--size);
		height: var(--size);
		background-color: var(--accent-color);
		clip-path: polygon(0% 10%, 100% 50%, 0% 90%);
	}

	.arrow.dashed .line {
		background: linear-gradient(
			to right,
			var(--accent-color),
			var(--accent-color) 60%,
			transparent 60%,
			transparent 100%
		);
		background-size: 1rem 100%;
	}

	.remove-btn,
	.variant-opener {
		position: absolute;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.remove-btn {
		background-color: var(--danger-color);
	}

	.variant-opener {
		background-color: var(--card-color);
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
</style>
