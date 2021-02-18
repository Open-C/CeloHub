<script lang="ts">
	import type { Project } from '../data/projects'

	const icons = {
		github: '/images/link-icons/GitHub-Logo-Round.png',
		android: '/images/link-icons/Android-Logo-Round@3x.png',
		iOS: '/images/link-icons/Apple-Logo-Round@3x.png',
		mpesa: '/images/link-icons/MPesa-Logo-Round@3x.png',
		mtn: '/images/link-icons/MTN-Logo-Round@3x.png',
		website: '/images/link-icons/Web-Logo-Round@3x.png'
	}

	export let project: Project

	// Display options
	export let showTags = true
	export let showAllTags = false

	import Tags from './Tags.svelte'
	import { scale } from 'svelte/transition'
</script>

<style>
	.project {
		padding: 1.5em;
		justify-items: center;
		align-content: space-between;
		text-align: center;
	}

	.logo {
		width: auto;
		height: 3em;
	}

	footer {
		display: grid;
		justify-content: space-between;
	}
	.project-links {
		display: grid;
		grid-auto-flow: column;
		justify-content: center;
	}
	.project-links img {
		width: 2em;
	}

	h3 a {
		color: inherit;
	}
</style>

<!-- <article class="project card" transition:scale={{duration: 300}}> -->
<article class="project card static">
	{#if project.logo && !project.thumbnail}
		<img class="logo" src={project.logo} alt="{project.name} Logo" />
	{/if}
	{#if project.thumbnail}
		<img class="thumbnail" src={project.thumbnail} alt="{project.name} Thumbnail" />
	{/if}
	{#if !project.logo && !project.thumbnail}
		<h3>
			{#if project.website}
				<a href={project.website}>{project.name}</a>
			{:else}
				{project.name}
			{/if}
		</h3>
	{/if}
	<footer>
		<div class="project-links">
			{#if project.android}
				<a href={project.android}><img src={icons.android} alt="Android Play Store" /></a>
			{/if}
			{#if project.iOS}
				<a href={project.iOS}><img src={icons.iOS} alt="iOS App Store" /></a>
			{/if}
			{#if project.website}
				<a href={project.website}><img src={icons.website} alt="Website" /></a>
			{/if}
			{#if project.github}
				<a href={project.github}><img src={icons.github} alt="Github" /></a>
			{/if}
		</div>
		{#if showTags && project.tags.length}
			<Tags tags={project.tags} bind:showAllTags={showAllTags} />
		{/if}
	</footer>
</article>
