'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@300;400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    try {
      const auth = localStorage.getItem('mfs_admin_auth');
      if (auth === 'true' && !window.location.search.includes('callbackUrl')) {
        window.location.href = '/admin';
      }
    } catch { /* ignore */ }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const rawEmail = email.trim().toLowerCase();
    const cleanEmail = rawEmail === 'admin' ? 'admin@miraclefengshui.com' : rawEmail;
    const cleanPass = password.trim();

    try {
      const res = await signIn('credentials', {
        email: cleanEmail,
        password: cleanPass,
        redirect: false,
      });

      if (res?.error || !res?.ok) {
        localStorage.removeItem('mfs_admin_auth');
        localStorage.removeItem('mfs_admin_user');
        document.cookie = 'mfs_admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
        setError('Invalid credentials. Use admin@miraclefengshui.com · admin');
        setLoading(false);
      } else {
        localStorage.setItem('mfs_admin_auth', 'true');
        localStorage.setItem('mfs_admin_user', cleanEmail);
        document.cookie = 'mfs_admin_auth=true; path=/; max-age=2592000; SameSite=Lax';

        let target = '/admin';
        if (typeof window !== 'undefined') {
          const params = new URLSearchParams(window.location.search);
          const cb = params.get('callbackUrl');
          if (cb && !cb.includes('/admin/login')) target = cb;
        }
        window.location.href = target;
      }
    } catch {
      localStorage.removeItem('mfs_admin_auth');
      localStorage.removeItem('mfs_admin_user');
      document.cookie = 'mfs_admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
      setError('An error occurred during sign in');
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@miraclefengshui.com');
    setPassword('admin');
    setError('');
  };

  return (
    <div
      style={{ fontFamily: "'Montserrat', sans-serif" }}
      className="min-h-screen bg-[#F0F1F5] flex items-center justify-center p-4 sm:p-6 md:p-8"
    >
      {/* Responsive Card Container */}
      <div className="w-full max-w-md md:max-w-4xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-2 my-auto animate-in fade-in zoom-in-95 duration-200">

        {/* ── LEFT: Form Panel ── */}
        <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
          {/* Brand logo */}
          <Link href="/" className="inline-flex items-center gap-2.5 mb-5 no-underline">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 shrink-0">
              <img src="/images/miracle.jpeg" alt="Miracle Feng Shui" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-sm text-gray-900 tracking-tight">
              Miracle Feng Shui
            </span>
          </Link>

          {/* Heading */}
          <h1
            style={{ fontFamily: "'Bebas Neue', 'Montserrat', sans-serif" }}
            className="text-3xl sm:text-4xl text-gray-900 tracking-wide font-normal mb-1 leading-none"
          >
            Admin Sign In
          </h1>
          <p className="text-xs text-gray-500 mb-5 leading-relaxed">
            Access your store dashboard &amp; management tools
          </p>

          {/* Error Alert */}
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 mb-4 animate-in fade-in">
              <i className="fa-solid fa-circle-exclamation shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4 text-left">
            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Email<span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="admin@miraclefengshui.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:border-black transition-all"
                />
                <i className="fa-regular fa-envelope absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Password<span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:border-black transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 p-1 cursor-pointer transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-xs`} />
                </button>
              </div>
            </div>

            {/* Sign In button */}
            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: '#111111', color: '#ffffff' }}
              className="w-full py-3 px-5 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase bg-[#111111] hover:bg-black text-white flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer disabled:opacity-60 mt-1"
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin text-xs" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <i className="fa-solid fa-arrow-right text-xs" />
                </>
              )}
            </button>
          </form>

          {/* Demo credentials box */}
          <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center justify-between gap-3">
            <div>
              <span className="block font-bold text-[11px] text-gray-900">Demo credentials</span>
              <span className="block text-[10.5px] text-gray-500 font-mono">admin@miraclefengshui.com &bull; admin</span>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="bg-white border border-gray-300 hover:border-black text-gray-700 hover:text-black px-2.5 py-1.5 rounded-lg text-[10.5px] font-bold transition-colors cursor-pointer shrink-0 shadow-2xs"
            >
              Auto-fill
            </button>
          </div>

          {/* Back link */}
          <div className="mt-5">
            <Link
              href="/"
              className="text-xs font-semibold text-gray-400 hover:text-black inline-flex items-center gap-1.5 transition-colors no-underline"
            >
              <i className="fa-solid fa-arrow-left text-[10px]" />
              <span>Back to store</span>
            </Link>
          </div>
        </div>

        {/* ── RIGHT: Image Panel (Hidden on small mobile, visible on tablet/desktop) ── */}
        <div className="hidden md:flex relative overflow-hidden min-h-[420px] flex-col justify-end p-8 bg-[#161619] text-white">
          <img
            src="/images/feng_shui_hero_banner.jpg"
            alt="Feng Shui sanctuary"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.6] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          <div className="relative z-10 space-y-2.5">
            <h2
              style={{ fontFamily: "'Bebas Neue', 'Montserrat', sans-serif" }}
              className="text-3xl lg:text-4xl text-white tracking-wide font-normal leading-none"
            >
              Your Admin<br />Sanctuary Awaits
            </h2>
            <p className="text-xs text-white/70 leading-relaxed max-w-xs">
              Manage products, harmonize your catalog, and oversee fulfillment in one clean workspace.
            </p>

            <div className="flex gap-2 flex-wrap pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10.5px] font-semibold text-white/85 backdrop-blur-xs">
                <i className="fa-solid fa-circle-check text-emerald-400 text-[10px]" />
                <span>Products &amp; Orders</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10.5px] font-semibold text-white/85 backdrop-blur-xs">
                <i className="fa-solid fa-layer-group text-amber-300 text-[10px]" />
                <span>Layout Manager</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
