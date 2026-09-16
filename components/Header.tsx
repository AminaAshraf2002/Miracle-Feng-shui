'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  // Completely hide public store header on all admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }
  const { count, userLoggedIn, setUserLoggedIn } = useCart();
  const [query, setQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currency, setCurrency] = useState('INR');
  const [country, setCountry] = useState('India');
  const [language, setLanguage] = useState('English (IN)');

  // Profile Dropdown & Modal States
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [showProfileEditModal, setShowProfileEditModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  // User Profile Data
  const [userName, setUserName] = useState('Amina Ashraf');
  const [userEmail, setUserEmail] = useState('amina.ashraf@example.com');
  const [userPhone, setUserPhone] = useState('+91 98765 43210');
  const [userAddress, setUserAddress] = useState(
    'B-583 Adjacent Park Plaza, Sushant Lok Phase-I, Gurgaon, Haryana 122009'
  );
  const [savedToast, setSavedToast] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  // Tooltip hover states
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  // Form states
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [staySignedIn, setStaySignedIn] = useState(true);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  React.useEffect(() => {
    const handleOpenAuth = (e: Event) => {
      const customEvent = e as CustomEvent<{ mode?: 'signin' | 'register' }>;
      if (customEvent.detail?.mode === 'register') {
        setIsRegisterMode(true);
      } else {
        setIsRegisterMode(false);
      }
      setShowAuthModal(true);
    };

    window.addEventListener('open-auth-modal', handleOpenAuth);
    return () => {
      window.removeEventListener('open-auth-modal', handleOpenAuth);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/shop');
    }
  };

  const secondaryNavItems = [
    { name: 'Feng Shui Decor', href: '/shop?category=Feng%20Shui%20Decor', isGift: true },
    { name: 'Feng Shui Jewelry', href: '/shop?category=Feng%20Shui%20Jewelry' },
    { name: 'Feng Shui Candles', href: '/shop?category=Feng%20Shui%20Candles' },
    { name: 'Crystals & Trees', href: '/shop?category=Crystals%20%26%20Trees' },
    { name: 'Zen & Meditation', href: '/shop?category=Zen%20%26%20Meditation' },
    { name: 'Feng Shui Books', href: '/shop?category=Feng%20Shui%20Books' },
  ];

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setUserLoggedIn(true);
      if (firstName.trim()) {
        setUserName(firstName.trim());
      }
      setUserEmail(email.trim());
      setShowAuthModal(false);
    }
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAddressModal(false);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setShowProfileEditModal(false);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-[#E0D7E8]">
        {/* Top Header Row */}
        <div className="etsy-container py-2 sm:py-2.5 relative">
          {/* Mobile Enlarged Search Bar (Takes over entire mobile header when active) */}
          {mobileSearchOpen ? (
            <div className="md:hidden flex items-center gap-2 py-1 w-full animate-in fade-in zoom-in-95 duration-150">
              <button
                type="button"
                aria-label="Back to navigation"
                onClick={() => {
                  setMobileSearchOpen(false);
                }}
                className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-700 hover:text-black shrink-0 cursor-pointer transition-colors"
              >
                <i className="fa-solid fa-arrow-left text-[16px]" />
              </button>

              <form
                onSubmit={(e) => {
                  handleSearch(e);
                  setMobileSearchOpen(false);
                }}
                className="flex-1 flex items-center relative min-w-0"
              >
                <input
                  ref={mobileSearchInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search crystals, bracelets, cures..."
                  className="w-full h-10 pl-3.5 pr-20 rounded-full border-2 border-[#222222] focus:outline-none focus:border-black text-[14px] text-[#222222] placeholder-gray-400 bg-white transition-all shadow-xs"
                  autoFocus
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="absolute right-10 text-gray-400 hover:text-gray-700 p-1 text-xs"
                    aria-label="Clear search text"
                  >
                    <i className="fa-solid fa-xmark text-sm" />
                  </button>
                )}
                <button
                  type="submit"
                  aria-label="Submit search"
                  className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#222222] hover:bg-black text-white flex items-center justify-center transition-colors shrink-0"
                >
                  <i className="fa-solid fa-magnifying-glass text-[12px]" />
                </button>
              </form>

              <button
                type="button"
                onClick={() => {
                  setMobileSearchOpen(false);
                  setQuery('');
                }}
                className="text-xs font-semibold text-gray-600 hover:text-black px-1.5 py-1 shrink-0 cursor-pointer transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-5">
              {/* Mobile Menu Button */}
              <button
                type="button"
                aria-label="Toggle navigation menu"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 -ml-1 rounded-full hover:bg-etsy-bg-soft text-etsy-dark shrink-0"
              >
                {mobileMenuOpen ? <i className="fa-solid fa-xmark text-[19px]" /> : <i className="fa-solid fa-bars text-[19px]" />}
              </button>

              {/* Logo with round shape miracle.jpeg */}
              <Link
                href="/"
                className="absolute md:static left-[calc(50%-22px)] top-1/2 -translate-x-1/2 -translate-y-1/2 md:left-auto md:top-auto md:translate-x-0 md:translate-y-0 z-10 flex items-center gap-2 sm:gap-3 shrink-0 select-none hover:opacity-90 transition-opacity group"
              >
                <div className="w-[38px] h-[38px] sm:w-[46px] sm:h-[46px] md:w-[54px] md:h-[54px] rounded-full overflow-hidden shadow-xs shrink-0 border border-black/10">
                  <img
                    src="/images/miracle.jpeg"
                    alt="Miracle feng shui"
                    className="w-full h-full object-cover scale-105"
                  />
                </div>
                <span className="font-serif text-[20px] sm:text-[24px] md:text-[28px] font-semibold text-[#222222] tracking-tight leading-none">
                  <span className="sm:hidden">Miracle</span>
                  <span className="hidden sm:inline">Miracle feng shui</span>
                </span>
              </Link>

              {/* Categories Trigger Button (Desktop Only) */}
              <button
                type="button"
                onClick={() => router.push('/shop')}
                className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-full hover:bg-etsy-bg-soft text-[14px] font-semibold text-etsy-dark shrink-0 transition-colors"
              >
                <i className="fa-solid fa-bars text-[14px]" />
                <span>Categories</span>
              </button>

              {/* Search Bar (Desktop & Tablet only) */}
              <form
                onSubmit={handleSearch}
                role="search"
                className="hidden md:block flex-grow min-w-0 max-w-3xl relative"
              >
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search"
                    className="w-full h-11 pl-4 pr-12 rounded-full border-2 border-[#222222] focus:outline-none focus:border-black text-[15px] text-[#222222] placeholder-gray-500 bg-white transition-all shadow-2xs"
                  />
                  <button
                    type="submit"
                    aria-label="Submit search"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#222222] hover:bg-black text-white flex items-center justify-center transition-colors shrink-0"
                  >
                    <i className="fa-solid fa-magnifying-glass text-[13px]" />
                  </button>
                </div>
              </form>

              {/* Right Actions: Mobile Search 🔍 | Indian Flag 🇮🇳 | Profile / Sign In 👤 | Favourites ♥ | Cart 👜 */}
              <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                {/* Mobile Search Icon Trigger */}
                <button
                  type="button"
                  aria-label="Open search"
                  onClick={() => {
                    setMobileSearchOpen(true);
                    setTimeout(() => mobileSearchInputRef.current?.focus(), 60);
                  }}
                  className="md:hidden w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#222222] transition-colors cursor-pointer"
                >
                  <i className="fa-solid fa-magnifying-glass text-[16px]" />
                </button>

                {/* Region Button with Tooltip (Indian Flag) */}
                <div
                  className="relative"
                  onMouseEnter={() => setHoveredIcon('region')}
                  onMouseLeave={() => setHoveredIcon(null)}
                >
                <button
                  type="button"
                  aria-label="Select region and currency"
                  onClick={() => setShowRegionModal(true)}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:bg-[#DCE8F5] flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 rounded-full shadow-xs" viewBox="0 0 36 36" fill="none">
                    <circle cx="18" cy="18" r="18" fill="#F4F4F4" />
                    <path d="M0 6C0 2.686 2.686 0 6 0H30C33.314 0 36 2.686 36 6V12H0V6Z" fill="#FF9933" />
                    <path d="M0 24H36V30C36 33.314 33.314 36 30 36H6C2.686 36 0 33.314 0 30V24Z" fill="#138808" />
                    <path d="M0 12H36V24H0V12Z" fill="#FFFFFF" />
                    <circle cx="18" cy="18" r="4.5" stroke="#000080" strokeWidth="1" fill="none" />
                    <circle cx="18" cy="18" r="1.2" fill="#000080" />
                  </svg>
                </button>

                {hoveredIcon === 'region' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 bg-[#1E2B37] text-white text-[12px] font-semibold px-3 py-1 rounded-md shadow-lg whitespace-nowrap z-50 animate-in fade-in">
                    Region &amp; Currency
                  </div>
                )}
              </div>

              {/* Profile Dropdown / Sign In Trigger */}
              {userLoggedIn ? (
                <div className="relative" ref={profileRef}>
                  <button
                    type="button"
                    onClick={() => setProfileDropdownOpen((prev) => !prev)}
                    className="flex items-center gap-1.5 py-1 px-1.5 sm:py-1.5 sm:px-2.5 rounded-full hover:bg-gray-100 transition-colors border border-gray-200 cursor-pointer"
                    aria-label="User account menu"
                  >
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-[11px] sm:text-[12px] shadow-xs shrink-0">
                      {userName.charAt(0).toUpperCase() || 'A'}
                    </div>
                    <span className="hidden md:inline text-[13px] font-semibold text-[#111111] max-w-[90px] truncate">
                      {userName.split(' ')[0]}
                    </span>
                    <i className="fa-solid fa-chevron-down text-[9px] text-gray-400 hidden sm:inline" />
                  </button>

                  {/* Sleek Dropdown Menu */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150 text-left">
                      {/* User Header */}
                      <div className="px-3 pt-2 pb-3 border-b border-gray-100">
                        <p className="font-bold text-[14.5px] text-[#111111] leading-snug">
                          {userName}
                        </p>
                        <p className="text-[12px] text-gray-400 mt-0.5 truncate">
                          {userEmail}
                        </p>
                      </div>

                      {/* Store Navigation Items */}
                      <div className="py-2 text-[13px] space-y-0.5 text-gray-700">
                        <Link
                          href="/my-orders"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl hover:bg-gray-50 hover:text-black transition-colors"
                        >
                          <i className="fa-regular fa-calendar-check text-[14px] text-gray-400 w-4 text-center shrink-0" />
                          <span className="font-medium text-gray-800">My orders</span>
                        </Link>

                        <button
                          type="button"
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            setShowAddressModal(true);
                          }}
                          className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl hover:bg-gray-50 hover:text-black transition-colors text-left cursor-pointer"
                        >
                          <i className="fa-solid fa-location-dot text-[14px] text-gray-400 w-4 text-center shrink-0" />
                          <span className="font-medium text-gray-800">Delivery addresses</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            setShowProfileEditModal(true);
                          }}
                          className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl hover:bg-gray-50 hover:text-black transition-colors text-left cursor-pointer"
                        >
                          <i className="fa-regular fa-user text-[14px] text-gray-400 w-4 text-center shrink-0" />
                          <span className="font-medium text-gray-800">Edit profile</span>
                        </button>
                      </div>

                      {/* Sign Out */}
                      <div className="pt-2 mt-1 border-t border-gray-100">
                        <button
                          type="button"
                          onClick={() => {
                            setUserLoggedIn(false);
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-3.5 px-3 py-2 rounded-xl hover:bg-red-50 text-red-600 font-medium text-[13px] transition-colors text-left cursor-pointer"
                        >
                          <i className="fa-solid fa-arrow-right-from-bracket text-[13px] text-red-500 w-4 text-center shrink-0" />
                          <span>Sign out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsRegisterMode(false);
                    setShowAuthModal(true);
                  }}
                  aria-label="Sign in"
                  className="w-8 h-8 sm:w-auto sm:h-auto sm:px-4 sm:py-1.5 rounded-full hover:bg-gray-100 text-[13.5px] font-semibold text-[#111111] transition-colors cursor-pointer flex items-center justify-center"
                >
                  <span className="hidden sm:inline">Sign in</span>
                  <i className="fa-solid fa-user text-[16px] text-[#222222] sm:hidden" />
                </button>
              )}

              {/* Wishlist / Favourites Button with Tooltip (Desktop/Tablet) */}
              <div
                className="hidden sm:block relative"
                onMouseEnter={() => setHoveredIcon('favourites')}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <Link
                  href="/favorites"
                  aria-label="Favourites"
                  className="w-10 h-10 rounded-full hover:bg-[#DCE8F5] text-etsy-dark flex items-center justify-center transition-colors"
                >
                  <i className="fa-solid fa-heart text-[18px] text-[#222222]" />
                </Link>

                {hoveredIcon === 'favourites' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 bg-[#1E2B37] text-white text-[12px] font-semibold px-3 py-1 rounded-md shadow-lg whitespace-nowrap z-50 animate-in fade-in">
                    Favourites
                  </div>
                )}
              </div>

              {/* Cart Button with Tooltip */}
              <div
                className="relative"
                onMouseEnter={() => setHoveredIcon('cart')}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <Link
                  href="/cart"
                  aria-label="Cart"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:bg-[#DCE8F5] text-etsy-dark flex items-center justify-center transition-colors relative"
                >
                  <i className="fa-solid fa-bag-shopping text-[17px] sm:text-[18px] text-[#222222]" />
                  {count > 0 && (
                    <span className="absolute -top-1 -right-1 sm:top-0.5 sm:right-0.5 bg-etsy-orange text-white text-[10px] font-bold rounded-full min-w-[16px] h-[16px] px-1 inline-flex items-center justify-center leading-none shadow-xs">
                      {count}
                    </span>
                  )}
                </Link>

                {hoveredIcon === 'cart' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 bg-[#1E2B37] text-white text-[12px] font-semibold px-3 py-1 rounded-md shadow-lg whitespace-nowrap z-50 animate-in fade-in">
                    Cart
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

        {/* Secondary Categories Navigation Bar (Desktop & Tablet) */}
        <nav className="border-t border-[#E1E3DF] bg-white hidden md:block">
          <div className="etsy-container">
            <ul className="flex items-center justify-center gap-7 sm:gap-9 py-2.5 list-none m-0 p-0 overflow-x-auto text-[13.5px] sm:text-[14px] font-medium text-[#222222] whitespace-nowrap scrollbar-none mx-auto w-full">
              {secondaryNavItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1.5 hover:text-etsy-orange hover:underline transition-colors ${item.isGift ? 'text-etsy-orange font-bold' : ''
                      }`}
                  >
                    {item.isGift && <i className="fa-solid fa-gift text-[13px]" />}
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl z-50 flex flex-col p-5 overflow-y-auto animate-in slide-in-from-left duration-200">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-black/10">
                  <img src="/images/miracle.jpeg" alt="Miracle feng shui" className="w-full h-full object-cover" />
                </div>
                <span className="font-serif font-semibold text-[18px] text-[#222222]">Miracle feng shui</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
                aria-label="Close menu"
              >
                <i className="fa-solid fa-xmark text-[18px]" />
              </button>
            </div>

            {/* User Quick Bar */}
            <div className="py-4 border-b border-gray-100">
              {userLoggedIn ? (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-[14px]">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-bold text-[14px] text-gray-900 truncate">{userName}</p>
                    <p className="text-[12px] text-gray-400 truncate">{userEmail}</p>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowAuthModal(true);
                  }}
                  className="w-full py-2.5 px-4 rounded-full bg-[#222222] text-white text-[14px] font-bold shadow-xs hover:bg-black transition-colors"
                >
                  Sign in or Register
                </button>
              )}
            </div>

            {/* Categories Navigation */}
            <div className="py-4 flex-1">
              <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-2">Explore Categories</p>
              <div className="space-y-1">
                {secondaryNavItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 text-[14px] font-medium text-[#222222] transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      {item.isGift && <i className="fa-solid fa-gift text-etsy-orange text-[13px]" />}
                      {item.name}
                    </span>
                    <i className="fa-solid fa-chevron-right text-[11px] text-gray-300" />
                  </Link>
                ))}
              </div>

              {/* Quick links: Favorites & Orders */}
              <div className="pt-4 mt-3 border-t border-gray-100 space-y-1">
                <Link
                  href="/favorites"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 text-[14px] font-medium text-[#222222]"
                >
                  <i className="fa-solid fa-heart text-[15px] text-gray-500 w-5 text-center" />
                  <span>Favourites</span>
                </Link>
                <Link
                  href="/my-orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 text-[14px] font-medium text-[#222222]"
                >
                  <i className="fa-regular fa-calendar-check text-[15px] text-gray-500 w-5 text-center" />
                  <span>My orders</span>
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 text-[14px] font-medium text-[#222222]"
                >
                  <i className="fa-solid fa-bag-shopping text-[15px] text-gray-500 w-5 text-center" />
                  <span>Cart ({count})</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EXACT ETSY AUTH MODAL */}
      {showAuthModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-xs animate-in fade-in"
          onClick={() => setShowAuthModal(false)}
        >
          {/* Modal Card */}
          <div
            className="bg-white rounded-[24px] max-w-[445px] w-full px-7 sm:px-9 py-6 sm:py-7 shadow-2xl relative text-center animate-in zoom-in-95 my-auto border border-gray-100/80 max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              type="button"
              aria-label="Close"
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4.5 right-4.5 p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-black transition-colors"
            >
              <i className="fa-solid fa-xmark text-[16px]" />
            </button>

            {/* Round Brand Logo */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shadow-xs border border-black/10 mx-auto mb-2.5">
              <img
                src="/images/miracle.jpeg"
                alt="Miracle feng shui"
                className="w-full h-full object-cover scale-105"
              />
            </div>

            {/* Headline */}
            <h2 className="text-[26px] sm:text-[29px] font-serif font-normal text-[#222222] leading-tight mb-2">
              {isRegisterMode ? 'Create your account' : 'Sign in to Miracle feng shui'}
            </h2>

            {/* Mode Switcher */}
            <div className="text-[13.5px] text-gray-600 mb-5">
              {isRegisterMode ? (
                <span>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsRegisterMode(false)}
                    className="text-[#222222] font-semibold underline hover:text-etsy-orange transition-colors"
                  >
                    Sign in
                  </button>
                </span>
              ) : (
                <span>
                  New to Miracle feng shui?{' '}
                  <button
                    type="button"
                    onClick={() => setIsRegisterMode(true)}
                    className="text-[#222222] font-semibold underline hover:text-etsy-orange transition-colors"
                  >
                    Create an account
                  </button>
                </span>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-3.5 text-left">
              {/* Email Address */}
              <div>
                <label className="text-[13.5px] font-medium text-[#222222] block mb-1">
                  Email address<span className="text-[#A61A11] ml-0.5">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[44px] px-3.5 rounded-[10px] border border-[#757575] text-[14.5px] text-[#222222] focus:outline-none focus:ring-2 focus:ring-black/15 focus:border-black transition-all"
                />
              </div>

              {/* First Name (Visible in Register Mode) */}
              {isRegisterMode && (
                <div>
                  <label className="text-[13.5px] font-medium text-[#222222] block mb-1">
                    First name<span className="text-[#A61A11] ml-0.5">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full h-[44px] px-3.5 rounded-[10px] border border-[#757575] text-[14.5px] text-[#222222] focus:outline-none focus:ring-2 focus:ring-black/15 focus:border-black transition-all"
                  />
                </div>
              )}

              {/* Password with Show/Hide Eye Icon */}
              {isRegisterMode && (
                <div>
                  <label className="text-[13.5px] font-medium text-[#222222] block mb-1">
                    Password<span className="text-[#A61A11] ml-0.5">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-[44px] px-3.5 pr-11 rounded-[10px] border border-[#757575] text-[14.5px] text-[#222222] focus:outline-none focus:ring-2 focus:ring-black/15 focus:border-black transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#222222] hover:text-etsy-orange focus:outline-none p-1"
                    >
                      {showPassword ? (
                        <i className="fa-regular fa-eye-slash text-[14px]" />
                      ) : (
                        <i className="fa-regular fa-eye text-[14px]" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Stay Signed In (Sign in mode) */}
              {!isRegisterMode && (
                <div className="flex items-center justify-between pt-0.5">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="stay-signed-in-modal"
                      checked={staySignedIn}
                      onChange={(e) => setStaySignedIn(e.target.checked)}
                      className="w-4 h-4 rounded text-black focus:ring-black accent-black cursor-pointer"
                    />
                    <label htmlFor="stay-signed-in-modal" className="text-[13px] text-[#222222] cursor-pointer select-none">
                      Stay signed in
                    </label>
                  </div>
                  <button
                    type="button"
                    className="text-[12.5px] text-[#222222] hover:underline"
                    onClick={() => alert('Password reset link sent to your email.')}
                  >
                    Forgot your password?
                  </button>
                </div>
              )}

              {/* Submit Button (Register in Create Mode / Sign in in Login Mode) */}
              <button
                type="submit"
                style={{ backgroundColor: '#222222', color: '#ffffff' }}
                className="w-full bg-[#222222] hover:bg-black text-white font-bold h-[46px] rounded-full text-[15.5px] transition-all mt-3.5 cursor-pointer text-center flex items-center justify-center shadow-sm hover:shadow-md"
              >
                {isRegisterMode ? 'Register' : 'Sign in'}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E1E3DF]" />
              </div>
              <div className="relative flex justify-center text-[12.5px]">
                <span className="bg-white px-3.5 text-[#595959] font-normal">or</span>
              </div>
            </div>

            {/* 3 Pill / Oval Social Login Buttons */}
            <div className="flex items-center justify-between gap-3">
              {/* Google */}
              <button
                type="button"
                onClick={() => {
                  setEmail('user@gmail.com');
                  setUserLoggedIn(true);
                  setShowAuthModal(false);
                }}
                style={{ border: '1px solid #222222' }}
                className="flex-1 h-[42px] rounded-full border border-[#222222] hover:bg-gray-100 flex items-center justify-center transition-colors bg-white cursor-pointer"
                title="Continue with Google"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              </button>

              {/* Facebook */}
              <button
                type="button"
                onClick={() => {
                  setEmail('user@facebook.com');
                  setUserLoggedIn(true);
                  setShowAuthModal(false);
                }}
                style={{ border: '1px solid #222222' }}
                className="flex-1 h-[42px] rounded-full border border-[#222222] hover:bg-gray-100 flex items-center justify-center transition-colors bg-white cursor-pointer"
                title="Continue with Facebook"
              >
                <svg className="w-5 h-5 text-[#1877F2] fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>

              {/* Apple */}
              <button
                type="button"
                onClick={() => {
                  setEmail('user@icloud.com');
                  setUserLoggedIn(true);
                  setShowAuthModal(false);
                }}
                style={{ border: '1px solid #222222' }}
                className="flex-1 h-[42px] rounded-full border border-[#222222] hover:bg-gray-100 flex items-center justify-center transition-colors bg-white cursor-pointer"
                title="Continue with Apple"
              >
                <svg className="w-5 h-5 fill-current text-black" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.76 1.05-1.82.93-2.88-.91.04-2.01.61-2.66 1.37-.57.65-1.07 1.73-.94 2.76 1.02.08 2.05-.49 2.67-1.25z" />
                </svg>
              </button>
            </div>

            {/* Terms and Privacy Footer */}
            <p className="text-[12px] text-[#595959] text-center mt-4 leading-tight">
              By continuing, you agree to our{' '}
              <a href="#" className="underline text-[#222222] hover:text-etsy-orange">
                Terms of Use
              </a>{' '}
              and{' '}
              <a href="#" className="underline text-[#222222] hover:text-etsy-orange">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      )}

      {/* REGION SETTINGS MODAL */}
      {showRegionModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in"
          onClick={() => setShowRegionModal(false)}
        >
          <div
            className="bg-white rounded-[24px] max-w-md w-full p-6 shadow-2xl relative my-auto border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowRegionModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-etsy-bg-soft text-gray-500 hover:text-black"
            >
              <i className="fa-solid fa-xmark text-[16px]" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <i className="fa-solid fa-globe text-[20px] text-etsy-dark" />
              <h2 className="text-[22px] font-bold text-etsy-dark">
                Update your settings
              </h2>
            </div>

            <div className="space-y-4 text-left">
              <div>
                <label className="text-[13px] font-bold text-etsy-dark block mb-1">
                  Region:
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-etsy-border text-[14px] text-etsy-dark focus:outline-none focus:ring-2 focus:ring-etsy-orange cursor-pointer"
                >
                  <option value="India">India (🇮🇳)</option>
                  <option value="United States">United States (🇺🇸)</option>
                  <option value="United Kingdom">United Kingdom (🇬🇧)</option>
                  <option value="Canada">Canada (🇨🇦)</option>
                  <option value="Australia">Australia (🇦🇺)</option>
                  <option value="Germany">Germany (🇩🇪)</option>
                </select>
              </div>

              <div>
                <label className="text-[13px] font-bold text-etsy-dark block mb-1">
                  Language:
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-etsy-border text-[14px] text-etsy-dark focus:outline-none focus:ring-2 focus:ring-etsy-orange cursor-pointer"
                >
                  <option value="English (IN)">English (IN)</option>
                  <option value="English (US)">English (US)</option>
                  <option value="English (UK)">English (UK)</option>
                  <option value="Deutsch">Deutsch</option>
                  <option value="Français">Français</option>
                </select>
              </div>

              <div>
                <label className="text-[13px] font-bold text-etsy-dark block mb-1">
                  Currency:
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-etsy-border text-[14px] text-etsy-dark focus:outline-none focus:ring-2 focus:ring-etsy-orange cursor-pointer"
                >
                  <option value="INR">₹ INR (Indian Rupee)</option>
                  <option value="USD">$ USD (United States Dollar)</option>
                  <option value="GBP">£ GBP (British Pound)</option>
                  <option value="EUR">€ EUR (Euro)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-[#E1E3DF]">
              <button
                type="button"
                onClick={() => setShowRegionModal(false)}
                style={{ border: '1.5px solid #222222', color: '#222222', backgroundColor: '#FFFFFF' }}
                className="px-5 py-2 rounded-full hover:bg-[#F5F5F1] text-[14px] font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setShowRegionModal(false)}
                style={{ backgroundColor: '#222222', color: '#FFFFFF' }}
                className="px-6 py-2 rounded-full hover:bg-black text-[14px] font-bold transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. DELIVERY ADDRESSES MODAL */}
      {showAddressModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in"
          onClick={() => setShowAddressModal(false)}
        >
          <div
            className="bg-white rounded-[24px] max-w-lg w-full p-6 sm:p-7 shadow-2xl relative my-auto border border-gray-100 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowAddressModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-black cursor-pointer"
            >
              <i className="fa-solid fa-xmark text-[16px]" />
            </button>

            <div className="flex items-center gap-3 mb-5 text-left">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <i className="fa-solid fa-location-dot text-[18px]" />
              </div>
              <div>
                <h2 className="text-[20px] font-bold text-[#222222]">
                  Delivery Addresses
                </h2>
                <p className="text-[12.5px] text-[#595959]">
                  Manage your primary and alternate shipping locations
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveAddress} className="space-y-4 text-left">
              {/* Primary Address Card */}
              <div className="bg-[#FAF9F5] p-4 rounded-2xl border-2 border-[#222222] relative space-y-2">
                <div className="flex items-center justify-between">
                  <span className="bg-[#222222] text-white text-[10.5px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Default Address
                  </span>
                  <span className="text-[12px] font-semibold text-emerald-700 flex items-center gap-1">
                    <i className="fa-solid fa-check text-[11px]" /> Verified
                  </span>
                </div>
                <div>
                  <label className="text-[12px] font-bold text-[#222222] block mb-1">
                    Full Shipping Address:
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E1E3DF] text-[13.5px] text-[#222222] bg-white focus:outline-none focus:ring-2 focus:ring-[#F1641E]"
                  />
                </div>
                <div className="flex gap-3 text-[12px] text-[#595959]">
                  <span>Recipient: <strong>{userName}</strong></span>
                  <span>•</span>
                  <span>Contact: <strong>{userPhone}</strong></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E1E3DF]">
                <button
                  type="button"
                  onClick={() => setShowAddressModal(false)}
                  style={{ border: '1.5px solid #222222', color: '#222222', backgroundColor: '#FFFFFF' }}
                  className="px-5 py-2 rounded-full hover:bg-[#F5F5F1] text-[13.5px] font-bold transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: '#222222', color: '#FFFFFF' }}
                  className="px-6 py-2 rounded-full hover:bg-black text-[13.5px] font-bold transition-all shadow-sm hover:shadow-md cursor-pointer"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. EDIT PROFILE MODAL */}
      {showProfileEditModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in"
          onClick={() => setShowProfileEditModal(false)}
        >
          <div
            className="bg-white rounded-[24px] max-w-md w-full p-6 sm:p-7 shadow-2xl relative my-auto border border-gray-100 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowProfileEditModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-black cursor-pointer"
            >
              <i className="fa-solid fa-xmark text-[16px]" />
            </button>

            <div className="flex items-center gap-3 mb-5 text-left">
              <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                <i className="fa-solid fa-gear text-[18px]" />
              </div>
              <div>
                <h2 className="text-[20px] font-bold text-[#222222]">
                  Edit Profile &amp; Account
                </h2>
                <p className="text-[12.5px] text-[#595959]">
                  Update your contact details and sanctuary preferences
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-left">
              <div>
                <label className="text-[12.5px] font-bold text-[#222222] block mb-1">
                  Full Name:
                </label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E3DF] text-[13.5px] text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#F1641E]"
                />
              </div>

              <div>
                <label className="text-[12.5px] font-bold text-[#222222] block mb-1">
                  Email Address:
                </label>
                <input
                  type="email"
                  required
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E3DF] text-[13.5px] text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#F1641E]"
                />
              </div>

              <div>
                <label className="text-[12.5px] font-bold text-[#222222] block mb-1">
                  Phone Number:
                </label>
                <input
                  type="tel"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E3DF] text-[13.5px] text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#F1641E]"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E1E3DF]">
                <button
                  type="button"
                  onClick={() => setShowProfileEditModal(false)}
                  style={{ border: '1.5px solid #222222', color: '#222222', backgroundColor: '#FFFFFF' }}
                  className="px-5 py-2 rounded-full hover:bg-[#F5F5F1] text-[13.5px] font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: '#222222', color: '#FFFFFF' }}
                  className="px-6 py-2 rounded-full hover:bg-black text-[13.5px] font-bold transition-all shadow-sm hover:shadow-md cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. DOWNLOAD INVOICES MODAL */}
      {showInvoiceModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in"
          onClick={() => setShowInvoiceModal(false)}
        >
          <div
            className="bg-white rounded-[24px] max-w-lg w-full p-6 sm:p-7 shadow-2xl relative my-auto border border-gray-100 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowInvoiceModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-black cursor-pointer"
            >
              <i className="fa-solid fa-xmark text-[16px]" />
            </button>

            <div className="flex items-center gap-3 mb-5 text-left">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                <i className="fa-solid fa-file-invoice text-[18px]" />
              </div>
              <div>
                <h2 className="text-[20px] font-bold text-[#222222]">
                  Tax Invoices &amp; Receipts
                </h2>
                <p className="text-[12.5px] text-[#595959]">
                  Download GST invoices and authentic consecration certificates
                </p>
              </div>
            </div>

            <div className="space-y-3 text-left">
              {/* Sample Invoice Item 1 */}
              <div className="bg-[#FAF9F5] p-3.5 rounded-2xl border border-[#E1E3DF] flex items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-[13.5px] text-[#222222]">
                    Order #FS-235358
                  </p>
                  <p className="text-[12px] text-[#595959]">
                    15 Sept 2026 • ₹4,349 (Paid in full)
                  </p>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">
                    ✓ GST Invoice Ready
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 rounded-full border border-[#222222] hover:bg-white text-[12.5px] font-bold text-[#222222] flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-2xs"
                >
                  <i className="fa-solid fa-print text-[12px]" />
                  <span>Download / Print</span>
                </button>
              </div>

              {/* Sample Invoice Item 2 */}
              <div className="bg-[#FAF9F5] p-3.5 rounded-2xl border border-[#E1E3DF] flex items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-[13.5px] text-[#222222]">
                    Order #FS-190482
                  </p>
                  <p className="text-[12px] text-[#595959]">
                    02 Aug 2026 • ₹2,430 (Delivered)
                  </p>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">
                    ✓ Consecration Certificate Ready
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 rounded-full border border-[#222222] hover:bg-white text-[12.5px] font-bold text-[#222222] flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-2xs"
                >
                  <i className="fa-solid fa-print text-[12px]" />
                  <span>Download / Print</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 mt-5 border-t border-[#E1E3DF] text-[12px] text-[#595959]">
              <span className="flex items-center gap-1.5">
                <i className="fa-solid fa-shield-halved text-emerald-600 text-[14px]" /> Digitally signed &amp; verified
              </span>
              <button
                type="button"
                onClick={() => setShowInvoiceModal(false)}
                className="font-bold text-[#222222] hover:underline cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Toast for Saved Profile / Address */}
      {savedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#222222] text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-[13px] font-bold animate-in slide-in-from-bottom-3 duration-200">
          <i className="fa-solid fa-check text-emerald-400 text-[13px]" />
          <span>Settings saved successfully!</span>
        </div>
      )}
    </>
  );
}
