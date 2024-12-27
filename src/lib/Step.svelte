<script lang="ts">
	import { fly } from 'svelte/transition';

	type Props = {
		step: number;
	};

	let { step = $bindable() } = $props();

	const STEPS = [
		{
			message:
				'Welcome!<br>This app will help you create code for tikzcd diagrams.',
			button_label: 'Start'
		},
		{
			message:
				'<b>Create the nodes.</b> Click on the canvas to add or remove them.',
			button_label: 'Next'
		},
		{ message: 'Create the arrows. (TBA)', button_label: 'Next' },
		{ message: 'Done!', button_label: 'Start over' }
	] as const;

	let current_step = $derived(STEPS[step]);

	function increase_step() {
		if (step < STEPS.length - 1) {
			step += 1;
		} else {
			step = 1;
		}
	}
</script>

{#key step}
	<div
		class="step-card"
		in:fly={{ y: -100, duration: 200, delay: 200 }}
		out:fly={{ y: -100, duration: 100 }}
	>
		<h2>Step {step}</h2>
		<p>{@html current_step.message}</p>
		<button class="button" onclick={increase_step}>
			{current_step.button_label}
		</button>
	</div>
{/key}

<style>
	.step-card {
		z-index: 1;
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
</style>
