import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import {
  Building,
  Lock,
  ShieldCheck,
  Key,
  ArrowRight,
  Sparkles,
  Star,
  Search,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Heart,
  Users,
  Quote,
  Compass,
  Award,
  Check,
  Clock,
  Zap,
  Activity,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Eye,
  Flame,
  Sun,
  Trees,
  Crown,
  X,
  ShieldAlert,
  Percent,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { PropertyCard } from "../property/PropertyCard";
import type { Property } from "../../types/database";

interface LandingPageProps {
  onBrowseProperties: (filters?: any) => void;
  onHowItWorks: () => void;
  onSelectDeal: (deal: Property) => void;
  onRateDeal: (deal: Property) => void;
  onBookCall?: () => void;
  properties: Property[];
  favorites: any[];
  onToggleFavorite: (id: string | number, e?: React.MouseEvent) => void;
}

const WAVY_ITEMS = [
  {
    id: "wavy-1",
    title: "The Glass Pavilion & Infinity Estate",
    city: "Pensacola",
    state: "FL",
    location: "Pensacola, FL",
    yield: "+28.4% Net Yield",
    price: "$4,500/mo",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
    tag: "Exclusive Arbitrage",
    category: "COASTAL",
    bedrooms: 4,
    bathrooms: 4,
    rating: 4.98,
    bio: "Panoramic gulf coast views with heated infinity pool, smart keyless access, and verified 98% occupancy rate.",
  },
  {
    id: "wavy-2",
    title: "Scottsdale Desert Oasis Villa",
    city: "Scottsdale",
    state: "AZ",
    location: "Scottsdale, AZ",
    yield: "$6.8K Net Monthly",
    price: "$5,200/mo",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
    tag: "15-Min Hold Active",
    category: "DESERT",
    bedrooms: 5,
    bathrooms: 5,
    rating: 4.96,
    bio: "Ultra-luxury desert retreat with outdoor chef's kitchen, private spa, and synchronized Airbnb & Vrbo listings.",
  },
  {
    id: "wavy-3",
    title: "Blue Ridge Mountain Sanctuary",
    city: "Blue Ridge",
    state: "GA",
    location: "Blue Ridge, GA",
    yield: "98% Occ. Rate",
    price: "$3,800/mo",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    tag: "Turnkey Keyless",
    category: "CABIN",
    bedrooms: 3,
    bathrooms: 3,
    rating: 4.94,
    bio: "High-yield luxury timber cabin featuring hot tub deck, floor-to-ceiling windows, and complete turnkey furnishings.",
  },
  {
    id: "wavy-4",
    title: "Pensacola Gulf Coast Pavilion",
    city: "Pensacola",
    state: "FL",
    location: "Pensacola, FL",
    yield: "+24.2% Net Yield",
    price: "$4,900/mo",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80",
    tag: "Verified Addendums",
    category: "COASTAL",
    bedrooms: 4,
    bathrooms: 3.5,
    rating: 4.97,
    bio: "Stunning coastal retreat with direct beach access and dual master suites.",
  },
  {
    id: "wavy-5",
    title: "Austin Modern Hillside Estate",
    city: "Austin",
    state: "TX",
    location: "Austin, TX",
    yield: "$7.5K Net Monthly",
    price: "$7,100/mo",
    image:
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80",
    tag: "High ADR Yield",
    category: "ESTATES",
    bedrooms: 6,
    bathrooms: 6,
    rating: 4.99,
    bio: "Architectural masterpiece over Austin hills with private infinity pool and wine cellar.",
  },
  {
    id: "wavy-6",
    title: "Aspen Luxury Alpine Lodge",
    city: "Aspen",
    state: "CO",
    location: "Aspen, CO",
    yield: "+31.2% Net Yield",
    price: "$8,500/mo",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80",
    tag: "Prime Winter Yield",
    category: "CABIN",
    bedrooms: 5,
    bathrooms: 5.5,
    rating: 4.99,
    bio: "Ski-in ski-out timber chalets with heated driveway and panoramic mountain views.",
  },
];

const CAROUSEL_CATEGORIES = [
  { id: "ALL", label: "All Opportunities", icon: Flame },
  { id: "COASTAL", label: "Coastal Villas", icon: Sun },
  { id: "DESERT", label: "Desert Havens", icon: Sun },
  { id: "CABIN", label: "Mountain Cabins", icon: Trees },
  { id: "ESTATES", label: "Luxury Estates", icon: Crown },
];

const ANIMATED_TEXT_CARDS = [
  {
    icon: Clock,
    badge: "15-Min Hold Guarantee",
    title: "Lock Deals Before Competitors Can Bid",
    description:
      "Our automated hold system reserves exclusive rights for 15 minutes while you review legal addendums and historical ADR reports.",
    metric: "15:00 Hold Window",
    tone: "border-[#E04F33]/40 bg-[#E04F33]/10 text-[#FF8A73]",
  },
  {
    icon: Activity,
    badge: "Audited Financials",
    title: "100% Transparent Monthly Cash Flow",
    description:
      "Zero guesswork. Every property comes with verified historical monthly revenue, lease expenses, and net profit margins.",
    metric: "Verified ADR & Yield",
    tone: "border-amber-500/40 bg-amber-500/10 text-amber-400",
  },
  {
    icon: Zap,
    badge: "Day-One Keyless Handover",
    title: "Synchronized Multi-Platform Operations",
    description:
      "Receive smart lock master codes and pre-configured listing connections on Airbnb, Vrbo, and Zillow immediately upon signing.",
    metric: "Turnkey Operational",
    tone: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
  },
];

const ADVANTAGES = [
  {
    icon: Lock,
    title: "15-Minute Exclusive Hold Lock",
    description:
      "Instantly freeze competing buyers from taking a deal while you inspect lease terms and projected ADR analytics.",
    tag: "Exclusive Protection",
  },
  {
    icon: TrendingUp,
    title: "Verified Yield & Occupancy Projections",
    description:
      "All listings feature audited monthly rent, average daily rates (ADR), and verified historical occupancy metrics.",
    tag: "Financial Clarity",
  },
  {
    icon: Key,
    title: "Instant Keyless Turnkey Handover",
    description:
      "Gain direct control with smart keyless lock codes and synchronized live listings on Airbnb, Vrbo, and Zillow.",
    tag: "Seamless Operations",
  },
  {
    icon: ShieldCheck,
    title: "Pre-Verified Legal Addendums",
    description:
      "Standardized sublease addendums and comprehensive CGL insurance coverage built directly into every deal.",
    tag: "Risk Mitigation",
  },
];

const STORY_PILLARS = [
  {
    title: "Transparent Due Diligence",
    description:
      "No inflated promises or guesswork. Every monthly yield and occupancy metric is backed by audited market data.",
  },
  {
    title: "Speed & Buyer Protection",
    description:
      "Our 15-minute hold lock gives serious buyers breathing room to analyze lease details without getting outbid in seconds.",
  },
  {
    title: "Turnkey Day-One Handover",
    description:
      "From keyless smart locks to synchronized multi-platform OTA listings, properties are ready to earn from day one.",
  },
];

const TESTIMONIALS = [
  {
    name: "Marcus Vance",
    role: "Portfolio Manager",
    location: "Scottsdale, AZ",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    quote:
      "Kaizen allowed me to secure 3 turnkey luxury villas in under a week. The 15-minute hold lock gives peace of mind before signing.",
    rating: 5,
    yield: "+24.8% Net Yield",
  },
  {
    name: "Elena Rostova",
    role: "Turnkey Host & Buyer",
    location: "Pensacola, FL",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200",
    quote:
      "The rating system and host bio transparency are game changers. I knew exactly what I was acquiring before laying down a deposit.",
    rating: 5,
    yield: "$6.2K/mo Net Profit",
  },
  {
    name: "David Sterling",
    role: "Real Estate Investor",
    location: "Miami, FL",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    quote:
      "Sleek interface, instant walkthrough schedules, and immediate key handover. Kaizen is the gold standard for real estate arbitrage.",
    rating: 5,
    yield: "100% Verified",
  },
];

export const LandingPage: React.FC<LandingPageProps> = ({
  onBrowseProperties,
  onHowItWorks,
  onSelectDeal,
  onRateDeal,
  onBookCall,
  properties,
  favorites,
  onToggleFavorite,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Search Bar State
  const [cityFilter, setCityFilter] = useState("");
  const [bedsFilter, setBedsFilter] = useState("");

  // Interactive Carousel State
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [quickPreviewItem, setQuickPreviewItem] = useState<any | null>(null);

  // GSAP Refs
  const heroRef = useRef<HTMLDivElement>(null);
  const glowRef1 = useRef<HTMLDivElement>(null);
  const glowRef2 = useRef<HTMLDivElement>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const textCardsRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const storyImageRef = useRef<HTMLDivElement>(null);
  const storyTextRef = useRef<HTMLDivElement>(null);
  const advantagesRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  // Quadruple items to ensure zero gaps in infinite marquee
  const seamlessMarqueeItems = [
    ...WAVY_ITEMS,
    ...WAVY_ITEMS,
    ...WAVY_ITEMS,
    ...WAVY_ITEMS,
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Ambient Background Glow Parallax Physics
      if (glowRef1.current) {
        gsap.to(glowRef1.current, {
          y: 30,
          scale: 1.08,
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      if (glowRef2.current) {
        gsap.to(glowRef2.current, {
          y: -25,
          scale: 0.92,
          duration: 5.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // 2. Hero Entrance Sequence
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll(".gsap-hero-elem"),
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "power3.out",
          }
        );
      }

      // 3. Wavy Sine-Wave Vertical Motion for Marquee Cards
      if (carouselTrackRef.current) {
        const wavyCards = carouselTrackRef.current.querySelectorAll(".gsap-wavy-card");
        wavyCards.forEach((card, idx) => {
          gsap.to(card, {
            y: idx % 2 === 0 ? 14 : -14,
            rotate: idx % 2 === 0 ? 1.5 : -1.5,
            duration: 2.8 + (idx % 3) * 0.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      }

      // 4. Animated Text Cards Stagger Reveal
      if (textCardsRef.current) {
        const cards = textCardsRef.current.querySelectorAll(".gsap-text-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.14,
            ease: "back.out(1.2)",
          }
        );
      }

      // 5. Featured Properties Entrance
      if (featuredRef.current) {
        const cards = featuredRef.current.querySelectorAll(".gsap-featured-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 45 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.14,
            ease: "power3.out",
          }
        );
      }

      // 6. Founder Story Motion
      if (storyRef.current) {
        if (storyImageRef.current) {
          gsap.fromTo(
            storyImageRef.current,
            { opacity: 0, x: -45 },
            { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" }
          );
        }
        if (storyTextRef.current) {
          gsap.fromTo(
            storyTextRef.current.querySelectorAll(".gsap-story-elem"),
            { opacity: 0, x: 45 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              stagger: 0.12,
              ease: "power3.out",
            }
          );
        }
      }

      // 7. Advantages Stagger
      if (advantagesRef.current) {
        const items = advantagesRef.current.querySelectorAll(".gsap-adv-card");
        gsap.fromTo(
          items,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: "power2.out",
          }
        );
      }

      // 8. Testimonials Stagger
      if (testimonialsRef.current) {
        const cards = testimonialsRef.current.querySelectorAll(".gsap-test-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35, rotationY: 8 },
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: "power2.out",
          }
        );
      }
    });

    return () => ctx.revert();
  }, [selectedCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBrowseProperties({
      city: cityFilter || undefined,
      bedrooms: bedsFilter ? Number(bedsFilter) : undefined,
    });
  };

  const handlePrimaryCallAction = () => {
    if (onBookCall) {
      onBookCall();
    } else {
      onBrowseProperties();
    }
  };

  const DEFAULT_FEATURED: any[] = [
    {
      id: "featured-1",
      title: "The Glass Pavilion & Infinity Estate",
      city: "Pensacola",
      state: "FL",
      price: 4500,
      bedrooms: 4,
      bathrooms: 4,
      squareFeet: 3400,
      rating: 4.98,
      reviewCount: 42,
      bio: "Panoramic gulf coast views with heated infinity pool, smart keyless access, and verified 98% occupancy rate.",
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      ],
      status: "AVAILABLE",
    },
    {
      id: "featured-2",
      title: "Scottsdale Desert Oasis Villa",
      city: "Scottsdale",
      state: "AZ",
      price: 5200,
      bedrooms: 5,
      bathrooms: 5,
      squareFeet: 4200,
      rating: 4.96,
      reviewCount: 38,
      bio: "Ultra-luxury desert retreat with outdoor chef's kitchen, private spa, and synchronized Airbnb & Vrbo listings.",
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      ],
      status: "AVAILABLE",
    },
    {
      id: "featured-3",
      title: "Blue Ridge Mountain Sanctuary",
      city: "Blue Ridge",
      state: "GA",
      price: 3800,
      bedrooms: 3,
      bathrooms: 3,
      squareFeet: 2800,
      rating: 4.94,
      reviewCount: 29,
      bio: "High-yield luxury timber cabin featuring hot tub deck, floor-to-ceiling windows, and complete turnkey furnishings.",
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      ],
      status: "AVAILABLE",
    },
  ];

  const featuredProperties =
    properties && properties.length > 0
      ? properties.slice(0, 3)
      : DEFAULT_FEATURED;
  const favoriteIds = new Set(favorites.map((f) => f.property?.id || f.id));

  return (
    <div className="space-y-20 sm:space-y-28 max-w-7xl mx-auto px-3 sm:px-6 py-4">
      {/* ── HIGHLY ANIMATED HERO SECTION ── */}
      <section ref={heroRef} className="relative pt-6 sm:pt-14 pb-8 overflow-hidden">
        {/* GSAP Animated Ambient Glowing Blobs */}
        <div
          ref={glowRef1}
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[400px] rounded-full blur-[140px] pointer-events-none transition-colors opacity-35 ${
            isDark ? "bg-[#E04F33]/25" : "bg-amber-500/20"
          }`}
        />
        <div
          ref={glowRef2}
          className={`absolute top-20 right-10 w-[420px] h-[320px] rounded-full blur-[110px] pointer-events-none opacity-25 transition-colors ${
            isDark ? "bg-amber-600/20" : "bg-orange-300/30"
          }`}
        />

        {/* Floating Live Metric Cards for Dynamic Hero Depth */}
        <div className="relative z-10 space-y-8 text-center max-w-4xl mx-auto">
          {/* Top Warm Eyebrow Badge */}
          <div className="gsap-hero-elem inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E04F33]/10 border border-[#E04F33]/25 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#E04F33] dark:text-[#FF8A73] animate-spin" />
            <span className="text-xs font-mono font-bold text-[#E04F33] dark:text-[#FF8A73] uppercase tracking-widest">
              Next-Gen Turnkey Real Estate Platform
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className={`gsap-hero-elem text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] font-serif ${
              isDark ? "text-white" : "text-stone-900"
            }`}
          >
            Acquire &amp; Monetize{" "}
            <span className="bg-gradient-to-r from-[#E04F33] via-amber-500 to-[#C87D55] bg-clip-text text-transparent italic font-normal">
              Turnkey Luxury Properties
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`gsap-hero-elem text-base sm:text-lg leading-relaxed max-w-2xl mx-auto ${
              isDark ? "text-slate-300" : "text-stone-600"
            }`}
          >
            Discover vetted luxury villas with transparent financials, host bios,
            and exclusive 15-minute hold locks. Instant keyless handover ready
            for high monthly yield.
          </p>

          {/* CTAs */}
          <div className="gsap-hero-elem flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={handlePrimaryCallAction}
              className="w-full sm:w-auto px-8 py-4 bg-[#E04F33] hover:bg-[#C8432A] text-white font-bold rounded-2xl text-sm uppercase tracking-wider shadow-xl shadow-[#E04F33]/25 flex items-center justify-center gap-2 font-mono transition-all cursor-pointer hover:scale-[1.03] active:scale-95"
            >
              <span>Book a Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onHowItWorks}
              className={`w-full sm:w-auto px-8 py-4 rounded-2xl border text-sm font-bold font-mono transition-all cursor-pointer hover:scale-[1.03] active:scale-95 ${
                isDark
                  ? "bg-[#161922]/90 border-white/10 text-slate-200 hover:bg-[#1F2432]"
                  : "bg-white border-stone-300 text-stone-800 hover:bg-stone-50 shadow-sm"
              }`}
            >
              How It Works
            </button>
          </div>

          {/* Quick Search Widget */}
          <form
            onSubmit={handleSearchSubmit}
            className={`gsap-hero-elem p-3 sm:p-4 rounded-3xl border shadow-2xl max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-12 gap-3 transition-colors ${
              isDark
                ? "bg-[#161922]/90 border-white/10 shadow-black/60 apple-specular"
                : "bg-white/95 border-stone-200/90 shadow-stone-300/40"
            }`}
          >
            <div className="sm:col-span-5 relative">
              <MapPin className="w-4 h-4 text-[#E04F33] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search city (e.g. Pensacola, Scottsdale)..."
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className={`w-full pl-10 pr-3 py-3 border rounded-2xl text-xs font-medium focus:outline-none focus:border-[#E04F33] ${
                  isDark
                    ? "bg-[#0F1117] border-white/10 text-white placeholder-slate-500"
                    : "bg-[#FAF8F5] border-stone-200 text-stone-900 placeholder-stone-400"
                }`}
              />
            </div>

            <div className="sm:col-span-4">
              <select
                value={bedsFilter}
                onChange={(e) => setBedsFilter(e.target.value)}
                className={`w-full px-3 py-3 border rounded-2xl text-xs font-mono font-medium focus:outline-none focus:border-[#E04F33] cursor-pointer ${
                  isDark
                    ? "bg-[#0F1117] border-white/10 text-white"
                    : "bg-[#FAF8F5] border-stone-200 text-stone-900"
                }`}
              >
                <option value="">Any Bedrooms</option>
                <option value="2">2+ Bedrooms</option>
                <option value="3">3+ Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <button
                type="submit"
                className="w-full h-full py-3 bg-[#E04F33] hover:bg-[#C8432A] text-white font-bold rounded-2xl text-xs font-mono uppercase tracking-wider shadow-md shadow-[#E04F33]/20 flex items-center justify-center gap-1.5 cursor-pointer transition-all hover:scale-[1.02]"
              >
                <Search className="w-4 h-4" />
                Find Properties
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ── TRUE SEAMLESS INFINITE MARQUEE CAROUSEL SHOWCASE ── */}
      <section className="space-y-6 py-4">
        {/* Carousel Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E04F33] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E04F33]"></span>
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E04F33] dark:text-[#FF8A73]">
                Seamless Live Opportunities
              </span>
            </div>
            <h2
              className={`text-2xl sm:text-3xl font-extrabold font-serif ${
                isDark ? "text-white" : "text-stone-900"
              }`}
            >
              Explore Turnkey Yields
            </h2>
          </div>
        </div>

        {/* True Seamless Infinite Marquee Track (Zero Gaps) */}
        <div className="relative w-full overflow-hidden py-6 rounded-3xl">
          <div
            ref={carouselTrackRef}
            className="flex items-center gap-6 animate-marquee-infinite hover:[animation-play-state:paused] w-max"
          >
            {seamlessMarqueeItems.map((item, idx) => {
              const isFav = favoriteIds.has(item.id);
              return (
                <div
                  key={`${item.id}-${idx}`}
                  className="gsap-wavy-card w-72 sm:w-84 shrink-0 p-4 rounded-3xl border transition-all duration-300 hover:scale-105 cursor-pointer group backdrop-blur-xl relative overflow-hidden"
                  style={{
                    backgroundColor: isDark ? "rgba(22, 25, 34, 0.9)" : "rgba(255, 255, 255, 0.95)",
                    borderColor: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(220, 215, 205, 0.9)",
                    boxShadow: isDark
                      ? "0 20px 40px -10px rgba(0, 0, 0, 0.6)"
                      : "0 14px 32px -10px rgba(224, 79, 51, 0.1)",
                  }}
                >
                  <div className="relative h-48 rounded-2xl overflow-hidden mb-3.5">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-amber-300 font-mono text-[10px] font-bold border border-white/10">
                      {item.tag}
                    </div>

                    {/* Quick Heart Favorite Toggle Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(item.id, e);
                      }}
                      aria-label="Favorite property"
                      className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                        isFav
                          ? "bg-[#E04F33] text-white shadow-md"
                          : "bg-black/50 text-white/80 hover:bg-black/80 hover:text-white"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? "fill-white text-white" : ""}`} />
                    </button>

                    <div className="absolute bottom-2.5 right-2.5 px-3 py-1.5 rounded-xl bg-[#E04F33] text-white font-mono text-xs font-extrabold shadow-lg">
                      {item.price}
                    </div>

                    {/* Quick Inspect Hover Overlay Button */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setQuickPreviewItem(item);
                        }}
                        className="px-4 py-2 rounded-xl bg-white text-stone-900 font-mono text-xs font-bold shadow-xl flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      >
                        <Eye className="w-4 h-4 text-[#E04F33]" />
                        <span>Quick Prospectus</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4
                      className={`font-serif font-bold text-base truncate ${
                        isDark ? "text-white" : "text-stone-900"
                      }`}
                    >
                      {item.title}
                    </h4>

                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#E04F33]" /> {item.location}
                      </span>
                      <span className="font-extrabold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-lg border border-emerald-500/20">
                        {item.yield}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-stone-200 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>{item.bedrooms} Beds • {item.bathrooms} Baths</span>
                      <span className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3 h-3 fill-amber-400" /> {item.rating}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── QUICK PROSPECTUS MODAL FOR CAROUSEL ── */}
      <AnimatePresence>
        {quickPreviewItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`w-full max-w-xl p-6 sm:p-8 rounded-3xl border shadow-2xl relative overflow-hidden ${
                isDark ? "bg-[#161922] border-white/15 text-white" : "bg-white border-stone-200 text-stone-900"
              }`}
            >
              <button
                onClick={() => setQuickPreviewItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-5">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#E04F33]/15 text-[#E04F33] dark:text-[#FF8A73] text-xs font-mono font-bold border border-[#E04F33]/30">
                    {quickPreviewItem.tag}
                  </span>
                  <span className="text-xs font-mono text-slate-400">Verified Turnkey</span>
                </div>

                <div className="relative h-48 rounded-2xl overflow-hidden border border-white/10">
                  <img
                    src={quickPreviewItem.image}
                    alt={quickPreviewItem.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-xl bg-black/70 backdrop-blur-md text-white font-mono text-xs font-bold">
                    {quickPreviewItem.location}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-serif font-extrabold">{quickPreviewItem.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{quickPreviewItem.bio}</p>
                </div>

                <div className="grid grid-cols-3 gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 text-center font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Monthly Rent</span>
                    <span className="font-bold text-white">{quickPreviewItem.price}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Net Yield</span>
                    <span className="font-bold text-emerald-400">{quickPreviewItem.yield}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Specs</span>
                    <span className="font-bold text-amber-300">{quickPreviewItem.bedrooms} Bed / {quickPreviewItem.bathrooms} Bath</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setQuickPreviewItem(null);
                      onBrowseProperties({ city: quickPreviewItem.city });
                    }}
                    className="flex-1 py-3 bg-[#E04F33] hover:bg-[#C8432A] text-white font-bold rounded-2xl text-xs font-mono uppercase tracking-wider shadow-lg shadow-[#E04F33]/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>View Full Listing</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setQuickPreviewItem(null);
                      if (onBookCall) onBookCall();
                    }}
                    className="px-5 py-3 rounded-2xl border border-white/20 text-xs font-mono font-bold hover:bg-white/10 transition-all cursor-pointer"
                  >
                    Book Call
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── ANIMATED TEXT CARDS SECTION ── */}
      <section ref={textCardsRef} className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E04F33] dark:text-[#FF8A73]">
            Arbitrage Infrastructure
          </span>
          <h2
            className={`text-2xl sm:text-4xl font-extrabold font-serif ${
              isDark ? "text-white" : "text-stone-900"
            }`}
          >
            How Kaizen Protects Your Deals
          </h2>
          <p
            className={`text-xs sm:text-sm ${
              isDark ? "text-slate-400" : "text-stone-600"
            }`}
          >
            Automated features built into every transaction to maximize peace of mind and acquisition speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ANIMATED_TEXT_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={idx} className="gsap-text-card h-full">
                <div
                  className={`p-7 rounded-3xl border flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-1.5 backdrop-blur-xl ${
                    isDark
                      ? "bg-[#161922]/80 border-white/10 hover:border-[#E04F33]/40 shadow-black/50 shadow-xl"
                      : "bg-white border-stone-200/90 hover:border-[#E04F33]/30 shadow-stone-200/60 shadow-lg"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-[#E04F33]/10 border border-[#E04F33]/20 text-[#E04F33] dark:text-[#FF8A73] flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold border ${card.tone}`}
                      >
                        {card.badge}
                      </span>
                    </div>

                    <h3
                      className={`text-lg font-extrabold font-serif leading-snug ${
                        isDark ? "text-white" : "text-stone-900"
                      }`}
                    >
                      {card.title}
                    </h3>

                    <p
                      className={`text-xs leading-relaxed ${
                        isDark ? "text-slate-300" : "text-stone-600"
                      }`}
                    >
                      {card.description}
                    </p>
                  </div>

                  <div className="pt-5 mt-6 border-t border-stone-200 dark:border-white/10 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400">
                      Standard Protocol
                    </span>
                    <span className="text-xs font-mono font-bold text-[#E04F33] dark:text-[#FF8A73]">
                      {card.metric}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── FEATURED PROPERTIES SHOWCASE ── */}
      {featuredProperties.length > 0 && (
        <section ref={featuredRef} className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-4 border-stone-200 dark:border-white/10">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E04F33] dark:text-[#FF8A73]">
                Hand-Picked Opportunities
              </span>
              <h2
                className={`text-2xl sm:text-4xl font-extrabold font-serif mt-1 ${
                  isDark ? "text-white" : "text-stone-900"
                }`}
              >
                Featured Turnkey Properties
              </h2>
            </div>
            <button
              onClick={() => onBrowseProperties()}
              className="text-xs font-mono font-bold text-[#E04F33] dark:text-[#FF8A73] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All Properties</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((deal) => (
              <div key={deal.id} className="gsap-featured-card">
                <PropertyCard
                  deal={deal}
                  isFavorite={favoriteIds.has(deal.id)}
                  onToggleFavorite={onToggleFavorite}
                  onOpenProspectus={() => onSelectDeal(deal)}
                  onRate={() => onRateDeal(deal)}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── THE KAIZEN FOUNDER STORY SECTION ── */}
      <section ref={storyRef} className="relative overflow-hidden">
        <div
          className={`p-8 sm:p-12 lg:p-16 rounded-3xl border relative z-10 transition-colors ${
            isDark
              ? "bg-[#161922]/90 border-white/10 shadow-2xl shadow-black/50"
              : "bg-gradient-to-br from-[#FAF8F5] via-white to-[#F5F0EB] border-stone-200/90 shadow-xl shadow-stone-200/50"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Image & Founder Card */}
            <div ref={storyImageRef} className="lg:col-span-5 space-y-6">
              <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80"
                  alt="Kaizen Real Estate Estate Architecture"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 mb-1">
                    <Compass className="w-3 h-3 text-[#FF8A73]" /> Built for Arbitrage Investors
                  </div>
                  <h4 className="font-serif text-xl font-bold text-white">
                    The Kaizen Philosophy
                  </h4>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Continuous improvement in real estate acquisitions through transparency, speed, and integrity.
                  </p>
                </div>
              </div>

              {/* Founder Quote Card */}
              <div
                className={`p-5 rounded-2xl border flex items-start gap-4 ${
                  isDark
                    ? "bg-[#0F1117]/80 border-white/10"
                    : "bg-white border-stone-200/80 shadow-md"
                }`}
              >
                <Quote className="w-8 h-8 text-[#E04F33] shrink-0 opacity-80" />
                <div className="space-y-1.5">
                  <p
                    className={`text-xs italic leading-relaxed ${
                      isDark ? "text-slate-300" : "text-stone-700"
                    }`}
                  >
                    "We built Kaizen to eliminate the opacity and friction in luxury real estate sourcing. Every investor deserves verified financials and total peace of mind."
                  </p>
                  <p className="text-[11px] font-mono font-bold text-[#E04F33] dark:text-[#FF8A73]">
                    — Kaizen Founding Team
                  </p>
                </div>
              </div>
            </div>

            {/* Right Story & Pillars Content */}
            <div ref={storyTextRef} className="lg:col-span-7 space-y-6">
              <div className="gsap-story-elem space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E04F33] dark:text-[#FF8A73] bg-[#E04F33]/10 px-3.5 py-1.5 rounded-full border border-[#E04F33]/20 inline-block">
                  Our Mission &amp; Vision
                </span>
                <h2
                  className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight leading-tight ${
                    isDark ? "text-white" : "text-stone-900"
                  }`}
                >
                  Why We Founded <br />
                  <span className="bg-gradient-to-r from-[#E04F33] via-amber-600 to-[#C87D55] bg-clip-text text-transparent italic font-normal">
                    Kaizen Real Estate
                  </span>
                </h2>
              </div>

              <p
                className={`gsap-story-elem text-xs sm:text-sm leading-relaxed ${
                  isDark ? "text-slate-300" : "text-stone-600"
                }`}
              >
                Traditional real estate sourcing is full of guesswork: inflated yield estimates, unvetted host listings, and high-pressure bidding wars that force buyers to make rushed commitments. Kaizen was created as a transparent bridge connecting discerning luxury property owners with serious arbitrage investors.
              </p>

              {/* Pillars List */}
              <div className="space-y-4 pt-2">
                {STORY_PILLARS.map((pillar, index) => (
                  <div
                    key={index}
                    className={`gsap-story-elem p-4 sm:p-5 rounded-2xl border flex items-start gap-4 transition-all ${
                      isDark
                        ? "bg-[#0F1117]/60 border-white/10 hover:border-[#E04F33]/40"
                        : "bg-white/90 border-stone-200/80 hover:border-[#E04F33]/30 shadow-sm"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#E04F33]/10 border border-[#E04F33]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-[#E04F33] dark:text-[#FF8A73]" />
                    </div>
                    <div className="space-y-1">
                      <h4
                        className={`text-sm font-bold font-serif ${
                          isDark ? "text-white" : "text-stone-900"
                        }`}
                      >
                        {pillar.title}
                      </h4>
                      <p
                        className={`text-xs leading-relaxed ${
                          isDark ? "text-slate-400" : "text-stone-600"
                        }`}
                      >
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY KAIZEN ADVANTAGES ── */}
      <section ref={advantagesRef} className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E04F33] dark:text-[#FF8A73]">
            Built for Serious Investors
          </span>
          <h2
            className={`text-2xl sm:text-4xl font-extrabold font-serif ${
              isDark ? "text-white" : "text-stone-900"
            }`}
          >
            Why Buyers Choose Kaizen
          </h2>
          <p
            className={`text-xs sm:text-sm ${
              isDark ? "text-slate-400" : "text-stone-600"
            }`}
          >
            We bridge the gap between luxury property owners and turnkey buyers with transparent metrics and automated hold guarantees.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ADVANTAGES.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <div key={idx} className="gsap-adv-card h-full">
                <motion.div
                  whileHover={{ y: -6 }}
                  className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-between space-y-4 h-full transition-all duration-300 ${
                    isDark
                      ? "bg-[#161922]/70 border-white/10 hover:border-[#E04F33]/40 shadow-black/40"
                      : "bg-white border-stone-200 hover:border-[#E04F33]/30 shadow-stone-200/50 shadow-lg"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#E04F33]/10 border border-[#E04F33]/20 text-[#E04F33] dark:text-[#FF8A73] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#E04F33]/10 text-[#E04F33] dark:text-[#FF8A73] text-[10px] font-mono font-bold border border-[#E04F33]/20">
                      {adv.tag}
                    </span>
                    <h3
                      className={`text-base font-extrabold font-serif ${
                        isDark ? "text-white" : "text-stone-900"
                      }`}
                    >
                      {adv.title}
                    </h3>
                    <p
                      className={`text-xs leading-relaxed ${
                        isDark ? "text-slate-400" : "text-stone-600"
                      }`}
                    >
                      {adv.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── TESTIMONIALS & VERIFIED EXPERIENCES ── */}
      <section ref={testimonialsRef} className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E04F33] dark:text-[#FF8A73]">
            Verified Experiences
          </span>
          <h2
            className={`text-2xl sm:text-3xl font-extrabold font-serif ${
              isDark ? "text-white" : "text-stone-900"
            }`}
          >
            What Buyers &amp; Hosts Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className={`gsap-test-card p-6 sm:p-8 rounded-3xl border flex flex-col justify-between space-y-4 ${
                isDark
                  ? "bg-[#161922]/70 border-white/10"
                  : "bg-white border-stone-200 shadow-md"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(t.rating)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p
                  className={`text-xs italic leading-relaxed ${
                    isDark ? "text-slate-300" : "text-stone-700"
                  }`}
                >
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#E04F33]/30"
                  />
                  <div>
                    <p
                      className={`text-xs font-bold ${
                        isDark ? "text-white" : "text-stone-900"
                      }`}
                    >
                      {t.name}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono">
                      {t.role} • {t.location}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  {t.yield}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA BANNER ── */}
      <section
        className={`rounded-3xl p-8 sm:p-12 border shadow-2xl text-center space-y-6 relative overflow-hidden ${
          isDark
            ? "bg-[#161922]/95 border-white/10 shadow-black/60"
            : "bg-white border-stone-200/90 shadow-stone-300/40"
        }`}
      >
        <div className="max-w-2xl mx-auto space-y-4 relative z-10">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E04F33] dark:text-[#FF8A73] bg-[#E04F33]/10 px-3.5 py-1.5 rounded-full border border-[#E04F33]/20">
            Start Your Acquisition Today
          </span>
          <h2
            className={`text-3xl sm:text-4xl font-black font-serif ${
              isDark ? "text-white" : "text-stone-900"
            }`}
          >
            Ready to Lock Your Next Turnkey Property?
          </h2>
          <p
            className={`text-xs sm:text-sm ${
              isDark ? "text-slate-300" : "text-stone-600"
            }`}
          >
            Browse our current inventory of luxury villas or connect with our concierge team to schedule a walkthrough.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={handlePrimaryCallAction}
              className="w-full sm:w-auto px-8 py-4 bg-[#E04F33] hover:bg-[#C8432A] text-white font-bold rounded-2xl text-sm uppercase tracking-wider shadow-xl shadow-[#E04F33]/25 flex items-center justify-center gap-2 font-mono transition-all cursor-pointer hover:scale-[1.02]"
            >
              <span>Book a Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
