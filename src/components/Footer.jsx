import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { trackEvent } from '../utils/analytics.js';
import { MessageCircle } from 'lucide-react';
import logo from '../../images/logo.png';

// Inline Instagram SVG (lucide-react v1.48 doesn't export Instagram)
const InstagramIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);

const FacebookIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v8h4v-8h3.5l.5-4H13V9c0-.67.33-1 1-1Z"/>
  </svg>
);

const TikTokIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 3H19c.18 1.03.69 1.95 1.46 2.67A5.04 5.04 0 0 0 23 7v3.5a8.45 8.45 0 0 1-4.02-1.04v6.16A5.38 5.38 0 1 1 14 10.27v3.62a1.9 1.9 0 1 0 1.5 1.85V3Z"/>
  </svg>
);

// Replace these placeholder URLs with the brand's actual social profiles.
const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/karem.mhomed', Icon: FacebookIcon },
  { label: 'Instagram', href: 'https://www.instagram.com/celine__accesories_?stkn=MXd1NnpubjVoemJxaQ%3D%3D&utm_source=qr', Icon: InstagramIcon },
  { label: 'TikTok', href: 'https://www.tiktok.com/@celine.accessories', Icon: TikTokIcon },
];

export const Footer = () => {
  const { t } = useLanguage();
  const { setCurrentView } = useCart();

  const handleOpenWhatsApp = () =>
  {
    trackEvent('click_whatsapp', { source: 'footer' });
    const message = encodeURIComponent('مرحباً، أود الاستفسار عن مجوهراتكم');
    window.open(`https://api.whatsapp.com/send?phone=201028619308&text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-12 border-t border-[#333333]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt={t.brandName}
                loading="lazy"
                decoding="async"
                className="w-9 h-9 rounded-full object-cover"
              />
              <span className="text-xl font-serif tracking-[0.2em] font-medium text-white block">
                {t.brandName}
              </span>
            </div>

            <p className="text-xs text-[#999999] leading-relaxed max-w-sm font-light">
              {t.footerDesc}
            </p>

            {/* WhatsApp Concierge Button matching Figma */}
            <div className="pt-2">
              <button
                onClick={handleOpenWhatsApp}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#262626] hover:bg-[#333333] border border-white/10 text-xs text-[#EAE5DC] font-medium transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{t.whatsappConcierge}</span>
              </button>
            </div>

            <div className="flex items-center gap-2 pt-1" aria-label="Social media links">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-[#262626] border border-white/10 items-center justify-center flex text-[#C5A880] hover:bg-[#C5A880] hover:text-[#1A1A1A] transition-colors"
                >
                  <Icon className="w-4 h-4"/>
                </a>
              ))}

            </div>
          </div>

          {/* Collections Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-white">
              {t.collectionsHouse}
            </h4>
            <ul className="space-y-2 text-xs text-[#AAAAAA]">
              <li>
                <button onClick={() => setCurrentView('home')} className="hover:text-white transition-colors cursor-pointer">
                  {t.navHome}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('catalog')} className="hover:text-white transition-colors cursor-pointer">
                  {t.catRings}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('catalog')} className="hover:text-white transition-colors cursor-pointer">
                  {t.catBracelets}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('catalog')} className="hover:text-white transition-colors cursor-pointer">
                  {t.catNecklaces}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('about')} className="hover:text-white transition-colors cursor-pointer">
                  {t.navAbout}
                </button>
              </li>
            </ul>
          </div>

          {/* Client Service Column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-white">
              {t.clientServiceCare}
            </h4>
            <ul className="space-y-2 text-xs text-[#AAAAAA]">
              <li>White-Glove Shipping & Verification</li>
              <li>Ring Size Guide & Consultations</li>
              <li>Returns & 2-Year Atelier Guarantee</li>
              <li>Zamalek Showroom Appointments</li>
              <li className="pt-1 text-[11px] text-[#C5A880]">
                All prices in Egyptian Pounds (E£ / ج.م)
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#777777] gap-4">
          <p>{t.rightsReserved}</p>
          <span className="tracking-widest uppercase text-[10px] text-[#C5A880]">
            {t.provenanceTag}
          </span>
          <button onClick={() => { setCurrentView('admin'); try { window.history.pushState({}, '', '/admin'); } catch { /* ignore */ } window.scrollTo({ top: 0 }); }} className=" hidden text-[10px] text-[#555] hover:text-white underline underline-offset-4 cursor-pointer">Admin</button>
        </div>

      </div>
    </footer>
  );
};
