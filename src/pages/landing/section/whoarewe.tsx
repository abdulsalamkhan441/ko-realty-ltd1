"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { agent as AGENT } from "../../../types/sitecontent";

// ============================================================================
// TYPES
// ============================================================================
interface Closing {
  address: string;
  neighbourhood: string;
  price: string;
}

// ============================================================================
// COMPONENT
// ============================================================================
export default function AgentSection() {
  return (
    <section className="relative w-full bg-brand-dark text-bg-ivory py-14 md:py-20 px-6 md:px-12 overflow-hidden">
      {/* Background grid */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1f2d3a0a_1px,transparent_1px),linear-gradient(to_bottom,#1f2d3a0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" 
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-14 md:mb-20"
        >
          <div className="w-6 h-[1px] bg-accent-champagne" aria-hidden="true" />
          <span className="text-accent-champagne text-xs uppercase tracking-[0.25em] font-sans font-semibold">
            About KO realty ltd
          </span>
        </motion.div>

        {/* Hero: portrait + identity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-5 relative group"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={AGENT.image}
                alt={`Portrait of ${AGENT.name}`}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                priority
                className="object-cover object-top grayscale-[0.2] contrast-125 brightness-[0.95] group-hover:brightness-100 group-hover:grayscale-[0.4] transition-all duration-700 ease-out"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 75% 70% at 50% 35%, transparent 45%, var(--color-brand-dark) 97%)",
                }}
              />
              <div 
                aria-hidden="true" 
                className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent" 
              />

              {/* Name overlaid on portrait */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-10">
                <h2 className="font-serif text-4xl sm:text-5xl leading-[1.05] text-bg-ivory">
                  {AGENT.name}
                </h2>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] font-sans text-accent-champagne">
                  {AGENT.role}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Bio + specialties */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="lg:col-span-7 flex flex-col gap-8 pb-2"
          >
            <p className="text-base sm:text-lg font-sans font-light leading-relaxed text-bg-ivory/70 max-w-xl">
              {AGENT.bio}
            </p>

            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[11px] font-sans uppercase tracking-wider">
              {AGENT.specialties.map((spec: string, i: number) => (
                <React.Fragment key={spec}>
                  {i > 0 && <span className="text-bg-ivory/25" aria-hidden="true">·</span>}
                  <span className="text-bg-ivory/60">{spec}</span>
                </React.Fragment>
              ))}
            </div>

            <a
              href="#contact"
              className="group inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.2em] font-sans font-semibold text-accent-champagne border-b border-accent-champagne/40 pb-1 hover:border-accent-champagne transition-colors"
            >
              Book a Consultation
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>

            {/* Recent closings / principles */}
            <div className="pt-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-[1px] bg-accent-champagne" aria-hidden="true" />
                <span className="text-accent-champagne text-xs uppercase tracking-[0.25em] font-sans font-semibold">
                  What Guides My Work
                </span>
              </div>

              <div className="border-t border-white/10">
                {AGENT.recentClosings.map((sale: Closing) => (
                  <div
                    key={sale.address}
                    className="grid grid-cols-[1fr_auto] sm:grid-cols-[2fr_1fr_auto] items-baseline gap-x-6 py-3.5 border-b border-white/10"
                  >
                    <span className="font-serif text-base sm:text-lg text-bg-ivory">
                      {sale.address}
                    </span>
                    <span className="hidden sm:block text-xs uppercase tracking-wider font-sans text-bg-ivory/45">
                      {sale.neighbourhood}
                    </span>
                    <span className="text-right text-sm font-sans text-accent-champagne">
                      {sale.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}