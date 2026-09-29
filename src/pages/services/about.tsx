"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, ShieldCheck, HeartHandshake, MapPin, ArrowUpRight } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="relative w-full bg-brand-dark py-20 sm:py-28 px-5 sm:px-8 lg:px-12 selection:bg-accent-champagne selection:text-brand-dark overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">
        
        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Eyebrow, Heading, Paragraph, and 3 Highlights */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent-champagne/30 bg-accent-champagne/10"
            >
              <Compass size={14} className="text-accent-champagne" />
              <span className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-accent-champagne">
                A More Personal Approach to Real Estate
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-serif text-bg-ivory leading-[1.15] tracking-tight"
            >
              Guidance You Can Feel Confident In.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base text-bg-ivory/70 font-sans font-light leading-relaxed"
            >
              With a South Eastern Manitoba background and a commitment to personalized service, Charity helps clients navigate buying and selling with honest guidance, strategic marketing, and a clear understanding of their goals.
            </motion.p>

            {/* Three Small Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-3.5 pt-2 border-t border-white/10"
            >
              <div className="flex items-center gap-3 text-bg-ivory/90 font-sans text-xs sm:text-sm font-medium">
                <div className="w-6 h-6 rounded-full bg-accent-champagne/15 flex items-center justify-center shrink-0">
                  <HeartHandshake size={14} className="text-accent-champagne" />
                </div>
                <span>Personalized Service</span>
              </div>

              <div className="flex items-center gap-3 text-bg-ivory/90 font-sans text-xs sm:text-sm font-medium">
                <div className="w-6 h-6 rounded-full bg-accent-champagne/15 flex items-center justify-center shrink-0">
                  <ShieldCheck size={14} className="text-accent-champagne" />
                </div>
                <span>Honest Guidance</span>
              </div>

              <div className="flex items-center gap-3 text-bg-ivory/90 font-sans text-xs sm:text-sm font-medium">
                <div className="w-6 h-6 rounded-full bg-accent-champagne/15 flex items-center justify-center shrink-0">
                  <MapPin size={14} className="text-accent-champagne" />
                </div>
                <span>Serving Clients Across Manitoba</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-2"
            >
              <Link
                href="/aboutus"
                className="inline-flex items-center gap-3 bg-accent-champagne text-brand-dark px-6 py-3 rounded-full font-sans text-xs uppercase tracking-[0.18em] font-bold hover:bg-accent-champagne-hover hover:text-bg-ivory transition-all duration-300 group shadow-md"
              >
                <span>Learn More About Charity</span>
                <ArrowUpRight
                  size={15}
                  className="group-hover:rotate-45 transition-transform duration-300"
                />
              </Link>
            </motion.div>
          </div>

          {/* Center Column: Arch Portrait Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4 relative h-[420px] sm:h-[500px] lg:h-[540px] rounded-t-full rounded-b-3xl overflow-hidden border border-white/10 bg-white/[0.02] shadow-2xl"
          >
            <Image
              src="/6.jpg"
              alt="Charity - Manitoba Real Estate Professional"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent" />
          </motion.div>

          {/* Right Column: 3 Compact Cards */}
          <div className="lg:col-span-3 space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md space-y-2 hover:border-accent-champagne/40 transition-colors"
            >
              <span className="text-[10px] font-mono text-accent-champagne font-bold uppercase tracking-widest">
                01 — Local Understanding
              </span>
              <p className="text-xs text-bg-ivory/80 font-sans font-light leading-relaxed">
                South Eastern Manitoba roots, with a commitment to serving clients across Manitoba.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md space-y-2 hover:border-accent-champagne/40 transition-colors"
            >
              <span className="text-[10px] font-mono text-accent-champagne font-bold uppercase tracking-widest">
                02 — Strategic Marketing
              </span>
              <p className="text-xs text-bg-ivory/80 font-sans font-light leading-relaxed">
                Professional photography, drone photography, and modern marketing for sellers.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md space-y-2 hover:border-accent-champagne/40 transition-colors"
            >
              <span className="text-[10px] font-mono text-accent-champagne font-bold uppercase tracking-widest">
                03 — Honest Guidance
              </span>
              <p className="text-xs text-bg-ivory/80 font-sans font-light leading-relaxed">
                Personalized support and thoughtful advice throughout the buying or selling process.
              </p>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}