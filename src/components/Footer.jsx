import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { logoImg } from '../utils';

// Consistent gold colors
const GOLD = '#C9A961';
const GOLD_LIGHT = '#E8D5A3';

const Footer = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const currentLang = location.pathname.split('/')[1] || 'en';

  const socialLinks = [
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@PrestigeProductionAgency',
      icon: (
        <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/prestige_production_ch/',
      icon: (
        <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'/>
        </svg>
      )
    },
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@prestige.production',
      icon: (
        <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z'/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/prestige-production-agency/',
      icon: (
        <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/>
        </svg>
      )
    }
  ];

  const navigationLinks = [
    { name: t('footer.company.about'), href: `/${currentLang}/why-us` },
    { name: t('footer.company.services'), href: `/${currentLang}/services` },
    { name: t('footer.company.portfolio'), href: `/${currentLang}/portfolio` },
    { name: t('footer.company.contact'), href: `/${currentLang}/contact` }
  ];

  const serviceLinks = [
    { name: t('footer.services.video'), href: `/${currentLang}/services#video` },
    { name: t('footer.services.photography'), href: `/${currentLang}/services#photography` },
    { name: t('footer.services.social'), href: `/${currentLang}/services#social` },
    { name: t('footer.services.branding'), href: `/${currentLang}/services#branding` }
  ];

  return (
    <footer className='relative bg-black text-white overflow-hidden'>
      {/* Subtle noise texture */}
      <div className='absolute inset-0 opacity-[0.015]' style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      {/* Top border accent */}
      <div className='h-px w-full' style={{ background: `linear-gradient(to right, transparent, ${GOLD}33, transparent)` }} />

      {/* Main footer content */}
      <div className='relative max-w-6xl mx-auto px-6 md:px-10'>

        {/* Compact CTA banner */}
        <div className='py-10 md:py-14 border-b border-white/[0.04]'>
          <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-6'>
            {/* Left - Logo & tagline */}
            <div className='flex items-center gap-5'>
              <Link to={`/${currentLang}/`} className='flex-shrink-0'>
                <img src={logoImg} alt='Prestige Production' className='w-9 h-9 opacity-80' />
              </Link>
              <div className='h-8 w-px bg-white/10' />
              <p className='font-serif text-base md:text-lg text-white/50 max-w-xs'>
                {t('footer.description', 'Artistry in every pixel, excellence in every frame.')}
              </p>
            </div>

            {/* Right - CTA */}
            <Link
              to={`/${currentLang}/contact`}
              className='group inline-flex items-center gap-3 px-5 py-2.5 border transition-all duration-500'
              style={{ borderColor: 'rgba(255,255,255,0.1)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${GOLD}66`;
                e.currentTarget.style.background = `${GOLD}0d`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <span className='text-sm text-white/70 group-hover:text-white transition-colors'>
                {t('footer.cta.title', "Let's talk")}
              </span>
              <svg className='w-4 h-4 group-hover:translate-x-0.5 transition-all' style={{ color: `${GOLD}99` }} fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M17 8l4 4m0 0l-4 4m4-4H3' />
              </svg>
            </Link>
          </div>
        </div>

        {/* Navigation grid - more compact */}
        <div className='py-10 md:py-12 border-b border-white/[0.04]'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10'>

            {/* Services */}
            <div>
              <h4 className='text-[10px] uppercase tracking-[0.2em] mb-4' style={{ color: `${GOLD}cc` }}>
                {t('footer.services.title')}
              </h4>
              <nav className='space-y-2'>
                {serviceLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className='block text-sm text-white/40 hover:text-white/80 transition-colors duration-300'
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* Company */}
            <div>
              <h4 className='text-[10px] uppercase tracking-[0.2em] mb-4' style={{ color: `${GOLD}cc` }}>
                {t('footer.company.title')}
              </h4>
              <nav className='space-y-2'>
                {navigationLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className='block text-sm text-white/40 hover:text-white/80 transition-colors duration-300'
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 className='text-[10px] uppercase tracking-[0.2em] mb-4' style={{ color: `${GOLD}cc` }}>
                {t('footer.connect')}
              </h4>
              <div className='space-y-2'>
                <a
                  href='tel:+41762021959'
                  className='block text-sm text-white/40 hover:text-white/80 transition-colors duration-300'
                >
                  {t('footer.contact.phone')}
                </a>
                <a
                  href='mailto:info@prestigeproduction.ch'
                  className='block text-sm text-white/40 hover:text-white/80 transition-colors duration-300'
                >
                  {t('footer.contact.email')}
                </a>
                <p className='text-sm text-white/40'>{t('footer.contact.location')}</p>
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 className='text-[10px] uppercase tracking-[0.2em] mb-4' style={{ color: `${GOLD}cc` }}>
                Social
              </h4>
              <div className='flex gap-1'>
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-9 h-9 flex items-center justify-center text-white/30 hover:bg-white/[0.03] transition-all duration-300'
                    style={{ '--hover-color': GOLD }}
                    onMouseEnter={(e) => e.currentTarget.style.color = GOLD}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar - minimal */}
        <div className='py-5'>
          <div className='flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] uppercase tracking-[0.15em] text-white/25'>
            <p>{t('footer.legal.copyright')}</p>
            <div className='flex items-center gap-4'>
              <Link
                to={`/${currentLang}/privacy`}
                className='hover:text-white/50 transition-colors duration-300'
              >
                {t('footer.legal.privacy')}
              </Link>
              <span className='text-white/10'>·</span>
              <span>Zurich, CH</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
