<script lang="ts">
	import type { Tag } from '../data/projects'

	const tagColors = ['var(--celo-gold)', 'var(--celo-violet)', 'var(--celo-red)', 'var(--celo-cyan)', 'var(--celo-blue)']

	export let tags: Tag[]

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
		font-size: 0.85em;
		gap: 0.5em;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
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
</style>

<div class="tags">
	{#each tags as tag}
		<span class="tag" style="--tag-color: {getTagColor(tag)}">{tag}</span>
	{/each}
</div>
