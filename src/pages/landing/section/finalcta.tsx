"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Calendar,
  Sparkles,
  Check,
  TrendingUp,
  Building2,
} from "lucide-react";
import { ctaConfig, dashboardCardConfig, ctaStatBars as STAT_BARS } from "../../../types/sitecontent";

const CLIENT_CONFIG = {
  cta: ctaConfig,
  dashboardCard: dashboardCardConfig,
};

export default function FinalCTASection() {
  return (
    <section className="relative w-full bg-brand-dark text-bg-ivory py-20 md:py-28 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Floating Banner Container */}
        <div className="w-full bg-gradient-to-br from-[#161b20] via-[#121619] to-[#0d1012] border border-white/15 rounded-[2.5rem] p-8 sm:p-12 lg:p-16 shadow-[0_0_90px_-30px_rgba(182,154,98,0.35)] overflow-hidden relative">
          {/* Decorative Subtle Grid Lines Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

          {/* Ambient champagne glow, echoes the light-shard treatment used in the hero */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-champagne/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-7 flex flex-col">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-serif text-bg-ivory tracking-tight leading-[1.1] mb-6"
              >
                {CLIENT_CONFIG.cta.headingMain} <br />
                <span className="font-serif italic font-normal text-accent-champagne">
                  {CLIENT_CONFIG.cta.headingItalic}
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-sm sm:text-base font-sans font-light leading-relaxed text-bg-ivory/70 mb-8 max-w-xl"
              >
                {CLIENT_CONFIG.cta.subheading}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-3 mb-10"
              >
                {CLIENT_CONFIG.cta.bulletPoints.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent-champagne/20 text-accent-champagne flex items-center justify-center shrink-0">
                      <CheckCircle2 size={14} />
                    </div>
                    <span className="text-xs sm:text-sm font-sans font-light text-bg-ivory/85">
                      {item}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 mb-10"
              >
                <a
                  href={CLIENT_CONFIG.cta.primaryCtaLink}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-accent-champagne text-brand-dark font-sans text-xs font-bold uppercase tracking-widest shadow-[0_0_0_0_rgba(182,154,98,0.5)] hover:shadow-[0_0_35px_-5px_rgba(182,154,98,0.6)] hover:bg-accent-champagne-hover hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <span>{CLIENT_CONFIG.cta.primaryCtaText}</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href={CLIENT_CONFIG.cta.secondaryCtaLink}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-bg-ivory font-sans text-xs font-bold uppercase tracking-widest hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Calendar size={14} className="text-accent-champagne" />
                  <span>{CLIENT_CONFIG.cta.secondaryCtaText}</span>
                </a>
              </motion.div>

              {/* Verified experience summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-4 pt-6 border-t border-white/10"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-sans font-bold text-bg-ivory">
                    {CLIENT_CONFIG.cta.agentName}
                  </span>
                  <span className="text-[11px] font-sans font-light text-bg-ivory/60">
                    {CLIENT_CONFIG.cta.agentTitle}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* RIGHT COLUMN: Floating Interactive Dashboard Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 p-6 sm:p-8 shadow-2xl overflow-hidden hover:border-accent-champagne/30 transition-colors duration-500">
                {/* Floating Top Badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.6 }}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center"
                >
                  <Check size={16} />
                </motion.div>

                {/* Card Sub-Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-accent-champagne/15 text-accent-champagne border border-accent-champagne/30">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif font-bold text-bg-ivory">
                      {CLIENT_CONFIG.dashboardCard.title}
                    </h4>
                    <p className="text-[11px] font-sans text-bg-ivory/60">
                      {CLIENT_CONFIG.dashboardCard.subtitle}
                    </p>
                  </div>
                </div>

                {/* Stat Box Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {CLIENT_CONFIG.dashboardCard.stats.map((stat, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-black/30 border border-white/10 hover:border-white/20 transition-colors">
                      <span className="text-[11px] font-sans text-bg-ivory/60 block mb-1">
                        {stat.label}
                      </span>
                      <span className={`text-2xl font-serif font-bold ${idx === 0 ? "text-accent-champagne" : "text-emerald-400"}`}>
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Animated Stat Bars — fill from 0 the moment they scroll into view */}
                <div className="space-y-4 mb-6">
                  {STAT_BARS.map((bar, idx) => (
                    <div key={bar.label}>
                      <div className="flex justify-between text-xs font-sans mb-1.5">
                        <span className="text-bg-ivory/70">{bar.label}</span>
                        <span className={`font-bold ${bar.valueColor}`}>{bar.value}</span>
                      </div>
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: "0%" }}
                          whileInView={{ width: "100%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, delay: 0.3 + idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                          className={`h-full ${bar.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Status Indicator */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-sans">
                  <span className="flex items-center gap-2 text-bg-ivory/80">
                    <Sparkles size={14} className="text-accent-champagne animate-pulse" />
                    {CLIENT_CONFIG.dashboardCard.marketStatusLabel}
                  </span>
                  <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30 uppercase tracking-wider">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                    </span>
                    {CLIENT_CONFIG.dashboardCard.marketStatusValue}
                  </span>
                </div>
              </div>

              {/* Floating Accent Badge Element */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-accent-champagne text-brand-dark p-4 rounded-2xl shadow-2xl items-center gap-3 border border-white/20 hidden sm:flex hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-dark text-accent-champagne flex items-center justify-center font-bold">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold font-serif leading-none">{CLIENT_CONFIG.dashboardCard.badgeName}</p>
                  <p className="text-[10px] font-sans text-brand-dark/80">{CLIENT_CONFIG.dashboardCard.badgeTagline}</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}