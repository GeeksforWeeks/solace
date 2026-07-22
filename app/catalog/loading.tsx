// Next.js special file — automatically shown while app/catalog/page.tsx
// is fetching data (e.g. the Supabase query once that's wired in) or
// during navigation into this route. No manual triggering needed,
// Next handles showing/hiding this itself.

import BrandLoader from "@/components/BrandLoader";

export default function CatalogLoading() {
  return <BrandLoader />;
}
