import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t, i18n } = useTranslation();
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 10;

      gsap.to('.hero-video-wrapper', {
        x: x,
        y: y,
        duration: 1.2,
        ease: 'power2.out'
      });

      gsap.to('.hero-content-wrapper', {
        x: -x * 0.3,
        y: -y * 0.3,
        duration: 1.2,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Cinematic opening sequence
    tl
      // Letterbox bars slide open
      .to('.letterbox-top', {
        yPercent: -100,
        duration: 1.4,
        ease: 'power3.inOut'
      }, 0.8)
      .to('.letterbox-bottom', {
        yPercent: 100,
        duration: 1.4,
        ease: 'power3.inOut'
      }, 0.8)
      // Video fades in with scale
      .fromTo('.hero-video-wrapper',
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: 'power2.out' },
        0.6
      )
      // Vignette intensifies
      .to('.hero-vignette', {
        opacity: 1,
        duration: 1.5
      }, 1)
      // Content reveals with stagger
      .to('.hero-overline', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }, 1.8)
      .to('.hero-title-word', {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: 'power3.out'
      }, 2)
      .to('.hero-divider', {
        scaleX: 1,
        duration: 1,
        ease: 'power2.inOut'
      }, 2.6)
      .to('.hero-description', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }, 2.8)
      .to('.hero-cta', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out'
      }, 3.1)
      .to('.hero-scroll-indicator', {
        opacity: 1,
        duration: 0.6
      }, 3.3)
      .to('.hero-side-element', {
        opacity: 1,
        x: 0,
        duration: 0.8
      }, 3.1);
  }, []);

  // Split text into words for animation
  const splitIntoWords = (text) => {
    return text.split(' ').map((word, i) => (
      <span
        key={i}
        className='hero-title-word inline-block opacity-0 translate-y-12'
        style={{
          transform: 'translateY(48px) rotateX(-15deg)',
          transformOrigin: 'center bottom'
        }}
      >
        {word}
        {i < text.split(' ').length - 1 && '\u00A0'}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      className='relative w-full h-screen overflow-hidden bg-black'
    >
      {/* Cinematic letterbox bars */}
      <div className='letterbox-top absolute top-0 left-0 right-0 h-[12vh] bg-black z-50' />
      <div className='letterbox-bottom absolute bottom-0 left-0 right-0 h-[12vh] bg-black z-50' />

      {/* Video background */}
      <div className='hero-video-wrapper absolute inset-0 opacity-0'>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className='absolute w-full h-full object-cover'
          style={{ filter: 'brightness(0.7) contrast(1.05)' }}
        >
          <source src='/assets/videos/hero.mp4' type='video/mp4' />
        </video>

        {/* Gradient overlays for depth */}
        <div
          className='absolute inset-0'
          style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, transparent 50%, rgba(0,0,0,0.4) 100%)'
          }}
        />
        <div
          className='absolute inset-0'
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 40%)'
          }}
        />
      </div>

      {/* Cinematic vignette */}
      <div
        className='hero-vignette absolute inset-0 pointer-events-none opacity-0 z-10'
        style={{
          boxShadow: 'inset 0 0 200px 60px rgba(0,0,0,0.6)',
        }}
      />

      {/* Film grain overlay */}
      <div
        className='absolute inset-0 pointer-events-none z-20 opacity-[0.04]'
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          animation: 'grain 0.5s steps(1) infinite',
        }}
      />

      {/* Main content */}
      <div className='hero-content-wrapper relative z-30 h-full flex flex-col'>
        <div className='flex-1 flex items-center'>
          <div className='w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20'>
            <div className='max-w-5xl'>
              {/* Overline with film-style marker */}
              <div className='hero-overline opacity-0 translate-y-6 mb-6 flex items-center gap-4'>
                <div
                  className='w-8 h-px'
                  style={{ background: '#9EB6A9' }}
                />
                <span
                  className='text-[11px] md:text-xs tracking-[0.35em] uppercase font-medium'
                  style={{ color: '#9EB6A9' }}
                >
                  {t('hero.overline', 'Zurich, Switzerland')}
                </span>
              </div>

              {/* Main headline with word-by-word animation */}
              <h1 className='mb-8' style={{ perspective: '1000px' }}>
                <span className='block font-serif text-[clamp(3rem,8vw,7rem)] leading-[1] tracking-[-0.03em]'>
                  <span style={{ color: '#EAEBEC' }}>
                    {splitIntoWords(t('hero.titleLine1', 'Cinematic vision'))}
                  </span>
                </span>
                <span className='block font-serif text-[clamp(3rem,8vw,7rem)] leading-[1] tracking-[-0.03em] mt-2'>
                  <span style={{ color: '#EAEBEC' }}>
                    {splitIntoWords(t('hero.titleLine2', 'for exceptional'))}
                  </span>
                </span>
                <span className='block font-serif italic text-[clamp(3rem,8vw,7rem)] leading-[1] tracking-[-0.03em] mt-2'>
                  <span style={{ color: '#9EB6A9' }}>
                    {splitIntoWords(t('hero.titleLine3', 'brands'))}
                  </span>
                </span>
              </h1>

              {/* Animated divider */}
              <div className='flex items-center gap-4 mb-8'>
                <div
                  className='hero-divider h-px origin-left scale-x-0'
                  style={{
                    width: '120px',
                    background: 'linear-gradient(90deg, #9EB6A9, rgba(158, 182, 169, 0.2))'
                  }}
                />
                <span
                  className='hero-divider text-[10px] tracking-[0.3em] uppercase opacity-0'
                  style={{ color: 'rgba(158, 182, 169, 0.5)' }}
                >
                  Since 2024
                </span>
              </div>

              {/* Description */}
              <p
                className='hero-description text-lg md:text-xl leading-relaxed max-w-xl mb-12 opacity-0 translate-y-8'
                style={{
                  color: 'rgba(234, 235, 236, 0.75)',
                  fontWeight: 300,
                  letterSpacing: '0.015em'
                }}
              >
                {t('hero.description', 'Premium video production and photography that elevates how the world perceives your brand. Swiss precision meets artistic storytelling.')}
              </p>

              {/* CTAs with Play Reel button */}
              <div className='flex flex-col sm:flex-row items-start sm:items-center gap-6'>
                <Link
                  to={`/${i18n.language}/contact`}
                  className='hero-cta group relative inline-flex items-center justify-center px-10 py-4 opacity-0 translate-y-6 overflow-hidden'
                  style={{
                    background: '#EAEBEC',
                    color: '#0a0a0a',
                  }}
                >
                  <span className='relative z-10 text-sm tracking-[0.15em] uppercase font-medium'>
                    {t('hero.ctaPrimary', 'Start a Project')}
                  </span>
                  <span
                    className='absolute inset-0 bg-[#9EB6A9] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out'
                  />
                  <span className='relative z-10 ml-3 group-hover:translate-x-1 transition-transform duration-300'>
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                    </svg>
                  </span>
                </Link>

                <Link
                  to={`/${i18n.language}/portfolio`}
                  className='hero-cta group inline-flex items-center justify-center px-10 py-4 opacity-0 translate-y-6 transition-all duration-300'
                  style={{
                    color: '#EAEBEC',
                    border: '1px solid rgba(234, 235, 236, 0.25)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(158, 182, 169, 0.6)';
                    e.currentTarget.style.background = 'rgba(158, 182, 169, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(234, 235, 236, 0.25)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <span className='text-sm tracking-[0.15em] uppercase font-medium'>
                    {t('hero.ctaSecondary', 'View Portfolio')}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className='hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-0 z-40'>
          <span
            className='text-[10px] tracking-[0.35em] uppercase mb-3'
            style={{ color: 'rgba(158, 182, 169, 0.7)' }}
          >
            {t('hero.scroll', 'Scroll')}
          </span>
          <div className='relative w-5 h-8 rounded-full border border-white/20 flex justify-center'>
            <div
              className='w-1 h-2 rounded-full mt-1.5 animate-scroll-down'
              style={{ background: '#9EB6A9' }}
            />
          </div>
        </div>
      </div>

      {/* Editorial side element */}
      <div
        className='hero-side-element absolute right-6 md:right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 opacity-0 z-30'
        style={{ writingMode: 'vertical-rl' }}
      >
        <span
          className='text-[10px] tracking-[0.4em] uppercase'
          style={{ color: 'rgba(158, 182, 169, 0.5)' }}
        >
          Prestige Production
        </span>
        <div
          className='w-px h-16'
          style={{ background: 'linear-gradient(180deg, transparent, rgba(158, 182, 169, 0.3), transparent)' }}
        />
        <span
          className='text-[10px] tracking-[0.4em] uppercase'
          style={{ color: 'rgba(158, 182, 169, 0.5)' }}
        >
          Est. 2024
        </span>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-1%, -1%); }
          20% { transform: translate(1%, 1%); }
          30% { transform: translate(-1%, 1%); }
          40% { transform: translate(1%, -1%); }
          50% { transform: translate(-1%, 0%); }
          60% { transform: translate(1%, 0%); }
          70% { transform: translate(0%, 1%); }
          80% { transform: translate(0%, -1%); }
          90% { transform: translate(1%, 1%); }
        }

        @keyframes scroll-down {
          0% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.5; }
          100% { transform: translateY(0); opacity: 1; }
        }

        .animate-scroll-down {
          animation: scroll-down 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
