// =============================================
// Okis Garage Sale - Application Configuration
// =============================================

export const config = {
	// App Info
	app: {
		name: "Okis Garage Sale",
		tagline: "Marketplace Barang Bekas Terpercaya di Indonesia",
		description:
			"Temukan treasure tersembunyi dan jual barang preloved-mu dengan mudah di Okis Garage Sale",
		version: "0.1.0",
		url: "https://okisgaragesale.id"
	},

	// API Configuration
	api: {
		baseUrl: import.meta.env.VITE_API_URL || "/api",
		timeout: 30000
	},

	// Pagination
	pagination: {
		defaultLimit: 20,
		maxLimit: 100
	},

	// Image Upload
	upload: {
		maxFileSize: 5 * 1024 * 1024, // 5MB
		maxImages: 10,
		allowedTypes: ["image/jpeg", "image/png", "image/webp"],
		imageQuality: 0.8
	},

	// Product Settings
	product: {
		minPrice: 1000,
		maxPrice: 100000000,
		titleMinLength: 5,
		titleMaxLength: 100,
		descriptionMinLength: 20,
		descriptionMaxLength: 5000
	},

	// Categories
	categories: [
		{ id: "electronics", name: "Elektronik", icon: "phone", slug: "elektronik" },
		{ id: "fashion", name: "Fashion", icon: "shirt", slug: "fashion" },
		{ id: "home", name: "Rumah Tangga", icon: "home", slug: "rumah-tangga" },
		{ id: "sports", name: "Olahraga", icon: "bolt", slug: "olahraga" },
		{ id: "hobbies", name: "Hobi & Koleksi", icon: "gamepad", slug: "hobi-koleksi" },
		{ id: "vehicles", name: "Kendaraan", icon: "car", slug: "kendaraan" },
		{ id: "books", name: "Buku & Alat Tulis", icon: "book", slug: "buku-alat-tulis" },
		{ id: "baby", name: "Perlengkapan Bayi", icon: "baby", slug: "perlengkapan-bayi" },
		{ id: "beauty", name: "Kecantikan", icon: "sparkles", slug: "kecantikan" },
		{ id: "others", name: "Lainnya", icon: "package", slug: "lainnya" }
	],

	// Product Conditions
	conditions: [
		{ value: "new", label: "Baru", description: "Belum pernah dipakai" },
		{ value: "like_new", label: "Seperti Baru", description: "Dipakai 1-2 kali" },
		{ value: "good", label: "Bagus", description: "Sedikit tanda pemakaian" },
		{ value: "fair", label: "Cukup Baik", description: "Tanda pemakaian normal" },
		{ value: "poor", label: "Butuh Perbaikan", description: "Ada kerusakan minor" }
	],

	// Social Media Links
	social: {
		instagram: "https://instagram.com/okisgaragesale",
		twitter: "https://twitter.com/okisgaragesale",
		facebook: "https://facebook.com/okisgaragesale",
		tiktok: "https://tiktok.com/@okisgaragesale"
	},

	// Contact Info
	contact: {
		email: "hello@okisgaragesale.id",
		whatsapp: "+6281234567890",
		supportHours: "Senin - Jumat, 09:00 - 18:00 WIB"
	}
} as const;

export default config;
