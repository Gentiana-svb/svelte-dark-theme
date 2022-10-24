<script lang="ts">
	import { theme } from '$lib'
</script>

<div>current: {$theme.current}</div>
<div>setting: {$theme.setting}</div>

<button on:click={() => theme.change('dark')}>set dark</button>
<button on:click={() => theme.change('light')}>set light</button>
<button on:click={() => theme.change('sync')}>set sync</button>

<style>
	:global(body) {
		/* Fallback while JS disable */
		background: rgb(51, 87, 54);
		color: rgb(132, 106, 69);
	}
	:global(body.light) {
		background: rgb(255, 255, 255);
		color: rgb(0, 0, 0);
	}
	:global(body.dark) {
		background: rgb(0, 0, 0);
		color: rgb(255, 255, 255);
	}
</style>
