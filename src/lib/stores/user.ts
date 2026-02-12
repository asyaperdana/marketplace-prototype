// =============================================
// Okis Garage Sale - User Store
// =============================================

import { writable, derived } from "svelte/store";
import type { User } from "$lib/types";

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
