<script lang="ts">
	import { onMount } from "svelte";

	interface Stat {
		value: number;
		suffix: string;
		label: string;
		icon: string;
	}

	const stats: Stat[] = [
		{ value: 50000, suffix: "+", label: "Pengguna Aktif", icon: "👥" },
		{ value: 120000, suffix: "+", label: "Produk Terdaftar", icon: "📦" },
		{ value: 85000, suffix: "+", label: "Transaksi Sukses", icon: "✅" },
		{ value: 4.9, suffix: "", label: "Rating Pengguna", icon: "⭐" }
	];

	let displayValues = $state<number[]>(stats.map(() => 0));
	let isVisible = $state(false);
	let sectionRef: HTMLElement;

	function formatNumber(num: number): string {
		if (num >= 1000) {
			return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + "K";
		}
		if (Number.isInteger(num)) {
			return num.toLocaleString();
		}
		return num.toFixed(1);
	}

	function animateValue(index: number, target: number, duration: number) {
		const startTime = performance.now();
		const startValue = 0;

		function update(currentTime: number) {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);

			// Easing function
			const easeOutQuart = 1 - Math.pow(1 - progress, 4);

			displayValues[index] = startValue + (target - startValue) * easeOutQuart;

			if (progress < 1) {
				requestAnimationFrame(update);
			}
		}

		requestAnimationFrame(update);
	}

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !isVisible) {
						isVisible = true;
						// Start counting animation with staggered delays
						stats.forEach((stat, index) => {
							setTimeout(() => {
								animateValue(index, stat.value, 2000);
							}, index * 150);
						});
					}
				});
			},
			{ threshold: 0.3 }
		);

		if (sectionRef) {
			observer.observe(sectionRef);
		}

		return () => observer.disconnect();
	});
</script>

<section id="stats" class="py-32 relative overflow-hidden" bind:this={sectionRef}>
	<div class="container mx-auto px-6 relative z-10">
		<div class="flex flex-wrap justify-center gap-8 lg:gap-16">
			{#each stats as stat, index (stat.label)}
				<div
					class="glass-card rounded-4xl p-8 text-center relative group min-w-[200px]"
					class:opacity-0={!isVisible}
					class:translate-y-20={!isVisible}
					style="transition-duration: 1s; transition-delay: {index *
						0.2}s; margin-top: {index % 2 === 0 ? '0' : '4rem'};"
				>
					<div
						class="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-linear-to-br from-dark-lighter to-dark border border-white/10 flex items-center justify-center text-3xl shadow-lg group-hover:-translate-y-2 transition-transform duration-300"
					>
						{stat.icon}
					</div>

					<div class="mt-8 space-y-2">
						<div class="text-4xl lg:text-5xl font-black gradient-text tracking-tighter">
							{formatNumber(displayValues[index])}{stat.suffix}
						</div>
						<div class="text-slate-400 font-bold uppercase tracking-widest text-xs">
							{stat.label}
						</div>
					</div>

					<div
						class="absolute inset-0 border border-white/0 group-hover:border-primary/20 rounded-4xl transition-colors duration-500 pointer-events-none"
					></div>
				</div>
			{/each}
		</div>
	</div>
</section>
