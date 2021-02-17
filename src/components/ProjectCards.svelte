<script lang="ts">
	import { Project, Tag, projects as allProjects } from '../data/projects'

	export let filterByCategorySection: Tag | undefined
	export let filterByCategory: Tag | undefined
	export let filterByTags: Tag[]

	export let searchQuery = ''

	let projects: Project[]
	$: if(allProjects){
		const query = searchQuery.trim().toLowerCase()
		if(query || filterByCategorySection || filterByCategory || filterByTags?.length)
			projects = allProjects.filter(project => Boolean(
				// Search query
				(!query || project.name.toLowerCase().includes(query) || project.description.toLowerCase().includes(query)) &&
				// Category section filter
				(!filterByCategorySection || project.section === filterByCategorySection) &&
				// Category filter
				(!filterByCategory || project.category === filterByCategory) &&
				// Tags filter
				(!filterByTags?.length || project.tags.some(tag => filterByTags.includes(tag)))
			))
		else
			projects = allProjects
	}

	let liveProjects: Project[], comingSoonProjects: Project[]
	$: liveProjects = projects?.filter(project => project.isLive) || []
	$: comingSoonProjects = projects?.filter(project => !project.isLive) || []


	// View options
	// export let showTags = true
	export let showAllTags = true


	import Breadcrumb from './Breadcrumb.svelte'
	import ProjectCard from './ProjectCard.svelte'
</script>

<style>
	section {
		display: grid;
	}
	section header {
		position: sticky;
		top: 6em;
		top: var(--header-height);
		padding-bottom: calc(0.5 * var(--space-inner));
		margin-bottom: calc(-0.5 * var(--space-inner));
	}
</style>

<section class="column">
	<header class="sticky bar">
		<slot>
			<h3><Breadcrumb /></h3>
		</slot>
		<!-- <label>
			<input type="checkbox" bind:checked={showTags} />
			<span>Show Tags</span>
		</label> -->
		<label>
			<input type="checkbox" bind:checked={showAllTags} />
			<span>Show All Tags</span>
		</label>
	</header>

	<div class="grid">
		{#each liveProjects as project}
			<!-- <ProjectCard {project} bind:showTags={showTags} /> -->
			<ProjectCard {project} bind:showAllTags={showAllTags} />
		{:else}
			We didn't find any projects here.
		{/each}
	</div>
</section>
{#if comingSoonProjects?.length}
	<hr>
	<section>
		<header class="sticky bar">
			<h3>Coming Soon</h3>
			<!-- <label>
				<input type="checkbox" bind:checked={showTags} />
				<span>Show Tags</span>
			</label> -->
			<label>
				<input type="checkbox" bind:checked={showAllTags} />
				<span>Show All Tags</span>
			</label>
		</header>
		<div class="grid small">
			{#each comingSoonProjects as project}
				<!-- <ProjectCard {project} bind:showTags={showTags} /> -->
				<ProjectCard {project} bind:showAllTags={showAllTags} />
			{/each}
		</div>
	</section>
{/if}
