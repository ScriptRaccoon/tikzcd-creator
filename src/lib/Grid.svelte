<script lang="ts">
	let size = $state({ x: 1, y: 1 });
	const padding = 25;

	$effect(() => {
		size.x = Math.floor((window.innerWidth - 2 * padding) / 100);
		size.y = Math.floor((window.innerHeight - 2 * padding) / 100);
	});
</script>

<div class="grid-wrapper">
	<div class="grid" style:--x={size.x} style:--y={size.y}>
		{#each { length: size.y } as _, y}
			{#each { length: size.x } as _, x}
				<span class="tile">
					{#if y > 0 && x > 0}
						<button aria-label="create node here" class="node">
							<div class="node-inner"></div>
						</button>
					{/if}
				</span>
			{/each}
		{/each}
	</div>
</div>

<style>
	.grid-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100vh;
	}

	.grid {
		display: inline-grid;
		grid-template-columns: repeat(var(--x), 100px);
		grid-template-rows: repeat(var(--y), 100px);
		outline: 1px solid #333;
	}

	.tile {
		border: 1px solid #333;
	}

	.node {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		transform: translate(-50%, -50%);
	}

	.node-inner {
		width: 20px;
		height: 20px;
		background-color: white;
		border-radius: 50%;
		opacity: 0;
		scale: 0.25;

		transition:
			opacity 200ms,
			scale 200ms;
	}

	.node:hover .node-inner {
		opacity: 1;
		scale: 1;
	}
</style>
