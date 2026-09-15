'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { products } from '@/lib/placeholder-data';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();

  // Active Checkout Step: 1 = Address, 2 = Payment, 3 = Review
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Address Form State
  const [email, setEmail] = useState('amina.ashraf@example.com');
  const [country, setCountry] = useState('India');
  const [fullName, setFullName] = useState('Amina Ashraf');
  const [streetAddress, setStreetAddress] = useState('B-583 Adjacent Park Plaza, Sushant Lok Phase-I');
  const [aptSuite, setAptSuite] = useState('Tower 4, Apt 802');
  const [city, setCity] = useState('Gurgaon');
  const [pincode, setPincode] = useState('122009');
  const [stateName, setStateName] = useState('Haryana');
  const [phoneNumber, setPhoneNumber] = useState('+91 98765 43210');

  // Payment Method State: 'card' | 'upi'
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');
  const [cardHolder, setCardHolder] = useState('Amina Ashraf');
  const [upiId, setUpiId] = useState('amina@okaxis');
  const [isProcessing, setIsProcessing] = useState(false);

  // Default fallback cart items if user navigated to checkout directly
  const checkoutItems =
    items.length > 0
      ? items
      : [
          {
            id: 'default-checkout-item',
            product: {
              ...products[0],
              maker: 'FengShuiTurkiye',
              price: 2430,
              name: 'Feng Shui Symbol, Fortune Attraction Feng Shui Printable Art, Golden Tap Abundance Canvas',
            },
            quantity: 1,
            selectedVariations: { 'Format': 'Instant Download' },
            isGift: false,
          },
        ];

  const totalAmount =
    items.length > 0
      ? subtotal
      : 2430;

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    // Save order data in session/localStorage for the confirmation page
    const orderData = {
      orderId: `FS-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      email,
      fullName,
      address: `${streetAddress}, ${aptSuite ? aptSuite + ', ' : ''}${city}, ${stateName} - ${pincode}, ${country}`,
      phoneNumber,
      paymentMethod: paymentMethod === 'card' ? `Card ending in ${cardNumber.slice(-4)}` : `UPI (${upiId})`,
      items: checkoutItems,
      total: totalAmount,
    };

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('last_order', JSON.stringify(orderData));
    }

    setTimeout(() => {
      if (clearCart) clearCart();
      router.push('/order-confirmation');
    }, 1200);
  };

  return (
    <div className="bg-[#FAF9F5]/40 min-h-[calc(100vh-140px)] pb-20 text-[#222222]">
      {/* SECURE CHECKOUT SUBHEADER BAR */}
      <div className="bg-white border-b border-[#E1E3DF] py-3.5 mb-5">
        <div className="w-full max-w-[430px] mx-auto px-4 flex items-center justify-between">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-[#595959] hover:text-[#222222] transition-colors"
          >
            <i className="fa-solid fa-arrow-left text-[12px]" />
            <span>Return to cart</span>
          </Link>

          <div className="flex items-center gap-1.5 text-[12.5px] font-semibold text-[#0F6C34]">
            <i className="fa-solid fa-lock text-[12px]" />
            <span>256-Bit SSL Encrypted &amp; Consecrated</span>
          </div>
        </div>
      </div>

      {/* COMPACT CHECKOUT CARD (max-w-[430px]) */}
      <main className="w-full max-w-[430px] mx-auto px-4 py-2">
        {/* STEP 1: ENTER AN ADDRESS */}
        {step === 1 && (
          <div className="bg-white border border-[#E1E3DF] rounded-[24px] p-5 sm:p-6 shadow-sm animate-in fade-in duration-200">
            {/* Round Brand Logo matching Sign in / Sign up modal */}
            <div className="flex flex-col items-center mb-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shadow-xs border border-black/10 mb-2">
                <img
                  src="/images/miracle.jpeg"
                  alt="Miracle feng shui"
                  className="w-full h-full object-cover scale-105"
                />
              </div>
              <span className="font-serif text-[17px] sm:text-[18px] font-medium tracking-tight text-[#222222]">
                Miracle feng shui
              </span>
            </div>

            <h1 className="text-[20px] sm:text-[22px] font-bold text-center text-[#222222] mb-5">
              Enter an address
            </h1>

            <form onSubmit={handleAddressSubmit} className="space-y-3.5 text-left">
              {/* Email */}
              <div>
                <label className="text-[12.5px] font-bold text-[#222222] block mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E1E3DF] text-[13.5px] text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#F1641E]"
                />
              </div>

              {/* Sign in Helper Box */}
              <div className="bg-[#FAF9F5] border border-[#E1E3DF] rounded-xl p-3 flex items-center justify-between gap-2.5 text-[12.5px] text-[#222222]">
                <span>Sign in for faster checkout</span>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.dispatchEvent(
                        new CustomEvent('open-auth-modal', { detail: { mode: 'signin' } })
                      );
                    }
                  }}
                  className="px-3 py-1 rounded-full border border-[#222222] hover:bg-white text-[12px] font-bold text-[#222222] transition-colors cursor-pointer shrink-0"
                >
                  Sign in or register
                </button>
              </div>

              {/* Country */}
              <div>
                <label className="text-[12.5px] font-bold text-[#222222] block mb-1">
                  Country <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E1E3DF] text-[13.5px] text-[#222222] bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#F1641E] cursor-pointer"
                  >
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                  <i className="fa-solid fa-chevron-down text-[11px] text-gray-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="text-[12.5px] font-bold text-[#222222] block mb-1">
                  Full name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E1E3DF] text-[13.5px] text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#F1641E]"
                />
              </div>

              {/* Street Address */}
              <div>
                <label className="text-[12.5px] font-bold text-[#222222] block mb-1">
                  Street address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E1E3DF] text-[13.5px] text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#F1641E]"
                />
              </div>

              {/* Apt / Suite / Landmark */}
              <div>
                <label className="text-[12.5px] font-bold text-[#222222] block mb-1">
                  Apt / Suite / Landmark <span className="text-[11.5px] text-gray-500 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={aptSuite}
                  onChange={(e) => setAptSuite(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E1E3DF] text-[13.5px] text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#F1641E]"
                />
              </div>

              {/* City */}
              <div>
                <label className="text-[12.5px] font-bold text-[#222222] block mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E1E3DF] text-[13.5px] text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#F1641E]"
                />
              </div>

              {/* Pincode & State Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[12.5px] font-bold text-[#222222] block mb-1">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E1E3DF] text-[13.5px] text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#F1641E]"
                  />
                </div>

                <div>
                  <label className="text-[12.5px] font-bold text-[#222222] block mb-1">
                    State <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={stateName}
                      onChange={(e) => setStateName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#E1E3DF] text-[13.5px] text-[#222222] bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#F1641E] cursor-pointer"
                    >
                      <option value="Haryana">Haryana</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Punjab">Punjab</option>
                    </select>
                    <i className="fa-solid fa-chevron-down text-[11px] text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Phone number */}
              <div>
                <label className="text-[12.5px] font-bold text-[#222222] block mb-1">
                  Phone number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E1E3DF] text-[13.5px] text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#F1641E]"
                />
              </div>

              {/* Legal Consent Disclaimer */}
              <p className="text-[11px] text-[#595959] leading-relaxed pt-1">
                By choosing &ldquo;Continue,&rdquo; you agree to Miracle feng shui&apos;s Privacy Policy and consent to receiving order confirmations via SMS or WhatsApp. Message and data rates may apply.
              </p>

              {/* 3-Step Progress Bar Indicator */}
              <div className="pt-3 flex items-center justify-between gap-1.5 border-t border-[#E1E3DF]">
                <div className="h-1 flex-1 rounded-full bg-[#222222]" />
                <div className="h-1 flex-1 rounded-full bg-[#E1E3DF]" />
                <div className="h-1 flex-1 rounded-full bg-[#E1E3DF]" />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-1">
                <Link
                  href="/cart"
                  className="px-5 py-2 rounded-full border border-[#222222] hover:bg-[#F5F5F1] text-[13.5px] font-bold text-[#222222] transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  style={{ backgroundColor: '#222222', color: '#FFFFFF' }}
                  className="px-7 py-2 rounded-full bg-[#222222] hover:bg-black text-white text-[14px] font-bold transition-all shadow-sm hover:shadow-md cursor-pointer"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: CHOOSE A PAYMENT METHOD */}
        {step === 2 && (
          <div className="bg-white border border-[#E1E3DF] rounded-[24px] p-5 sm:p-6 shadow-sm animate-in fade-in duration-200">
            {/* Round Brand Logo matching Sign in / Sign up modal */}
            <div className="flex flex-col items-center mb-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shadow-xs border border-black/10 mb-2">
                <img
                  src="/images/miracle.jpeg"
                  alt="Miracle feng shui"
                  className="w-full h-full object-cover scale-105"
                />
              </div>
              <span className="font-serif text-[17px] sm:text-[18px] font-medium tracking-tight text-[#222222]">
                Miracle feng shui
              </span>
            </div>

            <h1 className="text-[20px] sm:text-[22px] font-bold text-center text-[#222222] mb-5">
              Choose a payment method
            </h1>

            <form onSubmit={handlePaymentSubmit} className="space-y-3.5 text-left">
              {/* Payment Methods Selection Box */}
              <div className="border border-[#E1E3DF] rounded-2xl overflow-hidden divide-y divide-[#E1E3DF]">
                {/* UPI Option */}
                <label
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex items-center justify-between p-3.5 cursor-pointer transition-colors ${
                    paymentMethod === 'upi' ? 'bg-[#FAF9F5]' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 bg-white border border-[#E1E3DF] rounded text-[11px] font-bold text-[#0F6C34]">
                      UPI
                    </span>
                    <span className="text-[14px] font-semibold text-[#222222]">
                      UPI
                    </span>
                  </div>

                  {/* Radio Indicator */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'upi'
                        ? 'border-[#222222]'
                        : 'border-[#CCCCCC]'
                    }`}
                  >
                    {paymentMethod === 'upi' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#222222]" />
                    )}
                  </div>
                </label>

                {/* UPI Input Subform */}
                {paymentMethod === 'upi' && (
                  <div className="p-3.5 bg-[#FAF9F5] border-t border-[#E1E3DF] space-y-2.5 animate-in fade-in">
                    <label className="text-[12px] font-bold text-[#222222] block">
                      Enter UPI ID / VPA
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. yourname@okaxis, yourname@paytm"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#E1E3DF] text-[13px] text-[#222222] bg-white focus:outline-none focus:ring-2 focus:ring-[#F1641E]"
                    />
                    <p className="text-[11px] text-[#595959]">
                      A payment request will be sent to your UPI app upon order confirmation.
                    </p>
                  </div>
                )}

                {/* Add a card Option */}
                <label
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center justify-between p-3.5 cursor-pointer transition-colors ${
                    paymentMethod === 'card' ? 'bg-[#FAF9F5]' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-credit-card text-[14px] text-[#595959]" />
                    <span className="text-[14.5px] font-semibold text-[#222222]">
                      Add a card
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="px-1.5 py-0.5 bg-white border border-[#E1E3DF] rounded text-[9px] font-bold text-[#1A1F71]">
                        VISA
                      </span>
                      <span className="px-1.5 py-0.5 bg-white border border-[#E1E3DF] rounded text-[9px] font-bold text-[#EB001B]">
                        MC
                      </span>
                      <span className="px-1.5 py-0.5 bg-white border border-[#E1E3DF] rounded text-[9px] font-bold text-[#006FCF]">
                        AMEX
                      </span>
                      <span className="px-1.5 py-0.5 bg-white border border-[#E1E3DF] rounded text-[9px] font-bold text-[#004B8D]">
                        DC
                      </span>
                    </div>
                  </div>

                  {/* Radio Indicator */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      paymentMethod === 'card'
                        ? 'border-[#222222]'
                        : 'border-[#CCCCCC]'
                    }`}
                  >
                    {paymentMethod === 'card' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#222222]" />
                    )}
                  </div>
                </label>

                {/* Card Input Subform */}
                {paymentMethod === 'card' && (
                  <div className="p-3.5 bg-[#FAF9F5] border-t border-[#E1E3DF] space-y-3 animate-in fade-in">
                    <div>
                      <label className="text-[12px] font-bold text-[#222222] block mb-1">
                        Card number
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="4111 2222 3333 4444"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#E1E3DF] text-[13px] text-[#222222] bg-white focus:outline-none focus:ring-2 focus:ring-[#F1641E]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-[12px] font-bold text-[#222222] block mb-1">
                          Expiry
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="MM / YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-[#E1E3DF] text-[13px] text-[#222222] bg-white focus:outline-none focus:ring-2 focus:ring-[#F1641E]"
                        />
                      </div>
                      <div>
                        <label className="text-[12px] font-bold text-[#222222] block mb-1">
                          CVV
                        </label>
                        <input
                          type="password"
                          required
                          placeholder="CVV"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-[#E1E3DF] text-[13px] text-[#222222] bg-white focus:outline-none focus:ring-2 focus:ring-[#F1641E]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[12px] font-bold text-[#222222] block mb-1">
                        Name on card
                      </label>
                      <input
                        type="text"
                        required
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#E1E3DF] text-[13px] text-[#222222] bg-white focus:outline-none focus:ring-2 focus:ring-[#F1641E]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 3-Step Progress Bar Indicator */}
              <div className="pt-3 flex items-center justify-between gap-1.5 border-t border-[#E1E3DF]">
                <div className="h-1 flex-1 rounded-full bg-[#222222]" />
                <div className="h-1 flex-1 rounded-full bg-[#222222]" />
                <div className="h-1 flex-1 rounded-full bg-[#E1E3DF]" />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2 rounded-full border border-[#222222] hover:bg-[#F5F5F1] text-[13.5px] font-bold text-[#222222] transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: '#222222', color: '#FFFFFF' }}
                  className="px-7 py-2 rounded-full bg-[#222222] hover:bg-black text-white text-[14px] font-bold transition-all shadow-sm hover:shadow-md cursor-pointer"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 3: REVIEW AND PLACE YOUR ORDER */}
        {step === 3 && (
          <div className="bg-white border border-[#E1E3DF] rounded-[24px] p-5 sm:p-6 shadow-sm animate-in fade-in duration-200 space-y-5">
            {/* Round Brand Logo matching Sign in / Sign up modal */}
            <div className="flex flex-col items-center mb-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shadow-xs border border-black/10 mb-2">
                <img
                  src="/images/miracle.jpeg"
                  alt="Miracle feng shui"
                  className="w-full h-full object-cover scale-105"
                />
              </div>
              <span className="font-serif text-[17px] sm:text-[18px] font-medium tracking-tight text-[#222222]">
                Miracle feng shui
              </span>
            </div>

            <h1 className="text-[20px] sm:text-[22px] font-bold text-center text-[#222222]">
              Review and place your order
            </h1>

            {/* Delivery & Payment Review Cards */}
            <div className="space-y-3 text-left text-[12.5px]">
              {/* Delivery Address */}
              <div className="bg-[#FAF9F5] p-3.5 rounded-xl border border-[#E1E3DF]">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[13px] text-[#222222]">
                    Delivery address
                  </span>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-[#F1641E] font-bold text-[11.5px] hover:underline cursor-pointer"
                  >
                    Change
                  </button>
                </div>
                <p className="font-semibold text-[#222222]">{fullName}</p>
                <p className="text-[#595959]">{streetAddress}</p>
                {aptSuite && <p className="text-[#595959]">{aptSuite}</p>}
                <p className="text-[#595959]">
                  {city}, {stateName} {pincode}
                </p>
                <p className="text-[#595959]">{country}</p>
                <p className="text-[#595959] mt-0.5">{phoneNumber}</p>
              </div>

              {/* Payment Method */}
              <div className="bg-[#FAF9F5] p-3.5 rounded-xl border border-[#E1E3DF]">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[13px] text-[#222222]">
                    Payment method
                  </span>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-[#F1641E] font-bold text-[11.5px] hover:underline cursor-pointer"
                  >
                    Change
                  </button>
                </div>
                {paymentMethod === 'card' ? (
                  <div className="text-[13.5px] text-[#595959] space-y-1">
                    <p className="font-semibold text-[#222222] flex items-center gap-1.5">
                      <i className="fa-solid fa-credit-card text-[12px] text-[#595959]" />
                      <span>{paymentMethod === 'card' ? 'Debit/Credit Card' : paymentMethod === 'upi' ? 'UPI Payment' : 'Net Banking'}</span>
                    </p>
                    <p className="text-[11.5px] text-[#595959]">Expires: {cardExpiry}</p>
                    <p className="text-[11.5px] text-[#595959]">Name: {cardHolder}</p>
                  </div>
                ) : (
                  <div className="space-y-0.5 text-[#222222]">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <span className="text-[10px] font-bold text-[#0F6C34] bg-white border border-[#E1E3DF] px-1 py-0.5 rounded">
                        UPI
                      </span>
                      <span>{upiId}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Items List */}
            <div className="border-t border-[#E1E3DF] pt-3.5 space-y-2.5">
              <h3 className="font-bold text-[13px] text-left text-[#222222]">
                Order Items ({checkoutItems.length})
              </h3>

              <div className="divide-y divide-[#E1E3DF]/70">
                {checkoutItems.map((item) => (
                  <div
                    key={item.id}
                    className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-lg object-cover border border-[#E1E3DF] shrink-0"
                      />
                      <div>
                        <p className="font-medium text-[13px] text-[#222222] line-clamp-1">
                          {item.product.name}
                        </p>
                        <p className="text-[11.5px] text-[#595959]">
                          Qty: {item.quantity} • {item.product.maker}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-[13.5px] text-[#222222] shrink-0">
                      ₹ {(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Summary */}
            <div className="border-t border-[#E1E3DF] pt-3 space-y-1.5 text-[13px]">
              <div className="flex justify-between text-[#222222]">
                <span>Item(s) total</span>
                <span>₹ {totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#222222]">
                <span>Delivery</span>
                <span className="text-[#0F6C34] font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-[#222222]">
                <span>GST (Included)</span>
                <span className="text-[#595959]">₹ 0</span>
              </div>
              <div className="flex justify-between text-[16px] font-bold text-[#222222] pt-2 border-t border-[#E1E3DF]">
                <span>Order total</span>
                <span>₹ {totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* 3-Step Progress Bar Indicator */}
            <div className="pt-2 flex items-center justify-between gap-1.5 border-t border-[#E1E3DF]">
              <div className="h-1 flex-1 rounded-full bg-[#222222]" />
              <div className="h-1 flex-1 rounded-full bg-[#222222]" />
              <div className="h-1 flex-1 rounded-full bg-[#222222]" />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={isProcessing}
                className="px-5 py-2 rounded-full border border-[#222222] hover:bg-[#F5F5F1] text-[13.5px] font-bold text-[#222222] transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                style={{ backgroundColor: '#222222', color: '#FFFFFF' }}
                className="px-7 py-2.5 rounded-full bg-[#222222] hover:bg-black text-white text-[14px] font-bold transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center gap-2"
              >
                {isProcessing ? (
                  <span>Processing order...</span>
                ) : (
                  <>
                    <i className="fa-solid fa-lock text-[12px]" />
                    <span>Place your order</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
