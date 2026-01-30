<script lang="ts">
	interface Props {
		src: string;
		alt: string;
		aspectRatio?: string;
		class?: string;
		sizes?: string;
		loading?: "lazy" | "eager";
		objectFit?: "cover" | "contain" | "fill" | "none";
	}

	let {
		src,
		alt,
		aspectRatio = "1/1",
		class: className = "",
		sizes = "100vw",
		loading = "lazy",
		objectFit = "cover"
	}: Props = $props();

	let isLoaded = $state(false);
	let hasError = $state(false);

	function handleLoad() {
		isLoaded = true;
	}

	function handleError() {
		hasError = true;
	}
</script>

<div class="responsive-image-container {className}" style="aspect-ratio: {aspectRatio}">
	{#if !hasError}
		<img
			{src}
			{alt}
			{sizes}
			{loading}
			onload={handleLoad}
			onerror={handleError}
			class="responsive-image"
			class:loaded={isLoaded}
			style="object-fit: {objectFit}"
		/>
		{#if !isLoaded}
			<div class="placeholder"></div>
		{/if}
	{:else}
		<div class="error-placeholder">
			<span class="error-icon">🖼️</span>
		</div>
	{/if}
</div>

<style>
	.responsive-image-container {
		position: relative;
		overflow: hidden;
		background: rgba(255, 255, 255, 0.05);
		border-radius: inherit;
	}

	.responsive-image {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		transition: opacity 0.5s ease-out;
	}

	.responsive-image.loaded {
		opacity: 1;
	}

	.placeholder {
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(16, 185, 129, 0.1));
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 0.5;
		}
		50% {
			opacity: 1;
		}
	}

	.error-placeholder {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.03);
	}

	.error-icon {
		font-size: 2rem;
		opacity: 0.5;
	}
</style>
