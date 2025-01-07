import { arrow_variants } from './constants'

export const STEPS = [
	{
		summary: 'Welcome!',
		message:
			'This editor will help you create code for <a href="https://ctan.org/pkg/tikz-cd" target="_blank">tikzcd</a> diagrams, step by step.<br>The code of this application can be found on <a href="https://github.com/ScriptRaccoon/tikzcd-creator" target="_blank">GitHub</a>. There you also find a walkthrough video.',
		button_labels: { prev: null, next: 'Start' },
	},
	{
		summary: 'Create the nodes.',
		message:
			'Click on the <i>intersections</i> of the grid lines to add or remove them.',
		button_labels: { prev: 'Back', next: 'Next' },
	},
	{
		summary: 'Create the arrows.',
		message:
			'Click on two nodes serving as start and end of an arrow. Click on the middle of an arrow to remove it.',
		button_labels: { prev: 'Back', next: 'Next' },
	},
	{
		summary: 'Change the arrow types.',
		message: `Click on an arrow to change its type if required. Currently ${arrow_variants.length} types are supported.`,
		button_labels: { prev: 'Back', next: 'Next' },
	},
	{
		summary: 'Create labels for the nodes.',
		message: 'Click on a node to edit its label. You can use LaTeX.',
		button_labels: { prev: 'Back', next: 'Next' },
	},
	{
		summary: 'Create labels for the arrows.',
		message: 'Click on the circles to edit the labels. You can use LaTeX.',
		button_labels: { prev: 'Back', next: 'Finish' },
	},
	{
		summary: 'Diagram complete.',
		message: 'The code has been generated.',
		button_labels: { prev: 'Back', next: 'Start over' },
	},
] as const satisfies {
	summary: string
	message: string
	button_labels: { prev: string | null; next: string | null }
}[]
