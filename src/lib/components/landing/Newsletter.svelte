<script lang="ts">
	import { onMount } from "svelte";
	import Icon from "$lib/components/ui/Icon.svelte";

	let email = $state("");
	let isSubmitting = $state(false);
	let isSubmitted = $state(false);
	let isVisible = $state(false);
	let sectionRef: HTMLElement;

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (!email || isSubmitting) return;
		isSubmitting = true;
		await new Promise((resolve) => setTimeout(resolve, 1500));
		isSubmitting = false;
		isSubmitted = true;
		email = "";
		setTimeout(() => {
			isSubmitted = false;
		}, 5000);
	}

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) isVisible = true;
				});
			},
			{ threshold: 0.2 }
		);
		if (sectionRef) observer.observe(sectionRef);
		return () => observer.disconnect();
	});
</script>

<section id="newsletter" class="py-20 relative overflow-hidden bg-dark-deep" bind:this={sectionRef}>
	<!-- Premium Background Decoration -->
	<div class="absolute inset-0 z-0">
		<div class="bg-noise opacity-30"></div>
		<div
			class="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] -translate-y-1/2"
		></div>
		<div
			class="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[150px] translate-y-1/2"
		></div>
	</div>

	<div class="container mx-auto px-6 relative z-10 max-w-4xl">
		<div
			class="glass rounded-[3rem] p-12 md:p-20 text-center border border-white/10 relative overflow-hidden group"
			class:opacity-0={!isVisible}
			class:translate-y-16={!isVisible}
			class:transition-all={true}
			class:duration-1000={true}
		>
			<!-- Animated Inner Glow -->
			<div
				class="absolute -inset-2 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700"
			></div>

			<div class="relative z-10">
				<div
					class="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-light border border-white/10 text-primary-light text-sm font-black mb-10 tracking-widest uppercase backdrop-blur-md"
				>
					<span class="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
					Newsletter Eksklusif
				</div>

				<h2
					class="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tighter"
				>
					Stay Ahead with <br />
					<span class="gradient-text">Okis GS</span> Updates
				</h2>

				<p class="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
					Dapatkan info promo spesial, tips jual-beli aman, dan koleksi produk terbaru
					langsung di inbox kamu.
				</p>

				<form class="max-w-md mx-auto mb-16" onsubmit={handleSubmit}>
					<div class="relative">
						{#if isSubmitted}
							<div
								class="flex items-center justify-center gap-3 p-5 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl text-emerald-400 font-bold animate-fade-in"
							>
								<svg
									class="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="3"
										d="M5 13l4 4L19 7"
									/></svg
								>
								<span>Berhasil! Cek email kamu ya.</span>
							</div>
						{:else}
							<div class="flex flex-col sm:flex-row gap-3">
								<input
									type="email"
									placeholder="Alamat email kamu..."
									bind:value={email}
									required
									disabled={isSubmitting}
									class="flex-1 px-8 py-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all font-medium text-lg backdrop-blur-md"
								/>
								<button
									type="submit"
									class="px-10 py-5 rounded-2xl btn-primary font-black text-lg shadow-xl shadow-primary/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 group/btn"
									disabled={isSubmitting}
								>
									{#if isSubmitting}
										<div
											class="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"
										></div>
									{:else}
										<span>Subscribe</span>
										<svg
											class="w-5 h-5 group-hover/btn:translate-x-1 transition-transform"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="3"
												d="M14 5l7 7m0 0l-7 7m7-7H3"
											/></svg
										>
									{/if}
								</button>
							</div>
						{/if}
					</div>
				</form>

				<div class="flex flex-wrap justify-center gap-10 md:gap-16">
					<div class="flex items-center gap-4 text-slate-100 group/item">
						<div
							class="w-12 h-12 rounded-xl glass-light flex items-center justify-center text-2xl group-hover/item:scale-110 group-hover/item:rotate-6 transition-all"
						>
							<Icon name="package" size={22} ariaLabel="Promo" />
						</div>
						<span class="font-bold tracking-tight">Promo Spesial</span>
					</div>
					<div class="flex items-center gap-4 text-slate-100 group/item">
						<div
							class="w-12 h-12 rounded-xl glass-light flex items-center justify-center text-2xl group-hover/item:scale-110 group-hover/item:rotate-6 transition-all"
						>
							<Icon name="rocket" size={22} ariaLabel="Info produk" />
						</div>
						<span class="font-bold tracking-tight">Info Produk</span>
					</div>
					<div class="flex items-center gap-4 text-slate-100 group/item">
						<div
							class="w-12 h-12 rounded-xl glass-light flex items-center justify-center text-2xl group-hover/item:scale-110 group-hover/item:rotate-6 transition-all"
						>
							<Icon name="bulb" size={22} ariaLabel="Tips" />
						</div>
						<span class="font-bold tracking-tight">Market Tips</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.animate-fade-in {
		animation: fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}
</style>
