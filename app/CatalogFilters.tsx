'use client';

import { useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Spinner from '@/components/Spinner';

interface CatalogFiltersProps {
  categories: string[];
  activeCategory: string;
  activeSort: string;
}

export default function CatalogFilters({
  categories,
  activeCategory,
  activeSort,
}: CatalogFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // isPending is true from the moment a filter is clicked until the
  // server component (app/catalog/page.tsx) finishes re-rendering with
  // new data. Right now that's near-instant (local JSON), so this won't
  // visibly show up yet — but it's real, and it'll matter the moment
  // this reads from Supabase instead.
  const [isPending, startTransition] = useTransition();

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'All' || value === 'default') {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    startTransition(() => {
      router.push(`/catalog?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="space-y-8 lg:col-span-1">
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border-custom pb-2">
          <h3 className="font-display text-xs uppercase tracking-widest font-bold">
            CATEGORIES
          </h3>
          {isPending && <Spinner size={12} className="text-text-secondary" />}
        </div>
        <div
          className={`flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-none transition-opacity duration-200 ${
            isPending ? 'opacity-50 pointer-events-none' : 'opacity-100'
          }`}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => updateParam('category', cat)}
              disabled={isPending}
              className={`text-left text-xs uppercase tracking-wider py-1.5 px-3 lg:px-0 transition-colors duration-300 whitespace-nowrap ${
                activeCategory === cat
                  ? 'text-white font-bold'
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-display text-xs uppercase tracking-widest font-bold border-b border-border-custom pb-2">
          SORT BY
        </h3>
        <select
          value={activeSort}
          onChange={(e) => updateParam('sort', e.target.value)}
          disabled={isPending}
          className="w-full bg-black border border-border-custom text-xs uppercase tracking-wider p-3 focus:border-white focus:outline-hidden text-white disabled:opacity-50"
        >
          <option value="default">DEFAULT / ARCHIVED ORDER</option>
          <option value="low-to-high">PRICE: LOW TO HIGH</option>
          <option value="high-to-low">PRICE: HIGH TO LOW</option>
        </select>
      </div>
    </div>
  );
}