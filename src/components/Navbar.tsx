import React, { useState } from 'react';
import { PageId } from '../types';
import { STUDIO_INFO } from '../data/interiorData';
import { Phone, MapPin, Clock, Menu, X, ArrowUpRight, Sparkles, Instagram } from 'lucide-react';
import { BharatDecorLogo } from './BharatDecorLogo';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'products', label: 'Products' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E7E2D8] transition-all">
      {/* Top micro bar for quick trust & contact */}
      <div className="hidden md:block bg-[#1E2229] text-[#FAF9F6] text-xs py-2 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-normal">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-[#C5A880]">
              <MapPin className="w-3.5 h-3.5" />
              <span className="text-[#FAF9F6]/80">{STUDIO_INFO.location}</span>
            </span>
            <span className="flex items-center gap-1.5 text-[#C5A880]">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-[#FAF9F6]/80">{STUDIO_INFO.hours}</span>
            </span>
          </div>
          <div className="flex items-center space-x-5">
            <a
              href={STUDIO_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[#FAF9F6]/90 hover:text-[#C5A880] transition-colors"
              title="Follow Bharat Decor on Instagram"
            >
              <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
              <span>@bharatdecor_mrt</span>
            </a>
            <span className="text-white/20">|</span>
            <a
              href={`tel:${STUDIO_INFO.phone}`}
              className="flex items-center gap-1.5 hover:text-[#C5A880] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#C5A880]" />
              <span>Call Us: {STUDIO_INFO.phoneDisplay}</span>
            </a>
            <span className="text-white/20">|</span>
            <span className="text-[#C5A880] font-medium tracking-wide">Bespoke Turnkey Interiors</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Real Brand Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => handleLinkClick('home')}
            className="flex items-center text-left group focus:outline-none transition-transform hover:scale-[1.02] active:scale-[0.98]"
            aria-label="Bharat Decor Home"
          >
            <BharatDecorLogo className="h-10 sm:h-11" theme="light" />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-all rounded-md ${
                    isActive
                      ? 'text-[#1E2229] font-semibold bg-[#EDE8DE]'
                      : 'text-[#5C564E] hover:text-[#1E2229] hover:bg-[#F2EFE9]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#C5A880] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTA Button */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href={`tel:${STUDIO_INFO.phone}`}
              className="hidden xl:flex items-center gap-2 text-xs font-semibold px-3 py-2 text-[#1E2229] border border-[#D5CEBF] rounded-md hover:border-[#C5A880] hover:bg-white transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{STUDIO_INFO.phoneDisplay}</span>
            </a>
            <button
              id="header-book-consultation-btn"
              onClick={() => handleLinkClick('contact')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#1E2229] hover:bg-[#2A303A] border border-[#1E2229] rounded-md shadow-sm transition-all hover:shadow hover:-translate-y-0.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Book Consultation</span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-md text-[#1E2229] hover:bg-[#EDE8DE] transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E7E2D8] bg-[#FAF9F6] px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                id={`mobile-nav-link-${link.id}`}
                onClick={() => handleLinkClick(link.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-md text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-[#EDE8DE] text-[#1E2229] font-bold border-l-4 border-[#C5A880]'
                    : 'text-[#5C564E] hover:bg-[#F2EFE9] hover:text-[#1E2229]'
                }`}
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-[#8C8378]" />
              </button>
            );
          })}
          <div className="pt-4 border-t border-[#E7E2D8] space-y-2">
            <button
              id="mobile-book-consult-btn"
              onClick={() => handleLinkClick('contact')}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md text-sm font-semibold text-white bg-[#1E2229] hover:bg-[#2A303A] transition-colors shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#C5A880]" />
              <span>Book Free Consultation</span>
            </button>
            <a
              href={`tel:${STUDIO_INFO.phone}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-medium text-[#1E2229] border border-[#D5CEBF] bg-white hover:bg-[#FAF9F6] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#C5A880]" />
              <span>Direct Call: {STUDIO_INFO.phoneDisplay}</span>
            </a>
            <a
              href={STUDIO_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-xs font-semibold text-[#1E2229] border border-[#E0D7C8] bg-white hover:bg-[#FAF9F6] transition-colors"
            >
              <Instagram className="w-4 h-4 text-[#E1306C]" />
              <span>Follow @bharatdecor_mrt on Instagram</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
