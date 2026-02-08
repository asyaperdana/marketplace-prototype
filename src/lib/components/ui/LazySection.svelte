<script lang="ts">
	import { onMount } from "svelte";

	let { children, threshold = 0.1 } = $props();
	let isVisible = $state(false);
	let container: HTMLElement;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					isVisible = true;
					observer.disconnect();
				}
			},
			{ rootMargin: "100px", threshold }
		);

		if (container) {
			observer.observe(container);
		}

		return () => observer.disconnect();
	});
</script>

<div bind:this={container} class="min-h-[200px]">
	{#if isVisible}
		{@render children()}
	{/if}
</div>
