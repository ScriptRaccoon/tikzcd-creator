<script lang="ts">
	import Dialog from '$lib/components/Dialog.svelte'
	import Heading from '$lib/components/Heading.svelte'
	import './app.css'
</script>

<svelte:head>
	<title>tikzcd creator</title>
	<meta
		name="description"
		content="Create TikZ commutative diagrams visually"
	/>

	<meta property="og:title" content="tikzcd creator" />
	<meta
		property="og:description"
		content="Create TikZ commutative diagrams visually"
	/>
	<meta property="og:url" content="https://tikzcd-creator.netlify.app/" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="tikzcd creator" />

	<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<link rel="shortcut icon" href="/favicon.ico" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<meta name="apple-mobile-web-app-title" content="MyWebSite" />
	<link rel="manifest" href="/site.webmanifest" />
</svelte:head>

<Heading />

<slot />

<Dialog />
