"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const PROPERTIES = [
  {
    title: "Residential homes",
    count: "Winnipeg & Suburbs",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    alt: "Modern luxury residential property",
  },
  {
    title: "Rural & Acreages",
    count: "South Eastern Manitoba",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    alt: "Acreages and open land property",
  },
  {
    title: "Waterfront & Cottages",
    count: "Lake Metigoshe & Lakes",
    image:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80",
    alt: "Cottage and waterfront property",
  },
  {
    title: "Farmland & Plots",
    count: "Rural Manitoba",
    image:
      "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=800&q=80",
    alt: "Wide open Manitoba farmland",
  },
  {
    title: "Commercial & Office",
    count: "Urban Centers",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    alt: "Commercial office space building",
  },
  {
    title: "Industrial & Warehouses",
    count: "Trade & Logistics Hubs",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    alt: "Industrial warehouse facility",
  },
];

export default function ServiceSection() {
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = advancing, -1 = reversing — drives which way cards slide in

  const touchStartX = useRef(0);

  const handleNext = () => {
    setDirection(1);
    setStartIndex((prev) => (prev + 1) % PROPERTIES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setStartIndex((prev) => (prev === 0 ? PROPERTIES.length - 1 : prev - 1));
  };

  const goTo = (index: number) => {
    setDirection(index >= startIndex ? 1 : -1);
    setStartIndex(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "ArrowLeft") handlePrev();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 45) {
      if (delta > 0) handleNext();
      else handlePrev();
    }
  };

  // A sliding window of 4 — but which of those 4 are actually shown is
  // controlled per-breakpoint below, so the carousel genuinely shows one
  // card on mobile, two on tablet, and four on desktop rather than
  // stacking all four regardless of screen size.
  const visibleProperties = [
    PROPERTIES[startIndex],
    PROPERTIES[(startIndex + 1) % PROPERTIES.length],
    PROPERTIES[(startIndex + 2) % PROPERTIES.length],
    PROPERTIES[(startIndex + 3) % PROPERTIES.length],
  ];

  // Visibility per card position, matched to the grid's own breakpoints
  // (grid-cols-1 / sm:grid-cols-2 / lg:grid-cols-4).
  const cardVisibility = [
    "block",
    "hidden sm:block",
    "hidden lg:block",
    "hidden lg:block",
  ];

  return (
    <section className="relative w-full bg-brand-dark text-bg-ivory py-16 sm:py-24 lg:py-32 px-5 sm:px-8 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-3 flex flex-col justify-between h-full pt-2">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-accent-champagne text-[11px] sm:text-xs uppercase tracking-[0.25em] font-sans font-semibold block mb-3"
              >
                Services & Expertise
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-bg-ivory leading-tight mb-4 sm:mb-6"
              >
                Variety of <br className="hidden lg:block" />
                properties I handle
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm sm:text-base font-sans text-bg-ivory/70 font-light leading-relaxed max-w-sm mb-6 lg:mb-0"
              >
                Comprehensive real estate representation tailored to your
                lifestyle, investment, and location goals across Manitoba.
              </motion.p>
            </div>
          </div>

          {/* Right Column: Cards & Navigation */}
          <div
            className="lg:col-span-9 flex flex-col gap-8 focus-visible:outline-none"
            tabIndex={0}
            role="group"
            aria-roledescription="carousel"
            aria-label="Property types"
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {visibleProperties.map((property, idx) => (
                <div key={idx} className={cardVisibility[idx]}>
                  <AnimatePresence
                    mode="popLayout"
                    initial={false}
                    custom={direction}
                  >
                    <motion.div
                      key={`${property.title}-${startIndex}`}
                      custom={direction}
                      initial={{ opacity: 0, x: direction * 28 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction * -28 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="group flex flex-col"
                    >
                      {/* Card image */}
                      <div className="relative w-full h-[300px] sm:h-[360px] lg:h-[390px] rounded-2xl sm:rounded-3xl overflow-hidden bg-brand-navy-dark border border-white/10 mb-4 transition-transform duration-500 group-hover:-translate-y-1">
                        <Image
                          src={property.image}
                          alt={property.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover object-center brightness-75 contrast-[1.05] group-hover:scale-105 group-hover:brightness-90 transition-all duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-brand-dark/30 pointer-events-none" />
                      </div>

                      {/* Card Title & Location */}
                      <div className="px-1">
                        <h3 className="text-base sm:text-lg font-serif font-bold text-bg-ivory mb-1 truncate">
                          {property.title}
                        </h3>
                        <p className="text-xs font-sans text-bg-ivory/50 font-normal truncate">
                          {property.count}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-4">
                <span
                  aria-live="polite"
                  className="text-xs font-mono text-bg-ivory/40 tracking-widest tabular-nums"
                >
                  0{startIndex + 1} <span className="text-white/20">/</span> 0
                  {PROPERTIES.length}
                </span>

                {/* Pagination dots — also double as direct-jump controls */}
                <div className="hidden sm:flex items-center gap-1.5">
                  {PROPERTIES.map((property, idx) => (
                    <button
                      key={property.title}
                      onClick={() => goTo(idx)}
                      aria-label={`Go to ${property.title}`}
                      className="p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-champagne rounded-full"
                    >
                      <span
                        className={`block rounded-full transition-all duration-300 ${
                          idx === startIndex
                            ? "w-5 h-1.5 bg-accent-champagne"
                            : "w-1.5 h-1.5 bg-white/20"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  aria-label="Previous property types"
                  className="w-11 h-11 rounded-full border border-white/20 text-bg-ivory/80 hover:text-accent-champagne hover:border-accent-champagne transition-colors flex items-center justify-center bg-brand-dark/50 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-champagne"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next property types"
                  className="w-11 h-11 rounded-full bg-bg-ivory text-brand-dark hover:bg-accent-champagne transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-champagne"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}