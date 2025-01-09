<script lang="ts">
	import {
		faCog,
		faLeftLong,
		faRightLong,
		faUpRightAndDownLeftFromCenter,
		faXmark,
	} from '@fortawesome/free-solid-svg-icons'
	import { fade } from 'svelte/transition'
	import Fa from 'svelte-fa'

	import { arrow_padding, arrow_shift_scale } from '$lib/constants'
	import type { Arrow } from '$lib/types'

	import ArrowSelector from './ArrowSelector.svelte'

	type Props = {
		id: string
		editing_arrow_id: string | null
		start: { x: number; y: number }
		end: { x: number; y: number }
		variant: Arrow['variant']
		show_controls: boolean
		show_variants: boolean
		shift?: number
		remove: () => void
	}

	let {
		id,
		editing_arrow_id = $bindable(),
		start,
		end,
		variant = $bindable(),
		show_variants,
		show_controls,
		shift = $bindable(),
		remove,
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

	let editing = $derived(editing_arrow_id === id)

	function toggle_editing() {
		editing_arrow_id = id === editing_arrow_id ? null : id
	}

	function handle_shift(direction: 'left' | 'right') {
		const current_shift = shift ?? 0
		shift = current_shift + (direction === 'left' ? -1 : 1)
		editing_arrow_id = null
	}

	function handle_remove() {
		editing_arrow_id = null
		remove()
	}
</script>

<div
	class="arrow {variant}"
	style:--x="{padded_start_x}px"
	style:--y="{padded_start_y}px"
	style:--length="{length}px"
	style:--angle="{angle * (180 / Math.PI)}deg"
	style:--shift="{(shift ?? 0) * arrow_shift_scale}px"
	class:editing
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

	{#if show_controls && editing_arrow_id === null}
		<button
			transition:fade={{ duration: 120 }}
			class="edit-opener"
			aria-label="edit arrow"
			onclick={toggle_editing}
		>
			<Fa icon={faUpRightAndDownLeftFromCenter} />
		</button>
	{/if}

	{#if show_controls && editing}
		<div class="controls" transition:fade={{ duration: 120 }}>
			<button
				class="shift-button"
				aria-label="shift arrow left"
				onclick={() => handle_shift('left')}
			>
				<Fa icon={faLeftLong} />
			</button>

			<button
				class="remove-btn"
				aria-label="delete arrow"
				onclick={handle_remove}
			>
				<Fa icon={faXmark} />
			</button>

			<button
				class="shift-button"
				aria-label="shift arrow right"
				onclick={() => handle_shift('right')}
			>
				<Fa icon={faRightLong} />
			</button>
		</div>
	{/if}

	{#if show_variants}
		<button
			transition:fade={{ duration: 120 }}
			class="variant-opener"
			aria-label="change arrow type"
			onclick={toggle_editing}
		>
			<Fa icon={faCog} />
		</button>
	{/if}

	{#if show_variants && editing_arrow_id === id}
		<ArrowSelector
			{angle}
			bind:selected_variant={variant}
			update_variant={() => (editing_arrow_id = null)}
		/>
	{/if}
</div>

<style>
	.arrow {
		position: absolute;
		transform-origin: left;
		top: var(--y);
		left: var(--x);
		width: var(--length);
		display: flex;
		justify-content: center;
		align-items: center;
		transform: translate(0%, -50%) rotate(var(--angle))
			translate(0, var(--shift, 0));
	}

	.arrow > * {
		position: absolute;
	}

	.arrow.editing {
		z-index: 1;
	}

	.lines {
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
		right: 0;
		width: 1.5rem;
		height: 1.5rem;
		background-color: var(--accent-color);
		clip-path: polygon(0% 10%, 100% 50%, 0% 90%, 20% 50%);
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
		left: 0;
		bottom: -0.1rem;
		width: 1.7rem;
		height: 1.7rem;
		border: 0.2rem solid var(--accent-color);
		border-radius: 50%;
		clip-path: polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%);
	}

	.controls {
		display: grid;
		gap: 0.25rem;
		z-index: 5;
	}

	button {
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

	.variant-opener,
	.shift-button,
	.edit-opener {
		background-color: var(--card-color);
	}

	.shift-button {
		rotate: 90deg;
	}

	.edit-opener {
		font-size: 0.75rem;
		rotate: -45deg;
	}
</style>
