import React, { useState, useMemo, useRef } from 'react';
import { PageId, ProductCategory, ProductItem } from '../types';
import { PRODUCT_CATEGORIES, PRODUCTS_DATA, STUDIO_INFO } from '../data/interiorData';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { Instagram, MessageCircle, Eye, Search, Filter, ArrowUpRight, Sparkles, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductsPageProps {
  onNavigate: (page: PageId) => void;
  onSelectServiceForInquiry?: (serviceTitle: string) => void;
}

type FilterTab = 'All' | ProductCategory;

export const ProductsPage: React.FC<ProductsPageProps> = ({ onNavigate, onSelectServiceForInquiry }) => {
  const [activeCategory, setActiveCategory] = useState<FilterTab>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const tabs: FilterTab[] = ['All', ...PRODUCT_CATEGORIES];

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollBy({
        left: direction === 'left' ? -220 : 220,
        behavior: 'smooth',
      });
    }
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.finish.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen py-10 sm:py-16 space-y-12">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EDE7DA] rounded-3xl p-8 sm:p-12 border border-[#DCD3C1] relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#D5CEBF] text-xs font-semibold uppercase tracking-wider text-[#8A6D47]">
              <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
              <span>Studio Showcase • @bharatdecor_mrt</span>
            </div>
            <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#1E2229] leading-tight">
              Interior Products & Material Catalog
            </h1>
            <p className="text-sm sm:text-base text-[#554E45] leading-relaxed max-w-2xl">
              Browse our complete collection of architectural charcoal louvers, 3D imported wallpapers, digital mica marble sheets, bespoke kitchen hardware, and luxury window draperies available in Meerut.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={STUDIO_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white text-xs font-semibold shadow-sm hover:opacity-95 transition-opacity"
              >
                <Instagram className="w-3.5 h-3.5 fill-white" />
                <span>Follow on Instagram (@bharatdecor_mrt)</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1E2229] hover:bg-[#2C333E] text-white text-xs font-semibold transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Book Showroom Sample Review</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="relative flex-1 min-w-0 flex items-center gap-1.5">
            <button
              onClick={() => scrollTabs('left')}
              className="hidden sm:flex shrink-0 w-7 h-7 rounded-full bg-white border border-[#DDD4C4] text-[#1E2229] hover:bg-[#FAF8F5] hover:border-[#C5A880] items-center justify-center shadow-xs transition-colors"
              title="Scroll Left"
              aria-label="Scroll categories left"
            >
              <ChevronLeft className="w-3.5 h-3.5 text-[#8A6D47]" />
            </button>

            <div
              ref={tabsContainerRef}
              className="flex-1 flex items-center gap-2 overflow-x-auto pb-3 pt-1 px-1 custom-horizontal-scrollbar scroll-smooth"
            >
              <div className="flex items-center gap-1.5 text-xs text-[#8A8174] mr-1 shrink-0 font-medium">
                <Filter className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="hidden sm:inline">Category:</span>
              </div>
              {tabs.map((tab) => {
                const isActive = activeCategory === tab;
                const count =
                  tab === 'All'
                    ? PRODUCTS_DATA.length
                    : PRODUCTS_DATA.filter((p) => p.category === tab).length;

                return (
                  <button
                    key={tab}
                    onClick={() => setActiveCategory(tab)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold tracking-wide shrink-0 transition-all ${
                      isActive
                        ? 'bg-[#1E2229] text-white shadow-sm'
                        : 'bg-white text-[#5D554B] border border-[#E0D7C8] hover:border-[#C5A880] hover:text-[#1E2229]'
                    }`}
                  >
                    <span>{tab}</span>
                    <span className={`ml-1.5 text-[11px] ${isActive ? 'text-[#C5A880]' : 'text-[#8A8174]'}`}>
                      ({count})
                    </span>
                  </button>
                );
              })}
              <div className="w-4 shrink-0" aria-hidden="true" />
            </div>

            <button
              onClick={() => scrollTabs('right')}
              className="hidden sm:flex shrink-0 w-7 h-7 rounded-full bg-white border border-[#DDD4C4] text-[#1E2229] hover:bg-[#FAF8F5] hover:border-[#C5A880] items-center justify-center shadow-xs transition-colors"
              title="Scroll Right"
              aria-label="Scroll categories right"
            >
              <ChevronRight className="w-3.5 h-3.5 text-[#8A6D47]" />
            </button>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px] sm:w-72">
            <Search className="w-4 h-4 text-[#8A8174] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by finish, material..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-white border border-[#E0D7C8] text-xs text-[#1E2229] placeholder-[#8A8174] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            />
          </div>
        </div>

        {/* Product Grid: 3 IN A ROW, CLEAN AND MINIMAL TEXT */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#EBE4D6]">
            <p className="text-sm text-[#554E45]">No products found matching your search.</p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-semibold text-[#8A6D47] underline underline-offset-4"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const encodedWhatsAppMsg = encodeURIComponent(
                `Hello Bharat Decor, I saw "${product.title}" (${product.category}) from your Instagram catalog (@bharatdecor_mrt) and would like pricing and sample availability for my home in Meerut.`
              );
              const whatsAppLink = `https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodedWhatsAppMsg}`;

              return (
                <div
                  key={product.id}
                  id={`product-item-${product.id}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#E4DDD0] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Clean Visual Header */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EFE9DF]">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Top Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="bg-[#1E2229]/85 backdrop-blur-md text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded shadow-sm">
                        {product.badge}
                      </span>
                    </div>

                    {/* Quick View Floating Button on Hover */}
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="absolute inset-x-4 bottom-3 py-2 px-3 rounded-lg bg-white/95 backdrop-blur-md text-[#1E2229] hover:bg-white text-xs font-semibold shadow-md flex items-center justify-center gap-1.5 opacity-90 group-hover:opacity-100 transition-all"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>Quick View Specs</span>
                    </button>
                  </div>

                  {/* Clean Minimal Card Content (No text clutter) */}
                  <div className="p-5 flex flex-col flex-1 justify-between space-y-3.5">
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-semibold text-[#8A6D47] uppercase tracking-wider block">
                        {product.category}
                      </span>
                      <h3
                        onClick={() => setSelectedProduct(product)}
                        className="font-serif-luxury text-lg font-bold text-[#1E2229] group-hover:text-[#8A6D47] transition-colors cursor-pointer line-clamp-1"
                      >
                        {product.title}
                      </h3>
                      <p className="text-xs text-[#6B6357] line-clamp-1">
                        Finish: {product.finish}
                      </p>
                    </div>

                    {/* Clean Action Buttons */}
                    <div className="pt-3 border-t border-[#F0EBE0] flex items-center gap-2">
                      <a
                        href={whatsAppLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-white bg-[#25D366] hover:bg-[#1EBE5D] transition-colors shadow-sm"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white" />
                        <span>WhatsApp Inquiry</span>
                      </a>

                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="p-2 rounded-lg border border-[#D5CEBF] text-[#1E2229] hover:bg-[#FAF9F6] transition-colors"
                        title="View Details"
                        aria-label="View Details"
                      >
                        <Eye className="w-4 h-4 text-[#8A6D47]" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onNavigate={onNavigate}
          onSelectServiceForInquiry={onSelectServiceForInquiry}
        />
      )}
    </div>
  );
};
