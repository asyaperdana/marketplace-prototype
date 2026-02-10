// =============================================
// Okis Garage Sale - Product Service (Supabase)
// =============================================

import { getSupabase, isSupabaseReady } from "$lib/services/supabase";
import { mockProducts } from "$lib/data/mock-products";
import type { Product, ProductFilters, PaginatedResponse } from "$lib/types";

/** Convert Supabase row to Product type */
function rowToProduct(row: Record<string, unknown>): Product {
	return {
		id: row.id as string,
		title: row.title as string,
		description: row.description as string,
		price: row.price as number,
		originalPrice: (row.original_price as number) ?? undefined,
		images: (row.images as string[]) ?? [],
		category: row.category as string,
		subcategory: (row.subcategory as string) ?? undefined,
		condition: row.condition as Product["condition"],
		status: row.status as Product["status"],
		sellerId: row.seller_id as string,
		location: row.location as string,
		createdAt: new Date(row.created_at as string),
		updatedAt: new Date(row.updated_at as string)
	};
}

// ----- Product Queries -----

/** Get paginated products with optional filters */
export async function getProducts(
	filters: ProductFilters = {},
	page = 1,
	limit = 20
): Promise<PaginatedResponse<Product>> {
	// Fallback to mock data if Supabase isn't configured
	if (!isSupabaseReady()) {
		return getProductsMock(filters, page, limit);
	}

	const supabase = getSupabase()!;

	let query = supabase
		.from("products")
		.select("*", { count: "exact" })
		.eq("status", "available");

	// Apply filters
	if (filters.category) {
		query = query.eq("category", filters.category);
	}
	if (filters.minPrice !== undefined) {
		query = query.gte("price", filters.minPrice);
	}
	if (filters.maxPrice !== undefined) {
		query = query.lte("price", filters.maxPrice);
	}
	if (filters.condition?.length) {
		query = query.in("condition", filters.condition);
	}
	if (filters.location) {
		query = query.ilike("location", `%${filters.location}%`);
	}

	// Sorting
	switch (filters.sortBy) {
		case "price_low":
			query = query.order("price", { ascending: true });
			break;
		case "price_high":
			query = query.order("price", { ascending: false });
			break;
		case "popular":
			query = query.order("created_at", { ascending: false });
			break;
		default:
			query = query.order("created_at", { ascending: false });
	}

	// Pagination
	const from = (page - 1) * limit;
	const to = from + limit - 1;
	query = query.range(from, to);

	const { data, error, count } = await query;

	if (error) {
		console.error("[ProductService] Error fetching products:", error);
		return { items: [], total: 0, page, limit, totalPages: 0 };
	}

	const items = (data ?? []).map(rowToProduct);
	const total = count ?? 0;

	return {
		items,
		total,
		page,
		limit,
		totalPages: Math.ceil(total / limit)
	};
}

/** Get a single product by ID */
export async function getProductById(id: string): Promise<Product | null> {
	if (!isSupabaseReady()) {
		return mockProducts.find((p) => p.id === id) ?? null;
	}

	const supabase = getSupabase()!;

	const { data, error } = await supabase.from("products").select("*").eq("id", id).single();

	if (error || !data) {
		console.error("[ProductService] Error fetching product:", error);
		return null;
	}

	return rowToProduct(data);
}

/** Search products by query string */
export async function searchProducts(query: string, limit = 20): Promise<Product[]> {
	if (!isSupabaseReady()) {
		const q = query.toLowerCase();
		return mockProducts
			.filter(
				(p) =>
					p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
			)
			.slice(0, limit);
	}

	const supabase = getSupabase()!;

	const { data, error } = await supabase
		.from("products")
		.select("*")
		.eq("status", "available")
		.or(`title.ilike.%${query}%,description.ilike.%${query}%`)
		.order("created_at", { ascending: false })
		.limit(limit);

	if (error) {
		console.error("[ProductService] Error searching products:", error);
		return [];
	}

	return (data ?? []).map(rowToProduct);
}

/** Get products by seller ID */
export async function getProductsBySeller(sellerId: string): Promise<Product[]> {
	if (!isSupabaseReady()) {
		return mockProducts.filter((p) => p.sellerId === sellerId);
	}

	const supabase = getSupabase()!;

	const { data, error } = await supabase
		.from("products")
		.select("*")
		.eq("seller_id", sellerId)
		.order("created_at", { ascending: false });

	if (error) {
		console.error("[ProductService] Error fetching seller products:", error);
		return [];
	}

	return (data ?? []).map(rowToProduct);
}

// ----- Mock Data Fallback -----

function getProductsMock(
	filters: ProductFilters,
	page: number,
	limit: number
): PaginatedResponse<Product> {
	let result = [...mockProducts];

	if (filters.category) {
		result = result.filter((p) => p.category === filters.category);
	}
	if (filters.minPrice !== undefined) {
		result = result.filter((p) => p.price >= filters.minPrice!);
	}
	if (filters.maxPrice !== undefined) {
		result = result.filter((p) => p.price <= filters.maxPrice!);
	}
	if (filters.condition?.length) {
		result = result.filter((p) => filters.condition!.includes(p.condition));
	}

	switch (filters.sortBy) {
		case "price_low":
			result.sort((a, b) => a.price - b.price);
			break;
		case "price_high":
			result.sort((a, b) => b.price - a.price);
			break;
		default:
			result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
	}

	const total = result.length;
	const from = (page - 1) * limit;
	const items = result.slice(from, from + limit);

	return {
		items,
		total,
		page,
		limit,
		totalPages: Math.ceil(total / limit)
	};
}
