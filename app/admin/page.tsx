'use client';

import React from 'react';
import Link from 'next/link';
import { useStore, OrderStatus } from '@/context/StoreContext';

export default function AdminDashboardPage() {
  const { products, orders, sections, updateOrderStatus } = useStore();

  // Metrics
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.totalAmount, 0);
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending').length;
  const activeSectionsCount = sections.filter((s) => s.enabled).length;

  const statusColors: Record<OrderStatus, { bg: string; text: string; border: string; icon: string }> = {
    Pending: {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200',
      icon: 'fa-regular fa-clock',
    },
    Processing: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
      icon: 'fa-solid fa-circle-notch fa-spin',
    },
    Shipped: {
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      border: 'border-purple-200',
      icon: 'fa-solid fa-truck-fast',
    },
    Delivered: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      icon: 'fa-solid fa-circle-check',
    },
    Cancelled: {
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'border-rose-200',
      icon: 'fa-solid fa-ban',
    },
  };

  return (
    <div className="flex flex-col gap-6 font-outfit antialiased">
      {/* Eye-Catching Welcome Banner with Circular Miracle Feng Shui Logo & Cinzel Title */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#170D24] via-[#2A153E] to-[#3B1942] rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-amber-500/25 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Subtle Ambient Glowing Orbs */}
        <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-amber-500/15 blur-3xl pointer-events-none animate-aura-pulse" />
        <div className="absolute -left-16 -bottom-16 w-72 h-72 rounded-full bg-purple-600/20 blur-3xl pointer-events-none animate-aura-pulse" />

        <div className="flex items-center gap-5 relative z-10">
          {/* Prominent Circular Logo with Gold Glow */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-amber-400/70 shadow-[0_0_25px_rgba(245,158,11,0.35)] shrink-0 bg-white ring-4 ring-white/10">
            <img
              src="/images/miracle.jpeg"
              alt="Miracle Feng Shui"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-amber-300 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <i className="fa-solid fa-shield-halved text-[10px]" />
                <span>Storefront Sanctuary Live</span>
              </span>
            </div>
            <h1
              style={{ color: '#ffffff' }}
              className="text-2xl sm:text-3xl font-cinzel font-bold mt-1 tracking-wider !text-white leading-tight drop-shadow-md"
            >
              Miracle Feng Shui Portal
            </h1>
            <p
              style={{ color: '#e5e7eb' }}
              className="text-gray-200 text-xs sm:text-sm mt-1.5 max-w-xl font-light leading-relaxed"
            >
              Curate auspicious collections, reorder homepage sections with drag precision, and fulfill sacred blessing orders.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0 relative z-10">
          <Link
            href="/admin/homepage"
            className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all border border-white/20 no-underline inline-flex items-center gap-2 shadow-sm hover:scale-[1.02] active:scale-98"
          >
            <i className="fa-solid fa-wand-magic-sparkles text-amber-300" />
            <span>Customize Homepage</span>
          </Link>
          <Link
            href="/admin/products"
            className="bg-gradient-to-r from-[#A84218] to-[#D75200] hover:from-[#923812] hover:to-[#B84500] text-white font-bold text-xs sm:text-sm px-4.5 py-2.5 rounded-xl transition-all shadow-md no-underline inline-flex items-center gap-2 hover:scale-[1.02] active:scale-98 border border-amber-400/30"
          >
            <i className="fa-solid fa-circle-plus text-xs" />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      {/* KPI / Metric Cards Grid with Rich Font Awesome Icons */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Total Sales */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400" />
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <i className="fa-solid fa-indian-rupee-sign text-emerald-600 text-xs" />
              <span>Total Sales</span>
            </span>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-wallet text-sm" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight font-outfit">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1.5 flex items-center gap-1.5">
              <i className="fa-solid fa-arrow-trend-up text-xs" />
              <span>+18.4% this cycle</span>
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-500" />
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <i className="fa-solid fa-receipt text-blue-600 text-xs" />
              <span>Customer Orders</span>
            </span>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-receipt text-sm" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight font-outfit">
              {orders.length}
            </div>
            <div className="text-[11px] text-amber-600 font-semibold mt-1.5 flex items-center gap-1.5">
              <i className="fa-solid fa-hourglass-half text-xs" />
              <span>{pendingOrdersCount} pending fulfillment</span>
            </div>
          </div>
        </div>

        {/* Active Products */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-600 to-pink-500" />
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <i className="fa-solid fa-boxes-stacked text-purple-600 text-xs" />
              <span>Catalog Items</span>
            </span>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-boxes-stacked text-sm" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight font-outfit">
              {products.length}
            </div>
            <div className="text-[11px] text-purple-600 font-semibold mt-1.5 flex items-center gap-1.5">
              <i className="fa-solid fa-circle-check text-xs" />
              <span>Full CRUD &amp; filter ready</span>
            </div>
          </div>
        </div>

        {/* Homepage Sections */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 to-orange-400" />
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <i className="fa-solid fa-sliders text-amber-600 text-xs" />
              <span>Home Sections</span>
            </span>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-400 text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-wand-magic-sparkles text-sm" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight font-outfit">
              {activeSectionsCount} / {sections.length}
            </div>
            <div className="text-[11px] text-amber-700 font-semibold mt-1.5 flex items-center gap-1.5">
              <i className="fa-solid fa-arrow-down-up-across-line text-xs" />
              <span>Interactive Position Control</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Hub with Rich Font Awesome Icons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/admin/products"
          className="p-4.5 bg-white rounded-2xl border border-gray-200/80 shadow-2xs hover:border-amber-400 hover:shadow-md transition-all no-underline flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#A84218] border border-orange-100 flex items-center justify-center text-xl group-hover:scale-110 transition-transform shadow-xs">
            <i className="fa-solid fa-circle-plus" />
          </div>
          <div>
            <span className="text-sm font-bold text-gray-900 block group-hover:text-[#A84218] transition-colors">
              Add New Product
            </span>
            <span className="text-xs text-gray-500">Create item in catalog</span>
          </div>
        </Link>

        <Link
          href="/admin/homepage"
          className="p-4.5 bg-white rounded-2xl border border-gray-200/80 shadow-2xs hover:border-purple-400 hover:shadow-md transition-all no-underline flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#2A1D38] border border-purple-100 flex items-center justify-center text-xl group-hover:scale-110 transition-transform shadow-xs">
            <i className="fa-solid fa-arrow-down-up-across-line" />
          </div>
          <div>
            <span className="text-sm font-bold text-gray-900 block group-hover:text-[#2A1D38] transition-colors">
              Homepage Layout
            </span>
            <span className="text-xs text-gray-500">Reorder &amp; edit text</span>
          </div>
        </Link>

        <Link
          href="/admin/orders"
          className="p-4.5 bg-white rounded-2xl border border-gray-200/80 shadow-2xs hover:border-blue-400 hover:shadow-md transition-all no-underline flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center text-xl group-hover:scale-110 transition-transform shadow-xs">
            <i className="fa-solid fa-truck-fast" />
          </div>
          <div>
            <span className="text-sm font-bold text-gray-900 block group-hover:text-blue-700 transition-colors">
              Process Orders
            </span>
            <span className="text-xs text-gray-500">{pendingOrdersCount} awaiting dispatch</span>
          </div>
        </Link>

        <Link
          href="/"
          target="_blank"
          className="p-4.5 bg-white rounded-2xl border border-gray-200/80 shadow-2xs hover:border-emerald-400 hover:shadow-md transition-all no-underline flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center text-xl group-hover:scale-110 transition-transform shadow-xs">
            <i className="fa-solid fa-earth-asia" />
          </div>
          <div>
            <span className="text-sm font-bold text-gray-900 block group-hover:text-emerald-700 transition-colors">
              Public Storefront
            </span>
            <span className="text-xs text-gray-500">Preview live changes</span>
          </div>
        </Link>
      </div>

      {/* Two Column Grid: Recent Orders & Catalog Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recent Customer Orders */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-200/80 shadow-xs p-5 sm:p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                <i className="fa-solid fa-receipt text-amber-600 text-sm" />
                <span>Recent Customer Orders</span>
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">Live order management &amp; status tracking</p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-bold text-[#A84218] hover:text-[#8F3510] no-underline inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-orange-50 transition-colors"
            >
              <span>View All Orders</span>
              <i className="fa-solid fa-arrow-right text-[10px]" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/80 text-gray-500 text-[11px] uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-2.5 px-3 rounded-l-xl">
                    <span className="flex items-center gap-1">
                      <i className="fa-solid fa-hashtag text-[10px] text-gray-400" />
                      <span>Order</span>
                    </span>
                  </th>
                  <th className="py-2.5 px-3">
                    <span className="flex items-center gap-1">
                      <i className="fa-solid fa-user text-[10px] text-gray-400" />
                      <span>Customer</span>
                    </span>
                  </th>
                  <th className="py-2.5 px-3">
                    <span className="flex items-center gap-1">
                      <i className="fa-solid fa-box text-[10px] text-gray-400" />
                      <span>Items</span>
                    </span>
                  </th>
                  <th className="py-2.5 px-3">
                    <span className="flex items-center gap-1">
                      <i className="fa-solid fa-money-bill-wave text-[10px] text-gray-400" />
                      <span>Total</span>
                    </span>
                  </th>
                  <th className="py-2.5 px-3">
                    <span className="flex items-center gap-1">
                      <i className="fa-solid fa-truck text-[10px] text-gray-400" />
                      <span>Status</span>
                    </span>
                  </th>
                  <th className="py-2.5 px-3 rounded-r-xl text-right">
                    <span>Action</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.slice(0, 5).map((order) => {
                  const currentStatus = statusColors[order.status] || statusColors.Pending;
                  return (
                    <tr key={order.id} className="hover:bg-gray-50/80 transition-colors group">
                      <td className="py-3 px-3 font-semibold text-gray-900 font-mono text-xs">
                        {order.orderNumber}
                      </td>
                      <td className="py-3 px-3 text-gray-700">
                        <div className="font-semibold text-xs text-gray-900">{order.customerName}</div>
                        <div className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                          <i className="fa-solid fa-location-dot text-[9px]" />
                          <span>{order.city}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-gray-600 text-xs">
                        <span className="inline-flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-full font-medium text-[11px]">
                          <i className="fa-solid fa-box-open text-[10px] text-gray-500" />
                          <span>{order.items.length} item{order.items.length > 1 ? 's' : ''}</span>
                        </span>
                      </td>
                      <td className="py-3 px-3 font-bold text-gray-900 text-xs">
                        ₹{order.totalAmount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-3">
                        <div className="relative inline-flex items-center">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                            className={`text-xs font-bold pl-2.5 pr-6 py-1 rounded-full border cursor-pointer focus:outline-hidden appearance-none ${currentStatus.bg} ${currentStatus.text} ${currentStatus.border}`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          <i className="fa-solid fa-chevron-down absolute right-2 text-[9px] pointer-events-none opacity-60" />
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <Link
                          href="/admin/orders"
                          className="text-xs text-gray-500 hover:text-black font-semibold no-underline inline-flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <i className="fa-solid fa-eye text-[10px]" />
                          <span>Details</span>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Quick Product Highlights */}
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs p-5 sm:p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                <i className="fa-solid fa-gem text-purple-600 text-sm" />
                <span>Catalog Highlights</span>
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">Live store items</p>
            </div>
            <Link
              href="/admin/products"
              className="text-xs font-bold text-[#A84218] hover:text-[#8F3510] no-underline inline-flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-orange-50 transition-colors"
            >
              <span>Manage</span>
              <i className="fa-solid fa-arrow-right text-[10px]" />
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {products.slice(0, 5).map((prod) => (
              <div
                key={prod.id}
                className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200/80 shadow-2xs">
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-gray-900 truncate">
                    {prod.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-extrabold text-emerald-700">
                      ₹{prod.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-gray-500 truncate bg-gray-100 px-2 py-0.5 rounded-full">
                      {prod.category}
                    </span>
                  </div>
                </div>
                {prod.bestseller && (
                  <span className="text-[9.5px] bg-[#1E132A] text-amber-300 px-2 py-0.5 rounded-full font-bold shrink-0 flex items-center gap-1 shadow-2xs">
                    <i className="fa-solid fa-star text-[8px]" />
                    <span>Best</span>
                  </span>
                )}
              </div>
            ))}
          </div>

          <Link
            href="/admin/products"
            className="mt-auto pt-4 text-center text-xs font-bold text-[#2A1D38] hover:text-[#A84218] no-underline block border-t border-gray-100 transition-colors"
          >
            <i className="fa-solid fa-plus-circle text-xs mr-1 text-[#A84218]" />
            <span>Manage All {products.length} Products</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
