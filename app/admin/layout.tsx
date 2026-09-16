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
      <div className="min-h-screen bg-[#140D1F] flex flex-col items-center justify-center text-white font-outfit">
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-400/50 mb-4 animate-pulse shadow-md">
          <img
            src="/images/miracle.jpeg"
            alt="Miracle Feng Shui"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-sm font-medium text-amber-200/90 tracking-wide">
          Verifying store administration credentials...
        </p>
      </div>
    );
  }

  const navItems = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: 'fa-gauge-high',
      exact: true,
    },
    {
      name: 'Sections Layout',
      href: '/admin/homepage',
      icon: 'fa-layer-group',
    },
    {
      name: 'Products Catalog',
      href: '/admin/products',
      icon: 'fa-boxes-stacked',
    },
    {
      name: 'Customer Orders',
      href: '/admin/orders',
      icon: 'fa-receipt',
    },
  ];

  const isActive = (item: (typeof navItems)[0]) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <div className="min-h-screen bg-[#F7F6F3] text-[#140D1F] flex flex-col lg:flex-row font-outfit antialiased">
      {/* Mobile Top Header */}
      <div className="lg:hidden bg-[#140D1F] text-white px-4 py-3 flex items-center justify-between border-b border-white/10 sticky top-0 z-40 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 -ml-1 text-white/80 hover:text-white rounded-lg cursor-pointer"
            aria-label="Open navigation drawer"
          >
            <i className="fa-solid fa-bars text-lg" />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-amber-400/40 bg-white shrink-0">
              <img src="/images/miracle.jpeg" alt="Miracle" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-sm tracking-tight text-white">Miracle Admin</span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="text-xs text-white/80 hover:text-rose-200 cursor-pointer flex items-center gap-1.5"
        >
          <i className="fa-solid fa-arrow-right-from-bracket text-xs" />
          <span>Exit</span>
        </button>
      </div>

      {/* Full-Height Desktop Sidebar Matching Reference Layout with Store Theme Gradient */}
      <aside className="hidden lg:flex w-64 xl:w-72 bg-gradient-to-b from-[#140D1F] via-[#1A1028] to-[#120A1A] text-white flex-col justify-between p-6 shrink-0 min-h-screen sticky top-0 h-screen select-none border-r border-white/5">
        <div>
          {/* Top Brand with Circular Logo */}
          <div className="flex items-center gap-3.5 pb-6 border-b border-white/10">
            <div className="w-11 h-11 rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-md shrink-0 bg-white">
              <img
                src="/images/miracle.jpeg"
                alt="Miracle Feng Shui"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <span className="font-cinzel font-bold text-sm text-white tracking-wider block leading-snug">
                Miracle Feng Shui
              </span>
              <span className="text-[10px] text-amber-300 font-semibold tracking-wider uppercase block mt-0.5">
                STORE COMMAND CENTER
              </span>
            </div>
          </div>

          {/* Navigation Links (Solid White Active Pill matching reference) */}
          <nav className="flex flex-col gap-2 mt-6">
            {navItems.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all no-underline ${
                    active
                      ? 'bg-white text-[#140D1F] shadow-sm font-bold'
                      : 'text-white/75 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <i
                      className={`fa-solid ${item.icon} text-base w-5 text-center ${
                        active ? 'text-[#140D1F]' : 'text-white/70'
                      }`}
                    />
                    <span>{item.name}</span>
                  </div>
                  {active && (
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Widget & Actions */}
        <div className="pt-6 border-t border-white/10 flex flex-col gap-3.5">
          {/* Store Status Card */}
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-center backdrop-blur-xs">
            <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center mx-auto mb-2 text-xs">
              <i className="fa-solid fa-bolt" />
            </div>
            <span className="text-xs font-bold text-white block tracking-wide uppercase">
              STORE CONNECTED
            </span>
            <span className="text-[11px] text-white/70 block mt-0.5">
              Live catalog &amp; layout synced
            </span>
            <Link
              href="/"
              target="_blank"
              className="mt-3 block w-full py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-colors no-underline border border-white/10"
            >
              Open Storefront &rarr;
            </Link>
          </div>

          {/* User Email & Sign Out */}
          <div className="flex items-center justify-between text-xs px-1 text-white/70">
            <div className="truncate max-w-[140px] font-medium text-white/90">
              {adminUser}
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              className="text-white/75 hover:text-rose-200 cursor-pointer transition-colors flex items-center gap-1 font-semibold"
            >
              <i className="fa-solid fa-arrow-right-from-bracket text-xs" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex animate-in fade-in duration-150">
          <div className="w-72 bg-gradient-to-b from-[#140D1F] via-[#1A1028] to-[#120A1A] text-white h-full p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl overflow-hidden border border-amber-400/40 bg-white">
                    <img src="/images/miracle.jpeg" alt="Miracle" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-bold text-base text-white">Miracle Admin</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-white/70 hover:text-white rounded-lg cursor-pointer"
                >
                  <i className="fa-solid fa-xmark text-lg" />
                </button>
              </div>

              <div className="flex flex-col gap-2 mt-5">
                {navItems.map((item) => {
                  const active = isActive(item);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold no-underline ${
                        active
                          ? 'bg-white text-[#140D1F] shadow-xs font-bold'
                          : 'text-white/80 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <i className={`fa-solid ${item.icon}`} />
                        <span>{item.name}</span>
                      </div>
                      {active && <span className="w-2 h-2 rounded-full bg-amber-500" />}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
              <Link
                href="/"
                target="_blank"
                className="w-full text-center py-2.5 bg-white/10 text-white rounded-xl text-xs font-semibold no-underline border border-white/10"
              >
                Open Storefront
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full py-2 bg-rose-500/20 text-rose-200 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
