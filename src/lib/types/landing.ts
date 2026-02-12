import type { IconName } from "$lib/types/icons";

export interface FilterTab {
	id: string;
	label: string;
	icon: IconName;
}

export interface Category {
	icon: IconName;
	name: string;
	count: string;
	class: string;
	delay: number;
	image?: string;
}

export interface FloatingItem {
	icon: IconName;
	label: string;
	price: string;
	discount: string;
	position: string;
}
