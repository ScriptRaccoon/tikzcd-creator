<script lang="ts">
	import { scale } from 'svelte/transition'

	import { arrow_codes, arrow_variants } from '$lib/constants'
	import type { Arrow } from '$lib/types'
	import { render_latex } from '$lib/utils'

	type Props = {
		angle: number
		selected_variant: Arrow['variant']
		update_variant: () => void
	}

	let {
		angle,
		selected_variant = $bindable(),
		update_variant
	}: Props = $props()
</script>

<div
	transition:scale={{ duration: 120 }}
	role="radiogroup"
	aria-label="Choose an arrow variant"
	class="selector"
	style:--angle="{(180 / Math.PI) * angle}deg"
>
	{#each arrow_variants as variant}
		<button
			role="radio"
			aria-checked={variant == selected_variant}
			aria-label={variant}
			onclick={() => {
				selected_variant = variant
				update_variant()
			}}
		>
			{@html render_latex(arrow_codes[variant])}
		</button>
	{/each}
</div>

<style>
	.selector {
		background-color: var(--card-color);
		display: flex;
		position: absolute;
		gap: 0.5rem;
		rotate: calc(-1 * var(--angle));
		border-radius: 0.25rem;
		box-shadow: 0 0 1rem var(--shadow-color);
	}

	button {
		width: 1.5rem;
		height: 1.5rem;
	}

	button[aria-checked='true'],
	button:active {
		background-color: var(--card-color-selected);
	}
</style>
