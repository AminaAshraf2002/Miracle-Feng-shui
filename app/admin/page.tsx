'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useStore, OrderStatus } from '@/context/StoreContext';

export default function AdminDashboardPage() {
  const { products, orders, sections, updateOrderStatus } = useStore();
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [greeting, setGreeting] = useState('Good Afternoon');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      if (hours < 12) setGreeting('Good Morning');
      else if (hours < 18) setGreeting('Good Afternoon');
      else setGreeting('Good Evening');

      const dateStr = now.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      const timeStr = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
      setCurrentDateTime(`${dateStr} | ${timeStr}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Metrics
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.totalAmount, 0);
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending').length;
  const activeSectionsCount = sections.filter((s) => s.enabled).length;

  const statusPastels: Record<OrderStatus, { bg: string; text: string }> = {
    Pending: { bg: 'bg-[#FEF3C7]', text: 'text-[#B45309]' },
    Processing: { bg: 'bg-[#EBF2FE]', text: 'text-[#1D4ED8]' },
    Shipped: { bg: 'bg-[#F3EEFC]', text: 'text-[#6D28D9]' },
    Delivered: { bg: 'bg-[#E6F4F1]', text: 'text-[#0F766E]' },
    Cancelled: { bg: 'bg-[#FEE2E2]', text: 'text-[#B91C1C]' },
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-5 max-w-7xl mx-auto font-outfit antialiased">
      {/* Top Welcome Banner with Background Image from Login Page */}
      <div className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-white overflow-hidden shadow-md flex flex-col justify-between min-h-[175px]">
        {/* Background Feng Shui Artwork from Login Page */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/feng_shui_hero_banner.jpg"
            alt="Feng Shui Prosperity Banner"
            className="w-full h-full object-cover object-center scale-105"
          />
          {/* Deep dark gradient scrim ensuring 100% crisp contrast for text */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#140D1F]/95 via-[#1E112A]/85 to-[#140D1F]/70" />
        </div>

        {/* Banner Top Row: Live status pill, Search & Profile Icons */}
        <div className="flex items-center justify-between gap-3 w-full relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10.5px] uppercase tracking-wider text-amber-300 font-bold">
              Miracle Command Sanctuary
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Minimalist Search in Banner */}
            <div className="hidden sm:flex items-center bg-white/15 hover:bg-white/20 transition-colors border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white placeholder-white/60 w-48 shadow-2xs backdrop-blur-xs">
              <i className="fa-solid fa-magnifying-glass text-[10px] text-amber-300/80 mr-2" />
              <input
                type="text"
                placeholder="Search catalog..."
                className="bg-transparent border-none outline-hidden text-xs text-white placeholder-white/60 w-full"
              />
            </div>

            {/* Notification Bell */}
            <div className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 transition-colors flex items-center justify-center text-white relative cursor-pointer border border-white/10 shadow-2xs">
              <i className="fa-regular fa-bell text-xs" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-rose-400 ring-2 ring-[#170E22]" />
            </div>

            {/* User Profile Avatar */}
            <div className="w-8 h-8 rounded-full bg-amber-400 text-[#170E22] font-bold flex items-center justify-center text-xs shadow-xs border border-white/30">
              A
            </div>
          </div>
        </div>

        {/* Banner Content & Floating Graphic */}
        <div className="mt-4 flex flex-col md:flex-row md:items-end md:justify-between gap-4 relative z-10">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight font-outfit">
              {greeting}, Admin!
            </h1>
            <p className="text-xs text-gray-200 mt-1 max-w-lg font-normal leading-relaxed">
              Monitor store catalog, fulfill customer orders, and orchestrate homepage sections.
            </p>

            {/* Compact Date & Time Pill */}
            <div className="mt-3 inline-flex items-center gap-2 bg-black/35 text-white/90 text-[11px] px-3 py-1 rounded-full border border-white/10 font-medium backdrop-blur-xs">
              <i className="fa-regular fa-clock text-[11px] text-amber-300" />
              <span>{currentDateTime || 'Monday, Sep 16, 2026'}</span>
            </div>
          </div>

          {/* Right Floating Card Illustration */}
          <div className="hidden md:flex items-center gap-3 bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl p-3 shadow-xs shrink-0">
            <div className="w-10 h-10 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center text-lg shadow-xs border border-amber-400/30">
              <i className="fa-solid fa-circle-check" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-white block uppercase tracking-wider">
                Sanctuary Optimal
              </span>
              <span className="text-[10px] text-gray-300 block">
                Catalog online
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Compact KPI Cards Grid with Minimalist Pastel Circles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Sales (Pastel Amber) */}
        <div className="bg-white p-4 sm:p-4.5 rounded-2xl border border-gray-200/70 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center text-sm shrink-0 shadow-2xs">
                <i className="fa-solid fa-indian-rupee-sign" />
              </div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Total Sales
              </span>
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
            <span className="text-[10.5px] font-semibold text-amber-800 bg-[#FEF3C7] px-1.5 py-0.5 rounded-md border border-amber-200/60 flex items-center gap-1">
              <i className="fa-solid fa-arrow-trend-up text-[9px]" />
              <span>18%</span>
            </span>
          </div>
        </div>

        {/* Customer Orders (Pastel Peach) */}
        <div className="bg-white p-4 sm:p-4.5 rounded-2xl border border-gray-200/70 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#FDF1EC] text-[#EA580C] flex items-center justify-center text-sm shrink-0 shadow-2xs">
                <i className="fa-solid fa-bag-shopping" />
              </div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Store Orders
              </span>
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              {orders.length}
            </div>
            <span className="text-[10.5px] font-semibold text-orange-800 bg-[#FDF1EC] px-1.5 py-0.5 rounded-md border border-orange-200/60 flex items-center gap-1">
              <i className="fa-solid fa-arrow-trend-up text-[9px]" />
              <span>8%</span>
            </span>
          </div>
        </div>

        {/* Active Products (Pastel Lavender) */}
        <div className="bg-white p-4 sm:p-4.5 rounded-2xl border border-gray-200/70 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#F3EEFC] text-[#7C3AED] flex items-center justify-center text-sm shrink-0 shadow-2xs">
                <i className="fa-solid fa-cubes" />
              </div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Catalog Items
              </span>
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              {products.length}
            </div>
            <span className="text-[10.5px] font-semibold text-purple-800 bg-[#F3EEFC] px-1.5 py-0.5 rounded-md border border-purple-200/60 flex items-center gap-1">
              <i className="fa-solid fa-check text-[9px]" />
              <span>Active</span>
            </span>
          </div>
        </div>

        {/* Layout Sections (Pastel Jade/Mint) */}
        <div className="bg-white p-4 sm:p-4.5 rounded-2xl border border-gray-200/70 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#E6F4F1] text-[#0F766E] flex items-center justify-center text-sm shrink-0 shadow-2xs">
                <i className="fa-solid fa-sliders" />
              </div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Sections
              </span>
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              {activeSectionsCount} / {sections.length}
            </div>
            <span className="text-[10.5px] font-semibold text-teal-800 bg-[#E6F4F1] px-1.5 py-0.5 rounded-md border border-teal-200/60 flex items-center gap-1">
              <i className="fa-solid fa-check text-[9px]" />
              <span>Optimal</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Active Sections / Orders (Left 8) and System Alerts (Right 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        {/* Left 8 Cols: Active Sections Cards & Orders Table */}
        <div className="lg:col-span-8 flex flex-col gap-4 sm:gap-5">
          {/* Active Sections Grid */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/70 shadow-2xs">
            <div className="flex items-center justify-between mb-3.5">
              <h2 className="text-sm sm:text-base font-bold text-gray-900">
                Active Homepage Sections
              </h2>
              <Link
                href="/admin/homepage"
                className="text-[11px] font-bold text-gray-600 hover:text-black bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-lg uppercase tracking-wider transition-colors no-underline"
              >
                VIEW ALL
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Card 1: Pastel Amber */}
              <div className="bg-[#FAF9F6] hover:bg-[#F5F2EB] transition-colors p-3 rounded-xl border border-gray-200/60 flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center text-base mb-1.5 shadow-2xs">
                  <i className="fa-solid fa-star" />
                </div>
                <span className="text-xs font-bold text-gray-800 truncate w-full">
                  Hero Showcase
                </span>
                <span className="text-[9.5px] text-gray-400 font-semibold uppercase mt-0.5">
                  ENABLED
                </span>
              </div>

              {/* Card 2: Pastel Peach */}
              <div className="bg-[#FAF9F6] hover:bg-[#F5F2EB] transition-colors p-3 rounded-xl border border-gray-200/60 flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-xl bg-[#FDF1EC] text-[#EA580C] flex items-center justify-center text-base mb-1.5 shadow-2xs">
                  <i className="fa-solid fa-gem" />
                </div>
                <span className="text-xs font-bold text-gray-800 truncate w-full">
                  Auspicious Finds
                </span>
                <span className="text-[9.5px] text-gray-400 font-semibold uppercase mt-0.5">
                  ENABLED
                </span>
              </div>

              {/* Card 3: Pastel Lavender */}
              <div className="bg-[#FAF9F6] hover:bg-[#F5F2EB] transition-colors p-3 rounded-xl border border-gray-200/60 flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-xl bg-[#F3EEFC] text-[#7C3AED] flex items-center justify-center text-base mb-1.5 shadow-2xs">
                  <i className="fa-solid fa-circle-nodes" />
                </div>
                <span className="text-xs font-bold text-gray-800 truncate w-full">
                  Curated Interests
                </span>
                <span className="text-[9.5px] text-gray-400 font-semibold uppercase mt-0.5">
                  ENABLED
                </span>
              </div>

              {/* Card 4: Pastel Mint */}
              <div className="bg-[#FAF9F6] hover:bg-[#F5F2EB] transition-colors p-3 rounded-xl border border-gray-200/60 flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-xl bg-[#E6F4F1] text-[#0F766E] flex items-center justify-center text-base mb-1.5 shadow-2xs">
                  <i className="fa-solid fa-gift" />
                </div>
                <span className="text-xs font-bold text-gray-800 truncate w-full">
                  Prosperity Gifts
                </span>
                <span className="text-[9.5px] text-gray-400 font-semibold uppercase mt-0.5">
                  ENABLED
                </span>
              </div>
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/70 shadow-2xs flex flex-col">
            <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-gray-100">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-gray-900">Recent Customer Orders</h2>
                <p className="text-[11px] text-gray-400 mt-0.5">Live store orders</p>
              </div>
              <Link
                href="/admin/orders"
                className="text-xs font-bold text-[#170E22] hover:text-amber-800 no-underline"
              >
                All Orders &rarr;
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50/80 text-gray-400 text-[10px] uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-2 px-2.5 rounded-l-lg">Order #</th>
                    <th className="py-2 px-2.5">Customer</th>
                    <th className="py-2 px-2.5">Items</th>
                    <th className="py-2 px-2.5">Total</th>
                    <th className="py-2 px-2.5">Status</th>
                    <th className="py-2 px-2.5 rounded-r-lg text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.slice(0, 5).map((order) => {
                    const pastel = statusPastels[order.status] || statusPastels.Pending;
                    return (
                      <tr key={order.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-2.5 px-2.5 font-semibold text-gray-900 font-mono text-[11px]">
                          {order.orderNumber}
                        </td>
                        <td className="py-2.5 px-2.5 text-gray-700">
                          <div className="font-bold text-gray-900 text-xs">{order.customerName}</div>
                          <div className="text-[10px] text-gray-400">{order.city}</div>
                        </td>
                        <td className="py-2.5 px-2.5 text-gray-600 text-xs">
                          {order.items.length} item{order.items.length > 1 ? 's' : ''}
                        </td>
                        <td className="py-2.5 px-2.5 font-bold text-gray-900 text-xs">
                          ₹{order.totalAmount.toLocaleString('en-IN')}
                        </td>
                        <td className="py-2.5 px-2.5">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                            className={`text-[11px] font-bold px-2 py-0.5 rounded-full border border-black/5 cursor-pointer focus:outline-hidden ${pastel.bg} ${pastel.text}`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="py-2.5 px-2.5 text-right">
                          <Link
                            href="/admin/orders"
                            className="text-xs text-gray-500 hover:text-black font-semibold no-underline"
                          >
                            Details
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: System Alerts & Shortcuts */}
        <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-5">
          {/* System Alerts Card */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/70 shadow-2xs flex flex-col">
            <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-gray-100">
              <h2 className="text-sm sm:text-base font-bold text-gray-900">System Alerts</h2>
              <div className="w-5 h-5 rounded-full bg-[#FDF1EC] text-[#EA580C] flex items-center justify-center text-[10px]">
                <i className="fa-solid fa-exclamation" />
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              {/* Alert 1: Pastel Peach */}
              <div className="p-2.5 bg-gray-50/70 rounded-xl flex items-center justify-between border border-gray-200/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#FDF1EC] text-[#EA580C] flex items-center justify-center text-xs shrink-0">
                    <i className="fa-solid fa-bolt" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-900 block">
                      Catalog Sync
                    </span>
                    <span className="text-[10px] text-gray-400 block">
                      Live connection
                    </span>
                  </div>
                </div>
                <span className="text-[9.5px] font-bold text-emerald-800 bg-[#E6F4F1] px-1.5 py-0.5 rounded-md border border-emerald-200/60">
                  Live
                </span>
              </div>

              {/* Alert 2: Pastel Amber */}
              <div className="p-2.5 bg-gray-50/70 rounded-xl flex items-center justify-between border border-gray-200/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] text-[#B45309] flex items-center justify-center text-xs shrink-0">
                    <i className="fa-solid fa-shield-halved" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-900 block">
                      Security Guard
                    </span>
                    <span className="text-[10px] text-gray-400 block">
                      URL protected
                    </span>
                  </div>
                </div>
                <span className="text-[9.5px] font-bold text-amber-800 bg-[#FEF3C7] px-1.5 py-0.5 rounded-md border border-amber-200/60">
                  Optimal
                </span>
              </div>

              {/* Alert 3: Pastel Lavender */}
              <div className="p-2.5 bg-gray-50/70 rounded-xl flex items-center justify-between border border-gray-200/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#F3EEFC] text-[#7C3AED] flex items-center justify-center text-xs shrink-0">
                    <i className="fa-solid fa-box-open" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-900 block">
                      Inventory
                    </span>
                    <span className="text-[10px] text-gray-400 block">
                      {products.length} SKU records
                    </span>
                  </div>
                </div>
                <span className="text-[9.5px] font-bold text-purple-800 bg-[#F3EEFC] px-1.5 py-0.5 rounded-md border border-purple-200/60">
                  Normal
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col gap-2">
              <Link
                href="/admin/products"
                className="w-full py-2 bg-gradient-to-r from-[#170E22] via-[#241334] to-[#150C20] hover:opacity-95 text-white text-xs font-bold rounded-xl text-center transition-opacity no-underline shadow-xs flex items-center justify-center gap-1.5 border border-amber-500/20"
              >
                <i className="fa-solid fa-plus text-[10px] text-amber-300" />
                <span>Add New Product</span>
              </Link>

              <Link
                href="/admin/homepage"
                className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl text-center transition-colors no-underline"
              >
                Reorder Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
