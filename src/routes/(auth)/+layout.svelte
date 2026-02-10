<script lang="ts">
	import { resolve } from "$lib/utils";
	import { config } from "$lib/config";
	import { fade } from "svelte/transition";
	import Icon from "$lib/components/ui/Icon.svelte";

	let { children } = $props();
</script>

<div class="min-h-screen bg-dark-deep flex flex-col relative overflow-hidden">
	<!-- Background Decorations -->
	<div class="absolute inset-0 z-0 pointer-events-none">
		<div class="bg-noise opacity-20"></div>
		<div
			class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] -translate-y-1/2"
		></div>
		<div
			class="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/15 rounded-full blur-[120px] translate-y-1/2"
		></div>
	</div>

	<!-- Navbar (Minimal) -->
	<header class="relative z-10 container mx-auto px-6 py-6">
		<a href={resolve("/")} class="inline-flex items-center gap-2 group">
			<div
				class="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300"
			>
				<span class="font-black text-lg">O</span>
			</div>
			<span class="text-xl font-black text-white tracking-tight"
				>Okis<span class="text-primary">GS</span></span
			>
		</a>
	</header>

	<!-- Content -->
	<main class="flex-1 flex items-center justify-center p-6 relative z-10 w-full max-w-md mx-auto">
		<div in:fade={{ duration: 300, delay: 100 }} class="w-full">
			{@render children()}
		</div>
	</main>

	<!-- Footer -->
	<footer class="relative z-10 py-6 text-center text-sm text-slate-500">
		<p>&copy; {new Date().getFullYear()} {config.app.name}. All rights reserved.</p>
	</footer>
</div>
