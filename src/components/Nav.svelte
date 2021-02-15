<script>
	import { isActive, url, layout } from '@roxi/routify'
</script>

<style>
	ul {
		display: grid;
		gap: 1em;
		list-style-type: none;
	}
	ul ul {
		gap: 0;
		padding-left: 1em;
	}

	a {
		display: block;
		padding: 0.3em 0;
	}
</style>

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
