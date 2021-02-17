<script lang="ts">
	import type { Tag } from '../data/projects'

	const tagColors = ['var(--celo-gold)', 'var(--celo-violet)', 'var(--celo-red)', 'var(--celo-cyan)', 'var(--celo-blue)']

	export let tags: Tag[]

	// Display options
	export let showFirstFew = true

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
</script>

<style>
	.tags {
		font-size: 0.8em;
		gap: 0.5em;
		display: flex;
		align-items: center;
	}
	.tags:not(.show-first-few) {
		flex-wrap: wrap;
	}
	.tag {
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
		border-radius: 0.5em;
		padding: 0.3em 0.75em;
	}
</style>

<div class="tags" class:show-first-few={showFirstFew}>
	{#each showFirstFew ? tags.slice(0, 3) : tags as tag}
		<span class="tag" style="--tag-color: {getTagColor(tag)}">{tag}</span>
	{/each}
	{#if tags.length > 3 && showFirstFew}
		<span class="other-count">+{tags.length - 3}</span>
	{/if}
</div>
