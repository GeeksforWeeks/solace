'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ProductImage from '@/components/product-image/ProductImage';
import { useProducts } from '@/hooks/use-products';

const collectionDescriptions: Record<string, string> = {
  Outerwear: 'Premium Layering & Shells',
  Footwear: 'Technical & Statement Pieces',
  Accessories: 'Curated Details & Finishing',
};

export default function Collections() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const { products, loading } = useProducts();

  // Generate collections from unique categories in products
  const collections = useMemo(() => {
    if (!products.length) return [];

    // Get unique categories
    const uniqueCategories = Array.from(
      new Set(products.map(p => p.category))
    );

    // For each category, get the first product (using it as the "featured" image)
    return uniqueCategories.map((category) => {
      const featuredProduct = products.find(p => p.category === category);
      
      return {
        title: category.toUpperCase(),
        subtitle: collectionDescriptions[category] || 'Exclusive Collection',
        image: featuredProduct?.images?.[0] || '',
        link: `/catalog?category=${category}`,
      };
    });
  }, [products]);

  if (loading) {
    return (
      <section className="bg-black py-24 px-6 md:px-12 border-b border-border-custom overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-4">
            <span className="text-[10px] text-text-secondary uppercase tracking-[0.3em] font-semibold block">
              VISUAL RUNWAYS
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tighter text-white">
              EXPLORE ARCHIVES
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="aspect-4/5 bg-neutral-900 animate-pulse rounded" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (collections.length === 0) {
    return (
      <section className="bg-black py-24 px-6 md:px-12 border-b border-border-custom overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-4">
            <span className="text-[10px] text-text-secondary uppercase tracking-[0.3em] font-semibold block">
              VISUAL RUNWAYS
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tighter text-white">
              EXPLORE ARCHIVES
            </h2>
          </div>
          <div className="text-center py-12">
            <p className="text-text-secondary uppercase tracking-widest text-xs">
              No categories available yet. Add some products to get started!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-black py-24 px-6 md:px-12 border-b border-border-custom overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4">
          <span className="text-[10px] text-text-secondary uppercase tracking-[0.3em] font-semibold block">
            VISUAL RUNWAYS
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tighter text-white">
            EXPLORE ARCHIVES
          </h2>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col, idx) => (
            <Link
              href={col.link}
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="relative aspect-4/5 block bg-neutral-950 border border-border-custom hover:border-white transition-colors duration-500 group overflow-hidden"
            >
              {/* Image Container with zoom */}
              <div className="absolute inset-0 w-full h-full">
                <ProductImage
                  src={col.image}
                  alt={col.title}
                  aspectRatioClassName="aspect-4/5"
                  className="transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  showGrayscale={false}
                />
              </div>

              {/* Dynamic Overlay Dimming / Focus Effect */}
              <motion.div
                className="absolute inset-0 bg-black z-10"
                initial={{ opacity: 0.55 }}
                animate={{
                  opacity:
                    hoveredIdx === null
                      ? 0.55 // Normal State
                      : hoveredIdx === idx
                      ? 0.35 // Hovered item (reveals more image details)
                      : 0.75, // Other dimmed items
                }}
                transition={{ duration: 0.4 }}
              />

              {/* Text Information Overlay */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-20">
                <div className="space-y-2 translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-[0.25,1,0.5,1]">
                  <span className="text-[10px] text-text-secondary uppercase tracking-[0.2em] font-medium block">
                    {col.subtitle}
                  </span>
                  <h3 className="font-display font-bold text-lg md:text-xl tracking-wider text-white uppercase">
                    {col.title}
                  </h3>
                  
                  {/* Subtle reveal line */}
                  <div className="w-0 group-hover:w-16 h-[1px] bg-white transition-all duration-500 ease-in-out" />
                  <span className="inline-block text-[9px] font-bold text-white tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mt-2">
                    BROWSE DROP →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}