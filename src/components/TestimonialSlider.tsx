import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ReviewItem } from '../types';
import { Star, ChevronLeft, ChevronRight, Quote, MapPin, CheckCircle2, Pause, Play, Sparkles } from 'lucide-react';

interface TestimonialSliderProps {
  reviews: ReviewItem[];
}

const AUTO_SLIDE_INTERVAL = 5000; // 5 seconds per slide

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ reviews }) => {
  // Group into pairs for exactly 2 equal boxes in a row on desktop
  const pairs: ReviewItem[][] = [];
  for (let i = 0; i < reviews.length; i += 2) {
    pairs.push(reviews.slice(i, i + 2));
  }

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const totalSlides = pairs.length;
  
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  const goToSlide = (idx: number) => {
    setActiveSlide(idx);
    setProgress(0);
  };

  // Auto Slider Timer & Progress Animation
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      return;
    }

    const stepMs = 50;
    const progressIncrement = (stepMs / AUTO_SLIDE_INTERVAL) * 100;

    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + progressIncrement;
      });
    }, stepMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isPaused, nextSlide]);

  const currentPair = pairs[activeSlide] || [];

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header Bar with Auto-play indicator, Slide counter, and Navigation Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EDE6D8] border border-[#D8CEBD] text-xs font-semibold uppercase tracking-wider text-[#8A6D47] mb-2.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Verified Client Stories • Meerut</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#1E2229]">
            What Homeowners in Meerut Say
          </h2>
          <p className="text-sm text-[#5D554B] mt-1 max-w-xl">
            Real feedback and photos from residents across Shastri Nagar, Roorkee Road, Saket, and Pallavpuram who trusted Bharat Decor.
          </p>
        </div>

        {/* Controls: Auto-slide Status + Prev / Next Arrows */}
        <div className="flex items-center gap-3 self-start sm:self-end">
          {/* Subtle auto-play / pause indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#E7E1D4] text-[11px] font-medium text-[#7A7165]">
            {isPaused ? (
              <>
                <Pause className="w-3 h-3 text-[#C5A880]" />
                <span className="hidden sm:inline text-[#8A6D47]">Paused on Hover</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-[#C5A880] animate-pulse" />
                <span className="hidden sm:inline text-[#554E45]">Auto Sliding</span>
              </>
            )}
          </div>

          {/* Slide Number */}
          <span className="text-xs font-mono text-[#8C8378] tracking-widest bg-[#FAF8F5] px-3 py-1.5 rounded-lg border border-[#E7E1D4]">
            0{activeSlide + 1} / 0{totalSlides}
          </span>

          {/* Arrow Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              id="testimonial-prev-btn"
              onClick={prevSlide}
              aria-label="Previous testimonials"
              className="w-10 h-10 rounded-full bg-white border border-[#D5CEBF] hover:border-[#1E2229] hover:bg-[#1E2229] hover:text-white text-[#1E2229] flex items-center justify-center transition-all shadow-xs active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              id="testimonial-next-btn"
              onClick={nextSlide}
              aria-label="Next testimonials"
              className="w-10 h-10 rounded-full bg-white border border-[#D5CEBF] hover:border-[#1E2229] hover:bg-[#1E2229] hover:text-white text-[#1E2229] flex items-center justify-center transition-all shadow-xs active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar for Auto Slider */}
      <div className="w-full bg-[#EAE2D4] h-1 rounded-full mb-6 overflow-hidden">
        <div
          className="bg-gradient-to-r from-[#C5A880] to-[#8A6D47] h-full transition-all duration-75 ease-linear rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Two Equal Boxes in a Row Slider Container with Locked Fixed Height */}
      <div className="relative min-h-[480px] sm:min-h-[290px]">
        <div
          key={activeSlide}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-7 items-stretch animate-fadeIn"
        >
          {currentPair.map((review) => (
            <div
              key={review.id}
              className="group relative bg-white rounded-2xl overflow-hidden border border-[#E5DEC7] hover:border-[#C5A880] shadow-sm hover:shadow-2xl hover:shadow-[#C5A880]/15 transition-all duration-500 ease-out flex flex-col sm:flex-row items-stretch h-auto sm:h-[290px] hover:-translate-y-1.5 cursor-pointer"
            >
              {/* Golden Top Shimmer Bar on Hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C5A880] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

              {/* LEFT SIDE: Architectural Interior Image (Fixed 44% width, 100% card height) */}
              <div className="relative w-full sm:w-[44%] h-[210px] sm:h-full overflow-hidden bg-[#EDE7DA] shrink-0 self-stretch">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-105 transition-all duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16191E]/85 via-black/20 to-transparent pointer-events-none group-hover:opacity-90 transition-opacity" />

                {/* Top Badge: Verified Handover */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="inline-flex items-center gap-1.5 bg-[#1E2229]/85 backdrop-blur-md text-[#C5A880] text-[10px] font-semibold px-2.5 py-1 rounded-md border border-[#C5A880]/30 shadow-sm group-hover:border-[#C5A880] group-hover:bg-[#1E2229] transition-all">
                    <CheckCircle2 className="w-3 h-3 text-[#C5A880]" />
                    <span>Verified Handover</span>
                  </span>
                </div>

                {/* Bottom Badge: Meerut Location */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white z-10">
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-white/95 bg-[#1E2229]/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 w-fit group-hover:bg-[#1E2229] transition-colors">
                    <MapPin className="w-3 h-3 text-[#C5A880] shrink-0" />
                    <span className="truncate">{review.location}</span>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE: User Testimonial Details (Fixed 56% width, 100% card height) */}
              <div className="w-full sm:w-[56%] p-5 sm:p-6 flex flex-col justify-between sm:h-full bg-gradient-to-br from-white to-[#FCFAF6] group-hover:from-white group-hover:to-[#F9F5EE] transition-colors duration-500 overflow-hidden shrink-0">
                {/* Top: Star Rating & Interactive Quote Icon */}
                <div className="flex items-center justify-between pb-2.5 border-b border-[#F2ECE1] shrink-0">
                  <div className="flex items-center gap-1 text-[#C5A880]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#C5A880] group-hover:scale-105 transition-transform duration-300"
                      />
                    ))}
                    <span className="text-xs font-bold text-[#1E2229] ml-1.5">5.0 Star</span>
                  </div>

                  {/* Animated Quote Icon that Rotates and Illuminates on Card Hover */}
                  <div className="w-8 h-8 rounded-full bg-[#FAF5EC] border border-[#EAE1D0] flex items-center justify-center text-[#C5A880] group-hover:bg-[#C5A880] group-hover:text-white group-hover:border-[#C5A880] group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-xs">
                    <Quote className="w-4 h-4" />
                  </div>
                </div>

                {/* Middle: Standardized Testimonial Quote Box with line clamp so card height is locked */}
                <div className="my-auto py-2 flex items-center overflow-hidden">
                  <p className="text-xs sm:text-[13px] text-[#3E3830] leading-relaxed italic line-clamp-4 group-hover:text-[#1E2229] transition-colors duration-300">
                    "{review.comment}"
                  </p>
                </div>

                {/* Bottom: Client Profile Signature & Project Scope */}
                <div className="pt-2.5 border-t border-[#F0EBE0] space-y-0.5 mt-auto shrink-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif-luxury text-base font-bold text-[#1E2229] group-hover:text-[#8A6D47] transition-colors duration-300 truncate">
                      {review.name}
                    </h3>
                    <span className="text-[10px] text-[#8C8378] font-mono shrink-0 ml-2">
                      {review.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#8A6D47] font-semibold">
                    <Sparkles className="w-3 h-3 text-[#C5A880] shrink-0" />
                    <span className="truncate">{review.projectType}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Interactive Dot Indicators */}
      <div className="flex items-center justify-center gap-2.5 mt-8">
        {pairs.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full h-2.5 ${
              activeSlide === idx
                ? 'w-9 bg-[#1E2229] shadow-xs'
                : 'w-2.5 bg-[#D5CEBF] hover:bg-[#8A6D47]'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
