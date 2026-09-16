'use client';

import React, { useState, useMemo } from 'react';
import { useStore, StoreOrder, OrderStatus } from '@/context/StoreContext';

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus, deleteOrder } = useStore();

  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingOrder, setViewingOrder] = useState<StoreOrder | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const statusList: ('All' | OrderStatus)[] = [
    'All',
    'Pending',
    'Processing',
    'Shipped',
    'Delivered',
    'Cancelled',
  ];

  const statusBadgeStyle: Record<OrderStatus, string> = {
    Pending: 'bg-[#FEF7EE] text-[#B45309] border border-[#FED7AA]',
    Processing: 'bg-[#F0F5FA] text-[#1D4ED8] border border-blue-200',
    Shipped: 'bg-[#F6F2FC] text-[#6B21A8] border border-purple-200',
    Delivered: 'bg-[#F0F7F5] text-[#115E59] border border-teal-200',
    Cancelled: 'bg-[#FDF4F0] text-[#B91C1C] border border-rose-200',
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesStatus =
        selectedStatus === 'All' || o.status === selectedStatus;
      const matchesQuery =
        !searchQuery ||
        o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.phone.includes(searchQuery);
      return matchesStatus && matchesQuery;
    });
  }, [orders, selectedStatus, searchQuery]);

  return (
    <div className="flex flex-col gap-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#170E22] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-white/20">
          <i className="fa-solid fa-circle-check text-emerald-400 text-lg" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">
            Orders Management ({orders.length})
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Track fulfillment, update order progress, and inspect customer shipping addresses.
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Status Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {statusList.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setSelectedStatus(st)}
              style={selectedStatus === st ? { color: '#ffffff' } : { color: '#374151' }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedStatus === st
                  ? 'bg-[#140D1F] !text-white shadow-xs border border-white/20'
                  : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <span style={selectedStatus === st ? { color: '#ffffff' } : { color: '#374151' }}>{st}</span>
            </button>
          ))}
        </div>

        {/* Search Query */}
        <div className="relative w-full md:w-72">
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
          <input
            type="text"
            placeholder="Search by order #, name, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#A84218]"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/80 text-gray-500 text-[11px] uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="py-3 px-4">Order Details</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Fulfillment Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400 text-sm">
                    No orders found matching the filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-gray-50/70 transition-colors">
                    {/* Order Details */}
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-gray-900 block text-sm">
                        {ord.orderNumber}
                      </span>
                      <span className="text-[11px] text-gray-400 block mt-0.5">
                        {ord.date}
                      </span>
                    </td>

                    {/* Customer Info */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-gray-800 text-sm">
                        {ord.customerName}
                      </div>
                      <div className="text-[11px] text-gray-500">
                        {ord.city}, {ord.state} • {ord.phone}
                      </div>
                    </td>

                    {/* Items */}
                    <td className="py-3.5 px-4 text-gray-700 text-xs">
                      <span className="bg-gray-100 px-2 py-0.5 rounded-md font-medium">
                        {ord.items.reduce((sum, i) => sum + i.quantity, 0)} pcs
                      </span>
                    </td>

                    {/* Total Amount */}
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-gray-900 text-sm block">
                        ₹{ord.totalAmount.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-gray-400 block">
                        {ord.paymentMethod}
                      </span>
                    </td>

                    {/* Fulfillment Status Dropdown */}
                    <td className="py-3.5 px-4">
                      <select
                        value={ord.status}
                        onChange={(e) => {
                          updateOrderStatus(ord.id, e.target.value as OrderStatus);
                          showToast(`Order ${ord.orderNumber} updated to ${e.target.value}`);
                        }}
                        className={`text-xs font-semibold px-3 py-1 rounded-full border cursor-pointer focus:outline-hidden ${
                          statusBadgeStyle[ord.status]
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setViewingOrder(ord)}
                          className="px-3 py-1.5 text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors cursor-pointer"
                        >
                          View Details
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Delete order ${ord.orderNumber}?`)) {
                              deleteOrder(ord.id);
                              showToast('Order removed.');
                            }
                          }}
                          className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
                          title="Delete Order"
                        >
                          <i className="fa-solid fa-trash text-xs" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {viewingOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C2410C]">
                  Order Breakdown
                </span>
                <h3 className="font-bold text-gray-900 text-lg">
                  {viewingOrder.orderNumber}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setViewingOrder(null)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <i className="fa-solid fa-xmark text-base" />
              </button>
            </div>

            {/* Customer Shipping Box */}
            <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-100 text-xs">
              <span className="font-bold text-gray-700 block mb-1">
                Shipping &amp; Contact:
              </span>
              <p className="text-gray-800 font-semibold">{viewingOrder.customerName}</p>
              <p className="text-gray-600">{viewingOrder.address}</p>
              <p className="text-gray-600">
                {viewingOrder.city}, {viewingOrder.state} - {viewingOrder.pincode}
              </p>
              <p className="text-gray-600 mt-1">
                Phone: <span className="font-medium text-gray-900">{viewingOrder.phone}</span> • Email: {viewingOrder.email}
              </p>
            </div>

            {/* Item List */}
            <div className="flex flex-col gap-2.5 max-h-56 overflow-y-auto pr-1">
              <span className="text-xs font-bold text-gray-700">Ordered Items:</span>
              {viewingOrder.items.map((it, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3 p-2.5 rounded-xl border border-gray-100 bg-white"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={it.image}
                      alt={it.productName}
                      className="w-10 h-10 rounded-lg object-cover bg-gray-100 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-900 truncate">
                        {it.productName}
                      </p>
                      <p className="text-[11px] text-gray-400">Qty: {it.quantity}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-900 shrink-0">
                    ₹{(it.price * it.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Total Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-sm">
              <span className="font-medium text-gray-500">Total Order Amount:</span>
              <span className="font-bold text-lg text-emerald-700">
                ₹{viewingOrder.totalAmount.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setViewingOrder(null)}
                style={{ color: '#ffffff' }}
                className="px-5 py-2 text-xs font-bold bg-[#140D1F] hover:bg-[#2B154C] !text-white rounded-xl shadow-xs transition-colors cursor-pointer border border-white/20"
              >
                <span style={{ color: '#ffffff' }}>Close Window</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
