'use client';

import React from 'react';

export default function InfiniteMarquee() {
  const marqueeItems = [
    'NEW ARRIVAL',
    'LIMITED RELEASE',
    'SOLACE STUDIO',
    'STREETWEAR ATELIER',
    'EXCLUSIVE DROP',
    'WEAR QUIET',
    'LEAVE AN IMPRESSION',
  ];

  return (
    <section className="w-full bg-black border-t border-b border-border-custom py-8 overflow-hidden select-none">
      <div className="animate-marquee whitespace-nowrap flex gap-12 items-center">
        {Array(4)
          .fill(marqueeItems)
          .flat()
          .map((item, idx) => (
            <span
              key={idx}
              className={`font-display font-black text-2xl md:text-5xl tracking-tighter uppercase flex items-center gap-12 ${
                idx % 2 === 0
                  ? 'text-white'
                  : 'text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)]'
              }`}
            >
              <span>{item}</span>
              <span className="text-[12px] text-white/40 font-mono tracking-widest font-bold">★</span>
            </span>
          ))}
      </div>
    </section>
  );
}
