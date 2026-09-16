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

  const statusColors: Record<OrderStatus, string> = {
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
    Processing: 'bg-blue-50 text-blue-700 border-blue-200',
    Shipped: 'bg-purple-50 text-purple-700 border-purple-200',
    Delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Eye-Catching Welcome Banner with Circular Miracle Feng Shui Logo */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#180E25] via-[#28153B] to-[#3D1A40] rounded-2xl p-6 sm:p-7 text-white shadow-md border border-amber-500/20 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Subtle Background Glow Orbs */}
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-purple-500/15 blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          {/* Prominent Circular Logo with Gold Glow */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-amber-400/60 shadow-[0_0_25px_rgba(245,158,11,0.3)] shrink-0 bg-white">
            <img
              src="/images/miracle.jpeg"
              alt="Miracle Feng Shui"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-amber-300 text-[11px] font-bold uppercase tracking-wider">
                Storefront Live &amp; Synced
              </span>
            </div>
            <h1
              style={{ color: '#ffffff' }}
              className="text-2xl sm:text-3xl font-serif font-bold mt-1 tracking-tight !text-white leading-tight"
            >
              Miracle Feng Shui Sanctuary
            </h1>
            <p
              style={{ color: '#e5e7eb' }}
              className="text-gray-200 text-xs sm:text-sm mt-1 max-w-xl font-light"
            >
              Manage your auspicious catalog, orchestrate homepage sections, and fulfill customer blessing orders.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0 relative z-10">
          <Link
            href="/admin/homepage"
            className="bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all border border-white/15 no-underline inline-flex items-center gap-2 shadow-2xs hover:scale-[1.02] active:scale-98"
          >
            <i className="fa-solid fa-layer-group text-amber-300" />
            <span>Customize Homepage</span>
          </Link>
          <Link
            href="/admin/products"
            className="bg-gradient-to-r from-[#A84218] to-[#D75200] hover:from-[#923812] hover:to-[#B84500] text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all shadow-md no-underline inline-flex items-center gap-2 hover:scale-[1.02] active:scale-98"
          >
            <i className="fa-solid fa-plus text-xs" />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      {/* KPI / Metric Cards Grid - Eye-Catching & Standard */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Total Sales */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/70 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 inset-x-0 h-1 bg-emerald-500" />
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Sales</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-indian-rupee-sign text-sm" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
            <div className="text-[11.5px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <i className="fa-solid fa-arrow-trend-up" />
              <span>+18.4% this cycle</span>
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/70 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 inset-x-0 h-1 bg-blue-500" />
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Orders</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-bag-shopping text-sm" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              {orders.length}
            </div>
            <div className="text-[11.5px] text-amber-600 font-medium mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>{pendingOrdersCount} pending fulfillment</span>
            </div>
          </div>
        </div>

        {/* Active Products */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/70 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 inset-x-0 h-1 bg-purple-500" />
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Products</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-box-open text-sm" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              {products.length}
            </div>
            <div className="text-[11.5px] text-gray-500 font-medium mt-1">
              Full CRUD &amp; filter ready
            </div>
          </div>
        </div>

        {/* Homepage Sections */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/70 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 inset-x-0 h-1 bg-amber-500" />
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Homepage Sections</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-layer-group text-sm" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              {activeSectionsCount} / {sections.length}
            </div>
            <div className="text-[11.5px] text-emerald-600 font-medium mt-1">
              Move Up / Down &amp; Toggle
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Hub */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/admin/products"
          className="p-4 bg-white rounded-2xl border border-gray-200/80 shadow-2xs hover:border-amber-400/80 hover:shadow-sm transition-all no-underline flex items-center gap-3.5 group"
        >
          <div className="w-11 h-11 rounded-xl bg-orange-50 text-[#A84218] flex items-center justify-center text-lg group-hover:scale-105 transition-transform">
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
          className="p-4 bg-white rounded-2xl border border-gray-200/80 shadow-2xs hover:border-amber-400/80 hover:shadow-sm transition-all no-underline flex items-center gap-3.5 group"
        >
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-[#2A1D38] flex items-center justify-center text-lg group-hover:scale-105 transition-transform">
            <i className="fa-solid fa-arrows-up-down" />
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
          className="p-4 bg-white rounded-2xl border border-gray-200/80 shadow-2xs hover:border-amber-400/80 hover:shadow-sm transition-all no-underline flex items-center gap-3.5 group"
        >
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center text-lg group-hover:scale-105 transition-transform">
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
          className="p-4 bg-white rounded-2xl border border-gray-200/80 shadow-2xs hover:border-amber-400/80 hover:shadow-sm transition-all no-underline flex items-center gap-3.5 group"
        >
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-lg group-hover:scale-105 transition-transform">
            <i className="fa-solid fa-store" />
          </div>
          <div>
            <span className="text-sm font-bold text-gray-900 block group-hover:text-emerald-700 transition-colors">
              Public Storefront
            </span>
            <span className="text-xs text-gray-500">Preview live changes</span>
          </div>
        </Link>
      </div>

      {/* Two Column Grid: Recent Orders & Quick Product Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200/80 shadow-2xs p-5 sm:p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900">Recent Customer Orders</h2>
              <p className="text-xs text-gray-500">Live order management &amp; status tracking</p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-semibold text-[#A84218] hover:underline no-underline inline-flex items-center gap-1"
            >
              <span>View All Orders</span>
              <i className="fa-solid fa-arrow-right text-[10px]" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-3 rounded-l-lg">Order</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Items</th>
                  <th className="py-2.5 px-3">Total</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 rounded-r-lg text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3 px-3 font-semibold text-gray-900">
                      {order.orderNumber}
                    </td>
                    <td className="py-3 px-3 text-gray-700">
                      <div className="font-medium">{order.customerName}</div>
                      <div className="text-[11px] text-gray-400">{order.city}</div>
                    </td>
                    <td className="py-3 px-3 text-gray-600">
                      {order.items.length} item{order.items.length > 1 ? 's' : ''}
                    </td>
                    <td className="py-3 px-3 font-bold text-gray-900">
                      ₹{order.totalAmount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-3">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border cursor-pointer focus:outline-hidden ${
                          statusColors[order.status]
                        }`}
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
                        className="text-xs text-gray-500 hover:text-black font-medium no-underline"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Quick Product Highlights */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs p-5 sm:p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900">Catalog Highlights</h2>
              <p className="text-xs text-gray-500">Live products in store</p>
            </div>
            <Link
              href="/admin/products"
              className="text-xs font-semibold text-[#A84218] hover:underline no-underline inline-flex items-center gap-1"
            >
              <span>Manage</span>
              <i className="fa-solid fa-arrow-right text-[10px]" />
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {products.slice(0, 5).map((prod) => (
              <div
                key={prod.id}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-gray-900 truncate">
                    {prod.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-bold text-emerald-700">
                      ₹{prod.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-gray-400 truncate">
                      {prod.category}
                    </span>
                  </div>
                </div>
                {prod.bestseller && (
                  <span className="text-[9px] bg-[#1E132A] text-amber-300 px-2 py-0.5 rounded-full font-semibold shrink-0">
                    Bestseller
                  </span>
                )}
              </div>
            ))}
          </div>

          <Link
            href="/admin/products"
            className="mt-auto pt-4 text-center text-xs font-semibold text-[#2A1D38] hover:text-[#A84218] no-underline block border-t border-gray-100"
          >
            + Add or Edit All {products.length} Products
          </Link>
        </div>
      </div>
    </div>
  );
}
