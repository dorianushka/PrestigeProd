import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { logoImg } from '../utils';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

// Consistent gold colors
const GOLD = '#C9A961';
const GOLD_LIGHT = '#E8D5A3';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  // Track scroll for navbar background transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navItems = [
    { label: t('nav.home'), path: `/${currentLang}/` },
    { label: t('nav.portfolio'), path: `/${currentLang}/portfolio` },
    { label: t('nav.services'), path: `/${currentLang}/services` },
    { label: t('nav.whyUs'), path: `/${currentLang}/why-us` },
  ];

  const currentPath = location.pathname.split('/').slice(2).join('/');
  const formattedCurrentPath = currentPath || '';

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-black/90 backdrop-blur-xl border-b border-white/5'
          : 'py-6 bg-transparent'
      }`}
    >
      {/* Decorative top accent line */}
      <div className='absolute top-0 left-0 right-0 h-[1px]' style={{ background: `linear-gradient(to right, transparent, ${GOLD}66, transparent)` }} />

      <nav className='relative flex items-center justify-between max-w-7xl mx-auto px-6 lg:px-10'>
        {/* Logo with refined hover */}
        <Link
          to={`/${currentLang}/`}
          className='relative group flex items-center gap-3'
        >
          <div className='relative'>
            <img
              src={logoImg}
              alt='Prestige Production'
              className='w-8 h-8 transition-transform duration-500 group-hover:scale-110'
            />
            {/* Logo glow on hover */}
            <div className='absolute inset-0 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500' style={{ background: `${GOLD}33` }} />
          </div>
          <span className='hidden sm:block font-serif text-lg tracking-wide text-white/90 group-hover:text-white transition-colors duration-300'>
            Prestige Production
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden lg:flex items-center gap-1'>
          {navItems.map(({ label, path }, index) => {
            const relativePath = path.split('/').slice(2).join('/');
            const isActive = formattedCurrentPath === relativePath;

            return (
              <Link
                key={path}
                to={path}
                className='relative px-5 py-2 group'
              >
                {/* Nav link text */}
                <span className={`relative z-10 text-[13px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                  isActive
                    ? 'text-white'
                    : 'text-white/60 group-hover:text-white'
                }`}>
                  {label}
                </span>

                {/* Active indicator - subtle dot */}
                {isActive && (
                  <span className='absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full' style={{ background: GOLD }} />
                )}

                {/* Hover underline animation */}
                <span className='absolute bottom-0 left-1/2 w-0 h-[1px] group-hover:w-full group-hover:left-0 transition-all duration-500 ease-out' style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
              </Link>
            );
          })}
        </div>

        {/* Right side - Language + CTA */}
        <div className='hidden lg:flex items-center gap-6'>
          <LanguageSwitcher />

          {/* Refined CTA Button */}
          <Link
            to={`/${currentLang}/contact`}
            className='relative group overflow-hidden'
          >
            <span
              className='relative z-10 inline-flex items-center gap-2 px-6 py-2.5 text-[12px] uppercase tracking-[0.15em] text-white border border-white/30 transition-all duration-500 group-hover:text-black'
              style={{ borderColor: 'rgba(255,255,255,0.3)' }}
            >
              {t('nav.contact')}
              {/* Arrow icon */}
              <svg
                className='w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M17 8l4 4m0 0l-4 4m4-4H3' />
              </svg>
            </span>
            {/* Button fill animation */}
            <span
              className='absolute inset-0 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out'
              style={{ background: 'linear-gradient(135deg, #E8D5A3, #C9A961)' }}
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(open => !open)}
          className='lg:hidden relative w-10 h-10 flex items-center justify-center'
          aria-label='Toggle menu'
          aria-expanded={menuOpen}
        >
          <div className='relative w-6 h-5 flex flex-col justify-between'>
            <span
              className={`block w-full h-[1.5px] bg-white transform origin-center transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-[9px]' : ''
              }`}
            />
            <span
              className={`block w-full h-[1.5px] bg-white transition-all duration-300 ${
                menuOpen ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block w-full h-[1.5px] bg-white transform origin-center transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-[9px]' : ''
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-xl lg:hidden transition-all duration-500 ${
          menuOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible pointer-events-none'
        }`}
        style={{ top: '0' }}
      >
        {/* Close area padding for header */}
        <div className='h-20' />

        {/* Menu content */}
        <div className='flex flex-col items-center justify-center min-h-[calc(100vh-160px)] px-6'>
          {/* Decorative element */}
          <div className='absolute top-1/4 left-1/2 -translate-x-1/2 w-px h-24' style={{ background: `linear-gradient(to bottom, transparent, ${GOLD}4d, transparent)` }} />

          {/* Nav links with staggered animation */}
          <nav className='flex flex-col items-center gap-2 mb-12'>
            {navItems.map(({ label, path }, index) => {
              const relativePath = path.split('/').slice(2).join('/');
              const isActive = formattedCurrentPath === relativePath;

              return (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={`relative py-3 transition-all duration-500 ${
                    menuOpen
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: menuOpen ? `${index * 75}ms` : '0ms' }}
                >
                  <span
                    className='font-serif text-3xl sm:text-4xl tracking-wide transition-colors duration-300'
                    style={{ color: isActive ? GOLD : 'rgba(255,255,255,0.8)' }}
                  >
                    {label}
                  </span>
                  {isActive && (
                    <span className='absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full' style={{ background: `${GOLD}99` }} />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Contact CTA */}
          <Link
            to={`/${currentLang}/contact`}
            onClick={() => setMenuOpen(false)}
            className={`relative group mb-10 transition-all duration-500 ${
              menuOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: menuOpen ? '300ms' : '0ms' }}
          >
            <span
              className='inline-flex items-center gap-3 px-8 py-3 text-sm uppercase tracking-[0.2em] text-black transition-all duration-500 hover:scale-[1.02]'
              style={{ background: 'linear-gradient(135deg, #E8D5A3, #C9A961)' }}
            >
              {t('nav.contact')}
              <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M17 8l4 4m0 0l-4 4m4-4H3' />
              </svg>
            </span>
          </Link>

          {/* Language Switcher */}
          <div
            className={`transition-all duration-500 ${
              menuOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: menuOpen ? '375ms' : '0ms' }}
          >
            <LanguageSwitcher isMobile={true} />
          </div>

          {/* Bottom decorative line */}
          <div className='absolute bottom-20 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent' />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
