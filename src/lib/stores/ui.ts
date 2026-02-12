// =============================================
// Okis Garage Sale - UI Stores
// =============================================
// Stores for transient UI state (menus, loading, theme).

import { writable } from "svelte/store";

// ----- UI Visibility -----
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
