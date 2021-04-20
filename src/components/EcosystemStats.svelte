<script lang="ts">
	// import { newKit } from '@celo/contractkit'

	// const kit = newKit('https://forno.celo.org')

	let tonsCO2Captured = 2219.5 // 2153.8
	let totalBlocks = 0 // 4746421
	let totalTransactions = 0 // 2063418
	let walletAddresses = 0 // 70994
	let cUSDInCirculation = 0 // 42000000

	;(async () => {
		while(true){
			const now = Date.now()
			const blockNumberData = await fetch(`https://explorer.celo.org/api?module=block&action=eth_block_number&_=${now}`).then(r => r.json()).catch(console.error)
			console.log('blockNumberData', blockNumberData)
			if(blockNumberData)
				totalBlocks = Math.max(totalBlocks, Number(blockNumberData.result))

			const totalTransactionsData = await fetch(`https://explorer.celo.org/api?module=stats&action=totaltransactions&_=${now}`).then(r => r.json()).catch(console.error)
			console.log('totalTransactionsData', totalTransactionsData)
			if(totalTransactionsData)
				totalTransactions = Math.max(totalTransactions, Number(totalTransactionsData.result))


			// const cUSDSupplyData = await fetch(`https://explorer.celo.org/api?module=stats&action=tokensupply&contractaddress=0x765de816845861e75a25fca122bb6898b8b1282a&_=${now}`).then(r => r.json()).catch(console.error)
			// console.log('cUSDSupplyData', cUSDSupplyData)
			// if(cUSDSupplyData)
			// 	cUSDInCirculation = Math.max(cUSDInCirculation, Number(cUSDSupplyData.result) / 1e18)

			const cUSDSupplyData = await fetch(`https://thecelo.com/api/v0.1?method=dashboard&_=${now}`).then(r => r.json()).catch(console.error)
			console.log('cUSDSupplyData', cUSDSupplyData)
			if(cUSDSupplyData)
				cUSDInCirculation = Math.max(cUSDInCirculation, Number(cUSDSupplyData?.dashboard?.[15]))


			// const stableToken = await kit.contracts.getStableToken()
			// const totalSupply = await stableToken.totalSupply()
			// if(totalSupply)
			// 	cUSDInCirculation = Math.max(cUSDInCirculation, Number(totalSupply))

			await new Promise(r => setTimeout(r, 3000))
		}
	})()

	import TweenedNumber from '../components/TweenedNumber.svelte'
</script>

<style>
	#ecosystem-stats {
		display: block;
		column-rule: 1px solid var(--celo-gray);
		gap: 0;

		padding: 0;
		overflow-x: auto;
		text-align: center;

		font-size: 0.9em;
		/* font-size: calc(0.7em + 0.4vw); */
	}
	#ecosystem-stats > * {
		break-inside: avoid;
	}

	@media (min-width: 22rem) {
		#ecosystem-stats {
			columns: 2;
		}
		/* hr:not(:nth-of-type(2n + 1)) {
			display: none;
		} */
		hr:not(:nth-of-type(2)) {
			display: none;
		}
		hr:nth-of-type(2) {
			column-span: all;
		}
	}

	@media (min-width: 65rem) {
		#ecosystem-stats {
			columns: 4;
		}
		hr {
			display: none;
		}
	}

	.stat {
		margin: auto;

		display: grid;
		grid-template-columns: 2.75rem 1fr;
		gap: 0.5em;
		align-items: center;
		padding: 1em;
		text-align: left;
	}
	.stat img {
		width: 100%;
		max-height: 3rem;
	}
	.stat span {
		opacity: 0.5;
		white-space: nowrap;
		font-size: 0.9em;
	}
	.stat :global(.tweened-number) {
		font-size: 1.5em;
		display: block;
	}
	.stat a:not(:hover) {
		color: inherit;
	}

	#ecosystem-stats :global(.tweened-number) {
		font-family: var(--heading-font);
		transform-origin: left center;
		animation: Blink 1000ms;
	}

	@keyframes Blink {
		25% {
			color: var(--celo-gold);
			transform: scale(1.05);
		}
	}
</style>

<div id="ecosystem-stats" class="card static full">
	<div class="stat">
		<img src="/images/branding/total-blocks.png" alt="total blocks">
		<div>
			<TweenedNumber bind:number={totalBlocks} />
			<span>total blocks</span>
		</div>
	</div>
	<hr>
	<div class="stat">
		<img src="/images/branding/total-txns.png" alt="total transactions">
		<div>
			<TweenedNumber bind:number={totalTransactions} />
			<span>total transactions</span>
		</div>
	</div>
	<!-- <div class="stat">
		<hr>
		<img src="/images/branding/wallet-addies.png" alt="cUSD in circulation">
		<div>
			<TweenedNumber bind:number={walletAddresses} />
			<span>Wallet addresses</span>
		</div>
	</div> -->
	<hr>
	<div class="stat">
		<img src="/images/branding/wallet-addies.png" alt="cUSD in circulation">
		<div>
			<TweenedNumber bind:number={cUSDInCirculation} />
			<span>cUSD in circulation</span>
		</div>
	</div>
	<hr>
	<div class="stat">
		<img src="/images/branding/carbon-offset.png" alt="carbon offset">
		<div>
			<TweenedNumber bind:number={tonsCO2Captured} maxDecimals=1 />
			<span><a href="https://www.wren.co/profile/celo" target="_blank">tons of CO<sub>₂</sub> offset</a></span>
		</div>
	</div>
</div>
