<script lang="ts">
	let tonsCO2Captured = 2088.2 // 2063418
	let totalBlocks = 0 // 4746421
	let totalTransactions = 0 // 2063418
	let walletAddresses = 0 // 70994
	let cUSDInCirculation = 0 // 31072411

	;(async () => {
		for(let i = 0; ; i++){
			const blockNumberData = await fetch(`https://explorer.celo.org/api?module=block&action=eth_block_number&${i}`).then(r => r.json()).catch(console.error)
			console.log('blockNumberData', blockNumberData)
			if(blockNumberData)
				totalBlocks = Math.max(totalBlocks, Number(blockNumberData.result))

			const totalTransactionsData = await fetch(`https://explorer.celo.org/api?module=stats&action=totaltransactions&${i}`).then(r => r.json()).catch(console.error)
			console.log('totalTransactionsData', totalTransactionsData)
			if(totalTransactionsData)
				totalTransactions = Math.max(totalTransactions, Number(totalTransactionsData.result))

			const cUSDSupplyData = await fetch(`https://explorer.celo.org/api?module=stats&action=tokensupply&contractaddress=0x765de816845861e75a25fca122bb6898b8b1282a&${i}`).then(r => r.json()).catch(console.error)
			console.log('cUSDSupplyData', cUSDSupplyData)
			if(cUSDSupplyData)
				cUSDInCirculation = Math.max(cUSDInCirculation, Number(cUSDSupplyData.result) / 1e18)

			await new Promise(r => setTimeout(r, 3000))
		}
	})()

	import TweenedNumber from '../components/TweenedNumber.svelte'
</script>

<style>
	#ecosystem-stats {
		display: block;
		columns: 4;
		column-rule: 1px solid var(--celo-gray);
		text-align: center;
		gap: var(--space-inner);
	}

	#ecosystem-stats span {
		opacity: 0.5;
	}

	#ecosystem-stats :global(.tweened-number) {
		font-size: 1.5em;
		display: block;
	}
</style>

<div id="ecosystem-stats" class="card static full">
	<p class="stat">
		<TweenedNumber bind:number={tonsCO2Captured} maxDecimals=1 />
		<span>Tons of CO<sub>2</sub> Captured</span>
	</p>
	<p class="stat">
		<TweenedNumber bind:number={totalBlocks} />
		<span>Total blocks</span>
	</p>
	<p class="stat">
		<TweenedNumber bind:number={totalTransactions} />
		<span>Total transactions</span>
	</p>
	<!-- <p class="stat">
		<TweenedNumber bind:number={walletAddresses} />
		<span>Wallet addresses</span>
	</p> -->
	<p class="stat">
		<TweenedNumber bind:number={cUSDInCirculation} />
		<span>cUSD in circulation</span>
	</p>
</div>
