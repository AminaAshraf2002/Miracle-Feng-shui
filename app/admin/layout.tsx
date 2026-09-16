'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [adminUser, setAdminUser] = useState('admin@miraclefengshui.com');

  const isLoginPage = pathname === '/admin/login';

  // Check Admin Authentication
  useEffect(() => {
    if (isLoginPage) {
      setIsAuthenticated(true);
      return;
    }

    try {
      const auth = localStorage.getItem('mfs_admin_auth');
      const user = localStorage.getItem('mfs_admin_user');
      if (auth === 'true') {
        setIsAuthenticated(true);
        if (user) setAdminUser(user);
      } else {
        setIsAuthenticated(false);
        router.replace('/admin/login');
      }
    } catch {
      setIsAuthenticated(false);
      router.replace('/admin/login');
    }
  }, [pathname, isLoginPage, router]);

  const handleSignOut = () => {
    try {
      localStorage.removeItem('mfs_admin_auth');
      localStorage.removeItem('mfs_admin_user');
    } catch {
      // ignore
    }
    router.replace('/admin/login');
  };

  // If on login page, render login directly without admin frame
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Loading state while checking authentication
  if (isAuthenticated === null || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0E0817] flex flex-col items-center justify-center text-white">
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-400/50 mb-4 animate-pulse shadow-[0_0_20px_rgba(245,158,11,0.3)]">
          <img
            src="/images/miracle.jpeg"
            alt="Miracle Feng Shui"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-sm font-medium text-amber-200/90 tracking-wide">
          Verifying administrative sanctuary access...
        </p>
      </div>
    );
  }

  const navItems = [
    {
      name: 'Overview',
      href: '/admin',
      icon: 'fa-chart-pie',
      exact: true,
      badge: 'Live',
    },
    {
      name: 'Homepage Builder',
      href: '/admin/homepage',
      icon: 'fa-layer-group',
      badge: 'Positions',
    },
    {
      name: 'Products Catalog',
      href: '/admin/products',
      icon: 'fa-box-open',
      badge: 'CRUD',
    },
    {
      name: 'Customer Orders',
      href: '/admin/orders',
      icon: 'fa-clipboard-list',
    },
  ];

  const isActive = (item: (typeof navItems)[0]) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#1E1E1E] flex flex-col font-sans">
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#160D23] text-white border-b border-[#2D1B44] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand with Circular Logo & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
              aria-label="Toggle navigation menu"
            >
              <i className="fa-solid fa-bars text-lg" />
            </button>

            <Link href="/admin" className="flex items-center gap-3 no-underline text-white group">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-400/50 shadow-[0_0_12px_rgba(245,158,11,0.25)] shrink-0 bg-white group-hover:scale-105 transition-transform">
                <img
                  src="/images/miracle.jpeg"
                  alt="Miracle Feng Shui"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span
                  style={{ color: '#ffffff' }}
                  className="font-serif font-bold text-base sm:text-lg tracking-tight block leading-tight text-white group-hover:text-amber-200 transition-colors"
                >
                  Miracle Feng Shui
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-amber-300 font-semibold tracking-wider uppercase">
                    Admin Portal
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-full transition-all border border-white/15 no-underline shadow-2xs"
            >
              <i className="fa-solid fa-arrow-up-right-from-square text-xs text-amber-300" />
              <span>View Storefront</span>
            </Link>

            <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 bg-white/5 rounded-full border border-white/10 text-xs text-gray-300">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-medium text-white">{adminUser}</span>
            </div>

            {/* Sign Out Button */}
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all cursor-pointer border border-rose-500/40 shadow-xs hover:shadow-md active:scale-95"
              title="Sign out of Admin"
            >
              <i className="fa-solid fa-arrow-right-from-bracket text-xs" />
              <span className="hidden xs:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col lg:flex-row gap-6">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 bg-white rounded-2xl p-4 shadow-sm border border-gray-200/80 flex flex-col gap-1.5">
            {/* Branded Store Profile Card with Logo */}
            <div className="p-3 mb-2 rounded-xl bg-gradient-to-br from-[#1C1029] via-[#2A173E] to-[#1C1029] text-white flex items-center gap-3 border border-amber-500/20 shadow-xs">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-amber-400/50 shadow-xs shrink-0 bg-white">
                <img
                  src="/images/miracle.jpeg"
                  alt="Miracle Feng Shui"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <span className="font-serif font-semibold text-sm text-white block truncate leading-tight">
                  Miracle Feng Shui
                </span>
                <span className="text-[10px] text-amber-300 font-medium block mt-0.5">
                  ⚡ Store Manager
                </span>
              </div>
            </div>

            <div className="px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-wider text-gray-400">
              Navigation
            </div>

            {navItems.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all no-underline ${
                    active
                      ? 'bg-gradient-to-r from-[#231533] to-[#361E4F] text-white shadow-sm font-semibold border-l-4 border-amber-400'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <i
                      className={`fa-solid ${item.icon} w-5 text-center ${
                        active ? 'text-amber-300' : 'text-gray-400'
                      }`}
                    />
                    <span style={{ color: active ? '#ffffff' : undefined }}>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9.5px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        active
                          ? 'bg-amber-400 text-black shadow-2xs'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <hr className="my-2.5 border-gray-100" />

            <div className="px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider text-gray-400">
              Quick Actions
            </div>

            <Link
              href="/admin/products"
              className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs sm:text-sm text-[#A84218] hover:bg-orange-50 font-semibold no-underline transition-colors"
            >
              <i className="fa-solid fa-circle-plus text-base" />
              <span>Add New Product</span>
            </Link>

            <Link
              href="/admin/homepage"
              className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs sm:text-sm text-[#2A1D38] hover:bg-purple-50 font-semibold no-underline transition-colors"
            >
              <i className="fa-solid fa-arrows-up-down text-base" />
              <span>Reorder Homepage</span>
            </Link>

            {/* Catalog Engine Live Status Card */}
            <div className="mt-3 p-3 bg-gradient-to-b from-amber-50/70 to-orange-50/40 rounded-xl border border-amber-200/60 text-xs">
              <div className="flex items-center justify-between text-gray-700 mb-1">
                <span className="font-bold text-[11px] text-[#1A1124] flex items-center gap-1">
                  <i className="fa-solid fa-bolt text-amber-600 text-[10px]" />
                  <span>Storefront Status</span>
                </span>
                <span className="text-[9.5px] font-bold text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-full">
                  Live &amp; Active
                </span>
              </div>
              <p className="text-[10.5px] text-gray-500 leading-snug">
                Edits to inventory &amp; homepage sections reflect instantly.
              </p>
            </div>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex animate-in fade-in duration-200">
            <div className="w-72 bg-white h-full p-5 flex flex-col shadow-2xl animate-in slide-in-from-left duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-amber-400 shadow-xs">
                    <img
                      src="/images/miracle.jpeg"
                      alt="Miracle Feng Shui"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-bold text-base text-[#2A1D38]">Miracle Admin</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-gray-500 hover:text-black cursor-pointer rounded-lg hover:bg-gray-100"
                >
                  <i className="fa-solid fa-xmark text-lg" />
                </button>
              </div>

              <div className="flex flex-col gap-1.5 mt-4">
                {navItems.map((item) => {
                  const active = isActive(item);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium no-underline ${
                        active
                          ? 'bg-[#2A1D38] text-white font-semibold'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <i className={`fa-solid ${item.icon} ${active ? 'text-amber-300' : 'text-gray-400'}`} />
                        <span style={{ color: active ? '#ffffff' : undefined }}>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] bg-amber-300 text-black px-2 py-0.5 rounded-full font-bold">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col gap-2">
                <Link
                  href="/"
                  target="_blank"
                  className="w-full flex items-center justify-center gap-2 bg-[#2A1D38] text-white py-2.5 rounded-xl font-semibold text-xs no-underline shadow-xs"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
                  <span>Open Storefront</span>
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center gap-2 bg-rose-50 text-rose-600 py-2 rounded-xl font-semibold text-xs border border-rose-200 cursor-pointer"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket text-xs" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
            <div
              className="flex-1"
              onClick={() => setMobileMenuOpen(false)}
            />
          </div>
        )}

        {/* Dynamic Admin Content */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
