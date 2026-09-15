import React from 'react';
import { PageId } from '../types';
import { STUDIO_INFO, PROCESS_STEPS } from '../data/interiorData';
import { Ruler, Box, ReceiptText, ShieldCheck, CheckCircle2, ArrowRight, Sparkles, MapPin, Award } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const valueCards = [
    {
      title: 'Free Site Measurement & Consultation',
      description: 'Zero-obligation on-site assessment across all Meerut localities with personalized recommendations directly from our senior interior consultants.',
      icon: Ruler,
    },
    {
      title: 'Photorealistic 3D Renderings',
      description: 'Visualize every single angle, material texture, and cove light reflection before spending a single rupee on construction.',
      icon: Box,
    },
    {
      title: 'Factory-Direct Transparent Pricing',
      description: 'Itemized BOQ with zero hidden costs. Direct partnerships with certified plywood, hardware, and wallpaper manufacturers.',
      icon: ReceiptText,
    },
    {
      title: 'Professional In-House Installation',
      description: 'Trained in-house craftsmen rather than random sub-contractors, backed by a 10-year hardware warranty and post-handover support.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="py-12 sm:py-16 space-y-20 sm:space-y-24">
      {/* 1. HEADER & STORY OF BHARAT DECOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-widest text-[#8A6D47] font-bold block mb-2">
            The Studio Story
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-[#1E2229] mb-6">
            Crafting Distinctive Living Spaces in Meerut
          </h1>
          <p className="text-base sm:text-lg text-[#554E45] leading-relaxed">
            Bharat Decor is a premier interior styling, modular woodwork, and architectural decor studio rooted on Roorkee Road, Meerut. We bridge the gap between aspirational architectural design and flawless physical execution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-[#4F473D] text-sm sm:text-base leading-relaxed">
            <p>
              Founded with the vision to bring metropolitan sophistication to Western Uttar Pradesh, Bharat Decor has evolved into a trusted benchmark for turnkey residential villas, high-end apartments, and executive offices across Meerut.
            </p>
            <p>
              Whether it is selecting the right imported vinyl wallpaper to create a dramatic feature wall, engineering a customized acrylic modular kitchen with German soft-close fittings, or crafting acoustic fluted charcoal paneling, every detail is treated with artisanal respect.
            </p>
            <div className="p-5 rounded-xl bg-white border border-[#E5DEC7] shadow-sm space-y-3">
              <h3 className="font-serif-luxury text-xl font-bold text-[#1E2229] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#C5A880]" />
                <span>Our Core Design Philosophy</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span><strong>Quality Materials:</strong> Marine ply & branded hardware</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                  <span><strong>Personalized Aesthetics:</strong> Tailored to your lifestyle</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                  <span><strong>Absolute Transparency:</strong> Detailed BOQ pricing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                  <span><strong>Timely Delivery:</strong> Firm completion schedule</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80"
                alt="Bharat Decor Studio Interior Work in Meerut"
                className="w-full h-96 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#1E2229] text-white p-5 rounded-xl shadow-lg max-w-xs border border-[#3E4552]">
              <div className="flex items-center gap-2 text-[#C5A880] text-xs font-bold uppercase mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Roorkee Road Studio</span>
              </div>
              <p className="text-xs text-[#E1DBD1]">
                84A, 1st Floor, Konark Colony. Visit our material studio to experience physical samples.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY CHOOSE US (4 VALUE CARDS) */}
      <section className="bg-[#F4F0E8] py-16 border-y border-[#E2D8C9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-[#8A6D47] font-bold block mb-2">
              Our Value Standard
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#1E2229]">
              Why Choose Bharat Decor?
            </h2>
            <p className="text-sm text-[#5D554B] mt-2">
              We eliminate the stress and guesswork from home renovation with structured engineering and accountable timelines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueCards.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 border border-[#E3DACB] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-[#FAF9F6] border border-[#E5DEC7] text-[#9F7E54] flex items-center justify-center mb-5">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif-luxury text-lg font-bold text-[#1E2229] mb-2">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[#5D554B] leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#F0EBE0] text-[11px] text-[#8C8378] font-medium">
                    Bharat Decor Quality Standard
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. OUR WORKING PROCESS (4-STEP TIMELINE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-[#8A6D47] font-bold block mb-2">
            Seamless Execution
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#1E2229]">
            Our 4-Step Working Process
          </h2>
          <p className="text-sm text-[#5D554B] mt-2">
            From initial site measurement on Roorkee Road to your sparkling clean handover in 45 days.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 border border-[#E7E1D4] shadow-sm relative flex flex-col justify-between group hover:border-[#C5A880] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif-luxury text-3xl font-bold text-[#C5A880]">
                    {step.step}
                  </span>
                  <span className="text-[11px] font-semibold text-[#8C8378] bg-[#FAF9F6] border border-[#E7E1D4] px-2.5 py-0.5 rounded-full">
                    {step.timeframe}
                  </span>
                </div>

                <h3 className="font-serif-luxury text-lg font-bold text-[#1E2229] mb-1">
                  {step.title}
                </h3>
                <span className="text-xs font-semibold text-[#9F7E54] block mb-3">
                  {step.subtitle}
                </span>
                <p className="text-xs text-[#5D554B] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#F2EDE2] flex items-center justify-between text-[11px] text-[#7A7165]">
                <span>Phase {step.step}</span>
                <span className="text-[#C5A880] font-medium">Step-by-step Quality Check</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to start the journey */}
        <div className="mt-14 text-center">
          <button
            id="about-start-consultation-btn"
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-md text-sm font-semibold text-white bg-[#1E2229] hover:bg-[#2C333E] shadow-md transition-all hover:shadow-lg"
          >
            <span>Start Step 1: Book Free Consultation</span>
            <ArrowRight className="w-4 h-4 text-[#C5A880]" />
          </button>
        </div>
      </section>
    </div>
  );
};
