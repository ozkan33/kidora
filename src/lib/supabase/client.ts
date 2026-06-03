import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser-side Supabase client (scaffold).
 *
 * Used later for client login / the client registry. Reads public env vars;
 * safe to import anywhere on the client. No auth flows are wired yet.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
