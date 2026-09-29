"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle2, Award, Quote } from "lucide-react";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const SATISFACTION_METRICS = [
  {
    value: "98%",
    title: "5-Star Client Reviews",
    desc: "Unmatched satisfaction across communication, negotiation, and market guidance.",
    icon: Star,
  },
  {
    value: "95%",
    title: "Successful Deal Rate",
    desc: "Properties strategically listed and closed under optimal market conditions.",
    icon: CheckCircle2,
  },
  {
    value: "92%",
    title: "Repeat & Referral Rate",
    desc: "Long-term relationships built on transparency, honesty, and reliable execution.",
    icon: Award,
  },
];

const METRICS = [
  { value: "100%", label: "CLIENT FOCUS & DEDICATION" },
  { value: "18+", label: "PROPERTY TYPES SERVED" },
  { value: "MANITOBA", label: "URBAN & RURAL COVERAGE" },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function SkillsAndImpact() {
  return (
    <section className="w-full bg-brand-dark py-16 px-6 sm:px-10 lg:px-16 text-bg-ivory selection:bg-accent-champagne selection:text-brand-dark">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative">
        
        {/* ================= LEFT COLUMN: MINIMALIST STAT BLOCKS ================= */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            {/* Heading */}
            <div className="mb-10">
              <h2 className="text-sm font-sans font-bold tracking-[0.25em] uppercase text-bg-ivory">
                PROVEN SATISFACTION & RESULTS
              </h2>
              <div className="w-8 h-[2px] bg-accent-champagne mt-2" />
            </div>

            {/* Clean Typographic List (No Glass Containers) */}
            <div className="space-y-8">
              {SATISFACTION_METRICS.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.12 }}
                    className="group relative pl-6 border-l border-white/10 hover:border-accent-champagne transition-colors duration-300"
                  >
                    {/* Top Row: Big Stat & Icon */}
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif text-3xl sm:text-4xl font-bold text-accent-champagne tracking-tight">
                        {item.value}
                      </span>
                      <Icon
                        size={18}
                        className="text-bg-ivory/40 group-hover:text-accent-champagne transition-colors duration-300"
                      />
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xs font-sans font-bold tracking-[0.15em] uppercase text-bg-ivory mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs font-sans font-light text-bg-ivory/70 leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: SERVICE & PHILOSOPHY ================= */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-10">
          <div>
            {/* Heading */}
            <div className="mb-10">
              <h2 className="text-sm font-sans font-bold tracking-[0.25em] uppercase text-bg-ivory">
                SERVICE & PROMISE
              </h2>
              <div className="w-8 h-[2px] bg-accent-champagne mt-2" />
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-4 border-b border-white/10 pb-10">
              {METRICS.map((metric, idx) => (
                <div
                  key={metric.label}
                  className={`flex flex-col justify-center ${
                    idx !== 0 ? "border-l border-white/10 pl-4 sm:pl-8" : ""
                  }`}
                >
                  <span className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-bg-ivory tracking-tight mb-2">
                    {metric.value}
                  </span>
                  <span className="text-[10px] sm:text-xs font-sans tracking-[0.18em] uppercase text-bg-ivory/60 leading-tight">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quote Block (Maintained Glass Card Style Here) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border border-white/10 rounded-lg p-6 sm:p-8 bg-white/[0.02] flex gap-5 items-start"
          >
            <Quote
              size={36}
              className="text-accent-champagne rotate-180 shrink-0 mt-1"
            />
            <div className="flex flex-col gap-3">
              <p className="text-sm sm:text-base font-sans font-light text-bg-ivory/90 leading-relaxed italic">
                Real estate is never just about properties or numbers. It’s about understanding people, protecting their investments, and walking alongside them through every major transition.
              </p>
              <span className="text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-accent-champagne">
                CHARITY REIMER
              </span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}