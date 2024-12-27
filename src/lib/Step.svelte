<script lang="ts">
	import { fly } from 'svelte/transition';
	import { STEPS } from './step.config';

	type Props = {
		step: number;
		reset: () => void;
	};

	let { step = $bindable(), reset }: Props = $props();

	let current_step = $derived(STEPS[step]);

	function handle_next() {
		if (step < STEPS.length - 1) {
			step += 1;
		} else {
			reset();
		}
	}

	function handle_previous() {
		if (step > 0) {
			step -= 1;
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
		top: 20px;
		left: 50%;
		transform: translateX(-50%);
		padding: 10px 20px;
		background-color: var(--card-color);
		border-radius: 10px;
		box-shadow: 5px 5px 20px #0004;
		width: 300px;
	}

	h2 {
		font-size: 2rem;
	}

	p {
		margin-block: 10px 15px;
		line-height: 1.4;
	}

	.buttons {
		display: flex;
		justify-content: space-between;
	}
</style>
