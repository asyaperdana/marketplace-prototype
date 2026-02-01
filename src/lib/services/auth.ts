// =============================================
// Okis Garage Sale - Supabase Auth Service
// =============================================

import { createClient } from "@supabase/supabase-js";
import { writable, derived, get } from "svelte/store";
import type { User } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ----- Auth Store -----
interface AuthState {
	user: User | null;
	loading: boolean;
	initialized: boolean;
}

function createAuthStore() {
	const { subscribe, set, update } = writable<AuthState>({
		user: null,
		loading: true,
		initialized: false
	});

	return {
		subscribe,
		setUser: (user: User | null) => update((state) => ({ ...state, user, loading: false })),
		setLoading: (loading: boolean) => update((state) => ({ ...state, loading })),
		setInitialized: () => update((state) => ({ ...state, initialized: true, loading: false })),
		reset: () => set({ user: null, loading: false, initialized: true })
	};
}

export const authStore = createAuthStore();
export const isAuthenticated = derived(authStore, ($auth) => $auth.user !== null);
export const currentUser = derived(authStore, ($auth) => $auth.user);

// ----- Auth Functions -----

/**
 * Initialize auth state - call this on app mount
 */
export async function initAuth() {
	try {
		const {
			data: { session }
		} = await supabase.auth.getSession();
		authStore.setUser(session?.user ?? null);
		authStore.setInitialized();

		// Listen for auth changes
		supabase.auth.onAuthStateChange((_event, session) => {
			authStore.setUser(session?.user ?? null);
		});
	} catch (error) {
		console.error("Auth initialization error:", error);
		authStore.setInitialized();
	}
}

/**
 * Sign up with email and password
 */
export async function signUp(email: string, password: string, name: string) {
	authStore.setLoading(true);

	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: { name }
		}
	});

	authStore.setLoading(false);

	if (error) throw error;
	return data;
}

/**
 * Sign in with email and password
 */
export async function signIn(email: string, password: string) {
	authStore.setLoading(true);

	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password
	});

	authStore.setLoading(false);

	if (error) throw error;
	return data;
}

/**
 * Sign in with Google OAuth
 */
export async function signInWithGoogle() {
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "google",
		options: {
			redirectTo: `${window.location.origin}/auth/callback`
		}
	});

	if (error) throw error;
	return data;
}

/**
 * Sign out
 */
export async function signOut() {
	authStore.setLoading(true);

	const { error } = await supabase.auth.signOut();

	authStore.reset();

	if (error) throw error;
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string) {
	const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${window.location.origin}/auth/reset-password`
	});

	if (error) throw error;
	return data;
}

/**
 * Update password (for reset flow)
 */
export async function updatePassword(newPassword: string) {
	const { data, error } = await supabase.auth.updateUser({
		password: newPassword
	});

	if (error) throw error;
	return data;
}

/**
 * Get current session
 */
export async function getSession() {
	const {
		data: { session },
		error
	} = await supabase.auth.getSession();
	if (error) throw error;
	return session;
}

// ----- Demo Mode -----
// For GitHub Pages demo without Supabase configured

const DEMO_USER: User = {
	id: "demo-user-id",
	email: "demo@okisgaragesale.id",
	user_metadata: { name: "Demo User" },
	app_metadata: {},
	aud: "authenticated",
	created_at: new Date().toISOString()
} as User;

export function isDemoMode(): boolean {
	return !supabaseUrl || !supabaseAnonKey;
}

/**
 * Demo sign in (for GitHub Pages without Supabase)
 */
export function demoSignIn() {
	authStore.setUser(DEMO_USER);
	return { user: DEMO_USER };
}

/**
 * Demo sign out
 */
export function demoSignOut() {
	authStore.reset();
}
