declare global {
	interface Window {
		MathJax?: {
			tex2svg: (input: string, options: { display: boolean }) => HTMLElement
		}
	}
}

export {}
