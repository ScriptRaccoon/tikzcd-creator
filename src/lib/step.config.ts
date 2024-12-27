export const STEPS = [
	{
		message:
			'Welcome!<br>This app will help you create code for tikzcd diagrams.',
		button_labels: { prev: null, next: 'Start' }
	},
	{
		message:
			'<b>Create the nodes.</b> Click on the canvas to add or remove them.',
		button_labels: { prev: 'Back', next: 'Next' }
	},
	{
		message:
			'<b>Create the arrows.</b> Click on two nodes serving as start and end of an arrow. Click on the middle of an arrow to remove it.',
		button_labels: { prev: 'Back', next: 'Next' }
	},
	{
		message:
			'<b>Create labels for the nodes.</b> Click on a node to edit its label.',
		button_labels: { prev: 'Back', next: 'Next' }
	},
	{ message: 'Done!', button_labels: { prev: 'Back', next: 'Start over' } }
] as const satisfies {
	message: string;
	button_labels: { prev: string | null; next: string | null };
}[];
