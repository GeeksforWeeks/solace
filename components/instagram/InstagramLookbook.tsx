'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, X, ShoppingBag, Eye, ArrowRight } from 'lucide-react';
import configData from '@/data/config.json';
import productsData from '@/data/products.json';
import Link from 'next/link';
import { Product } from '@/types';

interface InstagramPost {
  id: string;
  imageUrl: string;
  likes: number;
  caption: string;
  taggedProductSlug: string;
  x: number; // Hotspot X percentage
  y: number; // Hotspot Y percentage
}

export default function InstagramLookbook() {
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [isHotspotHovered, setIsHotspotHovered] = useState(false);

  const posts = configData.instagram.posts as InstagramPost[];
  const username = configData.instagram.username;

  // Get tagged product details
  const getTaggedProduct = (slug: string) => {
    return productsData.find((p) => p.slug === slug);
  };

  const handleWhatsAppRedirect = (product: Product) => {
    const defaultPhone = configData.whatsapp.phoneNumber;
    const itemUrl = `${window.location.origin}/product/${product.slug}`;
    const text = configData.whatsapp.prefilledTextProduct
      .replace('{productName}', product.name)
      .replace('{size}', product.sizes[0] || 'One Size')
      .replace('{price}', product.price.toString())
      .replace('{productUrl}', itemUrl);

    window.open(`https://wa.me/${defaultPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="bg-black py-24 px-6 md:px-12 border-b border-border-custom overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border-custom/50 pb-6">
          <div className="space-y-4">
            <span className="text-[10px] text-text-secondary uppercase tracking-[0.3em] font-semibold block">
              INSTAGRAM RUNWAY
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tighter text-white">
              SHOP THE LOOKBOOK
            </h2>
          </div>
          <a
            href={`https://instagram.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-white transition-colors text-xs uppercase tracking-widest font-bold flex items-center gap-2"
          >
            @{username} ON INSTAGRAM <ArrowRight size={14} />
          </a>
        </div>

        {/* Lookbook Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group relative aspect-square bg-neutral-950 border border-border-custom hover:border-white transition-all duration-500 overflow-hidden cursor-pointer"
            >
              {/* Photo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.imageUrl}
                alt={post.caption}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />

              {/* Hover Stats Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-4 z-10">
                <div className="flex gap-6 text-white font-mono text-xs">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Heart size={14} fill="white" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1.5 font-semibold">
                    <MessageCircle size={14} fill="white" /> {Math.floor(post.likes / 15)}
                  </span>
                </div>
                <div className="px-4 py-2 bg-white text-black font-display text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <Eye size={12} /> EXAMINE FIT
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Hotspot Modal */}
      <AnimatePresence>
        {selectedPost && (() => {
          const product = getTaggedProduct(selectedPost.taggedProductSlug);
          return (
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPost(null)}
              />

              {/* Lightbox Panel */}
              <motion.div
                className="relative bg-card border border-border-custom w-full max-w-4xl max-h-[90vh] overflow-y-auto z-10 grid grid-cols-1 md:grid-cols-12"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', duration: 0.5 }}
              >
                {/* Left Side: Image with Hotspots (Cols 7/12) */}
                <div className="relative md:col-span-7 bg-neutral-950 aspect-square md:aspect-auto md:h-[600px] flex items-center overflow-hidden border-r border-border-custom">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedPost.imageUrl}
                    alt={selectedPost.caption}
                    className="w-full h-full object-cover"
                  />

                  {/* Hotspot Target Marker */}
                  {product && (
                    <div
                      className="absolute group/hotspot cursor-pointer z-20"
                      style={{ left: `${selectedPost.x}%`, top: `${selectedPost.y}%` }}
                      onMouseEnter={() => setIsHotspotHovered(true)}
                      onMouseLeave={() => setIsHotspotHovered(false)}
                      onClick={() => setIsHotspotHovered(!isHotspotHovered)}
                    >
                      {/* Pulse Circle */}
                      <span className="absolute -inset-2.5 rounded-full bg-white/30 animate-ping" />
                      <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-white text-black shadow-lg">
                        <ShoppingBag size={10} className="stroke-[2.5px]" />
                      </span>

                      {/* Tooltip Hover Overlay */}
                      <AnimatePresence>
                        {isHotspotHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute bottom-7 left-1/2 -translate-x-1/2 w-48 bg-black border border-border-custom p-3.5 shadow-2xl text-left pointer-events-auto"
                          >
                            <span className="text-[8px] text-text-secondary uppercase tracking-widest font-semibold block">
                              {product.category}
                            </span>
                            <span className="font-display font-bold text-[10px] text-white uppercase tracking-wider block mt-1 leading-tight">
                              {product.name}
                            </span>
                            <span className="text-[10px] font-mono text-white block mt-1 font-semibold">
                              ${product.price}
                            </span>
                            <div className="mt-2.5 pt-2 border-t border-border-custom/50 flex justify-between items-center text-[8px] font-bold text-white uppercase tracking-widest">
                              <span>Details</span>
                              <ArrowRight size={10} />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>

                {/* Right Side: Instagram Post Info & Tagged Product (Cols 5/12) */}
                <div className="md:col-span-5 flex flex-col justify-between p-6 md:p-8 h-full min-h-[400px] md:min-h-[600px]">
                  <div className="space-y-6">
                    {/* IG Username Header */}
                    <div className="flex justify-between items-center border-b border-border-custom pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border border-border-custom bg-neutral-900 flex items-center justify-center font-display font-black text-xs text-white">
                          S
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-white tracking-wide">@{username}</span>
                          <span className="text-[9px] text-text-secondary tracking-widest uppercase">ATELIER INSTAGRAM</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedPost(null)}
                        className="text-text-secondary hover:text-white p-2 hover:bg-neutral-900 transition-colors"
                        aria-label="Close lookbook details"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    {/* IG Caption */}
                    <div className="space-y-2">
                      <p className="text-xs text-white leading-relaxed font-light">
                        {selectedPost.caption}
                      </p>
                      <div className="flex gap-4 font-mono text-[10px] text-text-secondary pt-2 uppercase">
                        <span>{selectedPost.likes} Likes</span>
                        <span>•</span>
                        <span>{Math.floor(selectedPost.likes / 12)} Comments</span>
                      </div>
                    </div>

                    {/* Tagged Product Box */}
                    {product && (
                      <div className="border border-border-custom p-4 bg-black/40 space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[8px] text-text-secondary uppercase tracking-[0.2em] font-semibold">
                              TAGGED GARMENT
                            </span>
                            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white mt-1">
                              {product.name}
                            </h4>
                          </div>
                          <span className="font-mono text-xs font-semibold">${product.price}</span>
                        </div>

                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-32 object-cover border border-border-custom/50 grayscale"
                        />

                        <div className="flex gap-2">
                          <Link
                            href={`/product/${product.slug}`}
                            onClick={() => setSelectedPost(null)}
                            className="flex-1 py-2.5 bg-neutral-900 border border-border-custom text-white font-display text-[10px] font-bold uppercase tracking-widest text-center hover:bg-white hover:text-black hover:border-white transition-all flex items-center justify-center"
                          >
                            VIEW DETAILS
                          </Link>
                          <button
                            onClick={() => handleWhatsAppRedirect(product)}
                            className="flex-1 py-2.5 bg-white text-black font-display text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors"
                          >
                            ORDER NOW
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer details */}
                  <div className="border-t border-border-custom pt-4 text-[9px] text-text-secondary uppercase tracking-widest">
                    <span>TAP COMPONENT HOTSPOT TO SHOP LOOK</span>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
