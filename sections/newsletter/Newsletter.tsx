'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowRight, Check } from 'lucide-react';

const newsletterSchema = z.object({
  email: z.string().nonempty('Email is required').email('Invalid email address'),
});

type NewsletterForm = z.infer<typeof newsletterSchema>;

export default function Newsletter() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterForm>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = (data: NewsletterForm) => {
    setIsSubmitted(true);
    reset();
  };

  return (
    <section className="bg-black py-28 px-6 md:px-12 border-b border-border-custom flex items-center justify-center text-center">
      <div className="max-w-2xl w-full space-y-8">
        <div className="space-y-4">
          <span className="text-[10px] text-text-secondary uppercase tracking-[0.3em] font-semibold block">
            PRIVATE ACCESS
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tighter text-white">
            JOIN THE ATELIER
          </h2>
          <p className="text-text-secondary text-xs md:text-sm uppercase tracking-wider max-w-lg mx-auto leading-relaxed">
            Register to receive priority drop announcements, limited release keys, and archival collection insights.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 max-w-md mx-auto"
            >
              <div className="relative flex items-center border border-border-custom bg-card focus-within:border-white transition-colors duration-300">
                <input
                  type="email"
                  {...register('email')}
                  placeholder="ENTER YOUR EMAIL ADDRESS"
                  className="w-full bg-transparent px-5 py-4 text-xs font-mono text-white tracking-widest placeholder-neutral-700 outline-hidden uppercase border-none focus:ring-0"
                />
                <button
                  type="submit"
                  className="p-4 bg-white text-black hover:bg-neutral-200 transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
              {errors.email && (
                <p className="text-[10px] text-red-500 font-semibold tracking-widest text-left uppercase pl-2">
                  {errors.email.message}
                </p>
              )}
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="border border-border-custom bg-card p-8 max-w-md mx-auto space-y-4"
            >
              <div className="mx-auto w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
                <Check size={20} />
              </div>
              <h3 className="font-display font-bold text-xs uppercase tracking-[0.2em] text-white">
                COMMUNICATION GRANTED
              </h3>
              <p className="text-text-secondary text-[11px] uppercase tracking-wider leading-relaxed">
                Check your inbox. A cryptographic verification token and onboarding credentials have been transmitted.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
