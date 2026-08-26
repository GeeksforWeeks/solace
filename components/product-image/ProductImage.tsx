'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EyeOff } from 'lucide-react';

interface ProductImageProps {
  src?: string;
  alt: string;
  className?: string;
  aspectRatioClassName?: string;
  loadingLazy?: boolean;
  showGrayscale?: boolean;
}

export default function ProductImage({
  src,
  alt,
  className = '',
  aspectRatioClassName = 'aspect-3/4',
  loadingLazy = true,
  showGrayscale = false, // Changed to false — show real colors for real products!
}: ProductImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);

    // If the image is cached, it might already be loaded before React mounts
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }
  }, [src]);

  // If no src provided, show placeholder immediately
  if (!src) {
    return (
      <div
        className={`relative w-full overflow-hidden bg-neutral-950 border border-border-custom/50 flex items-center justify-center ${aspectRatioClassName}`}
      >
        <EyeOff className="text-text-secondary" size={24} />
      </div>
    );
  }

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
          </motion.div>
        )}
      </AnimatePresence>

      {hasError ? (
        <div className="absolute inset-0 bg-neutral-950 flex flex-col items-center justify-center p-4 text-center z-10">
          <EyeOff className="text-text-secondary mb-2" size={18} />
          <span className="text-[8px] font-mono tracking-widest text-text-secondary uppercase">
            IMAGE NOT FOUND
          </span>
          <span className="text-[7px] font-mono text-neutral-800 mt-1 uppercase max-w-[120px] truncate">
            {alt}
          </span>
        </div>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          loading={loadingLazy ? 'lazy' : 'eager'}
          className={`w-full h-full object-cover object-center transition-all duration-1000 ease-out ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          } ${showGrayscale ? 'grayscale brightness-90' : ''} ${className}`}
        />
      )}

      <div className="absolute inset-0 border border-transparent group-hover/image-wrapper:border-white/10 transition-colors pointer-events-none z-20" />
    </div>
  );
}