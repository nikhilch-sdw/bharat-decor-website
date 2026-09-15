import React from 'react';
import { ProductItem, PageId } from '../types';
import { STUDIO_INFO } from '../data/interiorData';
import { X, MessageCircle, Sparkles, CheckCircle2, Instagram, Layers, ShieldCheck, ArrowRight } from 'lucide-react';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onNavigate: (page: PageId) => void;
  onSelectServiceForInquiry?: (serviceTitle: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onNavigate,
  onSelectServiceForInquiry,
}) => {
  if (!product) return null;

  const encodedWhatsAppMsg = encodeURIComponent(
    `Hello Bharat Decor, I saw "${product.title}" (${product.category}) from your Instagram (@bharatdecor_mrt) and would like pricing and sample availability for my space in Meerut.`
  );
  const whatsAppLink = `https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodedWhatsAppMsg}`;

  const handleBookVisit = () => {
    if (onSelectServiceForInquiry) {
      onSelectServiceForInquiry(product.title);
    }
    onClose();
    onNavigate('contact');
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[#12151B]/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#E8E1D2] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-[#1E2229] border border-[#E2DAD0] shadow-sm transition-transform hover:scale-105"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Image Column */}
          <div className="md:col-span-5 relative min-h-[260px] md:min-h-[440px] bg-[#EDE8DE]">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 bg-[#1E2229]/90 text-white text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded">
              {product.badge}
            </div>
            <a
              href={STUDIO_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-[#1E2229] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#E2DAD0] hover:text-[#C5A880] transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
              <span>{product.instagramHandle || '@bharatdecor_mrt'}</span>
            </a>
          </div>

          {/* Details Column */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold text-[#8A6D47] uppercase tracking-wider">
                  {product.category}
                </span>
                <h3 className="font-serif-luxury text-2xl font-bold text-[#1E2229] mt-1">
                  {product.title}
                </h3>
              </div>

              <p className="text-sm text-[#554E45] leading-relaxed">
                {product.description}
              </p>

              {/* Material & Finish Info */}
              <div className="bg-[#FAF8F3] rounded-xl p-3.5 border border-[#EDE7DB] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#8A8174] font-medium block">Base Material:</span>
                  <span className="font-semibold text-[#1E2229]">{product.material}</span>
                </div>
                <div>
                  <span className="text-[#8A8174] font-medium block">Surface Finish:</span>
                  <span className="font-semibold text-[#1E2229]">{product.finish}</span>
                </div>
              </div>

              {/* Ideal Applications */}
              <div className="text-xs text-[#5D554B]">
                <strong className="text-[#1E2229]">Recommended For:</strong> {product.idealFor}
              </div>

              {/* Technical Specifications */}
              <div className="space-y-2 pt-1">
                <span className="text-xs uppercase tracking-wider text-[#8A8174] font-bold block">
                  Product Specifications:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-xs text-[#383129]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-5 border-t border-[#F0EBE0] flex flex-col sm:flex-row items-center gap-3">
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md text-sm font-semibold text-white bg-[#25D366] hover:bg-[#1EBE5D] transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Inquire on WhatsApp</span>
              </a>

              <button
                onClick={handleBookVisit}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md text-sm font-semibold text-[#1E2229] bg-[#EDE7DA] hover:bg-[#E2D9C8] border border-[#D5CEBF] transition-colors"
              >
                <Sparkles className="w-4 h-4 text-[#8A6D47]" />
                <span>Book Free Site Visit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
