export const step = $state({
	value: 0,
	increase: () => {
		step.value += 1;
	},
	reset: () => {
		step.value = 1;
	}
});
