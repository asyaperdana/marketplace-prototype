import { error } from "@sveltejs/kit";
import { getProductById } from "$lib/services/products";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
	const product = await getProductById(params.id);

	if (!product) {
		throw error(404, "Produk tidak ditemukan");
	}

	return {
		product
	};
};
