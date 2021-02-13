<!-- routify:options preload="proximity" -->

<script>
	import { isActive, url, layout } from '@roxi/routify'
	import { TabsTransition } from '@roxi/routify/decorators'
</script>

<style>
	#container {
		display: grid;
		grid-template-columns: 16em 1fr;

		--space-outer: 2em;
		--space-inner: 2em;
	}

	header {
		position: sticky;
		top: 0;

		backdrop-filter: blur(20px);

		display: grid;
		justify-content: space-between;
		grid-auto-flow: column;
		padding: var(--space-outer);
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

	aside {
		background-color: var(--celo-dark);
		color: var(--celo-light-gray);

		padding: 2em;
		height: 100vh;
		position: sticky;
		top: 0;

		display: grid;
		align-content: space-between;
	}

	nav ul {
		display: grid;
		gap: 1em;
		list-style-type: none;
	}
	nav ul ul {
		gap: 0;
		padding-left: 1em;
	}
	nav a {
		display: block;
		padding: 0.3em 0;
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
	}

	footer {
		display: flex;
		justify-content: space-between;
		padding: var(--space-outer);

		background-color: var(--celo-dark);
		color: var(--celo-light-gray);
	}
</style>

<div id="container">
	<aside>
		<nav>
			<ul>
				{#each console.log($layout.children) || $layout.children as { path, title, children }}
					<li>
						<a class:active={$isActive(path)} href={$url(path)}>{title}</a>
						{#if children}
							<ul>
								{#each console.log(children) || children as { path, title }}
									<li class:active={$isActive(path)}>
										<a href={$url(path)}>{title}</a>
									</li>
								{/each}
							</ul>
						{/if}
					</li>
				{/each}
			</ul>
		</nav>
		<button>Submit a Project</button>
	</aside>
	<div class="main-column">
		<header>
			<a href={$url('/')} id="logo">
				<h1>CeloHub</h1>
				<span class="divider">|</span>
				<span class="tagline">To Prosperity & Beyond</span>
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
