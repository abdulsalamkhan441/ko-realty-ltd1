"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Send, ArrowUp } from "lucide-react";
import { footerConfig as CLIENT_CONFIG } from "../types/sitecontent";

interface FooterLinkItem {
  label: string;
  href: string;
}

export default function FooterSection() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative w-full bg-brand-dark text-bg-ivory overflow-hidden font-sans">
      {/* GRAPHIC BACKGROUND HEADER AREA
          A real skyline photograph, desaturated and tinted champagne to match
          the brand, fading top-to-bottom into the solid footer background —
          same "image dissolving into dark" technique used on the Team portraits. */}
      <div
        aria-hidden
        className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden pointer-events-none"
      >
        <Image
          src={CLIENT_CONFIG.headerImage.src}
          alt={CLIENT_CONFIG.headerImage.alt}
          fill
          className="object-cover object-bottom grayscale brightness-[0.5] contrast-125"
        />

        {/* Champagne duotone tint so the photo reads as "on-brand" rather than a raw stock photo */}
        <div className="absolute inset-0 mix-blend-color bg-accent-champagne/30" />

        {/* Subtle architectural grid, kept from the original for texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:2rem_2rem]" />

        {/* Fade the top edge so it doesn't hard-clip against whatever sits above the footer */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-transparent to-transparent" />

        {/* Fade the bottom into solid brand-dark where the nav grid begins */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-dark" />
      </div>

      {/* MAIN FOOTER NAVIGATION GRID */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 -mt-36 md:-mt-40 relative z-10 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* COLUMN 1: Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-accent-champagne pb-2 border-b border-white/10 max-w-[140px]">
              {CLIENT_CONFIG.exploreSection.title}
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              {CLIENT_CONFIG.exploreSection.links.map((link: FooterLinkItem) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-accent-champagne transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 2: Resources */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-accent-champagne pb-2 border-b border-white/10 max-w-[140px]">
              {CLIENT_CONFIG.resourcesSection.title}
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              {CLIENT_CONFIG.resourcesSection.links.map((link: FooterLinkItem) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-accent-champagne transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: Legal */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-accent-champagne pb-2 border-b border-white/10 max-w-[140px]">
              {CLIENT_CONFIG.legalSection.title}
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              {CLIENT_CONFIG.legalSection.links.map((link: FooterLinkItem) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-accent-champagne transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: Social + Direct Contact */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center gap-3">
              <a
                href={CLIENT_CONFIG.contactDetails.contactLink.href}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-accent-champagne hover:text-brand-dark hover:-translate-y-0.5 transition-all duration-300"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>

            <div className="space-y-2 text-xs text-white/80 font-light">
              <div className="flex items-center gap-2">
                <MapPin size={13} className="text-accent-champagne shrink-0" />
                <span>{CLIENT_CONFIG.contactDetails.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-accent-champagne shrink-0" />
                <a href={CLIENT_CONFIG.contactDetails.phonePrimary.href} className="hover:underline">
                  {CLIENT_CONFIG.contactDetails.phonePrimary.label}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-accent-champagne shrink-0" />
                <a href={CLIENT_CONFIG.contactDetails.phoneSecondary.href} className="hover:underline">
                  {CLIENT_CONFIG.contactDetails.phoneSecondary.label}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Send size={13} className="text-accent-champagne shrink-0" />
                <a href={CLIENT_CONFIG.contactDetails.contactLink.href} className="hover:underline">
                  {CLIENT_CONFIG.contactDetails.contactLink.label}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM COPYRIGHT & BRAND BAR */}
      <div className="w-full border-t border-white/10 bg-black/40 py-6 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-white text-base tracking-wider">
              {CLIENT_CONFIG.brandBar.brandName}
            </span>
            <span className="text-[10px] text-accent-champagne font-sans uppercase tracking-widest px-2 py-0.5 rounded bg-accent-champagne/10 border border-accent-champagne/20">
              {CLIENT_CONFIG.brandBar.badgeText}
            </span>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            {CLIENT_CONFIG.brandBar.footerLinks.map((link: FooterLinkItem) => (
              <Link key={link.label} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <p className="text-[11px] text-center md:text-right">
              © {new Date().getFullYear()} {CLIENT_CONFIG.brandBar.copyrightHolder}. {CLIENT_CONFIG.brandBar.copyrightRights}
            </p>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-accent-champagne hover:border-accent-champagne/50 hover:-translate-y-0.5 transition-all duration-300 shrink-0"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}