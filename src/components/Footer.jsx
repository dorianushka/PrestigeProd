import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { logoImg } from '../utils';

const Footer = () => {
  const { t, i18n } = useTranslation();
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
      {/* Background texture overlay */}
      <div className='absolute inset-0 opacity-[0.02]' style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />

      {/* Top decorative border */}
      <div className='relative h-px w-full'>
        <div className='absolute inset-0 bg-gradient-to-r from-transparent via-pp-sage/30 to-transparent' />
      </div>

      {/* Main footer content */}
      <div className='relative max-w-7xl mx-auto px-6 lg:px-10'>

        {/* Upper section - Brand statement */}
        <div className='py-16 lg:py-24 border-b border-white/5'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end'>
            {/* Brand column */}
            <div className='lg:col-span-5'>
              <Link to={`/${currentLang}/`} className='inline-flex items-center gap-4 group mb-8'>
                <img src={logoImg} alt='Prestige Production' className='w-10 h-10' />
                <span className='font-serif text-2xl tracking-wide text-white/90 group-hover:text-white transition-colors'>
                  Prestige Production
                </span>
              </Link>

              <p className='font-serif text-2xl lg:text-3xl text-white/60 leading-relaxed max-w-md'>
                {t('footer.description', 'Artistry in every pixel, excellence in every frame.')}
              </p>
            </div>

            {/* Decorative element - film strip */}
            <div className='hidden lg:flex lg:col-span-2 justify-center'>
              <div className='relative w-px h-32'>
                <div className='absolute inset-0 bg-gradient-to-b from-pp-sage/40 via-pp-sage/20 to-transparent' />
                {/* Film sprocket holes */}
                <div className='absolute -left-1 top-4 w-2 h-2 rounded-full border border-pp-sage/30' />
                <div className='absolute -left-1 top-12 w-2 h-2 rounded-full border border-pp-sage/30' />
                <div className='absolute -left-1 top-20 w-2 h-2 rounded-full border border-pp-sage/30' />
              </div>
            </div>

            {/* Contact CTA */}
            <div className='lg:col-span-5 lg:text-right'>
              <p className='text-[11px] uppercase tracking-[0.25em] text-white/40 mb-4'>
                {t('footer.cta.subtitle', 'Ready to create?')}
              </p>
              <Link
                to={`/${currentLang}/contact`}
                className='group inline-flex items-center gap-4'
              >
                <span className='font-serif text-3xl lg:text-4xl text-white/80 group-hover:text-pp-sage transition-colors duration-500'>
                  {t('footer.cta.title', "Let's talk")}
                </span>
                <span className='flex items-center justify-center w-12 h-12 rounded-full border border-white/20 group-hover:border-pp-sage group-hover:bg-pp-sage transition-all duration-500'>
                  <svg className='w-5 h-5 text-white group-hover:text-black transition-colors duration-500 group-hover:translate-x-0.5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Middle section - Navigation grid */}
        <div className='py-12 lg:py-16 border-b border-white/5'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12'>

            {/* Services */}
            <div>
              <h4 className='text-[11px] uppercase tracking-[0.25em] text-pp-sage mb-6'>
                {t('footer.services.title')}
              </h4>
              <nav className='space-y-3'>
                {serviceLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className='group flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300'
                  >
                    <span className='w-0 h-px bg-pp-sage group-hover:w-3 transition-all duration-300' />
                    <span className='text-sm'>{link.name}</span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Company */}
            <div>
              <h4 className='text-[11px] uppercase tracking-[0.25em] text-pp-sage mb-6'>
                {t('footer.company.title')}
              </h4>
              <nav className='space-y-3'>
                {navigationLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className='group flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300'
                  >
                    <span className='w-0 h-px bg-pp-sage group-hover:w-3 transition-all duration-300' />
                    <span className='text-sm'>{link.name}</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 className='text-[11px] uppercase tracking-[0.25em] text-pp-sage mb-6'>
                {t('footer.connect')}
              </h4>
              <div className='space-y-3'>
                <a
                  href='tel:+41762021959'
                  className='block text-sm text-white/50 hover:text-white transition-colors duration-300'
                >
                  {t('footer.contact.phone')}
                </a>
                <a
                  href='mailto:info@prestigeproduction.ch'
                  className='block text-sm text-white/50 hover:text-white transition-colors duration-300'
                >
                  {t('footer.contact.email')}
                </a>
                <p className='text-sm text-white/50'>{t('footer.contact.location')}</p>
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 className='text-[11px] uppercase tracking-[0.25em] text-pp-sage mb-6'>
                Social
              </h4>
              <div className='flex flex-wrap gap-2'>
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group relative w-10 h-10 flex items-center justify-center'
                    aria-label={social.name}
                  >
                    {/* Background circle */}
                    <span className='absolute inset-0 rounded-full border border-white/10 group-hover:border-pp-sage/50 group-hover:bg-pp-sage/10 transition-all duration-300' />
                    {/* Icon */}
                    <span className='relative text-white/50 group-hover:text-pp-sage transition-colors duration-300'>
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section - Copyright */}
        <div className='py-6 lg:py-8'>
          <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
            {/* Copyright */}
            <p className='text-[11px] uppercase tracking-[0.15em] text-white/30'>
              {t('footer.legal.copyright')}
            </p>

            {/* Legal + Made with love */}
            <div className='flex items-center gap-6'>
              <Link
                to={`/${currentLang}/privacy`}
                className='text-[11px] uppercase tracking-[0.15em] text-white/30 hover:text-white/60 transition-colors duration-300'
              >
                {t('footer.legal.privacy')}
              </Link>

              <span className='text-white/10'>|</span>

              <span className='text-[11px] uppercase tracking-[0.15em] text-white/30'>
                Zurich, CH
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className='h-px w-full bg-gradient-to-r from-transparent via-pp-sage/20 to-transparent' />
    </footer>
  );
};

export default Footer;
