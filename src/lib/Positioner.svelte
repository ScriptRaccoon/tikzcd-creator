<script lang="ts">
	import type { Snippet } from 'svelte'

	type Props = {
		children: Snippet
		x: number
		y: number
	}
	let { children, x, y }: Props = $props()
</script>

<div style:--x="{x}px" style:--y="{y}px">{@render children()}</div>

<style>
	div {
		position: absolute;
		left: var(--x);
		top: var(--y);
		translate: -50% -50%;
	}
</style>
