import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { STUDIO_INFO } from '../data/interiorData';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMessage = encodeURIComponent(
    'Hello Bharat Decor, I would like to book a free consultation for an interior project in Meerut.'
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="relative mb-3 bg-[#1E2229] text-white text-xs px-3.5 py-2 rounded-lg shadow-xl border border-[#C5A880]/40 flex items-center gap-2 max-w-xs animate-in fade-in slide-in-from-bottom-2">
          <span>
            💬 Need fast quotes or site visit? <strong className="text-[#C5A880]">WhatsApp Us!</strong>
          </span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-white/60 hover:text-white ml-1 p-0.5"
            aria-label="Close tooltip"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#1E2229] border-r border-b border-[#C5A880]/40 transform rotate-45" />
        </div>
      )}

      {/* Floating Action Button */}
      <a
        id="floating-whatsapp-btn"
        href={`https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white/60"
        aria-label="Direct WhatsApp Chat with Bharat Decor"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 group-hover:opacity-40" />
        <MessageCircle className="w-7 h-7 fill-white text-white relative z-10" />
      </a>
    </div>
  );
};
