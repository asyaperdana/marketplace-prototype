<script lang="ts">
	import { cart } from "$lib/stores";
	import { formatCurrency, getConditionLabel, formatRelativeTime } from "$lib/utils";
	import Button from "$lib/components/ui/Button.svelte";
	import { toasts } from "$lib/stores";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();

	// Use $derived to make product reactive if data changes (e.g. navigation)
	let product = $derived(data.product);

	let quantity = $state(1);

	function addToCart() {
		cart.addItem(product, quantity);
		toasts.add({
			type: "success",
			message: `${product.title} ditambahkan ke keranjang`,
			duration: 3000
		});
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

<div class="container mx-auto px-4 py-8 lg:py-12">
	<!-- Breadcrumb (Simple) -->
	<nav class="mb-6 text-sm text-slate-500">
		<a href="/" class="hover:text-teal-600">Home</a> /
		<a href="/products" class="hover:text-teal-600">Explore</a> /
		<span class="text-slate-900 font-medium">{product.title}</span>
	</nav>

	<div class="grid lg:grid-cols-2 gap-8 lg:gap-12">
		<!-- Image Gallery -->
		<div>
			<div
				class="aspect-square rounded-3xl overflow-hidden bg-slate-100 shadow-sm border border-slate-100"
			>
				<img
					src={product.images[0] || "/images/placeholder.png"}
					alt={product.title}
					class="w-full h-full object-cover"
				/>
			</div>
			<!-- Thumbnails (Future impl) -->
			{#if product.images.length > 1}
				<div class="flex gap-4 mt-4 overflow-x-auto pb-2">
					{#each product.images as img, i (i)}
						<button
							class="w-20 h-20 rounded-xl overflow-hidden border-2 border-transparent focus:border-teal-500 shrink-0"
						>
							<img src={img} alt="Thumbnail" class="w-full h-full object-cover" />
						</button>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Product Info -->
		<div class="space-y-8">
			<div>
				<div class="flex items-center gap-3 mb-4">
					<span
						class="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded-full uppercase tracking-wide"
					>
						{getConditionLabel(product.condition)}
					</span>
					<span class="text-slate-400 text-sm">
						Diposting {formatRelativeTime(product.createdAt)}
					</span>
				</div>

				<h1 class="text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
					{product.title}
				</h1>

				<div class="mt-6 flex items-baseline gap-4">
					<span class="text-4xl font-bold text-teal-600">
						{formatCurrency(product.price)}
					</span>
					{#if product.originalPrice && product.originalPrice > product.price}
						<span class="text-xl text-slate-400 line-through">
							{formatCurrency(product.originalPrice)}
						</span>
					{/if}
				</div>
			</div>

			<!-- Seller Info -->
			<div class="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
				<div
					class="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-xl"
				>
					👤
				</div>
				<div>
					<div class="font-bold text-slate-900">Penjual #{product.sellerId}</div>
					<div class="text-sm text-slate-500">📍 {product.location}</div>
				</div>
			</div>

			<!-- Divider -->
			<hr class="border-slate-100" />

			<!-- Description -->
			<div>
				<h3 class="font-bold text-slate-900 text-lg mb-3">Deskripsi Barang</h3>
				<p class="text-slate-600 leading-relaxed whitespace-pre-wrap">
					{product.description}
				</p>
			</div>

			<!-- Actions -->
			<div class="pt-6">
				<div class="flex items-center gap-6 mb-6">
					<span class="text-sm font-medium text-slate-700">Jumlah</span>
					<div class="flex items-center border border-slate-200 rounded-lg bg-white">
						<button
							onclick={decrement}
							class="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-50 rounded-l-lg"
							disabled={quantity <= 1}
						>
							-
						</button>
						<span class="w-12 text-center font-bold text-slate-900">{quantity}</span>
						<button
							onclick={increment}
							class="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-50 rounded-r-lg"
						>
							+
						</button>
					</div>
				</div>

				<div class="flex gap-4">
					<Button variant="primary" size="lg" fullWidth onclick={addToCart}>
						🛒 Tambah ke Keranjang
					</Button>
					<Button variant="outline" size="lg">🤍 Wishlist</Button>
				</div>
			</div>
		</div>
	</div>
</div>
