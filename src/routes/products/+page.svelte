<script lang="ts">
	import { config } from "$lib/config";
	import { mockProducts } from "$lib/data/mock-products";
	import ProductCard from "$lib/components/product/ProductCard.svelte";
	import { cn } from "$lib/utils";

	// Local state for active filters (synced with store or local usage)
	// For simplicity in Phase 1, we can just use local state derived from the store or directly use the store.
	// Let's use local state for better control in this view.

	let searchQuery = $state("");
	let selectedCategory = $state<string>("all");
	let sortBy = $state<"newest" | "price_low" | "price_high">("newest");

	// Reactive filtering
	let filteredProducts = $derived.by(() => {
		let result = [...mockProducts];

		// 1. Filter by Category
		if (selectedCategory !== "all") {
			result = result.filter((p) => p.category === selectedCategory);
		}

		// 2. Filter by Search
		if (searchQuery.trim()) {
			const q = searchQuery.toLowerCase();
			result = result.filter(
				(p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
			);
		}

		// 3. Sort
		if (sortBy === "price_low") {
			result.sort((a, b) => a.price - b.price);
		} else if (sortBy === "price_high") {
			result.sort((a, b) => b.price - a.price);
		} else {
			// Newest (Default)
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

<div class="container mx-auto px-4 py-8 lg:py-12">
	<!-- Page Header -->
	<div class="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
		<div>
			<h1 class="text-3xl font-bold text-slate-900">Explore Collection</h1>
			<p class="text-slate-500 mt-2">Temukan barang impianmu dari penjual terpercaya.</p>
		</div>

		<!-- Mobile Search & Sort (Visible on all, optimized layout) -->
		<div class="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
			<div class="relative w-full md:w-64">
				<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					<span class="text-slate-400">🔍</span>
				</div>
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Cari barang..."
					class="pl-10 w-full rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500 transition-all"
				/>
			</div>

			<select
				bind:value={sortBy}
				class="rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500 cursor-pointer"
			>
				<option value="newest">Terbaru</option>
				<option value="price_low">Harga Terendah</option>
				<option value="price_high">Harga Tertinggi</option>
			</select>
		</div>
	</div>

	<div class="flex flex-col lg:flex-row gap-8">
		<!-- Sidebar Filters (Desktop) / Horizontal Tags (Mobile) -->
		<aside class="w-full lg:w-64 shrink-0 space-y-8">
			<div>
				<h3 class="font-bold text-slate-900 mb-4 px-1">Kategori</h3>
				<div
					class="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide lg:h-auto"
				>
					<button
						class={cn(
							"px-4 py-2 rounded-lg text-sm font-medium text-left transition-all whitespace-nowrap",
							selectedCategory === "all"
								? "bg-teal-600 text-white shadow-md shadow-teal-200"
								: "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100"
						)}
						onclick={() => handleCategoryClick("all")}
					>
						Semua Kategori
					</button>

					{#each config.categories as cat (cat.id)}
						<button
							class={cn(
								"px-4 py-2 rounded-lg text-sm font-medium text-left transition-all whitespace-nowrap flex items-center gap-2",
								selectedCategory === cat.id
									? "bg-teal-600 text-white shadow-md shadow-teal-200"
									: "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100"
							)}
							onclick={() => handleCategoryClick(cat.id)}
						>
							<span>{cat.icon}</span>
							<span>{cat.name}</span>
						</button>
					{/each}
				</div>
			</div>

			<!-- Additional filters can go here in Phase 2 -->
			<div class="hidden lg:block bg-teal-50 rounded-2xl p-6 border border-teal-100">
				<h4 class="font-bold text-teal-900 mb-2">Tips Belanja</h4>
				<p class="text-sm text-teal-700 leading-relaxed">
					Gunakan filter kategori untuk menemukan barang spesifik. Pastikan cek deskripsi
					dan kondisi barang sebelum membeli.
				</p>
			</div>
		</aside>

		<!-- Product Grid -->
		<div class="flex-1">
			{#if filteredProducts.length > 0}
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
					{#each filteredProducts as product (product.id)}
						<ProductCard {product} />
					{/each}
				</div>
				else}
				<div class="flex flex-col items-center justify-center py-20 text-center">
					<div
						class="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-4xl"
					>
						🤔
					</div>
					<h3 class="text-xl font-bold text-slate-900">Produk tidak ditemukan</h3>
					<p class="text-slate-500 mt-2 max-w-md">
						Coba ubah kata kunci pencarian atau ganti kategori lain.
					</p>
					<button
						onclick={() => {
							selectedCategory = "all";
							searchQuery = "";
						}}
						class="mt-6 text-teal-600 font-medium hover:underline"
					>
						Reset Filter
					</button>
				</div>
			{/if}
		</div>
	</div>
</div>
