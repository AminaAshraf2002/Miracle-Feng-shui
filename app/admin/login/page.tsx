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
    }, 300);
  };

  const handleFillDemo = () => {
    setEmail('admin@miraclefengshui.com');
    setPassword('admin');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-[#222222] flex items-center justify-center p-3 sm:p-6 font-sans">
      {/* 2-Column Split Card with decreased compact height */}
      <div className="max-w-4xl w-full bg-white rounded-3xl sm:rounded-[32px] shadow-[0_15px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-12 items-stretch">
        
        {/* Left Column: Clean White Sign-in Form (Compact & High Contrast) */}
        <div className="md:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
          <div>
            {/* Top Brand with Circular Logo */}
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2.5 no-underline group">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-black/10 shadow-xs shrink-0 bg-white">
                  <img
                    src="/images/miracle.jpeg"
                    alt="Miracle Feng Shui"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="font-serif font-semibold text-base sm:text-lg text-[#222222] tracking-tight block leading-tight">
                    Miracle feng shui
                  </span>
                  <span className="text-[9.5px] text-gray-400 font-medium uppercase tracking-wider block">
                    Admin Portal
                  </span>
                </div>
              </Link>

              <Link
                href="/"
                className="text-xs text-gray-400 hover:text-gray-700 transition-colors no-underline hidden sm:inline"
              >
                Storefront &rarr;
              </Link>
            </div>

            {/* Title */}
            <div className="mt-6 sm:mt-7">
              <h1
                style={{ color: '#1E1E1E' }}
                className="text-2xl sm:text-[28px] font-normal text-[#1E1E1E] tracking-tight leading-tight"
              >
                Sign in
              </h1>
              <p className="text-xs text-gray-400 mt-1 font-normal">
                Access your store catalog, orders &amp; homepage layout manager.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-3 bg-rose-50 border border-rose-200 text-rose-700 px-3 py-2 rounded-xl text-xs flex items-center gap-2">
                <i className="fa-solid fa-circle-exclamation shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Form Fields */}
            <form onSubmit={handleLogin} className="mt-5 flex flex-col gap-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 mb-1">
                  Admin Email / Username
                </label>
                <input
                  type="text"
                  required
                  placeholder="admin@miraclefengshui.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F5F5F7] border border-transparent hover:border-gray-200 focus:bg-white focus:border-[#222222] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#222222] placeholder-gray-400 transition-all outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-500 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#F5F5F7] border border-transparent hover:border-gray-200 focus:bg-white focus:border-[#222222] rounded-xl px-3.5 py-2.5 pr-10 text-xs sm:text-sm text-[#222222] placeholder-gray-400 transition-all outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-xs`} />
                  </button>
                </div>
              </div>

              {/* Submit Button with explicit inline style to prevent css overrides */}
              <div className="pt-1.5">
                <button
                  type="submit"
                  disabled={loading}
                  style={{ backgroundColor: '#222222', color: '#ffffff' }}
                  className="bg-[#222222] hover:bg-black text-white px-7 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer disabled:opacity-50 inline-flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <i className="fa-solid fa-circle-notch fa-spin text-xs" />
                      <span style={{ color: '#ffffff' }}>Authenticating...</span>
                    </>
                  ) : (
                    <span style={{ color: '#ffffff' }}>Sign In</span>
                  )}
                </button>
              </div>
            </form>

            {/* Quick Demo Credentials Box */}
            <div className="mt-4 p-3 bg-[#FAF9F6] rounded-xl border border-gray-200/70 text-xs flex items-center justify-between gap-3">
              <div className="text-gray-600">
                <span className="font-semibold text-gray-900 block text-[11px]">Demo Credentials</span>
                <span className="text-gray-500 text-[10.5px]">admin@miraclefengshui.com • admin</span>
              </div>
              <button
                type="button"
                onClick={handleFillDemo}
                style={{ backgroundColor: '#ffffff', color: '#222222' }}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors shadow-2xs cursor-pointer shrink-0"
              >
                Auto-fill
              </button>
            </div>
          </div>

          {/* Bottom Return Link */}
          <div className="pt-4 border-t border-gray-100 text-left mt-4">
            <Link
              href="/"
              className="text-xs text-gray-400 hover:text-gray-700 transition-colors no-underline inline-flex items-center gap-1.5"
            >
              <i className="fa-solid fa-arrow-left text-[10px]" />
              <span>Back to Miracle Feng Shui Store</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Beautiful Feng Shui Store Sanctuary Banner (Matches Website!) */}
        <div className="hidden md:flex md:col-span-5 relative bg-[#1E132A] overflow-hidden flex-col justify-between p-7 lg:p-9 text-white border-l border-gray-100">
          {/* Authentic Feng Shui Image background from website */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/feng_shui_hero_banner.jpg"
              alt="Feng Shui sacred bonsai and abundance cures"
              className="w-full h-full object-cover scale-105"
            />
            {/* Deep rich scrim to ensure 100% crystal clear contrast for text */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#170E22]/95 via-[#1E132A]/75 to-[#170E22]/60" />
          </div>

          {/* Top Spaced Typography */}
          <div className="relative z-10">
            <span
              style={{ color: '#FCD34D' }}
              className="text-[10px] font-semibold tracking-[0.25em] text-amber-300 uppercase block"
            >
              M I R A C L E · F E N G · S H U I
            </span>
          </div>

          {/* Center Title & Description */}
          <div className="relative z-10 my-auto py-6">
            <h2
              style={{ color: '#ffffff', lineHeight: 1.25 }}
              className="text-xl lg:text-2xl font-serif font-normal text-white tracking-tight"
            >
              Access your store&apos;s <br />
              <span style={{ color: '#FDE68A' }} className="italic font-serif text-amber-200">
                administrative sanctuary
              </span>
            </h2>
            <p
              style={{ color: '#E5E7EB' }}
              className="text-xs text-gray-200 mt-2.5 max-w-xs leading-relaxed font-light"
            >
              Harmonize products, curate auspicious collections, and oversee fulfillment in one serene workspace.
            </p>
          </div>

          {/* Bottom Quote */}
          <div className="relative z-10 pt-2 border-t border-white/10">
            <p
              style={{ color: '#D1D5DB' }}
              className="text-[10.5px] text-gray-300 font-serif italic"
            >
              &ldquo;Where balanced Chi meets conscious commerce.&rdquo;
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
