'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useLocale } from '@/context/CurrencyContext';
import {
  TaxInvoiceData,
  printIsolatedTaxInvoice,
  downloadStandaloneTaxInvoice,
} from '@/lib/invoice';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  maker?: string;
  sku?: string;
  variant?: string;
}

interface OrderData {
  id?: string;
  orderId?: string;
  orderNumber?: string;
  date?: string;
  createdAt?: string;
  email?: string;
  fullName?: string;
  customerName?: string;
  address?: string;
  phoneNumber?: string;
  phone?: string;
  paymentMethod?: string;
  paymentStatus?: string;
  status?: string;
  total?: number;
  totalAmount?: number;
  shippingAddress?: {
    name?: string;
    phone?: string;
    email?: string;
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    pincode?: string;
    country?: string;
  } | string;
  items?: Array<{
    id?: string;
    title?: string;
    productName?: string;
    price?: number;
    quantity?: number;
    image?: string;
    sku?: string;
    variant?: string;
    product?: {
      id?: string;
      name?: string;
      title?: string;
      price?: number;
      maker?: string;
      images?: string[];
      sku?: string;
    };
  }>;
}

export default function OrderConfirmationPage() {
  const { data: session } = useSession();
  const { formatPrice, currency } = useLocale();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [showHelpModal, setShowHelpModal] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('last_order');
      if (stored) {
        try {
          setOrder(JSON.parse(stored));
        } catch {
          // ignore parsing error
        }
      }
    }
  }, []);

  // Compute dynamic order fields
  const orderId =
    order?.orderNumber ||
    order?.orderId ||
    (order?.id ? `MFS-${order.id.slice(-6).toUpperCase()}` : 'MFS-594233');

  // Format ordered date and expected delivery date
  const now = new Date();
  const rawDate = order?.createdAt ? new Date(order.createdAt) : now;
  const orderedDateStr = rawDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const deliveryStart = new Date(rawDate);
  deliveryStart.setDate(rawDate.getDate() + 4);
  const deliveryEnd = new Date(rawDate);
  deliveryEnd.setDate(rawDate.getDate() + 8);

  const deliveryRangeStr = `${deliveryStart.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })} - ${deliveryEnd.toLocaleDateString('en-US', {
    day: 'numeric',
  })}`;

  const fullOrderDate =
    order?.date ||
    rawDate.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  // Resolve customer name dynamically
  const customerName =
    order?.customerName ||
    order?.fullName ||
    (typeof order?.shippingAddress === 'object' ? order?.shippingAddress?.name : undefined) ||
    session?.user?.name ||
    (session?.user?.email ? session.user.email.split('@')[0] : 'Valued Customer');

  const customerEmail =
    order?.email ||
    (typeof order?.shippingAddress === 'object' ? order?.shippingAddress?.email : undefined) ||
    session?.user?.email ||
    '';

  const customerPhone =
    order?.phone ||
    order?.phoneNumber ||
    (typeof order?.shippingAddress === 'object' ? order?.shippingAddress?.phone : undefined) ||
    '';

  const shippingAddrObj =
    typeof order?.shippingAddress === 'object' && order?.shippingAddress
      ? order.shippingAddress
      : null;

  const deliveryAddress =
    typeof order?.address === 'string' && order.address.trim()
      ? order.address
      : shippingAddrObj
      ? `${shippingAddrObj.line1 || ''}${
          shippingAddrObj.line2 ? ', ' + shippingAddrObj.line2 : ''
        }, ${shippingAddrObj.city || ''}, ${shippingAddrObj.state || ''} - ${
          shippingAddrObj.pincode || ''
        }, ${shippingAddrObj.country || 'India'}`
      : 'Address provided at checkout';

  const totalAmount = order?.totalAmount ?? order?.total ?? 0;

  const paymentMethod =
    order?.paymentMethod === 'COD' || order?.paymentMethod === 'Cash on Delivery'
      ? 'Cash on Delivery'
      : order?.paymentMethod === 'RAZORPAY' || order?.paymentMethod === 'UPI / Online Payment'
      ? 'UPI / Online Payment'
      : order?.paymentMethod || 'Cash on Delivery';

  const paymentStatus =
    order?.paymentStatus ||
    (paymentMethod === 'Cash on Delivery' ? 'Pay on Delivery' : 'Paid in Full');

  // Normalize items array
  const items: OrderItem[] =
    order?.items && order.items.length > 0
      ? order.items.map((item, idx) => ({
          id: item.id || String(idx),
          name:
            item.title ||
            item.productName ||
            item.product?.name ||
            item.product?.title ||
            'COPPER DOUBLE DRAGON BAGUA QILIN FENG SHUI HOME',
          price: item.price ?? item.product?.price ?? 1845,
          quantity: item.quantity || 1,
          image:
            item.image ||
            item.product?.images?.[0] ||
            'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
          maker: item.product?.maker || 'Miracle Feng Shui Studio',
          sku: item.sku || item.product?.sku || `1806790${900 + idx}`,
          variant: item.variant || 'TERRACOTTA / NATURAL GOLD',
        }))
      : [
          {
            id: 'item-1',
            name: 'COPPER DOUBLE DRAGON BAGUA QILIN FENG SHUI HOME',
            price: totalAmount,
            quantity: 1,
            image:
              'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
            maker: 'Miracle Feng Shui Studio',
            sku: '1806790900',
            variant: 'TERRACOTTA / NATURAL GOLD',
          },
        ];

  const totalItemCount = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const gstAmount = Math.round((totalAmount * 18) / 118);
  const subtotalAmount = totalAmount - gstAmount;

  const invoiceData: TaxInvoiceData = {
    orderId,
    orderDate: fullOrderDate,
    customerName,
    customerEmail,
    customerPhone,
    deliveryAddress,
    paymentMethod,
    paymentStatus,
    totalAmount,
    items,
  };

  return (
    <div className="w-full bg-white min-h-[calc(100vh-140px)] flex flex-col items-center py-10 sm:py-14 px-4 sm:px-6 pb-28 text-[#222222] font-sans antialiased">
      {/* ETSY REFERENCE 1 CONTAINER: STRICT HORIZONTAL CENTERING */}
      <div className="w-full max-w-[620px] flex flex-col items-center mx-auto">
        
        {/* CELEBRATION HEADER (Stars + Woohoo) */}
        <div className="w-full text-center mb-7">
          <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 mb-2.5">
            <div className="flex items-center gap-1 text-[#E6A024] select-none text-[18px] sm:text-[22px] -rotate-6">
              <span>★</span>
              <span className="text-[13px] sm:text-[15px] -mt-2">★</span>
            </div>

            <h1 className="text-[24px] sm:text-[30px] font-bold text-[#222222] tracking-tight leading-tight">
              Woohoo! Your order is confirmed.
            </h1>

            <div className="flex items-center gap-1 text-[#E6A024] select-none text-[18px] sm:text-[22px] rotate-6">
              <span className="text-[13px] sm:text-[15px] -mt-2">★</span>
              <span>★</span>
            </div>
          </div>

          <p className="text-[14px] text-[#222222] leading-relaxed max-w-[480px] mx-auto">
            <span className="font-semibold underline cursor-pointer hover:text-black">
              Miracle Feng Shui Studio
            </span>{' '}
            will start working on this right away.
            <br />
            We&apos;ll email you as soon as it ships.
          </p>
        </div>

        {/* 3-STEP TIMELINE TRACKER */}
        <div className="w-full max-w-[480px] mx-auto my-6 px-4">
          <div className="relative flex items-center justify-between">
            {/* Horizontal Line connecting nodes */}
            <div className="absolute left-3 right-3 top-[10px] h-[2px] bg-[#222222] -z-0" />

            {/* Step 1: Ordered (Solid dark circle with checkmark) */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-5 h-5 rounded-full bg-[#222222] text-white flex items-center justify-center text-[10px] ring-4 ring-white">
                <i className="fa-solid fa-check text-[9px]" />
              </div>
              <div className="mt-2 text-center">
                <p className="text-[12px] font-bold text-[#222222] leading-tight">Ordered</p>
                <p className="text-[11px] text-[#595959] leading-tight mt-0.5">on {orderedDateStr}</p>
              </div>
            </div>

            {/* Step 2: Ready to ship (Hollow circle) */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-5 h-5 rounded-full bg-white border-2 border-[#222222] ring-4 ring-white" />
              <div className="mt-2 text-center">
                <p className="text-[12px] font-medium text-[#222222] leading-tight">Ready to ship</p>
                <p className="text-[11px] text-transparent select-none leading-tight mt-0.5">.</p>
              </div>
            </div>

            {/* Step 3: Expected delivery (Hollow circle) */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-5 h-5 rounded-full bg-white border-2 border-[#222222] ring-4 ring-white" />
              <div className="mt-2 text-center">
                <p className="text-[12px] font-medium text-[#222222] leading-tight">Expected delivery</p>
                <p className="text-[11px] text-[#595959] leading-tight mt-0.5">{deliveryRangeStr}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ACTION BUTTON & TAX INVOICE LINKS */}
        <div className="w-full text-center my-5 space-y-3">
          {/* Main "View your order" dark pill button - explicitly white text on black background */}
          <div>
            <Link
              href="/my-orders"
              style={{ backgroundColor: '#222222', color: '#FFFFFF' }}
              className="inline-block px-9 py-3 rounded-full text-white text-[13.5px] font-semibold hover:opacity-90 transition-all shadow-xs no-underline"
            >
              View your order
            </Link>
          </div>

          {/* Secondary standalone invoice download & print actions */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => downloadStandaloneTaxInvoice(invoiceData)}
              className="px-4 py-2 rounded-full border border-[#DEDEDE] hover:border-[#222222] bg-white text-[#222222] text-[12px] font-medium transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
            >
              <i className="fa-solid fa-arrow-down-to-bracket text-[11px]" />
              <span>Download Invoice</span>
            </button>

            <button
              type="button"
              onClick={() => printIsolatedTaxInvoice(invoiceData)}
              className="px-4 py-2 rounded-full border border-[#DEDEDE] hover:border-[#222222] bg-white text-[#222222] text-[12px] font-medium transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
            >
              <i className="fa-solid fa-print text-[11px]" />
              <span>Print Receipt</span>
            </button>
          </div>

          <p className="text-[12px] text-[#595959] max-w-[460px] mx-auto leading-relaxed pt-1">
            Delivery times are estimated. If you&apos;re experiencing difficulty with this order,
            please{' '}
            <button
              type="button"
              onClick={() => setShowHelpModal(true)}
              className="underline text-[#222222] hover:text-black font-medium cursor-pointer"
            >
              contact the seller
            </button>
            .{' '}
            <Link href="/help" className="underline text-[#222222] hover:text-black font-medium">
              See more info.
            </Link>
          </p>
        </div>

        {/* ORDER DETAILS SECTION */}
        <div className="w-full mt-8 mb-10">
          <div className="text-center mb-4">
            <h2 className="text-[21px] font-bold text-[#222222] tracking-tight">Order details</h2>
            <p className="text-[13px] text-[#595959] mt-0.5">
              Confirmation number:{' '}
              <span className="font-semibold text-[#222222] underline cursor-pointer">
                {orderId}
              </span>
            </p>
          </div>

          {/* Clean Etsy Box */}
          <div className="w-full bg-white border border-[#E1E3DF] rounded-[8px] overflow-hidden shadow-2xs text-left">
            {/* Products List */}
            <div className="divide-y divide-[#E1E3DF]">
              {items.map((item, idx) => (
                <div key={idx} className="p-4 sm:p-5 flex items-start gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-[6px] object-cover border border-[#E1E3DF] shrink-0 bg-[#FAF9F5]"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-[13.5px] font-bold text-[#222222] uppercase tracking-wide line-clamp-2 leading-snug">
                        {item.name}
                      </h3>
                      <span className="text-[14.5px] font-bold text-[#222222] shrink-0">
                        {formatPrice(item.price)}
                      </span>
                    </div>

                    <div className="mt-1.5 text-[12px] text-[#595959] space-y-0.5">
                      <p>Transaction ID: {item.sku || `180679090${idx + 1}`}</p>
                      <p>QTY: {item.quantity}</p>
                      <p>VARIATION: {item.variant || 'TERRACOTTA / NATURAL GOLD'}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-[#E1E3DF]" />

            {/* 2-Column Info: Shipping Address + Payment Breakdown */}
            <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-6 text-[13px]">
              {/* Left Column: Shipping address */}
              <div>
                <h4 className="text-[13.5px] font-bold text-[#222222] mb-2">Shipping address</h4>
                <div className="text-[#595959] leading-relaxed">
                  <p className="font-semibold text-[#222222]">{customerName}</p>
                  {shippingAddrObj ? (
                    <>
                      <p>{shippingAddrObj.line1}</p>
                      {shippingAddrObj.line2 && <p>{shippingAddrObj.line2}</p>}
                      <p>
                        {shippingAddrObj.city}, {shippingAddrObj.state} {shippingAddrObj.pincode}
                      </p>
                      <p>{shippingAddrObj.country || 'India'}</p>
                    </>
                  ) : (
                    <p>{deliveryAddress}</p>
                  )}
                  {customerPhone && <p className="mt-1">Phone: {customerPhone}</p>}
                </div>
              </div>

              {/* Right Column: Paid with breakdown */}
              <div>
                <h4 className="text-[13.5px] font-bold text-[#222222] mb-2">
                  Paid with {paymentMethod}
                </h4>

                <div className="space-y-1.5 text-[#595959]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-[#222222]">{formatPrice(subtotalAmount)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>{currency === 'AED' ? 'VAT (5% inclusive)' : 'GST (18% inclusive)'}</span>
                    <span className="text-[#222222]">{formatPrice(gstAmount)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-[#222222] font-medium">Free</span>
                  </div>
                </div>

                <div className="border-t border-[#E1E3DF] mt-3.5 pt-2.5 flex items-baseline justify-between">
                  <span className="text-[13.5px] font-bold text-[#222222]">
                    Total ({totalItemCount} {totalItemCount === 1 ? 'item' : 'items'})
                  </span>
                  <span className="text-[20px] font-bold text-[#222222]">
                    {formatPrice(totalAmount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Carbon Emissions Bar at Bottom of Box */}
            <div className="bg-[#FAF9F5] px-4 py-3 border-t border-[#E1E3DF] flex items-center justify-center gap-2 text-[12px] text-[#595959]">
              <i className="fa-solid fa-seedling text-emerald-700 text-[13px]" />
              <span>Miracle Feng Shui offsets carbon emissions from every delivery</span>
            </div>
          </div>
        </div>

        {/* SHOP INFORMATION SECTION */}
        <div className="w-full mb-12">
          <div className="text-center mb-4">
            <h2 className="text-[21px] font-bold text-[#222222] tracking-tight">
              Shop Information
            </h2>
          </div>

          <div className="w-full bg-white border border-[#E1E3DF] rounded-[8px] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs text-left">
            <div className="flex items-center gap-3.5">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80"
                alt="Tanalee - Studio Director"
                className="w-13 h-13 rounded-full object-cover border border-[#E1E3DF] shrink-0"
              />
              <div>
                <p className="text-[14px] font-bold text-[#222222] leading-tight">Tanalee</p>
                <p className="text-[12px] text-[#595959] leading-tight mt-0.5">
                  Owner of Miracle Feng Shui Studio
                </p>
                <p className="text-[11.5px] text-[#777777] leading-tight mt-0.5">
                  Northern, Kentucky &bull; Gurugram Hub
                </p>
                <div className="flex items-center gap-0.5 text-[#222222] text-[11px] mt-1">
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowHelpModal(true)}
              style={{ backgroundColor: '#222222', color: '#FFFFFF' }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full text-white text-[13px] font-semibold hover:opacity-90 transition-all cursor-pointer shrink-0 shadow-xs"
            >
              Help with order
            </button>
          </div>
        </div>

      </div>

      {/* HELP WITH ORDER MODAL */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-[16px] max-w-[460px] w-full p-6 shadow-2xl border border-[#E1E3DF] relative">
            <button
              type="button"
              onClick={() => setShowHelpModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-[#595959] hover:text-[#222222] hover:bg-[#FAF9F5] transition-colors cursor-pointer"
            >
              <i className="fa-solid fa-xmark text-[16px]" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#FAF9F5] border border-[#E1E3DF] flex items-center justify-center text-[#222222]">
                <i className="fa-solid fa-comments text-[16px]" />
              </div>
              <div>
                <h3 className="font-bold text-[17px] text-[#222222]">Help with Order #{orderId}</h3>
                <p className="text-[12px] text-[#595959]">Miracle Feng Shui Dedicated Support</p>
              </div>
            </div>

            <p className="text-[13px] text-[#595959] leading-relaxed mb-5">
              Have questions about your delivery, customization, or shipping schedule? Our studio
              team responds within 2 business hours.
            </p>

            <div className="space-y-2.5">
              <a
                href={`mailto:care@miraclefengshui.com?subject=Help%20with%20Order%20${orderId}&body=Hello%20Miracle%20Feng%20Shui%20Team,%0A%0AI%20need%20assistance%20with%20my%20order%20${orderId}.`}
                style={{ backgroundColor: '#222222', color: '#FFFFFF' }}
                className="w-full py-3 px-4 rounded-full text-white text-[13px] font-semibold flex items-center justify-center gap-2 no-underline hover:opacity-90 transition-all"
              >
                <i className="fa-solid fa-envelope text-[13px]" />
                <span>Email Support Team</span>
              </a>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                style={{ backgroundColor: '#25D366', color: '#FFFFFF' }}
                className="w-full py-3 px-4 rounded-full text-white text-[13px] font-semibold flex items-center justify-center gap-2 no-underline hover:opacity-90 transition-all"
              >
                <i className="fa-brands fa-whatsapp text-[15px]" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="w-full py-2.5 text-[13px] text-[#595959] hover:text-[#222222] font-medium cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
