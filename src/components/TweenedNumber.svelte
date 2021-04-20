<script>
	export let number
	export let tweenDuration = 1000
	export let maxDecimals = 0

	function formatNumber(number){
		return new Intl.NumberFormat(globalThis.navigator.languages, {
			minimumFractionDigits: maxDecimals,
			maximumFractionDigits: maxDecimals
		}).format(number)
	}

	import { tweened } from 'svelte/motion'
	$: tweenedNumber = tweened(0, {
		duration: tweenDuration,
		easing: t => t,
		interpolate: (from, to) => t =>	Math.pow(Math.E, Math.log(from || 1e-10) + t * (Math.log(to) - Math.log(from || 1e-10)))
	})
	$: tweenedNumber.set(Number(number || 0))
</script>

{#key number}<span class="tweened-number">{formatNumber($tweenedNumber)}</span>{/key}
