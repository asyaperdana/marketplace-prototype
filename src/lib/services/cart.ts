// =============================================
// Okis Garage Sale - Cart Service
// =============================================
// Orchestrates cart operations with side effects
// (e.g. toast notifications). Components call this
// service instead of manipulating the cart store directly.

import { cart, toasts } from "$lib/stores";
import type { Product } from "$lib/types";

/**
 * Add a product to the cart and show a success toast.
 * This is the single place where "add to cart" business logic lives.
 */
export function addToCart(product: Product, quantity = 1): void {
	cart.addItem(product, quantity);
	toasts.add({
		type: "success",
		message: `${product.title} ditambahkan ke keranjang`,
		duration: 3000
	});
}
