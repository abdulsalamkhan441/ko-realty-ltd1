"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, MapPin, Briefcase } from "lucide-react";

/* ------------------------------------------------------------------ */
/* TYPEWRITER TITLE COMPONENT — Animates text letter-by-letter fast   */
/* ------------------------------------------------------------------ */
const letterContainerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.025, // Fast typing speed (25ms per character)
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, display: "none" },
  visible: {
    opacity: 1,
    display: "inline",
  },
};

function TypewriterTitle({
  text,
  className = "",
  as: Component = "h1",
}: {
  text: string;
  className?: string;
  as?: React.ElementType;
}) {
  const letters = Array.from(text);

  return (
    <Component className={className}>
      <motion.span
        variants={letterContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="inline-block"
      >
        {letters.map((letter, index) => (
          <motion.span key={`${letter}-${index}`} variants={letterVariants}>
            {letter}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}

/* ------------------------------------------------------------------ */
/* GLOSSARY TERM — Wikipedia-style hover preview.                     */
/* ------------------------------------------------------------------ */
function GlossaryTerm({
  term,
  label,
  blurb,
  image,
}: {
  term: string;
  label: string;
  blurb: string;
  image: string;
}) {
  return (
    <span className="group/glossary relative inline-block">
      <span className="cursor-help border-b border-dotted border-accent-champagne/60 text-accent-champagne/90 not-italic">
        {term}
      </span>
      <span className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 w-56 -translate-x-1/2 translate-y-1 scale-95 opacity-0 transition-all duration-200 ease-out group-hover/glossary:translate-y-0 group-hover/glossary:scale-100 group-hover/glossary:opacity-100">
        <span className="block overflow-hidden rounded-xl border border-accent-champagne/20 bg-brand-navy-dark text-left shadow-2xl shadow-black/60">
          <span className="relative block h-24 w-full">
            <Image src={image} alt={label} fill className="object-cover" sizes="224px" />
            <span className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent" />
          </span>
          <span className="block px-3 py-2.5">
            <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.15em] text-accent-champagne">
              {label}
            </span>
            <span className="block text-[11px] font-sans not-italic leading-relaxed text-bg-ivory/80">
              {blurb}
            </span>
          </span>
        </span>
        <span className="absolute left-1/2 top-full -mt-px h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-accent-champagne/20 bg-brand-navy-dark" />
      </span>
    </span>
  );
}

export default function AboutHeroInteractive() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.6,
  });

  // Motion transforms for desktop morphing animation
  const frameX = useTransform(smoothProgress, [0, 0.75], ["24vw", "0vw"]);
  const frameScale = useTransform(smoothProgress, [0, 0.75], [1.35, 1]);
  const frameTopRadius = useTransform(smoothProgress, [0, 0.75], [28, 220]);
  const frameBottomRadius = useTransform(smoothProgress, [0, 0.75], [24, 40]);
  const frameRadius = useTransform(
    [frameTopRadius, frameBottomRadius],
    ([top, bottom]: number[]) => `${top}px ${top}px ${bottom}px ${bottom}px`
  );

  const frameOverflow = useTransform(smoothProgress, [0.6, 0.64], ["visible", "hidden"]);
  const imageScale = useTransform(smoothProgress, [0, 0.75], [1.15, 1]);
  const boxRevealOpacity = useTransform(smoothProgress, [0.62, 0.8], [0, 1]);

  const section1Opacity = useTransform(smoothProgress, [0, 0.32], [1, 0]);
  const section1Y = useTransform(smoothProgress, [0, 0.32], ["0px", "-32px"]);

  const section2Opacity = useTransform(smoothProgress, [0.45, 0.8], [0, 1]);
  const section2Y = useTransform(smoothProgress, [0.45, 0.8], ["32px", "0px"]);

  return (
    <div
      ref={containerRef}
      className="relative bg-brand-dark text-bg-ivory selection:bg-accent-champagne selection:text-brand-dark h-auto min-[1000px]:h-[200vh]"
    >
      <div className="w-full flex flex-col min-[1000px]:flex-row items-start min-[1000px]:items-center justify-center min-[1000px]:sticky min-[1000px]:top-0 min-[1000px]:h-screen min-[1000px]:overflow-hidden min-[1000px]:pt-16 min-[1000px]:pb-0">
        {/* Background Watermark */}
        <motion.span
          style={{ opacity: section1Opacity }}
          className="hidden min-[1000px]:block absolute left-12 top-1/2 -translate-y-1/2 font-serif text-[18vw] leading-none text-bg-ivory/[0.03] select-none pointer-events-none z-0"
        >
          Charity
        </motion.span>

        {/* ============================================================ */}
        {/* DESKTOP / LAPTOP (>=1000px): Scroll-interactive Morph View   */}
        {/* ============================================================ */}
        <div className="hidden min-[1000px]:flex relative z-10 w-full max-w-[92%] h-full items-center justify-center">
          {/* CENTER: PORTRAIT FRAME */}
          <motion.div
            style={{
              x: frameX,
              scale: frameScale,
              borderRadius: frameRadius,
              overflow: frameOverflow,
              willChange: "transform",
            }}
            className="relative w-[320px] sm:w-[380px] md:w-[420px] h-[460px] sm:h-[510px] md:h-[560px] shrink-0"
          >
            {/* Shadow & Glow Backdrops */}
            <motion.div
              style={{ opacity: boxRevealOpacity, borderRadius: frameRadius }}
              className="absolute inset-0 shadow-2xl shadow-black/80 pointer-events-none z-0"
            />
            <motion.div
              style={{ opacity: boxRevealOpacity, borderRadius: frameRadius }}
              className="absolute inset-0 bg-white/5 overflow-hidden pointer-events-none z-0"
            >
              <motion.div
                className="absolute w-[70%] h-[70%] rounded-full bg-accent-champagne/25 blur-2xl"
                style={{ top: "-10%", left: "-10%" }}
                animate={{ x: [0, 14, -8, 0], y: [0, -10, 8, 0] }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute w-[60%] h-[60%] rounded-full bg-brand-navy-light/30 blur-2xl"
                style={{ bottom: "-15%", right: "-10%" }}
                animate={{ x: [0, -10, 8, 0], y: [0, 10, -8, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Gradient Overlay & Border */}
            <motion.div
              style={{ opacity: boxRevealOpacity }}
              className="absolute inset-0 bg-gradient-to-b from-accent-champagne/20 via-transparent to-brand-dark/40 pointer-events-none z-10"
            />
            <motion.div
              style={{ opacity: boxRevealOpacity }}
              className="absolute inset-0 rounded-[inherit] border border-accent-champagne/30 pointer-events-none z-20"
            />

            {/* Portrait Image */}
            <motion.div
              style={{ scale: imageScale }}
              className="absolute -left-[18%] top-0 w-[136%] h-full z-[5]"
            >
              <Image
                src="/user1.21.png"
                alt="Charity Reimer - Winnipeg REALTOR®"
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>

          {/* INITIAL HERO TITLE */}
          <motion.div
            style={{ opacity: section1Opacity, y: section1Y }}
            className="absolute left-6 md:left-16 top-1/2 -translate-y-1/2 max-w-lg z-20 space-y-6 pointer-events-none"
          >
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-accent-champagne">
              01 · Her Journey
            </span>
            <TypewriterTitle
              text="Charity Reimer"
              as="h1"
              className="text-5xl sm:text-6xl lg:text-7xl font-serif text-bg-ivory tracking-tight leading-[1.05]"
            />
            <p className="text-lg text-bg-ivory/70 font-sans leading-relaxed">
              From her roots in South Eastern Manitoba to serving clients statewide with dedicated, transparent real estate leadership.
            </p>
          </motion.div>

          {/* SPLIT STORY VIEW */}
          <motion.div
            style={{ opacity: section2Opacity, y: section2Y }}
            className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between items-center z-20 pointer-events-none"
          >
            {/* LEFT SIDE: PERSONAL ORIGIN & HISTORY */}
            <div className="max-w-xs xl:max-w-sm space-y-5 pointer-events-auto text-left">
              <div className="flex items-center gap-2 text-accent-champagne">
                <MapPin size={16} />
                <span className="text-xs uppercase tracking-[0.25em] font-semibold">
                  Roots & Early Life
                </span>
              </div>
              <TypewriterTitle
                text="Born & Raised in South Eastern Manitoba"
                as="h2"
                className="text-2xl xl:text-3xl font-serif text-bg-ivory leading-tight"
              />
              <p className="text-xs xl:text-sm text-bg-ivory/80 font-sans leading-relaxed">
                Growing up in{" "}
                <GlossaryTerm
                  term="South Eastern Manitoba"
                  label="South Eastern Manitoba"
                  blurb="Farmland, small towns, and tight-knit communities east of Winnipeg — where Charity grew up."
                  image="/image1.png"
                />{" "}
                shaped Charity&rsquo;s strong work ethic, community values, and deep understanding of local land and lifestyle. Surrounded by close-knit communities, she learned early on that trust and personal relationships are the foundation of everything. Long summers spent among farmland and small-town main streets taught her to read a property the way locals do — not just square footage, but soil, sightlines, and the quiet things that make a place feel like home. That upbringing still shapes how she listens to every client today.
              </p>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-[11px] font-sans text-bg-ivory/60 italic leading-relaxed">
                  &ldquo;Community ties and rural roots give me an authentic perspective on Manitoba living.&rdquo;
                </p>
              </div>
            </div>

            {/* RIGHT SIDE: PROFESSIONAL CAREER & COMMITMENT */}
            <div className="max-w-xs xl:max-w-sm space-y-5 pointer-events-auto text-left">
              <div className="flex items-center gap-2 text-accent-champagne">
                <Briefcase size={16} />
                <span className="text-xs uppercase tracking-[0.25em] font-semibold">
                  Professional Practice
                </span>
              </div>
              <TypewriterTitle
                text="Strategic Real Estate Leadership"
                as="h2"
                className="text-2xl xl:text-3xl font-serif text-bg-ivory leading-tight"
              />
              <p className="text-xs xl:text-sm text-bg-ivory/80 font-sans leading-relaxed">
                Building on her local background, Charity translated her passion for regional growth into a thriving real estate career. Today, she guides buyers, sellers, and landowners across both urban{" "}
                <GlossaryTerm
                  term="Winnipeg markets"
                  label="Winnipeg Housing Market"
                  blurb="Manitoba's urban core — condos, established neighbourhoods, and steady year-round demand."
                  image="/image2.png"
                />{" "}
                and rural{" "}
                <GlossaryTerm
                  term="Manitoba acreage"
                  label="Rural Manitoba Acreage"
                  blurb="Larger parcels, farmland, and hobby-farm properties outside city limits."
                  image="/image3.png"
                />{" "}
                with structured data, transparent advice, and client-first advocacy. Every listing gets the same rigor: current comparables, honest pricing conversations, and a negotiation strategy built around what actually matters to the client — not just closing fast. It&rsquo;s a practice built on returning calls, keeping promises, and being the same person on day sixty as day one.
              </p>
              <div>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-3 bg-accent-champagne text-brand-dark px-6 py-3 rounded-full font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-accent-champagne-hover hover:text-bg-ivory transition-all duration-300 pointer-events-auto"
                >
                  Explore Services
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ============================================================ */}
        {/* MOBILE / TABLET (<1000px): Stacked Document Flow             */}
        {/* ============================================================ */}
        <div className="min-[1000px]:hidden w-full px-6 py-16 flex flex-col items-center text-center gap-10">
          {/* Photo Container */}
          <div className="relative w-full max-w-xs">
            <div className="absolute -inset-8 z-0 pointer-events-none">
              <motion.div
                className="absolute w-[70%] h-[70%] rounded-full bg-accent-champagne/25 blur-3xl"
                style={{ top: "-8%", left: "-8%" }}
                animate={{ x: [0, 14, -8, 0], y: [0, -10, 8, 0] }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute w-[65%] h-[65%] rounded-full bg-brand-navy-light/30 blur-3xl"
                style={{ bottom: "-12%", right: "-8%" }}
                animate={{ x: [0, -10, 8, 0], y: [0, 10, -8, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative z-10 rounded-[2rem] overflow-hidden aspect-[4/5] shadow-2xl shadow-black/60"
            >
              <Image
                src="/user1.21.png"
                alt="Charity Reimer - Winnipeg REALTOR®"
                fill
                priority
                className="object-cover object-top "
                sizes="90vw"
              />
            </motion.div>
          </div>

          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-md space-y-3"
          >
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-accent-champagne">
              01 · Her Story
            </span>
            <TypewriterTitle
              text="Charity Reimer"
              as="h1"
              className="text-4xl sm:text-5xl font-serif text-bg-ivory tracking-tight leading-[1.05]"
            />
          </motion.div>

          {/* Personal Background (Mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-md space-y-3 text-left border-l-2 border-accent-champagne/40 pl-4 bg-white/[0.02] p-4 rounded-r-xl"
          >
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-accent-champagne flex items-center gap-2">
              <MapPin size={14} /> Born & Raised
            </span>
            <TypewriterTitle
              text="South Eastern Manitoba Roots"
              as="h2"
              className="text-xl font-serif text-bg-ivory leading-tight"
            />
            <p className="text-sm text-bg-ivory/80 font-sans leading-relaxed">
              Growing up in South Eastern Manitoba instilled a deep respect for community values, hard work, and rural lifestyles. Her upbringing created a strong foundation built on integrity, clear speech, and long-lasting personal relationships.
            </p>
          </motion.div>

          {/* Professional Career (Mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            className="max-w-md space-y-4 text-left border-l-2 border-accent-champagne/40 pl-4 bg-white/[0.02] p-4 rounded-r-xl"
          >
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-accent-champagne flex items-center gap-2">
              <Briefcase size={14} /> Professional Career
            </span>
            <TypewriterTitle
              text="Strategic Real Estate Practice"
              as="h2"
              className="text-xl font-serif text-bg-ivory leading-tight"
            />
            <p className="text-sm text-bg-ivory/80 font-sans leading-relaxed">
              Charity brings her local background into every transaction across Manitoba. From urban residential homes to expansive rural properties and farmland, she leads clients through complex moves with personalized strategy and transparent execution.
            </p>
            <div className="pt-2">
              <Link
                href="/services"
                className="inline-flex items-center gap-3 bg-accent-champagne text-brand-dark px-7 py-3.5 rounded-full font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-accent-champagne-hover hover:text-bg-ivory transition-all duration-300"
              >
                Explore Services
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}