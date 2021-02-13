<script lang="ts">
	import type { Tag } from '../data/projects'

	const tagColors = ['#99e7be', '#d5d0ff', '#d6e1ff', '#ffc6aa', '#ffd6f2', '#e5e5e5']

	export let tags: Tag[]

	function getTagColor(tag){
		tagColors
		// return await crypto.subtle.digest('SHA-1', new TextEncoder().encode(tag))
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
		border-radius: 0.5em;
		padding: 0.35em 0.75em;
		text-align: center;
		display: inline-block;
		flex: 1 0 auto;
	}
</style>

<div class="tags">
	{#each tags as tag}
		<span class="tag">{tag}</span>
		<!-- <span class="tag" style="--tag-color: {getTagColor(tag)}">{tag}</span> -->
	{/each}
</div>
