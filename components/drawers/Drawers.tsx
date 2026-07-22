'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/hooks/use-cart-store';
import { X, Trash2, Plus, Minus, Heart, ShoppingBag, ArrowRight, Search as SearchIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import ProductImage from '@/components/product-image/ProductImage';
import configData from '@/data/config.json';
import { useProducts } from '@/hooks/use-products';
import { Product } from '@/types';

// Zod Login Schema
const loginSchema = z.object({
  email: z.string().nonempty('Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Drawers() {
  const {
    cart,
    wishlist,
    isCartOpen,
    isWishlistOpen,
    isSearchOpen,
    isAccountOpen,
    setCartOpen,
    setWishlistOpen,
    setSearchOpen,
    setAccountOpen,
    removeFromCart,
    updateQuantity,
    addToCart,
    toggleWishlist,
    clearCart,
  } = useStore();

  const { products } = useProducts();

  // Search local state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  // Sync search query to filter products
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults(products);
    } else {
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    }
  }, [searchQuery, products]);

  // Account local login mock state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onLoginSubmit = (data: LoginForm) => {
    setIsLoggedIn(true);
    setUserEmail(data.email);
    reset();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
  };

  // Cart math
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const handleCartCheckout = () => {
    const defaultPhone = configData.whatsapp.phoneNumber;
    const cartItemsText = cart.map(item => `- ${item.quantity}x ${item.product.name} (Size: ${item.selectedSize}) - $${(item.product.price * item.quantity).toFixed(2)}`).join('\n');
    const text = configData.whatsapp.prefilledTextCart
      .replace('{cartItems}', cartItemsText)
      .replace('{total}', cartSubtotal.toFixed(2));
      
    window.open(`https://wa.me/${defaultPhone}?text=${encodeURIComponent(text)}`, '_blank');
    clearCart();
    setCartOpen(false);
  };

  const handleWishlistInquire = () => {
    const defaultPhone = configData.whatsapp.phoneNumber;
    const wishlistItemsText = wishlist.map(item => `- ${item.name} ($${item.price})`).join('\n');
    const text = configData.whatsapp.prefilledTextWishlist
      .replace('{wishlistItems}', wishlistItemsText);
      
    window.open(`https://wa.me/${defaultPhone}?text=${encodeURIComponent(text)}`, '_blank');
    setWishlistOpen(false);
  };

  // Common Backdrops & Containers
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const drawerVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
    exit: { x: '100%' },
  };

  const searchOverlayVariants = {
    hidden: { y: '-100%' },
    visible: { y: 0 },
    exit: { y: '-100%' },
  };

  return (
    <>
      <AnimatePresence>
        {/* ================= CART DRAWER ================= */}
        {isCartOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-xs"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={() => setCartOpen(false)}
            />
            <motion.div
              className="relative w-full max-w-md h-full bg-card border-l border-border-custom flex flex-col z-10"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: 'tween', duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-border-custom flex items-center justify-between">
                <span className="font-display font-semibold tracking-widest text-lg uppercase flex items-center gap-3">
                  <ShoppingBag size={18} />
                  Cart ({cart.reduce((a, c) => a + c.quantity, 0)})
                </span>
                <button
                  onClick={() => setCartOpen(false)}
                  className="text-text-secondary hover:text-white p-2 hover:bg-neutral-900 transition-all duration-300"
                  aria-label="Close cart"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <span className="text-text-secondary uppercase tracking-widest text-xs">Your cart is empty</span>
                    <button
                      onClick={() => {
                        setCartOpen(false);
                      }}
                      className="px-6 py-3 bg-white text-black font-display font-bold uppercase tracking-wider text-xs hover:bg-neutral-200 transition-colors"
                    >
                      Shop New Drops
                    </button>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}-${idx}`}
                      className="flex gap-4 border-b border-border-custom pb-6 last:border-0"
                    >
                      <div className="relative w-20 h-24 overflow-hidden shrink-0">
                        <ProductImage
                          src={item.product.images[0]}
                          alt={item.product.name}
                          aspectRatioClassName="aspect-[5/6]"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-display font-semibold tracking-wider text-xs uppercase pr-4">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                              className="text-text-secondary hover:text-white transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <span className="text-[10px] text-text-secondary tracking-widest uppercase block mt-1">
                            Size: {item.selectedSize}
                          </span>
                        </div>

                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border border-border-custom">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                              className="px-2 py-1 text-text-secondary hover:text-white transition-colors hover:bg-neutral-900"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="px-3 text-xs font-mono">{item.quantity}</span>
                            <button
                              onClick={() => addToCart(item.product, item.selectedSize, 1)}
                              className="px-2 py-1 text-text-secondary hover:text-white transition-colors hover:bg-neutral-900"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="font-mono text-xs font-semibold">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-border-custom bg-black/60 space-y-4">
                  <div className="flex justify-between items-center text-sm font-semibold uppercase tracking-wider">
                    <span>Subtotal</span>
                    <span className="font-mono">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <p className="text-[10px] text-text-secondary uppercase tracking-wider">
                    Garments will be customized and confirmed via WhatsApp.
                  </p>
                  <button
                    onClick={handleCartCheckout}
                    className="w-full py-4 bg-white text-black font-display font-bold uppercase tracking-widest text-xs hover:bg-neutral-200 transition-colors flex items-center justify-center gap-3"
                  >
                    Send Order via WhatsApp
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* ================= WISHLIST DRAWER ================= */}
        {isWishlistOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-xs"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={() => setWishlistOpen(false)}
            />
            <motion.div
              className="relative w-full max-w-md h-full bg-card border-l border-border-custom flex flex-col z-10"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: 'tween', duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="p-6 border-b border-border-custom flex items-center justify-between">
                <span className="font-display font-semibold tracking-widest text-lg uppercase flex items-center gap-3">
                  <Heart size={18} />
                  Wishlist ({wishlist.length})
                </span>
                <button
                  onClick={() => setWishlistOpen(false)}
                  className="text-text-secondary hover:text-white p-2 hover:bg-neutral-900 transition-all duration-300"
                  aria-label="Close wishlist"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {wishlist.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <span className="text-text-secondary uppercase tracking-widest text-xs">Your wishlist is empty</span>
                    <button
                      onClick={() => setWishlistOpen(false)}
                      className="px-6 py-3 bg-white text-black font-display font-bold uppercase tracking-wider text-xs hover:bg-neutral-200 transition-colors"
                    >
                      Browse Catalog
                    </button>
                  </div>
                ) : (
                  wishlist.map((product) => (
                    <div key={product.id} className="flex gap-4 border-b border-border-custom pb-6 last:border-0">
                      <div className="relative w-20 h-24 overflow-hidden shrink-0">
                        <ProductImage
                          src={product.images[0]}
                          alt={product.name}
                          aspectRatioClassName="aspect-[5/6]"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-display font-semibold tracking-wider text-xs uppercase">
                              {product.name}
                            </h4>
                            <button
                              onClick={() => toggleWishlist(product)}
                              className="text-text-secondary hover:text-white transition-colors"
                              aria-label="Remove wishlist"
                            >
                              <X size={14} />
                            </button>
                          </div>
                          <span className="text-xs font-mono font-semibold block mt-1">${product.price}</span>
                        </div>
                        <button
                          onClick={() => {
                            addToCart(product, product.sizes[0], 1);
                          }}
                          className="w-full mt-2 py-2 bg-neutral-900 border border-border-custom text-white font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                        >
                          Quick Add ({product.sizes[0]})
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Wishlist Drawer Footer */}
              {wishlist.length > 0 && (
                <div className="p-6 border-t border-border-custom bg-black/60 space-y-4">
                  <p className="text-[10px] text-text-secondary uppercase tracking-wider">
                    Inquire about the availability of all your wishlisted items.
                  </p>
                  <button
                    onClick={handleWishlistInquire}
                    className="w-full py-4 bg-white text-black font-display font-bold uppercase tracking-widest text-xs hover:bg-neutral-200 transition-colors flex items-center justify-center gap-3"
                  >
                    Inquire via WhatsApp
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* ================= SEARCH OVERLAY ================= */}
        {isSearchOpen && (
          <div className="fixed inset-0 z-[100] flex flex-col">
            <motion.div
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={() => setSearchOpen(false)}
            />
            <motion.div
              className="relative w-full bg-black border-b border-border-custom flex flex-col z-10 max-h-[85vh] overflow-y-auto"
              variants={searchOverlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: 'tween', duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="p-6 md:px-12 max-w-6xl mx-auto w-full">
                <div className="flex items-center justify-between border-b border-border-custom py-4">
                  <div className="flex items-center gap-4 flex-1">
                    <SearchIcon className="text-text-secondary" size={24} />
                    <input
                      type="text"
                      placeholder="SEARCH SOLACE CATALOG..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent text-white font-display text-xl md:text-3xl tracking-widest font-bold border-none outline-hidden w-full focus:ring-0 uppercase placeholder-neutral-800"
                      autoFocus
                    />
                  </div>
                  <button
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="text-text-secondary hover:text-white p-2 hover:bg-neutral-950 transition-colors"
                  >
                    <X size={28} />
                  </button>
                </div>

                {/* Popular Keywords */}
                <div className="flex gap-2 items-center mt-6 text-xs uppercase tracking-widest text-text-secondary flex-wrap">
                  <span className="text-[10px]">Trending:</span>
                  {['Hoodie', 'Clogs', 'Accessories', 'Runner'].map((kw) => (
                    <button
                      key={kw}
                      onClick={() => setSearchQuery(kw)}
                      className="px-3 py-1 border border-border-custom text-text-secondary hover:text-white hover:border-white transition-colors"
                    >
                      {kw}
                    </button>
                  ))}
                </div>

                {/* Search Results Grid */}
                <div className="mt-12 mb-8">
                  <h3 className="font-display text-xs uppercase tracking-widest text-text-secondary mb-6">
                    {searchQuery ? `Search results for "${searchQuery}" (${searchResults.length})` : 'Catalog Preview'}
                  </h3>
                  {searchResults.length === 0 ? (
                    <p className="text-text-secondary text-sm font-light">No products found matching your search.</p>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {searchResults.map((product) => (
                        <div
                          key={product.id}
                          className="group relative flex flex-col bg-card border border-border-custom p-4 hover:border-white transition-all duration-300"
                        >
                          <Link
                            href={`/product/${product.slug}`}
                            onClick={() => setSearchOpen(false)}
                            className="relative aspect-3/4 w-full bg-neutral-950 overflow-hidden"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </Link>
                          <span className="text-[10px] text-text-secondary uppercase tracking-widest mt-4">
                            {product.category}
                          </span>
                          <h4 className="font-display font-bold text-xs tracking-wider uppercase mt-1">
                            {product.name}
                          </h4>
                          <span className="font-mono text-xs mt-1 font-semibold">${product.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* ================= ACCOUNT DRAWER ================= */}
        {isAccountOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-xs"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={() => setAccountOpen(false)}
            />
            <motion.div
              className="relative w-full max-w-md h-full bg-card border-l border-border-custom flex flex-col z-10 p-6 md:p-8"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: 'tween', duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="flex justify-between items-center mb-10 border-b border-border-custom pb-6">
                <span className="font-display font-semibold tracking-widest text-lg uppercase">
                  {isLoggedIn ? 'User Profile' : 'Access Account'}
                </span>
                <button
                  onClick={() => setAccountOpen(false)}
                  className="text-text-secondary hover:text-white p-2 hover:bg-neutral-900 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                {isLoggedIn ? (
                  /* Logged In Dashboard Dashboard */
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <p className="text-[10px] text-text-secondary uppercase tracking-widest">Active Member</p>
                      <h3 className="font-display font-semibold text-lg break-all text-white">{userEmail}</h3>
                      <p className="text-xs text-text-secondary uppercase tracking-widest">LOYALTY LEVEL: SOLACE ICON</p>
                    </div>

                    <div className="border border-border-custom p-6 space-y-4 bg-black">
                      <h4 className="font-display text-xs uppercase tracking-widest font-bold">Recent Orders</h4>
                      <div className="border-t border-border-custom pt-4 space-y-2">
                        <div className="flex justify-between text-[11px] font-mono text-text-secondary">
                          <span>ORDER #SOLACE-3490</span>
                          <span>Delivered</span>
                        </div>
                        <div className="flex justify-between text-xs font-semibold">
                          <span>1x SOLACE CROSS HOODIE (L)</span>
                          <span>$280.00</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs uppercase tracking-widest text-text-secondary">
                      <Link href="/catalog" onClick={() => setAccountOpen(false)} className="block py-2 border-b border-border-custom hover:text-white transition-colors">
                        Order History
                      </Link>
                      <button className="w-full text-left py-2 border-b border-border-custom hover:text-white transition-colors">
                        Saved Addresses
                      </button>
                      <button className="w-full text-left py-2 border-b border-border-custom hover:text-white transition-colors">
                        Payment Methods
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Login Zod Form */
                  <form onSubmit={handleSubmit(onLoginSubmit)} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold tracking-widest uppercase text-text-secondary block">
                        EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        {...register('email')}
                        className="w-full bg-black border border-border-custom p-4 text-xs font-mono text-white tracking-wide uppercase focus:border-white focus:outline-hidden transition-all duration-300"
                        placeholder="ENTER YOUR EMAIL"
                      />
                      {errors.email && (
                        <p className="text-[10px] text-red-500 font-semibold tracking-wider">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold tracking-widest uppercase text-text-secondary block">
                        PASSWORD
                      </label>
                      <input
                        type="password"
                        {...register('password')}
                        className="w-full bg-black border border-border-custom p-4 text-xs text-white tracking-wide focus:border-white focus:outline-hidden transition-all duration-300"
                        placeholder="ENTER YOUR PASSWORD"
                      />
                      {errors.password && (
                        <p className="text-[10px] text-red-500 font-semibold tracking-wider">
                          {errors.password.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-white text-black font-display font-bold uppercase tracking-widest text-xs hover:bg-neutral-200 transition-colors mt-4"
                    >
                      Authenticate
                    </button>
                  </form>
                )}

                {isLoggedIn && (
                  <button
                    onClick={handleLogout}
                    className="w-full py-4 bg-black border border-border-custom text-white font-display font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors"
                  >
                    Logout
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
