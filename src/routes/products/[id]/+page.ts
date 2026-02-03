import { error } from "@sveltejs/kit";
import { mockProducts } from "$lib/data/mock-products";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
	const product = mockProducts.find((p) => p.id === params.id);

	if (!product) {
		throw error(404, "Produk tidak ditemukan");
	}

	return {
		product
	};
};
