<script lang="ts">

	import { Project, Tag, projects as allProjects } from '../data/projects'

	export let filterByCategorySection: Tag | undefined
	export let filterByCategory: Tag | undefined
	export let filterByTags: Tag[]
	
	import { getContext } from 'svelte'
	const searchQuery = getContext<SvelteStore<string>>('searchQuery')

	let projects: Project[]
	$: if(allProjects){
		const query = $searchQuery?.trim().toLowerCase() ?? ''
		if(query || filterByCategorySection || filterByCategory || filterByTags?.length)
			projects = allProjects.filter(project => Boolean(
				// Search query
				(!query || [
					project.name,
					project.description,
					project.tags,
					// project.website && new URL(project.website).host,
					// project.github && new URL(project.github).host,
					// project.android && new URL(project.android).host,
					// project.iOS && new URL(project.iOS).host
				].join('\n').toLowerCase().includes(query)) && // .match(new RegExp(query, 'i'))) &&
				// (!query || project.name?.toLowerCase().includes(query) || project.description?.toLowerCase().includes(query) || project.tags.some(tag => tag.includes(query))) &&
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
	export let showTags = true
	// export let showAllTags = true


	import Breadcrumb from './Breadcrumb.svelte'
	import ProjectCard from './ProjectCard.svelte'
	import { fly } from 'svelte/transition'
	import { flip } from 'svelte/animate'
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

	header {
		white-space: nowrap;
	}

	.project-count {
		overflow: hidden;
		text-overflow: ellipsis;
	}
	@media (max-width: 28rem) {
		.project-count {
			display: none;
		}
	}
</style>

<section class="column">
	<header class="sticky bar">
		<div class="bar">
			<slot>
				<h3><Breadcrumb /></h3>
			</slot>
			{#if liveProjects.length}
				<span class="project-count">{liveProjects.length} project{liveProjects.length === 1 ? '' : 's'}</span>
			{/if}
		</div>
		<label>
			<input type="checkbox" bind:checked={showTags} />
			<span>Show Tags</span>
		</label>
		<!-- <label>
			<input type="checkbox" bind:checked={showAllTags} />
			<span>Show All Tags</span>
		</label> -->
	</header>

	{#if !liveProjects.length && !comingSoonProjects.length}
		{#if $searchQuery}
			We didn't find any {filterByCategory || filterByCategorySection} projects matching "{$searchQuery}".
		{:else}
			We didn't find any {filterByCategory || filterByCategorySection} projects here.
		{/if}
	{/if}

	<div class="grid" out:fly={{duration: 200, x: 20, opacity: 0}} in:fly={{delay: 200, duration: 200, x: -20, opacity: 0}}>
		{#if liveProjects.length < 25}
			{#each liveProjects as project (project.name)}
				<div animate:flip={{duration: 200}} transition:fly|local={{duration: 200, y: 20, opacity: 0}}>
					<ProjectCard {project} bind:showTags={showTags} />
					<!-- <ProjectCard {project} bind:showAllTags={showAllTags} /> -->
				</div>
			{/each}
		{:else}
			{#each liveProjects as project (project.name)}
				<ProjectCard {project} bind:showTags={showTags} />
				<!-- <ProjectCard {project} bind:showAllTags={showAllTags} /> -->
			{/each}
		{/if}
	</div>
</section>
{#if liveProjects.length && comingSoonProjects.length}
	<hr>
{/if}
{#if comingSoonProjects?.length}
	<section>
		<header class="sticky bar">
			<h3>Coming Soon</h3>
			<label>
				<input type="checkbox" bind:checked={showTags} />
				<span>Show Tags</span>
			</label>
			<!-- <label>
				<input type="checkbox" bind:checked={showAllTags} />
				<span>Show All Tags</span>
			</label> -->
		</header>
		<div class="grid small" out:fly={{duration: 200, x: 20, opacity: 0}} in:fly={{delay: 200, duration: 200, x: -20, opacity: 0}}>
			{#if comingSoonProjects.length < 25}
				{#each comingSoonProjects as project (project.name)}
					<div animate:flip={{duration: 200}} transition:fly|local={{duration: 200, y: 20, opacity: 0}}>
						<ProjectCard {project} bind:showTags={showTags} />
						<!-- <ProjectCard {project} bind:showAllTags={showAllTags} /> -->
					</div>
				{/each}
			{:else}
				{#each comingSoonProjects as project (project.name)}
					<ProjectCard {project} bind:showTags={showTags} />
					<!-- <ProjectCard {project} bind:showAllTags={showAllTags} /> -->
				{/each}
			{/if}
		</div>
	</section>
{/if}
