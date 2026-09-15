import React, { useState, useEffect, useRef } from 'react';
import { PageId, PortfolioItem, ProductItem } from '../types';
import { STUDIO_INFO, QUICK_STATS, SERVICES_DATA, PORTFOLIO_DATA, REVIEWS_DATA, HERO_SLIDES } from '../data/interiorData';
import { Sparkles, ArrowRight, Star, ShieldCheck, CheckCircle2, Award, Clock, ArrowUpRight, MapPin, ChevronLeft, ChevronRight, Pause, Play, PhoneCall, Layers, Palette, LayoutGrid, SunDim, Lightbulb, Compass, MessageCircle } from 'lucide-react';
import { ProductCatalogSection } from '../components/ProductCatalogSection';
import { ProductDetailModal } from '../components/ProductDetailModal';

interface HomePageProps {
  onNavigate: (page: PageId, serviceId?: string) => void;
  onOpenProjectModal: (project: PortfolioItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenProjectModal }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSlides = HERO_SLIDES.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, currentSlide]);

  const featuredProjects = PORTFOLIO_DATA.slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO BANNER SLIDER (3 SLIDES - 5-SECOND AUTOPLAY) */}
      <section
        className="relative overflow-hidden bg-[#FAF9F6] select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        aria-label="Hero Carousel"
      >
        {/* Slides Container */}
        <div className="relative min-h-[560px] sm:min-h-[620px] lg:min-h-[660px] w-full flex items-center">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === currentSlide;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {/* Background Architectural Image (Strictly no people, full natural clarity) */}
                <img
                  src={slide.image}
                  alt={slide.headline}
                  className={`w-full h-full object-cover transform transition-transform duration-7000 ease-out ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                  referrerPolicy="no-referrer"
                />

                {/* Content Layout: Architectural Card without black shadow */}
                <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center py-12 sm:py-16">
                  <div className="max-w-xl lg:max-w-2xl bg-[#FAF9F6]/95 sm:bg-white/92 backdrop-blur-md p-6 sm:p-10 rounded-2xl border border-[#E8E1D2] shadow-sm space-y-5">
                    {/* Category Tag Badge */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE7DA] border border-[#D5CEBF] text-xs font-semibold uppercase tracking-wider text-[#8A6D47]">
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>{slide.categoryTag}</span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E2229] leading-[1.15] tracking-tight">
                      {slide.headline}
                    </h1>

                    {/* Subheadline */}
                    <p className="text-sm sm:text-base text-[#554E45] leading-relaxed max-w-xl font-normal">
                      {slide.subheadline}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3.5 pt-1">
                      <button
                        id={`hero-slide-primary-btn-${idx}`}
                        onClick={() => onNavigate(slide.targetPage, slide.targetServiceId)}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md text-sm font-semibold text-white bg-[#1E2229] hover:bg-[#2C333E] transition-all shadow-sm hover:shadow"
                      >
                        <span>{slide.buttonText}</span>
                        <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                      </button>

                      <button
                        id={`hero-slide-secondary-btn-${idx}`}
                        onClick={() => onNavigate(slide.secondaryTargetPage)}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md text-sm font-semibold text-[#1E2229] bg-[#EDE7DA] border border-[#D5CEBF] hover:bg-[#E2D9C8] transition-all"
                      >
                        <Sparkles className="w-4 h-4 text-[#8A6D47]" />
                        <span>{slide.secondaryButtonText}</span>
                      </button>
                    </div>

                    {/* Studio Footer Metadata */}
                    <div className="pt-4 border-t border-[#E8E1D2] flex flex-wrap items-center gap-5 text-xs text-[#6B6357]">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                        <span>{slide.tagline}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#C5A880]" />
                        <span>{slide.projectNote}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Controls: Arrows without dark background */}
        <button
          id="hero-carousel-prev-btn"
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-white/90 hover:bg-white text-[#1E2229] backdrop-blur-md border border-[#E2DAD0] transition-all shadow-sm hover:scale-105"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          id="hero-carousel-next-btn"
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-white/90 hover:bg-white text-[#1E2229] backdrop-blur-md border border-[#E2DAD0] transition-all shadow-sm hover:scale-105"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Bottom Bar: Indicators & Autoplay Status */}
        <div className="absolute bottom-6 left-0 right-0 z-30 flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Indicator Dots / Tabs */}
          <div className="flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#E2DAD0]">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === currentSlide;
              return (
                <button
                  key={slide.id}
                  id={`hero-slide-dot-${idx}`}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}: ${slide.categoryTag}`}
                  className={`group relative h-2.5 rounded-full transition-all duration-500 flex items-center ${
                    isActive ? 'w-8 sm:w-12 bg-[#C5A880]' : 'w-2.5 sm:w-3 bg-[#1E2229]/25 hover:bg-[#1E2229]/50'
                  }`}
                />
              );
            })}
          </div>

          {/* Slide Counter & Pause indicator */}
          <div className="flex items-center gap-2.5 text-xs text-[#554E45] font-mono">
            <span className="hidden sm:inline-block text-[11px] uppercase tracking-wider text-[#8A6D47] font-sans font-semibold bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded border border-[#E2DAD0]">
              {HERO_SLIDES[currentSlide].categoryTag}
            </span>
            <span className="bg-white/85 backdrop-blur-sm px-2.5 py-1 rounded border border-[#E2DAD0] text-[#1E2229] font-semibold">
              0{currentSlide + 1} / 0{totalSlides}
            </span>
            <button
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
              className="p-1.5 rounded bg-white/85 hover:bg-white text-[#1E2229] border border-[#E2DAD0] transition-colors"
              title={isPaused ? 'Autoplay Paused' : 'Autoplay Running (5s)'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-[#8A6D47]" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </section>

      {/* 2. QUICK HIGHLIGHTS / 4 STAT COUNTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {QUICK_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 border border-[#E7E1D4] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#1E2229] mb-1 group-hover:text-[#9F7E54] transition-colors">
                {stat.value}
              </div>
              <h3 className="text-sm font-semibold text-[#1E2229] uppercase tracking-wider mb-2">
                {stat.label}
              </h3>
              <p className="text-xs text-[#6B6357] leading-relaxed">
                {stat.subtext}
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#EBE5DA] group-hover:bg-[#C5A880] transition-colors" />
            </div>
          ))}
        </div>
      </section>

      {/* 3. 6 CORE INTERIOR DESIGN & EXECUTION SERVICES OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8A6D47] font-bold block mb-2">
              Our Core Specializations
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#1E2229]">
              Signature Interior Design Services
            </h2>
            <p className="text-sm text-[#665D52] mt-1 max-w-xl">
              Architectural planning, custom joinery, bespoke wall concepts, and turnkey fit-outs executed by master craftsmen in Meerut.
            </p>
          </div>
          <button
            id="home-view-all-services-btn"
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1E2229] hover:text-[#9F7E54] transition-colors group"
          >
            <span>Explore All 6 Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C5A880]" />
          </button>
        </div>

        {/* Modern 6-Grid (3 in a row), minimal text & architectural card style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {SERVICES_DATA.slice(0, 6).map((service, sIdx) => {
            const getServiceIcon = () => {
              switch (service.id) {
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

            const whatsAppServiceUrl = `https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodeURIComponent(
              `Hello Bharat Decor, I would like to inquire about your "${service.title}" service in Meerut.`
            )}`;

            return (
              <div
                key={service.id}
                id={`home-service-card-${service.id}`}
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
                      // Fallback image if network or resource fails
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
                      {getServiceIcon()}
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

                {/* Minimal Card Content (No long text or paragraph clutter) */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3
                      onClick={() => onNavigate('services', service.id)}
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
                      id={`home-service-btn-${service.id}`}
                      onClick={() => onNavigate('services', service.id)}
                      className="flex-1 inline-flex items-center justify-between py-2.5 px-3.5 rounded-xl bg-[#FAF8F5] group-hover:bg-[#1E2229] border border-[#E2DAD0] group-hover:border-[#1E2229] text-[#1E2229] group-hover:text-white transition-all text-xs font-semibold"
                    >
                      <span>Explore Specifications</span>
                      <div className="w-6 h-6 rounded-full bg-[#EDE7DB] group-hover:bg-[#C5A880] text-[#1E2229] flex items-center justify-center transition-colors">
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </button>

                    <a
                      href={whatsAppServiceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl border border-[#D5CEBF] text-[#25D366] hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-colors"
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

        {/* View All Services Button */}
        <div className="text-center pt-6">
          <button
            id="home-view-all-services-bottom-btn"
            onClick={() => onNavigate('services')}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-[#1E2229] hover:bg-[#2C333E] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 group"
          >
            <span>View All Services & Material Specifications</span>
            <ArrowRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* 4. CURATED CLIENT INSTAGRAM PRODUCTS CATALOG (@bharatdecor_mrt) WITH CATEGORY TABS */}
      <ProductCatalogSection
        onNavigate={onNavigate}
        onSelectProduct={(product) => setSelectedProduct(product)}
      />

      {/* 5. RECENT PROJECTS GALLERY PREVIEW */}
      <section className="bg-[#F3EFE7] py-16 sm:py-20 border-y border-[#E4DCCF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#8A6D47] font-bold block mb-2">
                Curated Work in Meerut
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#1E2229]">
                Featured Architecture & Living Spaces
              </h2>
            </div>
            <button
              id="home-view-all-projects-btn"
              onClick={() => onNavigate('portfolio')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1E2229] hover:text-[#9F7E54] transition-colors group"
            >
              <span>Explore Complete Gallery</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C5A880]" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onOpenProjectModal(project)}
                className="bg-white rounded-xl overflow-hidden border border-[#E0D7C8] shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col"
              >
                <div className="relative h-60 overflow-hidden bg-[#E2DACB]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E2229]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-[#1E2229] text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                    {project.category}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="flex items-center gap-1 text-[11px] text-[#E2CDAE]">
                      <MapPin className="w-3 h-3 text-[#C5A880]" />
                      {project.location}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif-luxury text-base font-bold text-[#1E2229] mb-1 group-hover:text-[#9F7E54] transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#6B6357] line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-[#F0EBE0] flex items-center justify-between text-[11px]">
                    <span className="text-[#8C8378]">{project.year}</span>
                    <span className="text-[#1E2229] font-medium flex items-center gap-1 group-hover:text-[#9F7E54]">
                      View Details <ArrowUpRight className="w-3 h-3 text-[#C5A880]" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CLIENT REVIEWS / TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-[#8A6D47] font-bold block mb-2">
            Verified Client Feedback
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#1E2229] mb-3">
            What Homeowners in Meerut Say
          </h2>
          <p className="text-sm text-[#5D554B]">
            Real feedback from homeowners and commercial clients who trusted Bharat Decor with their spaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS_DATA.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl p-7 border border-[#E7E1D4] shadow-sm flex flex-col justify-between space-y-6 relative"
            >
              <div>
                <div className="flex items-center gap-1 mb-4 text-[#C5A880]">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C5A880]" />
                  ))}
                </div>
                <p className="text-sm text-[#3E3830] leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0EBE0]">
                <h4 className="font-semibold text-sm text-[#1E2229]">
                  {review.name}
                </h4>
                <div className="flex items-center justify-between text-xs text-[#7A7165] mt-1">
                  <span>{review.location}</span>
                  <span className="text-[11px] text-[#8A6D47] font-medium">{review.projectType}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. RENOVATION CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="relative rounded-2xl overflow-hidden bg-[#1E2229] text-white p-8 sm:p-12 lg:p-16 shadow-xl border border-[#2D333D]">
          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="inline-block text-xs uppercase tracking-widest text-[#C5A880] font-bold px-3 py-1 bg-[#2D333D] rounded-full">
              Complimentary Site Assessment in Meerut
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Ready to elevate your home with Bharat Decor?
            </h2>
            <p className="text-sm sm:text-base text-[#D4CDC3] leading-relaxed">
              Book a free consultation with our senior designers. We visit your site in Meerut, provide laser measurement, and create custom 3D concepts with transparent itemized estimations.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                id="cta-book-site-visit-btn"
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-sm font-semibold text-[#1E2229] bg-[#C5A880] hover:bg-[#D4B996] transition-all shadow-md hover:-translate-y-0.5"
              >
                <span>Book Free Site Visit & 3D Render</span>
                <ArrowRight className="w-4 h-4 text-[#1E2229]" />
              </button>
              <a
                href={`tel:${STUDIO_INFO.phone}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md text-sm font-medium text-white border border-white/30 hover:bg-white/10 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#C5A880]" />
                <span>Call {STUDIO_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#C5A880]/15 to-transparent pointer-events-none hidden lg:block" />
        </div>
      </section>

      {/* Product Detail & Specifications Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
};
