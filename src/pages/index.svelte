<script>
	import { metatags } from '@roxi/routify'
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
</style>


<div>
	<h3>Featured Projects</h3>
</div>

<div class="two-to-end">
	<CardStack>
		<article class="card">
			<h3>Donate to UBI Beneficiaries</h3>
			<p>Give directly to refugees in Venezuela. Over $200K distributed to 10K people!</p>
			<p>
				<button>See the impact</button>
				<button>Give to a beneficiary</button>
			</p>
		</article>
		<article class="card">
			<h3>Save an Urban Forest Near You</h3>
			<p>Raise funds and support causes that matter.</p>
			<p>
				<button>See the impact</button>
				<button>Save an Urban Forest</button>
			</p>
		</article>
		<article class="card">
			<h3>Donate to Phillippine Typhoon Relief</h3>
			<p>Provide aid directly to those impacted by the devastating typhoion last Nov.</p>
			<p>
				<button>Food for a Day</button>
				<button>Medical Voucher</button>
			</p>
		</article>
	</CardStack>
</div>

<EcosystemStats />

<div class="grid">
	<div class="card">
		<h3>Mobile Apps</h3>
	</div>

	<div class="card">
		<h3>Developer Tools</h3>
	</div>

	<div class="card">
		<h3>Infrastructure</h3>
	</div>

	<div class="card">
		<h3>Ecosystem</h3>
	</div>

	<div class="card">
		<h3>Education</h3>
	</div>

	<div class="card">
		<h3>Purchase</h3>
	</div>
</div>

<div class="card full">
	<h3>What is the Celo Platform?</h3>
	<p>The Celo platform aims to make financial tools borderless, easy to use, and accessible for anyone with a mobile phone.</p>
	<button>Watch video & earn $2 CELO on Coinbase</button>
</div>

<div class="card full">
	<h3>What is Celo?</h3>
	<p>Celo is the core utility, reserve, staking, and governance asset for the Celo platform. From staking, to voting, to arbitrage.</p>
	<button>Watch video & earn $2 CELO on Coinbase</button>
</div>

<div class="card full">
	<h3>What can Celo Dollars do?</h3>
	<p>Celo Dollars (cUSD) are stablecoins that track the US dollar. Anyone with a mobile phone can send, receive, and store Celo Dollars for free.</p>
	<button>Watch video & earn $2 CELO on Coinbase</button>
</div>
