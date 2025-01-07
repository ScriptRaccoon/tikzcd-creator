<script lang="ts" module>
	let editing_arrow_id = $state<null | string>(null)

	export function clear_editing_arrow() {
		editing_arrow_id = null
	}
</script>

<script lang="ts">
	import { faCog, faXmark } from '@fortawesome/free-solid-svg-icons'
	import { fade } from 'svelte/transition'
	import Fa from 'svelte-fa'

	import { arrow_padding } from '$lib/constants'
	import type { Arrow } from '$lib/types'

	import ArrowSelector from './ArrowSelector.svelte'

	type Props = {
		id: string
		start: { x: number; y: number }
		end: { x: number; y: number }
		handle_remove?: () => void
		removable: boolean
		variant: Arrow['variant']
		variantable: boolean
	}

	let {
		id,
		start,
		end,
		handle_remove,
		removable,
		variant = $bindable(),
		variantable,
	}: Props = $props()

	let has_tip = $derived(variant !== 'equal' && variant !== 'dash')

	let number_lines = $derived(
		variant === 'equal' || variant == 'Rightarrow' ? 2 : 1,
	)

	let length = $derived(
		Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2) -
			2 * arrow_padding,
	)

	let angle = $derived(Math.atan2(end.y - start.y, end.x - start.x))

	let padded_start_x = $derived(start.x + Math.cos(angle) * arrow_padding)
	let padded_start_y = $derived(start.y + Math.sin(angle) * arrow_padding)

	let has_hook = $derived(variant === 'hookrightarrow')

	function toggle_variant_selector() {
		editing_arrow_id = id === editing_arrow_id ? null : id
	}
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
			<div
				class="line"
				class:clipped_start={has_hook}
				class:clipped_end={has_tip}
			></div>
		{/each}
	</div>

	{#if has_tip}
		<div class="tip"></div>
	{/if}

	{#if has_hook}
		<div class="hook"></div>
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
		{#if editing_arrow_id === id}
			<ArrowSelector
				{angle}
				bind:selected_variant={variant}
				update_variant={() => (editing_arrow_id = null)}
			/>
		{:else}
			<button
				class="variant-opener"
				aria-label="open variant selector"
				onclick={toggle_variant_selector}
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
		--clip-start: 0rem;
		--clip-end: 0rem;
		clip-path: polygon(
			var(--clip-start) 0%,
			calc(100% - var(--clip-end)) 0%,
			calc(100% - var(--clip-end)) 100%,
			var(--clip-start) 100%
		);
	}

	.line.clipped_end {
		--clip-end: 0.8rem;
	}

	.line.clipped_start {
		--clip-start: 0.8rem;
	}

	.tip {
		position: absolute;
		right: 0;
		width: 1.5rem;
		height: 1.5rem;
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

	.hook {
		position: absolute;
		left: 0;
		bottom: -0.1rem;
		width: 1.7rem;
		height: 1.7rem;
		border: 0.2rem solid var(--accent-color);
		border-radius: 50%;
		clip-path: polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%);
	}

	@media (hover: hover) {
		.remove-btn:not(:focus-visible) {
			transition: opacity 200ms;
			opacity: 0;
		}

		.remove-btn:hover {
			opacity: 1;
		}
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

	:is(.remove-btn, .variant-opener)::before {
		content: '';
		position: absolute;
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
	}

	.remove-btn {
		background-color: var(--danger-color);
	}

	.variant-opener {
		background-color: var(--card-color);
	}
</style>
