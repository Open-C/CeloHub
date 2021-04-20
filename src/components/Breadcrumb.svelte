<script lang="ts">
	import { goto, page, url } from '@roxi/routify'

	function getAncestors(page: ClientNodeApi){
		return page.parent?.title ? getAncestors(page.parent).concat(page.parent) : []
	}

	function capitalize(str){
		return str ? str.split(' ').map(str => str[0].toUpperCase() + str.slice(1)).join(' ') : ''
	}

	$: currentPage = $page.path.endsWith('index') ? $page.parent : $page
	$: ancestors = getAncestors(currentPage)
	$: siblings = currentPage.parent?.children

	$: selectedPath = currentPage.path
</script>

<style>
	.breadcrumb {
		gap: 0.25em;
	}
</style>

{#if currentPage}
	<span class="breadcrumb bar">
		{#each ancestors as ancestorPage}
			<a href={$url(ancestorPage.path)}>{capitalize(ancestorPage.title)}</a>
			<span>›</span>
		{/each}
		{#if siblings?.length}
			<select value={selectedPath} on:change={e => $goto(e.target.value)}>
				{#each siblings as siblingPage}
					<option value={siblingPage.path}>{capitalize(siblingPage.title)}</option>
				{/each}
			</select>
		{:else}
			<span>{capitalize(currentPage.title)}</span>
		{/if}
	</span>
{/if}
