<script lang="ts">
	import { fade, fly } from 'svelte/transition'
	import type { Snippet } from 'svelte'
	import {
		faMinusSquare,
		faPlusSquare,
	} from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'

	import { STEPS } from '$lib/step.config'
	import type { StepIndex } from '$lib/types'

	type Props = {
		step: StepIndex
		reset: () => void
		children?: Snippet
	}

	let { step = $bindable(), reset, children }: Props = $props()

	let current_step = $derived(STEPS[step])

	function handle_next() {
		if (step < STEPS.length - 1) {
			step += 1
		} else {
			reset()
		}
	}

	function handle_previous() {
		if (step > 0) {
			step -= 1
		}
	}

	let minimized = $state(false)
	let show_step = $state(false)

	$effect(() => {
		show_step = true
	})

	function toggle_minimize() {
		minimized = !minimized
	}
</script>

<div aria-live="polite">
	{#if show_step}
		{#key step}
			<div
				class="step-card"
				in:fly={{ x: -50, duration: 200, delay: 200 }}
				out:fly={{ x: 50, duration: 200 }}
				class:minimized
			>
				<button
					class="toggle"
					aria-label={minimized ? 'maximize step card' : 'minimize step card'}
					onclick={toggle_minimize}
					aria-expanded={!minimized}
				>
					<Fa icon={minimized ? faPlusSquare : faMinusSquare} />
				</button>

				{#if !minimized}
					<div class="content" transition:fade={{ duration: 150 }}>
						<h2 class="summary">
							{#if step > 0}
								Step {step}:
							{/if}
							{current_step.summary}
						</h2>

						<p>{@html current_step.message}</p>

						{@render children?.()}

						<div class="buttons">
							{#if current_step.button_labels.prev !== null}
								<button class="button" onclick={handle_previous}>
									{current_step.button_labels.prev}
								</button>
							{/if}
							<button class="button" onclick={handle_next}>
								{current_step.button_labels.next}
							</button>
						</div>
					</div>
				{/if}
			</div>
		{/key}
	{/if}
</div>

<style>
	.step-card {
		z-index: 10;
		position: absolute;
		top: 1.5rem;
		left: 50%;
		transform: translateX(-50%);
		width: min(90vw, 20rem);
	}

	.content {
		background-color: var(--card-color);
		border-radius: 0.5rem;
		box-shadow: 0 0 1rem var(--shadow-color);
		padding: 1.25rem 1.25rem 0.75rem;
	}

	p {
		line-height: 1.5;
	}

	.summary {
		font-size: 1rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	.buttons {
		margin-top: 1rem;
		display: flex;
		justify-content: space-between;
	}

	.toggle {
		opacity: 0.75;
		position: absolute;
		top: 0rem;
		right: -1.5rem;
	}
</style>
