<script>
	export let number
	export let tweenDuration = 300

	function formatNumber(number){
		return new Intl.NumberFormat(globalThis.navigator.languages).format(number)
	}

	import { tweened } from 'svelte/motion'
	$: tweenedNumber = tweened(Number(number || 0), {
		duration: tweenDuration,
		easing: t => t,
		interpolate: (from, to) => t => Math.pow(Math.E, Math.log(from) + t * (Math.log(to) - Math.log(from)))
	})
	$: tweenedNumber.set(Number(number || 0))
</script>

<span class="number">{formatNumber(tweenedNumber)}</span>
