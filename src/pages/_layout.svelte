<!-- routify:options preload="proximity" -->

<script>
	import { beforeUrlChange, isActive, url, layout } from '@roxi/routify'
	import { TabsTransition } from '@roxi/routify/decorators'

	let sidebarIsOpen = false

	$beforeUrlChange((event, store) => {
		sidebarIsOpen = false
		// Lose focus
		document.activeElement.blur()
		return true
	})

	import Nav from '../components/Nav.svelte'
</script>

<style>
	#container {
		--sidebar-width: 14em;
		--sidebar-button-width: 3em;

		--space-outer: 2rem;
		--space-inner: 1.75rem;
		--header-height: calc(var(--space-outer) * 2 + 2.75em);

		display: grid;
		grid-template-columns: var(--sidebar-width) minmax(0, 1fr);
	}

	header {
		display: grid;
		justify-content: space-between;
		align-items: center;
		justify-items: center;
		grid-auto-flow: column;

		padding: var(--space-outer);

		height: var(--header-height);
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

		width: var(--sidebar-width);
		height: 100vh;
		position: sticky;
		top: 0;
		padding: var(--space-outer);

		display: grid;
		grid-template-rows: minmax(0, 1fr) auto;
		/* align-content: space-between; */

		transition: 0.15s;
	}
	.sidebar-content {
		display: grid;
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
		padding-top: 0;

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
			--space-outer: 1.5rem;
			--space-inner: 1.25rem;
		}

		.sidebar {
			position: sticky;
			top: 0;
			z-index: 3;
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
			left: 0; right: 0; top: 0; bottom: 0;

			transition: 0.3s;

			z-index: 2;
			pointer-events: none;
		}
		.sidebar-backdrop:before {
			content: '';
			position: fixed;
			inset: 0;

			/* background-color: var(--celo-gold); */
			background-color: var(--celo-dark);
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
			--space-outer: 1.25rem;
		}

		.main-column {
			font-size: 0.8em;
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
	}
</style>

<div id="container">
	<aside class="sidebar" class:is-open={sidebarIsOpen}>
		<Nav />
		<div class="sidebar-content">
			<button>Submit a Project</button>
		</div>
		<span class="sidebar-button" on:click={() => sidebarIsOpen = !sidebarIsOpen}>☰</span>
	</aside>
	<span class="sidebar-backdrop" on:click={() => sidebarIsOpen = !sidebarIsOpen}></span>

	<div class="main-column">
		<header class="sticky">
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
			<span>Made with <img alt="love" src="/images/branding/heart.png" width="20" style="vertical-align: -0.15em"> by OpenC</span>
			<a href="https://github.com/Open-C/celohub" target="_blank">GitHub</a>
			<!-- <span style="overflow: hidden; text-overflow: ellipsis">Donate: 0x0000000000000000000000000000000000000000</span> -->
		</footer>
	</div>
</div>
