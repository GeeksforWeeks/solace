'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

export default function Mission() {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.15 });

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <section className="bg-black py-24 px-6 md:px-12 border-b border-border-custom overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-32">
        
        {/* Block 1 - Founder Story - Text Left, Image Right */}
        <div ref={ref1} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate={inView1 ? 'visible' : 'hidden'}
            className="space-y-6 order-2 lg:order-1"
          >
            <span className="text-[10px] text-text-secondary uppercase tracking-[0.3em] font-semibold block">
              THE FOUNDER
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tighter text-white leading-tight">
              KATLO SELEKA. <br />
              BRINGING THE WORLD HOME.
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed uppercase tracking-wider">
              Solace was built on a simple conviction: Botswana deserves access to the same curated fashion and accessories that define global culture. Katlo saw the gap between international trends and local availability.
            </p>
            <p className="text-text-secondary text-xs leading-relaxed max-w-lg">
              From Chrome Hearts pieces to limited Crocs drops, from statement handbags to phone cases that elevate everyday carry — every item in the solace collection is hand-selected from trusted sources worldwide and made available to individualists across Botswana. Quality over volume. Curation over convenience.
            </p>
            <div className="pt-4">
              <Link
                href="/catalog"
                className="inline-block px-10 py-4 bg-white text-black font-display text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors"
              >
                EXPLORE THE COLLECTION
              </Link>
            </div>
          </motion.div>

          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={inView1 ? 'visible' : 'hidden'}
            className="relative aspect-4/5 w-full bg-neutral-950 border border-border-custom overflow-hidden order-1 lg:order-2"
          >
            {/* Replace with Katlo's actual image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://res.cloudinary.com/dkrlubugm/image/upload/v1785679647/Screenshot_20260802_160601_Instagram_cpmhrj.png"
              alt="Katlo Seleka, founder of Solace"
              className="w-full h-full object-cover brightness-90 hover:scale-102 transition-transform duration-1000"
            />
          </motion.div>
        </div>

        {/* Block 2 - Curation Philosophy - Image Left, Text Right */}
        <div ref={ref2} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={inView2 ? 'visible' : 'hidden'}
            className="relative aspect-4/5 w-full bg-neutral-950 border border-border-custom overflow-hidden"
          >
            {/* Replace with curation/collection showcase image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://res.cloudinary.com/dkrlubugm/image/upload/v1785679986/Screenshot_2026-08-02_161246_bsrwbk.png"
              alt="Solace curated collection of fashion and accessories"
              className="w-full h-full object-cover brightness-90 hover:scale-102 transition-transform duration-1000"
            />
          </motion.div>

          <motion.div
            variants={textVariants}
            initial="hidden"
            animate={inView2 ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            <span className="text-[10px] text-text-secondary uppercase tracking-[0.3em] font-semibold block">
              OUR METHOD
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tighter text-white leading-tight">
              GLOBAL SOURCES. <br />
              LOCAL DELIVERY.
            </h2>
            
            <p className="text-text-secondary text-xs leading-relaxed max-w-lg">
              Every piece is vetted for authenticity and quality. Fast shipping, secure handling, and transparent pricing. Solace makes the rare accessible. Not for everyone — for individuals who know what they want.
            </p>
            <div className="pt-4">
              <Link
                href="/catalog"
                className="inline-block px-10 py-4 bg-transparent border border-border-custom text-white hover:border-white font-display text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
              >
                BROWSE DROPS
              </Link>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}