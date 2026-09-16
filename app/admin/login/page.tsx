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
    }, 400);
  };

  const handleFillDemo = () => {
    setEmail('admin@miraclefengshui.com');
    setPassword('admin');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#130B1C] text-white flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#A84218]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Login Card */}
      <div className="relative z-10 max-w-md w-full bg-[#1E132A] rounded-3xl p-7 sm:p-9 border border-white/10 shadow-2xl flex flex-col gap-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#A84218] to-[#F1641E] flex items-center justify-center text-white shadow-lg mb-3">
            <i className="fa-solid fa-shield-halved text-2xl" />
          </div>
          <h1
            style={{ color: '#ffffff' }}
            className="text-2xl font-bold text-white tracking-tight"
          >
            Miracle Feng Shui
          </h1>
          <p className="text-xs text-amber-300 font-semibold uppercase tracking-wider mt-1">
            Private Admin Portal
          </p>
          <p className="text-xs text-gray-400 mt-1 max-w-xs">
            Enter administrative credentials to manage store catalog, reorder homepage sections, and fulfill orders.
          </p>
        </div>

        {/* Error alert */}
        {error && (
          <div className="bg-rose-500/15 border border-rose-500/40 text-rose-300 px-4 py-3 rounded-xl text-xs flex items-center gap-2.5">
            <i className="fa-solid fa-circle-exclamation shrink-0 text-sm" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Admin Username / Email
            </label>
            <div className="relative">
              <i className="fa-regular fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                required
                placeholder="admin@miraclefengshui.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#2A1D38] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-hidden focus:border-[#A84218] focus:ring-2 focus:ring-[#A84218]/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <i className="fa-solid fa-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#2A1D38] border border-white/10 rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-gray-500 focus:outline-hidden focus:border-[#A84218] focus:ring-2 focus:ring-[#A84218]/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-sm`} />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full bg-gradient-to-r from-[#A84218] to-[#D75200] hover:from-[#8F3510] hover:to-[#B64500] text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-lg hover:shadow-orange-950/40 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <i className="fa-solid fa-circle-notch fa-spin text-sm" />
                <span>Verifying credentials...</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-right-to-bracket text-sm" />
                <span>Sign In to Admin Dashboard</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials Box */}
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-xs text-gray-300 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-amber-300 flex items-center gap-1.5">
              <i className="fa-solid fa-key" />
              <span>Demo Admin Credentials:</span>
            </span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[11px] font-bold text-white bg-[#A84218] hover:bg-[#8F3510] px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
            >
              Auto-Fill
            </button>
          </div>
          <div className="space-y-0.5 text-gray-300 font-mono text-[11.5px]">
            <div>Username: <span className="text-white font-bold">admin@miraclefengshui.com</span> (or <span className="text-white font-bold">admin</span>)</div>
            <div>Password: <span className="text-white font-bold">admin</span></div>
          </div>
        </div>

        {/* Back to storefront link */}
        <div className="text-center pt-1 border-t border-white/10">
          <Link
            href="/"
            className="text-xs text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1.5 no-underline"
          >
            <i className="fa-solid fa-arrow-left text-[10px]" />
            <span>Return to Miracle Feng Shui Storefront</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
