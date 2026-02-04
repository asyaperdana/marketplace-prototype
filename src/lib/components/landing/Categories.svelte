<script lang="ts">
	import type { Category } from "$lib/types/landing";
	import Icon from "$lib/components/ui/Icon.svelte";

	const categories: Category[] = [
		{
			icon: "shirt",
			name: "Fashion Wanita",
			count: "25K+ produk",
			class: "md:col-span-2 md:row-span-2",
			delay: 0,
			image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=600&fit=crop&q=80"
		},
		{
			icon: "phone",
			name: "Elektronik",
			count: "15K+ produk",
			class: "md:col-span-2",
			delay: 0.1,
			image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=600&fit=crop&q=80"
		},
		{
			icon: "shirt",
			name: "Fashion Pria",
			count: "18K+ produk",
			class: "",
			delay: 0.2,
			image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&h=600&fit=crop&q=80"
		},
		{
			icon: "home",
			name: "Peralatan Rumah",
			count: "12K+ produk",
			class: "",
			delay: 0.3,
			image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&h=600&fit=crop&q=80"
		},
		{
			icon: "gamepad",
			name: "Games & Toys",
			count: "7K+ produk",
			class: "md:col-span-2",
			delay: 0.4,
			image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&h=600&fit=crop&q=80"
		},
		{
			icon: "book",
			name: "Buku & Hobi",
			count: "10K+ produk",
			class: "",
			delay: 0.5,
			image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=600&fit=crop&q=80"
		},
		{
			icon: "baby",
			name: "Perlengkapan Bayi",
			count: "8K+ produk",
			class: "",
			delay: 0.6,
			image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&h=600&fit=crop&q=80"
		},
		{
			icon: "sparkles",
			name: "Kecantikan",
			count: "9K+ produk",
			class: "md:col-span-2",
			delay: 0.7,
			image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop&q=80"
		}
	];

	import { reveal } from "$lib/utils/reveal";
	import { resolve } from "$lib/utils";
	let isVisible = $state(false);
</script>

<section
	id="categories"
	class="py-20 relative overflow-hidden bg-dark-deep"
	use:reveal
	onreveal={() => (isVisible = true)}
>
	<!-- Background Decoration -->
	<div class="absolute inset-0 z-0">
		<div class="bg-noise opacity-30 pointer-events-none"></div>
		<div
			class="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none"
		></div>
		<div
			class="absolute bottom-0 left-0 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2 pointer-events-none"
		></div>
	</div>

	<div class="container mx-auto px-6 relative z-10">
		<div
			class="text-center mb-20 space-y-4"
			class:opacity-0={!isVisible}
			class:translate-y-10={!isVisible}
			class:transition-all={true}
			class:duration-1000={true}
		>
			<h2 class="text-3xl sm:text-4xl lg:text-6xl font-black text-white tracking-tighter">
				Jelajahi <span class="gradient-text">Kategori</span>
			</h2>
			<p class="text-xl text-slate-300 max-w-2xl mx-auto">
				Temukan barang impianmu dari berbagai kategori yang dikurasi khusus untuk memenuhi
				gaya hidupmu.
			</p>
		</div>

		<div
			class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 auto-rows-[180px] sm:auto-rows-[220px]"
		>
			{#each categories as category (category.name)}
				<button
					class="group relative overflow-hidden rounded-4xl glass hover:border-primary/50 transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 text-left p-6 sm:p-10 flex flex-col justify-end {category.class}"
					class:opacity-0={!isVisible}
					class:translate-y-10={!isVisible}
					style="transition-delay: {category.delay}s"
				>
					<!-- Background Image -->
					{#if category.image}
						<img
							src={category.image}
							alt={category.name}
							loading="lazy"
							decoding="async"
							class="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700"
						/>
					{/if}
					<!-- Overlay Gradients -->
					<div
						class="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/20 transition-all duration-700"
					></div>
					<div
						class="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent opacity-30"
					></div>

					<div
						class="relative z-10 transition-transform duration-500 group-hover:-translate-y-2"
					>
						<span
							class="w-12 h-12 sm:w-14 sm:h-14 mb-4 sm:mb-6 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-primary-light shadow-lg shadow-black/30 transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 origin-left"
						>
							<Icon name={category.icon} size={22} ariaLabel={category.name} />
						</span>
						<h3
							class="text-2xl font-black text-white mb-2 group-hover:text-primary-light transition-colors drop-shadow-lg"
						>
							{category.name}
						</h3>
						<p
							class="text-sm text-slate-200 font-bold tracking-wide uppercase group-hover:text-white transition-colors drop-shadow-md"
						>
							{category.count}
						</p>
					</div>

					<!-- Decorative Arrow -->
					<div
						class="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500"
					>
						<div
							class="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 rotate-12 group-hover:rotate-0 transition-transform duration-500"
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
									d="M13 7l5 5-5 5"
								/>
							</svg>
						</div>
					</div>
				</button>
			{/each}
		</div>

		<div
			class="mt-20 text-center"
			class:opacity-0={!isVisible}
			class:translate-y-10={!isVisible}
			style="transition-delay: 0.8s"
		>
			<a
				href={resolve("/products")}
				class="btn btn-secondary px-10 py-4 text-lg font-bold hover:scale-105 active:scale-95 group"
			>
				<span>Lihat Semua Koleksi</span>
				<svg
					class="w-5 h-5 group-hover:translate-x-1 transition-transform"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M17 8l4 4m0 0l-4 4m4-4H3"
					/>
				</svg>
			</a>
		</div>
	</div>
</section>
