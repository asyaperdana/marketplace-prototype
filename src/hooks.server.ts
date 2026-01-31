import { createServerClient } from "@supabase/ssr";
import type { Handle } from "@sveltejs/kit";
import { config } from "$lib/config";

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createServerClient(
		config.supabase.url || "",
		config.supabase.anonKey || "",
		{
			cookies: {
				getAll: () => event.cookies.getAll(),
				setAll: (cookiesToSet) => {
					cookiesToSet.forEach(({ name, value, options }) => {
						event.cookies.set(name, value, { ...options, path: "/" });
					});
				}
			}
		}
	);

	/**
	 * Unlike `supabase.auth.getSession()`, which returns the session _without_
	 * validating the JWT, this function fetches the user object, which is
	 * much safer.
	 *
	 * See: https://supabase.com/docs/guides/auth/server-side/sveltekit
	 */
	event.locals.safeGetSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		if (!session) {
			return { session: null, user: null };
		}

		const {
			data: { user },
			error
		} = await event.locals.supabase.auth.getUser();
		if (error) {
			// JWT validation has failed
			return { session: null, user: null };
		}

		return { session, user };
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === "content-range" || name === "x-supabase-api-version";
		}
	});
};
