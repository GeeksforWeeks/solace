'use client';

import React from 'react';
import Link from 'next/link';
import Logo from '@/components/logo/Logo';
import configData from '@/data/config.json';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const brandSlogan = 'Wear Quiet. Leave an Impression.';

  const linksNavigation = [
    { name: 'Home', path: '/' },
    { name: 'Catalog', path: '/catalog' },
    { name: 'Archival About', path: '#about' },
    { name: 'Atelier Contact', path: '#contact' },
  ];

  const whatsappUrl = `https://wa.me/${configData.whatsapp.phoneNumber}?text=${encodeURIComponent("Hi Solace Concierge! I have a support inquiry.")}`;

  const linksSupport = [
    { name: 'Customer Care', path: whatsappUrl },
    { name: 'Sizing Matrix', path: '#' },
    { name: 'Returns & Exchange', path: '#' },
    { name: 'Global Shipping', path: '#' },
  ];

  const linksSocial = [
    { name: 'Instagram', path: 'https://instagram.com' },
    { name: 'Twitter / X', path: 'https://twitter.com' },
    { name: 'Pinterest', path: 'https://pinterest.com' },
    { name: 'Atelier TikTok', path: 'https://tiktok.com' },
  ];

  return (
    <footer className="bg-black border-t border-border-custom px-6 md:px-12 py-20 text-white">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          
          {/* Column 1: Brand & Slogan */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Logo iconOnly={false} size={28} />
            <p className="text-text-secondary text-[10px] uppercase tracking-widest leading-relaxed max-w-[200px] mt-2">
              {brandSlogan}
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-4">
            <span className="text-[10px] text-text-secondary uppercase tracking-[0.25em] font-bold block border-b border-border-custom/50 pb-2">
              RUNWAY MAP
            </span>
            <ul className="space-y-2">
              {linksNavigation.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-text-secondary hover:text-white transition-colors duration-300 text-xs uppercase tracking-wider block py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="space-y-4">
            <span className="text-[10px] text-text-secondary uppercase tracking-[0.25em] font-bold block border-b border-border-custom/50 pb-2">
              ATELIER SERVICE
            </span>
            <ul className="space-y-2">
              {linksSupport.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-text-secondary hover:text-white transition-colors duration-300 text-xs uppercase tracking-wider block py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Socials */}
          <div className="space-y-4">
            <span className="text-[10px] text-text-secondary uppercase tracking-[0.25em] font-bold block border-b border-border-custom/50 pb-2">
              COMMUNITY CONNECT
            </span>
            <ul className="space-y-2">
              {linksSocial.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-white transition-colors duration-300 text-xs uppercase tracking-wider block py-1"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer Sub-bottom details */}
        <div className="border-t border-border-custom pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-text-secondary tracking-widest uppercase">
          <div className="flex gap-6 items-center flex-wrap">
            <span>© {currentYear} SOLACE STUDIO INC.</span>
            <span className="hidden md:inline">|</span>
            <Link href="#" className="hover:text-white transition-colors">Privacy Charter</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Atelier</Link>
          </div>
          <div>
            <span>DESIGNED BY geeks4weeks</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
