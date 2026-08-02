'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/hooks/use-cart-store';
import ProductImage from '@/components/product-image/ProductImage';
import configData from '@/data/config.json';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleWishlist, wishlist } = useStore();
  const [isHovered, setIsHovered] = useState(false);

  const isWishlisted = wishlist.some((item) => item.id === product.id);
  const hasImages = product.images && product.images.length > 0;
  const hasSizes = product.sizes && product.sizes.length > 0;

  const handleQuickWhatsApp = (e: React.MouseEvent, size: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const defaultPhone = configData.whatsapp.phoneNumber;
    const itemUrl = `${window.location.origin}/product/${product.slug}`;
    const text = configData.whatsapp.prefilledTextProduct
      .replace('{productName}', product.name)
      .replace('{size}', size)
      .replace('{price}', product.price.toString())
      .replace('{productUrl}', itemUrl);

    window.open(`https://wa.me/${defaultPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-card border border-border-custom hover:border-white transition-all duration-500 overflow-hidden"
    >
      {/* Product Image & Overlays */}
      <div className="relative aspect-3/4 w-full bg-neutral-950 overflow-hidden">
        
        {/* Sale / Promo Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5 pointer-events-none">
          {product.isSale && (
            <span className="bg-white text-black text-[9px] font-bold tracking-widest uppercase px-3 py-1 font-display leading-none">
              SALE
            </span>
          )}
          {product.isLimited && (
            <span className="bg-neutral-900 border border-border-custom text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1 font-display leading-none">
              LIMITED
            </span>
          )}
          {product.isExclusive && (
            <span className="bg-white text-black text-[9px] font-bold tracking-widest uppercase px-3 py-1 font-display leading-none">
              EXCL
            </span>
          )}
        </div>

        {/* Wishlist Icon */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/90 border border-border-custom text-white hover:text-white transition-all duration-300 pointer-events-auto"
          aria-label="Add to wishlist"
        >
          <Heart size={14} fill={isWishlisted ? '#FFFFFF' : 'none'} className="transition-all duration-300" />
        </button>

        {/* Link wraps image for routing */}
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <ProductImage
            src={hasImages ? product.images[0] : undefined}
            alt={product.name}
            className="transition-transform duration-1000 ease-out group-hover:scale-105"
            showGrayscale={false}
          />
        </Link>

        {/* Quick Add Sizes Overlay (Slides up on desktop hover) */}
        <AnimatePresence>
          {isHovered && hasSizes && (
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
              className="absolute bottom-0 left-0 w-full bg-black/90 border-t border-border-custom p-4 z-20 flex flex-col gap-2.5 hidden md:flex"
            >
              <span className="text-[9px] font-bold tracking-widest uppercase text-text-secondary text-center block">
                QUICK SIZE ADD
              </span>
              <div className="flex gap-2 justify-center flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={(e) => handleQuickWhatsApp(e, size)}
                    className="px-3 py-1.5 border border-border-custom bg-black text-white hover:bg-white hover:text-black hover:border-white transition-all text-[10px] font-mono font-bold"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Card Details */}
      <div className="p-4 md:p-6 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] text-text-secondary uppercase tracking-[0.2em] font-medium block">
            {product.category}
          </span>
          <Link href={`/product/${product.slug}`} className="hover:text-text-secondary transition-colors duration-300">
            <h3 className="font-display font-bold text-sm tracking-wider uppercase mt-1 leading-tight text-white">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price layout */}
        <div className="flex gap-3 items-center mt-3 pt-3 border-t border-border-custom/50">
          {product.oldPrice ? (
            <>
              <span className="text-[11px] font-mono text-text-secondary line-through font-medium">
                P{product.oldPrice.toFixed(2)}
              </span>
              <span className="text-[12px] font-mono font-bold text-white">
                P{product.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-[12px] font-mono font-bold text-white">
              P{product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}