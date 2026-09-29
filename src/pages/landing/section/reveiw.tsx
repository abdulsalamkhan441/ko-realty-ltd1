"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Heart,
  Eye,
  X,
  Search,
  Frown,
} from "lucide-react";
import { reviewPages as PAGES } from "../../../types/sitecontent";

function StarRow({ count, size = 14 }: { count: number; size?: number }) {
  if (count <= 0) return null;
  return (
    <div className="flex gap-1 text-amber-400" aria-label={`Rating: ${count} out of 5 stars`}>
      {[...Array(count)].map((_, i) => (
        <Star key={i} size={size} fill="currentColor" />
      ))}
    </div>
  );
}

export default function ReviewsGlassSection() {
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const data = PAGES[page];
  const totalPages = PAGES.length;

  const q = query.trim().toLowerCase();
  const matches = (...text: string[]) =>
    q === "" || text.some((t) => t.toLowerCase().includes(q));

  const teal_key = `${page}-teal`;
  const tealLikeCount = likeCounts[teal_key] ?? data.teal.likes;
  const isTealLiked = liked[teal_key] ?? false;

  const toggleLike = () => {
    setLiked((prev) => ({ ...prev, [teal_key]: !isTealLiked }));
    setLikeCounts((prev) => ({
      ...prev,
      [teal_key]: (prev[teal_key] ?? data.teal.likes) + (isTealLiked ? -1 : 1),
    }));
  };

  const isDismissed = (key: string) => dismissed.has(`${page}-${key}`);
  const dismiss = (key: string) =>
    setDismissed((prev) => new Set(prev).add(`${page}-${key}`));

  const goToPage = (next: number) => {
    setPage(((next % totalPages) + totalPages) % totalPages);
    setQuery("");
  };

  const visibleCount = useMemo(() => {
    let n = 0;
    if (!isDismissed("featured") && matches(data.featured.name, ...data.featured.tags)) n++;
    if (matches(data.quoteBanner.quote, data.quoteBanner.name)) n++;
    if (matches(data.wide.quote, data.wide.name)) n++;
    if (matches(data.hero.quote, data.hero.body, data.hero.name)) n++;
    if (matches(data.badge.ratingLabel)) n++;
    if (matches(data.split.title, data.split.quote)) n++;
    if (matches(data.search.title, data.search.body)) n++;
    if (matches(data.teal.name, data.teal.body)) n++;
    return n;
  }, [data, q, dismissed, page]);

  const cardMotionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10, scale: 0.96 },
  };

  return (
    <section className="relative w-full bg-brand-dark py-6 md:py-10 px-4 sm:px-6 lg:px-12 overflow-hidden text-bg-ivory border-white/10">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-accent-champagne text-xs uppercase tracking-[0.2em] font-sans font-bold mb-4"
          >
            <Quote size={13} className="text-accent-champagne" />
            KO realty ltd&apos;s Approach
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-serif tracking-tight text-bg-ivory"
          >
            A Professional{" "}
            <span className="italic font-normal text-accent-champagne">Experience</span>
          </motion.h2>
        </div>

        {q !== "" && visibleCount === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center gap-3 py-16 text-white/50"
          >
            <Frown size={28} />
            <p className="text-sm font-sans">No experience details match &ldquo;{query}&rdquo;.</p>
            <button
              onClick={() => setQuery("")}
              className="text-xs uppercase tracking-widest text-accent-champagne underline underline-offset-4 hover:text-white transition-colors"
            >
              Clear search
            </button>
          </motion.div>
        )}

        {/* Masonry / Floating Glass Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
          {/* COLUMN 1 */}
          <div className="md:col-span-4 space-y-5">
            <AnimatePresence mode="wait">
              {!isDismissed("featured") &&
                matches(data.featured.name, ...data.featured.tags) && (
                  <motion.div
                    key={`featured-${page}`}
                    variants={cardMotionVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ delay: 0, duration: 0.5 }}
                    layout
                    className="-rotate-1 hover:rotate-0 transition-transform duration-300 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-5 shadow-2xl overflow-hidden hover:border-accent-champagne/40"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <StarRow count={data.featured.rating} />
                      <button
                        aria-label="Dismiss this detail"
                        onClick={() => dismiss("featured")}
                        className="text-white/40 hover:text-white transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-white mb-3">
                      {data.featured.name}
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-5">
                      <span className="px-3 py-1 rounded-full text-[11px] font-sans font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {data.featured.tags[0]}
                      </span>
                      <span className="px-3 py-1 rounded-full text-[11px] font-sans font-medium bg-white/10 text-white/80 border border-white/15">
                        {data.featured.tags[1]}
                      </span>
                    </div>

                    <p className="text-xs font-sans text-white/60 mb-4">{data.featured.handle}</p>

                    <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-white/10">
                      <Image
                        src={data.featured.image}
                        alt="Winnipeg real estate featured image"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                        loading="eager"
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {matches(data.quoteBanner.quote, data.quoteBanner.name) && (
                <motion.div
                  key={`quote-${page}`}
                  variants={cardMotionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ delay: 0.1, duration: 0.5 }}
                  layout
                  className="rotate-1 hover:rotate-0 transition-transform duration-300 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-2xl hover:border-accent-champagne/40"
                >
                  <div className="mb-3">
                    <StarRow count={data.quoteBanner.rating} size={13} />
                  </div>
                  <p className="text-xs font-sans font-light text-white/80 leading-relaxed mb-4">
                    &ldquo;{data.quoteBanner.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent-champagne text-brand-dark flex items-center justify-center font-bold text-xs">
                      {data.quoteBanner.initials}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{data.quoteBanner.name}</h4>
                      <p className="text-[10px] text-white/50">{data.quoteBanner.role}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* COLUMN 2 */}
          <div className="md:col-span-5 space-y-5">
            <AnimatePresence mode="wait">
              {matches(data.wide.quote, data.wide.name) && (
                <motion.div
                  key={`wide-${page}`}
                  variants={cardMotionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ delay: 0.15, duration: 0.5 }}
                  layout
                  className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-5 shadow-2xl flex items-center justify-between gap-4 hover:border-accent-champagne/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-white">{data.wide.name}</span>
                      <span className="text-[10px] text-white/40">{data.wide.timeAgo}</span>
                    </div>
                    <p className="text-xs font-sans text-white/80 line-clamp-2">{data.wide.quote}</p>
                  </div>
                  <div className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                    <Star size={12} fill="currentColor" />
                    {data.wide.rating ? `${data.wide.rating}.0/5.0` : "Service detail"}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {matches(data.hero.quote, data.hero.body, data.hero.name) && (
                <motion.div
                  key={`hero-${page}`}
                  variants={cardMotionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ delay: 0.2, duration: 0.5 }}
                  layout
                  className="-rotate-[0.5deg] hover:rotate-0 transition-transform duration-300 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 shadow-2xl relative hover:border-accent-champagne/40"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/30">
                        <Image src={data.hero.avatar} alt={data.hero.name} fill sizes="48px" className="object-cover" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">{data.hero.name}</h3>
                        <p className="text-xs text-white/50">{data.hero.role}</p>
                      </div>
                    </div>
                    {data.hero.rating > 0 && (
                      <div className="flex gap-1 text-amber-400 bg-black/20 px-3 py-1.5 rounded-full border border-white/10">
                        <StarRow count={data.hero.rating} />
                      </div>
                    )}
                  </div>

                  <h2 className="text-2xl font-serif font-bold text-white mb-3 leading-snug">
                    {data.hero.quote}
                  </h2>
                  <p className="text-xs font-sans text-white/70 leading-relaxed">{data.hero.body}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Interactive feedback rating */}
            <motion.div
              variants={cardMotionVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.25, duration: 0.5 }}
              className="rotate-[0.5deg] hover:rotate-0 transition-transform duration-300 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-5 shadow-2xl flex items-center justify-between gap-4"
            >
              <span className="text-xs font-medium text-white/80 shrink-0">Rate Your Experience</span>
              <div className="flex items-center gap-3">
                <div
                  className="flex gap-0.5"
                  onMouseLeave={() => setHoverRating(null)}
                  role="radiogroup"
                  aria-label="Rate your experience out of 5 stars"
                >
                  {[1, 2, 3, 4, 5].map((star) => {
                    const active = (hoverRating ?? feedbackRating) >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        role="radio"
                        aria-checked={feedbackRating === star}
                        aria-label={`${star} star${star > 1 ? "s" : ""}`}
                        onMouseEnter={() => setHoverRating(star)}
                        onClick={() => setFeedbackRating(star)}
                        className="text-amber-400 hover:scale-110 transition-transform focus:outline-none"
                      >
                        <Star size={16} fill={active ? "currentColor" : "none"} strokeWidth={1.5} />
                      </button>
                    );
                  })}
                </div>
                <span className="text-xs font-bold text-accent-champagne w-9 text-right">
                  {feedbackRating * 20}%
                </span>
              </div>
            </motion.div>
          </div>

          {/* COLUMN 3 */}
          <div className="md:col-span-3 space-y-5">
            <AnimatePresence mode="wait">
              {matches(data.badge.ratingLabel) && (
                <motion.div
                  key={`badge-${page}`}
                  variants={cardMotionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ delay: 0.2, duration: 0.5 }}
                  layout
                  className="-rotate-1 hover:rotate-0 transition-transform duration-300 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-5 shadow-2xl text-center hover:border-accent-champagne/40"
                >
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-accent-champagne/20 text-accent-champagne text-[10px] font-bold mb-2">
                    {data.badge.reviewCount}
                  </span>
                  <h4 className="text-sm font-bold text-white mb-1">{data.badge.ratingLabel}</h4>
                  <p className="text-xs text-emerald-400 font-semibold">Verified information from {data.badge.clientsCount}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {matches(data.split.title, data.split.quote) && (
                <motion.div
                  key={`split-${page}`}
                  variants={cardMotionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ delay: 0.25, duration: 0.5 }}
                  layout
                  className="rotate-1 hover:rotate-0 transition-transform duration-300 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 overflow-hidden shadow-2xl flex hover:border-accent-champagne/40"
                >
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-white/40 block mb-1">{data.split.date}</span>
                      <h4 className="text-sm font-serif font-bold text-white mb-1">{data.split.title}</h4>
                      <p className="text-[11px] text-white/60 leading-tight">{data.split.quote}</p>
                    </div>
                    {data.split.rating > 0 && (
                      <div className="mt-3">
                        <StarRow count={data.split.rating} size={11} />
                      </div>
                    )}
                  </div>
                  <div className="relative w-24 border-l border-white/10">
                    <Image src={data.split.image} alt="Real estate client" fill sizes="96px" className="object-cover" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Search card */}
            <motion.div
              variants={cardMotionVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.3, duration: 0.5 }}
              className="-rotate-1 hover:rotate-0 transition-transform duration-300 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-5 shadow-2xl space-y-3"
            >
              <div className="flex items-center justify-between bg-white/10 rounded-full pl-3 pr-1.5 py-1.5 border border-white/15 focus-within:border-accent-champagne/50 transition-colors">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search services..."
                  aria-label="Search services"
                  className="bg-transparent text-xs text-white placeholder:text-white/40 focus:outline-none w-full"
                />
                {query ? (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => setQuery("")}
                    className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center text-white shrink-0 hover:bg-white/25 transition-colors"
                  >
                    <X size={12} />
                  </button>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-brand-dark shrink-0">
                    <Search size={12} />
                  </div>
                )}
              </div>

              {matches(data.search.title, data.search.body) && (
                <div className="pt-2">
                  <h4 className="text-sm font-bold text-white mb-1">{data.search.title}</h4>
                  <p className="text-[11px] text-white/60 leading-relaxed line-clamp-3">{data.search.body}</p>
                </div>
              )}
            </motion.div>

            <AnimatePresence mode="wait">
              {matches(data.teal.name, data.teal.body) && (
                <motion.div
                  key={`teal-${page}`}
                  variants={cardMotionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ delay: 0.35, duration: 0.5 }}
                  layout
                  className="rotate-1 hover:rotate-0 transition-transform duration-300 rounded-3xl bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/30 p-5 shadow-2xl relative text-center hover:border-emerald-400"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden mx-auto mb-3 border border-emerald-400/40 relative">
                    <Image src={data.teal.avatar} alt="Client avatar" fill sizes="48px" className="object-cover" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{data.teal.name}</h4>
                  <p className="text-[11px] text-white/70 mb-4">{data.teal.body}</p>

                  <div className="flex items-center justify-center gap-4 text-xs text-emerald-300 border-t border-emerald-500/20 pt-3">
                    <button
                      type="button"
                      onClick={toggleLike}
                      aria-pressed={isTealLiked}
                      aria-label={isTealLiked ? "Unlike service highlight" : "Like service highlight"}
                      className="flex items-center gap-1 hover:scale-105 transition-transform"
                    >
                      <motion.span
                        key={isTealLiked ? "liked" : "unliked"}
                        initial={{ scale: 0.6 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      >
                        <Heart size={13} fill={isTealLiked ? "currentColor" : "none"} className={isTealLiked ? "text-emerald-300" : "text-emerald-300/70"} />
                      </motion.span>
                      {tealLikeCount.toLocaleString()}
                    </button>
                    <span className="flex items-center gap-1">
                      <Eye size={13} /> {data.teal.views}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Functional Pagination */}
        <div className="flex items-center justify-center gap-3 mt-12">
          <button
            type="button"
            aria-label="Previous page"
            onClick={() => goToPage(page - 1)}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 hover:scale-105 transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-1.5">
            {PAGES.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to page ${i + 1}`}
                onClick={() => goToPage(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === page ? "w-6 bg-accent-champagne" : "w-2 bg-white/20 hover:bg-white/35"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next page"
            onClick={() => goToPage(page + 1)}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 hover:scale-105 transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}