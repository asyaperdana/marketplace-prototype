import { browser } from '$app/environment';
import { createClient } from '@supabase/supabase-js';
import { config } from '$lib/config';

const url = config.supabase.url;
const anonKey = config.supabase.anonKey;

export function getSupabaseClient() {
  if (url && anonKey) {
    return createClient(url, anonKey);
  }

  if (browser && (!url || !anonKey)) {
    throw new Error(
      'Missing PUBLIC_SUPABASE_URL or PUBLIC_SUPABASE_ANON_KEY. Add them as repo secrets and expose to the build.'
    );
  }

  // Minimal stub for prerender/build so server-side code doesn't throw
  const noop = async () => ({ data: null, error: null });
  return {
    from: () => ({ select: noop, insert: noop, update: noop, delete: noop }),
    auth: {
      signIn: async () => ({ data: null, error: null }),
      signOut: async () => ({ error: null }),
      getSession: async () => ({ data: { session: null }, error: null }),
      getUser: async () => ({ data: { user: null }, error: null })
    }
  } as unknown as ReturnType<typeof createClient>;
}
