<script lang="ts">
	import { Project, Tag, projects } from '../data/projects'

	export let filterByCategory: Tag | undefined
	export let filterByTags: Tag[]

	export let searchQuery = ''

	let filteredProjects: Project[]
	$: if(projects){
		const query = searchQuery.trim().toLowerCase()
		if(query || filterByCategory || filterByTags?.length)
			filteredProjects = projects.filter(project => Boolean(
				// Search query
				(!query || project.name.toLowerCase().includes(query) || project.description.toLowerCase().includes(query)) &&
				// Category filter
				(!filterByCategory || project.category === filterByCategory) &&
				// Tags filter
				(!filterByTags?.length || project.tags.some(tag => filterByTags.includes(tag)))
			))
		else
			filteredProjects = projects
	}


	// View options
	export let showTags = false

	import Breadcrumb from './Breadcrumb.svelte'
	import ProjectCard from './ProjectCard.svelte'
</script>

<div class="full bar">
	<slot>
		<h3><Breadcrumb /></h3>
	</slot>
	<label>
		<input type="checkbox" bind:checked={showTags} />
		<span>Show Tags</span>
	</label>
</div>

{#each filteredProjects as project}
	<ProjectCard {project} bind:showTags={showTags} />
{/each}
