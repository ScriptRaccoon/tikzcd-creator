<script lang="ts">
	import {
		faDownLong,
		faLeftLong,
		faMinus,
		faPlus,
		faRightLong,
		faTrash,
		faUpLong
	} from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
	import { fly } from 'svelte/transition'

	type Props = {
		clear_diagram: () => void
		move_left: () => void
		move_right: () => void
		move_up: () => void
		move_down: () => void
		zoom: (value: -1 | 1) => void
	}

	let {
		clear_diagram,
		move_left,
		move_right,
		move_up,
		move_down,
		zoom
	}: Props = $props()

	function ask_for_clearing() {
		const confirmed = window.confirm(
			'Are you sure that you want to clear the diagram?'
		)
		if (confirmed) {
			clear_diagram()
		}
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
		onclick={move_left}
	>
		<Fa icon={faLeftLong}></Fa>
	</button>

	<button
		class="small button"
		aria-label="move diagram right"
		onclick={move_right}
	>
		<Fa icon={faRightLong} />
	</button>

	<button class="small button" aria-label="move diagram up" onclick={move_up}>
		<Fa icon={faUpLong} />
	</button>

	<button
		class="small button"
		aria-label="move diagram down"
		onclick={move_down}
	>
		<Fa icon={faDownLong} />
	</button>

	<button class="small button" aria-label="zoom in" onclick={() => zoom(1)}>
		<Fa icon={faPlus} />
	</button>

	<button class="small button" aria-label="zoom out" onclick={() => zoom(-1)}>
		<Fa icon={faMinus} />
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
		gap: 0.5rem 0.5rem;
	}

	button {
		width: 2rem;
	}

	@media (min-width: 600px) {
		menu {
			bottom: 2.5rem;
			justify-content: center;
			gap: 1rem;
		}
	}
</style>
