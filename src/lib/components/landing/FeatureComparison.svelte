<script lang="ts">
	import { onMount } from "svelte";

	interface ComparisonRow {
		feature: string;
		okis: boolean | string;
		competitorA: boolean | string;
		competitorB: boolean | string;
	}

	const comparisonData: ComparisonRow[] = [
		{
			feature: "Biaya Admin Rendah (5%)",
			okis: true,
			competitorA: false,
			competitorB: false
		},
		{
			feature: "Sistem Escrow Aman",
			okis: true,
			competitorA: true,
			competitorB: false
		},
		{
			feature: "Garansi Uang Kembali",
			okis: true,
			competitorA: false,
			competitorB: true
		},
		{
			feature: "Verifikasi Seller Ketat",
			okis: true,
			competitorA: true,
			competitorB: false
		},
		{
			feature: "Support 24/7",
			okis: true,
			competitorA: false,
			competitorB: false
		},
		{
			feature: "Fokus Barang Preloved",
			okis: true,
			competitorA: false,
			competitorB: false
		},
		{
			feature: "Komunitas Seller Aktif",
			okis: true,
			competitorA: false,
			competitorB: true
		},
		{
			feature: "Fitur Negosiasi Harga",
			okis: true,
			competitorA: true,
			competitorB: true
		}
	];

	let isVisible = $state(false);
	let sectionRef: HTMLElement;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						isVisible = true;
					}
				});
			},
			{ threshold: 0.2 }
		);

		if (sectionRef) {
			observer.observe(sectionRef);
		}

		return () => observer.disconnect();
	});
</script>

<section id="comparison" class="py-24 relative overflow-hidden bg-dark-deep" bind:this={sectionRef}>
	<!-- Background Decoration -->
	<div class="absolute inset-0 z-0">
		<div class="bg-noise opacity-30"></div>
		<div
			class="absolute top-1/2 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] translate-x-1/2 pointer-events-none"
		></div>
	</div>

	<div class="container mx-auto px-6 relative z-10 max-w-5xl">
		<!-- Section Header -->
		<div
			class="text-center mb-16 space-y-4"
			class:opacity-0={!isVisible}
			class:translate-y-10={!isVisible}
			style="transition: all 1s cubic-bezier(0.16, 1, 0.3, 1)"
		>
			<h2 class="text-4xl lg:text-6xl font-black text-white tracking-tighter">
				Kenapa Pilih <span class="gradient-text">Okis GS</span>?
			</h2>
			<p class="text-xl text-slate-300 max-w-2xl mx-auto">
				Lihat perbandingan fitur kami dengan platform serupa lainnya.
			</p>
		</div>

		<!-- Comparison Table -->
		<div
			class="glass rounded-[2rem] overflow-hidden border border-white/10"
			class:opacity-0={!isVisible}
			class:translate-y-10={!isVisible}
			style="transition: all 1s cubic-bezier(0.16, 1, 0.3, 1); transition-delay: 0.1s"
		>
			<!-- Table Header -->
			<div class="grid grid-cols-4 gap-4 p-6 border-b border-white/10 bg-white/5">
				<div class="font-bold text-slate-400 text-sm uppercase tracking-widest">Fitur</div>
				<div class="text-center">
					<div
						class="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl mb-2 shadow-lg shadow-primary/30"
					>
						🛍️
					</div>
					<div class="font-black text-white">Okis GS</div>
				</div>
				<div class="text-center">
					<div
						class="w-12 h-12 mx-auto rounded-xl bg-white/5 flex items-center justify-center text-xl mb-2"
					>
						🏪
					</div>
					<div class="font-bold text-slate-400">Platform A</div>
				</div>
				<div class="text-center">
					<div
						class="w-12 h-12 mx-auto rounded-xl bg-white/5 flex items-center justify-center text-xl mb-2"
					>
						🏬
					</div>
					<div class="font-bold text-slate-400">Platform B</div>
				</div>
			</div>

			<!-- Table Body -->
			<div class="divide-y divide-white/5">
				{#each comparisonData as row, index}
					<div
						class="grid grid-cols-4 gap-4 p-6 hover:bg-white/5 transition-colors duration-300"
						style="transition-delay: {index * 0.03}s"
					>
						<div class="font-medium text-slate-200 flex items-center">
							{row.feature}
						</div>
						<div class="flex justify-center">
							{#if row.okis === true}
								<div
									class="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400"
								>
									<svg
										class="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="3"
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</div>
							{:else if row.okis === false}
								<div
									class="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400"
								>
									<svg
										class="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="3"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</div>
							{:else}
								<span class="text-slate-400 text-sm">{row.okis}</span>
							{/if}
						</div>
						<div class="flex justify-center">
							{#if row.competitorA === true}
								<div
									class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500"
								>
									<svg
										class="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</div>
							{:else if row.competitorA === false}
								<div
									class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-600"
								>
									<svg
										class="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</div>
							{:else}
								<span class="text-slate-500 text-sm">{row.competitorA}</span>
							{/if}
						</div>
						<div class="flex justify-center">
							{#if row.competitorB === true}
								<div
									class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500"
								>
									<svg
										class="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</div>
							{:else if row.competitorB === false}
								<div
									class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-600"
								>
									<svg
										class="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</div>
							{:else}
								<span class="text-slate-500 text-sm">{row.competitorB}</span>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- CTA -->
		<div
			class="mt-16 text-center"
			class:opacity-0={!isVisible}
			class:translate-y-10={!isVisible}
			style="transition: all 1s cubic-bezier(0.16, 1, 0.3, 1); transition-delay: 0.3s"
		>
			<a href="#newsletter" class="btn btn-primary px-12 py-5 text-xl group">
				<span class="group-hover:rotate-12 transition-transform">🚀</span>
				Mulai Sekarang - Gratis!
				<svg
					class="w-6 h-6 group-hover:translate-x-1 transition-transform"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="3"
						d="M17 8l4 4m0 0l-4 4m4-4H3"
					/>
				</svg>
			</a>
		</div>
	</div>
</section>
