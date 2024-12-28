<script lang="ts">
	import { fly } from 'svelte/transition'
	import { STEPS, type StepIndex } from './step.config'

	type Props = {
		step: StepIndex
		reset: () => void
	}

	let { step = $bindable(), reset }: Props = $props()

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
</script>

{#key step}
	<div
		class="step-card"
		in:fly={{ x: -50, duration: 200, delay: 200 }}
		out:fly={{ x: 50, duration: 200 }}
	>
		<p>{@html current_step.message}</p>
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
{/key}

<style>
	.step-card {
		z-index: 10;
		position: absolute;
		top: 1.5rem;
		left: 50%;
		transform: translateX(-50%);
		padding: 1.25rem 1.25rem 0.75rem;
		background-color: var(--card-color);
		border-radius: 0.5rem;
		box-shadow: 0 0 1rem var(--shadow-color);
		width: min(90vw, 20rem);
	}

	p {
		line-height: 1.5;
	}

	.buttons {
		margin-top: 1rem;
		display: flex;
		justify-content: space-between;
	}
</style>
