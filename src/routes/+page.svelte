<script lang="ts">
	import { theme } from '$lib'
</script>

<!-- 'dark' | 'light' -->
<div>current: {$theme.current}</div>

<!-- 'dark' | 'light' | 'sync' -->
<div>setting: {$theme.setting}</div>

<!-- true | false -->
<div>now dark mode: {$theme.isDark}</div>
<div>now light mode: {$theme.isLight}</div>

<button on:click={() => theme.change('dark')}>set dark theme</button>
<button on:click={() => theme.change('light')}>set light theme</button>
<button on:click={() => theme.change('sync')}>set system default</button>

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
