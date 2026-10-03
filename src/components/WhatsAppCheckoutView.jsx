import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { trackEvent } from '../utils/analytics.js';
import { useCart } from '../context/CartContext.jsx';
import { ArrowLeft, ArrowRight, User, Phone, MapPin, Sparkles, ShieldCheck, Lock, Send, Check } from 'lucide-react';

export const WhatsAppCheckoutView = () =>
{
  const { t, language, isRTL } = useLanguage();
  const {
    cart,
    subtotal,
    total,
    setCurrentView,
    setIsCartOpen,
    triggerConfetti,
    clearCart
  } = useCart();

  const isAr = language === 'ar';

  // Generate a unique order number once per session
  const [ orderNumber ] = useState(() => 'CELINE-' + Math.floor(10000 + Math.random() * 90000));
  const [ fullName, setFullName ] = useState('');
  const [ fullNameError, setFullNameError ] = useState('');
  const [ phoneNumber, setPhoneNumber ] = useState('');
  const [ phoneError, setPhoneError ] = useState('');
  const [ city, setCity ] = useState('القاهرة (Cairo)');
  const [ streetAddress, setStreetAddress ] = useState('');
  const [ addressError, setAddressError ] = useState('');
  const [ notes, setNotes ] = useState('');
  const [ selectedPayment, setSelectedPayment ] = useState('cod');
  const [ orderPlaced, setOrderPlaced ] = useState(false);

  // Validate form fields upon clicking "Send Order"
  const validateForm = () => {
    let isValid = true;

    // Validate Full Name
    if (!fullName.trim()) {
      setFullNameError(isAr ? 'الرجاء إدخال الاسم بالكامل' : 'Please enter your full name');
      isValid = false;
    } else {
      setFullNameError('');
    }

    // Validate Phone Number
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
    if (cleanPhone.length !== 11) {
      if (cleanPhone.length >= 3 && !/^(010|011|012|015)/.test(cleanPhone)) {
        setPhoneError(isAr ? 'الرجاء البدء بـ 010 أو 011 أو 012 أو 015' : 'Phone number must start with 010, 011, 012, or 015');
      } else {
        setPhoneError(isAr ? 'أرجو إدخال 11 رقمًا' : 'Please enter an 11-digit phone number');
      }
      isValid = false;
    } else if (!/^(010|011|012|015)/.test(cleanPhone)) {
      setPhoneError(isAr ? 'الرجاء البدء بـ 010 أو 011 أو 012 أو 015' : 'Phone number must start with 010, 011, 012, or 015');
      isValid = false;
    } else {
      setPhoneError('');
    }

    // Validate Street Address
    if (!streetAddress.trim()) {
      setAddressError(isAr ? 'الرجاء إدخال العنوان بالتفصيل' : 'Please enter your street address');
      isValid = false;
    } else {
      setAddressError('');
    }

    return isValid;
  };

  const paymentLabels = {
    cod: 'الدفع عند الاستلام',
    instapay: 'إنستاباي',
  };

  // Live Auto-Generated WhatsApp Message Text — Arabic receipt format
  const formatWhatsAppMessage = () =>
  {
    const now = new Date();
    const dateStr = now.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
    const timeStr = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });

    const itemsList = cart
      .map((it, idx) => {
        const colorLabel = it.selectedColor
          ? ` [اللون: ${it.selectedColor.nameAr || it.selectedColor.nameEn}]`
          : '';
        return `${idx + 1}. ${it.product.nameAr || it.product.nameEn}${colorLabel} (الكمية: ${it.quantity}) - السعر: ${(it.product.price * it.quantity).toLocaleString('ar-EG')} ج.م`;
      })
      .join('\n');

    return `✨ طلب جديد من متجر CELINE JEWELRY ✨
-----------------------------
🆔 رقم الطلب: ${orderNumber}
📅 التاريخ: ${dateStr} في ${timeStr}

👤 بيانات العميل:
- الاسم: ${fullName}
- رقم الهاتف: ${phoneNumber}
- المحافظة: ${city}
- العنوان بالتفصيل: ${streetAddress}
-----------------------------
🛍️ تفاصيل المنتجات:
${itemsList}
-----------------------------
💰 المجموع الفرعي: ${subtotal.toLocaleString('ar-EG')} ج.م
🚚 مصاريف التوصيل: 0 ج.م
💎 الإجمالي المطلوب: ${total.toLocaleString('ar-EG')} ج.م
💵 طريقة الدفع: ${paymentLabels[selectedPayment] || selectedPayment}
-----------------------------
${ notes ? '📝 ملاحظات: ' + notes : ''}

شكراً لاختيارك CELINE JEWELRY! 👑 `
  };

  const handleSendViaWhatsApp = () =>
  {
    if (!validateForm()) {
      return;
    }

    trackEvent('send_whatsapp_order', {
      source: 'checkout',
      item_count: cart.reduce((total, item) => total + item.quantity, 0),
      value: cart.reduce((total, item) => total + item.product.price * item.quantity, 0),
      currency: 'EGP',
    });
    triggerConfetti();
    setOrderPlaced(true);
    const storeWhatsAppNumber = "201028619308"; // Store owner's WhatsApp number
    const encoded = encodeURIComponent(formatWhatsAppMessage());
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${storeWhatsAppNumber}&text=${encoded}`;
    window.open(whatsappUrl, '_blank');
    // Clear the cart after successful order
    clearCart();
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-6 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Navigation Breadcrumb & Online Indicator */ }
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#EAE5DC]">
          <button
            onClick={ () =>
            {
              setCurrentView('home');
              setIsCartOpen(true);
            } }
            className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[#1A1A1A] hover:text-[#9A7B56] transition-colors cursor-pointer max-w-full"
          >
            { isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" /> }
            <span className="leading-snug">{ t.returnToBag }</span>
          </button>

          <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-[#59492E]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{ t.conciergeOnline }</span>
          </div>
        </div>

        {/* Page Title & Tag */ }
        <div className="mb-10 max-w-3xl">
          <div className="inline-block px-3 py-1 rounded-full bg-[#EAE5DC] text-[10px] font-bold tracking-widest text-[#59492E] uppercase mb-3">
            { t.directDispatch }
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-3 leading-tight">
            { t.whatsappCheckoutTitle }
          </h1>
          <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
            { t.whatsappCheckoutSubtitle }
          </p>
        </div>

        {/* Two-Column Grid */ }
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left Form: Express Order Routing */ }
          <div className="lg:col-span-7 space-y-6">
            <div className="p-4 sm:p-8 rounded-3xl bg-white border border-[#EAE5DC] shadow-xs space-y-6">

              {/* Box Header */ }
              <div className="flex items-start justify-between gap-3 pb-4 border-b border-[#EAE5DC]">
                <div>
                  <h3 className="text-sm sm:text-base font-serif font-bold text-[#1A1A1A]">
                    { t.expressRouting }
                  </h3>
                  <span className="text-[11px] text-[#777777]">
                    { t.priorityFulfillment }
                  </span>
                </div>
                <span className="shrink-0 text-[9px] sm:text-[10px] px-2 py-1 rounded-md bg-[#FAF8F5] border border-[#EAE5DC] text-[#777777] font-mono font-semibold">
                  { t.stepBadge }
                </span>
              </div>

              {/* Form Inputs */ }
              <div className="space-y-5">

                {/* Full Name */ }
                <div>
                  <label htmlFor='full-name' className="block text-[11px] font-bold tracking-wider text-[#1A1A1A] uppercase mb-1.5">
                    { t.recipientFullName }
                  </label>
                  <div className={`relative rounded-xl border transition-colors ${
                    fullNameError ? 'border-red-400 focus-within:border-red-500' : 'border-[#D5CEC0] focus-within:border-[#59492E]'
                  }`}>
                    <input
                      id='full-name'
                      name='full-name'
                      type="text"
                      value={ fullName }
                      onChange={ (e) => {
                        setFullName(e.target.value);
                        if (fullNameError) setFullNameError('');
                      }}
                      placeholder={ t.recipientPlaceholder }
                      className="w-full px-4 py-3 bg-[#FAF8F5] rounded-xl text-xs sm:text-sm text-[#1A1A1A] focus:outline-none"
                    />
                    <User className="w-4 h-4 text-[#888888] absolute top-1/2 -translate-y-1/2 end-3.5 pointer-events-none" />
                  </div>
                  {fullNameError && (
                    <span className="text-[10px] text-red-500 font-semibold block mt-1">
                      ⚠ {fullNameError}
                    </span>
                  )}
                </div>

                 {/* WhatsApp Phone */}
                <div>
                  <label htmlFor='phone-number' className="block text-[11px] font-bold tracking-wider text-[#1A1A1A] uppercase mb-1.5">
                    { t.whatsappPhoneNumber }
                  </label>
                  <div className={`flex items-center rounded-xl bg-[#FAF8F5] border overflow-hidden transition-colors ${
                    phoneError ? 'border-red-400 focus-within:border-red-500' : 'border-[#D5CEC0] focus-within:border-[#59492E]'
                  }`}>
                    <span className="px-3.5 py-3 text-xs font-semibold text-[#555555] border-e border-[#D5CEC0] bg-[#F2EDE4] flex items-center gap-1.5">
                      <img
                        src="https://flagcdn.com/w20/eg.png"
                        srcSet="https://flagcdn.com/w40/eg.png 2x"
                        width="20"
                        height="15"
                        alt="Egypt"
                        className="rounded-sm object-cover shrink-0"
                      />
                      <span dir="ltr">+20</span>
                    </span>
                    <input
                      id='phone-number'
                      name='phone-number'
                      type="tel"
                      inputMode="numeric"
                      maxLength={11}
                      value={ phoneNumber }
                      onChange={ (e) => {
                        const val = e.target.value.replace(/[^0-9]/g, '');
                        setPhoneNumber(val);
                        if (phoneError) setPhoneError('');
                      }}
                      placeholder={ t.whatsappPhonePlaceholder || '01XXXXXXXXX' }
                      className="w-full px-4 py-3 bg-transparent text-xs sm:text-sm text-[#1A1A1A] focus:outline-none"
                    />
                    <Phone className="w-4 h-4 text-[#888888] me-3.5 shrink-0 pointer-events-none" />
                  </div>
                  {phoneError ? (
                    <span className="text-[10px] text-red-500 font-semibold block mt-1">
                      ⚠ {phoneError}
                    </span>
                  ) : (
                    <span className="text-[10px] text-[#777777] block mt-1">
                      { t.phoneTrackingHint }
                    </span>
                  )}
                </div>


                {/* Governorate / City */ }
                <div>
                  <label htmlFor='city' className="block text-[11px] font-bold tracking-wider text-[#1A1A1A] uppercase mb-1.5">
                    المحافظة / City
                  </label>
                  <select
                    id='city'
                    name='city'
                    value={ city }
                    onChange={ (e) => setCity(e.target.value) }
                    className="w-full  px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#D5CEC0] text-xs sm:text-sm text-[#1A1A1A] focus:outline-none focus:border-[#59492E] transition-colors cursor-pointer"
                  >
                    <option>القاهرة (Cairo)</option>
                    <option>الجيزة (Giza)</option>
                    <option>الإسكندرية (Alexandria)</option>
                    <option>الشرقية (Sharqia)</option>
                    <option>الدقهلية (Dakahlia)</option>
                    <option>المنوفية (Menoufia)</option>
                    <option>البحيرة (Beheira)</option>
                    <option>الغربية (Gharbia)</option>
                    <option>كفر الشيخ (Kafr El-Sheikh)</option>
                    <option>الإسماعيلية (Ismailia)</option>
                    <option>السويس (Suez)</option>
                    <option>بورسعيد (Port Said)</option>
                    <option>المنيا (Minya)</option>
                    <option>أسيوط (Asyut)</option>
                    <option>سوهاج (Sohag)</option>
                    <option>الأقصر (Luxor)</option>
                    <option>أسوان (Aswan)</option>
                    <option>أخرى (Other)</option>
                  </select>
                </div>

                {/* Street Address */ }
                <div>
                  <label htmlFor='street-address' className="block text-[11px] font-bold tracking-wider text-[#1A1A1A] uppercase mb-1.5">
                    { t.streetAddress }
                  </label>
                  <div className={`relative rounded-xl border transition-colors ${
                    addressError ? 'border-red-400 focus-within:border-red-500' : 'border-[#D5CEC0] focus-within:border-[#59492E]'
                  }`}>
                    <input
                      id='street-address'
                      name='street-address'
                      type="text"
                      value={ streetAddress }
                      onChange={ (e) => {
                        setStreetAddress(e.target.value);
                        if (addressError) setAddressError('');
                      }}
                      placeholder={ t.streetPlaceholder }
                      className="w-full px-4 py-3 bg-[#FAF8F5] rounded-xl text-xs sm:text-sm text-[#1A1A1A] focus:outline-none"
                    />
                    <MapPin className="w-4 h-4 text-[#888888] absolute top-1/2 -translate-y-1/2 end-3.5 pointer-events-none" />
                  </div>
                  {addressError && (
                    <span className="text-[10px] text-red-500 font-semibold block mt-1">
                      ⚠ {addressError}
                    </span>
                  )}
                </div>

                {/* Atelier Notes */ }
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="atelier-notes" className="text-[11px] font-bold tracking-wider text-[#1A1A1A] uppercase">
                      { t.atelierNotes }
                    </label>
                    <span className="text-[10px] text-[#59492E] font-semibold">
                      { t.complimentaryBadge }
                    </span>
                  </div>
                  <textarea 
                    id="atelier-notes"
                    name="notes"
                    rows={ 1 }
                    value={ notes }
                    onChange={ (e) => setNotes(e.target.value) }
                    placeholder={ t.atelierNotesPlaceholder }
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#D5CEC0] text-xs sm:text-sm text-[#1A1A1A] focus:outline-none focus:border-[#59492E] transition-colors resize-none"
                  />
                </div>

              </div>

              {/* Payment & Verification Protocol */ }
              <div className="p-4 rounded-2xl bg-[#F5F2EB] border border-[#EAE5DC] space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#59492E]" />
                  <span className="text-[10px] font-bold tracking-wider uppercase text-[#1A1A1A]">
                    { t.paymentProtocolTitle }
                  </span>
                </div>
                <p className="text-[11px] text-[#666666] leading-relaxed">
                  { t.paymentProtocolDesc }
                </p>

                {/* Payment tags */ }
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={ () => setSelectedPayment('cod') }
                    className={ `px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${selectedPayment === 'cod'
                        ? 'bg-[#1A1A1A] text-white shadow-xs'
                        : 'bg-white border border-[#D5CEC0] text-[#444444]'
                      }` }
                  >
                    ✓ { t.codTag }
                  </button>
                  <button
                    type="button"
                    onClick={ () => setSelectedPayment('instapay') }
                    className={ `px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${selectedPayment === 'instapay'
                        ? 'bg-[#1A1A1A] text-white shadow-xs'
                        : 'bg-white border border-[#D5CEC0] text-[#444444]'
                      }` }
                  >
                    { t.instapayTag }
                  </button>
                  {/* <button
                    type="button"
                    onClick={ () => setSelectedPayment('valu') }
                    className={ `px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${selectedPayment === 'valu'
                        ? 'bg-[#1A1A1A] text-white shadow-xs'
                        : 'bg-white border border-[#D5CEC0] text-[#444444]'
                      }` }
                  >
                    { t.valuTag }
                  </button>
                  <button
                    type="button"
                    onClick={ () => setSelectedPayment('visa') }
                    className={ `px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${selectedPayment === 'visa'
                        ? 'bg-[#1A1A1A] text-white shadow-xs'
                        : 'bg-white border border-[#D5CEC0] text-[#444444]'
                      }` }
                  >
                    { t.visaTag }
                  </button> */}
                </div>
              </div>

              {/* Big Dark Pill Submit CTA */}
              <button
                id="send-whatsapp-order-cta"
                type="button"
                onClick={ handleSendViaWhatsApp }
                disabled={ cart.length === 0 }
                className={`w-full min-h-12 px-3 py-3 rounded-full text-[10px] sm:text-sm leading-tight font-semibold tracking-wide sm:tracking-widest uppercase flex items-center justify-center gap-2 sm:gap-3 transition-all shadow-lg ${
                  cart.length > 0
                    ? 'bg-[#1A1A1A] hover:bg-[#333333] active:scale-[0.99] text-white cursor-pointer'
                    : 'bg-[#CCCCCC] text-[#888888] cursor-not-allowed'
                }`}
              >
                <Send className={`w-4 h-4 ${cart.length > 0 ? 'text-[#C5A880]' : 'text-[#AAAAAA]'}`} />
                <span>{ t.sendOrderWhatsApp }</span>
                { isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" /> }
              </button>


            </div>

            {/* 3 Bottom Guarantee Badges matching Figma */ }
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-[#EAE5DC] text-center">
                <span className="text-xs font-bold text-[#1A1A1A] block mb-0.5">{ t.artisanalHandcraft }</span>
                <span className="text-[10px] text-[#777777] block">{ t.artisanalHandcraftDesc }</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#EAE5DC] text-center">
                <span className="text-xs font-bold text-[#1A1A1A] block mb-0.5">{ t.twoYearCare }</span>
                <span className="text-[10px] text-[#777777] block">{ t.twoYearCareDesc }</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#EAE5DC] text-center">
                <span className="text-xs font-bold text-[#1A1A1A] block mb-0.5">{ t.fourteenDayExchanges }</span>
                <span className="text-[10px] text-[#777777] block">{ t.fourteenDayExchangesDesc }</span>
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary & Live Preview */ }
          <div className="lg:col-span-5 space-y-6">

            {/* Order Summary Box */ }
            <div className="p-6 rounded-3xl bg-white border border-[#EAE5DC] shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#EAE5DC]">
                <h3 className="text-sm font-serif font-bold text-[#1A1A1A]">
                  { t.orderSummaryTitle }
                </h3>
                <span className="text-[11px] text-[#777777]">
                  { cart.length } { t.artisanalPieces }
                </span>
              </div>

              {/* Items List */ }
              <div className="space-y-3.5 divide-y divide-[#F0ECE1]">
                { cart.map((item) =>
                {
                  const name = isAr ? item.product.nameAr : item.product.nameEn;
                  const material = isAr ? item.product.materialAr : item.product.materialEn;

                  return (
                    <div key={ item.cartItemId || item.product.id } className="pt-3 first:pt-0 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          loading="lazy"
                          decoding="async"
                          src={ item.selectedColor?.image || item.product.image }
                          alt={ name }
                          className="w-14 h-14 object-cover rounded-xl border border-[#EAE5DC] shrink-0"
                        />
                        <div>
                          <h4 className="text-xs font-serif font-bold text-[#1A1A1A] line-clamp-1">
                            { name }
                          </h4>
                          {item.selectedColor && (
                            <div className="flex items-center gap-1.5 my-0.5">
                              <span 
                                className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0" 
                                style={{ backgroundColor: item.selectedColor.hex }}
                              />
                              <span className="text-[10px] text-[#59492E] font-semibold">
                                {isAr ? `اللون: ${item.selectedColor.nameAr}` : `Color: ${item.selectedColor.nameEn}`}
                              </span>
                            </div>
                          )}
                          <span className="text-[10px] text-[#777777] block">
                            { material } • Qty { item.quantity }
                          </span>
                          <span className="text-[9px] font-mono text-[#999999] block">
                            REF: { item.product.refCode || 'LAU-EXP-01' }
                          </span>
                        </div>
                      </div>

                      <span className="text-xs font-serif font-bold text-[#1A1A1A] whitespace-nowrap">
                        { t.currency }{ (item.product.price * item.quantity).toLocaleString() }
                      </span>
                    </div>
                  );
                }) }
              </div>

              {/* Cost Breakdown */ }
              <div className="pt-4 border-t border-[#EAE5DC] space-y-2 text-xs">
                <div className="flex justify-between text-[#666666]">
                  <span>{ t.subtotal }</span>
                  <span className="font-semibold text-[#1A1A1A]">{ t.currency }{ subtotal.toLocaleString() }</span>
                </div>
                <div className="flex justify-between text-[#666666]">
                  <span>Courier • Cairo</span>
                  <span className="font-bold text-[#59492E] uppercase tracking-wider">{ t.free }</span>
                </div>
                <div className="flex justify-between text-[#666666]">
                  <span>{ t.signatureWax }</span>
                  <span className="font-semibold text-[#59492E]">{ t.included }</span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-[#1A1A1A] pt-3 border-t border-[#EAE5DC]">
                  <div>
                    <span>{ t.totalDue }</span>
                    <span className="text-[9px] font-sans text-[#888888] font-normal block">{ t.taxesInclusive }</span>
                  </div>
                  <span className="text-lg font-bold text-[#1A1A1A]">{ t.currency }{ total.toLocaleString() }</span>
                </div>
              </div>

              {/* Loyalty House Points Banner */ }
              <div className="p-3.5 rounded-2xl bg-[#F5F2EB] border border-[#EAE5DC] flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-[#59492E] shrink-0" />
                <span className="text-[10px] text-[#555555] leading-tight">
                  { t.housePointsMsg }
                </span>
              </div>
            </div>

            {/* Live WhatsApp Message Preview in Monospace Box */ }
            <div className="p-6 rounded-3xl bg-white border border-[#EAE5DC] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1A1A1A]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>{ t.livePreviewTitle }</span>
                </div>
                <span className="text-[9px] uppercase tracking-wider text-[#777777] font-semibold bg-[#FAF8F5] px-2 py-0.5 rounded-sm">
                  { t.autoGenerated }
                </span>
              </div>

              <p className="text-[11px] text-[#777777]">
                { t.livePreviewHint }
              </p>

              {/* Exact Monospace Brief Box matching Figma screenshot */ }
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] font-mono text-[11px] leading-relaxed text-[#333333] whitespace-pre-wrap select-all">
                { formatWhatsAppMessage() }
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-[#888888] justify-center tracking-widest uppercase">
                <Lock className="w-3 h-3 text-[#59492E]" />
                <span>{ t.endToEndEncrypted }</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
