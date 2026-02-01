// =============================================
// Okis Garage Sale - Product Service
// =============================================

import type { Product, ProductFilters, PaginatedResponse, Category } from "$lib/types";

// ----- Mock Data for Demo -----
const MOCK_PRODUCTS: Product[] = [
	{
		id: "1",
		title: "iPhone 13 Pro Max 256GB - Pacific Blue",
		description: "Kondisi 98%, fullset dengan box. Baterai health 92%. Tidak pernah service, mulus tanpa lecet. Bonus case dan screen protector.",
		price: 12500000,
		originalPrice: 18999000,
		images: [
			"https://images.unsplash.com/photo-1632661674596-df8be59a6c27?w=800",
			"https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800"
		],
		category: "electronics",
		subcategory: "smartphones",
		condition: "like_new",
		status: "available",
		sellerId: "seller-1",
		location: "Jakarta Selatan",
		createdAt: new Date("2026-01-20"),
		updatedAt: new Date("2026-01-20")
	},
	{
		id: "2",
		title: "MacBook Pro M1 2020 13 inch 256GB",
		description: "Kondisi mulus seperti baru. Cycle count rendah, baterai masih excellent. Fullset dengan charger original.",
		price: 14000000,
		originalPrice: 19999000,
		images: [
			"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800"
		],
		category: "electronics",
		subcategory: "laptops",
		condition: "like_new",
		status: "available",
		sellerId: "seller-2",
		location: "Bandung",
		createdAt: new Date("2026-01-18"),
		updatedAt: new Date("2026-01-18")
	},
	{
		id: "3",
		title: "Nike Air Jordan 1 Retro High OG - Size 42",
		description: "Original 100%, dibeli di Nike Store. Kondisi VNDS, hanya dicoba sekali. Lengkap dengan box dan paper bag.",
		price: 2800000,
		originalPrice: 3500000,
		images: [
			"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"
		],
		category: "fashion",
		subcategory: "shoes",
		condition: "like_new",
		status: "available",
		sellerId: "seller-3",
		location: "Surabaya",
		createdAt: new Date("2026-01-22"),
		updatedAt: new Date("2026-01-22")
	},
	{
		id: "4",
		title: "Sony PlayStation 5 Disc Edition + 2 Controller",
		description: "PS5 Disc Edition, kondisi mulus. Bonus 2 controller dan 3 game fisik (God of War, Spider-Man, Horizon).",
		price: 7500000,
		originalPrice: 9999000,
		images: [
			"https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800"
		],
		category: "electronics",
		subcategory: "gaming",
		condition: "good",
		status: "available",
		sellerId: "seller-1",
		location: "Jakarta Barat",
		createdAt: new Date("2026-01-15"),
		updatedAt: new Date("2026-01-15")
	},
	{
		id: "5",
		title: "Kursi Gaming Secretlab Titan - Black",
		description: "Kursi gaming premium, kondisi 90%. Ada sedikit bekas pemakaian normal. Masih sangat nyaman untuk gaming marathon.",
		price: 3500000,
		originalPrice: 6500000,
		images: [
			"https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800"
		],
		category: "furniture",
		subcategory: "chairs",
		condition: "good",
		status: "available",
		sellerId: "seller-4",
		location: "Tangerang",
		createdAt: new Date("2026-01-10"),
		updatedAt: new Date("2026-01-10")
	},
	{
		id: "6",
		title: "Canon EOS R6 Body Only + Memory 128GB",
		description: "Kamera mirrorless Canon EOS R6. Shutter count rendah, kondisi mulus. Bonus memory card 128GB dan tas kamera.",
		price: 25000000,
		originalPrice: 35000000,
		images: [
			"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800"
		],
		category: "electronics",
		subcategory: "cameras",
		condition: "like_new",
		status: "available",
		sellerId: "seller-5",
		location: "Yogyakarta",
		createdAt: new Date("2026-01-25"),
		updatedAt: new Date("2026-01-25")
	},
	{
		id: "7",
		title: "Tas Gucci GG Marmont - Authentic",
		description: "100% Authentic, dibeli di Gucci Store Singapore. Kondisi 95%, ada receipt dan dust bag. Mewah dan timeless.",
		price: 18000000,
		originalPrice: 28000000,
		images: [
			"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800"
		],
		category: "fashion",
		subcategory: "bags",
		condition: "like_new",
		status: "available",
		sellerId: "seller-6",
		location: "Jakarta Pusat",
		createdAt: new Date("2026-01-28"),
		updatedAt: new Date("2026-01-28")
	},
	{
		id: "8",
		title: "Sepeda Polygon Strattos S5 - Size M",
		description: "Road bike premium, groupset Shimano 105. Sudah di-service, siap gowes. Bonus helm dan bidon.",
		price: 12000000,
		originalPrice: 18000000,
		images: [
			"https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800"
		],
		category: "sports",
		subcategory: "cycling",
		condition: "good",
		status: "available",
		sellerId: "seller-7",
		location: "Semarang",
		createdAt: new Date("2026-01-12"),
		updatedAt: new Date("2026-01-12")
	}
];

const MOCK_CATEGORIES: Category[] = [
	{ id: "1", name: "Elektronik", slug: "electronics", icon: "📱", description: "Gadget, laptop, dan elektronik lainnya" },
	{ id: "2", name: "Fashion", slug: "fashion", icon: "👕", description: "Pakaian, sepatu, dan aksesori" },
	{ id: "3", name: "Furniture", slug: "furniture", icon: "🪑", description: "Mebel dan perlengkapan rumah" },
	{ id: "4", name: "Olahraga", slug: "sports", icon: "⚽", description: "Alat olahraga dan outdoor" },
	{ id: "5", name: "Otomotif", slug: "automotive", icon: "🚗", description: "Aksesoris mobil dan motor" },
	{ id: "6", name: "Buku & Hobi", slug: "books-hobby", icon: "📚", description: "Buku, koleksi, dan hobi" },
	{ id: "7", name: "Kecantikan", slug: "beauty", icon: "💄", description: "Skincare dan makeup" },
	{ id: "8", name: "Lainnya", slug: "others", icon: "📦", description: "Kategori lainnya" }
];

// ----- Service Functions -----

/**
 * Get products with optional filtering
 */
export async function getProducts(
	filters?: ProductFilters,
	page = 1,
	limit = 12
): Promise<PaginatedResponse<Product>> {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 300));

	let filtered = [...MOCK_PRODUCTS];

	// Apply filters
	if (filters?.category) {
		filtered = filtered.filter((p) => p.category === filters.category);
	}

	if (filters?.minPrice !== undefined) {
		filtered = filtered.filter((p) => p.price >= filters.minPrice!);
	}

	if (filters?.maxPrice !== undefined) {
		filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
	}

	if (filters?.condition?.length) {
		filtered = filtered.filter((p) => filters.condition!.includes(p.condition));
	}

	if (filters?.location) {
		filtered = filtered.filter((p) =>
			p.location.toLowerCase().includes(filters.location!.toLowerCase())
		);
	}

	// Apply sorting
	switch (filters?.sortBy) {
		case "price_low":
			filtered.sort((a, b) => a.price - b.price);
			break;
		case "price_high":
			filtered.sort((a, b) => b.price - a.price);
			break;
		case "popular":
			// For demo, just shuffle
			filtered.sort(() => Math.random() - 0.5);
			break;
		case "newest":
		default:
			filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
	}

	// Pagination
	const total = filtered.length;
	const totalPages = Math.ceil(total / limit);
	const startIndex = (page - 1) * limit;
	const items = filtered.slice(startIndex, startIndex + limit);

	return {
		items,
		total,
		page,
		limit,
		totalPages
	};
}

/**
 * Get a single product by slug/ID
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
	await new Promise((resolve) => setTimeout(resolve, 200));
	return MOCK_PRODUCTS.find((p) => p.id === slug) || null;
}

/**
 * Get all categories
 */
export async function getCategories(): Promise<Category[]> {
	await new Promise((resolve) => setTimeout(resolve, 100));
	return MOCK_CATEGORIES;
}

/**
 * Get featured products (for homepage)
 */
export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
	await new Promise((resolve) => setTimeout(resolve, 200));
	return MOCK_PRODUCTS.slice(0, limit);
}

/**
 * Search products by query
 */
export async function searchProducts(query: string): Promise<Product[]> {
	await new Promise((resolve) => setTimeout(resolve, 200));
	
	const lowerQuery = query.toLowerCase();
	return MOCK_PRODUCTS.filter(
		(p) =>
			p.title.toLowerCase().includes(lowerQuery) ||
			p.description.toLowerCase().includes(lowerQuery) ||
			p.category.toLowerCase().includes(lowerQuery)
	);
}

/**
 * Get related products (same category, different ID)
 */
export async function getRelatedProducts(productId: string, limit = 4): Promise<Product[]> {
	await new Promise((resolve) => setTimeout(resolve, 200));
	
	const product = MOCK_PRODUCTS.find((p) => p.id === productId);
	if (!product) return [];

	return MOCK_PRODUCTS.filter(
		(p) => p.category === product.category && p.id !== productId
	).slice(0, limit);
}

// ----- Utility Functions -----

/**
 * Format price to Indonesian Rupiah
 */
export function formatPrice(price: number): string {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(price);
}

/**
 * Calculate discount percentage
 */
export function getDiscountPercent(originalPrice: number, currentPrice: number): number {
	return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

/**
 * Get condition label in Indonesian
 */
export function getConditionLabel(condition: string): string {
	const labels: Record<string, string> = {
		new: "Baru",
		like_new: "Seperti Baru",
		good: "Bagus",
		fair: "Cukup",
		poor: "Kurang"
	};
	return labels[condition] || condition;
}

/**
 * Get condition color class
 */
export function getConditionColor(condition: string): string {
	const colors: Record<string, string> = {
		new: "bg-emerald-500",
		like_new: "bg-teal-500",
		good: "bg-blue-500",
		fair: "bg-amber-500",
		poor: "bg-red-500"
	};
	return colors[condition] || "bg-slate-500";
}
