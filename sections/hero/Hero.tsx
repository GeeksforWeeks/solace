'use client';

import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {


  // Text Animation Variants
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { y: '105%', rotate: 2 },
    visible: {
      y: 0,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.7,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  return (
    <section
      className="relative min-h-screen bg-black overflow-hidden flex flex-col justify-center"
    >
      {/* Background Split Editorial Columns (Theme Black) */}
      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2 pointer-events-none select-none">
        
        {/* Left Column */}
        <div className="relative h-1/2 lg:h-full overflow-hidden border-b lg:border-b-0 lg:border-r border-border-custom bg-neutral-950">
          <motion.div
            className="absolute inset-0 bg-black/40 z-10"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </div>

        {/* Right Column */}
        <div className="relative h-1/2 lg:h-full overflow-hidden bg-neutral-950">
          <motion.div
            className="absolute inset-0 bg-black/40 z-10"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {/* Massive Overlay Text Content */}
      <div className="relative z-20 px-6 md:px-12 max-w-7xl mx-auto w-full flex flex-col items-center text-center select-none pt-24 lg:pt-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center space-y-0 leading-none"
        >
          {['STYLE', 'VIBE', 'REFLECT'].map((word, idx) => (
            <div key={idx} className="overflow-hidden py-1 flex items-center justify-center">
              <motion.h1
                variants={wordVariants}
                className="font-display font-black text-white uppercase tracking-tighter"
                style={{ fontSize: 'clamp(4.5rem, 9.5vw, 11rem)', lineHeight: 0.85 }}
              >
                {word}
              </motion.h1>
            </div>
          ))}
        </motion.div>

        {/* Subtext and CTA */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="mt-8 flex flex-col items-center space-y-6 max-w-md"
        >
          <Link
            href="/catalog"
            className="inline-block px-10 py-4 bg-white text-black font-display text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors duration-300 pointer-events-auto"
          >
            SHOP NOW
          </Link>
        </motion.div>
      </div>

      {/* Aesthetic Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden lg:block">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] text-text-secondary uppercase tracking-[0.2em] font-medium">Scroll down</span>
          <div className="w-[1px] h-12 bg-neutral-800 overflow-hidden relative">
            <motion.div
              animate={{ y: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="absolute top-0 left-0 w-full h-1/2 bg-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
