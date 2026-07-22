'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: number;
}

export default function Logo({ className = '', iconOnly = false, size = 32 }: LogoProps) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-3 select-none hover:opacity-85 transition-opacity group ${className}`}
    >
      {/* Geometric brand emblem */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white transition-transform duration-700 ease-out group-hover:rotate-90"
      >
        <path d="M50 10V90" stroke="currentColor" strokeWidth="6" strokeLinecap="square" />
        <path d="M10 50H90" stroke="currentColor" strokeWidth="6" strokeLinecap="square" />
        <rect x="30" y="30" width="40" height="40" stroke="currentColor" strokeWidth="4" fill="black" />
        <circle cx="50" cy="50" r="4" fill="currentColor" />
      </svg>

      {!iconOnly && (
        <div className="flex flex-col items-start leading-none">
          <span className="font-display font-black text-lg md:text-xl tracking-[0.25em] text-white">
            SOLACE
          </span>
          <span className="text-[8px] font-mono tracking-[0.4em] text-neutral-500 mt-0.5 uppercase">
            ATELIER
          </span>
        </div>
      )}
    </Link>
  );
}
