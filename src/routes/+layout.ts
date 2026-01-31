import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr';
import { config } from '$lib/config';
import type { LayoutLoad } from './$types';

export const prerender = true;
export const trailingSlash = 'always';

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = isBrowser()
		? createBrowserClient(config.supabase.url || '', config.supabase.anonKey || '', {
				global: {
					fetch
				}
			})
		: createServerClient(config.supabase.url || '', config.supabase.anonKey || '', {
				global: {
					fetch
				},
				cookies: {
					getAll() {
						return data.cookies;
					}
				}
			});

	/**
	 * It's fine to use `getSession` here, because on the client, `getSession` is
	 * safe, and on the server, it reads `session` from the `LayoutServerLoad`,
	 * which has been validated by `getUser`.
	 *
	 * See: https://supabase.com/docs/guides/auth/server-side/sveltekit
	 */
	const {
		data: { session }
	} = await supabase.auth.getSession();

	return { supabase, session };
};
