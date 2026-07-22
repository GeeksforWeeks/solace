'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductCard from '@/components/product-card/ProductCard';
import BrandLoader from '@/components/BrandLoader';
import Footer from '@/sections/footer/Footer';
import { useProducts } from '@/hooks/use-products';

function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const { products, loading } = useProducts();

  // Filters State
  const categoryParam = searchParams.get('category') || 'All';
  const [sortOption, setSortOption] = useState('default');

  const categories = ['All', 'Outerwear', 'Footwear', 'Accessories'];

  if (loading) {
    return (
      <div className="min-h-[60vh] bg-black flex items-center justify-center text-white font-display text-xs tracking-widest uppercase">
        LOADING COLLECTION DROPS...
      </div>
    );
  }

  // Filtering & Sorting Logic
  const filteredProducts = products.filter((product) => {
    if (categoryParam === 'All') return true;
    return product.category.toLowerCase() === categoryParam.toLowerCase();
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'low-to-high') return a.price - b.price;
    if (sortOption === 'high-to-low') return b.price - a.price;
    return 0; // Default
  });

  const handleCategoryChange = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === 'All') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    router.push(`/catalog?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-between">
      <div>
        {/* Title Header */}
        <div className="pt-36 pb-12 border-b border-border-custom px-6 md:px-12 max-w-7xl mx-auto w-full">
          <span className="text-[10px] text-text-secondary uppercase tracking-[0.3em] font-semibold">
            ATELIER COLLECTION
          </span>
          <h1 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tighter text-white mt-2">
            {categoryParam === 'All' ? 'ALL PRODUCTS' : `${categoryParam}`}
          </h1>
        </div>

        {/* Filters and Grid layout */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sidebar filters */}
          <div className="space-y-8 lg:col-span-1">
            <div className="space-y-4">
              <h3 className="font-display text-xs uppercase tracking-widest font-bold border-b border-border-custom pb-2">
                CATEGORIES
              </h3>
              <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`text-left text-xs uppercase tracking-wider py-1.5 px-3 lg:px-0 transition-colors duration-300 whitespace-nowrap ${
                      categoryParam === cat
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
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full bg-black border border-border-custom text-xs uppercase tracking-wider p-3 focus:border-white focus:outline-hidden text-white"
              >
                <option value="default">DEFAULT / ARCHIVED ORDER</option>
                <option value="low-to-high">PRICE: LOW TO HIGH</option>
                <option value="high-to-low">PRICE: HIGH TO LOW</option>
              </select>
            </div>
          </div>

          {/* Grid display */}
          <div className="lg:col-span-3">
            {sortedProducts.length === 0 ? (
              <div className="h-64 flex items-center justify-center text-center">
                <span className="text-text-secondary uppercase tracking-widest text-xs">
                  No items match selections.
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function Catalog() {
  return (
    <Suspense
      fallback={
        <BrandLoader/>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}
