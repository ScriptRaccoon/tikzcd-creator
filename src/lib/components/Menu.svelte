<script lang="ts">
	import {
		faArrowLeft,
		faDownLeftAndUpRightToCenter,
		faDownLong,
		faLeftLong,
		faRightLong,
		faTrash,
		faUpLong
	} from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'

	type Props = {
		clear_diagram: () => void
		move_left: () => void
		move_right: () => void
		move_up: () => void
		move_down: () => void
	}

	let { clear_diagram, move_left, move_right, move_up, move_down }: Props =
		$props()

	function ask_for_clearing() {
		const confirmed = window.confirm(
			'Are you sure that you want to clear the diagram?'
		)
		if (confirmed) {
			clear_diagram()
		}
	}
</script>

<menu>
	<button
		class="button small"
		aria-label="clear diagram"
		onclick={ask_for_clearing}
	>
		<Fa icon={faTrash} />
	</button>

	<button
		class="button small"
		aria-label="move diagram left"
		onclick={move_left}
	>
		<Fa icon={faLeftLong}></Fa>
	</button>

	<button
		class="button small"
		aria-label="move diagram right"
		onclick={move_right}
	>
		<Fa icon={faRightLong} />
	</button>

	<button class="button small" aria-label="move diagram up" onclick={move_up}>
		<Fa icon={faUpLong} />
	</button>

	<button
		class="button small"
		aria-label="move diagram down"
		onclick={move_down}
	>
		<Fa icon={faDownLong} />
	</button>
</menu>

<style>
	menu {
		position: absolute;
		left: 50%;
		bottom: 2.5rem;
		translate: -50% 0;
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	button {
		width: 2rem;
	}
</style>
