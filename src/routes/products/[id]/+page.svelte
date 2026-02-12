<script lang="ts">
	import { addToCart } from "$lib/services/cart";
	import {
		formatCurrency,
		getConditionLabel,
		formatRelativeTime,
		resolve,
		getFallbackImage
	} from "$lib/utils";
	import Icon from "$lib/components/ui/Icon.svelte";
	import type { PageData } from "./$types";

	const GENERIC_FALLBACK =
		"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80";

	let { data }: { data: PageData } = $props();
	let product = $derived(data.product);
	let quantity = $state(1);
	let selectedImageIndex = $state(0);
	let mainImageRetried = $state(false);

	function handleMainImageError(event: Event) {
		const img = event.currentTarget as HTMLImageElement;
		if (!mainImageRetried) {
			mainImageRetried = true;
			img.src = getFallbackImage(product.category);
		} else {
			img.src = GENERIC_FALLBACK;
		}
	}

	function handleThumbError(event: Event) {
		const img = event.currentTarget as HTMLImageElement;
		img.src = getFallbackImage(product.category);
	}

	function handleAddToCart() {
		addToCart(product, quantity);
	}

	function increment() {
		quantity += 1;
	}

	function decrement() {
		if (quantity > 1) quantity -= 1;
	}
</script>

<svelte:head>
	<title>{product.title} | Okis Garage Sale</title>
</svelte:head>

<div class="min-h-screen bg-dark-deep">
	<!-- Top Navigation Bar -->
	<div
		class="relative overflow-hidden bg-linear-to-r from-dark-deep via-dark to-dark-lighter border-b border-white/5"
	>
		<div class="absolute inset-0 z-0 pointer-events-none">
			<div class="bg-noise opacity-20"></div>
		</div>
		<div class="container mx-auto px-6 py-4 relative z-10">
			<nav class="flex flex-wrap items-center gap-3 text-sm">
				<a
					href={resolve("/")}
					class="inline-flex items-center gap-2 px-4 py-2 glass-light rounded-xl border border-white/10 text-slate-300 hover:text-white hover:border-primary/50 transition-all duration-300 group"
				>
					<svg
						class="w-4 h-4 group-hover:-translate-x-1 transition-transform"
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
					<span class="font-medium">Home</span>
				</a>
				<span class="text-slate-600">/</span>
				<a
					href={resolve("/products")}
					class="text-slate-400 hover:text-primary-light transition-colors font-medium"
				>
					Explore
				</a>
				<span class="text-slate-600">/</span>
				<span class="text-white font-semibold truncate max-w-xs">{product.title}</span>
			</nav>
		</div>
	</div>

	<div class="container mx-auto px-6 py-10 lg:py-16">
		<div class="grid lg:grid-cols-2 gap-10 lg:gap-16">
			<!-- Image Gallery -->
			<div class="space-y-4">
				<!-- Main Image -->
				<div
					class="relative aspect-square rounded-4xl overflow-hidden glass border border-white/10 group"
				>
					<img
						src={product.images[selectedImageIndex] ||
							getFallbackImage(product.category)}
						alt={product.title}
						class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
						decoding="async"
						onerror={handleMainImageError}
					/>
					<!-- Discount Badge -->
					{#if product.originalPrice && product.originalPrice > product.price}
						{@const discount = Math.round(
							(1 - product.price / product.originalPrice) * 100
						)}
						<div class="absolute top-6 left-6">
							<div
								class="px-4 py-2 rounded-xl bg-rose-500/90 backdrop-blur-sm text-white text-sm font-black border border-rose-400/30 shadow-lg shadow-rose-500/30"
							>
								-{discount}% OFF
							</div>
						</div>
					{/if}
					<!-- Condition Badge -->
					<div class="absolute bottom-6 left-6">
						<span
							class="px-4 py-2 rounded-xl bg-primary/80 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider border border-primary/30"
						>
							{getConditionLabel(product.condition)}
						</span>
					</div>
				</div>

				<!-- Thumbnails -->
				{#if product.images.length > 1}
					<div class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
						{#each product.images as img, i (i)}
							<button
								onclick={() => (selectedImageIndex = i)}
								class="w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all duration-300 {selectedImageIndex ===
								i
									? 'border-primary shadow-lg shadow-primary/30 scale-105'
									: 'border-white/10 opacity-60 hover:opacity-100'}"
							>
								<img
									src={img}
									alt="Thumbnail {i + 1}"
									class="w-full h-full object-cover"
									loading="lazy"
									decoding="async"
									onerror={handleThumbError}
								/>
							</button>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Product Info -->
			<div class="space-y-8">
				<!-- Header -->
				<div>
					<div class="flex items-center gap-3 mb-4">
						<span class="text-sm text-slate-500">
							Diposting {formatRelativeTime(product.createdAt)}
						</span>
					</div>

					<h1
						class="text-3xl lg:text-5xl font-black text-white leading-tight tracking-tight"
					>
						{product.title}
					</h1>

					<div class="mt-6 flex items-baseline gap-4">
						<span class="text-4xl lg:text-5xl font-black gradient-text">
							{formatCurrency(product.price)}
						</span>
						{#if product.originalPrice && product.originalPrice > product.price}
							<span class="text-xl text-slate-500 line-through">
								{formatCurrency(product.originalPrice)}
							</span>
						{/if}
					</div>
				</div>

				<!-- Seller Info -->
				<div class="glass rounded-3xl p-6 border border-white/10">
					<div class="flex items-center gap-4">
						<div
							class="w-14 h-14 rounded-2xl bg-linear-to-br from-primary to-secondary flex items-center justify-center text-2xl shadow-lg shadow-primary/30"
						>
							<Icon name="user" size={22} ariaLabel="Penjual" />
						</div>
						<div class="flex-1">
							<div class="font-bold text-white text-lg">
								Penjual #{product.sellerId}
							</div>
							<div class="flex items-center gap-2 text-slate-400 text-sm">
								<span class="inline-flex items-center gap-2">
									<Icon name="pin" size={14} ariaLabel="Lokasi" />
									{product.location}
								</span>
								<span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
								<span class="text-emerald-400">Online</span>
							</div>
						</div>
						<button
							class="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/10 transition-colors"
						>
							<span class="inline-flex items-center gap-2">
								<Icon name="chat" size={14} ariaLabel="Chat" />
								Chat
							</span>
						</button>
					</div>
				</div>

				<!-- Description -->
				<div class="glass rounded-3xl p-6 border border-white/10">
					<h3 class="font-bold text-white text-lg mb-4 flex items-center gap-2">
						<Icon name="note" size={16} ariaLabel="Deskripsi" />
						<span>Deskripsi Barang</span>
					</h3>
					<p class="text-slate-300 leading-relaxed whitespace-pre-wrap">
						{product.description}
					</p>
				</div>

				<!-- Actions -->
				<div class="glass rounded-3xl p-6 border border-white/10 space-y-6">
					<!-- Quantity Selector -->
					<div class="flex items-center justify-between">
						<span class="text-white font-medium">Jumlah</span>
						<div
							class="flex items-center gap-1 bg-dark-lighter rounded-xl p-1 border border-white/10"
						>
							<button
								onclick={decrement}
								disabled={quantity <= 1}
								class="w-10 h-10 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed text-xl font-bold"
							>
								−
							</button>
							<span class="w-14 text-center font-black text-white text-lg"
								>{quantity}</span
							>
							<button
								onclick={increment}
								class="w-10 h-10 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all text-xl font-bold"
							>
								+
							</button>
						</div>
					</div>

					<!-- Total Price -->
					<div class="flex items-center justify-between py-4 border-t border-white/10">
						<span class="text-slate-400">Total</span>
						<span class="text-2xl font-black gradient-text">
							{formatCurrency(product.price * quantity)}
						</span>
					</div>

					<!-- Action Buttons -->
					<div class="flex gap-4">
						<button
							onclick={handleAddToCart}
							class="flex-1 py-4 px-8 rounded-2xl bg-linear-to-r from-primary to-secondary text-white font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-3"
						>
							<Icon name="cart" size={18} ariaLabel="Tambah ke keranjang" />
							Tambah ke Keranjang
						</button>
						<button
							class="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl hover:bg-rose-500/20 hover:border-rose-500/30 hover:text-rose-400 transition-all"
						>
							<Icon name="heart" size={18} ariaLabel="Favorit" />
						</button>
					</div>
				</div>

				<!-- Trust Badges -->
				<div class="flex flex-wrap gap-4 pt-4">
					<div class="flex items-center gap-2 text-sm text-slate-400">
						<Icon
							name="check"
							size={14}
							ariaLabel="Aman"
							className="text-emerald-400"
						/>
						Pembayaran Aman
					</div>
					<div class="flex items-center gap-2 text-sm text-slate-400">
						<Icon
							name="check"
							size={14}
							ariaLabel="Asli"
							className="text-emerald-400"
						/>
						Garansi Keaslian
					</div>
					<div class="flex items-center gap-2 text-sm text-slate-400">
						<Icon
							name="check"
							size={14}
							ariaLabel="Gratis ongkir"
							className="text-emerald-400"
						/>
						Gratis Ongkir*
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
