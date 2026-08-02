'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Ruler } from 'lucide-react';
import { useStore } from '@/hooks/use-cart-store';

type TabType = 'outerwear' | 'footwear' | 'accessories';

export default function SizeMatrixModal() {
  const { isSizeMatrixOpen, setSizeMatrixOpen } = useStore();
  const [activeTab, setActiveTab] = useState<TabType>('outerwear');

  // Sizing calculator state
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [calcResult, setCalcResult] = useState<string | null>(null);

  if (!isSizeMatrixOpen) return null;

  // Sizing calculation logic
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (isNaN(h) || isNaN(w)) {
      setCalcResult('Please enter valid measurements.');
      return;
    }

    if (activeTab === 'outerwear') {
      // Sizing guidelines based on height/weight for oversized streetwear hoodies
      if (h < 165) {
        setCalcResult(w > 65 ? 'Size M (for comfortable drape)' : 'Size S (for ideal cropped fit)');
      } else if (h >= 165 && h < 176) {
        setCalcResult(w > 75 ? 'Size L (oversized)' : 'Size M (relaxed streetwear silhouette)');
      } else if (h >= 176 && h < 186) {
        setCalcResult(w > 85 ? 'Size XL (heavy drape)' : 'Size L (balanced oversized fit)');
      } else {
        setCalcResult('Size XL (essential luxury silhouette)');
      }
    } else if (activeTab === 'footwear') {
      setCalcResult('We recommend ordering your standard US/EU size. If you are in-between, size down.');
    } else {
      setCalcResult('Rings: Measure your finger circumference. Ring sets include S (US 8), M (US 9.5), L (US 11).');
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 20 },
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={() => setSizeMatrixOpen(false)}
        />

        {/* Modal Container */}
        <motion.div
          className="relative bg-card border border-border-custom w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10 flex flex-col p-6 md:p-8"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: 'spring', duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b border-border-custom pb-4 mb-6">
            <span className="font-display font-semibold tracking-widest text-base uppercase flex items-center gap-2">
              <Ruler size={16} />
               Sizing Matrix
            </span>
            <button
              onClick={() => {
                setSizeMatrixOpen(false);
                setCalcResult(null);
                setHeight('');
                setWeight('');
              }}
              className="text-text-secondary hover:text-white p-2 hover:bg-neutral-900 transition-colors"
              aria-label="Close size matrix"
            >
              <X size={18} />
            </button>
          </div>

          {/* Sizing Tabs */}
          <div className="flex border-b border-border-custom text-[10px] font-bold tracking-widest uppercase mb-6">
            {(['outerwear', 'footwear', 'accessories'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setCalcResult(null);
                }}
                className={`flex-1 py-3 text-center border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-white text-white'
                    : 'border-transparent text-text-secondary hover:text-white'
                }`}
              >
                {tab === 'outerwear' ? 'Outerwear (Tops)' : tab === 'footwear' ? 'Footwear' : 'Accessories'}
              </button>
            ))}
          </div>

          {/* Tab Content & Tables */}
          <div className="space-y-6 flex-1">
            {activeTab === 'outerwear' && (
              <div className="space-y-4">
                <p className="text-[11px] text-text-secondary uppercase tracking-wider leading-relaxed">
                  All hoodies and sweatshirts feature dropped shoulders, a cropped waist, and heavy 460gsm cotton loopback fabric. Fit is naturally oversized.
                </p>
                <div className="overflow-x-auto border border-border-custom">
                  <table className="w-full text-left border-collapse text-[10px] font-mono">
                    <thead>
                      <tr className="bg-neutral-950 border-b border-border-custom text-text-secondary uppercase tracking-widest">
                        <th className="p-3">Size</th>
                        <th className="p-3">Chest (in)</th>
                        <th className="p-3">Shoulder (in)</th>
                        <th className="p-3">Length (in)</th>
                        <th className="p-3">Sleeve (in)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-custom text-white">
                      <tr>
                        <td className="p-3 font-bold">S</td>
                        <td className="p-3">25.0</td>
                        <td className="p-3">26.5</td>
                        <td className="p-3">25.5</td>
                        <td className="p-3">22.0</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold">M</td>
                        <td className="p-3">26.5</td>
                        <td className="p-3">27.5</td>
                        <td className="p-3">26.5</td>
                        <td className="p-3">22.5</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold">L</td>
                        <td className="p-3">28.0</td>
                        <td className="p-3">28.5</td>
                        <td className="p-3">27.5</td>
                        <td className="p-3">23.0</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold">XL</td>
                        <td className="p-3">29.5</td>
                        <td className="p-3">29.5</td>
                        <td className="p-3">28.5</td>
                        <td className="p-3">23.5</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'footwear' && (
              <div className="space-y-4">
                <p className="text-[11px] text-text-secondary uppercase tracking-wider leading-relaxed">
                  Footwear models (Runners & Clogs) are engineered for comfort and impact presence.
                </p>
                <div className="overflow-x-auto border border-border-custom">
                  <table className="w-full text-left border-collapse text-[10px] font-mono">
                    <thead>
                      <tr className="bg-neutral-950 border-b border-border-custom text-text-secondary uppercase tracking-widest">
                        <th className="p-3">EU Size</th>
                        <th className="p-3">US Men&apos;s</th>
                        <th className="p-3">US Women&apos;s</th>
                        <th className="p-3">Insole (cm)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-custom text-white">
                      <tr>
                        <td className="p-3 font-bold">40</td>
                        <td className="p-3">7.0</td>
                        <td className="p-3">8.5</td>
                        <td className="p-3">26.0</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold">41</td>
                        <td className="p-3">8.0</td>
                        <td className="p-3">9.5</td>
                        <td className="p-3">26.7</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold">42</td>
                        <td className="p-3">9.0</td>
                        <td className="p-3">10.5</td>
                        <td className="p-3">27.3</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold">43</td>
                        <td className="p-3">10.0</td>
                        <td className="p-3">11.5</td>
                        <td className="p-3">28.0</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold">44</td>
                        <td className="p-3">11.0</td>
                        <td className="p-3">12.5</td>
                        <td className="p-3">28.7</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'accessories' && (
              <div className="space-y-4">
                <p className="text-[11px] text-text-secondary uppercase tracking-wider leading-relaxed">
                  Antiqued ring sets and custom jewelry dimensions.
                </p>
                <div className="overflow-x-auto border border-border-custom">
                  <table className="w-full text-left border-collapse text-[10px] font-mono">
                    <thead>
                      <tr className="bg-neutral-950 border-b border-border-custom text-text-secondary uppercase tracking-widest">
                        <th className="p-3">Solace Size</th>
                        <th className="p-3">US Ring Size</th>
                        <th className="p-3">Inside Circumference (mm)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-custom text-white">
                      <tr>
                        <td className="p-3 font-bold">S</td>
                        <td className="p-3">8.0</td>
                        <td className="p-3">57.2</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold">M</td>
                        <td className="p-3">9.5</td>
                        <td className="p-3">61.0</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold">L</td>
                        <td className="p-3">11.0</td>
                        <td className="p-3">64.6</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Sizing Recommendation Tool */}
            <div className="border-t border-border-custom pt-6 mt-6 bg-black/40 p-4 border rounded-none">
              <span className="text-[10px] text-text-secondary uppercase tracking-[0.2em] font-bold block mb-4 flex items-center gap-1.5">
                <Sparkles size={12} className="text-white animate-pulse" />
                Silhouette Match Calculator
              </span>

              <form onSubmit={handleCalculate} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <div className="space-y-2">
                  <label className="text-[9px] font-mono text-text-secondary block uppercase">
                    Your Height (cm)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 175"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full bg-black border border-border-custom p-2.5 text-xs text-white outline-hidden focus:border-white transition-all uppercase font-mono"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-mono text-text-secondary block uppercase">
                    Your Weight (kg)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 70"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full bg-black border border-border-custom p-2.5 text-xs text-white outline-hidden focus:border-white transition-all uppercase font-mono"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-white text-black font-display font-bold uppercase tracking-widest text-[10px] hover:bg-neutral-200 transition-colors"
                >
                  Match Fit
                </button>
              </form>

              {/* Calculator Output */}
              <AnimatePresence>
                {calcResult && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-3 bg-neutral-900 border border-border-custom text-xs font-mono uppercase text-white flex flex-col gap-1"
                  >
                    <span className="text-[9px] text-text-secondary font-sans font-bold tracking-wider">
                      RECOMMENDED SPECIFICATION:
                    </span>
                    <span className="font-semibold text-white tracking-wide">{calcResult}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
