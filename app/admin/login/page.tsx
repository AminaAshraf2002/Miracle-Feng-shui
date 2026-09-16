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

      // Valid credentials: admin@miraclefengshui.com / admin (or admin / admin123)
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
    <div className="min-h-screen bg-[#F4F4F6] text-[#222222] flex items-center justify-center p-4 sm:p-6 md:p-10 font-sans">
      {/* 2-Column Split Card matching user's design reference */}
      <div className="max-w-5xl w-full bg-white rounded-[28px] sm:rounded-[36px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[620px] items-stretch">
        
        {/* Left Column: Clean White Sign-in Form */}
        <div className="md:col-span-6 lg:col-span-7 p-7 sm:p-10 md:p-14 flex flex-col justify-between bg-white">
          {/* Top Brand with Circular Logo */}
          <div>
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 no-underline group">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-black/10 shadow-xs shrink-0 bg-white">
                  <img
                    src="/images/miracle.jpeg"
                    alt="Miracle Feng Shui"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="font-serif font-semibold text-lg text-[#222222] tracking-tight block leading-tight">
                    Miracle feng shui
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider block">
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
            <div className="mt-8 sm:mt-10">
              <h1
                style={{ color: '#1E1E1E' }}
                className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-[#1E1E1E] tracking-tight leading-tight"
              >
                Sign in
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 mt-1.5 font-normal">
                Access your store&apos;s product catalog, orders &amp; layout manager.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 bg-rose-50 border border-rose-200 text-rose-700 px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-2">
                <i className="fa-solid fa-circle-exclamation shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Form Fields */}
            <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">
                  Admin Email / Username
                </label>
                <input
                  type="text"
                  required
                  placeholder="admin@miraclefengshui.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F5F5F7] border border-transparent hover:border-gray-200 focus:bg-white focus:border-[#222222] rounded-xl px-4 py-3 text-sm text-[#222222] placeholder-gray-400 transition-all outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#F5F5F7] border border-transparent hover:border-gray-200 focus:bg-white focus:border-[#222222] rounded-xl px-4 py-3 pr-11 text-sm text-[#222222] placeholder-gray-400 transition-all outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-sm`} />
                  </button>
                </div>
              </div>

              {/* Submit CTA Pill Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#222222] hover:bg-black text-white px-8 py-3 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <i className="fa-solid fa-circle-notch fa-spin text-sm" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <span>Sign In</span>
                  )}
                </button>
              </div>
            </form>

            {/* Quick Demo Credentials Box */}
            <div className="mt-6 p-3.5 bg-[#FAF9F6] rounded-2xl border border-gray-200/60 text-xs flex items-center justify-between gap-3">
              <div className="text-gray-600">
                <span className="font-semibold text-gray-900 block">Demo Credentials</span>
                <span className="text-gray-500 text-[11px]">admin@miraclefengshui.com • admin</span>
              </div>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-800 hover:bg-gray-100 transition-colors shadow-2xs cursor-pointer shrink-0"
              >
                Auto-fill
              </button>
            </div>
          </div>

          {/* Bottom helper */}
          <div className="pt-6 border-t border-gray-100 text-center sm:text-left mt-6">
            <Link
              href="/"
              className="text-xs text-gray-400 hover:text-gray-700 transition-colors no-underline inline-flex items-center gap-1.5"
            >
              <i className="fa-solid fa-arrow-left text-[11px]" />
              <span>Back to Miracle Feng Shui Store</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Serene Botanical Visual Banner */}
        <div className="hidden md:flex md:col-span-6 lg:col-span-5 relative bg-[#FAF9F6] flex-col justify-between p-10 lg:p-12 overflow-hidden border-l border-gray-100">
          {/* Top subtle typography */}
          <div className="relative z-10">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#5A7A57] uppercase block">
              M I R A C L E . F E N G . S H U I
            </span>
          </div>

          {/* Center/Top Catchy Headline */}
          <div className="relative z-10 my-auto pt-6">
            <h2
              style={{ color: '#222222', lineHeight: 1.25 }}
              className="text-2xl lg:text-[28px] font-sans font-normal text-[#222222] tracking-tight"
            >
              Access your store&apos;s <br />
              <span className="text-[#5A7A57] italic font-serif font-normal">
                administrative sanctuary
              </span>
            </h2>
            <p className="text-xs text-gray-500 mt-2.5 max-w-xs leading-relaxed">
              Harmonize products, curate auspicious collections, and oversee fulfillment in one serene workspace.
            </p>
          </div>

          {/* Botanical Eucalyptus Leaf Artwork reaching into the frame */}
          <div className="absolute right-0 bottom-0 top-12 w-[85%] pointer-events-none opacity-90 flex items-end justify-end">
            <img
              src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1000&q=80"
              alt="Eucalyptus botanical leaves"
              className="w-full h-full object-contain object-bottom-right drop-shadow-sm"
            />
          </div>

          {/* Bottom subtle quote */}
          <div className="relative z-10 pt-4">
            <p className="text-[11px] text-gray-400 font-serif italic">
              &ldquo;Where balanced energy meets conscious commerce.&rdquo;
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
