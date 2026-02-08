<script lang="ts">
	import { config } from "$lib/config";
	import { mockProducts } from "$lib/data/mock-products";
	import ProductCard from "$lib/components/product/ProductCard.svelte";
	import { cn, resolve } from "$lib/utils";
	import Icon from "$lib/components/ui/Icon.svelte";

	let searchQuery = $state("");
	let selectedCategory = $state<string>("all");
	let sortBy = $state<"newest" | "price_low" | "price_high">("newest");

	let filteredProducts = $derived.by(() => {
		let result = [...mockProducts];

		if (selectedCategory !== "all") {
			result = result.filter((p) => p.category === selectedCategory);
		}

		if (searchQuery.trim()) {
			const q = searchQuery.toLowerCase();
			result = result.filter(
				(p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
			);
		}

		if (sortBy === "price_low") {
			result.sort((a, b) => a.price - b.price);
		} else if (sortBy === "price_high") {
			result.sort((a, b) => b.price - a.price);
		} else {
			result.sort(
				(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
			);
		}

		return result;
	});

	function handleCategoryClick(categoryId: string) {
		selectedCategory = categoryId;
	}
</script>

<svelte:head>
	<title>Explore Products | {config.app.name}</title>
</svelte:head>

<div class="min-h-screen bg-dark-deep">
	<!-- Hero Banner -->
	<div class="relative overflow-hidden bg-linear-to-br from-dark-deep via-dark to-dark-lighter">
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

		<div class="container mx-auto px-6 py-16 relative z-10">
			<!-- Back to Home Button -->
			<a
				href={resolve("/")}
				class="inline-flex items-center gap-2 px-4 py-2 mb-8 glass-light rounded-xl border border-white/10 text-slate-300 hover:text-white hover:border-primary/50 transition-all duration-300 group"
			>
				<svg
					class="w-5 h-5 group-hover:-translate-x-1 transition-transform"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 19l-7-7 7-7"
					/>
				</svg>
				<span class="font-medium">Kembali ke Beranda</span>
			</a>

			<div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
				<div class="space-y-4">
					<h1 class="text-4xl lg:text-6xl font-black text-white tracking-tighter">
						Explore <span class="gradient-text">Collection</span>
					</h1>
					<p class="text-xl text-slate-400 max-w-2xl">
						Temukan barang impianmu dari ribuan produk berkualitas dengan harga
						terjangkau.
					</p>
				</div>

				<!-- Search Box -->
				<div class="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
					<div class="relative w-full sm:w-80">
						<div
							class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
						>
							<Icon
								name="search"
								size={16}
								className="text-slate-500"
								ariaLabel="Cari"
							/>
						</div>
						<input
							type="text"
							bind:value={searchQuery}
							placeholder="Cari barang impian..."
							class="w-full pl-12 pr-4 py-4 rounded-2xl bg-dark-lighter/80 border border-white/10 text-white placeholder-slate-500 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all backdrop-blur-sm"
						/>
					</div>

					<select
						bind:value={sortBy}
						class="px-4 py-4 rounded-2xl bg-dark-lighter/80 border border-white/10 text-white cursor-pointer focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all backdrop-blur-sm"
					>
						<option value="newest">Terbaru</option>
						<option value="price_low">Harga Terendah</option>
						<option value="price_high">Harga Tertinggi</option>
					</select>
				</div>
			</div>
		</div>
	</div>

	<div class="container mx-auto px-6 py-12">
		<div class="flex flex-col lg:flex-row gap-10">
			<!-- Sidebar Filters -->
			<aside class="w-full lg:w-72 shrink-0 space-y-8">
				<!-- Category Filter -->
				<div class="glass rounded-3xl p-6 border border-white/5">
					<h3 class="font-bold text-white text-lg mb-6 flex items-center gap-2">
						<Icon name="grid" size={18} ariaLabel="Kategori" />
						<span>Kategori</span>
					</h3>
					<div
						class="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide"
					>
						<button
							class={cn(
								"px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap flex items-center gap-3",
								selectedCategory === "all"
									? "bg-linear-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30"
									: "bg-dark-lighter text-slate-400 hover:text-white hover:bg-white/10 border border-white/5"
							)}
							onclick={() => handleCategoryClick("all")}
						>
							<Icon name="tag" size={18} ariaLabel="Semua kategori" />
							<span>Semua</span>
						</button>

						{#each config.categories as cat (cat.id)}
							<button
								class={cn(
									"px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap flex items-center gap-3",
									selectedCategory === cat.id
										? "bg-linear-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30"
										: "bg-dark-lighter text-slate-400 hover:text-white hover:bg-white/10 border border-white/5"
								)}
								onclick={() => handleCategoryClick(cat.id)}
							>
								<Icon name={cat.icon} size={18} ariaLabel={cat.name} />
								<span>{cat.name}</span>
							</button>
						{/each}
					</div>
				</div>

				<!-- Tips Card -->
				<div
					class="hidden lg:block glass rounded-3xl p-6 border border-white/5 bg-linear-to-br from-primary/10 to-secondary/10"
				>
					<div class="flex items-center gap-3 mb-4">
						<div
							class="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center"
						>
							<Icon name="bulb" size={18} ariaLabel="Tips" />
						</div>
						<h4 class="font-bold text-white">Tips Belanja</h4>
					</div>
					<p class="text-sm text-slate-300 leading-relaxed">
						Gunakan filter kategori untuk menemukan barang spesifik. Cek deskripsi dan
						kondisi barang sebelum checkout!
					</p>
				</div>

				<!-- Stats Card -->
				<div class="hidden lg:block glass rounded-3xl p-6 border border-white/5">
					<div class="flex items-center justify-between mb-4">
						<span class="text-slate-400 text-sm font-medium">Total Produk</span>
						<span class="text-2xl font-black gradient-text"
							>{filteredProducts.length}</span
						>
					</div>
					<div class="h-2 bg-dark-lighter rounded-full overflow-hidden">
						<div
							class="h-full bg-linear-to-r from-primary to-secondary rounded-full transition-all duration-500"
							style="width: {(filteredProducts.length / mockProducts.length) * 100}%"
						></div>
					</div>
					<p class="text-xs text-slate-500 mt-2">
						dari {mockProducts.length} total listing
					</p>
				</div>
			</aside>

			<!-- Product Grid -->
			<div class="flex-1">
				{#if filteredProducts.length > 0}
					<div class="mb-6 flex items-center justify-between">
						<p class="text-slate-400">
							Menampilkan <span class="text-white font-bold"
								>{filteredProducts.length}</span
							> produk
						</p>
						<div class="flex items-center gap-2 text-slate-500 text-sm">
							<span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
							Live update
						</div>
					</div>

					<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
						{#each filteredProducts as product, index (product.id)}
							<div
								class="opacity-0 translate-y-10 animate-fade-in-up"
								style="animation-delay: {index *
									50}ms; animation-fill-mode: forwards;"
							>
								<ProductCard {product} />
							</div>
						{/each}
					</div>
				{:else}
					<div class="flex flex-col items-center justify-center py-24 text-center">
						<div
							class="w-32 h-32 rounded-full bg-dark-lighter flex items-center justify-center mb-8 text-6xl"
						>
							<Icon name="search" size={22} ariaLabel="Tidak ada hasil" />
						</div>
						<h3 class="text-2xl font-black text-white mb-3">Produk tidak ditemukan</h3>
						<p class="text-slate-400 max-w-md mb-8">
							Coba ubah kata kunci pencarian atau pilih kategori lain untuk menemukan
							barang impianmu.
						</p>
						<button
							onclick={() => {
								selectedCategory = "all";
								searchQuery = "";
							}}
							class="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-linear-to-r from-primary to-secondary text-white font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/30"
						>
							<Icon name="refresh" size={18} ariaLabel="Reset filter" />
							<span>Reset Semua Filter</span>
						</button>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	@keyframes fade-in-up {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in-up {
		animation: fade-in-up 0.5s ease-out;
	}
</style>
