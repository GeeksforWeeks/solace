'use client';

import React from 'react';
import Hero from '@/sections/hero/Hero';
import ProductsGrid from '@/sections/products-grid/ProductsGrid';
import InfiniteMarquee from '@/components/marquee/InfiniteMarquee';
import Mission from '@/sections/mission/Mission';
import Collections from '@/sections/collections/Collections';
import Featured from '@/sections/featured/Featured';
import Newsletter from '@/sections/newsletter/Newsletter';
import Footer from '@/sections/footer/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <ProductsGrid />
      <InfiniteMarquee />
      <Mission />
      <Collections />
      <Featured />
      <Newsletter />
      <Footer />
    </>
  );
}
