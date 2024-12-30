export const STEPS = [
	{
		message:
			'<b>Welcome!</b> This editor will help you create code for <a href="https://ctan.org/pkg/tikz-cd" target="_blank">tikzcd</a> diagrams.',
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
			'<b>Create labels for the nodes.</b> Click on a node to edit its label. You can use LaTeX.',
		button_labels: { prev: 'Back', next: 'Next' }
	},
	{
		message:
			'<b>Create labels for the arrows.</b> Click on the circles to edit the labels. You can use LaTeX.',
		button_labels: { prev: 'Back', next: 'Next' }
	},
	{
		message: 'The diagram is complete! The code has been generated.',
		button_labels: { prev: 'Back', next: 'Start over' }
	}
] as const satisfies {
	message: string
	button_labels: { prev: string | null; next: string | null }
}[]
