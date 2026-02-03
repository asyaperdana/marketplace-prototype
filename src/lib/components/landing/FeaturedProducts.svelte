<script lang="ts">
	import { onMount } from "svelte";
	import ResponsiveImage from "../ui/ResponsiveImage.svelte";
	import { resolve } from "$lib/utils";

	import type { Product, FilterTab } from "$lib/types/landing";

	const filterTabs: FilterTab[] = [
		{ id: "terbaru", label: "Terbaru", icon: "✨" },
		{ id: "terlaris", label: "Terlaris", icon: "🔥" },
		{ id: "deals", label: "Best Deals", icon: "💎" }
	];

	const products: Product[] = [
		{
			id: 1,
			image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop&q=80",
			title: "Zara Floral Dress Original",
			price: 250000,
			originalPrice: 899000,
			condition: "Seperti Baru",
			seller: "FashionTrust",
			location: "Jakarta",
			rating: 4.9,
			stock: 2,
			viewers: 18
		},
		{
			id: 2,
			image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&q=80",
			title: "iPhone 13 Pro 256GB",
			price: 9500000,
			originalPrice: 16999000,
			condition: "Bekas",
			seller: "GadgetKing",
			location: "Bandung",
			rating: 4.8,
			stock: 1,
			viewers: 45
		},
		{
			id: 3,
			image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&q=80",
			title: "Nike Air Jordan 1 Low",
			price: 1200000,
			originalPrice: 2499000,
			condition: "Seperti Baru",
			seller: "SneakerHead",
			location: "Surabaya",
			rating: 5.0,
			viewers: 12
		},
		{
			id: 4,
			image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop&q=80",
			title: "MacBook Air M1 2020",
			price: 8500000,
			originalPrice: 14999000,
			condition: "Bekas",
			seller: "TechMaster",
			location: "Jakarta",
			rating: 4.7,
			stock: 3,
			viewers: 31
		},
		{
			id: 5,
			image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop&q=80",
			title: "Coach Tote Bag Authentic",
			price: 1800000,
			originalPrice: 4500000,
			condition: "Seperti Baru",
			seller: "LuxBags",
			location: "Medan",
			rating: 4.9,
			viewers: 22
		},
		{
			id: 6,
			image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop&q=80",
			title: "PlayStation 5 + 2 Game",
			price: 6500000,
			originalPrice: 9999000,
			condition: "Bekas",
			seller: "GameZone",
			location: "Yogyakarta",
			rating: 4.8,
			stock: 1,
			viewers: 67
		},
		{
			id: 7,
			image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop&q=80",
			title: "Koleksi Novel Tere Liye",
			price: 350000,
			originalPrice: 750000,
			condition: "Seperti Baru",
			seller: "BookLover",
			location: "Semarang",
			rating: 4.6
		},
		{
			id: 8,
			image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop&q=80",
			title: "Apple Watch Series 7",
			price: 3200000,
			originalPrice: 5999000,
			condition: "Bekas",
			seller: "WatchStore",
			location: "Bali",
			rating: 4.9,
			stock: 2,
			viewers: 28
		}
	];

	import { reveal } from "$lib/utils/reveal";
	import { tilt } from "$lib/actions/tilt";
	let activeFilter = $state("terbaru");
	let viewerCount = $state(156);
	let isVisible = $state(false);

	function setActiveFilter(filterId: string) {
		activeFilter = filterId;
	}

	function formatPrice(price: number): string {
		return new Intl.NumberFormat("id-ID").format(price);
	}

	function getDiscount(price: number, originalPrice: number): number {
		return Math.round((1 - price / originalPrice) * 100);
	}

	function getConditionColor(condition: string): string {
		switch (condition) {
			case "Baru":
				return "#10B981";
			case "Seperti Baru":
				return "#7C3AED";
			default:
				return "#F97316";
		}
	}

	onMount(() => {
		// Simulate live viewer count
		const viewerInterval = setInterval(() => {
			viewerCount += Math.floor(Math.random() * 5) - 2;
			if (viewerCount < 140) viewerCount = 145;
			if (viewerCount > 180) viewerCount = 175;
		}, 3000);

		return () => {
			clearInterval(viewerInterval);
		};
	});
</script>

<section
	id="products"
	class="py-16 relative overflow-hidden bg-dark-deep"
	use:reveal
	onreveal={() => (isVisible = true)}
>
	<!-- Background Decoration -->
	<div class="absolute inset-0 z-0">
		<div class="bg-noise opacity-30 pointer-events-none"></div>
		<div
			class="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-x-1/2"
		></div>
		<div
			class="absolute top-1/2 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] translate-x-1/2"
		></div>
	</div>

	<div class="container mx-auto px-6 relative z-10">
		<div
			class="text-center mb-12 space-y-3"
			class:opacity-0={!isVisible}
			class:translate-y-10={!isVisible}
			class:transition-all={true}
			class:duration-1000={true}
		>
			<h2 class="text-3xl lg:text-5xl font-black text-white tracking-tighter">
				Produk <span class="gradient-text">Unggulan</span>
			</h2>
			<p class="text-lg text-slate-300 max-w-2xl mx-auto">
				Koleksi barang preloved pilihan dengan kualitas terjamin dan harga yang tak
				tertandingi.
			</p>
		</div>

		<!-- Filter Tabs -->
		<div
			class="flex justify-center mb-8 sm:mb-12 overflow-x-auto pb-4 no-scrollbar"
			class:opacity-0={!isVisible}
			class:translate-y-10={!isVisible}
			style="transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); transition-delay: 0.1s"
		>
			<div
				class="inline-flex glass-light p-1.5 rounded-2xl border border-white/10 relative min-w-max"
			>
				{#each filterTabs as tab (tab.id)}
					<button
						class="relative z-10 px-6 py-3 rounded-xl flex items-center gap-2 font-bold text-sm transition-all duration-500 {activeFilter ===
						tab.id
							? 'text-white'
							: 'text-slate-400 hover:text-white'}"
						onclick={() => setActiveFilter(tab.id)}
					>
						<span class="text-lg">{tab.icon}</span>
						<span class="hidden sm:inline">{tab.label}</span>
					</button>
				{/each}

				<!-- Background slider -->
				<div
					class="absolute top-1.5 bottom-1.5 rounded-xl bg-linear-to-r from-primary to-secondary transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-lg shadow-primary/30"
					style="left: calc({filterTabs.findIndex(
						(t) => t.id === activeFilter
					)} * 33.33% + 0.375rem); width: calc(33.33% - 0.5rem)"
				></div>
			</div>
		</div>

		<!-- Live Stats Bar -->
		<div
			class="flex justify-center gap-8 mb-8 text-sm"
			class:opacity-0={!isVisible}
			style="transition: all 0.8s; transition-delay: 0.15s"
		>
			<div class="flex items-center gap-2 text-slate-400">
				<span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
				<span class="font-medium"
					><span class="text-white font-bold">{viewerCount}</span> orang sedang melihat</span
				>
			</div>
			<div class="hidden sm:flex items-center gap-2 text-slate-400">
				<span>🔥</span>
				<span class="font-medium"
					><span class="text-white font-bold">23</span> terjual dalam 1 jam terakhir</span
				>
			</div>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each products as product, index (product.id)}
				<div
					class="glass-card group rounded-4xl overflow-hidden relative"
					class:opacity-0={!isVisible}
					class:translate-y-10={!isVisible}
					style="transition-delay: {index * 0.1}s; isolation: isolate;"
					use:tilt={{ max: 10, perspective: 1000, scale: 1.02 }}
				>
					<!-- Shine Effect -->
					<div
						class="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
						style="background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 60%); background-size: 200% 100%; animation: shine 3s infinite;"
					></div>
					<!-- Discount Badge - Neon Style -->
					<div class="absolute top-4 left-4 z-20">
						<div
							class="bg-rose-500/90 backdrop-blur-md text-white text-xs font-black px-3 py-1.5 rounded-lg shadow-[0_0_15px_rgba(244,63,94,0.4)] border border-rose-400/30"
						>
							-{getDiscount(product.price, product.originalPrice)}%
						</div>
					</div>

					<button
						type="button"
						aria-label="Add to wishlist"
						class="absolute top-4 right-4 z-20 w-10 h-10 rounded-full glass-light flex items-center justify-center text-white hover:bg-rose-500 hover:scale-110 transition-all duration-300 group/wish"
					>
						<svg
							class="w-5 h-5 group-hover/wish:fill-current transition-colors"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
							/>
						</svg>
					</button>

					<!-- Product Image Area -->
					<div
						class="relative h-72 bg-dark-lighter flex items-center justify-center overflow-hidden"
					>
						<div
							class="absolute inset-0 bg-linear-to-t from-dark-deep/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity"
						></div>
						<ResponsiveImage
							src={product.image}
							alt={product.title}
							loading="lazy"
							class="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
							aspectRatio="auto"
						/>

						<!-- Condition Badge - Minimalist -->
						<div class="absolute bottom-3 left-4 z-20">
							<span
								class="px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-white/90 backdrop-blur-md border border-white/10"
								style="background: {getConditionColor(product.condition)}cc"
							>
								{product.condition}
							</span>
						</div>
					</div>

					<!-- Product Info - Premium Layout -->
					<div class="p-6 relative">
						<!-- Hover Reveal Actions -->
						<div
							class="absolute -top-6 right-6 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
						>
							<button
								type="button"
								aria-label="Add to cart"
								class="bg-emerald-500 text-white p-3 rounded-full shadow-lg hover:bg-emerald-400 hover:scale-110 transition-all"
							>
								<svg
									class="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
									></path></svg
								>
							</button>
						</div>

						<h3
							class="text-lg font-bold text-white mb-2 line-clamp-2 leading-tight min-h-12 group-hover:text-primary-light transition-colors"
						>
							{product.title}
						</h3>

						<div class="mb-5">
							<div class="text-2xl font-black gradient-text-color tracking-tight">
								Rp {formatPrice(product.price)}
							</div>
							<div class="flex items-center gap-2 mt-1">
								<span class="text-xs text-slate-500 line-through">
									Rp {formatPrice(product.originalPrice)}
								</span>
								<span
									class="text-[10px] text-emerald-400 font-medium bg-emerald-500/10 px-1.5 py-0.5 rounded"
								>
									Save {Math.round(
										product.originalPrice - product.price
									).toLocaleString()}
								</span>
							</div>
						</div>

						<div class="flex items-center justify-between pt-4 border-t border-white/5">
							<div class="flex items-center gap-2">
								<div class="flex flex-col">
									<span class="text-xs font-medium text-slate-300"
										>{product.seller}</span
									>
									<div class="flex items-center gap-1">
										<span class="text-[10px] text-yellow-400"
											>★ {product.rating}</span
										>
										<span class="text-[10px] text-slate-600">•</span>
										<span class="text-[10px] text-slate-500"
											>{product.location}</span
										>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
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
				class="btn btn-secondary px-12 py-5 text-xl font-bold group"
			>
				Jelajahi Semua Produk
				<svg
					class="w-6 h-6 group-hover:translate-x-1 transition-transform"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="3"
						d="M17 8l4 4m0 0l-4 4m4-4H3"
					/>
				</svg>
			</a>
		</div>
	</div>
</section>

<style>
	/* Gradient text is already defined in app.css, but we can refine it if needed */
	.gradient-text {
		background: var(--gradient-primary);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	@keyframes shine {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}
</style>
