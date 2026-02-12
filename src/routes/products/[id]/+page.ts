import { error } from "@sveltejs/kit";
import { getProductById, getProducts } from "$lib/services/products";
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

export async function entries() {
	const response = await getProducts({}, 1, 1000);
	return response.items.map((p) => ({ id: p.id }));
}
