<script lang="ts">
	type Props = {
		x: number;
		y: number;
		label: string | undefined;
		aria_label: string;
	};

	let { x, y, label = $bindable(), aria_label }: Props = $props();

	let element = $state<HTMLInputElement | null>(null);

	$effect(() => {
		element?.select();
	});
</script>

<input
	type="text"
	aria-label={aria_label}
	style:--x="{x}px"
	style:--y="{y}px"
	bind:value={label}
	bind:this={element}
/>

<style>
	input {
		position: absolute;
		top: var(--y);
		left: var(--x);
		outline: 1px solid var(--accent-color);
		padding: 0.35rem 0.7rem;
		border-radius: 0.25rem;
		translate: -50% -4.25rem;
		background: black;
		box-shadow: 0 0 1rem var(--shadow-color);
		font-size: 1.5rem;
		font-family: monospace;
		text-align: center;
		field-sizing: content; /* https://caniuse.com/?search=field-sizing */
		min-width: 4rem;
	}
</style>
