"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal, Menu, X } from "lucide-react";
import { navbarLinks as NAV_LINKS } from "../types/sitecontent";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

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
              CR
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base sm:text-lg tracking-[0.15em] uppercase text-bg-ivory leading-none">
                Charity Reimer
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.28em] text-accent-champagne uppercase font-sans mt-1">
                Winnipeg REALTOR®
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs uppercase tracking-[0.2em] font-sans transition-colors relative py-1 ${
                    isActive
                      ? "text-accent-champagne font-semibold"
                      : "text-bg-ivory/70 hover:text-bg-ivory"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent-champagne"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Callouts */}
          <div className="flex items-center gap-3">
            <Link
              href="/#contact"
              className="hidden sm:inline-flex px-5 md:px-6 py-2.5 border border-accent-champagne/60 text-accent-champagne hover:bg-accent-champagne hover:text-brand-dark text-xs uppercase tracking-[0.18em] font-sans font-medium transition-all duration-300 rounded-full"
            >
              Get In Touch
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

      {/* Mobile Nav Overlay */}
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
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`font-serif text-3xl transition-colors ${
                      isActive
                        ? "text-accent-champagne"
                        : "text-bg-ivory/80 hover:text-bg-ivory"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                href="/#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-4 px-8 py-3 border border-accent-champagne/60 text-accent-champagne text-xs uppercase tracking-[0.18em] font-sans font-medium rounded-full"
              >
                Get In Touch
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}