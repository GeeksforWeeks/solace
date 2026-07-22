// Server client — for use inside Server Components, Route Handlers,
// and Server Actions only. Reads the admin session cookie (once Supabase
// Auth is wired up) so RLS policies checking auth.uid() work correctly.
//
// Still uses the anon key here, NOT service_role — this respects RLS
// like a normal logged-in user would. Only reach for service_role in
// trusted server-only scripts (e.g. a one-off seed script), never in
// a route that handles user input.

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // setAll called from a Server Component (not a Route Handler
            // or Server Action) — this is expected and safe to ignore,
            // because middleware.ts refreshes the session on every
            // request before this ever runs.
          }
        },
      },
    },
  );
}
