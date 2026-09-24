'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { products } from '@/lib/placeholder-data';
import { printIsolatedTaxInvoice, downloadStandaloneTaxInvoice } from '@/lib/invoice';
import { useLocale } from '@/context/CurrencyContext';

export default function MyOrdersPage() {
  const { formatPrice } = useLocale();
  const [activeTab, setActiveTab] = useState<'all' | 'in-progress' | 'completed'>('all');
  const [storedOrder, setStoredOrder] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('last_order');
      if (saved) {
        try {
          setStoredOrder(JSON.parse(saved));
        } catch {
          // ignore
        }
      }
    }
  }, []);

  const sampleOrders = [
    {
      id: mounted && storedOrder?.orderId ? storedOrder.orderId : 'FS-849428',
      date: mounted && storedOrder?.date ? storedOrder.date : '14 Sept 2026',
      status: 'Dispatched',
      estimatedDelivery: 'Arriving 18–22 Sept 2026',
      courier: 'BlueDart Express',
      trackingNumber: 'IND984210984IN',
      shopName: 'Miracle Feng Shui Studio',
      items: storedOrder?.items || [
        {
          id: '1',
          product: products[0],
          quantity: 1,
        },
      ],
      total: storedOrder?.total || 2430,
      paymentMethod: storedOrder?.paymentMethod || 'Card ending in 4444',
      shippingAddress: storedOrder?.address || 'Infopark-1, Gurgaon, Haryana 122009',
    },
    {
      id: 'FS-710294',
      date: '28 Aug 2026',
      status: 'Delivered',
      estimatedDelivery: 'Delivered on 1 Sept 2026',
      courier: 'Delhivery Insured',
      trackingNumber: 'IND782190342IN',
      shopName: 'Zen Artisan Atelier',
      items: [
        {
          id: '2',
          product: products[1],
          quantity: 1,
        },
      ],
      total: 699,
      paymentMethod: 'UPI (leninassociates17@gmail.com)',
      shippingAddress: 'Infopark-1, Gurgaon, Haryana 122009',
    },
  ];

  const filteredOrders =
    activeTab === 'all'
      ? sampleOrders
      : activeTab === 'in-progress'
      ? sampleOrders.filter((o) => o.status === 'Dispatched' || o.status === 'Processing')
      : sampleOrders.filter((o) => o.status === 'Delivered');

  return (
    <div className="bg-[#FAF9F7] min-h-[calc(100vh-140px)] pb-24 text-[#111111]">
      <div className="etsy-container py-8 sm:py-12 max-w-[960px]">
        {/* Minimal Editorial Page Header */}
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8">
          <div>
            <h1 className="text-[26px] sm:text-[32px] font-sans font-semibold text-[#111111] tracking-tight">
              Purchases &amp; Orders
            </h1>
            <p className="text-[13.5px] text-gray-500 mt-1">
              Track active dispatches, reorder favorites, and manage tax receipts.
            </p>
          </div>

          <Link
            href="/shop"
            className="text-[13px] font-medium text-[#111111] hover:underline flex items-center gap-1.5"
          >
            <span>Continue shopping</span>
            <span>&rarr;</span>
          </Link>
        </div>

        {/* Minimal Clean Tabs */}
        <div className="flex items-center gap-6 border-b border-gray-200 pb-2 mb-8 text-[13.5px]">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`pb-2 font-medium transition-colors cursor-pointer relative ${
              activeTab === 'all'
                ? 'text-[#111111] font-semibold after:absolute after:bottom-[-9px] after:left-0 after:right-0 after:h-[2px] after:bg-[#111111]'
                : 'text-gray-500 hover:text-[#111111]'
            }`}
          >
            All orders ({sampleOrders.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('in-progress')}
            className={`pb-2 font-medium transition-colors cursor-pointer relative ${
              activeTab === 'in-progress'
                ? 'text-[#111111] font-semibold after:absolute after:bottom-[-9px] after:left-0 after:right-0 after:h-[2px] after:bg-[#111111]'
                : 'text-gray-500 hover:text-[#111111]'
            }`}
          >
            In progress (1)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('completed')}
            className={`pb-2 font-medium transition-colors cursor-pointer relative ${
              activeTab === 'completed'
                ? 'text-[#111111] font-semibold after:absolute after:bottom-[-9px] after:left-0 after:right-0 after:h-[2px] after:bg-[#111111]'
                : 'text-gray-500 hover:text-[#111111]'
            }`}
          >
            Completed (1)
          </button>
        </div>

        {/* Orders List (Minimal & Standard Luxury) */}
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-gray-200/90 rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all hover:border-gray-300"
            >
              {/* Structured Metadata Header Bar */}
              <div className="bg-[#FBFBFA] border-b border-gray-100 px-6 py-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[12.5px]">
                  <div>
                    <span className="block text-gray-400 font-medium uppercase tracking-wider text-[10.5px]">
                      Order placed
                    </span>
                    <span className="font-medium text-[#111111]">{order.date}</span>
                  </div>

                  <div>
                    <span className="block text-gray-400 font-medium uppercase tracking-wider text-[10.5px]">
                      Total
                    </span>
                    <span className="font-semibold text-[#111111]">
                      {formatPrice(order.total)}
                    </span>
                  </div>

                  <div>
                    <span className="block text-gray-400 font-medium uppercase tracking-wider text-[10.5px]">
                      Ship to
                    </span>
                    <span className="font-medium text-[#111111] truncate block max-w-[150px]">
                      {order.shippingAddress}
                    </span>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="block text-gray-400 font-medium uppercase tracking-wider text-[10.5px]">
                      Order #{order.id}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        printIsolatedTaxInvoice({
                          orderId: order.id,
                          orderDate: order.date,
                          customerName: storedOrder?.customerName || 'Valued Customer',
                          deliveryAddress: order.shippingAddress,
                          paymentMethod: order.paymentMethod,
                          paymentStatus: 'Paid',
                          totalAmount: order.total,
                          items: order.items.map((it: any) => ({
                            name: it.product?.title || it.product?.name || it.title || 'Feng Shui Sacred Item',
                            quantity: it.quantity || 1,
                            price: it.product?.price || it.price || 0,
                            maker: it.product?.maker || order.shopName,
                          })),
                        })
                      }
                      className="font-medium text-[#111111] hover:underline cursor-pointer text-[12px]"
                    >
                      View invoice
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Status & Item Body */}
              <div className="p-6 sm:p-7 space-y-6">
                {/* Live Delivery Status Indicator */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`inline-block w-2.5 h-2.5 rounded-full ${
                        order.status === 'Delivered' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                    />
                    <span className="font-semibold text-[15px] text-[#111111]">
                      {order.estimatedDelivery}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[12.5px] text-gray-500">
                    <span>
                      {order.courier}:{' '}
                      <strong className="text-[#111111] font-mono">{order.trackingNumber}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => alert(`Tracking ${order.trackingNumber}: Package in transit via ${order.courier}`)}
                      className="text-[#111111] font-medium hover:underline cursor-pointer"
                    >
                      Track
                    </button>
                  </div>
                </div>

                {/* Items in this Order */}
                <div className="divide-y divide-gray-100">
                  {order.items.map((it: any, idx: number) => (
                    <div
                      key={idx}
                      className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start justify-between gap-5"
                    >
                      <div className="flex gap-4 sm:gap-5 flex-grow">
                        <Link
                          href={`/product/${it.product.id}`}
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-50 border border-gray-200/80 shrink-0 block group"
                        >
                          <img
                            src={it.product.images[0]}
                            alt={it.product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </Link>

                        <div className="space-y-1.5 flex-grow">
                          <span className="text-[12px] text-gray-500 font-medium block">
                            Sold by {order.shopName}
                          </span>
                          <Link
                            href={`/product/${it.product.id}`}
                            className="text-[14.5px] sm:text-[15.5px] font-medium text-[#111111] hover:underline line-clamp-2 leading-snug"
                          >
                            {it.product.name}
                          </Link>
                          <div className="flex items-center gap-3 text-[13px] pt-0.5">
                            <span className="font-semibold text-[#111111]">
                              {formatPrice(it.product.price * it.quantity)}
                            </span>
                            <span className="text-gray-400">&bull;</span>
                            <span className="text-gray-500">Qty: {it.quantity}</span>
                          </div>
                        </div>
                      </div>

                      {/* Clean Minimal Action Buttons */}
                      <div className="flex flex-row sm:flex-col items-center sm:items-stretch gap-2 w-full sm:w-[160px] pt-1 sm:pt-0 shrink-0">
                        <Link
                          href={`/product/${it.product.id}`}
                          style={{ color: '#ffffff', backgroundColor: '#111111' }}
                          className="flex-1 sm:flex-none text-center px-4 py-2.5 bg-[#111111] hover:bg-black text-white text-[13px] font-semibold rounded-xl transition-all shadow-xs no-underline flex items-center justify-center"
                        >
                          Buy again
                        </Link>
                        <button
                          type="button"
                          onClick={() => alert('Review dialog opened. Thank you for your feedback!')}
                          className="flex-1 sm:flex-none text-center px-4 py-2 border border-gray-200 hover:border-gray-400 text-[#111111] text-[12.5px] font-medium rounded-xl transition-colors bg-white cursor-pointer"
                        >
                          Write a review
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Minimal Footer Row: Contact Shop & Invoice */}
                <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-[12.5px]">
                  <button
                    type="button"
                    onClick={() => alert(`Contacting ${order.shopName}...`)}
                    className="text-gray-500 hover:text-[#111111] hover:underline cursor-pointer"
                  >
                    Need help with this order? Contact shop
                  </button>

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => alert(`Downloading Certificate of Authenticity for Order #${order.id}...`)}
                      className="text-gray-600 hover:text-[#111111] hover:underline cursor-pointer"
                    >
                      Certificate of Authenticity
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      type="button"
                      onClick={() =>
                        downloadStandaloneTaxInvoice({
                          orderId: order.id,
                          orderDate: order.date,
                          customerName: storedOrder?.customerName || 'Valued Customer',
                          deliveryAddress: order.shippingAddress,
                          paymentMethod: order.paymentMethod,
                          paymentStatus: 'Paid',
                          totalAmount: order.total,
                          items: order.items.map((it: any) => ({
                            name: it.product?.title || it.product?.name || it.title || 'Feng Shui Sacred Item',
                            quantity: it.quantity || 1,
                            price: it.product?.price || it.price || 0,
                            maker: it.product?.maker || order.shopName,
                          })),
                        })
                      }
                      className="text-gray-600 hover:text-[#111111] hover:underline cursor-pointer"
                    >
                      Download Invoice (PDF)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
