import { useGSAP } from '@gsap/react';
import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { Link, useParams } from 'react-router-dom';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const SmiProject2025 = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || i18n.language || 'en';

  const containerRef = useRef();
  const videoRef = useRef();
  const heroVideoRef = useRef();
  const immersiveRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showImmersive, setShowImmersive] = useState(false);

  const CLOUDFRONT_URL = import.meta.env.VITE_CLOUDFRONT_URL;
  const teaserVideo = `${CLOUDFRONT_URL}/videos/SMI_NOV_2025_OFFICIAL_TEASER.mp4`;
  const teaserThumbnail = '/assets/images/SMI_NOV_2025_thumbnail.png';
  const youtubeUrl = 'https://youtube.com/shorts/WDvdfuhdF-g';

  useEffect(() => {
    document.title = t(
      'projects.smi2025.pageTitle',
      'Swiss Mining Institute 2025 | Prestige Production',
    );
  }, [t]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      const heroTl = gsap.timeline({ delay: 0.2 });

      heroTl
        .fromTo('.hero-video-container',
          { opacity: 0, scale: 0.9, y: 60 },
          { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: 'power4.out' }
        )
        .fromTo('.hero-title',
          { opacity: 0, x: 60 },
          { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out' },
          '-=0.8'
        )
        .fromTo('.hero-subtitle',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
          '-=0.6'
        )
        .fromTo('.hero-meta',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo('.hero-cta',
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
          '-=0.3'
        );

      // Back link
      gsap.fromTo('.back-link',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, delay: 0.6, duration: 1, ease: 'power2.out' }
      );

      // Stats section
      gsap.fromTo('.stats-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stats-section',
            start: 'top 80%',
          }
        }
      );

      // Immersive section - video scales up on scroll
      gsap.fromTo('.immersive-video',
        { scale: 0.7, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.immersive-section',
            start: 'top 80%',
            end: 'center center',
            scrub: 1,
          }
        }
      );

      // Description text
      gsap.fromTo('.description-text',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.description-section',
            start: 'top 80%',
          }
        }
      );

      // Coming soon cards
      gsap.fromTo('.coming-soon-card',
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.coming-soon-section',
            start: 'top 80%',
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handlePlayVideo = () => {
    if (heroVideoRef.current) {
      if (isPlaying) {
        heroVideoRef.current.pause();
      } else {
        heroVideoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const openImmersivePlayer = () => {
    setShowImmersive(true);
    document.body.style.overflow = 'hidden';
  };

  const closeImmersivePlayer = () => {
    setShowImmersive(false);
    document.body.style.overflow = '';
    if (immersiveRef.current) {
      immersiveRef.current.pause();
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {t(
            'projects.smi2025.seoTitle',
            'Swiss Mining Institute 2025 - Gala Dinner & Afterparty | Prestige Production',
          )}
        </title>
        <meta
          name='description'
          content={t(
            'projects.smi2025.seoDescription',
            'Exclusive coverage of the Swiss Mining Institute 2025 gala dinner and afterparty. Featuring 100+ companies and 1000+ investors at Europe\'s most prestigious mining conference.',
          )}
        />
        <meta property='og:type' content='article' />
        <meta name='twitter:card' content='summary_large_image' />
        <link
          rel='canonical'
          href={`https://prestigeproduction.ch/${currentLang}/portfolio/smi-2025`}
        />
      </Helmet>

      <section
        ref={containerRef}
        className='min-h-screen text-white relative overflow-hidden'
        style={{ background: '#0a0a0a' }}
      >
        {/* Animated film grain overlay - matching Portfolio */}
        <div
          className='fixed inset-0 pointer-events-none z-50 opacity-[0.04]'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Cinematic vignette - matching Portfolio */}
        <div
          className='fixed inset-0 pointer-events-none z-40'
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 100%)',
          }}
        />

        {/* Subtle gold ambient glow - matching Portfolio */}
        <div
          className='fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none z-30 opacity-20'
          style={{
            background: 'radial-gradient(ellipse at center, rgba(201, 169, 98, 0.15) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />

        <div className='relative z-10'>
          {/* Navigation - Editorial style matching Portfolio */}
          <div className='max-w-7xl mx-auto px-6 lg:px-16 pt-8'>
            <div className='flex items-center gap-6'>
              <div className='w-16 h-px bg-gradient-to-r from-[#C9A962] to-transparent' />
              <Link
                to={`/${currentLang}/portfolio`}
                className='back-link inline-flex items-center text-xs tracking-[0.3em] uppercase opacity-0 transition-all duration-300 group'
                style={{ color: '#C9A962' }}
              >
                <svg
                  className='w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M15 19l-7-7 7-7' />
                </svg>
                {t('projects.backToPortfolio', 'Back to portfolio')}
              </Link>
            </div>
          </div>

          {/* Hero Section - Editorial Layout matching Portfolio */}
          <div className='max-w-7xl mx-auto px-6 lg:px-16 pt-12 pb-24'>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center'>

              {/* Left: Vertical Video */}
              <div className='lg:col-span-5 hero-video-container opacity-0'>
                <div className='relative mx-auto lg:mx-0' style={{ maxWidth: '340px' }}>
                  {/* Ambient glow on hover */}
                  <div
                    className='absolute -inset-4 opacity-60 blur-2xl pointer-events-none'
                    style={{
                      background: 'radial-gradient(ellipse at center, rgba(201, 169, 98, 0.2) 0%, transparent 70%)',
                    }}
                  />

                  {/* Video container */}
                  <div
                    className='relative aspect-[9/16] overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]'
                    style={{ background: '#0d0d0d' }}
                  >
                    <video
                      ref={heroVideoRef}
                      src={teaserVideo}
                      poster={teaserThumbnail}
                      className='w-full h-full object-cover transition-transform duration-700 hover:scale-105'
                      playsInline
                      muted
                      loop
                      preload='metadata'
                      onClick={handlePlayVideo}
                    />

                    {/* Play overlay */}
                    {!isPlaying && (
                      <div
                        className='absolute inset-0 flex items-center justify-center cursor-pointer transition-colors duration-300'
                        onClick={handlePlayVideo}
                      >
                        <div
                          className='w-20 h-20 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:backdrop-blur-md'
                          style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                          }}
                        >
                          <svg className='w-8 h-8 ml-1' fill='rgba(255, 255, 255, 0.9)' viewBox='0 0 24 24'>
                            <path d='M8 5v14l11-7z' />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Video badge */}
                    <div className='absolute top-4 left-4'>
                      <span
                        className='px-3 py-1.5 text-[9px] tracking-[0.2em] uppercase backdrop-blur-md'
                        style={{
                          background: 'rgba(10, 10, 10, 0.6)',
                          border: '1px solid rgba(201, 169, 98, 0.25)',
                          color: '#C9A962',
                        }}
                      >
                        {t('projects.smi2025.teaserBadge', 'Teaser')}
                      </span>
                    </div>

                    {/* Elegant border on hover */}
                    <div
                      className='absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none'
                      style={{
                        border: '1px solid rgba(201, 169, 98, 0.35)',
                        boxShadow: 'inset 0 0 40px rgba(201, 169, 98, 0.05)',
                      }}
                    />
                  </div>

                  {/* Video caption */}
                  <p
                    className='text-center text-sm mt-4 tracking-wide'
                    style={{ color: 'rgba(245, 243, 238, 0.4)' }}
                  >
                    {t('projects.smi2025.tapToPlay', 'Tap to play')}
                  </p>
                </div>
              </div>

              {/* Right: Typography - Editorial style matching Portfolio */}
              <div className='lg:col-span-7 text-center lg:text-left'>
                <div className='hero-title opacity-0'>
                  <p
                    className='text-xs tracking-[0.4em] uppercase mb-6'
                    style={{ color: '#C9A962' }}
                  >
                    {t('projects.smi2025.label', 'November 2025')}
                  </p>
                  <h1
                    className='text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mb-6'
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      color: '#F5F3EE',
                      lineHeight: 0.95,
                    }}
                  >
                    Swiss Mining <br />
                    <span className='italic' style={{ color: '#C9A962' }}>Institute</span>
                  </h1>
                </div>

                <div className='hero-subtitle opacity-0'>
                  <div className='flex items-start gap-8 mb-8'>
                    <div
                      className='w-px h-16 flex-shrink-0 mt-1 hidden lg:block'
                      style={{ background: 'linear-gradient(to bottom, #C9A962, transparent)' }}
                    />
                    <p
                      className='text-lg lg:text-xl leading-relaxed font-light'
                      style={{ color: 'rgba(245, 243, 238, 0.6)' }}
                    >
                      {t('projects.smi2025.tagline', 'Gala Dinner & Afterparty')}
                    </p>
                  </div>
                </div>

                <div className='hero-meta opacity-0 flex flex-wrap gap-8 justify-center lg:justify-start mb-10'>
                  <div className='text-center lg:text-left'>
                    <p
                      className='text-4xl lg:text-5xl font-light tabular-nums'
                      style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5F3EE' }}
                    >
                      100+
                    </p>
                    <p
                      className='text-[10px] tracking-[0.3em] uppercase mt-1'
                      style={{ color: 'rgba(201, 169, 98, 0.6)' }}
                    >
                      {t('projects.smi2025.companies', 'Companies')}
                    </p>
                  </div>
                  <div className='w-px h-16 hidden sm:block' style={{ background: 'rgba(201, 169, 98, 0.2)' }} />
                  <div className='text-center lg:text-left'>
                    <p
                      className='text-4xl lg:text-5xl font-light tabular-nums'
                      style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5F3EE' }}
                    >
                      1000+
                    </p>
                    <p
                      className='text-[10px] tracking-[0.3em] uppercase mt-1'
                      style={{ color: 'rgba(201, 169, 98, 0.6)' }}
                    >
                      {t('projects.smi2025.investors', 'Investors')}
                    </p>
                  </div>
                  <div className='w-px h-16 hidden sm:block' style={{ background: 'rgba(201, 169, 98, 0.2)' }} />
                  <div className='text-center lg:text-left'>
                    <p
                      className='text-4xl lg:text-5xl font-light tabular-nums'
                      style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5F3EE' }}
                    >
                      2
                    </p>
                    <p
                      className='text-[10px] tracking-[0.3em] uppercase mt-1'
                      style={{ color: 'rgba(201, 169, 98, 0.6)' }}
                    >
                      {t('projects.smi2025.days', 'Days')}
                    </p>
                  </div>
                </div>

                <div className='hero-cta opacity-0'>
                  <a
                    href={youtubeUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group inline-flex items-center gap-5 px-10 py-5 transition-all duration-500 hover:gap-7'
                    style={{
                      background: 'linear-gradient(135deg, #C9A962 0%, #A68B4B 100%)',
                      color: '#0a0a0a',
                      boxShadow: '0 20px 40px -10px rgba(201, 169, 98, 0.3)',
                    }}
                  >
                    <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M8 5v14l11-7z' />
                    </svg>
                    <span className='text-sm tracking-[0.2em] uppercase font-semibold'>
                      {t('projects.smi2025.watchTeaser', 'Watch Full Teaser')}
                    </span>
                    <svg className='w-5 h-5 transition-transform duration-300 group-hover:translate-x-1' fill='none' stroke='currentColor' strokeWidth={2} viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M17 8l4 4m0 0l-4 4m4-4H3' />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section - Editorial style matching Portfolio */}
          <div className='stats-section py-24'>
            <div className='max-w-7xl mx-auto px-6 lg:px-16'>
              {/* Section label */}
              <div className='flex items-center gap-4 mb-16'>
                <span
                  className='text-[10px] tracking-[0.4em] uppercase'
                  style={{ color: 'rgba(201, 169, 98, 0.6)' }}
                >
                  {t('projects.smi2025.eventDetails', 'Event Details')}
                </span>
                <div className='flex-1 h-px' style={{ background: 'rgba(201, 169, 98, 0.15)' }} />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                <div
                  className='stats-card group relative p-8 transition-all duration-500'
                  style={{
                    background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.04) 0%, rgba(139, 115, 85, 0.02) 100%)',
                    border: '1px solid rgba(201, 169, 98, 0.12)',
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'
                    style={{ background: 'rgba(201, 169, 98, 0.03)' }}
                  />

                  <div className='relative'>
                    <div
                      className='w-12 h-12 flex items-center justify-center mb-6'
                      style={{
                        background: 'rgba(201, 169, 98, 0.1)',
                        border: '1px solid rgba(201, 169, 98, 0.2)',
                      }}
                    >
                      <svg className='w-5 h-5' fill='none' stroke='#C9A962' strokeWidth={1.5} viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                      </svg>
                    </div>
                    <p
                      className='text-[10px] tracking-[0.3em] uppercase mb-3'
                      style={{ color: 'rgba(201, 169, 98, 0.6)' }}
                    >
                      {t('projects.smi2025.eventDate', 'Event Date')}
                    </p>
                    <p
                      className='text-2xl font-light'
                      style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5F3EE' }}
                    >
                      20-21 Nov 2025
                    </p>
                  </div>
                </div>

                <div
                  className='stats-card group relative p-8 transition-all duration-500'
                  style={{
                    background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.04) 0%, rgba(139, 115, 85, 0.02) 100%)',
                    border: '1px solid rgba(201, 169, 98, 0.12)',
                  }}
                >
                  <div
                    className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'
                    style={{ background: 'rgba(201, 169, 98, 0.03)' }}
                  />

                  <div className='relative'>
                    <div
                      className='w-12 h-12 flex items-center justify-center mb-6'
                      style={{
                        background: 'rgba(201, 169, 98, 0.1)',
                        border: '1px solid rgba(201, 169, 98, 0.2)',
                      }}
                    >
                      <svg className='w-5 h-5' fill='none' stroke='#C9A962' strokeWidth={1.5} viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' />
                      </svg>
                    </div>
                    <p
                      className='text-[10px] tracking-[0.3em] uppercase mb-3'
                      style={{ color: 'rgba(201, 169, 98, 0.6)' }}
                    >
                      {t('projects.smi2025.filmingDate', 'Filming Date')}
                    </p>
                    <p
                      className='text-2xl font-light'
                      style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5F3EE' }}
                    >
                      25 Nov 2025
                    </p>
                  </div>
                </div>

                <div
                  className='stats-card group relative p-8 transition-all duration-500'
                  style={{
                    background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.04) 0%, rgba(139, 115, 85, 0.02) 100%)',
                    border: '1px solid rgba(201, 169, 98, 0.12)',
                  }}
                >
                  <div
                    className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'
                    style={{ background: 'rgba(201, 169, 98, 0.03)' }}
                  />

                  <div className='relative'>
                    <div
                      className='w-12 h-12 flex items-center justify-center mb-6'
                      style={{
                        background: 'rgba(201, 169, 98, 0.1)',
                        border: '1px solid rgba(201, 169, 98, 0.2)',
                      }}
                    >
                      <svg className='w-5 h-5' fill='none' stroke='#C9A962' strokeWidth={1.5} viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                        <path strokeLinecap='round' strokeLinejoin='round' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                      </svg>
                    </div>
                    <p
                      className='text-[10px] tracking-[0.3em] uppercase mb-3'
                      style={{ color: 'rgba(201, 169, 98, 0.6)' }}
                    >
                      {t('projects.smi2025.location', 'Location')}
                    </p>
                    <p
                      className='text-2xl font-light'
                      style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5F3EE' }}
                    >
                      Zurich, CH
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Immersive Fullscreen Player */}
        {showImmersive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-[100] bg-black flex items-center justify-center'
            onClick={closeImmersivePlayer}
          >
            {/* Close button */}
            <button
              onClick={closeImmersivePlayer}
              className='absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300'
              aria-label='Close'
            >
              <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>

            {/* Fullscreen vertical video */}
            <div
              className='relative h-full max-h-screen aspect-[9/16]'
              onClick={e => e.stopPropagation()}
            >
              <video
                ref={immersiveRef}
                src={teaserVideo}
                className='w-full h-full object-contain'
                playsInline
                autoPlay
                loop
                controls
                preload='metadata'
              />
            </div>
          </motion.div>
        )}
      </section>
    </>
  );
};

export default SmiProject2025;
