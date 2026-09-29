"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Calculator, CheckCircle2, Loader2 } from "lucide-react";

// ---------------------------------------------------------------------------
// Client Avatar Canopy — arranged as a gentle arc with a raised, full-color
// "hero" card at the center and progressively faded cards toward the edges,
// each trailing a thin connecting line down toward the content below.
// ---------------------------------------------------------------------------

const CANOPY = [
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    alt: "Winnipeg Homeowner",
    lift: 28,
    size: "w-14 h-18 sm:w-16 sm:h-20",
    rotate: "-rotate-3",
    fade: "brightness-[0.45]",
    visibility: "hidden md:flex",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    alt: "Acreage Owner",
    lift: 8,
    size: "w-16 h-20 sm:w-20 sm:h-24",
    rotate: "rotate-2",
    fade: "brightness-[0.6]",
    visibility: "hidden sm:flex",
  },
  {
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    alt: "South Eastern MB Client",
    lift: -6,
    size: "w-20 h-24 sm:w-24 sm:h-28",
    rotate: "-rotate-1",
    fade: "brightness-[0.85]",
    visibility: "flex",
  },
  {
    src: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
    alt: "Featured Client",
    lift: -18,
    size: "w-24 h-28 sm:w-28 sm:h-32",
    rotate: "rotate-0",
    fade: "brightness-100",
    hero: true,
    visibility: "flex",
  },
  {
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    alt: "Cottage Owner",
    lift: -6,
    size: "w-20 h-24 sm:w-24 sm:h-28",
    rotate: "rotate-1",
    fade: "brightness-[0.85]",
    visibility: "flex",
  },
  {
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    alt: "Rural Property Client",
    lift: 8,
    size: "w-16 h-20 sm:w-20 sm:h-24",
    rotate: "-rotate-2",
    fade: "brightness-[0.6]",
    visibility: "hidden sm:flex",
  },
  {
    src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
    alt: "Winnipeg Seller",
    lift: 28,
    size: "w-14 h-18 sm:w-16 sm:h-20",
    rotate: "rotate-3",
    fade: "brightness-[0.45]",
    visibility: "hidden md:flex",
  },
];

// Where every trailing line should end up, regardless of how high or low
// its card sits — keeps the bottoms roughly aligned like the reference.
const LINE_BASELINE = 46;

export default function HomeValuationCTA() {
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || status === "submitting") return;
    setStatus("submitting");
    // Simulated submission — wire this up to your actual valuation endpoint.
    setTimeout(() => setStatus("success"), 900);
  };

  const handleReset = () => {
    setAddress("");
    setStatus("idle");
  };

  return (
    <section className="relative w-full bg-brand-dark text-bg-ivory py-20 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Floating Avatar Canopy */}
        <div className="relative w-full flex items-end justify-center gap-2 sm:gap-3.5 mb-8 sm:mb-12 md:mb-14">
          {CANOPY.map((avatar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: avatar.lift - 22 }}
              whileInView={{ opacity: 1, y: avatar.lift }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.07 }}
              className={`${avatar.visibility} flex-col items-center`}
              style={{ zIndex: avatar.hero ? 20 : 10 - Math.abs(idx - 3) }}
            >
              <div
                className={`relative overflow-hidden rounded-2xl border bg-brand-navy-dark ${avatar.size} ${avatar.rotate} ${avatar.fade} hover:brightness-100 hover:scale-105 transition-all duration-300 ${
                  avatar.hero
                    ? "border-accent-champagne/40 shadow-2xl"
                    : "border-white/15 shadow-xl"
                }`}
              >
                <Image
                  src={avatar.src}
                  alt={avatar.alt}
                  fill
                  sizes="140px"
                  className="object-cover"
                />
              </div>
              <div
                className="w-px bg-gradient-to-b from-white/25 to-transparent"
                style={{ height: `${LINE_BASELINE - avatar.lift}px` }}
                aria-hidden
              />
            </motion.div>
          ))}
        </div>

        {/* Floating Eyebrow Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-brand-navy-dark/80 border border-white/15 backdrop-blur-md px-4 py-1.5 rounded-full mb-6"
        >
          <Calculator size={14} className="text-accent-champagne" />
          <span className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.2em] font-semibold text-accent-champagne">
            Complimentary Home Valuation
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-bg-ivory tracking-tight max-w-4xl mx-auto leading-[1.12] mb-4 sm:mb-6"
        >
          Curious what your property is worth in today&apos;s market?
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base lg:text-lg font-sans font-light text-bg-ivory/70 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10"
        >
          Get a precise, data-driven assessment tailored specifically to your
          neighborhood across Winnipeg and rural Manitoba. No pressure, no
          obligations.
        </motion.p>

        {/* Interactive Valuation Input Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-brand-navy-dark/90 border border-accent-champagne/30 backdrop-blur-md p-4 sm:p-5 rounded-2xl sm:rounded-full shadow-2xl text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <CheckCircle2
                    size={20}
                    className="text-accent-champagne shrink-0"
                  />
                  <p className="text-sm font-sans text-bg-ivory/90 truncate">
                    Thanks! Your valuation for{" "}
                    <span className="text-bg-ivory font-medium">
                      {address}
                    </span>{" "}
                    is on its way.
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="shrink-0 text-xs font-sans uppercase tracking-[0.15em] text-accent-champagne hover:text-bg-ivory transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-champagne rounded-full px-3 py-1.5"
                >
                  Check another
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.35 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-center gap-3 bg-brand-navy-dark/90 border border-white/20 backdrop-blur-md p-2 sm:p-2.5 rounded-2xl sm:rounded-full shadow-2xl"
              >
                <label htmlFor="valuation-address" className="sr-only">
                  Property address
                </label>
                <input
                  id="valuation-address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your property address..."
                  required
                  disabled={status === "submitting"}
                  className="w-full bg-transparent text-bg-ivory placeholder:text-bg-ivory/40 text-sm font-sans px-4 py-3 sm:py-2 focus:outline-none rounded-xl sm:rounded-full disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 bg-accent-champagne text-brand-dark px-7 py-3.5 sm:py-3 rounded-xl sm:rounded-full font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-accent-champagne-hover hover:text-bg-ivory transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-champagne disabled:opacity-70"
                >
                  {status === "submitting" ? (
                    <>
                      Sending
                      <Loader2 size={16} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Get Valuation
                      <ArrowUpRight
                        size={16}
                        className="group-hover:rotate-45 transition-transform duration-300"
                      />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-sans text-bg-ivory/60"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-accent-champagne" />
            <span>100% Free & Confidential</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-accent-champagne" />
            <span>Custom Market Assessment</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-accent-champagne" />
            <span>Delivered Within 24 Hours</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}