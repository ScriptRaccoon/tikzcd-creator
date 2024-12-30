<script lang="ts">
	import Fa from 'svelte-fa'
	import {
		faClipboard,
		faClipboardCheck,
		faWandMagicSparkles
	} from '@fortawesome/free-solid-svg-icons'

	import type { Diagram } from '$lib/types'
	import { get_tikzcd_code } from '$lib/code-generator'
	import { normalize } from '$lib/normalize'

	type Props = {
		diagram: Diagram
	}

	let { diagram }: Props = $props()

	let normalized = $state<boolean>(false)

	let tikzcd_code = $derived(
		get_tikzcd_code(normalized ? normalize(diagram) : diagram)
	)

	let copied = $state<boolean>(false)

	async function copy_code() {
		await navigator.clipboard.writeText(tikzcd_code)
		copied = true
		setTimeout(() => {
			copied = false
		}, 1200)
	}

	function toggle_normalization() {
		normalized = !normalized
	}
</script>

<div class="wrapper">
	<pre class="code" class:copied>{tikzcd_code}</pre>
	<div class="actions">
		<button class="small button" onclick={toggle_normalization}>
			<Fa icon={faWandMagicSparkles} />
			{#if normalized}
				Denormalize
			{:else}
				Normalize
			{/if}
		</button>
		<button class="small button" onclick={copy_code} aria-live="polite">
			<Fa icon={copied ? faClipboardCheck : faClipboard} />
			Copy
		</button>
	</div>
</div>

<style>
	.wrapper {
		margin-top: 1rem;
	}

	.code {
		width: 100%;
		padding: 0.5rem 0.75rem;
		font-size: 1rem;
		display: inline-block;
		overflow-x: scroll;
		background-color: black;
	}

	.code.copied {
		color: var(--accent-color);
	}

	.actions {
		margin-top: 0.25rem;
		display: flex;
		justify-content: space-between;
	}
</style>
