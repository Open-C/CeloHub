<script lang="ts">
	import type { Tag } from '../data/projects'

	const tagColors = ['var(--celo-gold)', 'var(--celo-violet)', 'var(--celo-red)', 'var(--celo-cyan)', 'var(--celo-blue)']

	export let tags: Tag[]

	// Display options
	export let showAllTags = false
	let showCount = 3 // number of tags to show if not showing all

	function simpleHash(str) {
		let hash = 0
		for(let i = 0; i < str.length; i++){
			hash = ((hash << 5) - hash) + str.charCodeAt(i)
			hash = hash & hash
		}
		return hash
	}

	function getTagColor(tag){
		return tagColors[Math.abs(simpleHash(tag)) % tagColors.length]
	}

	import { scale } from 'svelte/transition'
</script>

<style>
	.tags {
		--space-inner: 0.5em;

		/* gap: var(--space-inner); */
		gap: 0;
		margin: calc(-0.5 * var(--space-inner));

		display: flex;
		align-items: center;
		overflow-x: auto;
		position: relative;

		font-size: 0.8em;
	}
	.tags:not(.show-first-few) {
		flex-wrap: wrap;
	}
	.tag {
		margin: calc(0.5 * var(--space-inner));

		background-color: var(--tag-color, var(--celo-gray));
		background-image: linear-gradient(#ffffff99, #ffffff99);
		border-radius: 0.5em;
		padding: 0.3em 0.75em;
		text-align: center;
		display: inline-block;
		flex: 1 0 auto;
	}

	.other-count {
		background-color: var(--celo-gray);
		position: sticky;
		right: 0;

		box-shadow: 0 0 calc(0.6 * var(--space-inner)) calc(0.6 * var(--space-inner)) white;
	}
	/* .other-count:before {
		content: '';
		position: absolute;
		left: calc(-1 * var(--space-inner)); right: 0; top: 0; bottom: 0;
		background: linear-gradient(to left, white, transparent);
		z-index: -1;
	} */
</style>

<div class="tags" class:show-first-few={!showAllTags}>
	{#each showAllTags ? tags : tags.slice(0, showCount) as tag}
		<span class="tag" style="--tag-color: {getTagColor(tag)}" transition:scale={{duration: 300}}>{tag}</span>
	{/each}
	{#if tags.length > 3 && !showAllTags}
		<span class="tag other-count" transition:scale={{duration: 300}}>+{tags.length - showCount}</span>
	{/if}
</div>
