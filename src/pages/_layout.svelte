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
		--space-inner: 2em;

		display: grid;
		grid-template-columns: var(--sidebar-width) minmax(0, 1fr);
	}

	header {
		position: sticky;
		top: 0;
		backdrop-filter: blur(20px);

		display: grid;
		justify-content: space-between;
		align-items: center;
		grid-auto-flow: column;
		padding: var(--space-outer);
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
		gap: 0.5em;
		align-items: baseline;
		color: inherit;
	}
	#logo h1 {
		font-size: 1.75em;
	}
	#logo .divider {
		font-size: 2em;
	}
	#logo .tagline {
		font-size: 1.3em;
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
		align-content: space-between;

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

		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(18em, 1fr));
		gap: var(--space-inner);
		align-content: start;
	}

	footer {
		display: flex;
		justify-content: space-between;
		padding: var(--space-outer);

		background-color: var(--celo-dark);
		color: var(--celo-light-gray);
	}


	@media (max-width: 40rem) {
		#container {
			display: grid;
			grid-template-columns: 0 minmax(0, 1fr);
			--space-outer: 1.5em;
			--space-inner: 1.5em;
		}

		.no-mobile {
			display: none;
		}

		.sidebar {
			position: sticky;
			top: 0;
			z-index: 2;
			outline: none;
			will-change: transform;
			transform: translateX(-100%);
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
				<span class="divider no-mobile">|</span>
				<span class="tagline no-mobile">To Prosperity & Beyond</span>
			</a>
			<div>
				<input type="search" placeholder="Search CeloHub" />
			</div>
		</header>

		<main>
			<!-- <slot decorator={TabsTransition} /> -->
			<slot />
		</main>

		<footer>
			<span>Made with <img alt="love"> by OpenC</span>
			<a href="https://github.com" targt="_blank">GitHub</a>
			<span>Donate: 0x0000000000000000000000000000000000000000</span>
		</footer>
	</div>
</div>
