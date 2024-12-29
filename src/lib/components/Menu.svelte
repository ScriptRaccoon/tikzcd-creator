<script lang="ts">
	import { faTrash } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'

	type Props = {
		clear_diagram: () => void
	}

	let { clear_diagram }: Props = $props()

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
	<button class="button small" onclick={ask_for_clearing}>
		<Fa icon={faTrash} />
		<span>Clear diagram</span>
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

	button span {
		margin-left: 0.25rem;
	}
</style>
