"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

// ---------------------------------------------------------------------------
// Workflow Stages Data (Tailored for Charity Reimer Real Estate)
// ---------------------------------------------------------------------------

const WORKFLOW_STEPS = [
  {
    id: "01",
    title: "Consultation & Discovery",
    description:
      "We begin by understanding your goals, timeline, and exact property requirements across Winnipeg or rural Manitoba.",
    details:
      "Detailed market analysis, buyer/seller goal mapping, and financial planning alignment.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "02",
    title: "Strategic Planning",
    description:
      "Crafting a custom road map—whether pricing and staging for a sale or identifying target neighborhoods for purchase.",
    details:
      "Comparative market assessments, dynamic staging recommendations, and marketing campaigns.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "03",
    title: "Curated Search & Staging",
    description:
      "Executing targeted property viewings or showcasing your home with professional media and staging.",
    details:
      "High-end photography, digital listings, and private walk-through scheduling.",
    image:
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "04",
    title: "Negotiation & Contracts",
    description:
      "Protecting your interests with honest advice and firm negotiations to secure optimal pricing and terms.",
    details:
      "Contract drafting, condition management, and transparent offer evaluations.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "05",
    title: "Closing & Ongoing Support",
    description:
      "Guiding you smoothly through possession day and remaining your trusted real estate resource.",
    details:
      "Final walk-throughs, key handovers, lawyer coordination, and post-move assistance.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
  },
];

const STEP_DURATION = 7000; // ms — one source of truth for autoplay + progress bar

export default function WorkflowSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const touchStartX = useRef(0);

  const current = WORKFLOW_STEPS[activeStep];

  const goToStep = useCallback((idx: number) => {
    setActiveStep(idx);
  }, []);

  const handleNext = useCallback(() => {
    setActiveStep((prev) => (prev + 1) % WORKFLOW_STEPS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveStep((prev) =>
      prev === 0 ? WORKFLOW_STEPS.length - 1 : prev - 1,
    );
  }, []);

  // Autoplay — resets whenever activeStep changes so manual clicks never
  // feel like they're fighting the timer.
  useEffect(() => {
    if (isPaused) return;
    const timer = setTimeout(handleNext, STEP_DURATION);
    return () => clearTimeout(timer);
  }, [activeStep, isPaused, handleNext]);

  // Arrow-key navigation across the step list, following the standard
  // tablist keyboard pattern, with focus following selection.
  const handleListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      const next = (activeStep + 1) % WORKFLOW_STEPS.length;
      goToStep(next);
      buttonRefs.current[next]?.focus();
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      const prev =
        activeStep === 0 ? WORKFLOW_STEPS.length - 1 : activeStep - 1;
      goToStep(prev);
      buttonRefs.current[prev]?.focus();
    }
  };

  // Swipe support on the image stage
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

  return (
    <section
      className="relative w-full bg-brand-dark text-bg-ivory px-5 sm:px-8 lg:px-12 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Subtitle, Step Buttons */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-accent-champagne text-[11px] sm:text-xs uppercase tracking-[0.25em] font-sans font-semibold block mb-3"
              >
                Process & Approach
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-bg-ivory leading-tight mb-4"
              >
                From initial idea to ideal outcome
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm sm:text-base font-sans text-bg-ivory/70 font-light leading-relaxed mb-8 max-w-lg"
              >
                Guiding your real estate journey at every stage—from concept to
                final handover, with meticulous attention to detail and your
                priorities.
              </motion.p>
            </div>

            {/* Step Selection List (tablist pattern) */}
            <div
              role="tablist"
              aria-orientation="vertical"
              aria-label="Workflow stages"
              onKeyDown={handleListKeyDown}
              className="space-y-2.5"
            >
              {WORKFLOW_STEPS.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={step.id}
                    ref={(el) => {
                      buttonRefs.current[idx] = el;
                    }}
                    role="tab"
                    id={`workflow-tab-${step.id}`}
                    aria-selected={isActive}
                    aria-controls={`workflow-panel-${step.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => goToStep(idx)}
                    className={`relative w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-champagne ${
                      isActive
                        ? "bg-brand-navy-dark/90 border border-white/20 text-bg-ivory shadow-lg"
                        : "bg-transparent border border-transparent text-bg-ivory/60 hover:text-bg-ivory hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs sm:text-sm text-accent-champagne font-semibold">
                        {step.id}
                      </span>
                      <span className="font-serif text-sm sm:text-base font-bold">
                        {step.title}
                      </span>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
                        isActive
                          ? "bg-accent-champagne text-brand-dark rotate-45"
                          : "border border-white/20 text-bg-ivory/60"
                      }`}
                    >
                      <ArrowUpRight size={16} />
                    </div>

                    {/* Autoplay progress — shows time remaining on the active stage */}
                    {isActive && (
                      <motion.div
                        key={`${activeStep}-${isPaused}`}
                        className="absolute bottom-0 left-0 h-[2px] bg-accent-champagne"
                        initial={{ width: "0%" }}
                        animate={{ width: isPaused ? "0%" : "100%" }}
                        transition={{
                          duration: isPaused ? 0 : STEP_DURATION / 1000,
                          ease: "linear",
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dynamic Image Showcase & Stage Explanation */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Dynamic Stage Image */}
            <div
              className="relative w-full h-[280px] sm:h-[380px] lg:h-[440px] rounded-2xl sm:rounded-3xl overflow-hidden bg-brand-navy-dark border border-white/10 shadow-2xl"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.image}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <motion.div
                    className="relative w-full h-full"
                    animate={{ scale: shouldReduceMotion ? 1 : 1.06 }}
                    transition={{
                      duration: STEP_DURATION / 1000 + 0.5,
                      ease: "linear",
                    }}
                  >
                    <Image
                      src={current.image}
                      alt={current.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover object-center brightness-75 contrast-[1.05]"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-brand-dark/20" />
                </motion.div>
              </AnimatePresence>

              {/* Prev / next controls, for anyone who'd rather not scroll to the list */}
              <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 flex items-center gap-2 z-10">
                <button
                  onClick={handlePrev}
                  aria-label="Previous stage"
                  className="w-10 h-10 rounded-full border border-white/20 text-bg-ivory hover:border-accent-champagne hover:text-accent-champagne transition-colors flex items-center justify-center bg-brand-dark/50 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-champagne"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next stage"
                  className="w-10 h-10 rounded-full border border-white/20 text-bg-ivory hover:border-accent-champagne hover:text-accent-champagne transition-colors flex items-center justify-center bg-brand-dark/50 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-champagne"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Dynamic Explanatory Text Box */}
            <div
              role="tabpanel"
              id={`workflow-panel-${current.id}`}
              aria-labelledby={`workflow-tab-${current.id}`}
              className="bg-brand-navy-dark/40 border border-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`desc-${current.id}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35 }}
                >
                  <span className="text-[11px] font-sans text-accent-champagne uppercase tracking-widest font-semibold block mb-1">
                    Stage {current.id} Overview
                  </span>
                  <p className="text-sm sm:text-base font-sans text-bg-ivory/90 leading-relaxed font-light">
                    {current.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`details-${current.id}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, delay: 0.05 }}
                  className="border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 flex flex-col justify-center"
                >
                  <span className="text-[11px] font-sans text-bg-ivory/40 uppercase tracking-widest font-semibold block mb-1">
                    Deliverables & Execution
                  </span>
                  <p className="text-xs sm:text-sm font-sans text-bg-ivory/70 leading-relaxed font-light">
                    {current.details}
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