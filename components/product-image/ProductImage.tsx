'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EyeOff } from 'lucide-react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatioClassName?: string;
  loadingLazy?: boolean;
}

export default function ProductImage({
  src,
  alt,
  className = '',
  aspectRatioClassName = 'aspect-3/4',
  loadingLazy = true,
}: ProductImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  return (
    <div
      className={`relative w-full overflow-hidden bg-neutral-950 border border-border-custom/50 group/image-wrapper ${aspectRatioClassName}`}
    >
      <AnimatePresence>
        {!isLoaded && !hasError && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-neutral-900 flex items-center justify-center z-10"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 bg-[length:200%_100%] animate-pulse" />
            <svg
              width="24"
              height="24"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-neutral-700 animate-spin-slow relative"
            >
              <path d="M50 10V90" stroke="currentColor" strokeWidth="6" />
              <path d="M10 50H90" stroke="currentColor" strokeWidth="6" />
              <rect x="30" y="30" width="40" height="40" stroke="currentColor" strokeWidth="4" fill="none" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {hasError ? (
        <div className="absolute inset-0 bg-neutral-950 flex flex-col items-center justify-center p-4 text-center z-10">
          <EyeOff className="text-text-secondary mb-2" size={18} />
          <span className="text-[8px] font-mono tracking-widest text-text-secondary uppercase">
            IMAGE ARCHIVED
          </span>
          <span className="text-[7px] font-mono text-neutral-800 mt-1 uppercase max-w-[120px] truncate">
            {alt}
          </span>
        </div>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600'}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          loading={loadingLazy ? 'lazy' : 'eager'}
          className={`w-full h-full object-cover object-center grayscale brightness-90 transition-all duration-1000 ease-out ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          } ${className}`}
        />
      )}

      <div className="absolute inset-0 border border-transparent group-hover/image-wrapper:border-white/10 transition-colors pointer-events-none z-20" />
    </div>
  );
}
