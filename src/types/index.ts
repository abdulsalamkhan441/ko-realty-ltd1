import type { LucideIcon } from "lucide-react";

// ----------------------------------------------------------
// Generic building blocks
// ----------------------------------------------------------

export interface LinkItem {
  label: string;
  href: string;
}

/** Nav link with no "active" state — active is computed from the current pathname (Navbar.tsx) */
export interface SimpleNavLink {
  name: string;
  href: string;
}

/** Nav link with a hardcoded "active" flag (used by the nav embedded inside HeroSection.tsx) */
export interface StaticNavLink extends SimpleNavLink {
  active: boolean;
}

export interface StatItem {
  icon: LucideIcon;
  value: string;
  suffix: string;
  label: string;
}

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  linkText?: string;
  linkHref?: string;
}

// ----------------------------------------------------------
// Agent (About section)
// ----------------------------------------------------------

export interface Closing {
  address: string;
  neighbourhood: string;
  price: string;
}

export interface Agent {
  name: string;
  role: string;
  bio: string;
  image: string;
  specialties: string[];
  recentClosings: Closing[];
}

// ----------------------------------------------------------
// Properties
// ----------------------------------------------------------

export interface Property {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  image: string;
  price: string;
  category: "residential" | "portfolio";
  status?: string;
  specs: {
    size: string;
    beds: string;
    baths: string;
  };
  mls?: string;
}

// ----------------------------------------------------------
// Reviews / testimonial pages
// ----------------------------------------------------------

export interface ReviewPageData {
  featured: { name: string; quote: string; tags: string[]; handle: string; image: string; rating: number };
  quoteBanner: { quote: string; name: string; role: string; initials: string; rating: number };
  wide: { name: string; timeAgo: string; quote: string; rating: number };
  hero: { name: string; role: string; avatar: string; quote: string; body: string; rating: number };
  badge: { reviewCount: string; ratingLabel: string; clientsCount: string };
  split: { date: string; title: string; quote: string; rating: number; image: string };
  search: { title: string; body: string };
  teal: { name: string; body: string; avatar: string; likes: number; views: string };
}

// ----------------------------------------------------------
// Hero section
// ----------------------------------------------------------

export interface BrandConfig {
  initials: string;
  name: string;
  title: string;
  heroImage: string;
  heroImageAlt: string;
}

export interface HeroContentConfig {
  eyebrow: string;
  headingMain: string;
  headingItalic: string;
  headingEnd: string;
  subheading: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  headerCtaText: string;
  headerCtaLink: string;
}

export interface HeroSectionConfig {
  brand: BrandConfig;
  hero: HeroContentConfig;
  navLinks: StaticNavLink[];
  stats: StatItem[];
}

// ----------------------------------------------------------
// "Why Charity" / difference section
// ----------------------------------------------------------

export interface DifferenceConfig {
  eyebrow: string;
  headingMain: string;
  headingItalic: string;
  subtext: string;
  callNowText: string;
  callNowHref: string;
  bookConsultationText: string;
  bookConsultationHref: string;
  features: Feature[];
}

// ----------------------------------------------------------
// Home valuation form section
// ----------------------------------------------------------

export interface ValuationConfig {
  sectionTag: string;
  title: { main: string; highlight: string };
  description: string;
  contactDetails: {
    phone: LinkItem;
    email: LinkItem;
    location: string;
  };
  propertyOptions: { label: string; value: string }[];
}

// ----------------------------------------------------------
// Final CTA section
// ----------------------------------------------------------

export interface CTAContentConfig {
  headingMain: string;
  headingItalic: string;
  subheading: string;
  bulletPoints: string[];
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  agentName: string;
  agentTitle: string;
}

export interface DashboardCardConfig {
  title: string;
  subtitle: string;
  stats: { label: string; value: string }[];
  marketStatusLabel: string;
  marketStatusValue: string;
  badgeName: string;
  badgeTagline: string;
}

export interface StatBarConfig {
  label: string;
  value: string;
  color: string;
  valueColor: string;
}

// ----------------------------------------------------------
// Properties section chrome (PropertiesCarousel.tsx)
// ----------------------------------------------------------

export interface PropertiesSectionConfig {
  brand: { initial: string; name: string };
  contactLink: LinkItem;
  filters: {
    all: string;
    residential: string;
    portfolio: string;
  };
  heading: {
    line1: string;
    line1Emphasis: string;
    line2: string;
    line2Emphasis: string;
  };
  inquireButtonText: string;
  footerNote: {
    label: string;
    body: string;
  };
  areaBadge: string;
}

// ----------------------------------------------------------
// Footer
// ----------------------------------------------------------

export interface FooterLinkSection {
  title: string;
  links: LinkItem[];
}

export interface FooterConfig {
  headerImage: { src: string; alt: string };
  exploreSection: FooterLinkSection;
  resourcesSection: FooterLinkSection;
  legalSection: FooterLinkSection;
  contactDetails: {
    location: string;
    phonePrimary: LinkItem;
    phoneSecondary: LinkItem;
    contactLink: LinkItem;
  };
  brandBar: {
    brandName: string;
    badgeText: string;
    footerLinks: LinkItem[];
    copyrightHolder: string;
    copyrightRights: string;
  };
}