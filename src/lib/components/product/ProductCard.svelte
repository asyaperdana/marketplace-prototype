<script lang="ts">
	import type { Product } from "$lib/types";
	import {
		formatPrice,
		getDiscountPercent,
		getConditionLabel,
		getConditionColor
	} from "$lib/services/products";
	import { cart } from "$lib/stores";

	interface Props {
		product: Product;
		class?: string;
	}

	let { product, class: className = "" }: Props = $props();

	const discount = $derived(
		product.originalPrice ? getDiscountPercent(product.originalPrice, product.price) : 0
	);

	let isWishlisted = $state(false);
	let isAddingToCart = $state(false);

	function toggleWishlist(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		isWishlisted = !isWishlisted;
	}

	function addToCart(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		isAddingToCart = true;
		cart.addItem(product);
		setTimeout(() => {
			isAddingToCart = false;
		}, 500);
	}
</script>

<a href="/products/{product.id}" class="product-card {className}">
	<!-- Image Container -->
	<div class="image-container">
		<img src={product.images[0]} alt={product.title} loading="lazy" />

		<!-- Badges -->
		<div class="badges">
			{#if discount > 0}
				<span class="discount-badge">-{discount}%</span>
			{/if}
			<span class="condition-badge {getConditionColor(product.condition)}">
				{getConditionLabel(product.condition)}
			</span>
		</div>

		<!-- Wishlist Button -->
		<button
			class="wishlist-btn"
			class:active={isWishlisted}
			onclick={toggleWishlist}
			aria-label="Add to wishlist"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill={isWishlisted ? "currentColor" : "none"}
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
				/>
			</svg>
		</button>

		<!-- Quick Add Button -->
		<button
			class="quick-add-btn"
			class:adding={isAddingToCart}
			onclick={addToCart}
			disabled={isAddingToCart}
		>
			{#if isAddingToCart}
				<svg
					class="checkmark"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m4.5 12.75 6 6 9-13.5"
					/>
				</svg>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
					/>
				</svg>
				<span>+ Keranjang</span>
			{/if}
		</button>
	</div>

	<!-- Content -->
	<div class="content">
		<h3 class="title">{product.title}</h3>

		<div class="price-container">
			<span class="price">{formatPrice(product.price)}</span>
			{#if product.originalPrice}
				<span class="original-price">{formatPrice(product.originalPrice)}</span>
			{/if}
		</div>

		<div class="meta">
			<span class="location">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
					<path
						fill-rule="evenodd"
						d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
						clip-rule="evenodd"
					/>
				</svg>
				{product.location}
			</span>
		</div>
	</div>
</a>

<style>
	.product-card {
		display: block;
		background: rgba(30, 41, 59, 0.6);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(148, 163, 184, 0.1);
		border-radius: 1.25rem;
		overflow: hidden;
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.product-card:hover {
		transform: translateY(-4px);
		border-color: rgba(20, 184, 166, 0.3);
		box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.4);
	}

	/* Image Container */
	.image-container {
		position: relative;
		aspect-ratio: 1;
		overflow: hidden;
		background: rgba(15, 23, 42, 0.5);
	}

	.image-container img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s ease;
	}

	.product-card:hover .image-container img {
		transform: scale(1.08);
	}

	/* Badges */
	.badges {
		position: absolute;
		top: 0.75rem;
		left: 0.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.discount-badge {
		padding: 0.25rem 0.625rem;
		background: #ef4444;
		color: white;
		font-size: 0.75rem;
		font-weight: 700;
		border-radius: 0.5rem;
	}

	.condition-badge {
		padding: 0.25rem 0.625rem;
		color: white;
		font-size: 0.7rem;
		font-weight: 600;
		border-radius: 0.5rem;
		text-transform: uppercase;
		letter-spacing: 0.025em;
	}

	/* Wishlist Button */
	.wishlist-btn {
		position: absolute;
		top: 0.75rem;
		right: 0.75rem;
		width: 2.25rem;
		height: 2.25rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.9);
		border: none;
		border-radius: 50%;
		cursor: pointer;
		color: #64748b;
		transition: all 0.2s;
		opacity: 0;
		transform: scale(0.8);
	}

	.product-card:hover .wishlist-btn {
		opacity: 1;
		transform: scale(1);
	}

	.wishlist-btn:hover {
		background: white;
		color: #ef4444;
	}

	.wishlist-btn.active {
		color: #ef4444;
		opacity: 1;
		transform: scale(1);
	}

	.wishlist-btn svg {
		width: 1.125rem;
		height: 1.125rem;
	}

	/* Quick Add Button */
	.quick-add-btn {
		position: absolute;
		bottom: 0.75rem;
		left: 0.75rem;
		right: 0.75rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.75rem;
		background: linear-gradient(135deg, #14b8a6, #10b981);
		border: none;
		border-radius: 0.75rem;
		color: white;
		font-size: 0.875rem;
		font-weight: 600;
		cursor: pointer;
		opacity: 0;
		transform: translateY(10px);
		transition: all 0.3s ease;
	}

	.product-card:hover .quick-add-btn {
		opacity: 1;
		transform: translateY(0);
	}

	.quick-add-btn:hover {
		filter: brightness(1.1);
	}

	.quick-add-btn svg {
		width: 1.125rem;
		height: 1.125rem;
	}

	.quick-add-btn.adding {
		background: #22c55e;
	}

	.quick-add-btn .checkmark {
		animation: checkmark 0.3s ease;
	}

	@keyframes checkmark {
		0% {
			transform: scale(0);
		}
		50% {
			transform: scale(1.2);
		}
		100% {
			transform: scale(1);
		}
	}

	/* Content */
	.content {
		padding: 1rem;
	}

	.title {
		font-size: 0.95rem;
		font-weight: 600;
		color: #f8fafc;
		line-height: 1.4;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		margin-bottom: 0.75rem;
	}

	.price-container {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
	}

	.price {
		font-size: 1.125rem;
		font-weight: 700;
		color: #14b8a6;
	}

	.original-price {
		font-size: 0.875rem;
		color: #64748b;
		text-decoration: line-through;
	}

	.meta {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.location {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		font-size: 0.8rem;
		color: #94a3b8;
	}

	.location svg {
		width: 0.875rem;
		height: 0.875rem;
	}
</style>
