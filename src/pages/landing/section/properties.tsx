"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion, PanInfo } from "framer-motion";
import {
  Sun,
  Moon,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { properties as PROPERTIES } from "../../../types/sitecontent";

const AUTOPLAY_MS = 4500;

export default function PropertiesCarousel() {
  const [activeTab, setActiveTab] = useState<"residential" | "portfolio" | "all">("all");
  const [isDark, setIsDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const filteredProperties = PROPERTIES.filter(
    (p) => activeTab === "all" || p.category === activeTab
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const lastIndex = filteredProperties.length - 1;
  const trackRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (index: number) => setActiveIndex(Math.max(0, Math.min(lastIndex, index))),
    [lastIndex]
  );
  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    setActiveIndex(0);
  }, [activeTab]);

  useEffect(() => {
    if (isPaused || prefersReducedMotion || lastIndex <= 0) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i >= lastIndex ? 0 : i + 1));
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [isPaused, prefersReducedMotion, lastIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") next();
    else if (e.key === "ArrowLeft") prev();
    else if (e.key === "Home") goTo(0);
    else if (e.key === "End") goTo(lastIndex);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    setIsPaused(false);
    const threshold = 70;
    if (info.offset.x < -threshold) next();
    else if (info.offset.x > threshold) prev();
  };

  const dark = isDark;

  return (
    <section
      className={`relative w-full py-20 px-4 sm:px-8 md:px-12 overflow-hidden selection:bg-accent-champagne selection:text-white transition-colors duration-500 ${
        dark ? "bg-brand-dark text-bg-ivory" : "bg-bg-ivory text-brand-dark"
      }`}
    >
      {/* ---------------- Top Bar ---------------- */}
      <div className="max-w-7xl mx-auto grid grid-cols-[auto_1fr_auto] items-center gap-4 mb-12">
        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
          className={`sm:hidden p-2 rounded-full border transition-colors ${
            dark
              ? "border-white/15 text-bg-ivory hover:border-accent-champagne/50"
              : "border-bg-stone-dark/30 text-brand-dark hover:border-accent-champagne/50"
          }`}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <div className="flex items-center justify-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-serif font-bold text-sm shrink-0 ${
              dark ? "bg-accent-champagne text-brand-dark" : "bg-brand-navy text-bg-ivory"
            }`}
          >
            C
          </div>
          <span className="font-serif font-bold tracking-tight text-lg">
            KO realty
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-5 justify-self-end text-xs uppercase tracking-widest font-sans font-semibold">
          <a
            href="#contact"
            className="underline underline-offset-4 decoration-1 hover:text-accent-champagne transition-colors"
          >
            Get in touch
          </a>
          <div
            className={`flex items-center gap-1 p-1 rounded-full border ${
              dark ? "border-white/15 bg-white/5" : "border-bg-stone-dark/30 bg-bg-stone/50"
            }`}
          >
            <button
              aria-label="Light mode"
              onClick={() => setIsDark(false)}
              className={`p-1.5 rounded-full transition-colors ${
                !dark ? "bg-white text-brand-dark shadow-sm" : "text-bg-ivory/50 hover:text-bg-ivory"
              }`}
            >
              <Sun size={14} />
            </button>
            <button
              aria-label="Dark mode"
              onClick={() => setIsDark(true)}
              className={`p-1.5 rounded-full transition-colors ${
                dark ? "bg-brand-navy-light text-accent-champagne shadow-sm" : "text-brand-dark/40 hover:text-brand-dark"
              }`}
            >
              <Moon size={14} />
            </button>
          </div>
        </div>

        <div className="sm:hidden" />
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto overflow-hidden sm:hidden -mt-6 mb-8"
          >
            <div
              className={`flex flex-col gap-3 p-4 rounded-2xl border ${
                dark ? "border-white/10 bg-white/5" : "border-bg-stone-dark/20 bg-bg-stone/30"
              }`}
            >
              <a href="#contact" className="text-xs uppercase tracking-widest font-sans font-semibold">
                Get in touch
              </a>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-3 py-1.5 rounded-full text-xs font-sans ${
                    activeTab === "all"
                      ? "bg-accent-champagne text-brand-dark"
                      : "border border-current/20"
                  }`}
                >
                  All Properties
                </button>
                <button
                  onClick={() => setActiveTab("residential")}
                  className={`px-3 py-1.5 rounded-full text-xs font-sans ${
                    activeTab === "residential"
                      ? "bg-accent-champagne text-brand-dark"
                      : "border border-current/20"
                  }`}
                >
                  Residential &amp; buyers
                </button>
                <button
                  onClick={() => setActiveTab("portfolio")}
                  className={`px-3 py-1.5 rounded-full text-xs font-sans ${
                    activeTab === "portfolio"
                      ? "bg-accent-champagne text-brand-dark"
                      : "border border-current/20"
                  }`}
                >
                  Rural &amp; specialty
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------- Heading + Filters ---------------- */}
      <div className="max-w-7xl mx-auto mb-10 flex items-start justify-between gap-6">
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight leading-[1.05]">
          Explore <span className="italic font-normal text-accent-champagne">your</span>
          <br />
          possibilities <span className="italic font-normal opacity-80">with KO realty</span>
        </h2>

        <div className="hidden sm:flex flex-col items-end gap-2 pt-2 shrink-0">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-5 py-1.5 rounded-full text-xs font-sans tracking-wide border transition-all ${
              activeTab === "all"
                ? "bg-accent-champagne text-brand-dark border-accent-champagne shadow-md"
                : `border-current/20 hover:border-accent-champagne/50 ${dark ? "text-bg-ivory/70" : "text-brand-dark/70"}`
            }`}
          >
            All Properties
          </button>
          <button
            onClick={() => setActiveTab("residential")}
            className={`px-5 py-1.5 rounded-full text-xs font-sans tracking-wide border transition-all ${
              activeTab === "residential"
                ? "bg-accent-champagne text-brand-dark border-accent-champagne shadow-md"
                : `border-current/20 hover:border-accent-champagne/50 ${dark ? "text-bg-ivory/70" : "text-brand-dark/70"}`
            }`}
          >
            Residential &amp; buyers
          </button>
          <button
            onClick={() => setActiveTab("portfolio")}
            className={`px-5 py-1.5 rounded-full text-xs font-sans tracking-wide border transition-all ${
              activeTab === "portfolio"
                ? "bg-accent-champagne text-brand-dark border-accent-champagne shadow-md"
                : `border-current/20 hover:border-accent-champagne/50 ${dark ? "text-bg-ivory/70" : "text-brand-dark/70"}`
            }`}
          >
            Rural &amp; specialty
          </button>
        </div>
      </div>

      {/* ---------------- Carousel ---------------- */}
      <div
        className="relative max-w-7xl mx-auto min-h-[520px] sm:min-h-[580px] flex items-center justify-center pt-4 pb-10 select-none"
        role="region"
        aria-roledescription="carousel"
        aria-label="Property listings portfolio"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <button
          aria-label="Previous property"
          onClick={prev}
          disabled={activeIndex === 0}
          className={`absolute left-0 sm:-left-4 z-40 p-2.5 rounded-full border shadow-lg transition-all disabled:opacity-0 disabled:pointer-events-none ${
            dark ? "bg-white/10 border-white/20 text-bg-ivory hover:bg-white/20" : "bg-white border-bg-stone-dark/30 text-brand-dark hover:border-accent-champagne"
          }`}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          aria-label="Next property"
          onClick={next}
          disabled={activeIndex === lastIndex}
          className={`absolute right-0 sm:-right-4 z-40 p-2.5 rounded-full border shadow-lg transition-all disabled:opacity-0 disabled:pointer-events-none ${
            dark ? "bg-white/10 border-white/20 text-bg-ivory hover:bg-white/20" : "bg-white border-bg-stone-dark/30 text-brand-dark hover:border-accent-champagne"
          }`}
        >
          <ChevronRight size={18} />
        </button>

        <motion.div
          ref={trackRef}
          className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
          drag="x"
          dragElastic={0.15}
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={() => setIsPaused(true)}
          onDragEnd={handleDragEnd}
        >
          {filteredProperties.map((property, index) => {
            const offset = index - activeIndex;
            const distance = Math.abs(offset);
            const isActive = index === activeIndex;

            const height = isActive ? 520 : Math.max(340, 520 - distance * 58);
            const grayscale = Math.min(distance * 0.55, 1);
            const brightness = isActive ? 1 : Math.max(0.7, 1 - distance * 0.1);

            return (
              <motion.div
                key={property.id}
                role="button"
                tabIndex={isActive ? 0 : -1}
                onClick={() => goTo(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") goTo(index);
                }}
                initial={false}
                animate={{
                  x: offset * 175,
                  scale: isActive ? 1.03 : Math.max(0.72, 1 - distance * 0.1),
                  rotate: offset * -3,
                  height,
                  filter: `grayscale(${grayscale}) brightness(${brightness})`,
                  zIndex: filteredProperties.length - distance,
                  opacity: distance > 3 ? 0 : 1,
                  pointerEvents: distance > 3 ? "none" : "auto",
                }}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
                aria-current={isActive}
                aria-label={`${property.title}: ${property.subtitle}`}
                className={`absolute w-[240px] sm:w-[300px] md:w-[330px] rounded-[28px] sm:rounded-[32px] overflow-hidden cursor-pointer shadow-2xl border transition-shadow duration-300 ${
                  isActive
                    ? "ring-2 ring-accent-champagne/50 border-white/20 shadow-brand-dark/30"
                    : "border-white/10 hover:brightness-105"
                }`}
              >
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  sizes="(max-width: 768px) 60vw, 330px"
                  className="object-cover object-center pointer-events-none"
                  draggable={false}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/15 to-brand-dark/30 pointer-events-none" />

                <span className="absolute top-5 right-5 text-[10px] font-sans uppercase tracking-widest text-white/70 pointer-events-none">
                  {property.number}
                </span>

                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 flex flex-col justify-end text-white pointer-events-none">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-serif tracking-tight mb-1">
                    {property.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs font-sans text-white/80 font-light mb-4 line-clamp-2">
                    {property.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    <span className="text-[10px] font-sans uppercase tracking-wider text-white/90 px-2.5 py-1 rounded-full border border-white/25">
                      {property.specs.size}
                    </span>
                    <span className="text-[10px] font-sans uppercase tracking-wider text-white/90 px-2.5 py-1 rounded-full border border-white/25">
                      {property.specs.beds}
                    </span>
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.35 }}
                        className="bg-white/95 backdrop-blur-md rounded-full p-1.5 pl-4 flex items-center justify-between text-brand-dark shadow-xl pointer-events-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="text-xs font-serif font-bold text-brand-dark">
                          {property.price}
                        </span>
                        <a
                          href="#contact"
                          className="px-4 py-2 bg-brand-dark text-bg-ivory text-[10px] font-sans uppercase tracking-widest rounded-full hover:bg-accent-champagne hover:text-brand-dark transition-colors flex items-center gap-1.5 font-semibold"
                        >
                          Inquire
                          <ArrowUpRight size={12} />
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 -mt-2 mb-10">
        {filteredProperties.map((property, index) => (
          <button
            key={property.id}
            aria-label={`Go to ${property.title}`}
            onClick={() => goTo(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "w-6 bg-accent-champagne"
                : `w-1.5 ${dark ? "bg-white/25 hover:bg-white/40" : "bg-brand-dark/20 hover:bg-brand-dark/35"}`
            }`}
          />
        ))}
      </div>

      {/* ---------------- Footer Row ---------------- */}
      <div
        className={`max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t ${
          dark ? "border-white/10" : "border-bg-stone-dark/20"
        }`}
      >
        <div className="flex items-center gap-3">
  <p className={`text-xs font-sans max-w-sm leading-relaxed ${dark ? "text-bg-ivory/80" : "text-brand-dark/80"}`}>
    <span className="font-bold font-serif text-sm">Calgary Clients</span>{" "}
    From Calgary homes to surrounding Alberta properties, KO Realty offers personal guidance for the move ahead.
  </p>
</div>

<div className="flex items-center gap-3">
  <div className={`px-4 py-2 rounded-full border text-xs font-sans font-semibold uppercase tracking-wider ${
    dark ? "border-white/15 text-bg-ivory/80" : "border-bg-stone-dark/30 text-brand-dark/80"
  }`}>
    Calgary &amp; surrounding areas
  </div>
</div>
      </div>
    </section>
  );
}