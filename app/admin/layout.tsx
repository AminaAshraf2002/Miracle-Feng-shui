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
      <div className="min-h-screen bg-[#130B1C] flex flex-col items-center justify-center text-white">
        <div className="w-12 h-12 rounded-2xl bg-[#A84218] flex items-center justify-center mb-4 animate-pulse">
          <i className="fa-solid fa-yin-yang text-2xl" />
        </div>
        <p className="text-sm font-semibold text-gray-300">
          Verifying administrative privileges...
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
    },
    {
      name: 'Homepage Builder',
      href: '/admin/homepage',
      icon: 'fa-layer-group',
      badge: 'Positions',
    },
    {
      name: 'Products (CRUD)',
      href: '/admin/products',
      icon: 'fa-box-open',
    },
    {
      name: 'Orders',
      href: '/admin/orders',
      icon: 'fa-clipboard-list',
    },
  ];

  const isActive = (item: (typeof navItems)[0]) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1E1E1E] flex flex-col">
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#1E132A] text-white border-b border-[#35254A] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <i className="fa-solid fa-bars text-lg" />
            </button>

            <Link href="/admin" className="flex items-center gap-2.5 no-underline text-white">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#A84218] to-[#F1641E] flex items-center justify-center text-white shadow-md">
                <i className="fa-solid fa-yin-yang text-lg" />
              </div>
              <div>
                <span
                  style={{ color: '#ffffff' }}
                  className="font-bold text-base sm:text-lg tracking-tight block leading-tight text-white"
                >
                  Miracle Admin
                </span>
                <span className="text-[10.5px] text-amber-300 font-medium tracking-wider uppercase">
                  STORE MANAGEMENT
                </span>
              </div>
            </Link>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-full transition-all border border-white/15 no-underline"
            >
              <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
              <span>View Storefront</span>
            </Link>

            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10 text-xs text-gray-300">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-medium text-white">{adminUser}</span>
            </div>

            {/* Sign Out Button */}
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors cursor-pointer border border-rose-500/40 shadow-xs"
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
          <div className="sticky top-24 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col gap-1.5">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Admin Menu
            </div>

            {navItems.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all no-underline ${
                    active
                      ? 'bg-[#2A1D38] text-white shadow-xs font-semibold'
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
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        active
                          ? 'bg-amber-400 text-black'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <hr className="my-3 border-gray-100" />

            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Shortcuts
            </div>

            <Link
              href="/admin/products"
              className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm text-[#A84218] hover:bg-orange-50 font-medium no-underline transition-colors"
            >
              <i className="fa-solid fa-plus-circle text-base" />
              <span>Add New Product</span>
            </Link>

            <Link
              href="/admin/homepage"
              className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm text-[#2A1D38] hover:bg-purple-50 font-medium no-underline transition-colors"
            >
              <i className="fa-solid fa-arrows-up-down text-base" />
              <span>Reorder Homepage</span>
            </Link>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50 flex">
            <div className="w-72 bg-white h-full p-5 flex flex-col shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <span className="font-bold text-lg text-[#2A1D38]">Admin Menu</span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-gray-500 hover:text-black cursor-pointer"
                >
                  <i className="fa-solid fa-xmark text-lg" />
                </button>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                {navItems.map((item) => {
                  const active = isActive(item);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium no-underline ${
                        active
                          ? 'bg-[#2A1D38] text-white font-semibold'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <i className={`fa-solid ${item.icon}`} />
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
                  className="w-full flex items-center justify-center gap-2 bg-[#2A1D38] text-white py-2.5 rounded-xl font-semibold text-sm no-underline shadow-sm"
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
