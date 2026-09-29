"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Key, Home } from "lucide-react";

// Variants for staggered parent-child animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.21, 0.47, 0.32, 0.98] as const,
    },
  },
};

export default function SimpleAnimatedCTA() {
  return (
    <section className="relative w-full bg-brand-dark py-32 px-6 sm:px-10 lg:px-16 overflow-hidden selection:bg-accent-champagne selection:text-brand-dark">
      {/* Animated Ambient Lens Flare & Background Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
        {/* Pulsing Core Flare */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-[500px] h-[300px] bg-accent-champagne/20 blur-[130px] rounded-full"
        />

        {/* Secondary Drifting Light */}
        <motion.div
          animate={{
            x: [-20, 20, -20],
            y: [-10, 10, -10],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-[350px] h-[200px] bg-amber-400/15 blur-[100px] rounded-full"
        />
      </div>

      {/* Main Animated Content Overlay */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center justify-center space-y-8"
      >
        {/* Animated Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-champagne/30 bg-white/[0.03] backdrop-blur-md shadow-lg shadow-black/30"
        >
          <motion.div
            animate={{ rotate: [0, 12, -12, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Key size={14} className="text-accent-champagne" />
          </motion.div>
          <span className="text-[11px] font-sans font-semibold tracking-[0.22em] uppercase text-accent-champagne">
            Ready For Your Next Move
          </span>
        </motion.div>

        {/* Animated Headline */}
        <motion.h2
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-serif text-bg-ivory leading-[1.1] tracking-tight max-w-2xl"
        >
          Your Next Chapter Begins With The Right Key
        </motion.h2>

        {/* Animated Subtext */}
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base text-bg-ivory/70 font-sans font-light max-w-lg leading-relaxed"
        >
          Whether buying your dream home or selling a property with history, Charity Reimer guides you through every step with personal dedicated expertise.
        </motion.p>

        {/* Animated Call To Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4 pt-4"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Link
              href="/#contact"
              className="group relative inline-flex items-center gap-3 bg-accent-champagne text-brand-dark px-8 py-4 rounded-full font-sans text-xs font-bold tracking-[0.2em] uppercase hover:bg-accent-champagne-hover transition-colors duration-300 shadow-xl shadow-black/40"
            >
              <Home size={16} />
              <span>Handover Your Keys</span>
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/15 bg-white/[0.02] text-bg-ivory hover:bg-white/[0.08] hover:border-white/25 font-sans text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300"
            >
              Explore Options
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}