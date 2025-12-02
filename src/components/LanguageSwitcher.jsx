import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { trackLanguageChange } from '../utils/analytics';

// Consistent gold colors
const GOLD = '#C9A961';
const GOLD_LIGHT = '#E8D5A3';

const LanguageSwitcher = ({ isMobile = false }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', short: 'EN' },
    { code: 'fr', name: 'Français', short: 'FR' },
    { code: 'de', name: 'Deutsch', short: 'DE' },
    { code: 'it', name: 'Italiano', short: 'IT' },
  ];

  const currentLanguage =
    languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
    trackLanguageChange(lng);
    const currentPath = location.pathname.split('/').slice(2).join('/');
    navigate(`/${lng}/${currentPath}`);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside (only for desktop)
  useEffect(() => {
    if (isMobile) return;

    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile]);

  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Mobile version - horizontal language pills
  if (isMobile) {
    return (
      <div className='flex flex-col items-center gap-4'>
        <span className='text-[11px] uppercase tracking-[0.2em] text-white/40'>
          Language
        </span>
        <div className='flex items-center gap-2'>
          {languages.map(language => (
            <button
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className={`px-4 py-2 text-[12px] uppercase tracking-[0.15em] border transition-all duration-300 touch-manipulation ${
                language.code === i18n.language
                  ? 'text-black'
                  : 'bg-transparent text-white/60 border-white/20 hover:border-white/40 hover:text-white'
              }`}
              style={language.code === i18n.language ? {
                background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})`,
                borderColor: GOLD
              } : {}}
            >
              {language.short}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Desktop version - minimal dropdown
  return (
    <div className='relative' ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className='group flex items-center gap-2 px-3 py-1.5 text-[12px] uppercase tracking-[0.15em] text-white/60 hover:text-white transition-all duration-300'
        aria-label='Language selector'
        aria-expanded={isOpen}
        aria-haspopup='listbox'
      >
        <span>{currentLanguage.short}</span>
        <svg
          className={`w-3 h-3 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={1.5}
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute top-full right-0 mt-2 min-w-[140px] bg-black/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden transition-all duration-300 ${
          isOpen
            ? 'opacity-100 visible translate-y-0'
            : 'opacity-0 invisible -translate-y-2'
        }`}
      >
        {/* Decorative top line */}
        <div className='h-px w-full' style={{ background: `linear-gradient(to right, transparent, ${GOLD}66, transparent)` }} />

        <div className='py-2' role='listbox'>
          {languages.map(language => (
            <button
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-left transition-all duration-200 group ${
                language.code === i18n.language
                  ? ''
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
              style={language.code === i18n.language ? { color: GOLD } : {}}
              role='option'
              aria-selected={language.code === i18n.language}
            >
              <div className='flex items-center gap-3'>
                <span className='text-[11px] uppercase tracking-[0.1em] w-6'>
                  {language.short}
                </span>
                <span className='text-sm'>{language.name}</span>
              </div>
              {language.code === i18n.language && (
                <span className='w-1.5 h-1.5 rounded-full' style={{ background: GOLD }} />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
