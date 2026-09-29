"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const AREAS = [
  {
    title: "Winnipeg",
    subtitle: "Residential home",
    description:
      "City neighbourhoods with character homes, mature trees, and an easy commute.",
    image: "/5.jpg",
  },
  {
    title: "South Eastern Manitoba",
    subtitle: "Rural / acreage property",
    description:
      "Acreages and small-town living within easy reach of the city.",
    image: "/1.jpg",
  },
  {
    title: "Lake Metigoshe",
    subtitle: "Waterfront / cottage",
    description:
      "Cottage country and lakefront living, for weekends away or year-round.",
    image: "/2.jpg",
  },
  {
    title: "Rural Manitoba",
    subtitle: "Farm / land",
    description:
      "Farmland and wide-open properties across the province's rural heart.",
    image: "/4.jpg",
  },
];

const SLIDE_DURATION = 6000;

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const currentSlide = AREAS[currentIndex];
  const nextSlide = AREAS[(currentIndex + 1) % AREAS.length];

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % AREAS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? AREAS.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setTimeout(handleNext, SLIDE_DURATION);
    return () => clearTimeout(timer);
  }, [currentIndex, isPaused, handleNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 45) {
      if (deltaX > 0) handleNext();
      else handlePrev();
    }
  };

  return (
    <section
      className="relative w-full min-h-[100svh] bg-brand-dark overflow-hidden selection:bg-accent-champagne selection:text-brand-dark px-5 sm:px-8 lg:px-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ---------------- BACKGROUND IMAGE STACK ---------------- */}
      <div className="absolute inset-0 z-0">
        {AREAS.map((area, idx) => {
          const isActive = idx === currentIndex;
          return (
            <motion.div
              key={area.image}
              className="absolute inset-0 overflow-hidden"
              initial={false}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{
                duration: shouldReduceMotion ? 0.3 : 1.3,
                ease: "easeInOut",
              }}
              style={{ zIndex: isActive ? 1 : 0 }}
              aria-hidden={!isActive}
            >
              <motion.div
                className="relative w-full h-full"
                animate={{ scale: isActive && !shouldReduceMotion ? 1 : 1.06 }}
                transition={{
                  duration: isActive ? SLIDE_DURATION / 1000 + 1.3 : 0,
                  ease: "linear",
                }}
              >
                <Image
                  src={area.image}
                  alt={`${area.title} - ${area.subtitle}`}
                  fill
                  priority={idx === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </motion.div>
            </motion.div>
          );
        })}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/80 lg:via-brand-dark/75 to-transparent w-full lg:w-3/5 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-brand-dark/50 lg:to-brand-dark/30 z-10" />
      </div>

      {/* ---------------- FOREGROUND CONTENT ---------------- */}
      <div className="relative z-20 w-full h-full min-h-[100svh] max-w-7xl mx-auto flex flex-col justify-end pt-20 sm:pt-28 pb-6 sm:pb-12 lg:pb-16">
        
        {/* MAIN HEADLINE & CTA */}
        <div className="relative z-20 max-w-3xl mb-auto mt-auto py-2 sm:py-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-3 sm:mb-4"
          >
            <span className="text-accent-champagne text-[10px] sm:text-xs uppercase tracking-[0.25em] font-sans font-semibold">
              Charity Reimer · Winnipeg REALTOR®
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.1] sm:leading-[1.08] font-serif text-bg-ivory tracking-tight mb-3 sm:mb-6"
          >
            Real estate, across{" "}
            <span className="italic font-normal text-accent-champagne">
              Manitoba
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-sm sm:text-base md:text-lg text-bg-ivory/80 font-sans font-light leading-relaxed mb-6 sm:mb-8 max-w-xl"
          >
            Personalized service and honest guidance, wherever your next move
            takes you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 bg-accent-champagne text-brand-dark px-6 sm:px-8 py-3.5 sm:py-4 font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-accent-champagne-hover hover:text-bg-ivory transition-all duration-300 shadow-xl hover:translate-x-1 group rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
            >
              Get Started
              <ArrowUpRight
                size={16}
                className="group-hover:rotate-45 transition-transform duration-300"
              />
            </Link>
          </motion.div>
        </div>

        {/* ---------------- BOTTOM BAR ---------------- */}
        <div className="relative z-20 flex flex-col lg:flex-row items-stretch lg:items-end justify-between gap-6 border-t border-white/10 pt-5 sm:pt-6">
          
          {/* Controls, counter, progress */}
          <div className="flex items-center justify-between lg:justify-start gap-4 sm:gap-6 w-full lg:w-auto">
            <span className="text-bg-ivory/70 font-mono text-xs sm:text-base tracking-widest tabular-nums shrink-0">
              0{currentIndex + 1} <span className="text-white/30">/</span> 0
              {AREAS.length}
            </span>

            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              <button
                onClick={handlePrev}
                aria-label="Previous area"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 text-bg-ivory hover:border-accent-champagne hover:text-accent-champagne transition-colors flex items-center justify-center bg-brand-dark/50 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-champagne"
              >
                <ChevronLeft size={18} className="sm:hidden" />
                <ChevronLeft size={20} className="hidden sm:block" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next area"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 text-bg-ivory hover:border-accent-champagne hover:text-accent-champagne transition-colors flex items-center justify-center bg-brand-dark/50 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-champagne"
              >
                <ChevronRight size={18} className="sm:hidden" />
                <ChevronRight size={20} className="hidden sm:block" />
              </button>
            </div>

            {/* Progress indicators */}
            <div className="hidden md:flex items-center gap-1.5 flex-1 max-w-[180px] lg:max-w-[200px]">
              {AREAS.map((area, idx) => (
                <button
                  key={area.title}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to ${area.title}`}
                  className="relative h-1 flex-1 rounded-full bg-white/15 overflow-hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-champagne"
                >
                  {idx < currentIndex && (
                    <div className="absolute inset-0 bg-accent-champagne/50 rounded-full" />
                  )}
                  {idx === currentIndex && (
                    <motion.div
                      key={`${currentIndex}-${isPaused}`}
                      className="absolute inset-y-0 left-0 bg-accent-champagne rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: isPaused ? "0%" : "100%" }}
                      transition={{
                        duration: isPaused ? 0 : SLIDE_DURATION / 1000,
                        ease: "linear",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Area info card */}
          <div className="relative flex items-center gap-3.5 sm:gap-5 bg-brand-navy-dark/90 border border-white/15 backdrop-blur-md rounded-2xl sm:rounded-[1.75rem] p-3.5 sm:p-5 w-full lg:w-auto lg:min-w-[420px] lg:max-w-[480px] shadow-2xl">
            <div className="relative w-24 h-28 sm:w-32 sm:h-36 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 border border-white/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.image}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    fill
                    sizes="(max-width: 640px) 96px, 128px"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[9px] sm:text-[10px] font-sans text-accent-champagne tracking-[0.15em] uppercase font-semibold">
                  Now viewing
                </span>
                <button
                  onClick={handleNext}
                  aria-label="Show next area"
                  className="shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-white/15 text-bg-ivory/60 hover:text-accent-champagne hover:border-accent-champagne flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-champagne"
                >
                  <ChevronRight size={12} className="sm:hidden" />
                  <ChevronRight size={14} className="hidden sm:block" />
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.title}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="text-xs sm:text-base font-serif font-bold text-bg-ivory leading-snug truncate">
                    {currentSlide.title}
                  </p>
                  <p className="text-[10px] sm:text-[11px] font-sans text-bg-ivory/50 uppercase tracking-wide mb-1 sm:mb-1.5 truncate">
                    {currentSlide.subtitle}
                  </p>
                  <p className="text-[11px] sm:text-[13px] font-sans text-bg-ivory/70 leading-relaxed line-clamp-2">
                    {currentSlide.description}
                  </p>
                  <p className="text-[9px] sm:text-[10px] font-sans text-bg-ivory/35 mt-1.5 sm:mt-2 truncate">
                    Next: {nextSlide.title}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}