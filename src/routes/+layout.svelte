<script lang="ts">
	import { onMount } from "svelte";
	import "../app.css";
	import favicon from "$lib/assets/favicon.svg";
	import Toast from "$lib/components/ui/Toast.svelte";
	import { initAuth } from "$lib/stores/auth";

	let { children } = $props();

	onMount(() => {
		const unsubscribe = initAuth();
		return unsubscribe;
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
<Toast />
