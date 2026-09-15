'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { products } from '@/lib/placeholder-data';

export default function MiracleCartPage() {
  const router = useRouter();
  const { items, removeItem, saveForLater, setQty, addItem, subtotal, count } =
    useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [isGift, setIsGift] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      setCouponApplied(true);
    }
  };

  const handleSaveForLater = (itemId: string) => {
    saveForLater(itemId);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const triggerAuth = (mode: 'signin' | 'register') => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('open-auth-modal', { detail: { mode } })
      );
    }
  };

  const relatedRecommendations = products.slice(1, 6);

  return (
    <div className="bg-[#FAF9F5]/40 min-h-screen pb-24 text-[#222222] relative">
      <div className="etsy-container py-6 sm:py-8 max-w-[1200px]">
        {/* Page Title */}
        <h1 className="text-[26px] sm:text-[30px] font-bold text-[#222222] mb-6 tracking-tight">
          Your basket {count > 0 && `(${count})`}
        </h1>

        {/* Save for later toast notification */}
        {saveToast && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-4 py-3 rounded-xl flex items-center justify-between text-[13.5px] font-semibold mb-6 animate-in fade-in slide-in-from-top-1 shadow-xs">
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-bookmark text-emerald-600 text-[14px]" />
              Saved to your favourite items!
            </span>
            <Link href="/favorites" className="underline hover:text-emerald-950 font-bold">
              View favourites →
            </Link>
          </div>
        )}

        {/* EMPTY BASKET STATE */}
        {items.length === 0 ? (
          <div className="py-12 sm:py-16 text-center flex flex-col items-center">
            <h2 className="text-[34px] sm:text-[42px] font-serif font-normal text-[#222222] my-10 tracking-tight">
              Your basket is empty.
            </h2>

            <Link
              href="/shop"
              style={{ backgroundColor: '#222222', color: '#FFFFFF' }}
              className="bg-[#222222] hover:bg-black text-white font-bold text-[15px] px-8 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all inline-block mb-16 no-underline"
            >
              Discover Feng Shui finds
            </Link>

            {/* Climate Note */}
            <div className="flex items-center gap-2.5 text-[13px] text-[#595959]">
              <i className="fa-solid fa-leaf text-[#0F6C34] text-[14px] shrink-0" />
              <span>
                Miracle feng shui invests in climate solutions like electric trucks and carbon offsets for every delivery.{' '}
                <Link href="/shop" className="underline text-[#222222] hover:text-[#0F6C34]">
                  See how
                </Link>
              </span>
            </div>
          </div>
        ) : (
          /* FILLED BASKET LAYOUT (MATCHING EXACT SCREENSHOT 3) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* LEFT: BASKET ITEMS (8 Columns) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white border border-[#E1E3DF] rounded-2xl shadow-xs overflow-hidden">
                {/* Shop Header */}
                <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#E1E3DF]/80">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={items[0]?.product.makerAvatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=60&q=80'}
                      alt={items[0]?.product.maker || 'Shop'}
                      className="w-7 h-7 rounded-full object-cover border border-[#E1E3DF]"
                    />
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[14px] text-[#222222] hover:underline cursor-pointer">
                        {items[0]?.product.maker || 'bodyjewelrydesignart'}
                      </span>
                      <span className="text-[12.5px] text-[#595959]">
                        ★ 4.8 (102)
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-label="More options"
                    className="p-1 rounded-full hover:bg-[#F5F5F1] text-[#595959] cursor-pointer"
                  >
                    <i className="fa-solid fa-ellipsis text-[14px]" />
                  </button>
                </div>

                {/* Line Items List */}
                <div className="divide-y divide-[#E1E3DF]/70">
                  {items.map((item) => (
                    <div key={item.id} className="p-4 sm:p-5">
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start justify-between">
                        {/* Thumbnail & Info */}
                        <div className="flex gap-4">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover border border-[#E1E3DF] shrink-0"
                          />

                          <div className="space-y-1.5">
                            <Link
                              href={`/product/${item.product.id}`}
                              className="text-[14px] sm:text-[15px] font-medium text-[#222222] hover:underline line-clamp-2 leading-snug"
                            >
                              {item.product.name}
                            </Link>

                            {/* Variations Badges (e.g. Color: Gold, Size: 18G-6mm) */}
                            <div className="flex flex-wrap gap-1.5 pt-0.5">
                              <span className="text-[11.5px] text-[#595959] bg-[#F5F5F1] px-2 py-0.5 rounded-md border border-[#E1E3DF]">
                                Color: Gold
                              </span>
                              <span className="text-[11.5px] text-[#595959] bg-[#F5F5F1] px-2 py-0.5 rounded-md border border-[#E1E3DF]">
                                Standard Edition
                              </span>
                            </div>

                            {/* Red Urgency Text */}
                            <p className="text-[12.5px] text-[#A82218] font-medium pt-1">
                              In 493 baskets, 9 bought in the past 24 hours
                            </p>

                            {/* Actions row: Quantity selector + Edit + Save for later + Remove */}
                            <div className="flex flex-wrap items-center gap-3 pt-3">
                              {/* Quantity Dropdown */}
                              <div className="relative">
                                <select
                                  value={item.quantity}
                                  onChange={(e) => setQty(item.id, Number(e.target.value))}
                                  className="appearance-none bg-white border border-[#CCCCCC] hover:border-[#222222] rounded-lg pl-3 pr-7 py-1 text-[13px] font-semibold text-[#222222] focus:outline-none focus:ring-1 focus:ring-[#F1641E] cursor-pointer"
                                >
                                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                    <option key={num} value={num}>
                                      {num}
                                    </option>
                                  ))}
                                </select>
                                <i className="fa-solid fa-chevron-down text-[10px] text-gray-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                              </div>

                              <Link
                                href={`/product/${item.product.id}`}
                                className="text-[13px] font-semibold text-[#222222] hover:underline"
                              >
                                Edit
                              </Link>
                              <button
                                type="button"
                                onClick={() => handleSaveForLater(item.id)}
                                className="text-[13px] font-semibold text-[#222222] hover:underline cursor-pointer"
                              >
                                Save for later
                              </button>
                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className="text-[13px] font-semibold text-[#222222] hover:underline cursor-pointer"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right sm:self-start shrink-0">
                          <span className="text-[17px] sm:text-[18px] font-bold text-[#222222]">
                            ₹ {(item.product.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Postage / Delivery Strip */}
                <div className="bg-[#FAF9F5] border-t border-[#E1E3DF] px-5 py-3 text-[13px] text-[#222222] flex items-center justify-between">
                  <span>
                    <strong>Postage:</strong> Free delivery (Get it by 18–28 Sept)
                  </span>
                </div>
              </div>

              {/* Climate Note */}
              <div className="flex items-center gap-2 text-[13px] text-[#595959] pt-1">
                <i className="fa-solid fa-leaf text-[#0F6C34] text-[13px] shrink-0" />
                <span>
                  Miracle feng shui invests in climate solutions like electric trucks and carbon offsets for every delivery.{' '}
                  <Link href="/shop" className="underline text-[#222222] hover:text-[#0F6C34]">
                    See how
                  </Link>
                </span>
              </div>
            </div>

            {/* RIGHT: ORDER SUMMARY (4 Columns) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white border border-[#E1E3DF] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
                {/* Item(s) total */}
                <div className="flex justify-between items-center text-[15px] text-[#222222]">
                  <span>Item(s) total</span>
                  <span className="font-bold">
                    ₹ {subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Purchase Protection */}
                <div className="flex items-start gap-2 text-[13px] text-[#222222]">
                  <div className="w-4 h-4 rounded-full bg-[#222222] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <i className="fa-solid fa-check text-[10px]" />
                  </div>
                  <div className="leading-snug text-[13px] text-[#222222]">
                    <span>You&apos;re covered with </span>
                    <span className="font-semibold text-[#111111] underline underline-offset-2 decoration-gray-400 hover:text-[#F1641E] cursor-pointer">
                      Miracle Feng Shui Purchase Protection
                    </span>
                  </div>
                </div>

                {/* Delivery */}
                <div className="flex justify-between items-center text-[13.5px] text-[#222222]">
                  <div>
                    <span>Delivery</span>
                    <span className="text-[12px] text-[#595959] block">(To India)</span>
                  </div>
                  <span className="font-semibold text-[#0F6C34]">FREE</span>
                </div>

                {/* Total */}
                <div className="flex justify-between items-baseline text-[17px] font-bold text-[#222222] pt-2 border-t border-[#E1E3DF]">
                  <span>Total ({count} {count === 1 ? 'item' : 'items'})</span>
                  <span>₹ {subtotal.toLocaleString('en-IN')}</span>
                </div>

                {/* Mark as Gift Checkbox */}
                <div className="pt-2">
                  <label className="flex items-center gap-2 text-[13px] text-[#222222] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isGift}
                      onChange={(e) => setIsGift(e.target.checked)}
                      className="w-4 h-4 rounded border-[#CCCCCC] text-[#222222] focus:ring-[#F1641E]"
                    />
                    <span>Mark order as a gift</span>
                    <span className="text-[12px] underline text-[#595959] ml-1">Learn more</span>
                  </label>
                </div>

                {/* Proceed to checkout Primary Button */}
                <button
                  type="button"
                  onClick={() => router.push('/checkout')}
                  style={{ backgroundColor: '#222222', color: '#ffffff' }}
                  className="w-full bg-[#222222] hover:bg-black text-white font-bold text-[14.5px] py-3.5 px-6 rounded-full transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-lock text-[12px]" />
                  <span>Proceed to checkout</span>
                </button>

                {/* Secure options */}
                <div className="space-y-2 pt-1 border-t border-[#E1E3DF]/70 text-left">
                  <div className="flex items-center gap-1.5 text-[12.5px] font-semibold text-[#222222]">
                    <i className="fa-solid fa-lock text-[12px]" />
                    <span>Secure options in checkout</span>
                  </div>

                  <div className="flex items-center gap-2 pt-0.5">
                    <span className="px-2 py-0.5 bg-[#F5F5F1] rounded text-[10px] font-bold text-[#1A1F71] border border-[#E1E3DF]">
                      VISA
                    </span>
                    <span className="px-2 py-0.5 bg-[#F5F5F1] rounded text-[10px] font-bold text-[#EB001B] border border-[#E1E3DF]">
                      mastercard
                    </span>
                    <span className="px-2 py-0.5 bg-[#F5F5F1] rounded text-[10px] font-bold text-[#006FCF] border border-[#E1E3DF]">
                      AMEX
                    </span>
                    <span className="px-2 py-0.5 bg-[#F5F5F1] rounded text-[10px] font-bold text-[#004B8D] border border-[#E1E3DF]">
                      Diners Club
                    </span>
                    <span className="px-2 py-0.5 bg-[#F5F5F1] rounded text-[10px] font-bold text-[#0F6C34] border border-[#E1E3DF]">
                      UPI
                    </span>
                  </div>
                </div>

                {/* Coupon Code */}
                <div className="pt-2 border-t border-[#E1E3DF]/70">
                  {!showCouponInput ? (
                    <button
                      type="button"
                      onClick={() => setShowCouponInput(true)}
                      className="flex items-center gap-1.5 text-[13px] font-bold text-[#0F6C34] hover:underline cursor-pointer"
                    >
                      <i className="fa-solid fa-tag text-[12px]" />
                      <span>Apply coupon code</span>
                    </button>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="w-full px-3 py-1.5 text-[13px] border border-[#E1E3DF] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#F1641E]"
                        />
                        <button
                          type="submit"
                          className="px-3 py-1.5 bg-[#222222] text-white font-bold text-[12px] rounded-xl cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>
                      {couponApplied && (
                        <p className="text-[12px] text-[#0F6C34] font-semibold">
                          ✓ 10% discount coupon applied!
                        </p>
                      )}
                    </form>
                  )}
                </div>

                {/* Tax Disclaimers */}
                <div className="text-[11.5px] text-[#595959] space-y-1 pt-1 leading-relaxed">
                  <p>Local taxes included (where applicable)</p>
                  <p>
                    * Learn more about additional taxes, duties, and fees that may apply
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RELATED ITEMS YOU MAY LIKE */}
        <div className="mt-16 pt-10 border-t border-[#E1E3DF]">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#222222]">
              Related items you may like{' '}
              <span className="text-[12px] font-normal text-[#595959] ml-1">
                Including ads ⓘ
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {relatedRecommendations.map((prod) => (
              <div
                key={prod.id}
                className="bg-white border border-[#E1E3DF] rounded-2xl overflow-hidden p-3 hover:shadow-md transition-shadow flex flex-col justify-between group"
              >
                <div>
                  <div className="aspect-square rounded-xl overflow-hidden bg-[#F5F5F1] mb-2.5 relative">
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <Link
                    href={`/product/${prod.id}`}
                    className="text-[13px] font-medium text-[#222222] hover:underline line-clamp-2 leading-snug"
                  >
                    {prod.name}
                  </Link>
                  <p className="text-[11px] text-[#595959] mt-0.5">
                    ✿ Ad by Miracle feng shui seller
                  </p>
                  <div className="flex items-baseline gap-1.5 mt-2">
                    <span className="text-[14px] font-bold text-[#222222]">
                      ₹ {prod.price.toLocaleString('en-IN')}
                    </span>
                    {prod.originalPrice && (
                      <span className="text-[11px] text-[#757575] line-through">
                        ₹ {prod.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => addItem(prod, 1)}
                  className="mt-3 w-full border border-[#222222] hover:bg-[#F5F5F1] text-[#222222] font-semibold text-[12px] py-1.5 px-2 rounded-full transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <i className="fa-solid fa-plus text-[12px]" />
                  <span>Add to basket</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
