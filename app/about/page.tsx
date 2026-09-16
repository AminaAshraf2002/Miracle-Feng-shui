'use client';

import React, { useState, useEffect } from 'react';
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
  const [activeHowStep, setActiveHowStep] = useState<'craft' | 'bless' | 'guide'>('craft');
  const [activeSubnav, setActiveSubnav] = useState('about');

  // Auto-cycle FAQ every 7s if not manually clicked
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFaqIndex((prev) => (prev + 1) % faqSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevFaq = () => {
    setCurrentFaqIndex((prev) => (prev === 0 ? faqSlides.length - 1 : prev - 1));
  };

  const handleNextFaq = () => {
    setCurrentFaqIndex((prev) => (prev + 1) % faqSlides.length);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#222222]">
      {/* Sticky Secondary Subnav (Etsy replica) */}
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

      {/* SECTION 1: HERO STATEMENT SLIDE (Exact Etsy "Keep Commerce Human" Replica) */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-[#E8E4DA] bg-[#FAF9F6]">
        <div className="etsy-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Interactive Animated Visual (Hands holding talisman with glowing aura) */}
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
              <div className="relative w-full max-w-[420px] aspect-[4/4.5] rounded-3xl bg-gradient-to-b from-[#FAF5FF] via-white to-[#FFF7ED] border border-[#E8E4DA] p-8 shadow-sm flex flex-col justify-between overflow-hidden group">
                {/* Floating energy aura rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-purple-200/30 blur-2xl animate-pulse" />
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-amber-200/20 blur-xl" />

                {/* Top badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#3A1F62] bg-[#F3EEFC] px-3 py-1 rounded-full border border-[#3A1F62]/10">
                    <i className="fa-solid fa-sparkles text-[10px] text-amber-500" />
                    Sacred Artisan Craft
                  </span>
                  <span className="text-xs font-semibold text-gray-500">Est. 1989</span>
                </div>

                {/* Animated Centre SVG Illustration: Artisans Handcrafting & Chi Awakening */}
                <div className="relative z-10 my-auto py-6 flex flex-col items-center justify-center">
                  <div className="relative w-44 h-44 flex items-center justify-center">
                    {/* Glowing outer rotating wheel */}
                    <svg
                      className="absolute inset-0 w-full h-full text-[#3A1F62]/15 animate-spin"
                      style={{ animationDuration: '30s' }}
                      viewBox="0 0 100 100"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        fill="none"
                      />
                    </svg>

                    {/* Central Sacred Lotus & Talisman */}
                    <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-[#3A1F62] to-[#6A329F] shadow-xl flex items-center justify-center text-white transform group-hover:scale-105 transition-transform duration-500 relative">
                      <div className="absolute inset-0 rounded-full border border-amber-300/40 animate-ping opacity-25" />
                      <i className="fa-solid fa-gem text-4xl text-amber-300 drop-shadow-md animate-float-gentle" />
                    </div>

                    {/* Floating mini energy badges */}
                    <div className="absolute -top-1 -right-1 bg-white border border-amber-200 shadow-md px-2.5 py-1 rounded-full flex items-center gap-1 text-[11px] font-bold text-amber-700 animate-bounce">
                      <i className="fa-solid fa-certificate text-[10px] text-amber-500" />
                      <span>100% Genuine</span>
                    </div>

                    <div className="absolute -bottom-2 -left-2 bg-white border border-purple-200 shadow-md px-2.5 py-1 rounded-full flex items-center gap-1 text-[11px] font-bold text-[#3A1F62]">
                      <i className="fa-solid fa-hands-holding-sparkles text-[10px]" />
                      <span>Consecrated</span>
                    </div>
                  </div>

                  <p className="text-center font-serif text-[#140D1F] font-bold text-base mt-6">
                    Hand-Carved & Blessed with Intention
                  </p>
                  <p className="text-center text-xs text-gray-500 max-w-[260px] mt-1">
                    Every piece carries harmonious vibrations calibrated for home prosperity and peace.
                  </p>
                </div>

                {/* Bottom quote pill */}
                <div className="relative z-10 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span>Authentic Lineage</span>
                  <span className="font-serif italic text-[#3A1F62]">Harmonize Your Life</span>
                </div>
              </div>
            </div>

            {/* Right Column: Statement Content & Interactive Trigger Words */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#3A1F62] block mb-3">
                Our Foundational Mission
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#140D1F] tracking-tight leading-[1.15] mb-6">
                Keep Spiritual Living <br className="hidden sm:inline" />
                <span className="text-[#3A1F62] font-semibold">Authentic & Sacred.</span>
              </h1>

              <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
                <p>
                  Miracle Feng Shui is the sanctuary for genuine energized artifacts, artisan talismans, and classical living wisdom. It is home to a{' '}
                  <button
                    type="button"
                    onClick={() => setActivePanel('items')}
                    className="text-[#3A1F62] font-bold underline decoration-[#3A1F62]/40 hover:decoration-[#3A1F62] transition-colors cursor-pointer inline-flex items-center gap-1"
                  >
                    <span>universe of special, sacred talismans</span>
                    <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
                  </button>
                  , from raw crystal formations to consecrated obsidian bracelets.
                </p>

                <p>
                  In a world of automated mass production and counterfeit resin, our mission is to keep human reverence and ancestral mastery at the heart of conscious living. That&apos;s why we built a sanctuary where sacred devotion thrives because it&apos;s powered by master craftspeople. We collaborate directly with a{' '}
                  <button
                    type="button"
                    onClick={() => setActivePanel('artisans')}
                    className="text-[#3A1F62] font-bold underline decoration-[#3A1F62]/40 hover:decoration-[#3A1F62] transition-colors cursor-pointer inline-flex items-center gap-1"
                  >
                    <span>guild of hereditary artisans</span>
                    <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
                  </button>{' '}
                  who turn raw earth gifts into life-altering blessings.
                </p>

                <p>
                  Our platform connects their generational art with{' '}
                  <button
                    type="button"
                    onClick={() => setActivePanel('homes')}
                    className="text-[#3A1F62] font-bold underline decoration-[#3A1F62]/40 hover:decoration-[#3A1F62] transition-colors cursor-pointer inline-flex items-center gap-1"
                  >
                    <span>millions of seekers & harmonized homes</span>
                    <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
                  </button>{' '}
                  looking for an authentic alternative—something imbued with pure vibration, for life moments that deserve serenity and prosperity.
                </p>

                <p>
                  As an ethical house, we strive to lead with{' '}
                  <button
                    type="button"
                    onClick={() => setActivePanel('values')}
                    className="text-[#3A1F62] font-bold underline decoration-[#3A1F62]/40 hover:decoration-[#3A1F62] transition-colors cursor-pointer inline-flex items-center gap-1"
                  >
                    <span>our sacred guiding principles</span>
                    <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
                  </button>{' '}
                  and to spread ideals of conscious harmony whose positive ripples extend far beyond our sanctuary.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/shop"
                  className="px-6 py-3.5 rounded-full bg-[#3A1F62] hover:bg-[#2B154C] text-white text-sm font-bold transition-all shadow-sm hover:shadow-md active:scale-95 flex items-center gap-2"
                >
                  <span>Explore Handcrafted Sanctum</span>
                  <i className="fa-solid fa-arrow-right text-xs" />
                </Link>
                <button
                  type="button"
                  onClick={() => setActivePanel('values')}
                  className="px-6 py-3.5 rounded-full bg-white hover:bg-gray-50 text-[#140D1F] border border-gray-300 text-sm font-bold transition-all active:scale-95"
                >
                  Read Guiding Principles
                </button>
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
                        We pay living wages well above standard market benchmarks and invest 5% of all proceeds directly into artisan apprentice funds.
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
                    <div className="space-y-3">
                      <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs">
                        <div className="flex items-center justify-between font-bold text-gray-900 mb-1">
                          <span>Verified Patron Rating</span>
                          <span className="text-amber-600">4.98 / 5.0 ★</span>
                        </div>
                        <p className="text-gray-500">Based on over 24,000+ verified customer reviews worldwide.</p>
                      </div>
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
                  className="w-full py-2.5 rounded-full text-xs font-semibold text-gray-500 hover:text-gray-900"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 2: HOW IT WORKS (Exact Etsy Dark/Thematic Layout) */}
      <section id="how-it-works-section" className="bg-[#140D1F] text-white py-20 sm:py-28 relative overflow-hidden">
        {/* Mystic ambient background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#3A1F62]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="etsy-container relative z-10">
          <div className="max-w-2xl mb-14">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400 block mb-3">
              The Sacred Journey
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-white tracking-tight leading-tight">
              How Miracle Feng Shui Works
            </h2>
            <p className="text-base sm:text-lg text-gray-300 mt-4 leading-relaxed font-light">
              Our sanctuary bridges centuries-old Eastern geomancy with genuine artisan integrity. The platform empowers master carvers to share their calling and guides seekers in curating mindful, blessed spaces.
            </p>
          </div>

          {/* 3 Step Pillars with Interactive Hover & Switcher */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div
              onMouseEnter={() => setActiveHowStep('craft')}
              className={`rounded-3xl p-8 transition-all duration-300 border flex flex-col justify-between ${
                activeHowStep === 'craft'
                  ? 'bg-[#211732] border-[#6A329F] shadow-2xl scale-[1.02]'
                  : 'bg-[#1A1226]/80 border-white/10 hover:border-white/20'
              }`}
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-400/15 border border-amber-400/30 text-amber-300 flex items-center justify-center text-2xl mb-6">
                  <i className="fa-solid fa-gem animate-pulse" />
                </div>
                <div className="text-[11px] uppercase tracking-wider text-amber-400 font-bold mb-1">
                  Pillar 01
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-3">
                  Ethical Extraction & Hand-Carving
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  We hand-select genuine natural crystals, Grade-A Burma jade, unheated citrine, and genuine black obsidian directly from ethical geological sources. Hereditary carvers shape each piece using traditional hand lapidary tools.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-gray-400">100% Genuine Certified</span>
                <Link
                  href="/shop"
                  className="text-xs font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1.5"
                >
                  <span>Explore Minerals</span>
                  <i className="fa-solid fa-arrow-right text-[10px]" />
                </Link>
              </div>
            </div>

            {/* Step 2 */}
            <div
              onMouseEnter={() => setActiveHowStep('bless')}
              className={`rounded-3xl p-8 transition-all duration-300 border flex flex-col justify-between ${
                activeHowStep === 'bless'
                  ? 'bg-[#211732] border-[#6A329F] shadow-2xl scale-[1.02]'
                  : 'bg-[#1A1226]/80 border-white/10 hover:border-white/20'
              }`}
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-purple-400/15 border border-purple-400/30 text-purple-300 flex items-center justify-center text-2xl mb-6">
                  <i className="fa-solid fa-bell-concierge animate-pulse" />
                </div>
                <div className="text-[11px] uppercase tracking-wider text-purple-400 font-bold mb-1">
                  Pillar 02
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-3">
                  Sound Bath Cleansing & Blessing
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Prior to leaving our doors, each piece undergoes traditional sage smudging and harmonic sound frequency activation with 7-metal Tibetan singing bowls to cleanse stagnant memories and harmonize elemental frequencies.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-gray-400">Ritual Consecration</span>
                <Link
                  href="/shop?category=Bracelets"
                  className="text-xs font-bold text-purple-300 hover:text-purple-200 flex items-center gap-1.5"
                >
                  <span>View Blessed Cords</span>
                  <i className="fa-solid fa-arrow-right text-[10px]" />
                </Link>
              </div>
            </div>

            {/* Step 3 */}
            <div
              onMouseEnter={() => setActiveHowStep('guide')}
              className={`rounded-3xl p-8 transition-all duration-300 border flex flex-col justify-between ${
                activeHowStep === 'guide'
                  ? 'bg-[#211732] border-[#6A329F] shadow-2xl scale-[1.02]'
                  : 'bg-[#1A1226]/80 border-white/10 hover:border-white/20'
              }`}
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-400/15 border border-emerald-400/30 text-emerald-300 flex items-center justify-center text-2xl mb-6">
                  <i className="fa-solid fa-compass animate-pulse" />
                </div>
                <div className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold mb-1">
                  Pillar 03
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-3">
                  Directional Placement & Care
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Your talisman arrives securely nestled in an organic raw silk pouch, accompanied by our printed Classical Compass Guide detailing exact room coordinates (Gua sectors), cleansing lunar cycles, and maintenance advice.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-gray-400">Lifelong Guidance</span>
                <Link
                  href="/shop?category=Trees"
                  className="text-xs font-bold text-emerald-300 hover:text-emerald-200 flex items-center gap-1.5"
                >
                  <span>Placement Guide</span>
                  <i className="fa-solid fa-arrow-right text-[10px]" />
                </Link>
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
                    Zero dynamite blasting or destructive surface strip-mining. We preserve ecological purity.
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
