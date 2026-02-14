// Okis Garage Sale - Utility Functions
// =============================================
import { base } from "$app/paths";

/**
 * Simulate network delay for mock operations
 * @param ms Duration in milliseconds (default: rand 300-800ms)
 */
export function delay(ms?: number): Promise<void> {
	const duration = ms ?? Math.floor(Math.random() * 500) + 300;
	return new Promise((resolve) => setTimeout(resolve, duration));
}

/**
 * Format number to Indonesian Rupiah currency
 */
export function formatCurrency(amount: number): string {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(amount);
}

/**
 * Format date to Indonesian locale
 */
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
	const d = typeof date === "string" ? new Date(date) : date;
	return new Intl.DateTimeFormat("id-ID", {
		day: "numeric",
		month: "long",
		year: "numeric",
		...options
	}).format(d);
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date | string): string {
	const d = typeof date === "string" ? new Date(date) : date;
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

	const intervals = [
		{ label: "tahun", seconds: 31536000 },
		{ label: "bulan", seconds: 2592000 },
		{ label: "minggu", seconds: 604800 },
		{ label: "hari", seconds: 86400 },
		{ label: "jam", seconds: 3600 },
		{ label: "menit", seconds: 60 }
	];

	for (const interval of intervals) {
		const count = Math.floor(diffInSeconds / interval.seconds);
		if (count >= 1) {
			return `${count} ${interval.label} yang lalu`;
		}
	}

	return "Baru saja";
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
	if (text.length <= maxLength) return text;
	return text.slice(0, maxLength).trim() + "...";
}

/**
 * Generate URL-friendly slug from text
 */
export function slugify(text: string): string {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "")
		.replace(/[\s_-]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

/**
 * Debounce function for search inputs
 */
export function debounce<T extends (...args: Parameters<T>) => void>(
	fn: T,
	delay: number
): (...args: Parameters<T>) => void {
	let timeoutId: ReturnType<typeof setTimeout>;

	return (...args: Parameters<T>) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn(...args), delay);
	};
}

/**
 * Clamp number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
	return Math.min(Math.max(value, min), max);
}

/**
 * Generate random ID
 */
export function generateId(): string {
	return crypto.randomUUID();
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

/**
 * Validate Indonesian phone number
 */
export function isValidPhone(phone: string): boolean {
	const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{7,10}$/;
	return phoneRegex.test(phone.replace(/[\s-]/g, ""));
}

/**
 * Format phone number to E.164 format
 */
export function formatPhone(phone: string): string {
	const cleaned = phone.replace(/[\s-]/g, "");
	if (cleaned.startsWith("0")) {
		return "+62" + cleaned.slice(1);
	}
	if (cleaned.startsWith("62")) {
		return "+" + cleaned;
	}
	return cleaned;
}

/**
 * Get condition label in Indonesian
 */
export function getConditionLabel(condition: string): string {
	const labels: Record<string, string> = {
		new: "Baru",
		like_new: "Seperti Baru",
		good: "Bagus",
		fair: "Cukup Baik",
		poor: "Butuh Perbaikan"
	};
	return labels[condition] || condition;
}

/**
 * Get condition badge color (hex) for display
 */
export function getConditionColor(condition: string): string {
	switch (condition) {
		case "new":
			return "#10B981";
		case "like_new":
			return "#7C3AED";
		default:
			return "#F97316";
	}
}

/**
 * Calculate discount percentage
 */
export function calculateDiscount(originalPrice: number, currentPrice: number): number {
	if (originalPrice <= 0) return 0;
	return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

/**
 * Class names utility (like clsx)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
	return classes.filter(Boolean).join(" ");
}
/**
 * Resolve URL with base path
 */
export function resolve(path: string): string {
	if (!path) return "";
	if (path.startsWith("http") || path.startsWith("mailto:") || path.startsWith("tel:"))
		return path;
	if (path.startsWith("#")) return `${base}/${path}`;
	const [pathname, suffix = ""] = path.split(/([?#].*)/);
	const cleanPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
	const withSlash = cleanPath.endsWith("/") ? cleanPath : `${cleanPath}/`;
	return `${base}${withSlash}${suffix}`;
}

/**
 * Get fallback image from Unsplash based on category
 */
export function getFallbackImage(category: string): string {
	const categoryImages: Record<string, string> = {
		electronics:
			"https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&auto=format&fit=crop",
		fashion:
			"https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&auto=format&fit=crop",
		home: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&auto=format&fit=crop",
		vehicles:
			"https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&auto=format&fit=crop",
		hobbies:
			"https://images.unsplash.com/photo-1517260739337-6799d2df9c99?w=400&auto=format&fit=crop",
		books: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&auto=format&fit=crop",
		baby: "https://images.unsplash.com/photo-1559135141-2bea6465fccf?w=400&auto=format&fit=crop",
		beauty: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&auto=format&fit=crop"
	};

	return (
		categoryImages[category] ||
		"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop"
	);
}
