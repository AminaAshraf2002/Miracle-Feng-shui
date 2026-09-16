'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to /admin
  useEffect(() => {
    try {
      const auth = localStorage.getItem('mfs_admin_auth');
      if (auth === 'true') {
        router.replace('/admin');
      }
    } catch {
      // ignore
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPass = password.trim();

      if (
        (cleanEmail === 'admin@miraclefengshui.com' || cleanEmail === 'admin') &&
        (cleanPass === 'admin' || cleanPass === 'admin123' || cleanPass === 'password')
      ) {
        localStorage.setItem('mfs_admin_auth', 'true');
        localStorage.setItem('mfs_admin_user', cleanEmail);
        router.replace('/admin');
      } else {
        setError('Invalid admin credentials. Please use the demo credentials below.');
        setLoading(false);
      }
    }, 350);
  };

  const handleFillDemo = () => {
    setEmail('admin@miraclefengshui.com');
    setPassword('admin');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#0E0817] text-[#222222] flex items-center justify-center p-3 sm:p-6 font-sans relative overflow-hidden selection:bg-amber-500 selection:text-black">
      {/* Dynamic Ambient Aura Lighting Background */}
      <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent blur-[120px] pointer-events-none animate-aura-pulse" />
      <div className="absolute -bottom-36 -right-36 w-[520px] h-[520px] rounded-full bg-gradient-to-tl from-purple-600/25 via-indigo-700/15 to-transparent blur-[130px] pointer-events-none animate-aura-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-amber-400/5 blur-[160px] pointer-events-none" />

      {/* Subtle Feng Shui Golden Particle Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.07] pointer-events-none" />

      {/* 2-Column Split Card with Decreased Height & Premium Frosted Glass Effect */}
      <div className="max-w-4xl w-full bg-gradient-to-b from-[#FAF8F5]/98 via-white/96 to-[#F6F3EE]/98 rounded-3xl sm:rounded-[32px] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.65),0_0_50px_rgba(245,158,11,0.08)] border border-amber-500/20 backdrop-blur-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 items-stretch relative z-10 animate-in fade-in zoom-in-95 duration-500">
        
        {/* Top Accent Shimmer Line */}
        <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-amber-500/0 via-amber-400 to-amber-500/0 z-20" />

        {/* Left Column: Premium Ivory & Gold Sign-in Form (Compact & High Contrast) */}
        <div className="md:col-span-7 p-6 sm:p-8 lg:p-9 flex flex-col justify-between relative bg-gradient-to-b from-white/90 via-[#FAF9F6]/95 to-[#F5F2EB]/95">
          <div>
            {/* Top Brand with Circular Logo & Glowing Ring */}
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 no-underline group">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-400/40 shadow-[0_0_15px_rgba(245,158,11,0.25)] shrink-0 bg-white group-hover:scale-105 transition-transform duration-300">
                  <img
                    src="/images/miracle.jpeg"
                    alt="Miracle Feng Shui"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="font-serif font-semibold text-base sm:text-lg text-[#1A1124] tracking-tight block leading-tight group-hover:text-amber-800 transition-colors">
                    Miracle feng shui
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9.5px] text-amber-700/80 font-bold uppercase tracking-wider block">
                      Admin Portal
                    </span>
                  </div>
                </div>
              </Link>

              <Link
                href="/"
                className="text-xs text-gray-500 hover:text-amber-700 font-medium transition-colors no-underline hidden sm:inline-flex items-center gap-1"
              >
                <span>Storefront</span>
                <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" />
              </Link>
            </div>

            {/* Title */}
            <div className="mt-5 sm:mt-6">
              <h1
                style={{ color: '#1A1124' }}
                className="text-2xl sm:text-[27px] font-serif font-normal text-[#1A1124] tracking-tight leading-tight"
              >
                Sign in to Portal
              </h1>
              <p className="text-xs text-gray-500 mt-1 font-normal">
                Access catalog inventory, order fulfillment &amp; layout manager.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-3 bg-rose-50 border border-rose-200 text-rose-700 px-3.5 py-2 rounded-xl text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                <i className="fa-solid fa-circle-exclamation shrink-0 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            {/* Form Fields */}
            <form onSubmit={handleLogin} className="mt-4 flex flex-col gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                  Admin Email / Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="admin@miraclefengshui.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F3F0E9]/70 hover:bg-[#EFECE4] focus:bg-white border border-gray-200/80 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#1A1124] placeholder-gray-400 transition-all outline-hidden shadow-2xs"
                  />
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <i className="fa-regular fa-envelope text-xs" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#F3F0E9]/70 hover:bg-[#EFECE4] focus:bg-white border border-gray-200/80 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-3.5 py-2.5 pr-10 text-xs sm:text-sm text-[#1A1124] placeholder-gray-400 transition-all outline-hidden shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-700 p-1 cursor-pointer transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-xs`} />
                  </button>
                </div>
              </div>

              {/* Submit Button with High Contrast & Smooth Hover */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  style={{ backgroundColor: '#1A1124', color: '#ffffff' }}
                  className="w-full sm:w-auto bg-[#1A1124] hover:bg-[#2B1B3C] text-white px-8 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-[0_4px_16px_rgba(26,17,36,0.25)] hover:shadow-[0_6px_22px_rgba(217,119,6,0.35)] hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-60 inline-flex items-center justify-center gap-2 border border-amber-400/30"
                >
                  {loading ? (
                    <>
                      <i className="fa-solid fa-circle-notch fa-spin text-xs text-amber-300" />
                      <span style={{ color: '#ffffff' }}>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span style={{ color: '#ffffff' }}>Sign In</span>
                      <i className="fa-solid fa-arrow-right text-[11px] text-amber-300" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Quick Demo Credentials Box */}
            <div className="mt-4 p-3 bg-gradient-to-r from-amber-500/10 via-amber-50/50 to-orange-50/40 rounded-2xl border border-amber-300/40 text-xs flex items-center justify-between gap-3 shadow-2xs">
              <div className="text-gray-700">
                <span className="font-bold text-[#1A1124] block text-[11px] flex items-center gap-1.5">
                  <i className="fa-solid fa-key text-amber-600 text-[10px]" />
                  <span>Demo Access</span>
                </span>
                <span className="text-gray-600 text-[10.5px]">admin@miraclefengshui.com • admin</span>
              </div>
              <button
                type="button"
                onClick={handleFillDemo}
                style={{ backgroundColor: '#ffffff', color: '#1A1124' }}
                className="text-[11px] font-bold px-3 py-1 rounded-full border border-amber-400/60 hover:bg-amber-50 hover:border-amber-500 transition-all shadow-xs cursor-pointer shrink-0 text-amber-900"
              >
                ✨ Auto-fill
              </button>
            </div>
          </div>

          {/* Bottom Return Link */}
          <div className="pt-3.5 border-t border-gray-200/70 text-left mt-3">
            <Link
              href="/"
              className="text-xs text-gray-500 hover:text-amber-800 transition-colors no-underline inline-flex items-center gap-1.5 group font-medium"
            >
              <i className="fa-solid fa-arrow-left text-[10px] group-hover:-translate-x-1 transition-transform" />
              <span>Back to Miracle Feng Shui Store</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Beautiful Feng Shui Store Sanctuary Banner (Matches Website!) */}
        <div className="hidden md:flex md:col-span-5 relative bg-[#1E132A] overflow-hidden flex-col justify-between p-7 lg:p-9 text-white border-l border-amber-500/20">
          {/* Authentic Feng Shui Image background from website */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/feng_shui_hero_banner.jpg"
              alt="Feng Shui sacred bonsai and abundance cures"
              className="w-full h-full object-cover scale-105"
            />
            {/* Deep rich scrim to ensure 100% crystal clear contrast for text */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#140C1D]/95 via-[#1E132A]/75 to-[#140C1D]/65" />
          </div>

          {/* Top Spaced Typography with Gold Aura */}
          <div className="relative z-10">
            <span
              style={{ color: '#FCD34D' }}
              className="text-[10px] font-bold tracking-[0.25em] text-amber-300 uppercase block drop-shadow-sm"
            >
              M I R A C L E · F E N G · S H U I
            </span>
          </div>

          {/* Center Title & Description */}
          <div className="relative z-10 my-auto py-5">
            <h2
              style={{ color: '#ffffff', lineHeight: 1.25 }}
              className="text-xl lg:text-2xl font-serif font-normal text-white tracking-tight drop-shadow-md"
            >
              Access your store&apos;s <br />
              <span style={{ color: '#FDE68A' }} className="italic font-serif text-amber-200 font-medium">
                administrative sanctuary
              </span>
            </h2>
            <p
              style={{ color: '#E5E7EB' }}
              className="text-xs text-gray-200 mt-2 max-w-xs leading-relaxed font-light"
            >
              Harmonize products, curate auspicious collections, and oversee fulfillment in one serene workspace.
            </p>
          </div>

          {/* Bottom Quote */}
          <div className="relative z-10 pt-2.5 border-t border-amber-400/20">
            <p
              style={{ color: '#F3E8EE' }}
              className="text-[10.5px] text-amber-100 font-serif italic"
            >
              &ldquo;Where balanced Chi meets conscious commerce.&rdquo;
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
