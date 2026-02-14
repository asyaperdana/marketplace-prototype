<script lang="ts">
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import { config } from "$lib/config";
	import ProductCard from "$lib/components/product/ProductCard.svelte";
	import { cn, resolve } from "$lib/utils";
	import Icon from "$lib/components/ui/Icon.svelte";
	import {
		filteredProducts,
		allProducts,
		productFilters,
		isLoading,
		error as productsError,
		loadProducts,
		setSearchQuery,
		setCategory,
		setSortBy,
		resetFilters,
		type ProductListingFilters
	} from "$lib/stores/products";

	const skeletonCards = Array.from({ length: 9 });

	onMount(() => {
		loadProducts();
	});
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
							value={$productFilters.searchQuery}
							oninput={(e) => setSearchQuery(e.currentTarget.value)}
							placeholder="Cari barang impian..."
							class="w-full pl-12 pr-4 py-4 rounded-2xl bg-dark-lighter/80 border border-white/10 text-white placeholder-slate-500 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all backdrop-blur-sm"
						/>
					</div>

					<select
						value={$productFilters.sortBy}
						onchange={(e) =>
							setSortBy(e.currentTarget.value as ProductListingFilters["sortBy"])}
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
								$productFilters.category === "all"
									? "bg-linear-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30"
									: "bg-dark-lighter text-slate-400 hover:text-white hover:bg-white/10 border border-white/5"
							)}
							onclick={() => setCategory("all")}
						>
							<Icon name="tag" size={18} ariaLabel="Semua kategori" />
							<span>Semua</span>
						</button>

						{#each config.categories as cat (cat.id)}
							<button
								class={cn(
									"px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap flex items-center gap-3",
									$productFilters.category === cat.id
										? "bg-linear-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30"
										: "bg-dark-lighter text-slate-400 hover:text-white hover:bg-white/10 border border-white/5"
								)}
								onclick={() => setCategory(cat.id)}
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
							>{$filteredProducts.length}</span
						>
					</div>
					<div class="h-2 bg-dark-lighter rounded-full overflow-hidden">
						<div
							class="h-full bg-linear-to-r from-primary to-secondary rounded-full transition-all duration-500"
							style="width: {($filteredProducts.length / $allProducts.length) * 100}%"
						></div>
					</div>
					<p class="text-xs text-slate-500 mt-2">
						dari {$allProducts.length} total listing
					</p>
				</div>
			</aside>

			<!-- Product Grid -->
			<div class="flex-1">
				{#if $isLoading}
					<div class="space-y-6" transition:fade={{ duration: 200 }}>
						<div class="flex items-center justify-between">
							<div class="skeleton h-4 w-44 rounded-full"></div>
							<div class="skeleton h-4 w-24 rounded-full"></div>
						</div>
						<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
							{#each skeletonCards as _, index (index)}
								<div
									class="rounded-2xl overflow-hidden border border-white/5 bg-white/5 {index >=
									6
										? 'hidden sm:block'
										: ''}"
								>
									<div class="aspect-square skeleton"></div>
									<div class="p-4 space-y-3">
										<div class="skeleton h-4 w-5/6 rounded-full"></div>
										<div class="skeleton h-4 w-2/3 rounded-full"></div>
										<div class="flex items-center justify-between pt-2">
											<div class="skeleton h-3 w-24 rounded-full"></div>
											<div class="skeleton h-3 w-16 rounded-full"></div>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				{:else if $productsError}
					<div
						class="flex flex-col items-center justify-center py-24 text-red-400"
						transition:fade={{ duration: 200 }}
					>
						<Icon name="alert-circle" size={48} className="mb-4 text-red-500" />
						<p class="text-lg font-bold mb-2">Terjadi Kesalahan</p>
						<p class="mb-6 text-slate-400">{$productsError}</p>
						<button
							onclick={() => loadProducts(true)}
							class="px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition"
						>
							Coba Lagi
						</button>
					</div>
				{:else if $filteredProducts.length > 0}
					<div
						class="mb-6 flex items-center justify-between"
						transition:fade={{ duration: 200 }}
					>
						<p class="text-slate-400">
							Menampilkan <span class="text-white font-bold"
								>{$filteredProducts.length}</span
							> produk
						</p>
						<div class="flex items-center gap-2 text-slate-500 text-sm">
							<span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
							Live update
						</div>
					</div>

					<div
						class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
						transition:fade={{ duration: 250 }}
					>
						{#each $filteredProducts as product, index (product.id)}
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
					{@const hasQuery = $productFilters.searchQuery.trim().length > 0}
					{@const isCategoryFiltered = $productFilters.category !== "all"}
					{@const activeCategory = config.categories.find(
						(cat) => cat.id === $productFilters.category
					)}
					{@const mainIcon = hasQuery ? "search" : isCategoryFiltered ? "tag" : "box"}
					{@const leftBadge =
						hasQuery && isCategoryFiltered
							? "tag"
							: hasQuery
								? "sparkles"
								: isCategoryFiltered
									? "grid"
									: "sparkles"}
					{@const rightBadge =
						hasQuery && isCategoryFiltered
							? "grid"
							: hasQuery
								? "box"
								: isCategoryFiltered
									? "box"
									: "grid"}
					<div
						class="flex flex-col items-center justify-center py-24 text-center"
						transition:fade={{ duration: 200 }}
					>
						<div
							class="empty-orb w-32 h-32 rounded-full bg-dark-lighter flex items-center justify-center mb-8"
						>
							<Icon
								name={mainIcon}
								size={28}
								className="text-slate-300"
								ariaLabel="Ilustrasi empty state"
							/>
							<div class="empty-badge badge-left">
								<Icon name={leftBadge} size={14} className="text-slate-400" />
							</div>
							<div class="empty-badge badge-right">
								<Icon name={rightBadge} size={14} className="text-slate-400" />
							</div>
						</div>
						<h3 class="text-2xl font-black text-white mb-3">Produk tidak ditemukan</h3>
						<p class="text-slate-400 max-w-md mb-8">
							{#if hasQuery && isCategoryFiltered}
								Tidak ada hasil untuk "{$productFilters.searchQuery}" di kategori
								{activeCategory?.name ?? "terpilih"}. Coba kata kunci lain atau ubah
								kategori.
							{:else if hasQuery}
								Tidak ada hasil untuk "{$productFilters.searchQuery}". Coba kata
								kunci lain atau pilih kategori berbeda.
							{:else if isCategoryFiltered}
								Belum ada produk di kategori {activeCategory?.name ?? "terpilih"}.
								Coba kategori lain atau reset filter.
							{:else}
								Coba ubah kata kunci pencarian atau pilih kategori lain untuk
								menemukan barang impianmu.
							{/if}
						</p>
						<button
							onclick={resetFilters}
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

	.skeleton {
		position: relative;
		overflow: hidden;
		background: rgba(255, 255, 255, 0.08);
	}

	.skeleton::after {
		content: "";
		position: absolute;
		inset: 0;
		background: linear-gradient(
			90deg,
			rgba(255, 255, 255, 0) 0%,
			rgba(255, 255, 255, 0.2) 50%,
			rgba(255, 255, 255, 0) 100%
		);
		transform: translateX(-100%);
		animation: shimmer 1.2s infinite;
	}

	@keyframes shimmer {
		100% {
			transform: translateX(100%);
		}
	}

	.empty-orb {
		position: relative;
		border: 1px solid rgba(255, 255, 255, 0.06);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
	}

	.empty-badge {
		position: absolute;
		width: 32px;
		height: 32px;
		border-radius: 999px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.08);
	}

	.badge-left {
		left: -6px;
		bottom: 14px;
	}

	.badge-right {
		right: -6px;
		top: 14px;
	}

	@media (prefers-reduced-motion: reduce) {
		.animate-fade-in-up {
			animation-duration: 0.01ms;
		}

		.skeleton::after {
			animation: none;
		}
	}
</style>
