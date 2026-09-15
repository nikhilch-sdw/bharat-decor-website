import React, { useState } from 'react';
import { ProductCategory, ProductItem, PageId } from '../types';
import { PRODUCT_CATEGORIES, PRODUCTS_DATA, STUDIO_INFO } from '../data/interiorData';
import { Instagram, MessageCircle, Eye, ArrowUpRight, ArrowRight, Filter } from 'lucide-react';

interface ProductCatalogSectionProps {
  onNavigate: (page: PageId) => void;
  onSelectProduct: (product: ProductItem) => void;
}

type FilterTab = 'All' | ProductCategory;

export const ProductCatalogSection: React.FC<ProductCatalogSectionProps> = ({
  onNavigate,
  onSelectProduct,
}) => {
  const [activeTab, setActiveTab] = useState<FilterTab>('All');

  const tabs: FilterTab[] = ['All', ...PRODUCT_CATEGORIES];

  const filteredProducts = activeTab === 'All'
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter((p) => p.category === activeTab);

  // STRICT REQUIREMENT: Only show max 6 products in a 3-in-a-row grid on home page
  const displayedProducts = filteredProducts.slice(0, 6);

  return (
    <section id="products-catalog-section" className="py-14 sm:py-20 bg-[#FAF8F4] border-y border-[#EBE4D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header with Instagram Branding */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE7DA] border border-[#D5CEBF] text-xs font-semibold uppercase tracking-wider text-[#8A6D47]">
              <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
              <span>Showcase • @bharatdecor_mrt</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E2229]">
              Curated Interior Products
            </h2>
            <p className="text-sm sm:text-base text-[#554E45] leading-relaxed">
              Explore fluted charcoal louvers, 3D textured wallpapers, digital mica sheets, and modular hardware directly from our client showcase.
            </p>
          </div>

          {/* Direct Instagram Profile Link Button */}
          <div className="shrink-0 flex items-center gap-3">
            <a
              id="instagram-profile-button"
              href={STUDIO_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white text-xs sm:text-sm font-semibold shadow-sm hover:opacity-95 transition-all"
            >
              <Instagram className="w-4 h-4 fill-white" />
              <span>@bharatdecor_mrt</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="border-b border-[#E2DAD0] pb-2">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <div className="flex items-center gap-1.5 text-xs text-[#8A8174] mr-1 shrink-0 font-medium">
              <Filter className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="hidden sm:inline">Categories:</span>
            </div>
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              const count = tab === 'All'
                ? PRODUCTS_DATA.length
                : PRODUCTS_DATA.filter((p) => p.category === tab).length;

              return (
                <button
                  key={tab}
                  id={`product-tab-${tab.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
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
          </div>
        </div>

        {/* Product Cards Grid (3 in a row, exactly max 6 items, minimal text) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProducts.map((product) => {
            const encodedWhatsAppMsg = encodeURIComponent(
              `Hello Bharat Decor, I saw "${product.title}" (${product.category}) from your Instagram (@bharatdecor_mrt) and would like more details and pricing.`
            );
            const whatsAppLink = `https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodedWhatsAppMsg}`;

            return (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className="group bg-white rounded-2xl overflow-hidden border border-[#E4DDD0] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Header */}
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

                  {/* Quick View Button on Hover */}
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="absolute inset-x-4 bottom-3 py-2 px-3 rounded-lg bg-white/95 backdrop-blur-md text-[#1E2229] hover:bg-white text-xs font-semibold shadow-md flex items-center justify-center gap-1.5 opacity-90 group-hover:opacity-100 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Quick View Specs</span>
                  </button>
                </div>

                {/* Card Body - Minimal & Clean (No text clutter) */}
                <div className="p-5 flex flex-col flex-1 justify-between space-y-3.5">
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-semibold text-[#8A6D47] uppercase tracking-wider block">
                      {product.category}
                    </span>

                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-serif-luxury text-lg font-bold text-[#1E2229] group-hover:text-[#8A6D47] transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.title}
                    </h3>

                    <p className="text-xs text-[#6B6357] line-clamp-1">
                      Finish: {product.finish}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-[#F0EBE0] flex items-center gap-2">
                    <a
                      id={`product-whatsapp-${product.id}`}
                      href={whatsAppLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-white bg-[#25D366] hover:bg-[#1EBE5D] transition-colors shadow-sm"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      <span>WhatsApp</span>
                    </a>

                    <button
                      onClick={() => onSelectProduct(product)}
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

        {/* View All Products Button Section */}
        <div className="text-center pt-4">
          <button
            id="view-all-products-btn"
            onClick={() => onNavigate('products')}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-[#1E2229] hover:bg-[#2C333E] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 group"
          >
            <span>View All Products ({PRODUCTS_DATA.length}+ items)</span>
            <ArrowRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
