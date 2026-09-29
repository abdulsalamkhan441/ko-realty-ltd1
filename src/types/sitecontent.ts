import {
  Award,
  Building2,
  Users,
  Clock,
  TrendingUp,
  ShieldCheck,
  BadgeCheck,
  HeartHandshake,
} from "lucide-react";

import type {
  SimpleNavLink,
  HeroSectionConfig,
  DifferenceConfig,
  Agent,
  Property,
  ReviewPageData,
  CTAContentConfig,
  DashboardCardConfig,
  StatBarConfig,
  ValuationConfig,
  FooterConfig,
} from "../types";

/**
 * ============================================================
 *  SITE CONFIG — SINGLE SOURCE OF TRUTH FOR THIS CLIENT
 * ============================================================
 * To onboard a new realtor: duplicate this file, keep every
 * exported name and shape identical (the types in ./types
 * will flag anything missing), fill in their content, and
 * point the app at the new file. No component ever changes.
 * ============================================================
 */

// ----------------------------------------------------------
// Navbar.tsx
// ----------------------------------------------------------

export const navbarLinks: SimpleNavLink[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/aboutus" },
  { name: "Services", href: "/services" },
  { name: "Properties", href: "/#properties" },
  { name: "Insights", href: "/#insights" },
  { name: "Contact", href: "/#contact" },
];

// ----------------------------------------------------------
// HeroSection.tsx
// ----------------------------------------------------------

export const heroConfig: HeroSectionConfig = {
  brand: {
    initials: "KO",
    name: "KO Realty Ltd.",
    title: "Calgary Real Estate Brokerage",
    heroImage: "/3.jpg",
    heroImageAlt: "Modern Calgary Property",
  },
  hero: {
    eyebrow: "KO Realty Ltd. · Calgary Real Estate",
    headingMain: "Buy, sell, and invest with",
    headingItalic: "confidence",
    headingEnd: "with KO Realty.",
    subheading:
      "Full-service real estate brokerage and property management helping clients across Calgary and surrounding communities maximize property value and achieve their real estate goals.",
    primaryCtaText: "Start a Conversation",
    primaryCtaLink: "/aboutus",
    headerCtaText: "Get In Touch",
    headerCtaLink: "/#contact",
  },
  navLinks: [
    { name: "Home", href: "/", active: true },
    { name: "About", href: "/", active: false },
    { name: "Services", href: "/", active: false },
    { name: "Properties", href: "/#properties", active: false },
    { name: "Insights", href: "/#insights", active: false },
    { name: "Contact", href: "/#contact", active: false },
  ],
  stats: [
    { icon: Award, value: "$5M+", suffix: "", label: "worth house sold" },
    { icon: Building2, value: "8+", suffix: " Yrs", label: "of experience" },
    { icon: Users, value: "94%", suffix: "", label: "client satisfaction" },
    { icon: Clock, value: "12+", suffix: "", label: "agents" },
  ],
};

// ----------------------------------------------------------
// WhyUsSection.tsx ("The KO Realty Difference")
// ----------------------------------------------------------

export const differenceConfig: DifferenceConfig = {
  eyebrow: "/ Why KO Realty?",
  headingMain: "The KO Realty ",
  headingItalic: "Difference",
  subtext:
    "Combining local expertise, transparent pricing, and responsive communication to deliver exceptional results in buying, selling, and property management.",
  callNowText: "Call Now",
  callNowHref: "tel:4034000699",
  bookConsultationText: "Book a Consultation",
  bookConsultationHref: "#contact",
  features: [
    {
      icon: TrendingUp,
      title: "Transparent Pricing",
      description:
        "Low management fees and competitive commission structures with no hidden costs.",
    },
    {
      icon: ShieldCheck,
      title: "Legal & Regulatory Compliance",
      description:
        "All leases, deposits, and transactions strictly comply with RECA regulations and Alberta's Residential Tenancies Act.",
    },
    {
      icon: BadgeCheck,
      title: "Licensed REALTORS® & Managers",
      description:
        "Expert guidance for buying, selling, and managing residential and investment properties across Calgary.",
      linkText: "Our services",
      linkHref: "/services",
    },
    {
      icon: HeartHandshake,
      title: "Relationship-First Approach",
      description:
        "As a locally owned brokerage, we prioritize long-term client relationships over transactional success.",
      linkText: "Learn about KO Realty",
      linkHref: "/aboutus",
    },
  ],
};

// ----------------------------------------------------------
// AgentSection.tsx
// ----------------------------------------------------------

export const agent: Agent = {
  name: "KO Realty Agent",
  role: "Licensed REALTOR® | Calgary & Surrounding Areas",
  bio: "At KO Realty Ltd., our dedicated team of licensed REALTORS® and Property Managers brings extensive local market expertise and personalized service to every client. Serving Calgary, Airdrie, Okotoks, Cochrane, and Chestermere, we combine market insight, modern marketing strategies, and transparent communication to help you buy, sell, or manage your real estate investments with total peace of mind.",
  image: "/user.png",
  specialties: [
    "Residential Sales",
    "Full-Service Property Management",
    "First-Time Homebuyers",
    "Investment Real Estate",
    "Tenant Placement",
    "Free Home Evaluations",
    "Airdrie, Okotoks, Cochrane & Chestermere",
  ],
  recentClosings: [
    { address: "Full Property Management", neighbourhood: "Calgary & Surrounding Areas", price: "Full Service" },
    { address: "Home Buying & Selling", neighbourhood: "Residential & Investment", price: "Guidance" },
    { address: "Free Market Evaluation", neighbourhood: "Clear Property Insights", price: "Value" },
    { address: "Tenant Placement & Screening", neighbourhood: "RECA Compliant", price: "Trust" },
  ],
};

// ----------------------------------------------------------
// PropertiesCarousel.tsx
// ----------------------------------------------------------
export const properties: Property[] = [
  {
    id: "1",
    number: "01/12",
    title: "Lakeview Condo",
    subtitle: "Spacious modern living with scenic water views in a serene community setting.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    price: "Contact for Price",
    category: "residential",
    status: "Active",
    specs: { size: "1,550 sq ft", beds: "3 Beds", baths: "2 Baths" },
    mls: "202611001",
  },
  {
    id: "2",
    number: "02/12",
    title: "Calgary Two-Storey",
    subtitle: "Spacious family home featuring custom finishes and modern features.",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&auto=format&fit=crop",
    price: "Contact for Price",
    category: "portfolio",
    status: "Active",
    specs: { size: "2,100 sq ft", beds: "5 Beds", baths: "3 Baths" },
    mls: "202621125",
  },
  {
    id: "3",
    number: "03/12",
    title: "Inner City Condo",
    subtitle: "Modern condo unit with modern layout and primary suite.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop",
    price: "Contact for Price",
    category: "residential",
    status: "Active",
    specs: { size: "1,200 sq ft", beds: "2 Beds", baths: "2 Baths" },
    mls: "202611003",
  },
  {
    id: "4",
    number: "04/12",
    title: "Suburban Bungalow",
    subtitle: "Spectacular bungalow property with private backyard space.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
    price: "Contact for Price",
    category: "portfolio",
    status: "Active",
    specs: { size: "1,652 sq ft", beds: "4 Beds", baths: "3 Baths" },
    mls: "202611004",
  },
  {
    id: "5",
    number: "05/12",
    title: "Airdrie Estate",
    subtitle: "Exclusive suburban residence offering space and privacy.",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop",
    price: "Contact for Price",
    category: "portfolio",
    status: "Active",
    specs: { size: "2,800 sq ft", beds: "4 Beds", baths: "3 Baths" },
    mls: "202611005",
  },
  {
    id: "6",
    number: "06/12",
    title: "Downtown Penthouse",
    subtitle: "Luxury high-rise living with panoramic city skyline views and high-end finishes.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
    price: "Contact for Price",
    category: "residential",
    status: "Active",
    specs: { size: "2,250 sq ft", beds: "3 Beds", baths: "3.5 Baths" },
    mls: "202611006",
  },
  {
    id: "7",
    number: "07/12",
    title: "Mountain View Villa",
    subtitle: "Contemporary architectural masterpiece nestled against picturesque foothills.",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200&auto=format&fit=crop",
    price: "Contact for Price",
    category: "portfolio",
    status: "Active",
    specs: { size: "3,400 sq ft", beds: "4 Beds", baths: "4 Baths" },
    mls: "202611007",
  },
  {
    id: "8",
    number: "08/12",
    title: "Riverside Townhome",
    subtitle: "Multi-level modern home featuring private rooftop patio and double garage.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    price: "Contact for Price",
    category: "residential",
    status: "Active",
    specs: { size: "1,850 sq ft", beds: "3 Beds", baths: "2.5 Baths" },
    mls: "202611008",
  },
  {
    id: "9",
    number: "09/12",
    title: "Heritage District Residence",
    subtitle: "Elegantly restored classic home combining original charm with modern luxury.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop",
    price: "Contact for Price",
    category: "portfolio",
    status: "Active",
    specs: { size: "2,600 sq ft", beds: "4 Beds", baths: "3 Baths" },
    mls: "202611009",
  },
  {
    id: "10",
    number: "10/12",
    title: "Modern Minimalist Loft",
    subtitle: "Open-concept urban loft with soaring ceilings and floor-to-ceiling windows.",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop",
    price: "Contact for Price",
    category: "residential",
    status: "Active",
    specs: { size: "980 sq ft", beds: "1 Bed", baths: "1.5 Baths" },
    mls: "202611010",
  },
  {
    id: "11",
    number: "11/12",
    title: "Springbank Country Acreage",
    subtitle: "Sprawling private estate with manicured grounds and custom stone workshop.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop",
    price: "Contact for Price",
    category: "portfolio",
    status: "Active",
    specs: { size: "4,100 sq ft", beds: "5 Beds", baths: "4.5 Baths" },
    mls: "202611011",
  },
  {
    id: "12",
    number: "12/12",
    title: "Killarney Infill",
    subtitle: "Brand new custom semi-detached home with gourmet kitchen and developed basement.",
    image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=1200&auto=format&fit=crop",
    price: "Contact for Price",
    category: "residential",
    status: "Active",
    specs: { size: "1,920 sq ft", beds: "4 Beds", baths: "3.5 Baths" },
    mls: "202611012",
  },
];

// ----------------------------------------------------------
// ReviewsGlassSection.tsx
// ----------------------------------------------------------

export const reviewPages: ReviewPageData[] = [
  {
    featured: {
      name: "Full-Service Property Management",
      quote: "",
      tags: ["Property Management", "Transparent Pricing"],
      handle: "KO Realty Ltd. | Calgary",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
      rating: 0,
    },
    quoteBanner: {
      quote: "Helping homeowners, landlords, and investors protect their assets while maximizing rental income with complete peace of mind.",
      name: "KO Realty Ltd.",
      role: "Calgary Real Estate Brokerage",
      initials: "KO",
      rating: 0,
    },
    wide: {
      name: "Transparent & Low Fees",
      timeAgo: "Every Property",
      quote: "Clear pricing structure with no hidden fees, giving landlords predictable, steady returns.",
      rating: 0,
    },
    hero: {
      name: "KO Realty Ltd.",
      role: "Licensed REALTORS® & Property Managers",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      quote: "Client-Centric Excellence",
      body: "KO Realty delivers clear communication, ethical guidance, and market insights for all real estate and property management needs in Calgary.",
      rating: 0,
    },
    badge: { reviewCount: "KO", ratingLabel: "KO Realty Ltd.", clientsCount: "94% Satisfaction" },
    split: {
      date: "KO Realty Ltd.",
      title: "Trusted Calgary Partners",
      quote: "A locally owned brokerage built on trust, transparency, and tailored solutions for homeowners and investors.",
      rating: 0,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    },
    search: { title: "Calgary Real Estate", body: "Comprehensive buy, sell, and management solutions across Calgary, Airdrie, Okotoks, Cochrane, and Chestermere." },
    teal: {
      name: "Market Expertise",
      body: "Our licensed agents utilize cutting-edge technology and local knowledge to achieve optimal value with minimal risk.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      likes: 0,
      views: "Proven Results",
    },
  },
  {
    featured: {
      name: "Empowering REALTORS® & Property Managers",
      quote: "",
      tags: ["Mentorship", "Tech-Driven"],
      handle: "KO Realty Ltd. | Calgary",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      rating: 0,
    },
    quoteBanner: {
      quote: "Providing real estate professionals with 100% support, flexible commission plans, and advanced systems to build thriving careers.",
      name: "KO Realty Ltd.",
      role: "Calgary Real Estate Brokerage",
      initials: "KO",
      rating: 0,
    },
    wide: {
      name: "Collaborative Culture",
      timeAgo: "Ongoing",
      quote: "A supportive community committed to mentorship, professional development, and shared success.",
      rating: 0,
    },
    hero: {
      name: "KO Realty Ltd.",
      role: "Calgary Brokerage & Property Management",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      quote: "Innovation & Integrity",
      body: "Redefining what it means to be a Calgary REALTOR® or Property Manager through flexibility, coaching, and growth.",
      rating: 0,
    },
    badge: { reviewCount: "KO", ratingLabel: "KO Realty Ltd.", clientsCount: "Calgary & Area" },
    split: {
      date: "Calgary and Surrounding Communities",
      title: "Tech-Driven Systems",
      quote: "Integrated CRM tools, marketing automation, and RECA-compliant training designed for high performance.",
      rating: 0,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    },
    search: { title: "Join KO Realty", body: "Competitive splits, flexible options, and 100% support for real estate and management professionals." },
    teal: {
      name: "Growth & Success",
      body: "Join a modern brokerage built to foster continuous personal and professional development.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      likes: 0,
      views: "Built for Success",
    },
  },
];

// ----------------------------------------------------------
// FinalCTASection.tsx
// ----------------------------------------------------------

export const ctaConfig: CTAContentConfig = {
  headingMain: "Ready for Your",
  headingItalic: "Free Home Evaluation?",
  subheading:
    "Connect with KO Realty Ltd. for professional guidance across Calgary, Airdrie, Okotoks, Cochrane, and Chestermere.",
  bulletPoints: [
    "Free, no-obligation home evaluations with clear market insights",
    "Full-service property management with low fees and no hidden costs",
    "Licensed REALTORS® offering ethical, client-focused advice",
  ],
  primaryCtaText: "Book Consult",
  primaryCtaLink: "#contact",
  secondaryCtaText: "Get in touch with KO Realty",
  secondaryCtaLink: "tel:4034000699",
  agentName: "KO Realty Agent",
  agentTitle: "Licensed REALTOR® & Property Manager",
};

export const dashboardCardConfig: DashboardCardConfig = {
  title: "KO Realty's Approach",
  subtitle: "Calgary and Surrounding Communities",
  stats: [
    { label: "Satisfaction", value: "94%" },
    { label: "Areas served", value: "Calgary + Surrounding" },
  ],
  marketStatusLabel: "Market Status",
  marketStatusValue: "Here to help",
  badgeName: "KO Realty Ltd.",
  badgeTagline: "Trust, Transparency, Results",
};

export const ctaStatBars: StatBarConfig[] = [
  { label: "Experience", value: "8+ Years", color: "bg-accent-champagne", valueColor: "text-accent-champagne" },
  { label: "Satisfaction", value: "94%", color: "bg-emerald-400", valueColor: "text-emerald-400" },
];

// ----------------------------------------------------------
// HomeValuationSection.tsx
// ----------------------------------------------------------

export const valuationConfig: ValuationConfig = {
  sectionTag: "Home Evaluation",
  title: {
    main: "What Is Your Home",
    highlight: "Really Worth?",
  },
  description:
    "Ready to uncover your property's true market value? Fill out the form to request a free, no-obligation market evaluation prepared by KO Realty Ltd.",
  contactDetails: {
    phone: { label: "403-400-0699", href: "tel:4034000699" },
    email: { label: "info@korealty.ca", href: "mailto:info@korealty.ca" },
    location: "301-14th Street NW, Suite 206, Room 8, Calgary, AB",
  },
  propertyOptions: [
    { label: "Single Family Home", value: "Single Family Home" },
    { label: "Condominium", value: "Condominium" },
    { label: "Townhouse / Rowhouse", value: "Townhouse" },
    { label: "Multi-Family / Investment", value: "Multi-Family" },
  ],
};

// ----------------------------------------------------------
// FooterSection.tsx
// ----------------------------------------------------------

export const footerConfig: FooterConfig = {
  headerImage: {
    src: "/7.jpg",
    alt: "KO Realty Ltd.",
  },
  exploreSection: {
    title: "Explore",
    links: [
      { label: "Property Management", href: "#services" },
      { label: "Buy & Sell Real Estate", href: "#services" },
      { label: "Free Home Evaluation", href: "#valuation" },
      { label: "About KO Realty", href: "#about" },
    ],
  },
  resourcesSection: {
    title: "Resources",
    links: [
      { label: "Join KO Realty", href: "#careers" },
      { label: "Landlord Solutions", href: "#services" },
      { label: "Client Testimonials", href: "#testimonials" },
      { label: "Get in Touch", href: "#contact" },
    ],
  },
  legalSection: {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms of Service", href: "#terms" },
      { label: "RECA Compliance", href: "#disclaimer" },
    ],
  },
  contactDetails: {
    location: "301-14th Street NW, Suite 206, Room 8, Calgary, AB",
    phonePrimary: { label: "Call Us: 403-400-0699", href: "tel:4034000699" },
    phoneSecondary: { label: "Email: info@korealty.ca", href: "mailto:info@korealty.ca" },
    contactLink: { label: "Contact KO Realty Ltd.", href: "#contact" },
  },
  brandBar: {
    brandName: "KO REALTY LTD.",
    badgeText: "Real Estate Brokerage",
    footerLinks: [
      { label: "Terms & Conditions", href: "#terms" },
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Sitemap", href: "#sitemap" },
    ],
    copyrightHolder: "KO Realty Ltd.",
    copyrightRights: "All rights reserved.",
  },
};