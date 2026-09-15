'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

import {
  products,
  circularCategories,
  summerCollections,
  birthdayHeroCards,
  birthdayProductPicks,
  specialGiftCategories,
  todaysDeals,
  fashionGuideData,
  blogPosts,
} from '@/lib/placeholder-data';
import { CategoryCircle } from '@/components/CategoryCircle';
import { ProductCard } from '@/components/ProductCard';
import { HoverVideoCard } from '@/components/HoverVideoCard';
import { useCart } from '@/context/CartContext';

export default function MiracleFengShuiHomePage() {
  const { addFavorite, removeFavorite, showGuestToast, userLoggedIn } = useCart();
  const popularGifts = products.slice(0, 6);
  const editorPicks = products.slice(6, 12);

  const [activeSlide, setActiveSlide] = useState(0);
  const [favoritePicks, setFavoritePicks] = useState<Record<string, boolean>>({});

  const dealsSliderRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 5, seconds: 28 });

  // Ticking countdown timer for deals
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const slideDeals = (direction: 'left' | 'right') => {
    if (dealsSliderRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      dealsSliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const togglePickFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const willBeFav = !favoritePicks[id];
    setFavoritePicks((prev) => ({
      ...prev,
      [id]: willBeFav,
    }));

    // Check if it's a known product from placeholder data
    const matchedProduct = products.find((p) => p.id === id);
    if (matchedProduct) {
      if (willBeFav) {
        addFavorite(matchedProduct);
      } else {
        removeFavorite(matchedProduct.id);
      }
    } else if (willBeFav && !userLoggedIn) {
      showGuestToast(
        "Don't lose this favourite!",
        'to add to your wishlist.',
        'favorite'
      );
    }
  };

  // Auto rotate banner image every 5 seconds with smooth crossfade
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pb-12 bg-white">
      {/* 1. HERO 2-CARD PROMOTIONAL SECTION */}
      <section className="etsy-container py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left Card: Feng Shui Harmony & Prosperity Banner (Side-by-side solid text & image on mobile as in Screenshot) */}
          <div className="lg:col-span-7 xl:col-span-8 bg-[#2A1D38] text-white rounded-[18px] sm:rounded-[22px] overflow-hidden shadow-xs flex flex-row items-stretch justify-between relative min-h-[220px] sm:min-h-[280px] md:h-[375px]">
            {/* Left Content (Solid Purple) */}
            <div className="p-4 sm:p-7 md:p-10 w-[58%] sm:w-[60%] md:w-[62%] flex flex-col items-start text-left z-20 justify-center h-full">
              <h1
                style={{ color: '#ffffff', marginBottom: '24px' }}
                className="text-[17px] xs:text-[20px] sm:text-[28px] md:text-[36px] lg:text-[40px] font-serif font-normal text-white leading-[1.18] tracking-tight"
              >
                <span className="block">Invite wealth, peace &amp;</span>
                <span className="block">positive energy home</span>
              </h1>
              <Link
                href="/shop?q=feng+shui"
                style={{ backgroundColor: '#ffffff', color: '#222222' }}
                className="bg-white hover:bg-gray-100 text-[#222222] font-bold text-[12px] sm:text-[14px] md:text-[15px] px-4 sm:px-7 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full shadow-sm transition-transform hover:scale-102 active:scale-98 inline-block no-underline shrink-0"
              >
                Shop Feng Shui
              </Link>
            </div>

            {/* Right Artwork / Auto-rotating Images (Shows on both Mobile & Desktop side-by-side) */}
            <div className="w-[42%] sm:w-[40%] md:w-[38%] h-full relative overflow-hidden self-stretch bg-[#1E132A] flex items-center justify-center">
              {/* Slide 0: Generated High Quality Feng Shui Hero Banner */}
              <div
                className={`absolute inset-0 w-full h-full flex items-center justify-center transition-opacity duration-1000 ease-in-out ${
                  activeSlide === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src="/images/feng_shui_hero_banner.jpg"
                  alt="Feng Shui Prosperity Bonsai Tree & Brass Dragon Turtle"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Slide 1: Taoist Master Blessed Five Emperor Coins */}
              <div
                className={`absolute inset-0 w-full h-full flex items-center justify-center p-2 sm:p-5 md:p-6 transition-opacity duration-1000 ease-in-out ${
                  activeSlide === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src="https://i.etsystatic.com/61062687/r/il/8c215d/7104788870/il_794xN.7104788870_shv6.jpg"
                  alt="Taoist Master Blessed Five Emperor Coins"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Slide 2: Citrine Crystal Bonsai Wealth Tree */}
              <div
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                  activeSlide === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80"
                  alt="Citrine Crystal Bonsai Money Tree"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Slide 3: Handcrafted Brass Dragon Turtle Figurine */}
              <div
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                  activeSlide === 3 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src="https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=600&q=80"
                  alt="Brass Dragon Turtle"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Slide Indicators on bottom of image */}
              <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 sm:gap-1.5 bg-black/40 backdrop-blur-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
                {[0, 1, 2, 3].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 ${
                      activeSlide === idx ? 'w-3 sm:w-4 bg-white' : 'w-1 sm:w-1.5 bg-white/60 hover:bg-white/90'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Card: Sacred Space & Local Energy Shops (Desktop Only to match Etsy Mobile single hero) */}
          <Link
            href="/shop?category=Feng%20Shui%20Decor"
            className="hidden lg:flex lg:col-span-5 xl:col-span-4 group relative bg-[#2A1D38] rounded-[10px] sm:rounded-[12px] overflow-hidden shadow-xs flex-col justify-end p-8 sm:p-10 min-h-[320px] md:h-[375px] hover:shadow-md transition-all border border-[#3D2952] no-underline"
          >
            {/* Background Texture & Sacred Geometry */}
            <div className="absolute inset-0 opacity-70">
              <img
                src="/images/feng_shui_sacred_finds.jpg"
                alt="Sacred Golden Feng Shui Abundance"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A0E26]/95 via-[#1A0E26]/40 to-transparent" />

            {/* Bottom Card Copy */}
            <div className="relative z-10 text-white">
              <span className="text-[12px] uppercase tracking-widest text-[#E9D5FF] font-semibold mb-1 block">
                Harmonious Living
              </span>
              <h2
                style={{ color: '#ffffff' }}
                className="text-[26px] sm:text-[30px] font-bold text-white leading-tight"
              >
                Sacred Feng Shui Finds
              </h2>
              <p
                style={{ color: '#ffffff' }}
                className="text-[15px] text-white font-medium mt-1.5 group-hover:opacity-90 flex items-center gap-1.5 no-underline"
              >
                <span>Explore energy decor</span>
                <i className="fa-solid fa-arrow-right text-[13px]" />
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* 2. JUMP INTO FEATURED INTERESTS (FENG SHUI ESSENTIALS) */}
      <section className="etsy-container py-6 sm:py-9 border-b border-etsy-border">
        <h2 style={{ marginBottom: '28px' }} className="text-[20px] sm:text-[24px] font-bold text-etsy-dark tracking-tight">
          Jump into featured interests
        </h2>
        <div className="flex overflow-x-auto sm:grid sm:grid-cols-3 md:grid-cols-6 gap-3.5 sm:gap-3 no-scrollbar pb-2 sm:pb-0 snap-x snap-mandatory">
          {circularCategories.map((cat) => (
            <div key={cat.name} className="min-w-[145px] max-w-[160px] sm:min-w-0 sm:max-w-none w-full shrink-0 snap-start">
              <CategoryCircle category={cat} />
            </div>
          ))}
        </div>
      </section>

      {/* 2.1 AUSPICIOUS COLLECTIONS (2 CARDS PER ROW, 3 ROWS ON MOBILE) */}
      <section className="etsy-container py-6 sm:py-9 border-b border-etsy-border">
        <h2 style={{ marginBottom: '28px' }} className="text-[20px] sm:text-[24px] font-bold text-etsy-dark tracking-tight">
          Discover our most auspicious collections
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 sm:gap-3">
          {summerCollections.map((item) => (
            <CategoryCircle key={item.name} category={item} />
          ))}
        </div>
      </section>

      {/* 2.2 PROSPERITY GIFTS & PRODUCT PICKS */}
      <section className="etsy-container py-10 border-b border-etsy-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Title & CTA */}
          <div className="lg:col-span-3 flex flex-col justify-between pt-2">
            <div>
              <h2 className="text-[21px] sm:text-[24px] font-sans font-semibold text-etsy-dark leading-[1.2] tracking-tight">
                Miracle feng shui-special gifts for prosperity
              </h2>
              <Link
                href="/shop?category=Feng%20Shui%20Decor"
                className="mt-6 inline-block bg-[#EAEAEA] hover:bg-[#DEDEDE] text-etsy-dark font-bold text-[14.5px] px-6 py-2.5 rounded-full transition-colors shadow-2xs no-underline"
              >
                Get inspired
              </Link>
            </div>
          </div>

          {/* Right Column: 3 Hero Category Cards + 6 Product Thumbnail Picks */}
          <div className="lg:col-span-9 flex flex-col gap-4">
            {/* Top Row: 3 Large Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {birthdayHeroCards.map((card) => (
                <Link
                  key={card.title}
                  href={`/shop?category=${encodeURIComponent(card.slug)}`}
                  className="group relative h-[210px] sm:h-[235px] rounded-[14px] sm:rounded-[16px] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-end p-4 bg-[#F0EFEB]"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <span className="relative z-10 text-white font-bold text-[14.5px] sm:text-[15.5px] leading-snug drop-shadow-sm">
                    {card.title}
                  </span>
                </Link>
              ))}
            </div>

            {/* Bottom Row: 6 Product Thumbnail Picks with Price Pills & Wishlist on Hover */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-3">
              {birthdayProductPicks.map((pick) => {
                const isFav = !!favoritePicks[pick.id];
                return (
                  <Link
                    key={pick.id}
                    href={`/product/${pick.id}`}
                    className="group relative aspect-square rounded-[12px] sm:rounded-[14px] overflow-hidden bg-[#F4F4F4] shadow-2xs hover:shadow-md transition-all"
                  >
                    <img
                      src={pick.image}
                      alt={pick.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Wishlist Heart Button on Hover (Solid White Round Background) */}
                    <button
                      type="button"
                      aria-label={isFav ? 'Remove from wishlist' : 'Save to wishlist'}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={(e) => togglePickFavorite(pick.id, e)}
                      style={{ backgroundColor: '#ffffff' }}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-200 z-20 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 cursor-pointer border border-black/10"
                    >
                      <i
                        className={`text-[13px] transition-colors ${
                          isFav
                            ? 'fa-solid fa-heart text-[#A84218]'
                            : 'fa-regular fa-heart text-etsy-dark hover:text-[#A84218]'
                        }`}
                      />
                    </button>

                    {/* Bottom Price Pill */}
                    <div className="absolute bottom-2 left-2 z-10 bg-white/95 backdrop-blur-xs text-etsy-dark text-[11px] sm:text-[12px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1 pointer-events-none">
                      <span>₹ {pick.price.toLocaleString('en-IN')}</span>
                      {pick.originalPrice && (
                        <span className="text-[10px] text-gray-400 line-through font-normal">
                          ₹ {pick.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2.3 GIFTS AS SPECIAL AS THEY ARE (MATCHING ETSY SCREENSHOT) */}
      <section className="etsy-container py-10 border-b border-etsy-border">
        <h2 style={{ marginBottom: '28px' }} className="text-[21px] sm:text-[24px] font-bold text-etsy-dark tracking-tight">
          Gifts as special as they are
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-3.5">
          {specialGiftCategories.map((item) => (
            <Link
              key={item.name}
              href={`/shop?category=${encodeURIComponent(item.slug)}`}
              className="group flex items-center gap-3 p-2.5 pr-4 bg-white border border-[#E1E3DF] rounded-[16px] shadow-2xs hover:shadow-md hover:border-gray-300 transition-all duration-200"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-[12px] object-cover shrink-0 bg-[#F4F4F4]"
              />
              <span className="text-[13.5px] sm:text-[14px] font-semibold text-etsy-dark leading-snug">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 2.4 TODAY'S BIG DEALS (MANUAL SLIDER) */}
      <section className="etsy-container py-10 border-b border-etsy-border">
        <div style={{ marginBottom: '28px' }} className="flex items-center gap-3">
          <h2 className="text-[21px] sm:text-[24px] font-bold text-etsy-dark tracking-tight">
            Today&apos;s big deals
          </h2>
          <div className="flex items-center gap-1.5 text-[14px] text-etsy-gray font-normal">
            <i className="fa-regular fa-clock text-etsy-gray text-[13px]" />
            <span>
              Fresh deals in{' '}
              <span className="font-semibold text-etsy-dark">
                {String(timeLeft.hours).padStart(2, '0')}:
                {String(timeLeft.minutes).padStart(2, '0')}:
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </span>
          </div>
        </div>

        {/* Relative Slider Container with Next/Prev Buttons */}
        <div className="relative group/slider">
          <div
            ref={dealsSliderRef}
            className="flex items-stretch gap-3.5 overflow-x-auto scroll-smooth scrollbar-none pb-2 -mx-1 px-1"
          >
            {todaysDeals.map((deal) => {
              const isFav = !!favoritePicks[deal.id];
              return (
                <Link
                  key={deal.id}
                  href={`/product/${deal.id}`}
                  className="group shrink-0 w-[230px] sm:w-[260px] flex flex-col no-underline text-inherit"
                >
                  <div className="relative aspect-square w-full rounded-[16px] sm:rounded-[18px] overflow-hidden bg-[#F0EFEB] shadow-2xs group-hover:shadow-md transition-all">
                    <img
                      src={deal.image}
                      alt={deal.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />

                    {/* Wishlist Heart Button on Hover (Solid White Round Background) */}
                    <button
                      type="button"
                      aria-label={isFav ? 'Remove from wishlist' : 'Save to wishlist'}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={(e) => togglePickFavorite(deal.id, e)}
                      style={{ backgroundColor: '#ffffff' }}
                      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-200 z-20 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 cursor-pointer border border-black/10"
                    >
                      <i
                        className={`text-[13px] transition-colors ${
                          isFav
                            ? 'fa-solid fa-heart text-[#A84218]'
                            : 'fa-regular fa-heart text-etsy-dark hover:text-[#A84218]'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="pt-2.5 flex flex-col">
                    <p
                      style={{ fontWeight: 400 }}
                      className="text-[13px] sm:text-[13.5px] font-normal text-[#222222] truncate no-underline"
                    >
                      {deal.title}
                    </p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-[14.5px] sm:text-[15px] font-bold text-[#1B7837]">
                        ₹ {deal.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11.5px] sm:text-[12px] text-gray-400 line-through font-normal">
                        ₹ {deal.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Slider Left Arrow Button */}
          <button
            type="button"
            onClick={() => slideDeals('left')}
            aria-label="Previous deals"
            className="absolute left-0 top-[40%] -translate-y-1/2 -translate-x-3 w-10 h-10 rounded-full bg-[#222222] text-white flex items-center justify-center shadow-lg hover:bg-black transition-all opacity-0 group-hover/slider:opacity-100 z-20 cursor-pointer"
          >
            <i className="fa-solid fa-chevron-left text-[14px]" />
          </button>

          {/* Slider Right Arrow Button */}
          <button
            type="button"
            onClick={() => slideDeals('right')}
            aria-label="Next deals"
            className="absolute right-0 top-[40%] -translate-y-1/2 translate-x-3 w-10 h-10 rounded-full bg-[#222222] text-white flex items-center justify-center shadow-lg hover:bg-black transition-all opacity-100 sm:opacity-90 hover:opacity-100 z-20 cursor-pointer"
          >
            <i className="fa-solid fa-chevron-right text-[14px]" />
          </button>
        </div>
      </section>

      {/* 2.5 EDITORS' PICKS - GUIDE TO FASHION (3 ROWS ON MOBILE, 2 ROWS ON DESKTOP) */}
      <section className="etsy-container py-8 sm:py-12 border-b border-etsy-border">
        <div className="flex flex-col gap-3.5 sm:gap-5">
          {/* Mobile Heading (< md) */}
          <div className="md:hidden flex flex-col justify-center mb-1">
            <span className="text-[12px] font-semibold text-etsy-gray block mb-1">
              Editors&apos; Picks
            </span>
            <h2 className="text-[22px] font-sans font-bold text-etsy-dark leading-[1.18] tracking-tight">
              Miracle feng shui&apos;s Guide to Energy &amp; Harmony
            </h2>
            <Link
              href="/shop?category=Feng%20Shui%20Decor"
              className="mt-2.5 font-bold text-[13.5px] text-etsy-dark flex items-center gap-1.5 inline-flex no-underline hover:opacity-80"
            >
              <span>Shop these sacred finds</span>
              <i className="fa-solid fa-arrow-right text-[12px]" />
            </Link>
          </div>

          {/* Desktop Row 1 / Mobile Row 1 (Cards 1 & 2) */}
          <div className="grid grid-cols-2 md:grid-cols-12 gap-3 sm:gap-3.5 md:gap-4 items-stretch">
            {/* Slot 1: Editorial Heading (Desktop Only) */}
            <div className="hidden md:flex md:col-span-3 flex-col justify-center p-1 sm:p-2">
              <span className="text-[12px] font-semibold text-etsy-gray block mb-1">
                Editors&apos; Picks
              </span>
              <h2 className="text-[24px] sm:text-[27px] font-sans font-bold text-etsy-dark leading-[1.18] tracking-tight">
                Miracle feng shui&apos;s Guide to Energy &amp; Harmony
              </h2>
              <Link
                href="/shop?category=Feng%20Shui%20Decor"
                className="mt-4 font-bold text-[14px] text-etsy-dark flex items-center gap-1.5 inline-flex no-underline hover:opacity-80"
              >
                <span>Shop these sacred finds</span>
                <i className="fa-solid fa-arrow-right text-[13px]" />
              </Link>
            </div>

            {/* Card 1: Gold Spiral Earrings */}
            <div className="col-span-1 md:col-span-3 h-[180px] sm:h-[220px] md:h-[260px]">
              <HoverVideoCard
                id="fashion-earrings"
                title={fashionGuideData.spiralEarrings.title}
                image={fashionGuideData.spiralEarrings.image}
                videoUrl={fashionGuideData.spiralEarrings.videoUrl}
                slug={fashionGuideData.spiralEarrings.slug}
                isFavorited={!!favoritePicks['fashion-earrings']}
                onToggleWishlist={togglePickFavorite}
                className="w-full h-full"
              />
            </div>

            {/* Card 2: Molten Chrome Heart */}
            <div className="col-span-1 md:col-span-2 h-[180px] sm:h-[220px] md:h-[260px]">
              <HoverVideoCard
                id="fashion-heart"
                title={fashionGuideData.metallicHeart.title}
                image={fashionGuideData.metallicHeart.image}
                videoUrl={fashionGuideData.metallicHeart.videoUrl}
                slug={fashionGuideData.metallicHeart.slug}
                isFavorited={!!favoritePicks['fashion-heart']}
                onToggleWishlist={togglePickFavorite}
                className="w-full h-full"
              />
            </div>

            {/* Card 3: Jade Pi Yao Talisman (Desktop position in Row 1) */}
            <div className="hidden md:block md:col-span-4 h-[260px]">
              <Link
                href="/shop?category=Feng%20Shui%20Jewelry"
                className="group relative w-full h-full rounded-[16px] sm:rounded-[20px] overflow-hidden bg-[#F0EFEB] shadow-2xs hover:shadow-md transition-all flex flex-col justify-end no-underline block"
              >
                <img
                  src={fashionGuideData.mensOvershirt.image}
                  alt={fashionGuideData.mensOvershirt.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <button
                  type="button"
                  aria-label={favoritePicks['fashion-overshirt'] ? 'Remove from wishlist' : 'Save to wishlist'}
                  onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  onClick={(e) => togglePickFavorite('fashion-overshirt', e)}
                  style={{ backgroundColor: '#ffffff' }}
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-200 z-30 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 cursor-pointer border border-black/10"
                >
                  <i className={`text-[13px] transition-colors ${favoritePicks['fashion-overshirt'] ? 'fa-solid fa-heart text-[#A84218]' : 'fa-regular fa-heart text-etsy-dark hover:text-[#A84218]'}`} />
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile Row 2 (Cards 3 & 4 on Mobile) */}
          <div className="grid grid-cols-2 md:hidden gap-3 sm:gap-3.5">
            {/* Card 3 on Mobile */}
            <div className="h-[180px] sm:h-[220px]">
              <Link
                href="/shop?category=Feng%20Shui%20Jewelry"
                className="group relative w-full h-full rounded-[16px] overflow-hidden bg-[#F0EFEB] shadow-2xs hover:shadow-md transition-all flex flex-col justify-end no-underline block"
              >
                <img
                  src={fashionGuideData.mensOvershirt.image}
                  alt={fashionGuideData.mensOvershirt.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <button
                  type="button"
                  aria-label={favoritePicks['fashion-overshirt'] ? 'Remove from wishlist' : 'Save to wishlist'}
                  onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  onClick={(e) => togglePickFavorite('fashion-overshirt', e)}
                  style={{ backgroundColor: '#ffffff' }}
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-200 z-30 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 cursor-pointer border border-black/10"
                >
                  <i className={`text-[13px] transition-colors ${favoritePicks['fashion-overshirt'] ? 'fa-solid fa-heart text-[#A84218]' : 'fa-regular fa-heart text-etsy-dark hover:text-[#A84218]'}`} />
                </button>
              </Link>
            </div>

            {/* Card 4 on Mobile */}
            <div className="h-[180px] sm:h-[220px]">
              <Link
                href="/shop?category=Zen%20%26%20Meditation"
                className="group relative w-full h-full rounded-[16px] overflow-hidden bg-[#F0EFEB] shadow-2xs hover:shadow-md transition-all flex flex-col justify-end no-underline block"
              >
                <img
                  src={fashionGuideData.sweatshirts.image}
                  alt={fashionGuideData.sweatshirts.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <button
                  type="button"
                  aria-label={favoritePicks['fashion-sweaters'] ? 'Remove from wishlist' : 'Save to wishlist'}
                  onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  onClick={(e) => togglePickFavorite('fashion-sweaters', e)}
                  style={{ backgroundColor: '#ffffff' }}
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-200 z-30 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 cursor-pointer border border-black/10"
                >
                  <i className={`text-[13px] transition-colors ${favoritePicks['fashion-sweaters'] ? 'fa-solid fa-heart text-[#A84218]' : 'fa-regular fa-heart text-etsy-dark hover:text-[#A84218]'}`} />
                </button>
              </Link>
            </div>
          </div>

          {/* Desktop Row 2 / Mobile Row 3 (Cards 5 & 6 + Quote Box) */}
          <div className="grid grid-cols-2 md:grid-cols-12 gap-3 sm:gap-3.5 md:gap-4 items-stretch">
            {/* Card 4 (Desktop Only) */}
            <div className="hidden md:block md:col-span-4 h-[320px]">
              <Link
                href="/shop?category=Zen%20%26%20Meditation"
                className="group relative w-full h-full rounded-[16px] sm:rounded-[20px] overflow-hidden bg-[#F0EFEB] shadow-2xs hover:shadow-md transition-all flex flex-col justify-end no-underline block"
              >
                <img
                  src={fashionGuideData.sweatshirts.image}
                  alt={fashionGuideData.sweatshirts.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <button
                  type="button"
                  aria-label={favoritePicks['fashion-sweaters'] ? 'Remove from wishlist' : 'Save to wishlist'}
                  onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  onClick={(e) => togglePickFavorite('fashion-sweaters', e)}
                  style={{ backgroundColor: '#ffffff' }}
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-200 z-30 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 cursor-pointer border border-black/10"
                >
                  <i className={`text-[13px] transition-colors ${favoritePicks['fashion-sweaters'] ? 'fa-solid fa-heart text-[#A84218]' : 'fa-regular fa-heart text-etsy-dark hover:text-[#A84218]'}`} />
                </button>
              </Link>
            </div>

            {/* Card 5: Citrine Wealth Cluster (Col 1 on mobile Row 3 / 3 cols on Desktop) */}
            <div className="col-span-1 md:col-span-3 h-[180px] sm:h-[220px] md:h-[320px]">
              <Link
                href="/shop?category=Crystals%20%26%20Trees"
                className="group relative w-full h-full rounded-[16px] sm:rounded-[20px] overflow-hidden bg-[#F0EFEB] shadow-2xs hover:shadow-md transition-all flex flex-col justify-end no-underline block"
              >
                <img
                  src={fashionGuideData.linenBlouse.image}
                  alt={fashionGuideData.linenBlouse.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <button
                  type="button"
                  aria-label={favoritePicks['fashion-blouse'] ? 'Remove from wishlist' : 'Save to wishlist'}
                  onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  onClick={(e) => togglePickFavorite('fashion-blouse', e)}
                  style={{ backgroundColor: '#ffffff' }}
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-200 z-30 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 cursor-pointer border border-black/10"
                >
                  <i className={`text-[13px] transition-colors ${favoritePicks['fashion-blouse'] ? 'fa-solid fa-heart text-[#A84218]' : 'fa-regular fa-heart text-etsy-dark hover:text-[#A84218]'}`} />
                </button>
              </Link>
            </div>

            {/* Card 6: Gingham Tote Bag (Col 2 on mobile Row 3 / 2 cols on Desktop) */}
            <div className="col-span-1 md:col-span-2 h-[180px] sm:h-[220px] md:h-[320px]">
              <HoverVideoCard
                id="fashion-tote"
                title={fashionGuideData.toteBag.title}
                image={fashionGuideData.toteBag.image}
                videoUrl={fashionGuideData.toteBag.videoUrl}
                slug={fashionGuideData.toteBag.slug}
                isFavorited={!!favoritePicks['fashion-tote']}
                onToggleWishlist={togglePickFavorite}
                className="w-full h-full"
              />
            </div>

            {/* Slot 4: Editorial Quote Description Box */}
            <div className="col-span-2 md:col-span-3 flex items-center justify-start p-2 sm:p-4">
              <p className="text-[13px] sm:text-[14.5px] text-etsy-dark leading-relaxed font-normal">
                {fashionGuideData.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2.6 FRESH FROM THE BLOG (EXACT REPLICA) */}
      <section className="etsy-container py-8 sm:py-12 border-b border-etsy-border">
        <div style={{ marginBottom: '22px' }} className="flex items-center justify-between">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 no-underline"
          >
            <h2 className="text-[22px] sm:text-[25px] font-bold text-etsy-dark tracking-tight">
              Fresh from the blog
            </h2>
            <i className="hidden sm:inline-block fa-solid fa-arrow-right text-[15px] text-etsy-dark group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 sm:md:gap-7 items-stretch">
          {/* Blog Card 1 */}
          <Link
            href={blogPosts[0].slug}
            className="group bg-white rounded-[18px] sm:rounded-[22px] overflow-hidden hover:shadow-md transition-all border border-transparent md:border md:border-[#E1E3DF] flex flex-row md:flex-col items-center md:items-stretch gap-3.5 sm:gap-4 md:gap-0 p-1 md:p-0 no-underline"
          >
            {/* Mobile: Clean Single Square Image / Desktop: 4-Photo Collage */}
            <div className="w-[120px] h-[120px] sm:w-[135px] sm:h-[135px] md:w-full md:h-60 rounded-[16px] md:rounded-none overflow-hidden shrink-0 bg-[#E1E3DF] relative">
              {/* Mobile Single Photo */}
              <img
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                className="w-full h-full object-cover md:hidden group-hover:scale-103 transition-transform duration-500"
              />
              {/* Desktop 4-Photo Collage */}
              <div className="hidden md:grid w-full h-full grid-cols-2 grid-rows-2 gap-0.5 bg-[#E1E3DF]">
                {blogPosts[0].collage?.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Collage ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                ))}
              </div>
            </div>

            <div className="p-1 md:p-5 sm:md:p-6 flex flex-col flex-grow justify-center md:justify-start">
              <span className="bg-[#F0EFEB] text-[#222222] md:bg-transparent md:text-etsy-gray text-[12px] font-medium px-2.5 py-0.5 md:p-0 rounded-full inline-block w-fit mb-1.5 md:mb-1">
                {blogPosts[0].category}
              </span>
              <h3 className="text-[15.5px] sm:text-[17px] md:text-[19px] font-bold text-etsy-dark mt-0.5 md:mt-1.5 leading-snug line-clamp-3 md:line-clamp-2">
                {blogPosts[0].title}
              </h3>
              <p className="hidden md:block text-[13.5px] text-etsy-gray mt-2 leading-relaxed">
                {blogPosts[0].summary}
              </p>
            </div>
          </Link>

          {/* Blog Card 2 */}
          <Link
            href={blogPosts[1].slug}
            className="group bg-white rounded-[18px] sm:rounded-[22px] overflow-hidden hover:shadow-md transition-all border border-transparent md:border md:border-[#E1E3DF] flex flex-row md:flex-col items-center md:items-stretch gap-3.5 sm:gap-4 md:gap-0 p-1 md:p-0 no-underline"
          >
            <div className="w-[120px] h-[120px] sm:w-[135px] sm:h-[135px] md:w-full md:h-60 rounded-[16px] md:rounded-none overflow-hidden shrink-0 bg-[#F0EFEB] relative">
              <img
                src={blogPosts[1].image}
                alt={blogPosts[1].title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
            </div>
            <div className="p-1 md:p-5 sm:md:p-6 flex flex-col flex-grow justify-center md:justify-start">
              <span className="bg-[#F0EFEB] text-[#222222] md:bg-transparent md:text-etsy-gray text-[12px] font-medium px-2.5 py-0.5 md:p-0 rounded-full inline-block w-fit mb-1.5 md:mb-1">
                {blogPosts[1].category}
              </span>
              <h3 className="text-[15.5px] sm:text-[17px] md:text-[19px] font-bold text-etsy-dark mt-0.5 md:mt-1.5 leading-snug line-clamp-3 md:line-clamp-2">
                {blogPosts[1].title}
              </h3>
              <p className="hidden md:block text-[13.5px] text-etsy-gray mt-2 leading-relaxed">
                {blogPosts[1].summary}
              </p>
            </div>
          </Link>

          {/* Blog Card 3 */}
          <Link
            href={blogPosts[2].slug}
            className="group bg-white rounded-[18px] sm:rounded-[22px] overflow-hidden hover:shadow-md transition-all border border-transparent md:border md:border-[#E1E3DF] md:border-t-4 md:border-t-etsy-orange flex flex-row md:flex-col items-center md:items-stretch gap-3.5 sm:gap-4 md:gap-0 p-1 md:p-0 no-underline"
          >
            {/* Mobile: 2-split photo / Desktop: 3-Photo Collage */}
            <div className="w-[120px] h-[120px] sm:w-[135px] sm:h-[135px] md:w-full md:h-60 rounded-[16px] md:rounded-none overflow-hidden shrink-0 bg-[#E1E3DF] relative">
              {/* Mobile 2-split Photo (matching user screenshot) */}
              <div className="grid grid-cols-2 gap-0.5 w-full h-full md:hidden">
                <img
                  src={blogPosts[2].collage?.[0] || blogPosts[2].image}
                  alt="Craft detail 1"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <img
                  src={blogPosts[2].collage?.[1] || blogPosts[2].image}
                  alt="Craft detail 2"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>

              {/* Desktop 3-Photo Collage */}
              <div className="hidden md:grid w-full h-full grid-cols-2 grid-rows-2 gap-0.5 bg-[#E1E3DF]">
                {blogPosts[2].collage?.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Collage ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                ))}
              </div>
            </div>

            <div className="p-1 md:p-5 sm:md:p-6 flex flex-col flex-grow justify-center md:justify-start">
              <span className="bg-[#F0EFEB] text-[#222222] md:bg-transparent md:text-etsy-gray text-[12px] font-medium px-2.5 py-0.5 md:p-0 rounded-full inline-block w-fit mb-1.5 md:mb-1">
                {blogPosts[2].category}
              </span>
              <h3 className="text-[15.5px] sm:text-[17px] md:text-[19px] font-bold text-etsy-dark mt-0.5 md:mt-1.5 leading-snug line-clamp-3 md:line-clamp-2">
                {blogPosts[2].title}
              </h3>
              <p className="hidden md:block text-[13.5px] text-etsy-gray mt-2 leading-relaxed">
                {blogPosts[2].summary}
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* 5. FRESH FROM SMALL SHOPS / RECENT SELECTION */}
      <section className="etsy-container py-12">
        <div style={{ marginBottom: '28px' }} className="flex items-baseline justify-between">
          <div>
            <h2 className="text-[24px] font-bold text-etsy-dark">
              Handcrafted favorites from small shops
            </h2>
            <p className="text-[14px] text-etsy-gray mt-0.5">
              Unique items crafted and dispatched with love by independent makers.
            </p>
          </div>
          <Link
            href="/shop"
            className="text-[14px] font-bold text-etsy-dark hover:text-etsy-orange transition-colors no-underline"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {editorPicks.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. WHAT IS MIRACLE FENG SHUI INDIA? (EDITORIAL FAQ SECTION) */}
      <section className="etsy-container py-16 border-t border-etsy-border max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-[34px] md:text-[40px] font-serif font-normal text-etsy-dark">
            What is Miracle feng shui India?
          </h2>
          <Link
            href="/shop"
            className="text-[15px] font-medium text-etsy-dark underline hover:text-etsy-orange transition-colors mt-2 inline-block"
          >
            Read our wonderfully weird story
          </Link>
        </div>

        <div className="space-y-8 text-[15px] text-etsy-dark leading-relaxed">
          {/* Section 1 */}
          <div>
            <p className="text-gray-800">
              Miracle feng shui is a global marketplace for creative and one-of-a-kind goods. It&apos;s home to a universe of special, extraordinary items, from unique home decor pieces to trending fashion finds. Founded in 2005, Miracle feng shui began its Indian journey in 2018.
            </p>
            <div className="flex justify-center mt-3 text-gray-400 tracking-widest text-[18px]">
              •••
            </div>
          </div>

          {/* Section 2: Why choose Miracle feng shui */}
          <div>
            <h3 className="text-[20px] font-bold text-etsy-dark mb-3">
              Why choose Miracle feng shui?
            </h3>
            <h4 className="text-[16px] font-bold text-etsy-dark mb-1">
              A community doing good
            </h4>
            <p className="text-gray-800">
              Miracle feng shui is where people come together to make, sell, buy, and collect unique items. We&apos;re also a community pushing for positive change for small businesses, people, and the planet. Here are some of the ways we&apos;re making a positive impact, together:...
            </p>
            <div className="flex justify-center mt-3 text-gray-400 tracking-widest text-[18px]">
              •••
            </div>
          </div>

          {/* Section 3: What can you shop */}
          <div>
            <h3 className="text-[20px] font-bold text-etsy-dark mb-3">
              What can you shop on Miracle feng shui?
            </h3>
            <p className="text-gray-800">
              The imagination of Miracle feng shui sellers can run far and wide, which makes our platform a home to more than 100 million active listings across home, style, and gifts. Some of our popular categories include:...
            </p>
            <div className="flex justify-center mt-3 text-gray-400 tracking-widest text-[18px]">
              •••
            </div>
          </div>

          {/* Section 4: How to buy */}
          <div>
            <h3 className="text-[20px] font-bold text-etsy-dark mb-3">
              How to buy on Miracle feng shui?
            </h3>
            <p className="text-gray-800">
              If you&apos;re looking for something specific, start by putting a keyword into the search box or browse through our curated categories. You can filter by price, delivery speed, and customize handmade gifts directly from the artist.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
