<script lang="ts">
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { Navbar, Footer } from "$lib/components/layout";
	import { Button } from "$lib/components/ui";
	import { ProductCard } from "$lib/components/product";
	import {
		getProductBySlug,
		getRelatedProducts,
		formatPrice,
		getConditionLabel,
		getConditionColor,
		getDiscountPercent
	} from "$lib/services/products";
	import { cart, toasts } from "$lib/stores";
	import { isAuthenticated } from "$lib/services/auth";
	import type { Product } from "$lib/types";

	const slug = $derived($page.params.slug);

	let product = $state<Product | null>(null);
	let relatedProducts = $state<Product[]>([]);
	let loading = $state(true);
	let selectedImage = $state(0);
	let quantity = $state(1);

	const discount = $derived(
		product?.originalPrice ? getDiscountPercent(product.originalPrice, product.price) : 0
	);

	onMount(async () => {
		loading = true;
		try {
			product = await getProductBySlug(slug);
			if (product) {
				relatedProducts = await getRelatedProducts(product.id);
			}
		} finally {
			loading = false;
		}
	});

	function handleAddToCart() {
		if (!product) return;
		cart.addItem(product, quantity);
		toasts.add({ type: "success", message: "Berhasil ditambahkan ke keranjang!" });
	}

	function handleBuyNow() {
		if (!product) return;
		cart.addItem(product, quantity);
		goto("/checkout");
	}

	function handleMessage() {
		if (!$isAuthenticated) {
			toasts.add({ type: "warning", message: "Silakan login terlebih dahulu" });
			goto("/login");
			return;
		}
		toasts.add({ type: "info", message: "Fitur chat coming soon!" });
	}
</script>

<svelte:head>
	<title>{product?.title || "Loading..."} - Okis Garage Sale</title>
	<meta name="description" content={product?.description || "Detail produk"} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Navbar />

<main class="product-detail">
	{#if loading}
		<div class="loading-container">
			<div class="loading-spinner"></div>
			<p>Memuat produk...</p>
		</div>
	{:else if !product}
		<div class="not-found">
			<div class="not-found-icon">
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
						d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
					/>
				</svg>
			</div>
			<h1>Produk Tidak Ditemukan</h1>
			<p>Produk yang kamu cari tidak tersedia</p>
			<Button variant="primary" onclick={() => goto("/products")}>Lihat Produk Lain</Button>
		</div>
	{:else}
		<div class="container">
			<!-- Breadcrumb -->
			<nav class="breadcrumb">
				<a href="/">Home</a>
				<span>/</span>
				<a href="/products">Produk</a>
				<span>/</span>
				<span class="current">{product.title}</span>
			</nav>

			<!-- Product Content -->
			<div class="product-content">
				<!-- Image Gallery -->
				<div class="gallery">
					<div class="main-image">
						<img src={product.images[selectedImage]} alt={product.title} />
						{#if discount > 0}
							<span class="discount-badge">-{discount}%</span>
						{/if}
					</div>
					{#if product.images.length > 1}
						<div class="thumbnails">
							{#each product.images as image, i}
								<button
									class="thumbnail"
									class:active={selectedImage === i}
									onclick={() => (selectedImage = i)}
								>
									<img src={image} alt="Thumbnail {i + 1}" />
								</button>
							{/each}
						</div>
					{/if}
				</div>

				<!-- Product Info -->
				<div class="info">
					<span class="condition-badge {getConditionColor(product.condition)}">
						{getConditionLabel(product.condition)}
					</span>

					<h1>{product.title}</h1>

					<div class="price-section">
						<span class="price">{formatPrice(product.price)}</span>
						{#if product.originalPrice}
							<span class="original-price">{formatPrice(product.originalPrice)}</span>
						{/if}
					</div>

					<div class="meta-info">
						<div class="meta-item">
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
									d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
								/>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
								/>
							</svg>
							<span>{product.location}</span>
						</div>
						<div class="meta-item">
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
									d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
								/>
							</svg>
							<span>Diposting {product.createdAt.toLocaleDateString("id-ID")}</span>
						</div>
					</div>

					<div class="divider"></div>

					<div class="description">
						<h3>Deskripsi</h3>
						<p>{product.description}</p>
					</div>

					<div class="divider"></div>

					<!-- Quantity -->
					<div class="quantity-section">
						<span>Jumlah:</span>
						<div class="quantity-control">
							<button onclick={() => (quantity = Math.max(1, quantity - 1))}>-</button
							>
							<span>{quantity}</span>
							<button onclick={() => (quantity = quantity + 1)}>+</button>
						</div>
					</div>

					<!-- Actions -->
					<div class="actions">
						<Button variant="primary" fullWidth onclick={handleBuyNow}>
							Beli Sekarang
						</Button>
						<Button variant="outline" fullWidth onclick={handleAddToCart}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								width="18"
								height="18"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
								/>
							</svg>
							+ Keranjang
						</Button>
					</div>

					<!-- Contact Seller -->
					<button class="message-seller" onclick={handleMessage}>
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
								d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
							/>
						</svg>
						Chat dengan Penjual
					</button>
				</div>
			</div>

			<!-- Related Products -->
			{#if relatedProducts.length > 0}
				<section class="related-products">
					<h2>Produk Serupa</h2>
					<div class="related-grid">
						{#each relatedProducts as relatedProduct (relatedProduct.id)}
							<ProductCard product={relatedProduct} />
						{/each}
					</div>
				</section>
			{/if}
		</div>
	{/if}
</main>

<Footer />

<style>
	.product-detail {
		min-height: 100vh;
		background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
		font-family: "Inter", system-ui, sans-serif;
		padding-top: 5rem;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem 1.5rem 4rem;
	}

	/* Loading */
	.loading-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 60vh;
		gap: 1rem;
	}

	.loading-spinner {
		width: 3rem;
		height: 3rem;
		border: 3px solid rgba(20, 184, 166, 0.2);
		border-top-color: #14b8a6;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.loading-container p {
		color: #94a3b8;
	}

	/* Not Found */
	.not-found {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 60vh;
		text-align: center;
		padding: 2rem;
	}

	.not-found-icon {
		width: 5rem;
		height: 5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(148, 163, 184, 0.1);
		border-radius: 1rem;
		margin-bottom: 1.5rem;
	}

	.not-found-icon svg {
		width: 2.5rem;
		height: 2.5rem;
		color: #64748b;
	}

	.not-found h1 {
		font-size: 1.5rem;
		font-weight: 700;
		color: #f8fafc;
		margin-bottom: 0.5rem;
	}

	.not-found p {
		color: #94a3b8;
		margin-bottom: 1.5rem;
	}

	/* Breadcrumb */
	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		margin-bottom: 2rem;
	}

	.breadcrumb a {
		color: #94a3b8;
		text-decoration: none;
		transition: color 0.2s;
	}

	.breadcrumb a:hover {
		color: #14b8a6;
	}

	.breadcrumb span {
		color: #64748b;
	}

	.breadcrumb .current {
		color: #f8fafc;
		max-width: 200px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* Product Content */
	.product-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
	}

	/* Gallery */
	.gallery {
		position: sticky;
		top: 6rem;
		height: fit-content;
	}

	.main-image {
		position: relative;
		aspect-ratio: 1;
		border-radius: 1.25rem;
		overflow: hidden;
		background: rgba(30, 41, 59, 0.6);
		margin-bottom: 1rem;
	}

	.main-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.main-image .discount-badge {
		position: absolute;
		top: 1rem;
		left: 1rem;
		padding: 0.5rem 1rem;
		background: #ef4444;
		color: white;
		font-weight: 700;
		border-radius: 0.5rem;
	}

	.thumbnails {
		display: flex;
		gap: 0.75rem;
	}

	.thumbnail {
		width: 80px;
		height: 80px;
		border-radius: 0.75rem;
		overflow: hidden;
		border: 2px solid transparent;
		cursor: pointer;
		transition: all 0.2s;
		background: none;
		padding: 0;
	}

	.thumbnail:hover {
		border-color: rgba(20, 184, 166, 0.5);
	}

	.thumbnail.active {
		border-color: #14b8a6;
	}

	.thumbnail img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	/* Info */
	.info {
		padding-top: 0.5rem;
	}

	.condition-badge {
		display: inline-block;
		padding: 0.375rem 0.75rem;
		color: white;
		font-size: 0.75rem;
		font-weight: 600;
		border-radius: 0.5rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 1rem;
	}

	.info h1 {
		font-size: 1.75rem;
		font-weight: 700;
		color: #f8fafc;
		line-height: 1.3;
		margin-bottom: 1rem;
	}

	.price-section {
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.price {
		font-size: 2rem;
		font-weight: 800;
		color: #14b8a6;
	}

	.original-price {
		font-size: 1.125rem;
		color: #64748b;
		text-decoration: line-through;
	}

	.meta-info {
		display: flex;
		flex-wrap: wrap;
		gap: 1.5rem;
		margin-bottom: 1.5rem;
	}

	.meta-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: #94a3b8;
		font-size: 0.875rem;
	}

	.meta-item svg {
		width: 1.125rem;
		height: 1.125rem;
	}

	.divider {
		height: 1px;
		background: rgba(148, 163, 184, 0.1);
		margin: 1.5rem 0;
	}

	.description h3 {
		font-size: 1rem;
		font-weight: 600;
		color: #f8fafc;
		margin-bottom: 0.75rem;
	}

	.description p {
		color: #94a3b8;
		line-height: 1.7;
	}

	.quantity-section {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.quantity-section > span {
		color: #94a3b8;
		font-size: 0.875rem;
	}

	.quantity-control {
		display: flex;
		align-items: center;
		gap: 0;
		background: rgba(30, 41, 59, 0.6);
		border: 1px solid rgba(148, 163, 184, 0.2);
		border-radius: 0.5rem;
		overflow: hidden;
	}

	.quantity-control button {
		width: 2.5rem;
		height: 2.5rem;
		background: none;
		border: none;
		color: #f8fafc;
		font-size: 1.125rem;
		cursor: pointer;
		transition: background 0.2s;
	}

	.quantity-control button:hover {
		background: rgba(148, 163, 184, 0.1);
	}

	.quantity-control span {
		width: 3rem;
		text-align: center;
		color: #f8fafc;
		font-weight: 500;
	}

	.actions {
		display: flex;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.message-seller {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		width: 100%;
		padding: 0.875rem;
		background: transparent;
		border: 1px solid rgba(148, 163, 184, 0.2);
		border-radius: 0.75rem;
		color: #94a3b8;
		font-size: 0.95rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.message-seller:hover {
		border-color: #14b8a6;
		color: #14b8a6;
	}

	.message-seller svg {
		width: 1.25rem;
		height: 1.25rem;
	}

	/* Related Products */
	.related-products {
		margin-top: 4rem;
		padding-top: 4rem;
		border-top: 1px solid rgba(148, 163, 184, 0.1);
	}

	.related-products h2 {
		font-size: 1.5rem;
		font-weight: 700;
		color: #f8fafc;
		margin-bottom: 1.5rem;
	}

	.related-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 1.5rem;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.product-content {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.gallery {
			position: static;
		}

		.info h1 {
			font-size: 1.375rem;
		}

		.price {
			font-size: 1.5rem;
		}

		.actions {
			flex-direction: column;
		}
	}
</style>
