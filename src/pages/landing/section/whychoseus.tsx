"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone, CalendarCheck } from "lucide-react";
import { differenceConfig as CLIENT_CONFIG } from "../../../types/sitecontent";

export default function WhyUsSection() {
  return (
    <section className="relative w-full bg-brand-dark text-bg-ivory py-14 md:py-20 px-6 md:px-12 overflow-hidden border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Main 2-Column Architectural Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN: Section Header & Lead Copy */}
          <div className="lg:col-span-5 flex flex-col">
            {/* Eyebrow Label */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="text-accent-champagne text-xs uppercase tracking-[0.25em] font-sans font-bold">
                {CLIENT_CONFIG.eyebrow}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif text-bg-ivory tracking-tight leading-[1.1] mb-6"
            >
              {CLIENT_CONFIG.headingMain} <br />
              <span className="font-serif italic font-normal text-accent-champagne">
                {CLIENT_CONFIG.headingItalic}
              </span>
            </motion.h2>

            {/* Narrative Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-sm font-sans font-light leading-relaxed text-bg-ivory/70 mb-8 max-w-md"
            >
              {CLIENT_CONFIG.subtext}
            </motion.p>

            {/* Action Links */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-6"
            >
              <a
                href={CLIENT_CONFIG.callNowHref}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-sans font-bold text-accent-champagne hover:text-accent-champagne-hover transition-colors group"
              >
                <Phone
                  size={14}
                  className="text-accent-champagne group-hover:scale-110 transition-transform"
                />
                {CLIENT_CONFIG.callNowText}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={CLIENT_CONFIG.bookConsultationHref}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-sans font-bold text-bg-ivory hover:text-accent-champagne transition-colors group"
              >
                <CalendarCheck
                  size={14}
                  className="text-bg-ivory group-hover:text-accent-champagne transition-colors"
                />
                {CLIENT_CONFIG.bookConsultationText}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: 2x2 Feature Grid with Dividers */}
          <div className="lg:col-span-7 relative">
            {/* Subtle Vertical Divider for Large Displays */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
              {CLIENT_CONFIG.features.map((feature, idx) => {
                const Icon = feature.icon;
                const [before, after] = feature.description.split("—");
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: idx * 0.15 }}
                    className={`flex items-start gap-4 pb-8 md:pb-0 ${idx < 2 ? "md:mb-6" : ""
                    }`}
                  >
                    {/* Dark surface icon badge */}
                    <div className="flex items-center justify-center w-11 h-11 rounded-full bg-brand-navy-dark border border-white/10 text-accent-champagne shrink-0 shadow-sm group-hover:border-accent-champagne/60">
                      <Icon size={20} strokeWidth={1.75} />
                    </div>

                    {/* Content Block */}
                    <div className="flex flex-col">
                      <h3 className="text-lg font-serif font-bold text-bg-ivory mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-xs font-sans text-bg-ivory/70 leading-relaxed font-light">
                        {before}
                        {feature.linkText && (
                          <>
                            {"— "}
                            <a
                              href={feature.linkHref || "#"}
                              className="text-accent-champagne font-medium underline underline-offset-2 hover:text-bg-ivory transition-colors"
                            >
                              {feature.linkText}
                            </a>
                            {after?.replace(feature.linkText, "")}
                          </>
                        )}
                        {!feature.linkText && after ? `—${after}` : null}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}