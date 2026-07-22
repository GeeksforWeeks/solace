'use client';

import React, { use, useState, useEffect } from 'react';
import { useStore } from '@/hooks/use-cart-store';
import ProductCard from '@/components/product-card/ProductCard';
import Footer from '@/sections/footer/Footer';
import { Heart, ShoppingBag, Truck, RefreshCw, Shield, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useProducts } from '@/hooks/use-products';
import ProductImage from '@/components/product-image/ProductImage';
import configData from '@/data/config.json';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  // Unwrap the Next.js 15 async params promise
  const { slug } = use(params);

  const { products, loading } = useProducts();
  const product = products.find((p) => p.slug === slug);

  // State
  const [activeImage, setActiveImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [showSizeError, setShowSizeError] = useState(false);
  const [activeTab, setActiveTab] = useState<'desc' | 'materials' | 'shipping'>('desc');

  const { toggleWishlist, wishlist, setSizeMatrixOpen } = useStore();

  // Set default active image once product is resolved
  useEffect(() => {
    if (product) {
      setActiveImage(product.images[0]);
      setSelectedSize('');
      setShowSizeError(false);
    }
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-display text-xs tracking-widest uppercase">
        LOADING COLLECTION GARMENT...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col justify-between">
        <div className="flex-1 flex flex-col items-center justify-center space-y-6 pt-36">
          <AlertTriangle className="text-text-secondary" size={48} />
          <h2 className="font-display font-black text-2xl uppercase tracking-widest text-white">
            ARCHIVE NOT FOUND
          </h2>
          <p className="text-text-secondary text-xs uppercase tracking-wider">
            The requested garment design has not been registered.
          </p>
          <Link
            href="/catalog"
            className="px-8 py-3 bg-white text-black font-display text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors"
          >
            RETURN TO CATALOG
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleOrderWhatsApp = () => {
    if (!selectedSize) {
      setShowSizeError(true);
      return;
    }
    setShowSizeError(false);
    
    const defaultPhone = configData.whatsapp.phoneNumber;
    const itemUrl = window.location.href;
    const text = configData.whatsapp.prefilledTextProduct
      .replace('{productName}', product.name)
      .replace('{size}', selectedSize)
      .replace('{price}', product.price.toString())
      .replace('{productUrl}', itemUrl);

    window.open(`https://wa.me/${defaultPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Recommendations: Other products
  const recommendations = products
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-between">
      {/* JSON-LD Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            image: product.images,
            description: product.description,
            category: product.category,
            offers: {
              '@type': 'Offer',
              priceCurrency: 'USD',
              price: product.price,
              itemCondition: 'https://schema.org/NewCondition',
              availability: 'https://schema.org/InStock',
              url: `https://solace.luxury/product/${product.slug}`,
            },
          }),
        }}
      />
      <div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-36 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Side: Photo Gallery (Columns: 7/12) */}
            <div className="lg:col-span-7 space-y-4">
              <ProductImage
                src={activeImage || product.images[0]}
                alt={product.name}
                className="transition-all duration-500"
              />

              {/* Grid Thumbnails */}
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative aspect-3/4 bg-neutral-950 border overflow-hidden hover:opacity-90 transition-all duration-300 ${
                      (activeImage || product.images[0]) === img
                        ? 'border-white'
                        : 'border-border-custom'
                    }`}
                  >
                    <ProductImage
                      src={img}
                      alt={`${product.name} thumbnail view ${idx}`}
                      aspectRatioClassName="aspect-3/4"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side: Product Configuration & Details (Columns: 5/12) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] text-text-secondary uppercase tracking-[0.25em] font-semibold block">
                    {product.category}
                  </span>
                  <h1 className="font-display font-black text-3xl md:text-4xl uppercase tracking-tighter text-white mt-2 leading-none">
                    {product.name}
                  </h1>
                </div>

                {/* Price */}
                <div className="flex gap-4 items-center">
                  {product.oldPrice ? (
                    <>
                      <span className="text-sm font-mono text-text-secondary line-through">
                        ${product.oldPrice}
                      </span>
                      <span className="text-lg font-mono font-bold text-white">
                        ${product.price}
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-mono font-bold text-white">
                      ${product.price}
                    </span>
                  )}
                </div>

                <div className="border-t border-border-custom pt-6">
                  <p className="text-text-secondary text-xs uppercase tracking-wider leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Sizing Selection */}
                <div className="space-y-3 pt-4">
                  <div className="flex justify-between items-center text-[10px] font-bold tracking-widest text-text-secondary uppercase">
                    <span>SELECT SIZE</span>
                    <button
                      onClick={() => setSizeMatrixOpen(true)}
                      className="underline hover:text-white transition-colors"
                    >
                      Size Matrix
                    </button>
                  </div>
                  
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          setSelectedSize(size);
                          setShowSizeError(false);
                        }}
                        className={`px-4 py-2 text-xs font-mono font-bold border transition-all duration-300 ${
                          selectedSize === size
                            ? 'bg-white text-black border-white'
                            : 'bg-black text-white border-border-custom hover:border-white'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  {showSizeError && (
                    <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest flex items-center gap-1.5 mt-1 animate-pulse">
                      ✕ PLEASE SELECT A SIZE BEFORE ADDING TO BAG
                    </p>
                  )}
                </div>

                {/* Add to Cart & Wishlist Actions */}
                <div className="flex gap-4 pt-6">
                  <button
                    onClick={handleOrderWhatsApp}
                    className="flex-1 py-4 bg-white text-black font-display font-bold uppercase tracking-widest text-xs hover:bg-neutral-200 transition-colors flex items-center justify-center gap-3"
                  >
                    <ShoppingBag size={14} />
                    ORDER ON WHATSAPP
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className="p-4 border border-border-custom hover:border-white text-white hover:bg-neutral-900 transition-colors"
                    aria-label="Add to wishlist"
                  >
                    <Heart size={16} fill={isWishlisted ? '#FFFFFF' : 'none'} className="transition-all duration-300" />
                  </button>
                </div>
              </div>

              {/* Informational Tabs Accordion */}
              <div className="border-t border-border-custom pt-6">
                <div className="flex border-b border-border-custom text-[10px] font-bold tracking-widest uppercase">
                  {(['desc', 'materials', 'shipping'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-3 text-center border-b transition-colors ${
                        activeTab === tab
                          ? 'border-white text-white'
                          : 'border-transparent text-text-secondary hover:text-white'
                      }`}
                    >
                      {tab === 'desc' ? 'SPECIFICATIONS' : tab === 'materials' ? 'ORIGINS' : 'SHIPPING'}
                    </button>
                  ))}
                </div>

                <div className="py-4 text-xs text-text-secondary leading-relaxed uppercase tracking-wider">
                  {activeTab === 'desc' && (
                    <ul className="space-y-1.5 list-disc list-inside">
                      {product.details.map((detail, idx) => (
                        <li key={idx} className="text-[11px]">{detail}</li>
                      ))}
                    </ul>
                  )}
                  {activeTab === 'materials' && (
                    <div className="space-y-2">
                      <p className="text-[11px]">MATERIALS USED:</p>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {product.materials.map((mat, i) => (
                          <span key={i} className="px-2.5 py-1 bg-neutral-900 text-[10px] text-white border border-border-custom">
                            {mat}
                          </span>
                        ))}
                      </div>
                      <p className="text-[10px] text-text-secondary lowercase mt-2">
                        Designed at SOLACE atelier. Hand-finished and dyed for a vintage silhouette.
                      </p>
                    </div>
                  )}
                  {activeTab === 'shipping' && (
                    <div className="space-y-4">
                      <div className="flex gap-3 items-start">
                        <Truck size={14} className="shrink-0 mt-0.5" />
                        <p className="text-[11px]">Free express dispatch globally on orders over $300. Standard courier rates apply.</p>
                      </div>
                      <div className="flex gap-3 items-start">
                        <RefreshCw size={14} className="shrink-0 mt-0.5" />
                        <p className="text-[11px]">Archived limited releases are eligible for custom size returns within 14 days.</p>
                      </div>
                      <div className="flex gap-3 items-start">
                        <Shield size={14} className="shrink-0 mt-0.5" />
                        <p className="text-[11px]">Ships in heavy organic Solace signature packaging.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Recommendations */}
          <div className="border-t border-border-custom mt-24 pt-16">
            <h3 className="font-display font-black text-2xl uppercase tracking-tighter text-white mb-10">
              RELATED ATELIER ITEMS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((rec) => (
                <ProductCard key={rec.id} product={rec} />
              ))}
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
