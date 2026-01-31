import { createClient } from "@supabase/supabase-js";
import { config } from "$lib/config";

if (!config.supabase.url || !config.supabase.anonKey) {
	console.warn("Supabase URL or Anon Key is missing in environment variables.");
}

export const supabase = createClient(config.supabase.url || "", config.supabase.anonKey || "");
