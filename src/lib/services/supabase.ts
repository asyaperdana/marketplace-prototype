// =============================================
// Okis Garage Sale - Supabase Client
// =============================================
// Lazy initialization to avoid errors during SSR prerendering.
// Supabase client is only created when first accessed in the browser.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "$lib/types/supabase";
import { browser } from "$app/environment";

let _supabase: SupabaseClient<Database> | null = null;

/** Whether Supabase is properly configured */
export function isSupabaseReady(): boolean {
	if (!browser) return false;
	const url = import.meta.env.VITE_SUPABASE_URL;
	const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
	return !!url && url !== "" && !!key && key !== "";
}

/** Get (or lazily create) the Supabase client */
export function getSupabase(): SupabaseClient<Database> | null {
	if (!isSupabaseReady()) return null;

	if (!_supabase) {
		const url = import.meta.env.VITE_SUPABASE_URL as string;
		const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

		_supabase = createClient<Database>(url, key, {
			auth: {
				persistSession: true,
				autoRefreshToken: true,
				detectSessionInUrl: true
			}
		});
	}

	return _supabase;
}

/**
 * Convenience accessor — returns the client or throws.
 * Use only when you are sure Supabase is configured.
 */
export function requireSupabase(): SupabaseClient<Database> {
	const client = getSupabase();
	if (!client) {
		throw new Error(
			"Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."
		);
	}
	return client;
}
