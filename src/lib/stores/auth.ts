// =============================================
// Okis Garage Sale - Auth Store (Supabase)
// =============================================

import { writable, derived } from "svelte/store";
import { getSupabase, isSupabaseReady } from "$lib/services/supabase";
import type { User as SupabaseUser, Session } from "@supabase/supabase-js";

// ----- Auth State -----
export const session = writable<Session | null>(null);
export const authUser = writable<SupabaseUser | null>(null);
export const authLoading = writable<boolean>(true);
export const authError = writable<string | null>(null);

export const isLoggedIn = derived(session, ($session) => $session !== null);

// ----- Initialize Auth Listener -----
export function initAuth(): () => void {
	if (!isSupabaseReady()) {
		authLoading.set(false);
		return () => {};
	}

	const supabase = getSupabase()!;

	// Get initial session
	supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
		session.set(currentSession);
		authUser.set(currentSession?.user ?? null);
		authLoading.set(false);
	});

	// Listen for auth changes (login, logout, token refresh)
	const {
		data: { subscription }
	} = supabase.auth.onAuthStateChange((_event, newSession) => {
		session.set(newSession);
		authUser.set(newSession?.user ?? null);
		authLoading.set(false);
	});

	return () => {
		subscription.unsubscribe();
	};
}

// ----- Auth Actions -----

/** Sign up with email and password */
export async function signUp(email: string, password: string, name: string) {
	const supabase = getSupabase();
	if (!supabase) return { success: false, error: "Supabase not configured" };

	authError.set(null);
	authLoading.set(true);

	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: { name }
		}
	});

	if (error) {
		authError.set(error.message);
		authLoading.set(false);
		return { success: false, error: error.message };
	}

	authLoading.set(false);
	return { success: true, data };
}

/** Sign in with email and password */
export async function signIn(email: string, password: string) {
	const supabase = getSupabase();
	if (!supabase) return { success: false, error: "Supabase not configured" };

	authError.set(null);
	authLoading.set(true);

	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password
	});

	if (error) {
		authError.set(error.message);
		authLoading.set(false);
		return { success: false, error: error.message };
	}

	authLoading.set(false);
	return { success: true, data };
}

/** Sign in with OAuth provider (Google, GitHub, etc.) */
export async function signInWithProvider(provider: "google" | "github") {
	const supabase = getSupabase();
	if (!supabase) return { success: false, error: "Supabase not configured" };

	authError.set(null);

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider,
		options: {
			redirectTo: `${window.location.origin}/callback/`
		}
	});

	if (error) {
		authError.set(error.message);
		return { success: false, error: error.message };
	}

	return { success: true, data };
}

/** Sign out */
export async function signOut() {
	const supabase = getSupabase();
	if (!supabase) return { success: false, error: "Supabase not configured" };

	authError.set(null);
	const { error } = await supabase.auth.signOut();

	if (error) {
		authError.set(error.message);
		return { success: false, error: error.message };
	}

	return { success: true };
}

/** Reset password */
export async function resetPassword(email: string) {
	const supabase = getSupabase();
	if (!supabase) return { success: false, error: "Supabase not configured" };

	authError.set(null);

	const { error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${window.location.origin}/reset-password/`
	});

	if (error) {
		authError.set(error.message);
		return { success: false, error: error.message };
	}

	return { success: true };
}
