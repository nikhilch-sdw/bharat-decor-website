import React, { useState, useMemo, useRef, useEffect } from 'react';
import { PageId, PortfolioItem, InteriorCategory } from '../types';
import { PORTFOLIO_DATA, CATEGORIES_LIST, STUDIO_INFO } from '../data/interiorData';
import {
  MapPin,
  Eye,
  ArrowUpRight,
  Sparkles,
  Filter,
  Search,
  LayoutGrid,
  Columns2,
  Calendar,
  Layers,
  CheckCircle2,
  Phone,
  SlidersHorizontal,
  X,
  ShieldCheck,
  Clock,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface PortfolioPageProps {
  onNavigate: (page: PageId) => void;
  onOpenProjectModal: (project: PortfolioItem) => void;
}

type FilterCategory = 'All' | InteriorCategory;
type ViewMode = 'bento' | 'grid';

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onOpenProjectModal, onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');
  const [selectedLocality, setSelectedLocality] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>('bento');

  // Category horizontal scroll controls
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
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
    }
    window.addEventListener('resize', checkScroll);
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (tabsContainerRef.current) {
      const offset = direction === 'left' ? -260 : 260;
      tabsContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (cat: FilterCategory, e?: React.MouseEvent<HTMLButtonElement>) => {
    setActiveCategory(cat);
    if (e?.currentTarget) {
      e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  // Distinct localities extracted from portfolio projects
  const localities = useMemo(() => {
    const list = new Set<string>();
    PORTFOLIO_DATA.forEach((p) => {
      const area = p.location.split(',')[0].trim();
      if (area) list.add(area);
    });
    return ['All', ...Array.from(list)];
  }, []);

  const categories: FilterCategory[] = ['All', ...CATEGORIES_LIST];

  // Filter logic
  const filteredProjects = useMemo(() => {
    return PORTFOLIO_DATA.filter((project) => {
      // Category filter
      const matchesCategory = activeCategory === 'All' || project.category === activeCategory;

      // Locality filter
      const matchesLocality =
        selectedLocality === 'All' ||
        project.location.toLowerCase().includes(selectedLocality.toLowerCase());

      // Search query filter
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.scope.toLowerCase().includes(query) ||
        project.location.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.highlights.some((h) => h.toLowerCase().includes(query));

      return matchesCategory && matchesLocality && matchesSearch;
    });
  }, [activeCategory, selectedLocality, searchQuery]);

  // Featured flagship spotlight project (first project or matching category)
  const spotlightProject = useMemo(() => {
    return PORTFOLIO_DATA.find((p) => p.id === 'project-1') || PORTFOLIO_DATA[0];
  }, []);

  const handleInquireWhatsApp = (project: PortfolioItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = encodeURIComponent(
      `Hello Bharat Decor, I am interested in a similar design to "${project.title}" (${project.scope}) in Meerut. Could you share estimated costs and details?`
    );
    window.open(`https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  const handleResetFilters = () => {
    setActiveCategory('All');
    setSelectedLocality('All');
    setSearchQuery('');
  };

  return (
    <div className="py-10 sm:py-14 space-y-12 sm:space-y-16 selection:bg-[#C5A880]/20">
      {/* ================= EDITORIAL HERO HEADER ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative border-b border-[#E5DEC7] pb-10 sm:pb-12">
          {/* Top Architectural Tagline */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8C6D47] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
              <span>Meerut NCR • Bespoke Residences & Turnkey Showrooms</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#7A6F62] font-medium bg-[#F5EFE3] px-3.5 py-1.5 rounded-full border border-[#E5DEC7]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8C6D47]" />
              <span>10-Year Hardware Warranty on All Joinery</span>
            </div>
          </div>

          {/* Main Title & Narrative Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E2229] leading-[1.12] tracking-tight">
                Crafted Living Spaces, <br />
                <span className="text-[#8C6D47] italic font-normal">Executed Without Compromise.</span>
              </h1>
            </div>
            <div className="lg:col-span-5 space-y-4">
              <p className="text-sm sm:text-base text-[#5D554B] leading-relaxed">
                Step inside our portfolio of villas, modern apartments, modular kitchens, and architectural acoustic paneling delivered across Meerut’s premier neighborhoods.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#1E2229]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                  <span>250+ Handed Over</span>
                </div>
                <span className="text-[#D3C7B5]">•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#8C6D47]" />
                  <span>45-Day Handover Protocol</span>
                </div>
                <span className="text-[#D3C7B5]">•</span>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#8C6D47]" />
                  <span>100% Customized 3D Renders</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FLAGSHIP SPOTLIGHT SHOWCASE ================= */}
      {activeCategory === 'All' && !searchQuery && selectedLocality === 'All' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#1E2229] text-white border border-[#3A404D] shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
              {/* Image side with cinematic overlay */}
              <div
                className="lg:col-span-7 relative h-72 lg:h-auto overflow-hidden cursor-pointer group"
                onClick={() => onOpenProjectModal(spotlightProject)}
              >
                <img
                  src={spotlightProject.image}
                  alt={spotlightProject.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-[#1E2229]/30 to-[#1E2229] lg:to-[#1E2229] opacity-80 lg:opacity-100" />
                <div className="absolute top-4 left-4 bg-[#C5A880] text-[#1E2229] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  Featured Case Study
                </div>
              </div>

              {/* Story side */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#A69B8D]">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                      {spotlightProject.location}
                    </span>
                    <span>Completed {spotlightProject.year}</span>
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block mb-1">
                      {spotlightProject.scope}
                    </span>
                    <h2
                      onClick={() => onOpenProjectModal(spotlightProject)}
                      className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white hover:text-[#C5A880] cursor-pointer transition-colors leading-snug"
                    >
                      {spotlightProject.title}
                    </h2>
                  </div>

                  <p className="text-xs sm:text-sm text-[#C8C0B4] leading-relaxed">
                    {spotlightProject.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <span className="text-[11px] uppercase tracking-wider text-[#A69B8D] font-bold block">
                      Architectural Highlights:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {spotlightProject.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="text-[11px] bg-white/10 text-[#E0D8CB] px-2.5 py-1 rounded-md border border-white/10"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                  <button
                    id="spotlight-view-details-btn"
                    onClick={() => onOpenProjectModal(spotlightProject)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#C5A880] hover:bg-[#b5966d] text-[#1E2229] font-bold text-xs tracking-wide transition-all shadow-md active:scale-95"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={(e) => handleInquireWhatsApp(spotlightProject, e)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs transition-all shadow-md active:scale-95"
                  >
                    {/* Official WhatsApp Glyph */}
                    <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span>Inquire Design</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= INTERACTIVE FILTER & SEARCH BAR ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E5DEC7] shadow-sm space-y-4">
          {/* Top Row: Search Input, Locality Select, Layout Switcher */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8C8174] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by space, material (e.g. quartz, louvers), or location..."
                className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E0D7C8] focus:border-[#C5A880] focus:bg-white text-xs text-[#1E2229] placeholder-[#9C9387] focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8174] hover:text-[#1E2229]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Locality Dropdown Selector */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs text-[#7A6F62] shrink-0 font-medium pl-1">
                <MapPin className="w-3.5 h-3.5 text-[#8C6D47]" />
                <span className="hidden sm:inline">Meerut Locality:</span>
              </div>
              <select
                value={selectedLocality}
                onChange={(e) => setSelectedLocality(e.target.value)}
                className="py-2.5 px-3 rounded-xl bg-[#FAF9F6] border border-[#E0D7C8] focus:border-[#C5A880] text-xs font-semibold text-[#1E2229] focus:outline-none cursor-pointer"
              >
                {localities.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc === 'All' ? 'All Localities in Meerut' : loc}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Switcher (Bento vs Grid) */}
            <div className="flex items-center gap-1 bg-[#FAF9F6] p-1 rounded-xl border border-[#E0D7C8] shrink-0 self-end md:self-auto">
              <button
                onClick={() => setViewMode('bento')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'bento'
                    ? 'bg-[#1E2229] text-white shadow-xs'
                    : 'text-[#6C6356] hover:text-[#1E2229]'
                }`}
                title="Bento Architectural Layout"
              >
                <Columns2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Bento</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-[#1E2229] text-white shadow-xs'
                    : 'text-[#6C6356] hover:text-[#1E2229]'
                }`}
                title="Gallery Grid Layout"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
            </div>
          </div>

          {/* Bottom Row: Category Filter Pills with Visible Scrollbar & Scroll Controls */}
          <div className="pt-2 border-t border-[#F2ECE2]">
            <div className="flex items-center gap-2">
              {/* Category Label */}
              <div className="flex items-center gap-1.5 text-xs text-[#8A8174] shrink-0 font-semibold pr-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="hidden sm:inline">Category:</span>
              </div>

              {/* Scroll Left Button */}
              <button
                type="button"
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                aria-label="Scroll categories left"
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all border ${
                  canScrollLeft
                    ? 'bg-white hover:bg-[#1E2229] hover:text-white text-[#5D554B] border-[#D8CEBC] shadow-2xs hover:scale-105 active:scale-95 cursor-pointer'
                    : 'bg-[#F7F4EE] text-[#C4BBAF] border-[#E8DFC8] opacity-40 cursor-default'
                }`}
                title="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Scrollable Tabs Track with Visible Horizontal Scrollbar */}
              <div
                ref={tabsContainerRef}
                className="custom-horizontal-scrollbar flex-1 flex items-center gap-2 overflow-x-auto pb-2.5 pt-1 scroll-smooth"
                tabIndex={0}
                role="region"
                aria-label="Filter portfolio categories"
              >
                {categories.map((cat) => {
                  const isActive = activeCategory === cat;
                  const count =
                    cat === 'All'
                      ? PORTFOLIO_DATA.length
                      : PORTFOLIO_DATA.filter((p) => p.category === cat).length;

                  return (
                    <button
                      key={cat}
                      id={`filter-pill-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      onClick={(e) => handleSelectCategory(cat, e)}
                      className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                        isActive
                          ? 'bg-[#1E2229] text-white shadow-xs scale-[1.02]'
                          : 'bg-[#FAF9F6] text-[#5D554B] border border-[#E2D9CB] hover:border-[#C5A880] hover:text-[#1E2229] hover:bg-white'
                      }`}
                    >
                      <span>{cat}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                          isActive ? 'bg-white/20 text-white' : 'bg-[#ECE5D8] text-[#7A6F62]'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Scroll Right Button */}
              <button
                type="button"
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                aria-label="Scroll categories right"
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all border ${
                  canScrollRight
                    ? 'bg-white hover:bg-[#1E2229] hover:text-white text-[#5D554B] border-[#D8CEBC] shadow-2xs hover:scale-105 active:scale-95 cursor-pointer'
                    : 'bg-[#F7F4EE] text-[#C4BBAF] border-[#E8DFC8] opacity-40 cursor-default'
                }`}
                title="Scroll right to see all categories"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Info & Active Filters Bar */}
        <div className="flex items-center justify-between mt-3 px-1 text-xs text-[#7A6F62]">
          <span>
            Showing <strong className="text-[#1E2229]">{filteredProjects.length}</strong> interior projects in Meerut
          </span>
          {(activeCategory !== 'All' || selectedLocality !== 'All' || searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="text-[#8C6D47] hover:underline font-semibold flex items-center gap-1"
            >
              <span>Reset all filters</span>
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </section>

      {/* ================= PROJECTS SHOWCASE (BENTO OR GRID) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProjects.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16 px-4 rounded-3xl bg-white border border-[#E5DEC7] max-w-lg mx-auto space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#FAF6EE] text-[#8C6D47] flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-[#1E2229]">
              No Projects Match Your Search
            </h3>
            <p className="text-xs text-[#6C6356] leading-relaxed">
              We couldn't find any completed projects matching "{searchQuery}" in {selectedLocality}.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl bg-[#1E2229] text-white text-xs font-semibold hover:bg-[#2F3642] transition-colors"
            >
              View All Projects
            </button>
          </div>
        ) : viewMode === 'bento' ? (
          /* ================= BENTO ARCHITECTURAL LAYOUT ================= */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
            {filteredProjects.map((project, idx) => {
              // Create dynamic visual rhythm for Bento:
              // Index 0, 5, 8 span 8 columns or 7 columns, others span 4 or 5 columns
              const isWide = idx % 5 === 0 || idx % 5 === 3;
              const colSpanClass = isWide ? 'md:col-span-7 lg:col-span-8' : 'md:col-span-5 lg:col-span-4';

              return (
                <div
                  key={project.id}
                  className={`${colSpanClass} group relative bg-white rounded-2xl overflow-hidden border border-[#E5DEC7] shadow-sm hover:shadow-xl hover:border-[#C5A880] transition-all duration-300 flex flex-col`}
                >
                  {/* Image Container with Dynamic Height */}
                  <div
                    className={`relative w-full ${isWide ? 'h-72 sm:h-84' : 'h-64 sm:h-72'} overflow-hidden bg-[#ECE6DA] cursor-pointer`}
                    onClick={() => onOpenProjectModal(project)}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E2229]/90 via-[#1E2229]/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                    {/* Category Badge Top Left */}
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <span className="bg-[#1E2229]/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/15 shadow-sm">
                        {project.category}
                      </span>
                    </div>

                    {/* Quick View Button Top Right */}
                    <div className="absolute top-3.5 right-3.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenProjectModal(project);
                        }}
                        className="p-2 rounded-full bg-white text-[#1E2229] shadow-lg hover:scale-110 transition-transform"
                        title="View Full Case Study"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Location & Year Overlaid at Bottom */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 flex items-center justify-between text-white text-xs">
                      <div className="flex items-center gap-1.5 bg-[#1E2229]/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                        <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span className="font-medium text-[11px]">{project.location}</span>
                      </div>
                      <span className="text-[11px] text-white/70 font-medium bg-[#1E2229]/60 px-2 py-1 rounded">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-[#8C8174] font-semibold uppercase tracking-wider mb-1.5">
                        <span>{project.scope}</span>
                      </div>

                      <h3
                        onClick={() => onOpenProjectModal(project)}
                        className="font-serif-luxury text-xl font-bold text-[#1E2229] group-hover:text-[#8C6D47] cursor-pointer transition-colors leading-snug"
                      >
                        {project.title}
                      </h3>

                      <p className="text-xs text-[#5D554B] mt-2 leading-relaxed line-clamp-2">
                        {project.description}
                      </p>

                      {/* Design Feature Highlights Tag Cloud */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {project.highlights.slice(0, isWide ? 3 : 2).map((item, hIdx) => (
                          <span
                            key={hIdx}
                            className="text-[10px] bg-[#FAF8F5] text-[#6A6054] px-2 py-0.5 rounded border border-[#E5DEC7]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar Footer */}
                    <div className="pt-3.5 border-t border-[#F0EAE0] flex items-center justify-between gap-2">
                      <button
                        onClick={() => onOpenProjectModal(project)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E2229] hover:text-[#8C6D47] transition-colors"
                      >
                        <span>Explore Project</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
                      </button>

                      {/* 1-Tap Direct WhatsApp Inquiry Button */}
                      <button
                        onClick={(e) => handleInquireWhatsApp(project, e)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#FAF9F6] hover:bg-[#25D366] text-[#1E2229] hover:text-white border border-[#DDD3C2] hover:border-[#25D366] text-[11px] font-semibold transition-all group/wa"
                        title="Ask quotation for similar design on WhatsApp"
                      >
                        <svg className="w-3 h-3 fill-[#25D366] group-hover/wa:fill-white transition-colors" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        <span>Inquire</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ================= GALLERY GRID VIEW ================= */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#E5DEC7] shadow-sm hover:shadow-xl hover:border-[#C5A880] transition-all duration-300 flex flex-col group"
              >
                <div
                  className="relative h-64 overflow-hidden bg-[#ECE6DA] cursor-pointer"
                  onClick={() => onOpenProjectModal(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E2229]/80 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 bg-[#1E2229]/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded">
                    {project.category}
                  </div>

                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white bg-[#1E2229]/70 backdrop-blur-sm px-2.5 py-1 rounded">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{project.location}</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-[#8C8174] uppercase font-semibold mb-1">
                      <span>{project.scope}</span>
                      <span>{project.year}</span>
                    </div>
                    <h3
                      onClick={() => onOpenProjectModal(project)}
                      className="font-serif-luxury text-lg font-bold text-[#1E2229] group-hover:text-[#8C6D47] cursor-pointer transition-colors"
                    >
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#5D554B] mt-2 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#F2ECE2] flex items-center justify-between">
                    <button
                      onClick={() => onOpenProjectModal(project)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#1E2229] hover:text-[#8C6D47]"
                    >
                      <span>Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
                    </button>
                    <button
                      onClick={(e) => handleInquireWhatsApp(project, e)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#25D366] hover:underline"
                    >
                      <span>Inquire on WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= THE BHARAT DECOR STANDARD (EXECUTION TIMELINE) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F0] rounded-3xl p-6 sm:p-10 border border-[#E5DEC7] shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#8C6D47] font-bold block">
              Execution Excellence
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1E2229]">
              How We Turn Ideas into Ready Homes
            </h2>
            <p className="text-xs sm:text-sm text-[#6C6356]">
              A disciplined turnkey process guaranteeing quality, zero surprise costs, and handover within 45 days.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#E8DFD1] space-y-2 shadow-2xs">
              <span className="text-xl font-bold text-[#C5A880] font-serif-luxury">01.</span>
              <h4 className="font-bold text-sm text-[#1E2229]">Laser Site Measurement & 3D Render</h4>
              <p className="text-xs text-[#6C6356] leading-relaxed">
                Precise digital room scans in Meerut and customized 3D photo-realistic visualizations before manufacturing begins.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8DFD1] space-y-2 shadow-2xs">
              <span className="text-xl font-bold text-[#C5A880] font-serif-luxury">02.</span>
              <h4 className="font-bold text-sm text-[#1E2229]">Factory Joinery & Pre-Assembly</h4>
              <p className="text-xs text-[#6C6356] leading-relaxed">
                German CNC edge-banding on certified Century marine ply. Zero dust cutting inside your actual home.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8DFD1] space-y-2 shadow-2xs">
              <span className="text-xl font-bold text-[#C5A880] font-serif-luxury">03.</span>
              <h4 className="font-bold text-sm text-[#1E2229]">Clean Site Installation</h4>
              <p className="text-xs text-[#6C6356] leading-relaxed">
                Master carpenters install modular units, fluted panels, Cove LEDs, and wallpapers with laser alignment.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8DFD1] space-y-2 shadow-2xs">
              <span className="text-xl font-bold text-[#C5A880] font-serif-luxury">04.</span>
              <h4 className="font-bold text-sm text-[#1E2229]">45-Day Handover & 10-Yr Warranty</h4>
              <p className="text-xs text-[#6C6356] leading-relaxed">
                Final walkthrough, deep cleaning, and issuance of our comprehensive 10-year hardware certificate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BOTTOM CONSULTATION CTA BANNER ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#1E2229] via-[#242A34] to-[#1E2229] text-white border border-[#3A404D] shadow-2xl relative overflow-hidden">
          {/* Subtle decorative background circle */}
          <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-[#C5A880]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-5">
            <div className="w-12 h-12 rounded-full bg-[#C5A880]/20 text-[#C5A880] flex items-center justify-center mx-auto border border-[#C5A880]/30">
              <Sparkles className="w-6 h-6" />
            </div>

            <h3 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white leading-tight">
              Inspired by One of These Aesthetics?
            </h3>

            <p className="text-sm sm:text-base text-[#D0C8BC] leading-relaxed max-w-2xl mx-auto">
              Bring your floor plan or invite our senior designer for a free measurement and styling session anywhere in Meerut. We will customize layouts and materials to match your vision.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-[#1E2229] bg-[#C5A880] hover:bg-[#b5966d] transition-all shadow-lg active:scale-95"
              >
                Book Free Site Consultation
              </button>

              <a
                href={`https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodeURIComponent(
                  'Hello Bharat Decor, I was browsing your portfolio and would like to schedule a free interior consultation in Meerut.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20bd5a] transition-all shadow-lg active:scale-95"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>Chat with Design Team</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
