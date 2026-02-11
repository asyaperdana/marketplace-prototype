// =============================================
// Okis Garage Sale - Product Service
// =============================================
// Delegates all data access to the product repository.
// [SUPABASE-RECONNECT] No changes needed here — swap the
// repository implementation in provider.ts instead.

import { productRepository } from "$lib/repositories/provider";
import type { Product, ProductFilters, PaginatedResponse } from "$lib/types";

/** Get paginated products with optional filters */
export async function getProducts(
	filters: ProductFilters = {},
	page = 1,
	limit = 20
): Promise<PaginatedResponse<Product>> {
	return productRepository.findPaginated(filters, page, limit);
}

/** Get a single product by ID */
export async function getProductById(id: string): Promise<Product | null> {
	return productRepository.findById(id);
}

/** Search products by query string */
export async function searchProducts(query: string, limit = 20): Promise<Product[]> {
	return productRepository.search(query, limit);
}

/** Get products by seller ID */
export async function getProductsBySeller(sellerId: string): Promise<Product[]> {
	return productRepository.findBySeller(sellerId);
}
