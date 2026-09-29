"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, MoreHorizontal, Menu, X } from "lucide-react";
import { heroConfig as CLIENT_CONFIG } from "../../../types/sitecontent";

// ===========================================================================
// SUB-COMPONENTS
// ===========================================================================

function StatCounter({ value, suffix }: { value: string; suffix: string }) {
  return (
    <span className="flex items-baseline gap-0.5">
      <span className="font-serif text-2xl sm:text-3xl text-bg-ivory font-bold tabular-nums">
        {value}
      </span>
      <span className="font-serif text-lg text-accent-champagne">{suffix}</span>
    </span>
  );
}

// ===========================================================================
// MAIN HERO COMPONENT
// ===========================================================================

export default function HeroSection() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 800], [0, 120]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* ---------------- HERO WRAPPER ---------------- */}
      <div className="relative w-full overflow-hidden bg-brand-dark text-bg-ivory selection:bg-accent-champagne selection:text-brand-dark">
        {/* ---------------- NAVIGATION ---------------- */}
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            isScrolled
              ? "bg-brand-dark/90 backdrop-blur-md py-4 border-b border-white/10 shadow-2xl"
              : "bg-gradient-to-b from-brand-dark/80 to-transparent py-5 md:py-6"
          }`}
        >
          <div className="max-w-[90%] mx-auto px-5 sm:px-6 md:px-12 flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="group flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-full border border-accent-champagne/40 flex items-center justify-center text-accent-champagne font-serif text-lg font-bold tracking-wider group-hover:border-accent-champagne group-hover:bg-accent-champagne/10 transition-all duration-300">
                {CLIENT_CONFIG.brand.initials}
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-base sm:text-lg tracking-[0.15em] uppercase text-bg-ivory leading-none">
                  {CLIENT_CONFIG.brand.name}
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.28em] text-accent-champagne uppercase font-sans mt-1">
                  {CLIENT_CONFIG.brand.title}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {CLIENT_CONFIG.navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs uppercase tracking-[0.2em] font-sans transition-colors relative py-1 ${
                    link.active
                      ? "text-accent-champagne font-semibold"
                      : "text-bg-ivory/70 hover:text-bg-ivory"
                  }`}
                >
                  {link.name}
                  {link.active && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent-champagne"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Action Callouts */}
            <div className="flex items-center gap-3">
              <Link
                href={CLIENT_CONFIG.hero.headerCtaLink}
                className="hidden sm:inline-flex px-5 md:px-6 py-2.5 border border-accent-champagne/60 text-accent-champagne hover:bg-accent-champagne hover:text-brand-dark text-xs uppercase tracking-[0.18em] font-sans font-medium transition-all duration-300 rounded-full"
              >
                {CLIENT_CONFIG.hero.headerCtaText}
              </Link>
              <button
                aria-label="More Options"
                className="hidden lg:inline-flex p-2.5 border border-white/10 text-bg-ivory hover:text-accent-champagne hover:border-accent-champagne/40 transition-colors rounded-full"
              >
                <MoreHorizontal size={18} />
              </button>
              <button
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden p-2.5 border border-white/15 text-bg-ivory hover:text-accent-champagne hover:border-accent-champagne/40 transition-colors rounded-full"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </header>

        {/* ---------------- MOBILE NAV OVERLAY ---------------- */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-brand-dark/98 backdrop-blur-md lg:hidden"
            >
              <motion.nav
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="flex flex-col items-center justify-center h-full gap-8 px-6"
              >
                {CLIENT_CONFIG.navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`font-serif text-3xl transition-colors ${
                      link.active
                        ? "text-accent-champagne"
                        : "text-bg-ivory/80 hover:text-bg-ivory"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href={CLIENT_CONFIG.hero.headerCtaLink}
                  onClick={() => setMobileOpen(false)}
                  className="mt-4 px-8 py-3 border border-accent-champagne/60 text-accent-champagne text-xs uppercase tracking-[0.18em] font-sans font-medium rounded-full"
                >
                  {CLIENT_CONFIG.hero.headerCtaText}
                </Link>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---------------- HERO BACKGROUND & OVERLAY ---------------- */}
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y: imageY }} className="relative w-full h-full">
            <Image
              src={CLIENT_CONFIG.brand.heroImage}
              alt={CLIENT_CONFIG.brand.heroImageAlt}
              fill
              sizes="100vw"
              priority
              className="object-cover object-center"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/85 to-transparent md:to-brand-dark/10 z-10 w-full md:w-[70%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/50 z-10" />

          <div
            aria-hidden
            className="hidden md:block absolute inset-y-0 right-0 w-[45%] z-10 pointer-events-none opacity-[0.14] mix-blend-overlay"
            style={{
              background:
                "linear-gradient(115deg, transparent 38%, var(--accent-champagne) 46%, transparent 54%)",
            }}
          />
        </div>

        {/* ---------------- HERO CONTENT ---------------- */}
        <div className="relative z-20 max-w-[90%] mx-auto px-5 sm:px-6 md:px-12 pt-32 sm:pt-36 md:pt-44 pb-40 sm:pb-44 md:pb-52 flex flex-col justify-center min-h-[100svh]">
          <div className="max-w-2xl flex gap-5 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{ transformOrigin: "top" }}
              className="hidden sm:flex flex-col items-center gap-2.5 pt-2 shrink-0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-champagne/70" />
              <span className="w-1.5 h-1.5 rounded-full bg-accent-champagne/40" />
              <span className="w-1.5 h-1.5 rounded-full bg-accent-champagne/20" />
              <span className="w-px flex-1 bg-gradient-to-b from-accent-champagne/30 to-transparent" />
            </motion.div>

            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center mb-5 sm:mb-6"
              >
                <div className="w-8 h-[1px]" />
                <span className="text-accent-champagne text-[11px] sm:text-xs uppercase tracking-[0.25em] font-sans font-semibold">
                  {CLIENT_CONFIG.hero.eyebrow}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-[2.6rem] leading-[1.08] sm:text-6xl lg:text-[4.5rem] font-serif text-bg-ivory tracking-tight mb-6 sm:mb-8"
              >
                {CLIENT_CONFIG.hero.headingMain}{" "}
                <span className="italic font-normal text-accent-champagne">
                  {CLIENT_CONFIG.hero.headingItalic}
                </span>{" "}
                {CLIENT_CONFIG.hero.headingEnd}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-[15px] sm:text-lg text-bg-ivory/80 font-sans font-light leading-relaxed mb-9 sm:mb-10 max-w-xl"
              >
                {CLIENT_CONFIG.hero.subheading}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link
                  href={CLIENT_CONFIG.hero.primaryCtaLink}
                  className="inline-flex items-center gap-3 bg-accent-champagne text-brand-dark px-7 sm:px-8 py-3.5 sm:py-4 font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-accent-champagne-hover hover:text-bg-ivory transition-all duration-300 shadow-xl hover:translate-x-1 group rounded-full"
                >
                  {CLIENT_CONFIG.hero.primaryCtaText}
                  <ArrowUpRight
                    size={16}
                    className="group-hover:rotate-45 transition-transform duration-300"
                  />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- FLOATING STATS BAR ---------------- */}
      <div className="relative z-30 px-5 sm:px-6 md:px-12 -mt-24 sm:-mt-20 md:-mt-16 bg-brand-dark">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-7xl mx-auto"
        >
          <div className="bg-brand-navy-dark/90 backdrop-blur-md border border-white/10 rounded-[1.75rem] sm:rounded-[2rem] p-6 sm:p-7 md:p-8 shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 md:gap-6 md:divide-y-0 md:divide-x divide-white/10">
              {CLIENT_CONFIG.stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className={`flex items-center gap-3 sm:gap-4 ${
                      idx !== 0 ? "pt-5 md:pt-0 md:pl-6" : ""
                    }`}
                  >
                    <div className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-full border border-accent-champagne/30 text-accent-champagne">
                      <Icon size={20} strokeWidth={1.75} />
                    </div>
                    <div>
                      <StatCounter value={stat.value} suffix={stat.suffix} />
                      <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-bg-ivory/60 font-sans mt-0.5">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}