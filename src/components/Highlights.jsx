import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, useParams } from 'react-router-dom';
import VideoCarousel from './VideoCarousel';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

// Consistent gold colors
const GOLD = '#C9A961';
const GOLD_LIGHT = '#E8D5A3';

const Highlights = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || i18n.language || 'en';
  const sectionRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Cinematic entrance sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#highlights',
          start: 'top 85%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        }
      });

      // Spotlight + overline
      tl.fromTo('.spotlight-beam',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }
      )
      .fromTo('.highlights-overline',
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.8'
      )
      // Title reveal
      .fromTo('.title-line-1',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo('.title-line-2',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
      // Navigation links
      .fromTo('.highlights-nav',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      )
      // Bottom hint
      .fromTo('.film-detail',
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.2'
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id='highlights'
      ref={sectionRef}
      className='relative w-full overflow-hidden'
      style={{
        background: '#050505',
      }}
    >
      {/* Film grain overlay */}
      <div
        className='film-grain absolute inset-0 pointer-events-none z-20 opacity-[0.03]'
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '150px 150px',
        }}
      />

      {/* Cinematic spotlight beam */}
      <div className='spotlight-beam absolute top-0 left-1/2 -translate-x-1/2 w-[200vw] h-[80vh] pointer-events-none opacity-0'
        style={{
          background: `conic-gradient(from 180deg at 50% 0%, transparent 45%, ${GOLD}08 48%, ${GOLD}10 50%, ${GOLD}08 52%, transparent 55%)`,
        }}
      />

      {/* Subtle top border */}
      <div className='absolute top-0 left-0 w-full h-px opacity-10'
        style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }}
      />

      <div className='relative z-10 pt-16 md:pt-20 pb-16 md:pb-20'>
        {/* Main header container - compact */}
        <div className='max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 mb-10 md:mb-14'>

          {/* Title row with navigation */}
          <div className='flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-12'>
            {/* Left: Title block */}
            <div>
              {/* Overline with accent */}
              <div className='highlights-overline flex items-center gap-3 mb-4'>
                <div className='w-8 md:w-12 h-px' style={{ background: `${GOLD}66` }} />
                <span className='font-mono text-[10px] tracking-[0.3em] uppercase' style={{ color: GOLD }}>
                  {t('highlights.overline', 'Selected Reels')}
                </span>
              </div>

              {/* Cinematic title - more compact */}
              <div className='relative' style={{ perspective: '1000px' }}>
                <h2 className='relative flex flex-wrap items-baseline gap-x-4'>
                  <span
                    className='title-line-1 font-serif text-[clamp(2rem,6vw,5rem)] leading-[1] tracking-[-0.03em] text-white/90'
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontWeight: 400,
                    }}
                  >
                    {t('highlights.titleLine1', 'Cinematic')}
                  </span>
                  <span
                    className='title-line-2 font-serif italic text-[clamp(2rem,6vw,5rem)] leading-[1] tracking-[-0.03em]'
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontWeight: 400,
                      color: GOLD,
                    }}
                  >
                    {t('highlights.titleLine2', 'Excellence')}
                  </span>
                </h2>
              </div>
            </div>

            {/* Right: Single subtle link */}
            <div className='highlights-nav'>
              <Link
                to={`/${currentLang}/portfolio`}
                className='group flex items-center gap-3 transition-all duration-500'
              >
                <span
                  className='text-xs tracking-[0.2em] uppercase transition-colors duration-300 group-hover:text-white/80'
                  style={{ color: 'rgba(234, 235, 236, 0.4)' }}
                >
                  {t('highlights.fullPortfolio', 'All Projects')}
                </span>
                <svg
                  className='w-3.5 h-3.5 transition-all duration-500 group-hover:translate-x-1'
                  style={{ color: `${GOLD}80` }}
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Video Carousel Container */}
        <div className='relative'>
          {/* Side gradients for depth */}
          <div
            className='absolute left-0 top-0 w-32 h-full pointer-events-none z-10'
            style={{ background: 'linear-gradient(90deg, #050505, transparent)' }}
          />
          <div
            className='absolute right-0 top-0 w-32 h-full pointer-events-none z-10'
            style={{ background: 'linear-gradient(-90deg, #050505, transparent)' }}
          />

          <VideoCarousel />
        </div>

        {/* Bottom hint */}
        <div className='max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 mt-8 md:mt-12'>
          <div className='flex items-center justify-center'>
            <div className='film-detail flex items-center gap-3'>
              <span className='font-mono text-[10px] tracking-wider text-white/25'>SWIPE TO EXPLORE</span>
              <svg
                className='w-3.5 h-3.5'
                style={{ color: `${GOLD}66` }}
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1} d='M14 5l7 7m0 0l-7 7m7-7H3' />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
