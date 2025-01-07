<!-- https://github.com/ScriptRaccoon/dialog-svelte -->

<script lang="ts" context="module">
	import { get, writable } from 'svelte/store'

	let dialog: HTMLDialogElement

	const dialog_state = writable<Dialog_State | null>(null)
	const visible = writable<boolean>(false)

	type Dialog_State = {
		confirm?: { text: string; action: () => void } | null
		cancel?: { text: string; action: () => void } | null
		modal: boolean
		text: string
	}

	const DEFAULT_STATE: Dialog_State = {
		confirm: { text: 'Ok', action: () => {} },
		cancel: { text: 'Cancel', action: () => {} },
		modal: false,
		text: '',
	}

	export function open_dialog(options: Partial<Dialog_State>): void {
		const all_options = { ...DEFAULT_STATE, ...options }
		dialog_state.set(all_options)

		if (all_options.modal) {
			dialog?.showModal()
		} else {
			dialog?.show()
		}

		visible.set(true)
	}

	export function close_dialog(): void {
		visible.set(false)
		dialog.addEventListener('transitionend', _close, { once: true })
	}

	function _close(): void {
		if (get(visible)) return
		dialog_state.set(null)
		dialog?.close()
	}
</script>

<script lang="ts">
	function confirm(): void {
		if ($dialog_state?.confirm) {
			$dialog_state.confirm.action()
		}
		close_dialog()
	}

	function cancel(): void {
		if ($dialog_state?.cancel) {
			$dialog_state.cancel.action()
		}
		close_dialog()
	}

	function handle_keydown(e: KeyboardEvent): void {
		if ($dialog_state?.modal && e.key === 'Escape') {
			e.preventDefault()
			cancel()
		}
	}
</script>

<svelte:window on:keydown={handle_keydown} />

<dialog
	bind:this={dialog}
	class:visible={$visible}
	class:modal={$dialog_state?.modal}
>
	<p>
		{$dialog_state?.text}
	</p>

	<menu>
		{#if $dialog_state?.cancel}
			<button class="button" on:click={cancel}>
				{$dialog_state?.cancel.text}
			</button>
		{/if}

		{#if $dialog_state?.confirm}
			<button class="button" on:click={confirm}>
				{$dialog_state?.confirm.text}
			</button>
		{/if}
	</menu>
</dialog>

<style>
	dialog {
		width: min(90vw, 24rem);
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, calc(-50% - 1rem));
		opacity: 0;
		padding: 1rem;
		text-align: center;
		font-size: 1.25rem;
		border: none;
		border-radius: 0.25rem;
		transition:
			opacity 250ms,
			transform 250ms;
		box-shadow: 0rem 0rem 2rem #000e;
		background-color: var(--card-color);
		color: var(--font-color);
	}

	dialog.modal {
		box-shadow:
			0rem 0rem 2rem #000e,
			0 0 0 100vmax #0004;
	}

	dialog.visible {
		opacity: 1;
		transform: translate(-50%, -50%);
	}

	dialog:focus-visible {
		outline: 0.15rem solid var(--font-color);
		outline-offset: 0.2rem;
	}

	menu {
		display: flex;
		justify-content: center;
		gap: 0.75rem;
		margin-top: 1rem;
		font-size: 1rem;
	}
</style>
