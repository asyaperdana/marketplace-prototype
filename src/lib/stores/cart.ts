// =============================================
// Okis Garage Sale - Cart Store
// =============================================

import { writable } from "svelte/store";
import type { Cart, CartItem, Product } from "$lib/types";

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
