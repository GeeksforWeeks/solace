'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'view' | 'drag' | 'close'>('default');
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 35, stiffness: 450, mass: 0.3 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Hide standard cursor
    document.body.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [cursorX, cursorY, isVisible]);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const closestLink = target.closest('a, button, [role="button"], input, select, textarea');
      const cursorText = target.closest('[data-cursor]');

      if (cursorText) {
        const type = cursorText.getAttribute('data-cursor');
        if (type === 'view') {
          setCursorType('view');
        } else if (type === 'drag') {
          setCursorType('drag');
        } else if (type === 'close') {
          setCursorType('close');
        }
      } else if (closestLink) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  const variants = {
    default: {
      width: 6,
      height: 6,
      backgroundColor: '#FFFFFF',
      borderRadius: '50%',
    },
    pointer: {
      width: 40,
      height: 40,
      backgroundColor: 'transparent',
      border: '1px solid #FFFFFF',
      borderRadius: '50%',
    },
    view: {
      width: 72,
      height: 72,
      backgroundColor: '#F5F5F5',
      borderRadius: '50%',
      color: '#000000',
    },
    drag: {
      width: 72,
      height: 72,
      backgroundColor: '#0E0E0E',
      border: '1px solid #1A1A1A',
      borderRadius: '50%',
      color: '#FFFFFF',
    },
    close: {
      width: 40,
      height: 40,
      backgroundColor: '#FFFFFF',
      borderRadius: '50%',
      color: '#000000',
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-9999 flex items-center justify-center text-[10px] font-bold tracking-widest uppercase select-none mix-blend-difference lg:flex"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={cursorType}
      variants={variants}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      {cursorType === 'view' && <span className="text-black font-display font-semibold text-[11px] tracking-wider leading-none">VIEW</span>}
      {cursorType === 'drag' && <span className="text-white font-display font-semibold text-[11px] tracking-wider leading-none">DRAG</span>}
      {cursorType === 'close' && <span className="text-black font-semibold text-[10px] leading-none">✕</span>}
    </motion.div>
  );
}
