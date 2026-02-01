<script lang="ts">
	import { Logo } from "$lib/components/ui";
	
	interface Props {
		children?: import("svelte").Snippet;
	}

	let { children }: Props = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="auth-layout">
	<!-- Background Pattern -->
	<div class="auth-bg"></div>
	
	<!-- Header -->
	<header class="auth-header">
		<a href="/" class="logo-link">
			<Logo size="md" />
		</a>
	</header>

	<!-- Main Content -->
	<main class="auth-main">
		{#if children}
			{@render children()}
		{/if}
	</main>

	<!-- Footer -->
	<footer class="auth-footer">
		<p>&copy; 2026 Okis Garage Sale. All rights reserved.</p>
	</footer>
</div>

<style>
	.auth-layout {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		position: relative;
		font-family: 'Inter', system-ui, sans-serif;
	}

	.auth-bg {
		position: fixed;
		inset: 0;
		background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
		z-index: -2;
	}

	.auth-bg::before {
		content: '';
		position: absolute;
		inset: 0;
		background: 
			radial-gradient(ellipse 80% 50% at 50% -20%, rgba(20, 184, 166, 0.15), transparent),
			radial-gradient(ellipse 60% 40% at 80% 100%, rgba(16, 185, 129, 0.1), transparent);
		z-index: -1;
	}

	.auth-header {
		padding: 1.5rem 2rem;
		display: flex;
		justify-content: center;
	}

	.logo-link {
		transition: opacity 0.2s ease;
	}

	.logo-link:hover {
		opacity: 0.8;
	}

	.auth-main {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}

	.auth-footer {
		padding: 1.5rem 2rem;
		text-align: center;
	}

	.auth-footer p {
		color: rgba(148, 163, 184, 0.6);
		font-size: 0.875rem;
	}
</style>
