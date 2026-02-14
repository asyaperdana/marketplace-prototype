// =============================================
// Okis Garage Sale - Product Listing Store
// =============================================
// Encapsulates product data access, filtering, sorting,
// and search logic. Components subscribe to this store
// rather than importing mock data directly.

import { writable, derived, get } from "svelte/store";
import type { Product } from "$lib/types";
import { getProducts } from "$lib/services/products";

// ----- State -----

/** Complete list of available products */
export const allProducts = writable<Product[]>([]);

/** Loading state for product fetching */
export const isLoading = writable(false);

/** Error message if fetching fails */
export const error = writable<string | null>(null);

// ----- Derived State -----

/** Total number of products (for stats display) */
export const totalProductCount = derived(allProducts, ($all) => $all.length);

// ----- Featured Products -----

/** Featured products for the landing page (first 8) */
export const featuredProducts = derived(allProducts, ($all) => $all.slice(0, 8));

// ----- Product Listing Filters -----

export interface ProductListingFilters {
	searchQuery: string;
	category: string;
	sortBy: "newest" | "price_low" | "price_high";
}

const defaultFilters: ProductListingFilters = {
	searchQuery: "",
	category: "all",
	sortBy: "newest"
};

export const productFilters = writable<ProductListingFilters>({ ...defaultFilters });

// ----- Filtered & Sorted Products -----

/** Products after applying all listing filters */
export const filteredProducts = derived(
	[allProducts, productFilters],
	([$allProducts, $filters]) => {
		let result = [...$allProducts];

		// Category filter
		if ($filters.category !== "all") {
			result = result.filter((p) => p.category === $filters.category);
		}

		// Search filter
		if ($filters.searchQuery.trim()) {
			const q = $filters.searchQuery.toLowerCase();
			result = result.filter(
				(p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
			);
		}

		// Sorting
		switch ($filters.sortBy) {
			case "price_low":
				result.sort((a, b) => a.price - b.price);
				break;
			case "price_high":
				result.sort((a, b) => b.price - a.price);
				break;
			default: // newest
				result.sort(
					(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
		}

		return result;
	}
);

// ----- Actions -----

/** Fetch all products from the API/Service */
export async function loadProducts(force = false) {
	if (!force && (get(isLoading) || get(allProducts).length > 0)) return;

	isLoading.set(true);
	error.set(null);
	try {
		// Fetch all products for client-side filtering capabilities
		const response = await getProducts({}, 1, 100);
		allProducts.set(response.items);
	} catch (err) {
		console.error("Failed to load products:", err);
		error.set("Gagal memuat produk. Silakan coba lagi.");
		allProducts.set([]);
	} finally {
		isLoading.set(false);
	}
}

export function setSearchQuery(query: string): void {
	productFilters.update((f) => ({ ...f, searchQuery: query }));
}

export function setCategory(category: string): void {
	productFilters.update((f) => ({ ...f, category }));
}

export function setSortBy(sortBy: ProductListingFilters["sortBy"]): void {
	productFilters.update((f) => ({ ...f, sortBy }));
}

export function resetFilters(): void {
	productFilters.set({ ...defaultFilters });
}

// ----- Single Product Lookup -----

/** Find a product by ID from the loaded store. Returns null if not found. */
export function getProductById(id: string): Product | null {
	const products = get(allProducts);
	return products.find((p) => p.id === id) ?? null;
}
