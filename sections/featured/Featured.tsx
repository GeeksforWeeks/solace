'use client';

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ProductCard from '@/components/product-card/ProductCard';
import { useProducts } from '@/hooks/use-products';

export default function Featured() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false,
  });

  const { products, loading } = useProducts();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Optional: Filter to only show products marked as sale/limited/exclusive
  // const featuredProducts = products.filter(p => p.isSale || p.isLimited || p.isExclusive);
  // Or just show all products:
  const displayedProducts = products;

  return (
    <section className="bg-black py-24 px-6 md:px-12 border-b border-border-custom overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header with Carousel Actions */}
        <div className="flex flex-row items-end justify-between border-b border-border-custom/50 pb-6">
          <div className="space-y-4">
            <span className="text-[10px] text-text-secondary uppercase tracking-[0.3em] font-semibold block">
              EDITORIAL CURATION
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tighter text-white">
              FEATURED ARTIFACTS
            </h2>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollPrev}
              disabled={loading}
              className="p-3 border border-border-custom text-text-secondary hover:text-white hover:border-white hover:bg-neutral-900 transition-all duration-300 disabled:opacity-50"
              aria-label="Previous slide"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={scrollNext}
              disabled={loading}
              className="p-3 border border-border-custom text-text-secondary hover:text-white hover:border-white hover:bg-neutral-900 transition-all duration-300 disabled:opacity-50"
              aria-label="Next slide"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Carousel Viewport */}
        {loading ? (
          <div className="flex -mx-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex-none w-full sm:w-[50%] md:w-[33.33%] px-4"
              >
                <div className="aspect-3/4 bg-neutral-900 animate-pulse rounded" />
              </div>
            ))}
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-secondary uppercase tracking-widest text-xs">
              No products available yet. Check back soon!
            </p>
          </div>
        ) : (
          <>
            <div
              ref={emblaRef}
              className="overflow-hidden select-none"
              data-cursor="drag"
            >
              <div className="flex -mx-4">
                {displayedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex-none w-full sm:w-[50%] md:w-[33.33%] px-4 transition-transform duration-500 hover:scale-[0.99]"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>

            {/* Swipe hint */}
            <div className="flex justify-center text-[10px] text-text-secondary uppercase tracking-[0.2em] font-medium pt-2">
              <span>Drag or Swipe to explore drop details</span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}