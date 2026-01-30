<script lang="ts">
	import type { Product } from "$lib/types";
	import {
		formatCurrency,
		formatRelativeTime,
		getConditionLabel,
		calculateDiscount,
		cn
	} from "$lib/utils";

	interface Props {
		product: Product;
		class?: string;
	}

	let { product, class: className = "" }: Props = $props();

	const discount = product.originalPrice
		? calculateDiscount(product.originalPrice, product.price)
		: 0;
</script>

<a
	href="/products/{product.id}"
	class={cn(
		"group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
		className
	)}
>
	<!-- Image Container -->
	<div class="relative aspect-square overflow-hidden bg-slate-100">
		<img
			src={product.images[0] || "/images/placeholder.png"}
			alt={product.title}
			class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
			loading="lazy"
		/>

		{#if discount > 0}
			<div
				class="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg"
			>
				-{discount}%
			</div>
		{/if}

		{#if product.status === "sold"}
			<div class="absolute inset-0 bg-black/50 flex items-center justify-center">
				<span class="text-white font-bold text-lg">TERJUAL</span>
			</div>
		{/if}

		<!-- Condition Badge -->
		<div
			class="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-medium px-2 py-1 rounded-lg"
		>
			{getConditionLabel(product.condition)}
		</div>
	</div>

	<!-- Content -->
	<div class="p-4">
		<h3
			class="font-medium text-slate-800 line-clamp-2 group-hover:text-teal-600 transition-colors"
		>
			{product.title}
		</h3>

		<div class="mt-2 flex items-baseline gap-2">
			<span class="text-lg font-bold text-teal-600">
				{formatCurrency(product.price)}
			</span>
			{#if product.originalPrice && product.originalPrice > product.price}
				<span class="text-sm text-slate-400 line-through">
					{formatCurrency(product.originalPrice)}
				</span>
			{/if}
		</div>

		<div class="mt-3 flex items-center justify-between text-xs text-slate-500">
			<span class="flex items-center gap-1">
				📍 {product.location}
			</span>
			<span>{formatRelativeTime(product.createdAt)}</span>
		</div>
	</div>
</a>
