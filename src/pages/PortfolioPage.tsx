import React, { useState } from 'react';
import { PageId, PortfolioItem, InteriorCategory } from '../types';
import { PORTFOLIO_DATA, CATEGORIES_LIST } from '../data/interiorData';
import { MapPin, Eye, ArrowUpRight, Sparkles, Filter } from 'lucide-react';

interface PortfolioPageProps {
  onNavigate: (page: PageId) => void;
  onOpenProjectModal: (project: PortfolioItem) => void;
}

type FilterCategory = 'All' | InteriorCategory;

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onOpenProjectModal, onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');

  const categories: FilterCategory[] = [
    'All',
    ...CATEGORIES_LIST,
  ];

  const filteredProjects = activeCategory === 'All'
    ? PORTFOLIO_DATA
    : PORTFOLIO_DATA.filter((p) => p.category === activeCategory);

  return (
    <div className="py-12 sm:py-16 space-y-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-widest text-[#8A6D47] font-bold block mb-2">
            Completed Projects Showcase
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-[#1E2229] mb-4">
            Interior Design & Decor Portfolio
          </h1>
          <p className="text-base sm:text-lg text-[#554E45] leading-relaxed">
            Explore a curated selection of bespoke residences, modular kitchens, fluted wall accents, and luxury bedrooms designed and delivered across Meerut.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none border-b border-[#E5DEC7]">
          <div className="flex items-center gap-1.5 text-xs text-[#8A8174] mr-2 shrink-0 font-medium">
            <Filter className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Filter By:</span>
          </div>
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                id={`filter-tab-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-[#1E2229] text-white shadow-sm'
                    : 'bg-white text-[#5D554B] border border-[#E0D7C8] hover:border-[#C5A880] hover:text-[#1E2229]'
                }`}
              >
                {cat}
                {cat === 'All' && ` (${PORTFOLIO_DATA.length})`}
                {cat !== 'All' &&
                  ` (${PORTFOLIO_DATA.filter((p) => p.category === cat).length})`}
              </button>
            );
          })}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl overflow-hidden border border-[#E4DCD0] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image with zoom on hover */}
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
                <div className="absolute inset-0 bg-[#1E2229]/20 group-hover:bg-[#1E2229]/40 transition-colors" />

                {/* Badges */}
                <div className="absolute top-3 left-3 bg-[#1E2229]/80 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                  {project.category}
                </div>

                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-2 rounded-full bg-white text-[#1E2229] shadow-md">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>

                {/* Location indicator */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white bg-[#1E2229]/70 backdrop-blur-sm px-2.5 py-1 rounded">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>{project.location}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#8C8378] mb-1">
                    <span className="uppercase font-semibold tracking-wider">{project.scope}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="font-serif-luxury text-xl font-bold text-[#1E2229] group-hover:text-[#9F7E54] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#5D554B] mt-2 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F2ECE2] flex items-center justify-between">
                  <span className="text-[11px] text-[#8C8378]">
                    {project.highlights.length} design features
                  </span>
                  <button
                    id={`view-details-${project.id}`}
                    onClick={() => onOpenProjectModal(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E2229] hover:text-[#9F7E54] group-hover:translate-x-0.5 transition-all"
                  >
                    <span>View Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Consultation strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="rounded-2xl p-8 bg-[#FAF6EE] border border-[#E5DEC7] text-center max-w-3xl mx-auto space-y-4">
          <div className="w-10 h-10 rounded-full bg-[#EDE7DA] text-[#9F7E54] flex items-center justify-center mx-auto">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-serif-luxury text-2xl font-bold text-[#1E2229]">
            Love one of these interior aesthetics?
          </h3>
          <p className="text-sm text-[#5D554B]">
            We can customize the materials, layouts, and colors to match your exact floor plan and budget anywhere in Meerut.
          </p>
          <div>
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-semibold text-white bg-[#1E2229] hover:bg-[#2F3642] transition-colors shadow-sm"
            >
              <span>Book Design Consultation</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
