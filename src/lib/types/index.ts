// =============================================
// Okis Garage Sale - TypeScript Type Definitions
// =============================================

// ----- User Types -----
export interface User {
	id: string;
	email: string;
	name: string;
	avatar?: string;
	phone?: string;
	location?: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface UserProfile extends User {
	bio?: string;
	rating: number;
	totalSales: number;
	totalPurchases: number;
	verified: boolean;
}

// ----- Product Types -----
export type ProductCondition = "new" | "like_new" | "good" | "fair" | "poor";
export type ProductStatus = "available" | "sold" | "reserved" | "inactive";

export interface Product {
	id: string;
	title: string;
	description: string;
	price: number;
	originalPrice?: number;
	images: string[];
	category: string;
	subcategory?: string;
	condition: ProductCondition;
	status: ProductStatus;
	sellerId: string;
	location: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface ProductFilters {
	category?: string;
	minPrice?: number;
	maxPrice?: number;
	condition?: ProductCondition[];
	location?: string;
	sortBy?: "newest" | "price_low" | "price_high" | "popular";
}

// ----- Category Types -----
export interface Category {
	id: string;
	name: string;
	slug: string;
	icon: string;
	description?: string;
	subcategories?: Category[];
}

// ----- Cart Types -----
export interface CartItem {
	productId: string;
	product: Product;
	quantity: number;
	addedAt: Date;
}

export interface Cart {
	items: CartItem[];
	totalItems: number;
	totalPrice: number;
}

// ----- Order Types -----
export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface Order {
	id: string;
	buyerId: string;
	sellerId: string;
	items: CartItem[];
	totalAmount: number;
	shippingAddress: Address;
	status: OrderStatus;
	paymentStatus: PaymentStatus;
	createdAt: Date;
	updatedAt: Date;
}

// ----- Address Types -----
export interface Address {
	id: string;
	label: string;
	recipientName: string;
	phone: string;
	street: string;
	city: string;
	province: string;
	postalCode: string;
	isDefault: boolean;
}

// ----- Review Types -----
export interface Review {
	id: string;
	productId: string;
	userId: string;
	rating: number;
	comment: string;
	images?: string[];
	createdAt: Date;
}

// ----- Chat Types -----
export interface Message {
	id: string;
	senderId: string;
	receiverId: string;
	content: string;
	read: boolean;
	createdAt: Date;
}

export interface Conversation {
	id: string;
	participants: string[];
	productId?: string;
	lastMessage?: Message;
	unreadCount: number;
	updatedAt: Date;
}

// ----- API Response Types -----
export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
}

export interface PaginatedResponse<T> {
	items: T[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}
