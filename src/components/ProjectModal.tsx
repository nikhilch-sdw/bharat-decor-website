import React from 'react';
import { PortfolioItem, PageId } from '../types';
import { X, MapPin, Calendar, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

interface ProjectModalProps {
  project: PortfolioItem | null;
  onClose: () => void;
  onNavigate: (page: PageId) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onNavigate }) => {
  if (!project) return null;

  const handleInquireThis = () => {
    onClose();
    onNavigate('contact');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#14171C]/80 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FAF9F6] rounded-xl shadow-2xl border border-[#E0D8CB] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#1E2229]/80 text-white hover:bg-[#1E2229] transition-colors shadow-md"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero image container */}
        <div className="relative w-full h-72 sm:h-96 shrink-0 bg-[#E0D8CB]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E2229]/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 bg-[#C5A880] text-[#1E2229] rounded-full mb-2">
              {project.category}
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white leading-tight">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Modal content body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Metadata badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-lg bg-white border border-[#E7E1D4]">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[#C5A880] shrink-0" />
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-[#8A8174]">Location</span>
                <span className="text-sm font-semibold text-[#1E2229]">{project.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-[#C5A880] shrink-0" />
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-[#8A8174]">Completion</span>
                <span className="text-sm font-semibold text-[#1E2229]">{project.year}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Layers className="w-4 h-4 text-[#C5A880] shrink-0" />
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-[#8A8174]">Scope</span>
                <span className="text-sm font-semibold text-[#1E2229] truncate">{project.scope}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-serif-luxury text-xl font-bold text-[#1E2229] mb-2">
              Architectural Concept & Execution
            </h3>
            <p className="text-[#554E45] leading-relaxed text-sm sm:text-base">
              {project.description}
            </p>
          </div>

          {/* Key Highlights */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#8A8174] font-bold mb-3">
              Key Features & Materials Selected
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-md bg-[#F4F1EA] border border-[#E8E2D7] text-xs font-medium text-[#2E2822]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-[#E7E1D4] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#7F766A]">
              Want a similar aesthetic for your Meerut residence or office?
            </p>
            <button
              id="modal-inquire-btn"
              onClick={handleInquireThis}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[#1E2229] text-white hover:bg-[#2F3642] text-sm font-medium transition-colors shadow-sm"
            >
              <span>Consult on This Design</span>
              <ArrowRight className="w-4 h-4 text-[#C5A880]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
