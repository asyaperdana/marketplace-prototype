// =============================================
// Okis Garage Sale - Svelte Stores
// =============================================

import { writable, derived } from "svelte/store";
import type { User, Cart, CartItem, Product } from "$lib/types";

// ----- User Store -----
function createUserStore() {
	const { subscribe, set, update } = writable<User | null>(null);

	return {
		subscribe,
		login: (user: User) => set(user),
		logout: () => set(null),
		updateProfile: (data: Partial<User>) =>
			update((user) => (user ? { ...user, ...data } : null))
	};
}

export const user = createUserStore();
export const isAuthenticated = derived(user, ($user) => $user !== null);

// ----- Cart Store -----
function createCartStore() {
	const { subscribe, set, update } = writable<Cart>({
		items: [],
		totalItems: 0,
		totalPrice: 0
	});

	const calculateTotals = (items: CartItem[]): Cart => ({
		items,
		totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
		totalPrice: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
	});

	return {
		subscribe,
		addItem: (product: Product, quantity = 1) =>
			update((cart) => {
				const existingIndex = cart.items.findIndex((item) => item.productId === product.id);
				let newItems: CartItem[];

				if (existingIndex >= 0) {
					newItems = cart.items.map((item, index) =>
						index === existingIndex
							? { ...item, quantity: item.quantity + quantity }
							: item
					);
				} else {
					newItems = [
						...cart.items,
						{ productId: product.id, product, quantity, addedAt: new Date() }
					];
				}

				return calculateTotals(newItems);
			}),
		removeItem: (productId: string) =>
			update((cart) => {
				const newItems = cart.items.filter((item) => item.productId !== productId);
				return calculateTotals(newItems);
			}),
		updateQuantity: (productId: string, quantity: number) =>
			update((cart) => {
				const newItems = cart.items.map((item) =>
					item.productId === productId ? { ...item, quantity } : item
				);
				return calculateTotals(newItems);
			}),
		clear: () => set({ items: [], totalItems: 0, totalPrice: 0 })
	};
}

export const cart = createCartStore();

// ----- UI Stores -----
export const isMobileMenuOpen = writable(false);
export const isSearchOpen = writable(false);
export const isLoading = writable(false);

// ----- Theme Store -----
function createThemeStore() {
	const { subscribe, set, update } = writable<"light" | "dark">("light");

	return {
		subscribe,
		toggle: () => update((theme) => (theme === "light" ? "dark" : "light")),
		setLight: () => set("light"),
		setDark: () => set("dark")
	};
}

export const theme = createThemeStore();

// ----- Toast/Notification Store -----
export interface Toast {
	id: string;
	type: "success" | "error" | "warning" | "info";
	message: string;
	duration?: number;
}

function createToastStore() {
	const { subscribe, update } = writable<Toast[]>([]);

	return {
		subscribe,
		add: (toast: Omit<Toast, "id">) => {
			const id = crypto.randomUUID();
			update((toasts) => [...toasts, { ...toast, id }]);

			if (toast.duration !== 0) {
				setTimeout(() => {
					update((toasts) => toasts.filter((t) => t.id !== id));
				}, toast.duration || 3000);
			}

			return id;
		},
		remove: (id: string) => update((toasts) => toasts.filter((t) => t.id !== id)),
		clear: () => update(() => [])
	};
}

export const toasts = createToastStore();

// ----- Product Filter Store -----
import type { ProductFilters } from "$lib/types";

export const productFilters = writable<ProductFilters>({
	sortBy: "newest"
});
