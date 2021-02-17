<script lang="ts">
	import { goto, page, url } from '@roxi/routify'

	function getFragments(page: ClientNodeApi){
		return (page.parent?.title ? getFragments(page.parent) : []).concat(page)
	}

	function capitalize(str){
		return str.split(' ').map(str => str[0].toUpperCase() + str.slice(1)).join(' ')
	}

	$: fragments = getFragments($page)
	$: ancestors = fragments.slice(0, -1)
	$: childPage = fragments.slice(-1)[0]
	$: siblings = ancestors.slice(-1)[0]?.children

	$: selectedPath = childPage.path
</script>

<style>
	.breadcrumb {
		gap: 0.25em;
	}
</style>

<span class="breadcrumb row">
	{#each ancestors as ancestorPage}
		<a href={$url(ancestorPage.path)}>{capitalize(ancestorPage.title)}</a>
		<span>›</span>
	{/each}
	{#if siblings?.length}
		<select bind:value={selectedPath} on:change={e => $goto(e.target.value)}>
			{#each siblings as siblingPage}
				<option value={siblingPage.path}>{capitalize(siblingPage.title)}</option>
			{/each}
		</select>
	{:else}
		<span>{childPage.title}</span>
	{/if}
</span>
