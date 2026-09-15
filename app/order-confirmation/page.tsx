'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface OrderData {
  orderId: string;
  date: string;
  email: string;
  fullName: string;
  address: string;
  phoneNumber: string;
  paymentMethod: string;
  items: Array<{
    id: string;
    product: {
      id: string;
      name: string;
      price: number;
      maker: string;
      images: string[];
    };
    quantity: number;
  }>;
  total: number;
}

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('last_order');
      if (stored) {
        try {
          setOrder(JSON.parse(stored));
        } catch {
          // fallback
        }
      }
    }
  }, []);

  const orderId = order?.orderId || 'FS-849201';
  const orderDate =
    order?.date ||
    new Date().toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  const customerName = order?.fullName || 'Amina Ashraf';
  const deliveryAddress =
    order?.address ||
    'B-583 Adjacent Park Plaza, Sushant Lok Phase-I, Gurgaon, Haryana 122009, India';
  const totalAmount = order?.total || 2430;

  return (
    <div className="bg-[#FAF9F5]/40 min-h-[calc(100vh-140px)] pb-24 text-[#222222]">
      {/* MAIN ORDER CONFIRMATION CONTENT */}
      <main className="etsy-container max-w-[760px] py-8 sm:py-12">
        {/* SUCCESS HERO BANNER */}
        <div className="bg-white border border-[#E1E3DF] rounded-[24px] p-6 sm:p-10 shadow-xs text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-[#E8F5E9] text-[#0F6C34] flex items-center justify-center mx-auto shadow-sm">
            <i className="fa-solid fa-circle-check text-[34px] text-emerald-600" />
          </div>

          <div className="space-y-1.5">
            <h1 className="text-[26px] sm:text-[32px] font-serif font-normal text-[#111111] tracking-tight">
              Thank you for your order, {customerName}!
            </h1>
            <p className="text-[14px] text-[#595959]">
              We sent an order confirmation and receipt to{' '}
              <strong className="text-[#111111]">{order?.email || 'amina.ashraf@example.com'}</strong>.
            </p>
          </div>

          {/* SACRED FENG SHUI BLESSING CARD - SLEEK BLACK LUXURY */}
          <div className="bg-[#111111] text-white p-6 sm:p-8 rounded-2xl border border-white/10 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-left">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-amber-400/30 bg-white/5 flex items-center justify-center text-amber-400 shrink-0 shadow-xs">
                <i className="fa-solid fa-om text-[20px]" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 bg-amber-400/15 px-2.5 py-0.5 rounded-full border border-amber-400/25">
                    Sacred Consecration
                  </span>
                </div>
                <h2 className="text-[17px] sm:text-[20px] font-serif font-normal text-white tracking-tight">
                  A Sacred Feng Shui Blessing for Your Space
                </h2>
                <p className="text-[13px] sm:text-[14px] text-neutral-300 italic max-w-xl leading-relaxed">
                  &ldquo;May this sacred piece invite continuous wealth flow, peace, and positive vibrant energy into your home and sanctuary.&rdquo;
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => alert(`Downloading Consecration Certificate #FS-${orderId}.pdf`)}
                className="flex-1 sm:flex-none px-4 py-2.5 border border-white/30 text-white hover:border-white text-[11.5px] font-bold tracking-wider uppercase hover:bg-white hover:text-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-certificate text-amber-400 text-[12px]" />
                <span>Certificate</span>
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-white text-black text-[11.5px] font-bold tracking-wider uppercase hover:bg-gray-100 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <i className="fa-solid fa-file-invoice text-[12px]" />
                <span>Invoice</span>
              </button>
            </div>
          </div>

          {/* ORDER KEY METADATA */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 py-4 border-y border-[#E1E3DF] text-left text-[13px]">
            <div>
              <span className="text-[#595959] block text-[12px]">Order Number</span>
              <span className="font-bold text-[#111111] text-[14px]">#{orderId}</span>
            </div>
            <div>
              <span className="text-[#595959] block text-[12px]">Order Date</span>
              <span className="font-semibold text-[#111111]">{orderDate}</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[#595959] block text-[12px]">Estimated Delivery</span>
              <span className="font-semibold text-[#0F6C34] flex items-center gap-1">
                <i className="fa-solid fa-truck-fast text-[11px]" />
                <span>2–4 Business Days</span>
              </span>
            </div>
          </div>

          {/* SHIPPING & PAYMENT DETAILS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-[13px]">
            <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-[#E1E3DF]">
              <div className="flex items-center gap-2 font-bold text-[#111111] mb-1.5">
                <i className="fa-solid fa-location-dot text-[#595959] text-[13px]" />
                <span>Shipping Address</span>
              </div>
              <p className="text-[#595959] leading-relaxed">{deliveryAddress}</p>
            </div>

            <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-[#E1E3DF]">
              <div className="flex items-center gap-2 font-bold text-[#111111] mb-1.5">
                <i className="fa-solid fa-credit-card text-[#595959] text-[13px]" />
                <span>Payment Method</span>
              </div>
              <p className="text-[#595959] font-medium">
                {order?.paymentMethod || 'Card ending in 4444'}
              </p>
              <p className="text-[#0F6C34] text-[12px] font-semibold mt-1">
                ✓ Paid in full (₹ {totalAmount.toLocaleString('en-IN')})
              </p>
            </div>
          </div>

          {/* ITEMS SUMMARY */}
          <div className="text-left space-y-3 pt-2">
            <h3 className="font-bold text-[14.5px] text-[#111111]">
              Items in this shipment
            </h3>

            <div className="divide-y divide-[#E1E3DF]">
              {(order?.items || [
                {
                  id: 'sample',
                  product: {
                    id: '4565611181',
                    name: 'Feng Shui Symbol, Fortune Attraction Feng Shui Printable Art, Golden Tap Canvas',
                    price: 2430,
                    maker: 'FengShuiTurkiye',
                    images: [
                      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
                    ],
                  },
                  quantity: 1,
                },
              ]).map((it, idx) => (
                <div
                  key={idx}
                  className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={it.product.images[0]}
                      alt={it.product.name}
                      className="w-14 h-14 rounded-xl object-cover border border-[#E1E3DF] shrink-0"
                    />
                    <div>
                      <p className="font-medium text-[13.5px] text-[#111111] line-clamp-1">
                        {it.product.name}
                      </p>
                      <p className="text-[12px] text-[#595959]">
                        Qty: {it.quantity} • Sold by {it.product.maker}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-[14.5px] text-[#111111] shrink-0">
                    ₹ {(it.product.price * it.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ACTION BUTTONS: CONTINUE SHOPPING & PRINT */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#E1E3DF]">
            <button
              type="button"
              onClick={() => window.print()}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#111111] hover:bg-[#F5F5F1] text-[13px] font-bold text-[#111111] transition-colors flex items-center justify-center gap-2 cursor-pointer bg-white"
            >
              <i className="fa-solid fa-print text-[13px]" />
              <span>Print receipt</span>
            </button>

            <Link
              href="/shop"
              style={{ backgroundColor: '#111111', color: '#FFFFFF' }}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#111111] hover:bg-black text-white text-[13.5px] font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 no-underline"
            >
              <span>Explore more Feng Shui</span>
              <i className="fa-solid fa-arrow-right text-[12px]" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
