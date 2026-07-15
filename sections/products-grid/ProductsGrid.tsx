'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ProductCard from '@/components/product-card/ProductCard';
import productsData from '@/data/products.json';
import Link from 'next/link';

export default function ProductsGrid() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const headingVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  // Limit to first 4 products for homepage grid
  const displayedProducts = productsData.slice(0, 4);

  return (
    <section ref={ref} className="py-24 bg-black border-b border-border-custom px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <motion.div
          variants={headingVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="space-y-4">
            <span className="text-[10px] text-text-secondary uppercase tracking-[0.3em] font-semibold block">
              SEASONAL COLLECTION
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tighter text-white">
              CORE LATEST DROPS
            </h2>
          </div>
          <p className="text-text-secondary text-xs uppercase tracking-widest max-w-sm leading-relaxed">
            Crafted for individualists. Limited quantities released globally. No restocks.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {displayedProducts.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center pt-6"
        >
          <Link
            href="/catalog"
            className="px-10 py-4 bg-transparent border border-border-custom hover:border-white text-white font-display text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
          >
            EXPLORE ALL DROPS
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
