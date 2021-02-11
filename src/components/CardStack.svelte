<style>
	.card-stack {
		display: grid;
		grid: 'area';
		align-items: start;
	}
	.card-stack > :global(*) {
		transform: perspective(10px) translateX(calc(var(--i) * 1em)) translateZ(calc(var(--i) * -1px));
		transform-origin: right;
		grid-area: area;
		will-change: transform;
		width: calc(100% - 2rem);
		z-index: calc(var(--i) * -1);
	}
	.card-stack > :global(:nth-child(1)) { --i: 0 }
	.card-stack > :global(:nth-child(2)) { --i: 1 }
	.card-stack > :global(:nth-child(3)) { --i: 2 }
	.card-stack > :global(:nth-child(4)) { --i: 3 }
	.card-stack > :global(:nth-child(5)) { --i: 4 }
	.card-stack > :global(:nth-child(6)) { --i: 5 }
	.card-stack > :global(:nth-child(7)) { --i: 6 }
	.card-stack > :global(:nth-child(8)) { --i: 7 }
</style>

<div class="card-stack">
	<slot></slot>
</div>
