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
        month: 'long',
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
    <div className="flex flex-col gap-6 max-w-7xl mx-auto font-outfit antialiased">
      {/* Top Welcome Banner Matching Reference Screenshot */}
      <div className="bg-[#133E35] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-sm flex flex-col justify-between min-h-[200px]">
        {/* Banner Top Row: Search & Profile Icons */}
        <div className="flex items-center justify-between gap-4 w-full">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] uppercase tracking-wider text-white/70 font-semibold">
              Miracle Command Center
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Minimalist Search in Banner */}
            <div className="hidden sm:flex items-center bg-white/10 hover:bg-white/15 transition-colors border border-white/15 rounded-xl px-3.5 py-1.5 text-xs text-white placeholder-white/50 w-52">
              <i className="fa-solid fa-magnifying-glass text-[11px] text-white/60 mr-2" />
              <input
                type="text"
                placeholder="Search catalog, orders..."
                className="bg-transparent border-none outline-hidden text-xs text-white placeholder-white/50 w-full"
              />
            </div>

            {/* Notification Bell */}
            <div className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white/90 relative cursor-pointer">
              <i className="fa-regular fa-bell text-sm" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-400 ring-2 ring-[#133E35]" />
            </div>

            {/* User Profile Avatar */}
            <div className="flex items-center gap-2 pl-1">
              <div className="w-9 h-9 rounded-full bg-white text-[#133E35] font-bold flex items-center justify-center text-xs shadow-xs">
                A
              </div>
            </div>
          </div>
        </div>

        {/* Banner Content & Floating Graphic */}
        <div className="mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
              {greeting}, Admin!
            </h1>
            <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-xl font-normal leading-relaxed">
              Monitor store inventory, manage customer orders, and orchestrate homepage layout from your command center.
            </p>

            {/* Date & Time Pill matching reference */}
            <div className="mt-4 inline-flex items-center gap-2 bg-black/20 text-white/90 text-[11.5px] px-3.5 py-1.5 rounded-full border border-white/10 font-medium">
              <i className="fa-regular fa-clock text-xs text-white/70" />
              <span>{currentDateTime || 'Monday, September 16, 2026'}</span>
            </div>
          </div>

          {/* Right Floating Card Illustration matching reference */}
          <div className="hidden md:flex items-center gap-3 bg-white/10 backdrop-blur-xs border border-white/15 rounded-2xl p-4 shadow-sm shrink-0">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-[#34D399] text-2xl shadow-xs">
              <i className="fa-solid fa-circle-check" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block uppercase tracking-wider">
                Sanctuary Optimal
              </span>
              <span className="text-[11px] text-white/70 block">
                Catalog &amp; database online
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid with Minimalist Pastel Circles (Matching Reference) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Total Sales */}
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#E6F4F1] text-[#133E35] flex items-center justify-center text-base shrink-0">
                <i className="fa-solid fa-indian-rupee-sign" />
              </div>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Total Sales
              </span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 flex items-center gap-1">
              <i className="fa-solid fa-arrow-trend-up text-[10px]" />
              <span>18%</span>
            </span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EBF2FE] text-[#2563EB] flex items-center justify-center text-base shrink-0">
                <i className="fa-solid fa-bag-shopping" />
              </div>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Customer Orders
              </span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              {orders.length}
            </div>
            <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100 flex items-center gap-1">
              <i className="fa-solid fa-arrow-trend-up text-[10px]" />
              <span>8%</span>
            </span>
          </div>
        </div>

        {/* Active Products */}
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#F3EEFC] text-[#7C3AED] flex items-center justify-center text-base shrink-0">
                <i className="fa-solid fa-cubes" />
              </div>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Catalog Items
              </span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              {products.length}
            </div>
            <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100 flex items-center gap-1">
              <i className="fa-solid fa-check text-[10px]" />
              <span>Active</span>
            </span>
          </div>
        </div>

        {/* Homepage Sections */}
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FDF1EC] text-[#EA580C] flex items-center justify-center text-base shrink-0">
                <i className="fa-solid fa-sliders" />
              </div>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Layout Sections
              </span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              {activeSectionsCount} / {sections.length}
            </div>
            <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100 flex items-center gap-1">
              <i className="fa-solid fa-check text-[10px]" />
              <span>Optimal</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Active Sections / Orders (Left 2/3) and System Alerts (Right 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Active Sections Cards & Orders Table */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Active Sections Grid (Matching Reference "Active Organisations") */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-900">
                Active Homepage Sections
              </h2>
              <Link
                href="/admin/homepage"
                className="text-xs font-bold text-gray-500 hover:text-black bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg uppercase tracking-wider transition-colors no-underline"
              >
                VIEW ALL
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div className="bg-gray-50/70 hover:bg-gray-100/80 transition-colors p-4 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
                <div className="w-11 h-11 rounded-2xl bg-[#E6F4F1] text-[#133E35] flex items-center justify-center text-lg mb-2 shadow-2xs">
                  <i className="fa-solid fa-star" />
                </div>
                <span className="text-xs font-bold text-gray-800 truncate w-full">
                  Hero Showcase
                </span>
                <span className="text-[10px] text-gray-400 font-semibold uppercase mt-0.5">
                  ENABLED
                </span>
              </div>

              <div className="bg-gray-50/70 hover:bg-gray-100/80 transition-colors p-4 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
                <div className="w-11 h-11 rounded-2xl bg-[#FDF1EC] text-[#EA580C] flex items-center justify-center text-lg mb-2 shadow-2xs">
                  <i className="fa-solid fa-gem" />
                </div>
                <span className="text-xs font-bold text-gray-800 truncate w-full">
                  Auspicious Finds
                </span>
                <span className="text-[10px] text-gray-400 font-semibold uppercase mt-0.5">
                  ENABLED
                </span>
              </div>

              <div className="bg-gray-50/70 hover:bg-gray-100/80 transition-colors p-4 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
                <div className="w-11 h-11 rounded-2xl bg-[#F3EEFC] text-[#7C3AED] flex items-center justify-center text-lg mb-2 shadow-2xs">
                  <i className="fa-solid fa-circle-nodes" />
                </div>
                <span className="text-xs font-bold text-gray-800 truncate w-full">
                  Curated Interests
                </span>
                <span className="text-[10px] text-gray-400 font-semibold uppercase mt-0.5">
                  ENABLED
                </span>
              </div>

              <div className="bg-gray-50/70 hover:bg-gray-100/80 transition-colors p-4 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
                <div className="w-11 h-11 rounded-2xl bg-[#EBF2FE] text-[#2563EB] flex items-center justify-center text-lg mb-2 shadow-2xs">
                  <i className="fa-solid fa-gift" />
                </div>
                <span className="text-xs font-bold text-gray-800 truncate w-full">
                  Prosperity Gifts
                </span>
                <span className="text-[10px] text-gray-400 font-semibold uppercase mt-0.5">
                  ENABLED
                </span>
              </div>
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-2xs flex flex-col">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
              <div>
                <h2 className="text-base font-bold text-gray-900">Recent Customer Orders</h2>
                <p className="text-xs text-gray-400 mt-0.5">Live store checkout &amp; fulfillment updates</p>
              </div>
              <Link
                href="/admin/orders"
                className="text-xs font-bold text-[#133E35] hover:underline no-underline"
              >
                All Orders &rarr;
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50/70 text-gray-400 text-[11px] uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-2.5 px-3 rounded-l-xl">Order #</th>
                    <th className="py-2.5 px-3">Customer</th>
                    <th className="py-2.5 px-3">Items</th>
                    <th className="py-2.5 px-3">Total</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 rounded-r-xl text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.slice(0, 5).map((order) => {
                    const pastel = statusPastels[order.status] || statusPastels.Pending;
                    return (
                      <tr key={order.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-3 px-3 font-semibold text-gray-900 text-xs font-mono">
                          {order.orderNumber}
                        </td>
                        <td className="py-3 px-3 text-gray-700 text-xs">
                          <div className="font-bold text-gray-900">{order.customerName}</div>
                          <div className="text-[10.5px] text-gray-400">{order.city}</div>
                        </td>
                        <td className="py-3 px-3 text-gray-600 text-xs">
                          {order.items.length} item{order.items.length > 1 ? 's' : ''}
                        </td>
                        <td className="py-3 px-3 font-bold text-gray-900 text-xs">
                          ₹{order.totalAmount.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 px-3">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                            className={`text-xs font-bold px-2.5 py-1 rounded-full border border-black/5 cursor-pointer focus:outline-hidden ${pastel.bg} ${pastel.text}`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="py-3 px-3 text-right">
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

        {/* Right 4 Cols: System Alerts (Matching Reference "System Alerts") & Shortcuts */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* System Alerts Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-2xs flex flex-col">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900">System Alerts</h2>
              <div className="w-6 h-6 rounded-full bg-[#FDF1EC] text-[#EA580C] flex items-center justify-center text-xs">
                <i className="fa-solid fa-exclamation" />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {/* Alert 1 */}
              <div className="p-3 bg-gray-50/60 rounded-2xl flex items-center justify-between border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FDF1EC] text-[#EA580C] flex items-center justify-center text-sm shrink-0">
                    <i className="fa-solid fa-bolt" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-900 block">
                      Realtime Catalog Sync
                    </span>
                    <span className="text-[10.5px] text-gray-400 block">
                      Active storefront connection
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                  Live
                </span>
              </div>

              {/* Alert 2 */}
              <div className="p-3 bg-gray-50/60 rounded-2xl flex items-center justify-between border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FEF9C3] text-[#A16207] flex items-center justify-center text-sm shrink-0">
                    <i className="fa-solid fa-shield-halved" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-900 block">
                      Admin Security Guard
                    </span>
                    <span className="text-[10.5px] text-gray-400 block">
                      URL session protected
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
                  Optimal
                </span>
              </div>

              {/* Alert 3 */}
              <div className="p-3 bg-gray-50/60 rounded-2xl flex items-center justify-between border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EBF2FE] text-[#2563EB] flex items-center justify-center text-sm shrink-0">
                    <i className="fa-solid fa-box-open" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-900 block">
                      Product Inventory
                    </span>
                    <span className="text-[10.5px] text-gray-400 block">
                      {products.length} live SKU records
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                  Normal
                </span>
              </div>
            </div>

            {/* Quick Actions at bottom */}
            <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col gap-2">
              <Link
                href="/admin/products"
                className="w-full py-2.5 bg-[#133E35] hover:bg-[#0E2E27] text-white text-xs font-bold rounded-xl text-center transition-colors no-underline shadow-xs flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-plus text-[11px]" />
                <span>Add New Product</span>
              </Link>

              <Link
                href="/admin/homepage"
                className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl text-center transition-colors no-underline"
              >
                Reorder Homepage Sections
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
