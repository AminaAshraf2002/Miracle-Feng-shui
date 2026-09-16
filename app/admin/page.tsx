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
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#2A1D38] via-[#3B2850] to-[#512E4A] rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="text-amber-300 text-xs font-bold uppercase tracking-wider">
            Store Administration
          </span>
          <h1
            style={{ color: '#ffffff' }}
            className="text-2xl sm:text-3xl font-bold mt-1 tracking-tight !text-white"
          >
            Miracle Feng Shui Dashboard
          </h1>
          <p
            style={{ color: '#e5e7eb' }}
            className="text-gray-200 text-sm mt-1 max-w-xl"
          >
            Manage your catalog, reorder homepage sections on the fly, and fulfill customer blessing orders.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            href="/admin/homepage"
            className="bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm px-4 py-2 rounded-xl transition-all border border-white/10 no-underline inline-flex items-center gap-2"
          >
            <i className="fa-solid fa-layer-group text-amber-300" />
            <span>Customize Homepage</span>
          </Link>
          <Link
            href="/admin/products"
            className="bg-[#A84218] hover:bg-[#8F3510] text-white font-medium text-xs sm:text-sm px-4 py-2 rounded-xl transition-all shadow-sm no-underline inline-flex items-center gap-2"
          >
            <i className="fa-solid fa-plus text-xs" />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Sales</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <i className="fa-solid fa-indian-rupee-sign text-sm" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
            <div className="text-[12px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
              <i className="fa-solid fa-arrow-trend-up" />
              <span>Across all orders</span>
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Orders</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <i className="fa-solid fa-bag-shopping text-sm" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              {orders.length}
            </div>
            <div className="text-[12px] text-amber-600 font-medium mt-1">
              {pendingOrdersCount} pending fulfillment
            </div>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Products</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <i className="fa-solid fa-box text-sm" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              {products.length}
            </div>
            <div className="text-[12px] text-gray-500 font-medium mt-1">
              In stock &amp; live in catalog
            </div>
          </div>
        </div>

        {/* Homepage Sections */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Homepage Sections</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <i className="fa-solid fa-layer-group text-sm" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              {activeSectionsCount} / {sections.length}
            </div>
            <div className="text-[12px] text-emerald-600 font-medium mt-1">
              Custom reorderable layout
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Recent Orders & Quick Product Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-2xs p-5 sm:p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Recent Customer Orders</h2>
              <p className="text-xs text-gray-500">Live order management &amp; status tracking</p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-semibold text-[#A84218] hover:underline no-underline"
            >
              View All Orders &rarr;
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
                      <div>{order.customerName}</div>
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
        <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs p-5 sm:p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Featured Products</h2>
              <p className="text-xs text-gray-500">Fast catalog overview</p>
            </div>
            <Link
              href="/admin/products"
              className="text-xs font-semibold text-[#A84218] hover:underline no-underline"
            >
              Manage &rarr;
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {products.slice(0, 5).map((prod) => (
              <div
                key={prod.id}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
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
                  <span className="text-[9px] bg-black text-white px-2 py-0.5 rounded-full font-semibold shrink-0">
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
