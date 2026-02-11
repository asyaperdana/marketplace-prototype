// =============================================
// Okis Garage Sale - Auth Store
// =============================================
// Svelte stores for authentication state.
// Delegates all auth operations to the auth repository.
// [SUPABASE-RECONNECT] No changes needed here — swap the
// repository implementation in provider.ts instead.

import { writable, derived } from "svelte/store";
import { authRepository } from "$lib/repositories/provider";
import type { AuthUser } from "$lib/repositories/repository";

// ----- Auth State -----
export const authUser = writable<AuthUser | null>(null);
export const authLoading = writable<boolean>(true);
export const authError = writable<string | null>(null);

export const isLoggedIn = derived(authUser, ($authUser) => $authUser !== null);

// ----- Initialize Auth Listener -----
export function initAuth(): () => void {
	const unsubscribe = authRepository.onAuthStateChange((user) => {
		authUser.set(user);
		authLoading.set(false);
	});

	return unsubscribe;
}

// ----- Auth Actions -----

/** Sign up with email and password */
export async function signUp(email: string, password: string, name: string) {
	authError.set(null);
	authLoading.set(true);

	const result = await authRepository.signUp(email, password, name);

	if (!result.success) {
		authError.set(result.error ?? "Terjadi kesalahan");
		authLoading.set(false);
		return { success: false, error: result.error };
	}

	authLoading.set(false);
	return { success: true, data: result.data };
}

/** Sign in with email and password */
export async function signIn(email: string, password: string) {
	authError.set(null);
	authLoading.set(true);

	const result = await authRepository.signIn(email, password);

	if (!result.success) {
		authError.set(result.error ?? "Terjadi kesalahan");
		authLoading.set(false);
		return { success: false, error: result.error };
	}

	authLoading.set(false);
	return { success: true, data: result.data };
}

/** Sign out */
export async function signOut() {
	authError.set(null);
	const result = await authRepository.signOut();

	if (!result.success) {
		authError.set(result.error ?? "Terjadi kesalahan");
		return { success: false, error: result.error };
	}

	return { success: true };
}

/** Reset password */
export async function resetPassword(email: string) {
	authError.set(null);

	const result = await authRepository.resetPassword(email);

	if (!result.success) {
		authError.set(result.error ?? "Terjadi kesalahan");
		return { success: false, error: result.error };
	}

	return { success: true };
}

/** Update password (requires active session) */
export async function updatePassword(newPassword: string) {
	authError.set(null);

	const result = await authRepository.updatePassword(newPassword);

	if (!result.success) {
		authError.set(result.error ?? "Terjadi kesalahan");
		return { success: false, error: result.error };
	}

	return { success: true };
}
