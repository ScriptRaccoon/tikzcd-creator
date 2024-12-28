<script lang="ts">
	type Props = {
		x: number;
		y: number;
		label: string | undefined;
	};

	let { x, y, label = $bindable() }: Props = $props();

	let element = $state<HTMLInputElement | null>(null);

	$effect(() => {
		element?.select();
	});
</script>

<input
	type="text"
	aria-label="label for node at {x}, {y}"
	class=""
	style:--x="{100 * x}px"
	style:--y="{100 * y}px"
	bind:value={label}
	bind:this={element}
/>

<style>
	input {
		position: absolute;
		top: var(--y);
		left: var(--x);
		outline: 1px solid var(--accent-color);
		padding: 0.5rem 0.75rem;
		border-radius: 5px;
		translate: -50% -4.25rem;
		background: black;
		box-shadow: 0px 0px 20px #0005;
		font-size: 1.5rem;
		font-family: monospace;
		text-align: center;
		field-sizing: content; /* https://caniuse.com/?search=field-sizing */
		min-width: 4rem;
	}
</style>
