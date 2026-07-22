'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, ArrowRight, ShieldCheck } from 'lucide-react';
import configData from '@/data/config.json';

export default function WhatsappConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Show tool-tip after 4 seconds
    const tooltipTimer = setTimeout(() => {
      if (!isOpen) {
        setShowTooltip(true);
      }
    }, 4000);

    // Hide tool-tip automatically after 9 seconds
    const hideTooltipTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 9000);

    return () => {
      clearTimeout(tooltipTimer);
      clearTimeout(hideTooltipTimer);
    };
  }, [isOpen]);

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowTooltip(false);
    setIsTyping(true);
  };

  // Simulate concierge typing for realistic effect
  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isTyping]);

  const handleRedirect = () => {
    const phoneNumber = configData.whatsapp.phoneNumber;
    const text = "Hi Solace! I have a question about your collections.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* Dynamic welcome tooltip on load */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="mb-3 px-4 py-2.5 bg-black border border-border-custom text-white shadow-2xl rounded-none flex items-center gap-3 pointer-events-auto max-w-xs cursor-pointer select-none"
            onClick={handleOpenChat}
          >
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </div>
            <span className="text-[10px] font-mono tracking-widest uppercase">
              CONCIERGE REPRESENTATIVE ACTIVE
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Concierge Dialog Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-card border border-border-custom w-[310px] sm:w-[340px] shadow-2xl p-5 mb-4 rounded-none flex flex-col space-y-4 pointer-events-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b border-border-custom pb-3">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full border border-border-custom bg-black flex items-center justify-center font-display font-black text-xs text-white">
                    S
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-card" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-white tracking-wide uppercase">SOLACE CONCIERGE</span>
                  <span className="text-[8px] font-mono text-emerald-400 tracking-widest uppercase">ATELIER DIRECT</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-text-secondary hover:text-white p-1 hover:bg-neutral-900 transition-colors"
                aria-label="Close concierge panel"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="space-y-3 min-h-[80px]">
              {isTyping ? (
                /* Typing Indicator */
                <div className="flex gap-1.5 items-center py-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              ) : (
                /* Dialogue Bubble */
                <div className="space-y-3">
                  <div className="bg-neutral-900 border border-border-custom p-3.5 text-xs text-white uppercase tracking-wider font-light leading-relaxed">
                    {configData.whatsapp.chatWidgetWelcome}
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] text-text-secondary font-mono tracking-widest uppercase">
                    <ShieldCheck size={12} className="text-emerald-500" />
                    SECURE ENCRYPTED WHATSAPP ROUTE
                  </div>
                </div>
              )}
            </div>

            {/* CTA Action */}
            {!isTyping && (
              <button
                onClick={handleRedirect}
                className="w-full py-3 bg-white text-black font-display font-bold uppercase tracking-widest text-[10px] hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
              >
                CONNECT ON WHATSAPP <ArrowRight size={12} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <button
        onClick={isOpen ? () => setIsOpen(false) : handleOpenChat}
        className="h-14 w-14 rounded-full bg-white text-black hover:bg-neutral-200 transition-all duration-300 shadow-2xl flex items-center justify-center pointer-events-auto border border-white hover:scale-105 active:scale-95 group/btn"
        aria-label="Toggle whatsapp chat support"
      >
        {isOpen ? (
          <X size={20} className="transition-transform duration-500 ease-out group-hover/btn:rotate-90" />
        ) : (
          <div className="relative">
            <MessageSquare size={20} />
            {/* Glowing active notification indicator badge */}
            <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
          </div>
        )}
      </button>

    </div>
  );
}
