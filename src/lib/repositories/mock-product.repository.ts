// =============================================
// Okis Garage Sale - Mock Product Repository
// =============================================
// In-memory implementation of IProductRepository using static mock data.
// [SUPABASE-RECONNECT] Replace with SupabaseProductRepository that
// delegates to supabase.from("products").select(...) etc.

import type { Product, ProductFilters, PaginatedResponse } from "$lib/types";
import type { IProductRepository, RepoResult } from "./repository";
import { mockProducts } from "$lib/data/mock-products";
import { delay } from "$lib/utils";

export class MockProductRepository implements IProductRepository {
	private products: Product[] = [...mockProducts];

	// ----- Base CRUD -----

	async findAll(): Promise<Product[]> {
		await delay();
		return this.products.filter((p) => p.status === "available");
	}

	async findById(id: string): Promise<Product | null> {
		await delay();
		return this.products.find((p) => p.id === id) ?? null;
	}

	async create(item: Omit<Product, "id">): Promise<RepoResult<Product>> {
		await delay();
		const newProduct: Product = {
			...item,
			id: `prod_${Date.now()}`
		};
		this.products.push(newProduct);
		return { success: true, data: newProduct };
	}

	async update(id: string, item: Partial<Product>): Promise<RepoResult<Product>> {
		await delay();
		const index = this.products.findIndex((p) => p.id === id);
		if (index === -1) {
			return { success: false, error: "Product not found" };
		}

		this.products[index] = { ...this.products[index], ...item, updatedAt: new Date() };
		return { success: true, data: this.products[index] };
	}

	async delete(id: string): Promise<RepoResult<void>> {
		await delay();
		const index = this.products.findIndex((p) => p.id === id);
		if (index === -1) {
			return { success: false, error: "Product not found" };
		}
		this.products.splice(index, 1);
		return { success: true };
	}

	// ----- Domain-Specific Queries -----

	async findPaginated(
		filters: ProductFilters = {},
		page = 1,
		limit = 20
	): Promise<PaginatedResponse<Product>> {
		await delay();
		let result = this.products.filter((p) => p.status === "available");

		// Apply filters
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
		if (filters.location) {
			const loc = filters.location.toLowerCase();
			result = result.filter((p) => p.location.toLowerCase().includes(loc));
		}

		// Sort
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

		// Paginate
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

	async search(query: string, limit = 20): Promise<Product[]> {
		await delay();
		const q = query.toLowerCase();
		return this.products
			.filter(
				(p) =>
					p.status === "available" &&
					(p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
			)
			.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
			.slice(0, limit);
	}

	async findBySeller(sellerId: string): Promise<Product[]> {
		await delay();
		return this.products
			.filter((p) => p.sellerId === sellerId)
			.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
	}
}
