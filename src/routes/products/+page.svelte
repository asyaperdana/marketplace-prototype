<script lang="ts">
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { Navbar, Footer } from "$lib/components/layout";
	import { Button, Input } from "$lib/components/ui";
	import { ProductCard } from "$lib/components/product";
	import { getProducts, getCategories, formatPrice } from "$lib/services/products";
	import type { Product, Category, ProductFilters, ProductCondition } from "$lib/types";

	let products = $state<Product[]>([]);
	let categories = $state<Category[]>([]);
	let loading = $state(true);
	let totalProducts = $state(0);
	let currentPage = $state(1);
	let totalPages = $state(1);

	// Filters
	let selectedCategory = $state<string>("");
	let minPrice = $state<string>("");
	let maxPrice = $state<string>("");
	let selectedConditions = $state<ProductCondition[]>([]);
	let sortBy = $state<"newest" | "price_low" | "price_high" | "popular">("newest");
	let searchQuery = $state("");

	// Mobile filter visibility
	let showFilters = $state(false);

	const conditions: { value: ProductCondition; label: string }[] = [
		{ value: "new", label: "Baru" },
		{ value: "like_new", label: "Seperti Baru" },
		{ value: "good", label: "Bagus" },
		{ value: "fair", label: "Cukup" }
	];

	async function loadProducts() {
		loading = true;
		try {
			const filters: ProductFilters = {
				category: selectedCategory || undefined,
				minPrice: minPrice ? parseInt(minPrice) : undefined,
				maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
				condition: selectedConditions.length > 0 ? selectedConditions : undefined,
				sortBy
			};

			const response = await getProducts(filters, currentPage, 12);
			products = response.items;
			totalProducts = response.total;
			totalPages = response.totalPages;
		} finally {
			loading = false;
		}
	}

	async function loadCategories() {
		categories = await getCategories();
	}

	onMount(() => {
		loadCategories();
		loadProducts();
	});

	function toggleCondition(condition: ProductCondition) {
		if (selectedConditions.includes(condition)) {
			selectedConditions = selectedConditions.filter((c) => c !== condition);
		} else {
			selectedConditions = [...selectedConditions, condition];
		}
	}

	function applyFilters() {
		currentPage = 1;
		loadProducts();
		showFilters = false;
	}

	function resetFilters() {
		selectedCategory = "";
		minPrice = "";
		maxPrice = "";
		selectedConditions = [];
		sortBy = "newest";
		currentPage = 1;
		loadProducts();
	}

	function handlePageChange(newPage: number) {
		currentPage = newPage;
		loadProducts();
		window.scrollTo({ top: 0, behavior: "smooth" });
	}
</script>

<svelte:head>
	<title>Produk - Okis Garage Sale</title>
	<meta
		name="description"
		content="Jelajahi ribuan barang preloved berkualitas dengan harga terjangkau"
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Navbar />

<main class="products-page">
	<!-- Hero Section -->
	<section class="hero">
		<div class="container">
			<h1>Jelajahi Produk</h1>
			<p>Temukan barang preloved berkualitas dengan harga terjangkau</p>

			<!-- Search Bar -->
			<div class="search-bar">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
					/>
				</svg>
				<input
					type="text"
					placeholder="Cari produk..."
					bind:value={searchQuery}
					onkeydown={(e) => e.key === "Enter" && applyFilters()}
				/>
				<Button variant="primary" onclick={applyFilters}>Cari</Button>
			</div>
		</div>
	</section>

	<div class="container main-content">
		<!-- Mobile Filter Toggle -->
		<button class="filter-toggle" onclick={() => (showFilters = !showFilters)}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
				/>
			</svg>
			Filter
		</button>

		<div class="content-grid">
			<!-- Filters Sidebar -->
			<aside class="filters-sidebar" class:show={showFilters}>
				<div class="filters-header">
					<h2>Filter</h2>
					<button class="close-filters" onclick={() => (showFilters = false)}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M6 18 18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				<!-- Category Filter -->
				<div class="filter-group">
					<h3>Kategori</h3>
					<div class="category-list">
						<button
							class="category-btn"
							class:active={selectedCategory === ""}
							onclick={() => (selectedCategory = "")}
						>
							Semua Kategori
						</button>
						{#each categories as category}
							<button
								class="category-btn"
								class:active={selectedCategory === category.slug}
								onclick={() => (selectedCategory = category.slug)}
							>
								<span class="icon">{category.icon}</span>
								{category.name}
							</button>
						{/each}
					</div>
				</div>

				<!-- Price Filter -->
				<div class="filter-group">
					<h3>Harga</h3>
					<div class="price-inputs">
						<input type="number" placeholder="Min" bind:value={minPrice} />
						<span>-</span>
						<input type="number" placeholder="Max" bind:value={maxPrice} />
					</div>
				</div>

				<!-- Condition Filter -->
				<div class="filter-group">
					<h3>Kondisi</h3>
					<div class="condition-list">
						{#each conditions as condition}
							<label class="condition-checkbox">
								<input
									type="checkbox"
									checked={selectedConditions.includes(condition.value)}
									onchange={() => toggleCondition(condition.value)}
								/>
								<span>{condition.label}</span>
							</label>
						{/each}
					</div>
				</div>

				<!-- Filter Actions -->
				<div class="filter-actions">
					<Button variant="primary" fullWidth onclick={applyFilters}>
						Terapkan Filter
					</Button>
					<Button variant="ghost" fullWidth onclick={resetFilters}>Reset</Button>
				</div>
			</aside>

			<!-- Products Grid -->
			<section class="products-section">
				<!-- Sort & Results Count -->
				<div class="products-header">
					<span class="results-count">{totalProducts} produk ditemukan</span>
					<div class="sort-select">
						<label>Urutkan:</label>
						<select bind:value={sortBy} onchange={applyFilters}>
							<option value="newest">Terbaru</option>
							<option value="price_low">Harga: Rendah ke Tinggi</option>
							<option value="price_high">Harga: Tinggi ke Rendah</option>
							<option value="popular">Populer</option>
						</select>
					</div>
				</div>

				<!-- Products Grid -->
				{#if loading}
					<div class="loading-grid">
						{#each Array(8) as _, i}
							<div class="skeleton-card">
								<div class="skeleton-image"></div>
								<div class="skeleton-content">
									<div class="skeleton-title"></div>
									<div class="skeleton-price"></div>
									<div class="skeleton-meta"></div>
								</div>
							</div>
						{/each}
					</div>
				{:else if products.length === 0}
					<div class="empty-state">
						<div class="empty-icon">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
								/>
							</svg>
						</div>
						<h3>Tidak ada produk ditemukan</h3>
						<p>Coba ubah filter atau kata kunci pencarian</p>
						<Button variant="primary" onclick={resetFilters}>Reset Filter</Button>
					</div>
				{:else}
					<div class="products-grid">
						{#each products as product (product.id)}
							<ProductCard {product} />
						{/each}
					</div>

					<!-- Pagination -->
					{#if totalPages > 1}
						<div class="pagination">
							<button
								class="page-btn"
								disabled={currentPage === 1}
								onclick={() => handlePageChange(currentPage - 1)}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="2"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M15.75 19.5 8.25 12l7.5-7.5"
									/>
								</svg>
							</button>

							{#each Array(totalPages) as _, i}
								<button
									class="page-btn"
									class:active={currentPage === i + 1}
									onclick={() => handlePageChange(i + 1)}
								>
									{i + 1}
								</button>
							{/each}

							<button
								class="page-btn"
								disabled={currentPage === totalPages}
								onclick={() => handlePageChange(currentPage + 1)}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="2"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="m8.25 4.5 7.5 7.5-7.5 7.5"
									/>
								</svg>
							</button>
						</div>
					{/if}
				{/if}
			</section>
		</div>
	</div>
</main>

<Footer />

<style>
	.products-page {
		min-height: 100vh;
		background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
		font-family: "Inter", system-ui, sans-serif;
	}

	.container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	/* Hero Section */
	.hero {
		padding: 8rem 0 3rem;
		text-align: center;
		background: radial-gradient(
			ellipse 80% 50% at 50% -20%,
			rgba(20, 184, 166, 0.15),
			transparent
		);
	}

	.hero h1 {
		font-size: 2.5rem;
		font-weight: 800;
		color: #f8fafc;
		margin-bottom: 0.5rem;
	}

	.hero p {
		color: #94a3b8;
		font-size: 1.125rem;
		margin-bottom: 2rem;
	}

	.search-bar {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		max-width: 600px;
		margin: 0 auto;
		padding: 0.5rem 0.5rem 0.5rem 1.25rem;
		background: rgba(30, 41, 59, 0.8);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(148, 163, 184, 0.2);
		border-radius: 1rem;
	}

	.search-bar svg {
		width: 1.25rem;
		height: 1.25rem;
		color: #64748b;
		flex-shrink: 0;
	}

	.search-bar input {
		flex: 1;
		background: none;
		border: none;
		color: #f8fafc;
		font-size: 1rem;
		outline: none;
	}

	.search-bar input::placeholder {
		color: #64748b;
	}

	/* Main Content */
	.main-content {
		padding-bottom: 4rem;
	}

	.content-grid {
		display: grid;
		grid-template-columns: 280px 1fr;
		gap: 2rem;
	}

	/* Filter Toggle (Mobile) */
	.filter-toggle {
		display: none;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		background: rgba(30, 41, 59, 0.6);
		border: 1px solid rgba(148, 163, 184, 0.2);
		border-radius: 0.75rem;
		color: #f8fafc;
		font-weight: 500;
		cursor: pointer;
		margin-bottom: 1rem;
	}

	.filter-toggle svg {
		width: 1.25rem;
		height: 1.25rem;
	}

	/* Filters Sidebar */
	.filters-sidebar {
		position: sticky;
		top: 6rem;
		height: fit-content;
		background: rgba(30, 41, 59, 0.6);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(148, 163, 184, 0.1);
		border-radius: 1rem;
		padding: 1.5rem;
	}

	.filters-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.5rem;
	}

	.filters-header h2 {
		font-size: 1.125rem;
		font-weight: 600;
		color: #f8fafc;
	}

	.close-filters {
		display: none;
		background: none;
		border: none;
		color: #94a3b8;
		cursor: pointer;
	}

	.close-filters svg {
		width: 1.5rem;
		height: 1.5rem;
	}

	.filter-group {
		margin-bottom: 1.5rem;
	}

	.filter-group h3 {
		font-size: 0.875rem;
		font-weight: 600;
		color: #e2e8f0;
		margin-bottom: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.category-list {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.category-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.625rem 0.75rem;
		background: transparent;
		border: none;
		border-radius: 0.5rem;
		color: #94a3b8;
		font-size: 0.875rem;
		text-align: left;
		cursor: pointer;
		transition: all 0.2s;
	}

	.category-btn:hover {
		background: rgba(148, 163, 184, 0.1);
		color: #f8fafc;
	}

	.category-btn.active {
		background: rgba(20, 184, 166, 0.1);
		color: #14b8a6;
	}

	.category-btn .icon {
		font-size: 1rem;
	}

	.price-inputs {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.price-inputs input {
		flex: 1;
		padding: 0.625rem;
		background: rgba(15, 23, 42, 0.5);
		border: 1px solid rgba(148, 163, 184, 0.2);
		border-radius: 0.5rem;
		color: #f8fafc;
		font-size: 0.875rem;
		outline: none;
	}

	.price-inputs input:focus {
		border-color: #14b8a6;
	}

	.price-inputs span {
		color: #64748b;
	}

	.condition-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.condition-checkbox {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: #94a3b8;
		font-size: 0.875rem;
		cursor: pointer;
	}

	.condition-checkbox input {
		accent-color: #14b8a6;
	}

	.filter-actions {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-top: 1.5rem;
		padding-top: 1.5rem;
		border-top: 1px solid rgba(148, 163, 184, 0.1);
	}

	/* Products Section */
	.products-section {
		min-height: 500px;
	}

	.products-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.5rem;
	}

	.results-count {
		color: #94a3b8;
		font-size: 0.875rem;
	}

	.sort-select {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.sort-select label {
		color: #94a3b8;
		font-size: 0.875rem;
	}

	.sort-select select {
		padding: 0.5rem 0.75rem;
		background: rgba(30, 41, 59, 0.6);
		border: 1px solid rgba(148, 163, 184, 0.2);
		border-radius: 0.5rem;
		color: #f8fafc;
		font-size: 0.875rem;
		cursor: pointer;
	}

	.products-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 1.5rem;
	}

	/* Loading Skeleton */
	.loading-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 1.5rem;
	}

	.skeleton-card {
		background: rgba(30, 41, 59, 0.6);
		border-radius: 1rem;
		overflow: hidden;
	}

	.skeleton-image {
		aspect-ratio: 1;
		background: linear-gradient(
			90deg,
			rgba(148, 163, 184, 0.1) 0%,
			rgba(148, 163, 184, 0.2) 50%,
			rgba(148, 163, 184, 0.1) 100%
		);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
	}

	.skeleton-content {
		padding: 1rem;
	}

	.skeleton-title {
		height: 1rem;
		background: rgba(148, 163, 184, 0.1);
		border-radius: 0.25rem;
		margin-bottom: 0.75rem;
	}

	.skeleton-price {
		height: 1.25rem;
		width: 60%;
		background: rgba(148, 163, 184, 0.1);
		border-radius: 0.25rem;
		margin-bottom: 0.75rem;
	}

	.skeleton-meta {
		height: 0.75rem;
		width: 40%;
		background: rgba(148, 163, 184, 0.1);
		border-radius: 0.25rem;
	}

	@keyframes shimmer {
		0% {
			background-position: -200% 0;
		}
		100% {
			background-position: 200% 0;
		}
	}

	/* Empty State */
	.empty-state {
		text-align: center;
		padding: 4rem 2rem;
	}

	.empty-icon {
		width: 5rem;
		height: 5rem;
		margin: 0 auto 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(148, 163, 184, 0.1);
		border-radius: 1rem;
	}

	.empty-icon svg {
		width: 2.5rem;
		height: 2.5rem;
		color: #64748b;
	}

	.empty-state h3 {
		font-size: 1.25rem;
		font-weight: 600;
		color: #f8fafc;
		margin-bottom: 0.5rem;
	}

	.empty-state p {
		color: #94a3b8;
		margin-bottom: 1.5rem;
	}

	/* Pagination */
	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		margin-top: 2rem;
	}

	.page-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 2.5rem;
		height: 2.5rem;
		padding: 0 0.75rem;
		background: rgba(30, 41, 59, 0.6);
		border: 1px solid rgba(148, 163, 184, 0.2);
		border-radius: 0.5rem;
		color: #94a3b8;
		font-size: 0.875rem;
		cursor: pointer;
		transition: all 0.2s;
	}

	.page-btn:hover:not(:disabled) {
		border-color: #14b8a6;
		color: #14b8a6;
	}

	.page-btn.active {
		background: #14b8a6;
		border-color: #14b8a6;
		color: white;
	}

	.page-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.page-btn svg {
		width: 1rem;
		height: 1rem;
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.content-grid {
			grid-template-columns: 1fr;
		}

		.filter-toggle {
			display: flex;
		}

		.filters-sidebar {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 100;
			border-radius: 0;
			overflow-y: auto;
			transform: translateX(-100%);
			transition: transform 0.3s ease;
		}

		.filters-sidebar.show {
			transform: translateX(0);
		}

		.close-filters {
			display: block;
		}
	}

	@media (max-width: 640px) {
		.hero h1 {
			font-size: 1.75rem;
		}

		.products-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}

		.products-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 1rem;
		}
	}
</style>
