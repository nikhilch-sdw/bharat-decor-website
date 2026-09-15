import React from 'react';
import { PageId } from '../types';
import { STUDIO_INFO, PROCESS_STEPS, QUICK_STATS } from '../data/interiorData';
import {
  Ruler,
  Box,
  ReceiptText,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MapPin,
  Award,
  Clock,
  Phone,
  MessageCircle,
  Instagram,
  Compass,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const valueCards = [
    {
      title: 'Free Laser Site Measurement',
      tagline: 'All Meerut Localities Covered',
      description:
        'Zero-obligation on-site spatial survey with millimeter-accurate digital lasers, led by senior interior project heads from our Roorkee Road studio.',
      icon: Ruler,
      metric: '100% Free',
    },
    {
      title: 'Photorealistic 3D Architectural Renders',
      tagline: 'Zero Guesswork Before Execution',
      description:
        'Visualize every light cove, wallpaper texture, and veneer shade in photorealistic 4K before procuring a single square foot of material.',
      icon: Box,
      metric: '3D Preview',
    },
    {
      title: 'Itemized BOQ & Direct Factory Sourcing',
      tagline: 'Transparent Pricing Guarantee',
      description:
        'Detailed line-by-line Bill of Quantities with zero hidden charges. Direct wholesale tie-ups with certified marine ply and hardware manufacturers.',
      icon: ReceiptText,
      metric: 'Zero Surprises',
    },
    {
      title: '10-Year Warranty & In-House Artisans',
      tagline: 'Trained Craftsmen, No Subcontractors',
      description:
        'Every installation is executed by our full-time carpenters, polishers, and wallpaper masters, backed by our 10-year hardware warranty.',
      icon: ShieldCheck,
      metric: '10-Yr Warranty',
    },
  ];

  const materialExperiences = [
    {
      title: 'Charcoal & WPC Louver Displays',
      description: 'Touch and compare fluted profiles in 12mm, 18mm & 24mm depths across smoked walnut, matte charcoal, and brushed champagne.',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
      badge: 'Physical Samples',
    },
    {
      title: '1,200+ Imported Wallpaper Books',
      description: 'Flip through luxury European non-woven rolls, deep embossed textures, metallic gold foils, and damp-proof vinyl wallpapers.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      badge: 'Catalog Library',
    },
    {
      title: 'Precision Modular Kitchen Joinery',
      description: 'Test genuine Hafele and Blum soft-close tandem drawers, hydraulic bi-fold lift-ups, and anti-scratch acrylic shutter mockups.',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
      badge: 'Live Mockup',
    },
    {
      title: 'COVE Lighting & False Ceiling Panels',
      description: 'Experience 3000K warm architectural illumination, concealed profile channels, and Saint-Gobain gypsum ceiling assemblies.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      badge: 'Lighting Lab',
    },
  ];

  const processStages = [
    {
      step: '01',
      title: 'Site Laser Survey & Discovery',
      subtitle: 'Day 1 - 2 • Free In-Home Visit',
      desc: 'Our lead consultant visits your site in Meerut to record laser measurements, assess natural lighting, and understand your lifestyle requirements.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
    },
    {
      step: '02',
      title: '3D Render & Material Selection',
      subtitle: 'Day 3 - 5 • Studio Consultation',
      desc: 'Review custom 3D views at our Roorkee Road studio while touching real wallpaper, louver swatches, and hardware before final sign-off.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
    },
    {
      step: '03',
      title: 'Precision Joinery & Fabrication',
      subtitle: 'Day 6 - 35 • Workshop Preparation',
      desc: 'BWP marine ply carcasses, edge-banding, and custom wall elements are factory-crafted to eliminate site mess and accelerate installation.',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
    },
    {
      step: '04',
      title: 'Master Installation & Handover',
      subtitle: 'Day 36 - 45 • Guaranteed Handover',
      desc: 'Laser-aligned installation by certified in-house artisans, followed by a multi-point quality audit, deep cleaning, and 10-year warranty delivery.',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="py-12 sm:py-16 space-y-16 sm:space-y-24">
      {/* 1. HERO & STUDIO STORY WITH ARCHITECTURAL BENTO PHOTO GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Narrative Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE7DA] border border-[#D5CEBF] text-xs font-semibold uppercase tracking-wider text-[#8A6D47]">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Studio Heritage • Roorkee Road, Meerut</span>
            </div>

            <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#1E2229] leading-tight">
              Bridging Refined Architecture with Artisanal Execution
            </h1>

            <p className="text-base sm:text-lg text-[#554E45] leading-relaxed">
              Bharat Decor was founded on Roorkee Road with a clear standard: to bring bespoke residential luxury, factory-precision woodwork, and curated architectural decor to Meerut without the delays and compromises of unorganized contractors.
            </p>

            <p className="text-sm text-[#665D52] leading-relaxed">
              From full turnkey villa transformations in Shastri Nagar and Modipuram to bespoke fluted charcoal feature walls in Saket, our in-house craftsmen, modular joinery technicians, and 3D visualizers handle your space from initial laser measure to handover.
            </p>

            {/* Quick Guarantees Pill Matrix */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white border border-[#E5DEC7] shadow-sm flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FAF8F3] text-[#8A6D47] flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1E2229]">350+ Homes Handed Over</div>
                  <div className="text-[11px] text-[#7A7165]">Across Meerut & NCR</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#E5DEC7] shadow-sm flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FAF8F3] text-[#8A6D47] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1E2229]">10-Year Warranty</div>
                  <div className="text-[11px] text-[#7A7165]">Hardware & Termite-Proof</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1E2229] hover:bg-[#2C333E] text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition-all"
              >
                <span>Book Free Site Measurement</span>
                <ArrowRight className="w-4 h-4 text-[#C5A880]" />
              </button>

              <a
                href={STUDIO_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[#D5CEBF] bg-white text-[#1E2229] hover:bg-[#FAF9F6] text-xs sm:text-sm font-semibold transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#E1306C]" />
                <span>@bharatdecor_mrt</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#8A8174]" />
              </a>
            </div>
          </div>

          {/* Architectural Bento Photo Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 relative">
            {/* Primary Large Image */}
            <div className="col-span-2 relative h-72 sm:h-80 rounded-2xl overflow-hidden shadow-lg border border-[#E0D8C8] group">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                alt="Bharat Decor Luxury Interior Living Room in Meerut"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E2229]/80 via-[#1E2229]/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <div>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-[#C5A880] block">
                    Turnkey Living Lounge
                  </span>
                  <span className="text-sm sm:text-base font-serif-luxury font-bold">
                    The Ivory Residence • Meerut
                  </span>
                </div>
                <span className="text-xs bg-[#1E2229]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  Completed 2025
                </span>
              </div>
            </div>

            {/* Bottom-left Photo */}
            <div className="relative h-44 rounded-xl overflow-hidden shadow-md border border-[#E0D8C8] group">
              <img
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80"
                alt="Fluted Charcoal Louvers Craft"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-2.5 left-3 text-xs font-semibold text-white">
                Fluted Charcoal & Louvers
              </span>
            </div>

            {/* Bottom-right Photo */}
            <div className="relative h-44 rounded-xl overflow-hidden shadow-md border border-[#E0D8C8] group">
              <img
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80"
                alt="Modular Kitchen Fabrication"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-2.5 left-3 text-xs font-semibold text-white">
                German Modular Joinery
              </span>
            </div>

            {/* Floating Location Badge */}
            <div className="absolute -bottom-4 sm:-bottom-6 left-1/2 -translate-x-1/2 bg-[#1E2229] text-white px-4 py-2.5 rounded-full shadow-xl border border-[#3E4552] flex items-center gap-2 text-xs whitespace-nowrap z-10">
              <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Studio: 84A, Konark Colony, Roorkee Rd, Meerut</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] rounded-2xl p-6 sm:p-8 border border-[#E5DEC7] shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {QUICK_STATS.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#1E2229]">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-[#8A6D47] uppercase tracking-wider">
                  {stat.label}
                </div>
                <div className="text-[11px] text-[#6B6357]">
                  {stat.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE BHARAT DECOR (4 VALUE CARDS WITH METRICS) */}
      <section className="bg-[#F3EFE7] py-16 sm:py-20 border-y border-[#E2D8C9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#8A6D47] font-bold block">
              The Bharat Decor Standard
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#1E2229]">
              Why Homeowners in Meerut Choose Us
            </h2>
            <p className="text-sm text-[#5D554B]">
              We eliminate the uncertainty, budget blowouts, and endless delays of unorganized contractors with engineered processes and written commitments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueCards.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-[#E2D9CA] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-[#FAF8F3] border border-[#E8E1D2] text-[#8A6D47] flex items-center justify-center group-hover:bg-[#1E2229] group-hover:text-[#C5A880] transition-colors">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-[#FAF8F3] border border-[#E8E1D2] text-[#8A6D47]">
                        {card.metric}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif-luxury text-lg font-bold text-[#1E2229] mb-1">
                        {card.title}
                      </h3>
                      <span className="text-[11px] font-semibold text-[#9F7E54] block mb-2">
                        {card.tagline}
                      </span>
                      <p className="text-xs text-[#5D554B] leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#F2ECE1] flex items-center gap-1.5 text-[11px] text-[#7A7165]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Guaranteed Studio Standard</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. SHOWROOM & MATERIAL EXPERIENCE LAB (REAL SAMPLES TO TOUCH) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8A6D47] font-bold block mb-2">
              Physical Material Studio
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#1E2229]">
              Experience Real Textures Before Ordering
            </h2>
            <p className="text-sm text-[#665D52] mt-1 max-w-xl">
              Don't choose your home materials from tiny screen mockups. Visit our Roorkee Road studio to touch physical finishes, test soft-close drawer movements, and inspect warm LED cove temperatures.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1E2229] hover:bg-[#2C333E] text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <span>Schedule Showroom Walkthrough</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
            </button>
          </div>
        </div>

        {/* 4 Visual Material Showcase Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {materialExperiences.map((mat, mIdx) => (
            <div
              key={mIdx}
              className="bg-white rounded-2xl overflow-hidden border border-[#E5DEC7] shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden bg-[#EDE8DE]">
                <img
                  src={mat.image}
                  alt={mat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#1E2229]/80 backdrop-blur-md text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded">
                  {mat.badge}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h4 className="font-serif-luxury text-base font-bold text-[#1E2229] mb-1 group-hover:text-[#8A6D47] transition-colors">
                    {mat.title}
                  </h4>
                  <p className="text-xs text-[#5D554B] leading-relaxed">
                    {mat.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F2EDE2] text-[11px] font-medium text-[#8A6D47] flex items-center gap-1">
                  <span>Available in Showroom</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 4-STEP WORKING PROCESS WITH STAGE IMAGERY */}
      <section className="bg-[#FAF8F4] py-16 sm:py-20 border-y border-[#E8E1D2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#8A6D47] font-bold block">
              Transparent Execution Blueprint
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#1E2229]">
              How Your Project Moves from Vision to Reality
            </h2>
            <p className="text-sm text-[#5D554B]">
              Our proven 4-stage handover system ensures guaranteed deadlines, milestone approvals, and zero unexpected budget adjustments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processStages.map((stage, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden border border-[#E3DACB] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                {/* Visual Thumbnail */}
                <div className="relative h-40 overflow-hidden bg-[#EDE8DE]">
                  <img
                    src={stage.image}
                    alt={stage.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 bg-[#1E2229]/90 backdrop-blur-md text-[#C5A880] border border-[#C5A880]/30 font-mono text-xs font-bold px-2.5 py-0.5 rounded-full">
                    Stage {stage.step}
                  </div>
                  <div className="absolute bottom-2.5 left-3 right-3 text-white text-[11px] font-medium">
                    {stage.subtitle}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-serif-luxury text-base font-bold text-[#1E2229] mb-1">
                      {stage.title}
                    </h3>
                    <p className="text-xs text-[#5D554B] leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#F2ECE1] flex items-center justify-between text-[11px] text-[#7A7165]">
                    <span>Quality Sign-off</span>
                    <span className="text-[#8A6D47] font-semibold">Stage {stage.step} OK</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="text-center pt-4">
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-[#1E2229] hover:bg-[#2C333E] shadow-sm hover:shadow-md transition-all group"
            >
              <span>Start Stage 1: Book Free Site Measurement</span>
              <ArrowRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. VISIT OUR ROORKEE ROAD SHOWROOM CARD (HIGH UTILITY) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1E2229] text-white rounded-3xl p-8 sm:p-12 border border-[#3E4552] relative overflow-hidden shadow-xl">
          {/* Subtle Background Accent */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#C5A880] text-xs font-semibold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>Visit Us in Meerut</span>
              </div>

              <h3 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-white leading-tight">
                Walk into Our Roorkee Road Studio
              </h3>

              <p className="text-sm sm:text-base text-[#D0C8BD] leading-relaxed">
                Whether you're beginning construction on a new bungalow or upgrading your living room wall, our interior architects are ready to guide you through material combinations, layout planning, and 3D visual concepts.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="space-y-1">
                  <span className="text-[#A69B8D] uppercase tracking-wider font-semibold block text-[10px]">
                    Studio Address:
                  </span>
                  <p className="text-white font-medium">
                    84A, 1st Floor, Konark Colony, Roorkee Road, Meerut, UP
                  </p>
                  <p className="text-[#C5A880] text-[11px]">Landmark: Opposite Konark Colony Main Gate</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[#A69B8D] uppercase tracking-wider font-semibold block text-[10px]">
                    Working Hours:
                  </span>
                  <p className="text-white font-medium">
                    Monday - Saturday: 10:00 AM - 8:00 PM
                  </p>
                  <p className="text-[#A69B8D]">Sunday: By Prior Appointment</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <a
                href={`https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodeURIComponent(
                  'Hello Bharat Decor, I would like to plan a visit to your Roorkee Road studio to view physical samples and discuss interior work.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat for Showroom Directions</span>
              </a>

              <a
                href={`tel:${STUDIO_INFO.phone}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/15 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C5A880]" />
                <span>Call Studio: {STUDIO_INFO.phoneDisplay}</span>
              </a>

              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#C5A880] hover:bg-[#B39366] text-[#1E2229] text-xs sm:text-sm font-semibold transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                <span>Request Free Site Measurement</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
