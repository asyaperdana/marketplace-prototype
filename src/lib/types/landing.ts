export interface Product {
	id: number;
	image: string;
	title: string;
	price: number;
	originalPrice: number;
	condition: "Baru" | "Seperti Baru" | "Bekas";
	seller: string;
	location: string;
	rating: number;
	stock?: number;
	viewers?: number;
}

export interface FilterTab {
	id: string;
	label: string;
	icon: string;
}

export interface Category {
	icon: string;
	name: string;
	count: string;
	class: string;
	delay: number;
	image?: string;
}

export interface FloatingItem {
	emoji: string;
	label: string;
	price: string;
	discount: string;
	position: string;
}
