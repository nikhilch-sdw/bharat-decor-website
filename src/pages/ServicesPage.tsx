import React, { useEffect, useState, useRef } from 'react';
import { PageId, ServiceItem } from '../types';
import { SERVICES_DATA, STUDIO_INFO, CATEGORIES_LIST } from '../data/interiorData';
import {
  Clock,
  ShieldCheck,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Layers,
  Palette,
  LayoutGrid,
  SunDim,
  Lightbulb,
  Compass,
  MessageCircle,
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
  onSelectServiceForInquiry: (serviceTitle: string) => void;
  targetServiceId?: string;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onSelectServiceForInquiry,
  targetServiceId,
}) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');

  // Horizontal scroll controls for category tabs
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (tabsContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsContainerRef.current;
      setCanScrollLeft(scrollLeft > 4);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = tabsContainerRef.current;
    if (el) el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollBy({
        left: direction === 'left' ? -220 : 220,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (targetServiceId) {
      const el = document.getElementById(`service-card-${targetServiceId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [targetServiceId]);

  const handleInquire = (serviceTitle: string) => {
    onSelectServiceForInquiry(serviceTitle);
    onNavigate('contact');
  };

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'wall-paneling-louvers':
        return <Layers className="w-4 h-4 text-[#C5A880]" />;
      case 'designer-wallpapers':
        return <Palette className="w-4 h-4 text-[#C5A880]" />;
      case 'modular-kitchens-wardrobes':
        return <LayoutGrid className="w-4 h-4 text-[#C5A880]" />;
      case 'curtains-blinds-window':
        return <SunDim className="w-4 h-4 text-[#C5A880]" />;
      case 'false-ceilings-lighting':
        return <Lightbulb className="w-4 h-4 text-[#C5A880]" />;
      case 'turnkey-renovation':
      default:
        return <Compass className="w-4 h-4 text-[#C5A880]" />;
    }
  };

  const displayedServices =
    activeCategoryFilter === 'All'
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.category === activeCategoryFilter);

  return (
    <div className="py-10 sm:py-14 space-y-10 sm:space-y-14 selection:bg-[#C5A880]/20">
      {/* ================= EDITORIAL HEADER ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#E5DEC7] pb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#8C6D47] font-bold block">
              Our Core Specializations
            </span>
            <div className="flex items-center gap-2 text-xs text-[#7A6F62] bg-[#FAF6EE] px-3.5 py-1.5 rounded-full border border-[#E5DEC7]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8C6D47]" />
              <span>10-Year Hardware Warranty • Meerut NCR</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E2229] leading-tight">
                Signature Interior Design Services
              </h1>
              <p className="text-sm sm:text-base text-[#5D554B] mt-2 max-w-xl leading-relaxed">
                Architectural planning, custom joinery, bespoke wall concepts, and turnkey fit-outs executed by master craftsmen in Meerut.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-5 text-xs font-semibold text-[#1E2229] shrink-0">
              <div>
                <span className="block text-xl font-bold font-serif-luxury text-[#8C6D47]">45 Days</span>
                <span className="text-[#7A6F62] text-[11px]">Handover</span>
              </div>
              <div className="h-7 w-px bg-[#E5DEC7]" />
              <div>
                <span className="block text-xl font-bold font-serif-luxury text-[#8C6D47]">10-Yr</span>
                <span className="text-[#7A6F62] text-[11px]">Warranty</span>
              </div>
              <div className="h-7 w-px bg-[#E5DEC7]" />
              <div>
                <span className="block text-xl font-bold font-serif-luxury text-[#8C6D47]">100%</span>
                <span className="text-[#7A6F62] text-[11px]">Factory Made</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORY FILTER TABS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          {/* Scroll Left Button */}
          <button
            type="button"
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll services left"
            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all border ${
              canScrollLeft
                ? 'bg-white hover:bg-[#1E2229] hover:text-white text-[#5D554B] border-[#D8CEBC] shadow-2xs cursor-pointer'
                : 'bg-[#F7F4EE] text-[#C4BBAF] border-[#E8DFC8] opacity-40 cursor-default'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Categories Track */}
          <div
            ref={tabsContainerRef}
            className="custom-horizontal-scrollbar flex-1 flex items-center gap-2 overflow-x-auto pb-2 pt-1 scroll-smooth"
          >
            <button
              id="services-cat-all"
              onClick={() => setActiveCategoryFilter('All')}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold tracking-wide shrink-0 transition-all cursor-pointer ${
                activeCategoryFilter === 'All'
                  ? 'bg-[#1E2229] text-white shadow-xs'
                  : 'bg-white text-[#5D554B] border border-[#E0D7C8] hover:border-[#C5A880] hover:text-[#1E2229]'
              }`}
            >
              All Services ({SERVICES_DATA.length})
            </button>
            {CATEGORIES_LIST.map((cat, cIdx) => {
              const isActive = activeCategoryFilter === cat;
              return (
                <button
                  key={cat}
                  id={`services-cat-btn-${cIdx}`}
                  onClick={() => setActiveCategoryFilter(cat)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold tracking-wide shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1E2229] text-white shadow-xs'
                      : 'bg-white text-[#5D554B] border border-[#E0D7C8] hover:border-[#C5A880] hover:text-[#1E2229]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Scroll Right Button */}
          <button
            type="button"
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            aria-label="Scroll services right"
            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all border ${
              canScrollRight
                ? 'bg-white hover:bg-[#1E2229] hover:text-white text-[#5D554B] border-[#D8CEBC] shadow-2xs cursor-pointer'
                : 'bg-[#F7F4EE] text-[#C4BBAF] border-[#E8DFC8] opacity-40 cursor-default'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ================= SERVICE CARDS (MATCHING INDEX PAGE) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {displayedServices.map((service, sIdx) => {
            const whatsAppServiceUrl = `https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodeURIComponent(
              service.whatsAppPrompt ||
                `Hello Bharat Decor, I would like to inquire about your "${service.title}" service in Meerut.`
            )}`;

            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className="group bg-white rounded-2xl overflow-hidden border border-[#E5DEC7] hover:border-[#C5A880] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                {/* Visual Architectural Frame with Scrim & Icons */}
                <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-[#EDE8DE]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16191E]/85 via-[#16191E]/25 to-transparent pointer-events-none" />

                  {/* Top Bar: Index Badge and Specialty Icon */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                    <span className="bg-[#1E2229]/85 backdrop-blur-md text-[#C5A880] border border-[#C5A880]/30 text-[10px] font-mono tracking-widest px-3 py-1 rounded-full uppercase">
                      0{sIdx + 1} • Craft
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/25 flex items-center justify-center shadow-sm">
                      {getServiceIcon(service.id)}
                    </div>
                  </div>

                  {/* Bottom Tags on Image Overlay */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white">
                    <span className="text-[11px] font-semibold tracking-wide text-white/95 bg-[#1E2229]/70 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-white/10">
                      {service.category}
                    </span>
                    <span className="text-[11px] font-semibold text-[#C5A880] flex items-center gap-1 bg-[#1E2229]/80 backdrop-blur-md px-2.5 py-0.5 rounded-md">
                      <Clock className="w-3 h-3" />
                      <span>{service.turnaroundTime}</span>
                    </span>
                  </div>
                </div>

                {/* Minimal Card Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3
                      onClick={() => handleInquire(service.title)}
                      className="font-serif-luxury text-xl font-bold text-[#1E2229] group-hover:text-[#8A6D47] transition-colors cursor-pointer line-clamp-1"
                    >
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#6B6357] mt-1.5 line-clamp-1 font-medium">
                      {service.subtitle}
                    </p>
                  </div>

                  {/* Distinct Modern Interactive Footer Bar */}
                  <div className="pt-3.5 border-t border-[#F0EBE0] flex items-center gap-2">
                    <button
                      id={`service-btn-${service.id}`}
                      onClick={() => handleInquire(service.title)}
                      className="flex-1 inline-flex items-center justify-between py-2.5 px-3.5 rounded-xl bg-[#FAF8F5] group-hover:bg-[#1E2229] border border-[#E2DAD0] group-hover:border-[#1E2229] text-[#1E2229] group-hover:text-white transition-all text-xs font-semibold cursor-pointer"
                    >
                      <span>Book Consultation</span>
                      <div className="w-6 h-6 rounded-full bg-[#EDE7DB] group-hover:bg-[#C5A880] text-[#1E2229] flex items-center justify-center transition-colors">
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </button>

                    <a
                      href={whatsAppServiceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl border border-[#D5CEBF] text-[#25D366] hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-colors flex items-center justify-center"
                      title={`Quick inquiry for ${service.title}`}
                      aria-label="WhatsApp Inquiry"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= BOTTOM SITE VISIT BANNER ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-[#1E2229] rounded-3xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#3A404D] shadow-xl">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
              Planning a Project in Meerut?
            </h3>
            <p className="text-xs sm:text-sm text-[#C8C0B4] max-w-lg">
              Book a site visit with material catalogs brought to your location. Free laser measurement and 3D consultation included.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="shrink-0 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-[#1E2229] bg-[#C5A880] hover:bg-[#b5966d] transition-all shadow-md active:scale-95"
          >
            Book Free Site Visit
          </button>
        </div>
      </section>
    </div>
  );
};
