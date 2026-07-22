// Browser client — uses the public anon key.
// Safe to import in 'use client' components.
// RLS on the products table controls what this key can actually do
// (read-only, per schema.sql). Never put the service_role key here.

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}