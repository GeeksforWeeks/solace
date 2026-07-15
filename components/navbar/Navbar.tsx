'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/hooks/use-cart-store';
import { Search, User, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const {
    cart,
    wishlist,
    setCartOpen,
    setWishlistOpen,
    setSearchOpen,
    setAccountOpen,
    isMobileMenuOpen,
    setMobileMenuOpen,
  } = useStore();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Catalog', path: '/catalog' },
    { name: 'About', path: '#about' },
    { name: 'Contact', path: '#contact' },
  ];

  return (
    <>
      {/* Announcement Marquee Bar */}
      <div className="w-full bg-white text-black py-1.5 overflow-hidden border-b border-neutral-200 z-[90] relative text-[10px] font-bold tracking-widest uppercase">
        <div className="animate-marquee whitespace-nowrap flex gap-8">
          {Array(8)
            .fill('NEW ARRIVAL • LIMITED • SOLACE • STREETWEAR • EXCLUSIVE DROP • WEAR QUIET. LEAVE AN IMPRESSION')
            .map((text, i) => (
              <span key={i} className="mx-4">
                {text}
              </span>
            ))}
        </div>
      </div>

      {/* Floating Navbar */}
      <header
        className={`fixed top-7 left-0 w-full z-[80] transition-all duration-500 border-b ${
          isScrolled
            ? 'bg-black/90 border-border-custom backdrop-blur-md py-4'
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between relative">
          
          {/* Mobile Hamburger Trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden text-white hover:text-text-secondary transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          {/* Desktop Left Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`font-display text-xs uppercase tracking-widest text-text-secondary hover:text-white transition-all duration-300 relative py-1 ${
                  pathname === link.path ? 'text-white' : ''
                }`}
              >
                {link.name}
                {pathname === link.path && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-white"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Center Brand Wordmark */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link href="/" className="font-display font-black text-2xl md:text-3xl tracking-[0.3em] text-white select-none hover:opacity-85 transition-opacity">
              SOLACE
            </Link>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-4 md:gap-6">
            <button
              onClick={() => setSearchOpen(true)}
              className="text-white hover:text-text-secondary transition-colors p-1"
              aria-label="Search items"
            >
              <Search size={18} />
            </button>

            <button
              onClick={() => setAccountOpen(true)}
              className="hidden md:block text-white hover:text-text-secondary transition-colors p-1"
              aria-label="View account"
            >
              <User size={18} />
            </button>

            <button
              onClick={() => setWishlistOpen(true)}
              className="hidden md:block text-white hover:text-text-secondary transition-colors p-1 relative"
              aria-label="View wishlist"
            >
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-white text-black text-[8px] font-mono font-bold flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="text-white hover:text-text-secondary transition-colors p-1 relative"
              aria-label="View cart"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-white text-black text-[8px] font-mono font-bold flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              className="relative w-[300px] h-full bg-card border-r border-border-custom flex flex-col p-6 z-10"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            >
              <div className="flex justify-between items-center mb-12">
                <span className="font-display font-black text-xl tracking-[0.2em]">SOLACE</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-text-secondary hover:text-white"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <nav className="flex flex-col gap-6 text-sm font-display uppercase tracking-widest font-semibold">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="hover:text-text-secondary transition-colors py-2 border-b border-border-custom"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>

                <div className="space-y-4 border-t border-border-custom pt-6">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setAccountOpen(true);
                    }}
                    className="w-full py-3 bg-neutral-900 border border-border-custom text-white font-display text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
                  >
                    <User size={14} />
                    Account
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setWishlistOpen(true);
                    }}
                    className="w-full py-3 bg-neutral-900 border border-border-custom text-white font-display text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
                  >
                    <Heart size={14} />
                    Wishlist ({wishlistCount})
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
