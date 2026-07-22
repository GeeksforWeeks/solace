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
        
        {/* Block 1 - Text Left, Image Right */}
        <div ref={ref1} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate={inView1 ? 'visible' : 'hidden'}
            className="space-y-6 order-2 lg:order-1"
          >
            <span className="text-[10px] text-text-secondary uppercase tracking-[0.3em] font-semibold block">
              OUR PHILOSOPHY
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tighter text-white leading-tight">
              WEAR QUIET. <br />
              LEAVE AN IMPRESSION.
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed uppercase tracking-wider">
              Solace is founded on the philosophy that true luxury does not scream. It exists in the meticulous weighting of fabrics, the silence of subtle stitches, and the confidence of understated styling.
            </p>
            <p className="text-text-secondary text-xs leading-relaxed max-w-lg">
              Designed for individualists who understand presence is felt, not shouted. Our pieces act as a dark canvas, highlighting the character of the wearer rather than the branding.
            </p>
            <div className="pt-4">
              <Link
                href="/catalog"
                className="inline-block px-10 py-4 bg-white text-black font-display text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors"
              >
                VIEW THE ESSENTIALS
              </Link>
            </div>
          </motion.div>

          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={inView1 ? 'visible' : 'hidden'}
            className="relative aspect-4/5 w-full bg-neutral-950 border border-border-custom overflow-hidden order-1 lg:order-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=1200"
              alt="Luxury streetwear model wearing Solace outerwear"
              className="w-full h-full object-cover grayscale brightness-90 hover:scale-102 transition-transform duration-1000"
            />
          </motion.div>
        </div>

        {/* Block 2 - Image Left, Text Right */}
        <div ref={ref2} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={inView2 ? 'visible' : 'hidden'}
            className="relative aspect-4/5 w-full bg-neutral-950 border border-border-custom overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1483389127117-b6a2102724ae?auto=format&fit=crop&q=80&w=1200"
              alt="Meticulous garment stitching and craftsmanship details"
              className="w-full h-full object-cover grayscale brightness-90 hover:scale-102 transition-transform duration-1000"
            />
          </motion.div>

          <motion.div
            variants={textVariants}
            initial="hidden"
            animate={inView2 ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            <span className="text-[10px] text-text-secondary uppercase tracking-[0.3em] font-semibold block">
              METICULOUS PRODUCTION
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tighter text-white leading-tight">
              CRAFTED FOR PRESENCE. <br />
              DEFINED BY SOLACE.
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed uppercase tracking-wider">
              Each garment is designed in-house, sourced from organic mills in northern Italy, and hand-finished in limited quantities in Portugal.
            </p>
            <p className="text-text-secondary text-xs leading-relaxed max-w-lg">
              We operate on an exclusive drop schedule to ensure zero stock waste. When an archive is depleted, it is retired permanently. We do not restock.
            </p>
            <div className="pt-4">
              <Link
                href="/catalog"
                className="inline-block px-10 py-4 bg-transparent border border-border-custom text-white hover:border-white font-display text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
              >
                READ THE BRAND ARCHIVE
              </Link>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
