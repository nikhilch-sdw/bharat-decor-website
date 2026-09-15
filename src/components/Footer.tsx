import React from 'react';
import { PageId } from '../types';
import { STUDIO_INFO, SERVICES_DATA } from '../data/interiorData';
import { MapPin, Phone, Mail, Instagram, MessageCircle, Clock, Shield, ArrowRight } from 'lucide-react';
import { BharatDecorLogo } from './BharatDecorLogo';

interface FooterProps {
  onNavigate: (page: PageId, serviceId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#181B20] text-[#E5E0D8] border-t border-[#2D323A] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4">
            <button
              onClick={() => onNavigate('home')}
              className="text-left focus:outline-none transition-transform hover:scale-[1.02] active:scale-[0.98]"
              aria-label="Bharat Decor Home"
            >
              <BharatDecorLogo className="h-10" theme="dark" />
            </button>

            <p className="text-sm text-[#A69B8D] leading-relaxed pt-2">
              Transforming residential villas, luxury apartments, and corporate offices across Meerut with bespoke turnkey execution, premium materials, and timeless aesthetic restraint.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${STUDIO_INFO.whatsappNumber}?text=Hello%20Bharat%20Decor%2C%20I%20would%20like%20to%20inquire%20about%20interior%20services%20in%20Meerut.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#262B33] hover:bg-[#25D366] text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={STUDIO_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#262B33] hover:bg-[#E1306C] text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`tel:${STUDIO_INFO.phone}`}
                className="w-9 h-9 rounded-full bg-[#262B33] hover:bg-[#C5A880] text-white flex items-center justify-center transition-colors"
                aria-label="Phone Call"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="font-serif-luxury text-lg text-white font-semibold mb-5 pb-2 border-b border-[#2E343E] inline-block">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  id="footer-link-home"
                  onClick={() => onNavigate('home')}
                  className="text-[#A69B8D] hover:text-[#C5A880] transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Home Page</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-about"
                  onClick={() => onNavigate('about')}
                  className="text-[#A69B8D] hover:text-[#C5A880] transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>About Our Studio</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-services"
                  onClick={() => onNavigate('services')}
                  className="text-[#A69B8D] hover:text-[#C5A880] transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>All Interior Services</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-products"
                  onClick={() => onNavigate('products')}
                  className="text-[#A69B8D] hover:text-[#C5A880] transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Products Catalog</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-portfolio"
                  onClick={() => onNavigate('portfolio')}
                  className="text-[#A69B8D] hover:text-[#C5A880] transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Projects Gallery</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-contact"
                  onClick={() => onNavigate('contact')}
                  className="text-[#A69B8D] hover:text-[#C5A880] transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Contact & Book Consultation</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Specialized Services */}
          <div>
            <h4 className="font-serif-luxury text-lg text-white font-semibold mb-5 pb-2 border-b border-[#2E343E] inline-block">
              Our Core Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {SERVICES_DATA.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <button
                    id={`footer-service-${service.id}`}
                    onClick={() => onNavigate('services', service.id)}
                    className="text-[#A69B8D] hover:text-[#C5A880] transition-colors text-left truncate max-w-xs block"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
              <li>
                <button
                  id="footer-service-all"
                  onClick={() => onNavigate('services')}
                  className="text-[#C5A880] hover:underline text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1 mt-1"
                >
                  <span>Explore All Capabilities</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Studio Info */}
          <div>
            <h4 className="font-serif-luxury text-lg text-white font-semibold mb-5 pb-2 border-b border-[#2E343E] inline-block">
              Meerut Studio
            </h4>
            <ul className="space-y-3.5 text-sm text-[#A69B8D]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-1" />
                <span>{STUDIO_INFO.location}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a href={`tel:${STUDIO_INFO.phone}`} className="hover:text-white transition-colors">
                  {STUDIO_INFO.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a
                  href={STUDIO_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {STUDIO_INFO.instagram}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>{STUDIO_INFO.hours}</span>
              </li>
              <li className="flex items-center gap-2.5 pt-1">
                <Shield className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span className="text-xs text-[#FAF9F6]/80">{STUDIO_INFO.warrantyYears}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#262B33] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7E7569]">
          <p>© {new Date().getFullYear()} Bharat Decor. All rights reserved. Interior Design & Architectural Styling Studio.</p>
          <div className="flex items-center space-x-6">
            <span>Roorkee Road, Meerut, UP</span>
            <span>•</span>
            <span>Turnkey Residential & Commercial</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
