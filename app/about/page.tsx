'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface FaqSlide {
  question: string;
  answer: string;
  linkText?: string;
  linkHref?: string;
}

const faqSlides: FaqSlide[] = [
  {
    question: 'How do I know my crystals & talismans are 100% authentic?',
    answer:
      'Every gemstone, obsidian carving, and jade talisman in our collection is strictly certified natural and unheated. We work directly with hereditary artisan families in Yunnan, Tibet, and Southeast Asia. Each talisman arrives with our Certificate of Authenticity and mineral origin guarantee.',
    linkText: 'Learn about our natural minerals',
    linkHref: '/shop',
  },
  {
    question: 'What makes the sacred consecration blessing unique?',
    answer:
      'Unlike mass-produced commercial decor, each Miracle Feng Shui piece is cleansed with pure mountain sage and consecrated through traditional sound resonance using high-frequency Tibetan singing bowls before leaving our sanctuary. This awakens the dormant Chi of the crystal.',
    linkText: 'Explore consecrated talismans',
    linkHref: '/shop?category=Bracelets',
  },
  {
    question: 'Where should I place the Pixiu or Citrine Tree in my home?',
    answer:
      'According to classical Eight Mansions Feng Shui, the Citrine Money Tree flourishes best in the South-East (Wealth Sector) or beside your cash desk/home office. For Pixiu, keep its head facing toward your primary entrance or window to attract auspicious abundance.',
    linkText: 'View wealth placement guide',
    linkHref: '/shop?category=Trees',
  },
  {
    question: 'Can I wear multiple Feng Shui bracelets simultaneously?',
    answer:
      'Yes, complementary energies amplify each other. For example, wearing a Black Obsidian Wealth Bracelet on your receptive (left) wrist pairs harmoniously with a Rose Quartz or Tiger Eye bracelet to balance spiritual protection with prosperity.',
    linkText: 'Discover bracelet pairings',
    linkHref: '/shop?category=Bracelets',
  },
  {
    question: 'What is your ethical artisan sourcing commitment?',
    answer:
      'We practice fair-trade artisan compensation, zero plastic sustainable packaging, and support master carver guilds whose craft spans generations. By choosing handcrafted artifacts, you keep human devotion and cultural heritage alive.',
    linkText: 'Support our artisan families',
    linkHref: '/shop',
  },
];

export default function AboutPage() {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [currentFaqIndex, setCurrentFaqIndex] = useState(0);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [activeSubnav, setActiveSubnav] = useState('about');

  // Step Refs for sticky scroll detection in the dark section
  const step0Ref = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);

  // Scroll listener / Intersection Observer to update sticky animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.innerHeight * 0.45;
      const getTop = (el: HTMLElement | null) =>
        el ? el.getBoundingClientRect().top : Infinity;

      const top1 = getTop(step1Ref.current);
      const top2 = getTop(step2Ref.current);
      const top3 = getTop(step3Ref.current);

      if (top3 <= offset) {
        setActiveStep(2); // Shop securely
      } else if (top2 <= offset) {
        setActiveStep(1); // Buy extraordinary
      } else if (top1 <= offset) {
        setActiveStep(0); // Sell/Craft extraordinarily
      } else {
        setActiveStep(0); // Intro
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-cycle FAQ every 8s if user hasn't clicked
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFaqIndex((prev) => (prev + 1) % faqSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevFaq = () => {
    setCurrentFaqIndex((prev) => (prev === 0 ? faqSlides.length - 1 : prev - 1));
  };

  const handleNextFaq = () => {
    setCurrentFaqIndex((prev) => (prev + 1) % faqSlides.length);
  };

  const scrollToStep = (index: number) => {
    const targets = [step1Ref, step2Ref, step3Ref];
    const target = targets[index]?.current;
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#222222]">
      {/* Sticky Secondary Subnav (Exact Etsy layout) */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E8E4DA] transition-all duration-200">
        <div className="etsy-container flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <Link
              href="/about"
              className="flex items-center gap-2 text-[#3A1F62] hover:opacity-90 transition-opacity"
            >
              <div className="w-8 h-8 rounded-full bg-[#3A1F62] text-amber-300 flex items-center justify-center font-serif text-sm font-bold shadow-xs">
                ☯
              </div>
              <span className="font-serif font-bold text-[17px] tracking-tight text-[#140D1F]">
                Miracle feng shui
              </span>
            </Link>
          </div>

          <nav className="flex items-center gap-1 sm:gap-4 text-xs font-semibold text-gray-600 overflow-x-auto no-scrollbar py-1">
            <button
              type="button"
              onClick={() => {
                setActiveSubnav('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activeSubnav === 'about'
                  ? 'bg-[#F3EEFC] text-[#3A1F62] font-bold'
                  : 'hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              About
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveSubnav('how-it-works');
                document.getElementById('how-it-works-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activeSubnav === 'how-it-works'
                  ? 'bg-[#F3EEFC] text-[#3A1F62] font-bold'
                  : 'hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              How It Works
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveSubnav('artisans');
                document.getElementById('artisan-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activeSubnav === 'artisans'
                  ? 'bg-[#F3EEFC] text-[#3A1F62] font-bold'
                  : 'hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              Artisans & Lineage
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveSubnav('faq');
                document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activeSubnav === 'faq'
                  ? 'bg-[#F3EEFC] text-[#3A1F62] font-bold'
                  : 'hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              Curious Minds
            </button>
            <Link
              href="/shop"
              className="ml-2 hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#3A1F62] hover:bg-[#2B154C] text-white text-xs font-bold transition-all shadow-xs"
            >
              <span>Explore Collection</span>
              <i className="fa-solid fa-arrow-right text-[10px]" />
            </Link>
          </nav>
        </div>
      </div>

      {/* SECTION 1: HERO STATEMENT SLIDE (Exact Etsy Screenshot 1 Replica) */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-[#E8E4DA] bg-white">
        <div className="etsy-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Etsy-style Hand with Screen/Tablet Illustration (Screenshot 1 replica) */}
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
              <div className="relative w-full max-w-[420px] aspect-[4/4.2] flex items-center justify-center">
                {/* SVG Exact Replica of Etsy's Hand touching Device Illustration in our brand colorway */}
                <svg
                  className="w-full h-full max-h-[380px] drop-shadow-sm select-none"
                  viewBox="0 0 400 380"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Glowing subtle back aura */}
                  <circle cx="210" cy="170" r="130" fill="#FBF7EE" />
                  <circle cx="210" cy="170" r="90" fill="#F3EEFC" opacity="0.6" />

                  {/* Tablet / Screen Frame (Rich Crimson / Mystic Purple) */}
                  <g className="transition-transform duration-500 hover:scale-[1.02] cursor-pointer">
                    <rect
                      x="70"
                      y="70"
                      width="250"
                      height="170"
                      rx="22"
                      fill="#7C2D12"
                      stroke="#571E0B"
                      strokeWidth="4"
                    />
                    {/* Screen Inner Display (Warm Amber / Peach) */}
                    <rect
                      x="90"
                      y="88"
                      width="210"
                      height="134"
                      rx="12"
                      fill="#EA580C"
                    />
                    {/* Inner Sanctuary / Shop Emblem */}
                    <rect
                      x="135"
                      y="120"
                      width="120"
                      height="80"
                      rx="8"
                      fill="#9A3412"
                    />
                    {/* Roof / Awning Canopy */}
                    <path
                      d="M130 120H260L250 102H140L130 120Z"
                      fill="#FEF3C7"
                      stroke="#9A3412"
                      strokeWidth="2"
                    />
                    {/* Store Pillars & Door */}
                    <rect x="175" y="145" width="40" height="55" rx="4" fill="#FEF3C7" />
                    {/* Camera / Indicator dot */}
                    <circle cx="285" cy="155" r="4.5" fill="#FEF3C7" opacity="0.8" />
                  </g>

                  {/* Hand Reaching from Bottom with Spiritual Wrist Beads */}
                  <g className="animate-float-gentle">
                    {/* Wrist Red/Purple Bead Bangle */}
                    <ellipse cx="178" cy="328" rx="38" ry="14" fill="#881337" />
                    <circle cx="150" cy="328" r="8" fill="#9F1239" />
                    <circle cx="165" cy="333" r="8.5" fill="#881337" />
                    <circle cx="182" cy="334" r="8.5" fill="#9F1239" />
                    <circle cx="198" cy="331" r="8" fill="#881337" />
                    <circle cx="210" cy="325" r="7.5" fill="#BE123C" />

                    {/* Hand & Palm (Warm Terracotta/Flesh tone matching Etsy) */}
                    <path
                      d="M152 320C145 285 142 245 148 230C152 220 162 215 170 230C176 240 178 255 180 265L180 135C180 115 204 115 204 135L204 235C208 230 216 220 226 224C234 227 234 238 232 248C236 242 244 240 248 248C252 254 250 265 244 274C248 274 252 278 250 286C248 296 230 320 210 325Z"
                      fill="#F6A892"
                      stroke="#C8725C"
                      strokeWidth="3.5"
                      strokeLinejoin="round"
                    />

                    {/* Touch Ripple Wave on Screen where index finger touches */}
                    <circle cx="192" cy="132" r="14" fill="white" opacity="0.4" className="animate-ping" />
                    <circle cx="192" cy="132" r="6" fill="white" opacity="0.8" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Right Column: Statement Content & Interactive Links (Exact Etsy Typography) */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-serif font-normal text-[#222222] tracking-tight leading-[1.12] mb-6">
                Keep Commerce Human
              </h1>

              <div className="space-y-5 text-[15px] sm:text-[17px] text-[#222222] leading-relaxed font-normal">
                <p>
                  Miracle Feng Shui is the global marketplace for unique and authentic sacred goods. It&apos;s home to a{' '}
                  <button
                    type="button"
                    onClick={() => setActivePanel('items')}
                    className="text-[#222222] font-semibold underline decoration-[#222222]/50 hover:decoration-[#222222] transition-colors cursor-pointer"
                  >
                    universe of special, extraordinary items
                  </button>
                  , from natural unheated crystals to consecrated obsidian talismans.
                </p>

                <p>
                  In a time of increasing automation, it&apos;s our mission to keep human connection at the heart of commerce. That&apos;s why we built a place where creativity lives and thrives because it&apos;s powered by people. We help our{' '}
                  <button
                    type="button"
                    onClick={() => setActivePanel('artisans')}
                    className="text-[#222222] font-semibold underline decoration-[#222222]/50 hover:decoration-[#222222] transition-colors cursor-pointer"
                  >
                    community of sellers
                  </button>{' '}
                  turn their ideas into successful businesses. Our platform connects them with{' '}
                  <button
                    type="button"
                    onClick={() => setActivePanel('homes')}
                    className="text-[#222222] font-semibold underline decoration-[#222222]/50 hover:decoration-[#222222] transition-colors cursor-pointer"
                  >
                    millions of buyers
                  </button>{' '}
                  looking for an alternative – something special with a human touch, for those moments in life that deserve imagination.
                </p>

                <p>
                  As a company, we strive to lead with{' '}
                  <button
                    type="button"
                    onClick={() => setActivePanel('values')}
                    className="text-[#222222] font-semibold underline decoration-[#222222]/50 hover:decoration-[#222222] transition-colors cursor-pointer"
                  >
                    our guiding principles
                  </button>{' '}
                  and to help spread ideas of sustainability and responsibility whose impact can reach far beyond our own business.
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-8 flex items-center gap-4">
                <Link
                  href="/shop"
                  className="px-7 py-3 rounded-full bg-[#222222] hover:bg-black text-white text-sm font-bold transition-all shadow-sm active:scale-95"
                >
                  Explore the Sanctuary
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* INTERACTIVE SLIDE-OVER DRAWER (Exact Etsy Panel Replica) */}
        {activePanel && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
            <div
              className="w-full max-w-lg bg-white h-full shadow-2xl overflow-y-auto p-6 sm:p-10 flex flex-col justify-between border-l border-gray-200 animate-in slide-in-from-right duration-300"
              role="dialog"
              aria-modal="true"
            >
              <div>
                {/* Close Button */}
                <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#3A1F62]">
                    Deep Dive
                  </span>
                  <button
                    type="button"
                    onClick={() => setActivePanel(null)}
                    aria-label="Close panel"
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-all cursor-pointer"
                  >
                    <i className="fa-solid fa-xmark text-base" />
                  </button>
                </div>

                {/* Panel Content Based on Selected Tab */}
                {activePanel === 'items' && (
                  <div className="mt-8">
                    <div className="w-16 h-16 rounded-2xl bg-[#F3EEFC] text-[#3A1F62] flex items-center justify-center text-2xl mb-6 shadow-inner">
                      <i className="fa-solid fa-gem" />
                    </div>
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">
                      Our Living Archive
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#140D1F] mt-1 mb-4">
                      120,000+ Sacred Artifacts
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                      Miracle Feng Shui celebrates the transformative power of authentic earthly elements. It is the one sanctuary where you can discover certified A-Grade Burmese jade pendants, 7 Chakra Gemstone trees, hand-hammered 7-metal singing bowls, and tailor-blessed Pixiu wealth rings.
                    </p>
                    <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E4DA] space-y-3 text-xs text-gray-700">
                      <div className="flex items-center gap-2 font-bold text-[#3A1F62]">
                        <i className="fa-solid fa-check-circle" />
                        Zero Synthetic Resin or Imitation Glass
                      </div>
                      <div className="flex items-center gap-2 font-bold text-[#3A1F62]">
                        <i className="fa-solid fa-check-circle" />
                        Ethically Mined Crystals with Natural Inclusions
                      </div>
                      <div className="flex items-center gap-2 font-bold text-[#3A1F62]">
                        <i className="fa-solid fa-check-circle" />
                        Individually Inspected by Senior Gemologists
                      </div>
                    </div>
                  </div>
                )}

                {activePanel === 'artisans' && (
                  <div className="mt-8">
                    <div className="w-16 h-16 rounded-2xl bg-[#FFF7ED] text-[#C2410C] flex items-center justify-center text-2xl mb-6 shadow-inner">
                      <i className="fa-solid fa-hands" />
                    </div>
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">
                      Generational Lineage
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#140D1F] mt-1 mb-4">
                      150+ Hereditary Master Carvers
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                      Every single day, master artisans pour ancestral knowledge, devotion, and stillness into every stroke of the carving chisel. Rather than automated factories, our artisan workshops sustain families, preserve historic carving methods, and safeguard the spiritual soul of each mineral.
                    </p>
                    <div className="p-4 rounded-2xl bg-[#FFF7ED] border border-[#FFEDD5] space-y-2 text-xs text-amber-900">
                      <p className="font-bold flex items-center gap-2">
                        <i className="fa-solid fa-heart" />
                        Fair-Trade & Cultural Sustainability
                      </p>
                      <p className="leading-relaxed">
                        We pay living wages well above standard market benchmarks and invest directly into artisan apprentice guilds.
                      </p>
                    </div>
                  </div>
                )}

                {activePanel === 'homes' && (
                  <div className="mt-8">
                    <div className="w-16 h-16 rounded-2xl bg-[#ECFDF5] text-emerald-700 flex items-center justify-center text-2xl mb-6 shadow-inner">
                      <i className="fa-solid fa-house-chimney-window" />
                    </div>
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
                      Global Harmony
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#140D1F] mt-1 mb-4">
                      98,000+ Harmonized Sanctuaries
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                      Whether you are welcoming prosperity into a new home, cleansing heavy office energy, or seeking peaceful meditation in your living space, Miracle Feng Shui empowers you with exact directional placement manuals and personalized guidance.
                    </p>
                    <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs">
                      <div className="flex items-center justify-between font-bold text-gray-900 mb-1">
                        <span>Verified Patron Rating</span>
                        <span className="text-amber-600">4.98 / 5.0 ★</span>
                      </div>
                      <p className="text-gray-500">Based on over 24,000+ verified customer reviews worldwide.</p>
                    </div>
                  </div>
                )}

                {activePanel === 'values' && (
                  <div className="mt-8">
                    <div className="w-16 h-16 rounded-2xl bg-[#F3EEFC] text-[#3A1F62] flex items-center justify-center text-2xl mb-6 shadow-inner">
                      <i className="fa-solid fa-scale-balanced" />
                    </div>
                    <span className="text-xs font-bold text-[#3A1F62] uppercase tracking-wide">
                      Ethical Foundations
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#140D1F] mt-1 mb-4">
                      Our 5 Guiding Principles
                    </h2>
                    <ul className="space-y-4 text-sm text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#3A1F62] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          1
                        </span>
                        <div>
                          <strong className="block text-gray-900">We Commit to Pure Intention:</strong>
                          Never sell plastic or false representations of natural earth crystals.
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#3A1F62] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          2
                        </span>
                        <div>
                          <strong className="block text-gray-900">We Honor Master Lineage:</strong>
                          Champion human craftsmanship over automated assembly lines.
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#3A1F62] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          3
                        </span>
                        <div>
                          <strong className="block text-gray-900">We Minimize Earth Waste:</strong>
                          Utilize plastic-free cardboard packaging, hemp cordage, and reusable silk pouches.
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#3A1F62] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          4
                        </span>
                        <div>
                          <strong className="block text-gray-900">We Consecrate with Care:</strong>
                          Cleanse and invoke high-frequency blessing sound waves before dispatch.
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#3A1F62] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          5
                        </span>
                        <div>
                          <strong className="block text-gray-900">We Lead with Compassion:</strong>
                          Treat every patron as a sacred guest on their spiritual wellness journey.
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Panel Footer CTA */}
              <div className="pt-8 mt-8 border-t border-gray-100 flex flex-col gap-2">
                <Link
                  href="/shop"
                  onClick={() => setActivePanel(null)}
                  className="w-full py-3 rounded-full bg-[#3A1F62] text-white text-center font-bold text-xs hover:bg-[#2B154C] transition-colors"
                >
                  Browse Sacred Catalog
                </Link>
                <button
                  type="button"
                  onClick={() => setActivePanel(null)}
                  className="w-full py-2.5 rounded-full text-xs font-semibold text-gray-500 hover:text-gray-900 cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 2: HOW ETSY WORKS (Exact Dark Slate Navy `#2F2E41` Sticky Scroll Section as shown in Screenshots 2, 3, 4, 5) */}
      <section
        id="how-it-works-section"
        className="bg-[#2F2E41] text-white relative py-16 sm:py-24"
      >
        <div className="etsy-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start relative">
            
            {/* Left Column: Scrolling Content Blocks (Screenshots 2, 3, 4, 5) */}
            <div className="lg:col-span-7 space-y-28 sm:space-y-36">
              
              {/* Step 0: Intro Section */}
              <div ref={step0Ref} className="pt-4 sm:pt-8 min-h-[36vh] flex flex-col justify-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-white tracking-tight leading-[1.18] mb-6">
                  How Miracle Feng Shui Works
                </h2>
                <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-xl font-normal">
                  Our global marketplace is a vibrant community of real people connecting over special goods. The platform empowers sellers to do what they love and helps buyers find what they love.
                </p>
              </div>

              {/* Step 1: Sell Extraordinarily (Screenshot 3) */}
              <div ref={step1Ref} className="min-h-[45vh] flex flex-col justify-center">
                <h3 className="text-3xl sm:text-4xl font-serif font-normal text-white tracking-tight leading-tight mb-4">
                  Sell extraordinarily
                </h3>
                <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-xl mb-6">
                  With low fees, powerful tools, and support and education, we help creative entrepreneurs start, manage, and scale their businesses. Want to become a Miracle Feng Shui seller? All it takes is $0.20 to get started.
                </p>
                <div>
                  <Link
                    href="/shop"
                    className="inline-block px-6 py-2.5 rounded-full border border-white text-white hover:bg-white hover:text-[#2F2E41] text-sm font-semibold transition-all shadow-xs"
                  >
                    Become a seller
                  </Link>
                </div>
              </div>

              {/* Step 2: Buy Extraordinary (Screenshot 4) */}
              <div ref={step2Ref} className="min-h-[45vh] flex flex-col justify-center">
                <h3 className="text-3xl sm:text-4xl font-serif font-normal text-white tracking-tight leading-tight mb-4">
                  Buy extraordinary
                </h3>
                <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-xl mb-6">
                  From the specific to the unexpected (or custom-made), our search tools help buyers explore all the special one-of-a-kind items offered by our sellers. Our Journal and Editors&apos; Picks curate exciting trends and ideas discovered in the marketplace by our own team.
                </p>
                <div>
                  <Link
                    href="/shop"
                    className="inline-block px-6 py-2.5 rounded-full border border-white text-white hover:bg-white hover:text-[#2F2E41] text-sm font-semibold transition-all shadow-xs"
                  >
                    Start shopping
                  </Link>
                </div>
              </div>

              {/* Step 3: Shop Securely (Screenshot 5) */}
              <div ref={step3Ref} className="min-h-[45vh] pb-12 flex flex-col justify-center">
                <h3 className="text-3xl sm:text-4xl font-serif font-normal text-white tracking-tight leading-tight mb-4">
                  Shop securely
                </h3>
                <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-xl">
                  We provide the technology behind the Miracle Feng Shui marketplace, helping buyers and sellers connect and exchange securely. Keeping those connections safe, fun, and secure is our priority, and we&apos;re always{' '}
                  <Link href="/privacy-policy" className="underline hover:text-amber-300 transition-colors">
                    here to help
                  </Link>
                  .
                </p>
              </div>

            </div>

            {/* Right Column: Sticky 3-Circle Cluster Animated Figure (Screenshots 2, 3, 4, 5) */}
            <div className="lg:col-span-5 lg:sticky lg:top-[22vh] flex items-center justify-center py-8 lg:py-0">
              <div className="relative w-full max-w-[380px] aspect-square flex items-center justify-center">
                
                {/* Background Silhouette Disk (as seen behind the 3 circles in screenshots) */}
                <div className="absolute inset-4 rounded-full bg-[#262535] opacity-90 transition-transform duration-700 pointer-events-none" />

                {/* 3 Circular Badges in Triangular Arrangement */}
                <div className="relative w-full h-full">

                  {/* Circle 1: TOP (Rose/Coral Background `#D95B5B` - Hand holding hammer/chisel) */}
                  <div
                    onClick={() => scrollToStep(0)}
                    className={`absolute left-1/2 -translate-x-1/2 top-4 w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-[#E05A47] flex items-center justify-center shadow-lg transition-all duration-500 cursor-pointer ${
                      activeStep === 0
                        ? 'scale-110 ring-4 ring-white/30 z-20 shadow-2xl brightness-105'
                        : 'scale-95 opacity-80 z-10 hover:opacity-100 hover:scale-100'
                    }`}
                  >
                    {/* SVG Illustration: Hand holding tool / hammer */}
                    <svg className="w-24 h-24 select-none" viewBox="0 0 120 120" fill="none">
                      {/* Wooden handle */}
                      <rect x="35" y="45" width="8" height="42" rx="3" transform="rotate(-30 35 45)" fill="#D97706" />
                      {/* Hammer Head */}
                      <rect x="25" y="40" width="30" height="14" rx="2" transform="rotate(-30 25 40)" fill="#E11D48" />
                      <rect x="23" y="38" width="8" height="18" rx="2" transform="rotate(-30 23 38)" fill="#BE123C" />
                      {/* Hand with sleeve cuff */}
                      <g className={activeStep === 0 ? 'animate-bounce' : ''} style={{ animationDuration: '2s' }}>
                        {/* Sleeve cuff with yellow/red pattern */}
                        <path d="M80 85L92 97" stroke="#FEF08A" strokeWidth="6" strokeLinecap="round" />
                        <path d="M82 83L94 95" stroke="#991B1B" strokeWidth="4" strokeLinecap="round" />
                        {/* Palm & fingers */}
                        <path
                          d="M48 58C52 52 64 56 68 64C72 70 74 80 84 88C86 90 84 94 80 94C72 94 62 82 56 78L48 70C44 66 45 61 48 58Z"
                          fill="#F6A892"
                          stroke="#C8725C"
                          strokeWidth="2"
                        />
                        {/* Thumb gripping */}
                        <path d="M52 54C55 52 60 56 58 60L52 66" stroke="#C8725C" strokeWidth="2.5" strokeLinecap="round" />
                      </g>
                    </svg>
                  </div>

                  {/* Circle 2: BOTTOM LEFT (Peach/Cream Background `#F8D3BE` - Two Hands Giving/Holding Gift) */}
                  <div
                    onClick={() => scrollToStep(1)}
                    className={`absolute left-2 bottom-4 w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-[#F8D3BE] flex items-center justify-center shadow-lg transition-all duration-500 cursor-pointer ${
                      activeStep === 1
                        ? 'scale-110 ring-4 ring-white/30 z-20 shadow-2xl brightness-105'
                        : 'scale-95 opacity-80 z-10 hover:opacity-100 hover:scale-100'
                    }`}
                  >
                    {/* SVG Illustration: Hands offering parcel/gift */}
                    <svg className="w-28 h-28 select-none" viewBox="0 0 130 130" fill="none">
                      {/* Hands coming from bottom */}
                      <g className={activeStep === 1 ? 'animate-pulse' : ''}>
                        {/* Left Hand */}
                        <g>
                          <path d="M25 100L45 100" stroke="#E11D48" strokeWidth="7" strokeLinecap="round" />
                          <path d="M27 98L43 98" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" />
                          <path
                            d="M26 95C24 75 30 55 42 50C48 48 52 55 48 68L50 82C50 90 40 96 26 95Z"
                            fill="#F6A892"
                            stroke="#C8725C"
                            strokeWidth="2"
                          />
                        </g>

                        {/* Gift Envelope in center */}
                        <g className="drop-shadow-xs">
                          <rect x="42" y="60" width="46" height="32" rx="4" fill="#FFFFFF" stroke="#E11D48" strokeWidth="1.5" />
                          <path d="M42 64L65 78L88 64" stroke="#E11D48" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                          <circle cx="65" cy="78" r="3.5" fill="#F59E0B" />
                          {/* Bow tie */}
                          <path d="M60 76C56 72 58 68 62 72L65 76L68 72C72 68 74 72 70 76Z" fill="#F59E0B" />
                        </g>

                        {/* Right Hand */}
                        <g>
                          <path d="M85 100L105 100" stroke="#E11D48" strokeWidth="7" strokeLinecap="round" />
                          <path d="M87 98L103 98" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" />
                          <path
                            d="M104 95C106 75 100 55 88 50C82 48 78 55 82 68L80 82C80 90 90 96 104 95Z"
                            fill="#F6A892"
                            stroke="#C8725C"
                            strokeWidth="2"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>

                  {/* Circle 3: BOTTOM RIGHT (Vibrant Orange Background `#F1641E` - Open Door with Sparkles/Surprise) */}
                  <div
                    onClick={() => scrollToStep(2)}
                    className={`absolute right-2 bottom-4 w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-[#F1641E] flex items-center justify-center shadow-lg transition-all duration-500 cursor-pointer ${
                      activeStep === 2
                        ? 'scale-110 ring-4 ring-white/30 z-20 shadow-2xl brightness-105'
                        : 'scale-95 opacity-80 z-10 hover:opacity-100 hover:scale-100'
                    }`}
                  >
                    {/* SVG Illustration: Doorway opening with surprises (Screenshot 5) */}
                    <svg className="w-28 h-28 select-none" viewBox="0 0 130 130" fill="none">
                      {/* Doorway Silhouette */}
                      <path
                        d="M42 35C42 22 55 12 70 12C85 12 98 22 98 35V105H42V35Z"
                        fill="#D97706"
                        opacity="0.4"
                      />
                      {/* White Open Door */}
                      <path
                        d="M45 40C45 28 56 20 68 20C80 20 86 28 86 40V102H45V40Z"
                        fill="#FFFFFF"
                        stroke="#EA580C"
                        strokeWidth="2"
                      />
                      {/* Door Handle */}
                      <circle cx="80" cy="65" r="3" fill="#D97706" />

                      {/* Sparkles / Magic bursts emerging from doorway */}
                      <g className={activeStep === 2 ? 'animate-bounce' : ''}>
                        {/* Star 1 */}
                        <path d="M52 28L54 22L56 28L62 30L56 32L54 38L52 32L46 30Z" fill="#FEF08A" />
                        {/* Star 2 */}
                        <path d="M96 48L97.5 43L99 48L104 49.5L99 51L97.5 56L96 51L91 49.5Z" fill="#FEF08A" />
                        {/* Star 3 */}
                        <circle cx="94" cy="24" r="2.5" fill="#FFFFFF" />
                        <circle cx="38" cy="54" r="2" fill="#FFFFFF" />
                      </g>
                    </svg>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: ARTISAN SHOWCASE & IMPACT STATS */}
      <section id="artisan-section" className="py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#E8E4DA]">
        <div className="etsy-container">
          {/* Numbers Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 sm:p-12 rounded-3xl bg-white border border-[#E8E4DA] shadow-xs mb-16 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-serif font-bold text-[#3A1F62]">120K+</p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">Sacred Talismans Delivered</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-serif font-bold text-[#C2410C]">150+</p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">Hereditary Master Artisans</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-serif font-bold text-emerald-700">100%</p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">Natural Certified Minerals</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-serif font-bold text-amber-600">4.98★</p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">Global Patron Trust Rating</p>
            </div>
          </div>

          {/* Artisan Story Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#3A1F62]">
                Behind the Chisel & Silk
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#140D1F] tracking-tight leading-tight">
                Generations of Mastery, <br />
                Crafted for Your Modern Sanctuary.
              </h2>
              <p className="text-base text-gray-700 leading-relaxed">
                In an era dominated by high-speed factories, the ancient methods of lapidary stone-cutting, lost-wax bronze casting, and sacred knotting require patience, meditation, and pure intention.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our master carver families have dedicated their lives to understanding the unique cleavage planes of jadeite, the cooling crystalline structures of natural citrine quartz, and the resonant metallurgy of seven-metal singing bowls.
              </p>

              <div className="pt-2">
                <blockquote className="border-l-4 border-[#3A1F62] pl-4 py-1 text-sm italic text-gray-800 font-serif">
                  &ldquo;A stone is not merely carved; it is awakened. When you hold a talisman crafted with reverence, you hold the calm of the mountain itself.&rdquo;
                </blockquote>
                <p className="text-xs font-bold text-[#3A1F62] mt-2 pl-4">
                  — Master Chen, 4th Generation Jade Carver
                </p>
              </div>

              <div className="pt-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#140D1F] hover:bg-black text-white text-xs font-bold transition-all shadow-sm"
                >
                  <span>Support Artisan Craftsmanship</span>
                  <i className="fa-solid fa-arrow-right text-[10px]" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl bg-white border border-[#E8E4DA] p-5 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#3A1F62] flex items-center justify-center text-lg mb-3">
                    <i className="fa-solid fa-seedling" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Sustainable Harvesting</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Zero dynamite blasting or destructive strip-mining. We preserve ecological balance.
                  </p>
                </div>
                <div className="rounded-2xl bg-white border border-[#E8E4DA] p-5 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-lg mb-3">
                    <i className="fa-solid fa-shield-halved" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Guaranteed Authenticity</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Rigorous mineralogical laboratory inspection card accompanies every single parcel.
                  </p>
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <div className="rounded-2xl bg-white border border-[#E8E4DA] p-5 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg mb-3">
                    <i className="fa-solid fa-hand-holding-dollar" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Living Wage Direct</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Fair, transparent compensation directly empowers hereditary artisan lineages.
                  </p>
                </div>
                <div className="rounded-2xl bg-white border border-[#E8E4DA] p-5 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#C2410C] flex items-center justify-center text-lg mb-3">
                    <i className="fa-solid fa-box-open" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Eco-Conscious Packaging</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Delivered in reusable raw silk pouches and biodegradable paper materials.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CURIOUS MINDS CAROUSEL (Exact Etsy Replica with Arrow Navigation) */}
      <section id="faq-section" className="py-20 sm:py-28 bg-white border-b border-[#E8E4DA]">
        <div className="etsy-container max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#3A1F62] block mb-2">
                Wisdom & Inquiries
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#140D1F]">
                Curious Minds Want to Know
              </h2>
            </div>

            {/* Carousel Arrow Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevFaq}
                aria-label="Previous question"
                className="w-11 h-11 rounded-full border border-gray-300 hover:border-[#3A1F62] hover:bg-[#F3EEFC] text-gray-700 hover:text-[#3A1F62] flex items-center justify-center transition-all cursor-pointer active:scale-95"
              >
                <i className="fa-solid fa-chevron-left text-sm" />
              </button>
              <button
                type="button"
                onClick={handleNextFaq}
                aria-label="Next question"
                className="w-11 h-11 rounded-full border border-gray-300 hover:border-[#3A1F62] hover:bg-[#F3EEFC] text-gray-700 hover:text-[#3A1F62] flex items-center justify-center transition-all cursor-pointer active:scale-95"
              >
                <i className="fa-solid fa-chevron-right text-sm" />
              </button>
            </div>
          </div>

          {/* Active Carousel Card */}
          <div className="bg-[#FAF9F6] border border-[#E8E4DA] rounded-3xl p-8 sm:p-12 transition-all duration-300 relative overflow-hidden min-h-[260px] flex flex-col justify-between">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-[#F3EEFC] text-[#3A1F62] text-xs font-bold">
                  Question {currentFaqIndex + 1} of {faqSlides.length}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#140D1F] mb-4">
                {faqSlides[currentFaqIndex].question}
              </h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {faqSlides[currentFaqIndex].answer}
              </p>
            </div>

            {faqSlides[currentFaqIndex].linkText && (
              <div className="mt-6 pt-6 border-t border-gray-200/80 flex items-center justify-between">
                <Link
                  href={faqSlides[currentFaqIndex].linkHref || '/shop'}
                  className="text-xs sm:text-sm font-bold text-[#3A1F62] hover:underline inline-flex items-center gap-1.5"
                >
                  <span>{faqSlides[currentFaqIndex].linkText}</span>
                  <i className="fa-solid fa-arrow-right text-[10px]" />
                </Link>

                {/* Dot Indicators */}
                <div className="flex items-center gap-1.5">
                  {faqSlides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCurrentFaqIndex(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        currentFaqIndex === i ? 'w-6 bg-[#3A1F62]' : 'w-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 5: FINAL CALL TO ACTION BANNER */}
      <section className="py-20 bg-gradient-to-r from-[#3A1F62] to-[#20103A] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="etsy-container relative z-10 max-w-2xl mx-auto">
          <div className="w-14 h-14 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center text-2xl mx-auto mb-6">
            ☯
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Invite Harmony & Abundance Into Your Life.
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mb-8 leading-relaxed font-light">
            Every home deserves serenity, prosperity, and authentic energetic balance. Experience the genuine difference of consecrated, artisan-carved talismans.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/shop"
              className="px-8 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-gray-950 font-bold text-sm transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              Start Exploring
            </Link>
            <Link
              href="/shop?category=Gifts"
              className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all active:scale-95"
            >
              Browse Blessed Gifts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
