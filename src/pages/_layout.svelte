<!-- routify:options preload="proximity" -->

<script>
	import { setContext } from 'svelte'
	import { writable } from 'svelte/store'
	
	const searchQuery = writable('')
	setContext('searchQuery', searchQuery)
	
	
	import { beforeUrlChange, isActive, url, layout } from '@roxi/routify'

	let sidebarIsOpen = false

	$beforeUrlChange((event, store) => {
		sidebarIsOpen = false
		// Lose focus
		document.activeElement.blur()
		return true
	})


	import Nav from '../components/Nav.svelte'
	import { fly } from 'svelte/transition'
	import { TabsTransition } from '@roxi/routify/decorators'
</script>

<style>
	#container {
		--sidebar-width: 13em;
		--sidebar-button-width: 3em;
		--sidebar-button-height: 3em;

		--space-outer: 2rem;
		--space-inner: 1.75rem;
		--header-space-outer-vertical: 1rem;
		--header-height: calc(var(--header-space-outer-vertical) * 2 + 3em);

		display: grid;
		grid-template-columns: var(--sidebar-width) minmax(0, 1fr);
	}

	header {
		display: grid;
		justify-content: space-between;
		align-items: center;
		justify-items: center;
		grid-auto-flow: column;

		padding: var(--header-space-outer-vertical) var(--space-outer);

		height: var(--header-height);
		z-index: 2;
	}
	header:after {
		content: '';
		position: absolute;
		--inset: -0.5em;
		inset: var(--inset); left: var(--inset); right: var(--inset); top: var(--inset); bottom: 0;
		transform: rotate(-0.5deg);
		background: no-repeat right / contain url(/images/branding/evolving-celo.png);
		opacity: 0.15;
		pointer-events: none;
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
		min-width: 16em;
		min-width: 35vw;
		text-indent: 2em;
		background-color: rgba(255, 255, 255, 0.75);
		background-repeat: no-repeat;
		background-position: 1em center;
		background-size: 1.2em;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%23666'%3E%3Cpath d='M19.023 16.977a35.13 35.13 0 01-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0016 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z' /%3E%3C/svg%3E");
		z-index: 1;
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

		/* Hack because of 100vh mobile Webkit bug */
		position: sticky;
		bottom: var(--space-outer);
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
		gap: 0.25em 1em;

		background-color: var(--celo-dark);
		color: var(--celo-light-gray);
	}

	footer img {
		vertical-align: -0.25em;
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
			z-index: 4;
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
			height: var(--sidebar-button-height);

			background: inherit;
			border-top-right-radius: 0.25em;
			border-bottom-right-radius: 0.25em;

			position: absolute;
			left: calc(100% + var(--space-inner));
			left: 100%;
			top: var(--header-space-outer-vertical);

			cursor: pointer;
		}
		.sidebar-backdrop, .sidebar-backdrop:before {
			display: block;
			position: fixed;
			inset: 0;
			left: 0; right: 0; top: 0; bottom: 0;

			transition: 0.3s;

			z-index: 3;
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
		input[type="search"] {
			width: calc(100vw - var(--sidebar-button-width) - var(--space-outer) * 2 - var(--space-inner));
			justify-self: end;
			transition: transform 0.3s;
			background-color: rgba(255, 255, 255, 1);
		}
		input[type="search"]:not(:focus):not(.is-searching) {
			transform: translateX(calc(100% - var(--sidebar-button-width) + var(--space-outer)));
		}

		#logo {
			margin-left: 0;
		}
	}

	@media (max-width: 30rem) {
		#container {
			--space-outer: 1.25rem;
			--sidebar-button-width: calc(3em * 0.8);
			--sidebar-button-height: calc(3em * 0.8);
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
			<a href="https://forms.gle/uWFvLtXqQ2huEfPA9" target="_blank"><button>Submit a Project</button></a>
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

			{#if $url(), globalThis.location.pathname !== '/'}
				<input type="search"
					bind:value={$searchQuery}
					class:is-searching={$searchQuery}
					placeholder="Search Projects..."
					in:fly={{duration: 300, x: -20, opacity: 0}}
					out:fly={{duration: 300, x: 20, opacity: 0}}
				/>
			{/if}
		</header>

		<main>
			<!-- <slot decorator={TabsTransition} /> -->
			<slot />
		</main>

		<footer>
			<p>
				<strong>CeloHub</strong>
				<span> • </span>
				<span>Made with <img alt="love" src="/images/branding/heart.png" width="20" style="vertical-align: -0.15em"> by <a href="https://github.com/Open-C" target="_blank">OpenC <img alt="OpenC" src="/images/branding/OpenC-Logo.png" width="20"></a></span>
			</p>
			<p>
				<a href="https://github.com/Open-C/CeloHub" target="_blank"><img src="/images/link-icons/GitHub-Logo-Round.png" alt="CeloHub on GitHub" width="20" /> GitHub</a>
			</p>
		</footer>
	</div>
</div>
