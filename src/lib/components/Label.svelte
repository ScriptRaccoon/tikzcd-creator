<script lang="ts" module>
	let editing_label_id = $state<null | string>(null)
</script>

<script lang="ts">
	import { fade, fly } from 'svelte/transition'

	import { render_latex } from '$lib/utils'

	type Props = {
		id: string
		aria_label: string
		size: 'small' | 'large'
		variant: 'normal' | 'accent'
		label: string
		editable: boolean
	}

	let {
		id,
		aria_label,
		size,
		label = $bindable(),
		editable,
		variant
	}: Props = $props()

	let editing = $derived(editing_label_id === id)

	let input_element = $state<HTMLInputElement | null>(null)

	function select_input() {
		if (input_element) {
			input_element.select()
		}
	}

	function handle_keydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			editing_label_id = null
		}
	}

	$effect(() => {
		if (editing) {
			select_input()
		}
	})

	$effect(() => {
		window.addEventListener('keydown', handle_keydown)

		return () => {
			window.removeEventListener('keydown', handle_keydown)
		}
	})

	function toggle_edit() {
		editing_label_id = editing ? null : id
	}
</script>

<div class="wrapper">
	{#if editable && editing}
		<input
			{id}
			type="text"
			transition:fly={{ y: 10, duration: 100 }}
			aria-label={aria_label}
			bind:value={label}
			bind:this={input_element}
		/>
	{/if}

	<button
		class={variant}
		class:empty={label === ''}
		transition:fade={{ duration: 150 }}
		aria-label={aria_label}
		onclick={toggle_edit}
		disabled={!editable}
	>
		{#if label}
			<span class="label-{size}">
				{@html render_latex(label)}
			</span>
		{/if}
	</button>
</div>

<style>
	.wrapper {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	button.empty {
		width: 2.25rem;
		height: 2.25rem;
		border-radius: 50%;
		transition: opacity 200ms;
		opacity: 0.5;
	}

	button.empty.accent {
		border: 1px dashed var(--accent-color);
	}

	button.empty.normal {
		border: 1px dashed var(--font-color);
	}

	button:hover {
		opacity: 1;
	}

	button[disabled] {
		pointer-events: none;
	}

	button[disabled].empty {
		opacity: 0;
	}

	input {
		position: absolute;
		outline: 1px solid var(--accent-color);
		padding: 0.35rem 0.7rem;
		border-radius: 0.25rem;
		translate: 0 -3.25rem;
		background: black;
		box-shadow: 0 0 1rem var(--shadow-color);
		font-size: 1.5rem;
		font-family: monospace;
		text-align: center;
		field-sizing: content; /* https://caniuse.com/?search=field-sizing */
		min-width: 4rem;
		z-index: 20;
	}

	.label-small {
		font-size: 1.5rem;
	}

	.label-large {
		font-size: 2rem;
	}
</style>
