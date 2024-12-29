<script lang="ts">
	import { fade } from 'svelte/transition'

	import { get_tikzcd_code } from '$lib/code-generator'
	import type { Diagram } from '$lib/types'

	type Props = {
		diagram: Diagram
	}

	let { diagram }: Props = $props()

	let tikzcd_code = $derived(get_tikzcd_code(diagram))

	let copied = $state<boolean>(false)

	let copy_text = $derived(copied ? 'Copied!' : 'Copy code')

	async function copy_code() {
		await navigator.clipboard.writeText(tikzcd_code)
		copied = true
		setTimeout(() => {
			copied = false
		}, 1200)
	}
</script>

<div class="wrapper" transition:fade={{ duration: 200 }}>
	<button class="button" onclick={copy_code} aria-live="polite">
		{copy_text}
	</button>

	<code class="code" class:copied>
		{tikzcd_code}
	</code>
</div>

<style>
	.wrapper {
		position: absolute;
		left: 50%;
		bottom: 4rem;
		translate: -50% 0;
		display: grid;
	}

	.code {
		padding: 1rem;
		background-color: black;
		border-radius: 0.5rem;
		box-shadow: 0 0 1rem var(--shadow-color);
		font-size: 1.5rem;
		width: min(95vw, 40rem);
		transition: color 100ms;
	}

	.code.copied {
		color: var(--accent-color);
	}
</style>
