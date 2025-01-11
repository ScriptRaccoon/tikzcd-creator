<script lang="ts">
	import {
		faCheckCircle,
		faDownLong,
		faLeftLong,
		faMinus,
		faPlus,
		faRightLong,
		faShare,
		faTrash,
		faUpLong,
	} from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
	import { fly } from 'svelte/transition'
	import { open_dialog } from './Dialog.svelte'

	type Props = {
		clear_diagram: () => void
		move: (axis: 'x' | 'y', value: 1 | -1) => void
		zoom: (value: -1 | 1) => void
		share_URL: () => void
	}

	let { clear_diagram, move, zoom, share_URL }: Props = $props()

	function ask_for_clearing() {
		open_dialog({
			modal: true,
			text: 'Do you really want to clear the diagram?',
			confirm: { text: 'Yes', action: clear_diagram },
		})
	}

	let copied_URL = $state(false)

	function copy_URL() {
		share_URL()
		copied_URL = true
		setTimeout(() => {
			copied_URL = false
		}, 2000)
	}
</script>

<menu transition:fly={{ y: 50, duration: 200, delay: 200 }}>
	<button
		class="small button"
		aria-label="clear diagram"
		onclick={ask_for_clearing}
	>
		<Fa icon={faTrash} />
	</button>

	<button
		class="small button"
		aria-label="move diagram left"
		onclick={() => move('x', -1)}
	>
		<Fa icon={faLeftLong}></Fa>
	</button>

	<button
		class="small button"
		aria-label="move diagram right"
		onclick={() => move('x', 1)}
	>
		<Fa icon={faRightLong} />
	</button>

	<button
		class="small button"
		aria-label="move diagram up"
		onclick={() => move('y', -1)}
	>
		<Fa icon={faUpLong} />
	</button>

	<button
		class="small button"
		aria-label="move diagram down"
		onclick={() => move('y', 1)}
	>
		<Fa icon={faDownLong} />
	</button>

	<button class="small button" aria-label="zoom in" onclick={() => zoom(1)}>
		<Fa icon={faPlus} />
	</button>

	<button class="small button" aria-label="zoom out" onclick={() => zoom(-1)}>
		<Fa icon={faMinus} />
	</button>

	<button
		class="small button"
		aria-label="share URL"
		onclick={copy_URL}
		aria-live="assertive"
	>
		{#if copied_URL}
			<div transition:fly={{ y: 20, duration: 100 }} class="copied">
				Copied URL to clipboard
			</div>
		{/if}

		<Fa icon={copied_URL ? faCheckCircle : faShare} />
	</button>
</menu>

<style>
	menu {
		width: 100%;
		position: absolute;
		bottom: 1rem;
		display: flex;
		justify-content: space-evenly;
		flex-wrap: wrap;
	}

	button {
		width: 2rem;
		position: relative;
	}

	@media (min-width: 600px) {
		menu {
			bottom: 2.5rem;
			justify-content: center;
			gap: 1rem;
		}
	}

	.copied {
		width: max-content;
		position: absolute;
		bottom: 175%;
		right: 0;
		color: var(--font-color);
	}
</style>
