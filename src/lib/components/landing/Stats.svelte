<script lang="ts">
	import { onMount } from "svelte";
	import Icon from "$lib/components/ui/Icon.svelte";
	import type { IconName } from "$lib/types/icons";

	interface Stat {
		value: number;
		suffix: string;
		label: string;
		icon: IconName;
	}

	const stats: Stat[] = [
		{ value: 50000, suffix: "+", label: "Pengguna Aktif", icon: "users" },
		{ value: 120000, suffix: "+", label: "Produk Terdaftar", icon: "package" },
		{ value: 85000, suffix: "+", label: "Transaksi Sukses", icon: "check" },
		{ value: 4.9, suffix: "", label: "Rating Pengguna", icon: "star" }
	];

	let isVisible = $state(false);
	let sectionRef: HTMLElement;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !isVisible) {
						isVisible = true;
					}
				});
			},
			{ threshold: 0.1 }
		);

		if (sectionRef) {
			observer.observe(sectionRef);
		}

		return () => observer.disconnect();
	});
	function formatNumber(num: number): string {
		if (num >= 1000) return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + "K";
		return num.toLocaleString();
	}
</script>

<section id="stats" class="py-20 relative overflow-hidden" bind:this={sectionRef}>
	<div class="container mx-auto px-6 relative z-10">
		<div class="flex flex-wrap justify-center gap-6 lg:gap-10">
			{#each stats as stat, index (stat.label)}
				<div
					class="glass-card rounded-3xl p-6 text-center relative group min-w-[160px]"
					class:opacity-0={!isVisible}
					class:translate-y-10={!isVisible}
					style="transition: all 0.5s ease-out; transition-delay: {index * 0.1}s;"
				>
					<div
						class="mx-auto mb-6 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary-light"
					>
						<Icon name={stat.icon} size={24} ariaLabel={stat.label} />
					</div>

					<div class="space-y-1">
						<div class="text-3xl lg:text-4xl font-black text-white tracking-tight">
							{formatNumber(stat.value)}{stat.suffix}
						</div>
						<div class="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
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
