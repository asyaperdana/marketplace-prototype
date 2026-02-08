<script lang="ts">
	import { onMount } from "svelte";

	let { children, threshold = 0.1, id = "" } = $props();
	let isVisible = $state(false);
	let container: HTMLElement;

	onMount(() => {
		// If we are on the client, start observing
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					isVisible = true;
					observer.disconnect();
				}
			},
			{ rootMargin: "200px", threshold } // Increased margin for better UX
		);

		if (container) {
			observer.observe(container);
		}

		return () => observer.disconnect();
	});
</script>

<div {id} bind:this={container} class="min-h-[100px]">
	{#if isVisible}
		{@render children()}
	{/if}
</div>
