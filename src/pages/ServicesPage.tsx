import React, { useEffect, useState } from 'react';
import { PageId, InteriorCategory } from '../types';
import { SERVICES_DATA, STUDIO_INFO, CATEGORIES_LIST } from '../data/interiorData';
import { CheckCircle2, Clock, ShieldCheck, ArrowRight, Sparkles, MessageCircle, Layers, Tag, ChevronRight } from 'lucide-react';

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

  const scrollToService = (serviceId: string) => {
    const el = document.getElementById(`service-card-${serviceId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const displayedServices = activeCategoryFilter === 'All'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === activeCategoryFilter);

  return (
    <div className="py-12 sm:py-16 space-y-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-widest text-[#8A6D47] font-bold block mb-2">
            Signature Design & Execution
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-[#1E2229] mb-4">
            Signature Interior Services & Architectural Solutions
          </h1>
          <p className="text-base sm:text-lg text-[#554E45] leading-relaxed">
            From architectural wall louvers and imported 3D wallpaper to ergonomic modular kitchens, motorized drapes, and complete turnkey transformations in Meerut.
          </p>
        </div>

        {/* Categories Quick Filter & Navigation Bar */}
        <div className="mt-8 pt-4 border-t border-[#E8E1D2]">
          <div className="flex items-center gap-2 overflow-x-auto pb-3 custom-horizontal-scrollbar">
            <span className="text-xs text-[#8A8174] font-semibold uppercase tracking-wider shrink-0 mr-2">
              Categories:
            </span>
            <button
              id="services-cat-all"
              onClick={() => setActiveCategoryFilter('All')}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold tracking-wide shrink-0 transition-all ${
                activeCategoryFilter === 'All'
                  ? 'bg-[#1E2229] text-white shadow-sm'
                  : 'bg-white text-[#5D554B] border border-[#E0D7C8] hover:border-[#C5A880] hover:text-[#1E2229]'
              }`}
            >
              All Categories ({CATEGORIES_LIST.length})
            </button>
            {CATEGORIES_LIST.map((cat, cIdx) => {
              const isActive = activeCategoryFilter === cat;
              return (
                <button
                  key={cat}
                  id={`services-cat-btn-${cIdx}`}
                  onClick={() => setActiveCategoryFilter(cat)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold tracking-wide shrink-0 transition-all ${
                    isActive
                      ? 'bg-[#1E2229] text-white shadow-sm'
                      : 'bg-white text-[#5D554B] border border-[#E0D7C8] hover:border-[#C5A880] hover:text-[#1E2229]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
            <div className="w-4 shrink-0" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-14">
          {displayedServices.map((service, index) => {
            const isReversed = index % 2 === 1;
            const encodedWhatsAppMsg = encodeURIComponent(
              service.whatsAppPrompt || `Hello Bharat Decor, I want to inquire about ${service.title} in Meerut.`
            );
            const whatsAppLink = `https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodedWhatsAppMsg}`;

            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className="bg-white rounded-2xl overflow-hidden border border-[#E4DDD0] shadow-sm hover:shadow-lg transition-all scroll-mt-28"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Visual column */}
                  <div className={`lg:col-span-5 relative min-h-[320px] lg:min-h-[460px] bg-[#EDE8DE] ${isReversed ? 'lg:order-2' : ''}`}>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
                      }}
                    />
                    <div className="absolute top-4 left-4 bg-[#1E2229]/90 backdrop-blur-md text-[#FAF9F6] text-xs font-semibold px-3 py-1.5 rounded-md shadow-sm">
                      {service.category}
                    </div>
                  </div>

                  {/* Details column */}
                  <div className={`lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 ${isReversed ? 'lg:order-1' : ''}`}>
                    <div className="space-y-5">
                      <div>
                        <span className="text-xs font-semibold text-[#8A6D47] uppercase tracking-wider">
                          {service.subtitle}
                        </span>
                        <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1E2229] mt-1">
                          {service.title}
                        </h2>
                      </div>

                      <p className="text-sm sm:text-base text-[#554E45] leading-relaxed">
                        {service.description}
                      </p>

                      {/* Material Specs Showcase */}
                      {service.materialSpecs && service.materialSpecs.length > 0 && (
                        <div className="p-4 rounded-xl bg-[#FAF8F3] border border-[#EDE7DB] space-y-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#8A6D47] uppercase tracking-wider">
                            <Layers className="w-3.5 h-3.5 text-[#C5A880]" />
                            <span>Material & Build Specifications:</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {service.materialSpecs.map((spec, spIdx) => (
                              <div key={spIdx} className="flex items-center gap-2 text-xs text-[#4A4237]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] shrink-0" />
                                <span className="font-medium">{spec}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Feature Checklist */}
                      <div className="space-y-2 pt-1">
                        <span className="text-xs uppercase tracking-wider text-[#8A8174] font-bold block mb-2">
                          Included Features & Execution:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {service.features.map((feature, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2 text-xs sm:text-sm text-[#383129]">
                              <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Metadata & Actions */}
                    <div className="pt-6 border-t border-[#F0EBE0] space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#6B6357]">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#C5A880] shrink-0" />
                          <span>Estimated Handover: <strong>{service.turnaroundTime}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0" />
                          <span className="truncate">Highlight: <strong>{service.materialHighlight}</strong></span>
                        </div>
                      </div>

                      {/* Action Buttons: Direct WhatsApp + On-Site Consultation */}
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <a
                          id={`service-whatsapp-btn-${service.id}`}
                          href={whatsAppLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-3 rounded-md text-sm font-semibold text-white bg-[#25D366] hover:bg-[#1EBE5D] transition-colors shadow-sm"
                        >
                          <MessageCircle className="w-4 h-4 fill-white text-white" />
                          <span>Inquire via WhatsApp</span>
                        </a>

                        <button
                          id={`inquire-btn-${service.id}`}
                          onClick={() => handleInquire(service.title)}
                          className="inline-flex items-center gap-2 px-5 py-3 rounded-md text-sm font-semibold text-[#1E2229] bg-[#EDE7DA] hover:bg-[#E2D9C8] border border-[#D5CEBF] transition-colors"
                        >
                          <Sparkles className="w-4 h-4 text-[#8A6D47]" />
                          <span>Book Design Consultation</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#1E2229]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Consultation Promo */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-[#FAF6EE] rounded-2xl p-8 sm:p-10 border border-[#E5DEC7] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="font-serif-luxury text-2xl font-bold text-[#1E2229]">
              Need a Custom Combination or Multi-Room Package?
            </h3>
            <p className="text-sm text-[#5D554B]">
              Schedule a comprehensive on-site assessment anywhere in Meerut with material samples brought to your doorstep.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="shrink-0 px-6 py-3.5 rounded-md text-sm font-semibold text-[#1E2229] bg-[#C5A880] hover:bg-[#D4B996] transition-colors shadow-sm"
          >
            Book Free Site Visit
          </button>
        </div>
      </section>
    </div>
  );
};
