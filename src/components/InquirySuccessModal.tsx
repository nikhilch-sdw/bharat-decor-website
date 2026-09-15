import React from 'react';
import { InquirySubmission } from '../types';
import { Check, MessageCircle, Phone, X } from 'lucide-react';
import { STUDIO_INFO } from '../data/interiorData';

interface InquirySuccessModalProps {
  submission: InquirySubmission | null;
  onClose: () => void;
}

export const InquirySuccessModal: React.FC<InquirySuccessModalProps> = ({ submission, onClose }) => {
  if (!submission) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello Bharat Decor! I just booked a site consultation online.\nRef: ${submission.referenceId}\nName: ${submission.fullName}\nService: ${submission.serviceNeeded}\nProperty: ${submission.propertyType}\nPhone: ${submission.phoneNumber}`
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#14171C]/80 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#FAF9F6] rounded-xl shadow-2xl border border-[#DCD3C3] p-6 sm:p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#8C8378] hover:text-[#1E2229] hover:bg-[#EFEAE1] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-full bg-[#EDE7DA] border-2 border-[#C5A880] text-[#8E714B] mx-auto flex items-center justify-center mb-5 shadow-sm">
          <Check className="w-8 h-8 stroke-[2.5]" />
        </div>

        <span className="inline-block text-xs uppercase tracking-widest text-[#8E714B] font-bold px-3 py-1 bg-[#EDE7DA] rounded-full mb-2">
          Consultation Request Confirmed
        </span>

        <h3 className="font-serif-luxury text-2xl font-bold text-[#1E2229] mb-2">
          Thank You, {submission.fullName}!
        </h3>

        <p className="text-sm text-[#5D554B] mb-6">
          Your inquiry has been logged. Our design director will call you within 2 business hours to schedule the complimentary site visit.
        </p>

        {/* Reference details box */}
        <div className="bg-white rounded-lg p-4 border border-[#E5DEC7] text-left text-xs sm:text-sm space-y-2 mb-6">
          <div className="flex justify-between pb-2 border-b border-[#F0EBE0]">
            <span className="text-[#877E73]">Booking Reference:</span>
            <span className="font-mono font-bold text-[#1E2229]">{submission.referenceId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#877E73]">Service Requested:</span>
            <span className="font-medium text-[#1E2229]">{submission.serviceNeeded}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#877E73]">Property Type:</span>
            <span className="font-medium text-[#1E2229]">{submission.propertyType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#877E73]">Contact Number:</span>
            <span className="font-medium text-[#1E2229]">{submission.phoneNumber}</span>
          </div>
        </div>

        {/* Priority Actions */}
        <div className="space-y-3">
          <a
            href={`https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20bd5a] transition-all shadow-md hover:shadow-lg"
          >
            <MessageCircle className="w-4 h-4 fill-white text-white" />
            <span>Connect on WhatsApp for Priority Response</span>
          </a>

          <div className="flex gap-2">
            <a
              href={`tel:${STUDIO_INFO.phone}`}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-md text-xs font-medium text-[#1E2229] border border-[#D5CEBF] bg-white hover:bg-[#F5F2EC] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Call Us Direct</span>
            </a>
            <button
              onClick={onClose}
              className="flex-1 py-2.5 px-3 rounded-md text-xs font-medium text-[#5D554B] bg-[#EAE4D8] hover:bg-[#E0D9CB] transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
