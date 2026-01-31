import { createClient } from "@supabase/supabase-js";
import { config } from "$lib/config";

const supabaseUrl = config.supabase.url;
const supabaseKey = config.supabase.anonKey;

if (!supabaseUrl || !supabaseKey) {
	if (typeof window !== 'undefined') {
		throw new Error(
			"Your project's URL and Key are required to create a Supabase client! Check your Supabase project's API settings."
		);
	} else {
		console.warn('Supabase URL or Key is missing. Supabase client will not be fully functional.');
	}
}

export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseKey || 'placeholder');
