<!-- routify:options preload="proximity" -->

<script>
	import { isActive, url, layout } from '@roxi/routify'
	import { TabsTransition } from '@roxi/routify/decorators'

	let sidebarIsOpen = false

	import Nav from '../components/Nav.svelte'
</script>

<style>
	#container {
		--sidebar-width: 14em;
		--sidebar-button-width: 3em;

		--space-outer: 2em;
		--space-inner: 1.75em;

		display: grid;
		grid-template-columns: var(--sidebar-width) minmax(0, 1fr);
	}

	header {
		position: sticky;
		top: 0;
		z-index: 1;
		backdrop-filter: blur(20px);

		display: grid;
		justify-content: space-between;
		align-items: center;
		justify-items: center;
		grid-auto-flow: column;

		padding: var(--space-outer);
		padding-bottom: calc(var(--space-outer) * 0.5);
	}
	header:before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		background-color: var(--background-color);
		opacity: 0.85;
	}

	#logo {
		display: grid;
		grid-auto-flow: column;
		gap: 0.75em;
		line-height: 1;
		align-items: center;
		color: inherit;
		/* font-size: 1.3em; */
		text-decoration: none;
	}
	#logo:hover, #logo:active {
		opacity: 0.75;
	}
	#logo h1 {
		font-size: 1.9em;
	}
	#logo .divider {
		font-size: 1.75em;
		opacity: 0.4;
		border-right: 2px solid;
		height: 1em;
	}
	#logo .tagline {
		font-size: 1.3em;
		opacity: 0.6;
	}


	input[type="search"] {
		min-width: 14em;
	}


	.sidebar {
		background-color: var(--celo-dark);
		color: var(--celo-light-gray);

		padding: 2em;
		gap: 2em;
		width: var(--sidebar-width);
		height: 100vh;
		position: sticky;
		top: 0;

		display: grid;
		grid-template-rows: minmax(0, 1fr) auto;
		/* align-content: space-between; */

		transition: 0.15s;
	}
	.sidebar-button, .sidebar-backdrop {
		display: none;
	}

	.main-column {
		display: flex;
		flex-direction: column;
	}

	main {
		flex: 1;
		padding: var(--space-outer);
		padding-top: calc(var(--space-outer) * 0.5);

		display: grid;
		gap: var(--space-inner);
		align-content: start;
	}

	footer {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: var(--space-outer);

		background-color: var(--celo-dark);
		color: var(--celo-light-gray);
	}


	@media (max-width: 57rem) {
		#container {
			display: grid;
			grid-template-columns: 0 minmax(0, 1fr);
			--space-outer: 1.5em;
			--space-inner: 1.25em;
		}

		.sidebar {
			position: sticky;
			top: 0;
			z-index: 2;
			outline: none;
			will-change: transform;
			transform: translateX(-100%);

			opacity: 0.97;
		}
		.sidebar.is-open, .sidebar:focus-within {
			transform: translateX(0);
		}
		.sidebar-button {
			content: '☰';

			display: flex;
			justify-content: center;
			align-items: center;
			width: var(--sidebar-button-width);
			height: 3em;

			background: inherit;
			border-top-right-radius: 0.25em;
			border-bottom-right-radius: 0.25em;

			position: absolute;
			left: calc(100% + var(--space-inner));
			left: 100%;
			top: var(--space-inner);

			cursor: pointer;
		}
		.sidebar-backdrop, .sidebar-backdrop:before {
			display: block;
			position: fixed;
			inset: 0;

			transition: 0.3s;

			z-index: 1;
			pointer-events: none;
		}
		.sidebar-backdrop:before {
			content: '';
			position: fixed;
			inset: 0;

			background-color: var(--celo-gold);
			opacity: 0;
		}
		.sidebar.is-open ~ .sidebar-backdrop,
		.sidebar:focus-within ~ .sidebar-backdrop {
			backdrop-filter: blur(2px);
			pointer-events: initial;
		}
		.sidebar.is-open ~ .sidebar-backdrop:before,
		.sidebar:focus-within ~ .sidebar-backdrop:before {
			opacity: 0.5;
		}

		#logo {
			margin-left: var(--sidebar-button-width);
		}
	}

	/* Move search field */
	@media (max-width: 45rem) {
		header {
			grid-template-columns: 1fr 0;
		}
		.search-form {
			justify-self: end;
		}
		input[type="search"] {
			/* position: absolute;
			right: 0; */
			transition: transform 0.3s;
			min-width: 50vw;
			padding-left: 1em;
			z-index: 1;
		}
		input[type="search"]:not(:focus) {
			transform: translateX(calc(100% - var(--sidebar-button-width) + var(--space-outer)));
		}

		#logo {
			margin-left: 0;
		}
	}

	@media (max-width: 30rem) {
		#container {
			--space-outer: 1.25em;
		}

		#logo {
			grid-auto-flow: row;
			text-align: center;
			gap: 0.5em;
		}
		#logo .divider {
			display: none;
		}
		#logo .tagline {
			font-size: 0.8em;
		}

		main {
			font-size: 0.8em;
		}
	}
</style>

<div id="container">
	<aside class="sidebar" class:is-open={sidebarIsOpen}>
		<Nav />
		<button>Submit a Project</button>
		<span class="sidebar-button" on:click={() => sidebarIsOpen = !sidebarIsOpen}>☰</span>
	</aside>
	<span class="sidebar-backdrop" on:click={() => sidebarIsOpen = !sidebarIsOpen}></span>

	<div class="main-column">
		<header>
			<a href={$url('/')} id="logo">
				<h1>CeloHub</h1>
				<span class="divider">
					<!-- | -->
				</span>
				<p class="tagline">To Prosperity & Beyond</p>
			</a>
			<form class="search-form">
				<input type="search" placeholder="🔍 Search CeloHub..." />
			</form>
		</header>

		<main>
			<!-- <slot decorator={TabsTransition} /> -->
			<slot />
		</main>

		<footer>
			<span>Made with <img alt="love"> by OpenC</span>
			<a href="https://github.com" targt="_blank">GitHub</a>
			<!-- <span style="overflow: hidden; text-overflow: ellipsis">Donate: 0x0000000000000000000000000000000000000000</span> -->
		</footer>
	</div>
</div>
