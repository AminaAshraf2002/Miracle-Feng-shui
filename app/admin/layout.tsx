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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400/50 mb-3 animate-pulse shadow-md">
          <img
            src="/images/miracle.jpeg"
            alt="Miracle Feng Shui"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-xs font-medium text-amber-200/90 tracking-wide">
          Verifying credentials...
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
      <div className="lg:hidden bg-[#140D1F] text-white px-4 py-2.5 flex items-center justify-between border-b border-white/10 sticky top-0 z-40 shadow-xs">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-1.5 -ml-1 text-white/80 hover:text-white rounded-lg cursor-pointer"
            aria-label="Open navigation drawer"
          >
            <i className="fa-solid fa-bars text-base" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-amber-400/40 bg-white shrink-0">
              <img src="/images/miracle.jpeg" alt="Miracle" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-xs tracking-tight text-white">Miracle Admin</span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="text-xs text-white/80 hover:text-rose-200 cursor-pointer flex items-center gap-1.5"
        >
          <i className="fa-solid fa-arrow-right-from-bracket text-[11px]" />
          <span>Exit</span>
        </button>
      </div>

      {/* Collapsible Desktop Sidebar with Decreased Width & Collapse Toggle Button */}
      <aside
        className={`hidden lg:flex ${
          sidebarCollapsed ? 'w-20 px-3 py-5' : 'w-56 xl:w-60 p-5'
        } bg-gradient-to-b from-[#140D1F] via-[#1A1028] to-[#120A1A] text-white flex-col justify-between shrink-0 min-h-screen sticky top-0 h-screen select-none border-r border-white/5 transition-all duration-300 relative z-30`}
      >
        {/* Collapse / Expand Toggle Button (Right Edge matching reference UI) */}
        <button
          type="button"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="absolute -right-3 top-7 w-6 h-6 rounded-full bg-white text-[#140D1F] shadow-md border border-gray-200 flex items-center justify-center text-[10px] cursor-pointer hover:bg-amber-50 hover:scale-105 transition-all z-50"
        >
          <i
            className={`fa-solid ${
              sidebarCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'
            } text-[9px]`}
          />
        </button>

        <div>
          {/* Top Brand with Circular Logo */}
          <div
            className={`flex items-center ${
              sidebarCollapsed ? 'justify-center pb-4' : 'gap-3 pb-5'
            } border-b border-white/10`}
          >
            <div className="w-9 h-9 rounded-xl overflow-hidden border-2 border-amber-400/40 shadow-sm shrink-0 bg-white">
              <img
                src="/images/miracle.jpeg"
                alt="Miracle Feng Shui"
                className="w-full h-full object-cover"
              />
            </div>
            {!sidebarCollapsed && (
              <div className="min-w-0 transition-opacity duration-200">
                <span className="font-cinzel font-bold text-xs text-white tracking-wider block leading-snug truncate">
                  Miracle Feng Shui
                </span>
                <span className="text-[9px] text-amber-300 font-semibold tracking-wider uppercase block">
                  COMMAND CENTER
                </span>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5 mt-5">
            {navItems.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={sidebarCollapsed ? item.name : undefined}
                  className={`flex items-center ${
                    sidebarCollapsed ? 'justify-center px-0 py-2.5' : 'justify-between px-3.5 py-2.5'
                  } rounded-xl text-xs font-semibold transition-all no-underline ${
                    active
                      ? 'bg-white text-[#140D1F] shadow-sm font-bold'
                      : 'text-white/75 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <i
                      className={`fa-solid ${item.icon} text-sm w-4 text-center ${
                        active ? 'text-[#140D1F]' : 'text-white/70'
                      }`}
                    />
                    {!sidebarCollapsed && <span>{item.name}</span>}
                  </div>
                  {!sidebarCollapsed && active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Widget & Actions */}
        <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
          {!sidebarCollapsed && (
            <div className="bg-white/5 rounded-xl p-3 border border-white/10 text-center">
              <div className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center mx-auto mb-1 text-[10px]">
                <i className="fa-solid fa-bolt" />
              </div>
              <span className="text-[10.5px] font-bold text-white block uppercase tracking-wider">
                STORE CONNECTED
              </span>
              <Link
                href="/"
                target="_blank"
                className="mt-2 block w-full py-1.5 bg-white/10 hover:bg-white/20 text-white text-[10.5px] font-semibold rounded-lg transition-colors no-underline border border-white/10"
              >
                Storefront &rarr;
              </Link>
            </div>
          )}

          {/* User & Sign Out */}
          <div
            className={`flex items-center ${
              sidebarCollapsed ? 'justify-center' : 'justify-between'
            } text-xs text-white/70 px-1`}
          >
            {!sidebarCollapsed && (
              <div className="truncate max-w-[120px] text-[11px] text-white/80 font-medium">
                {adminUser.split('@')[0]}
              </div>
            )}
            <button
              type="button"
              onClick={handleSignOut}
              title="Sign Out"
              className="text-white/70 hover:text-rose-200 cursor-pointer transition-colors p-1"
            >
              <i className="fa-solid fa-arrow-right-from-bracket text-xs" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex animate-in fade-in duration-150">
          <div className="w-64 bg-gradient-to-b from-[#140D1F] via-[#1A1028] to-[#120A1A] text-white h-full p-5 flex flex-col justify-between shadow-2xl animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl overflow-hidden border border-amber-400/40 bg-white">
                    <img src="/images/miracle.jpeg" alt="Miracle" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-bold text-sm text-white">Miracle Admin</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-white/70 hover:text-white rounded-lg cursor-pointer"
                >
                  <i className="fa-solid fa-xmark text-base" />
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
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold no-underline ${
                        active
                          ? 'bg-white text-[#140D1F] shadow-xs font-bold'
                          : 'text-white/80 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <i className={`fa-solid ${item.icon} text-xs`} />
                        <span>{item.name}</span>
                      </div>
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <Link
                href="/"
                target="_blank"
                className="w-full text-center py-2 bg-white/10 text-white rounded-xl text-xs font-semibold no-underline border border-white/10"
              >
                Open Storefront
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full py-1.5 bg-rose-500/20 text-rose-200 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* Main Content Area with Compact Padding */}
      <main className="flex-1 min-w-0 p-3 sm:p-5 lg:p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
