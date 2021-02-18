<script>
	import { metatags, url } from '@roxi/routify'
	metatags.title = 'CeloHub'
	metatags.description = 'CeloHub | To Prosperity & Beyond'


	import CardStack from '../components/CardStack.svelte'
	import EcosystemStats from '../components/EcosystemStats.svelte'
</script>

<style>
	.full {
		grid-column: 1 / -1;
	}
	@media (min-width: 38rem) {
		.two-to-end {
			grid-column: 2 / -1;
		}
	}

	.featured-projects {
		display: grid;
		align-items: center;
		/* grid-template-columns: minmax(0, 1fr) 12em;
		grid-auto-flow: dense; */
		grid:
			"content title"
			/ minmax(0, 1fr) 12em;
		gap: 2em;
	}
	.featured-projects-title {
		display: grid;
		gap: 1em;
		/* grid-column-end: -1; */
		grid-area: title;
	}
	.featured-projects-content {
		grid-area: content;
	}
	@media (max-width: 45rem) {
		.featured-projects {
			display: grid;
			/* grid-template-columns: initial; */
			grid:
				"title"
				"content";
			margin-bottom: 1em;
			gap: 1em;
		}
		.featured-projects-title img {
			display: none;
		}
	}

	.category-navigation {
		justify-items: center;
	}
	.category-navigation img {
		width: auto;
		height: 13em;
	}

	.card {
		gap: 1em;
		align-items: center;
	}

	.featured-card {
		display: grid;
		grid-template-columns: minmax(0, 1.75fr) auto;
		gap: 1em;
	}
	.featured-card img {
		width: auto;
		height: 10em;
	}
	/* @media (max-width: 50rem) {
		.featured-card {
			display: grid;
			grid-template-columns: initial;
		}
		.featured-card img {
			height: 10em;
			justify-self: center;
		}
	} */
	.featured-card > div {
		display: grid;
		gap: 1em;
	}

	.education-card {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		gap: 2em;
	}
	@media (max-width: 50rem) {
		.education-card {
			display: grid;
			grid-template-columns: initial;
		}
	}
	.education-card iframe {
		border-radius: 0.5em;
	}
	.education-card div {
		display: grid;
		gap: 1em;
	}
</style>


<div class="featured-projects">
	<div class="featured-projects-title">
		<h3>Featured Projects</h3>
		<img src="/images/branding/featured-projects-icon.png" alt="Featured Projects">
	</div>


	<article class="featured-projects-content featured-card card">
		<div>
			<h3>Donate to UBI Beneficiaries</h3>
			<p>Give directly to refugees in Venezuela. Over $200K distributed to 10K people!</p>
			<p>
				<a href="https://impactmarket.com" target="_blank"><button>Give to a beneficiary</button></a>
			</p>
		</div>
		<img src="/images/branding/donate-to-ubi.png" alt="Donate to UBI Beneficiaries">
	</article>
	<!-- <CardStack>
		<article class="card" slot="1">
			<h3>Donate to UBI Beneficiaries</h3>
			<p>Give directly to refugees in Venezuela. Over $200K distributed to 10K people!</p>
			<p>
				<!-- <button>See the impact</button> -- >
				<a href="https://impactmarket.com" target="_blank"><button>Give to a beneficiary</button></a>
			</p>
		</article>
		<article class="card" slot="2">
			<h3>Save an Urban Forest Near You</h3>
			<p>Raise funds and support causes that matter.</p>
			<p>
				<!-- <button>See the impact</button> -- >
				<a href="https://www.doni.app" target="_blank"><button>Save an Urban Forest</button></a>
			</p>
		</article>
		<article class="card" slot="3">
			<h3>Donate to Phillippine Typhoon Relief</h3>
			<p>Provide aid directly to those impacted by the devastating typhoion last Nov.</p>
			<p>
				<!-- <button>Food for a Day</button> -- >
				<a href="https://valoraapp.com/donate" target="_blank"><button>Medical Voucher</button></a>
			</p>
		</article>
	</CardStack> -->
</div>

<EcosystemStats />

<div class="grid">
	<a class="category-navigation card" href={$url('/apps')}>
		<h3>Mobile Apps</h3>
		<img src="/images/branding/apps-thumbnail.png" alt="Mobile Apps">
	</a>

	<a class="category-navigation card" href={$url('/dev-tools')}>
		<h3>Developer Tools</h3>
		<img src="/images/branding/devtools-thumbnail.png" alt="Developer Tools">
	</a>

	<a class="category-navigation card" href={$url('/infrastructure')}>
		<h3>Infrastructure</h3>
		<img src="/images/branding/infrastructure-thumbnail.png" alt="Infrastructure">
	</a>

	<a class="category-navigation card" href={$url('/ecosystem')}>
		<h3>Ecosystem</h3>
		<img src="/images/branding/ecosystem-thumbnail.png" alt="Ecosystem">
	</a>

	<a class="category-navigation card" href={$url('/education')}>
		<h3>Education</h3>
		<img src="/images/branding/education-thumbnail.png" alt="Education">
	</a>

	<a class="category-navigation card" href={$url('/purchase')}>
		<h3>Purchase</h3>
		<img src="/images/branding/purchase-thumbnail.png" alt="Purchase">
	</a>
</div>

<div class="education-card card static full">
	<!-- <img src="/images/branding/learn-video-1.png" alt="Learn Video 1"> -->
	<iframe src="https://www.youtube.com/embed/ofQD_hhq09g?autoplay=0&fs=1&iv_load_policy=3&showinfo=0&rel=0"></iframe>
	<div>
		<h3>What is the Celo Platform?</h3>
		<p>The Celo platform aims to make financial tools borderless, easy to use, and accessible for anyone with a mobile phone.</p>
		<a href="https://www.coinbase.com/earn/celo/lesson/1" target="_blank"><button>Watch on Coinbase to earn $2</button></a>
	</div>
</div>

<div class="education-card card static full">
	<!-- <img src="/images/branding/learn-video-2.png" alt="Learn Video 2"> -->
	<iframe src="https://www.youtube.com/embed/mkpTmbkRv4A?autoplay=0&fs=1&iv_load_policy=3&showinfo=0&rel=0"></iframe>
	<div>
		<h3>What is Celo?</h3>
		<p>Celo is the core utility, reserve, staking, and governance asset for the Celo platform. From staking, to voting, to arbitrage.</p>
		<a href="https://www.coinbase.com/earn/celo/lesson/2" target="_blank"><button>Watch on Coinbase to earn $2</button></a>
	</div>
</div>

<div class="education-card card static full">
	<!-- <img src="/images/branding/learn-video-3.png" alt="Learn Video 3"> -->
	<iframe src="https://www.youtube.com/embed/n1k1JcjTnp8?autoplay=0&fs=1&iv_load_policy=3&showinfo=0&rel=0"></iframe>
	<div>
		<h3>What can Celo Dollars do?</h3>
		<p>Celo Dollars (cUSD) are stablecoins that track the US dollar. Anyone with a mobile phone can send, receive, and store Celo Dollars for free.</p>
		<a href="https://www.coinbase.com/earn/celo/lesson/3" target="_blank"><button>Watch on Coinbase to earn $2</button></a>
	</div>
</div>
