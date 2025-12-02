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
  const teaserVideo = `${CLOUDFRONT_URL}/videos/smi_2025_teaser_vertical.mp4`;

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
        style={{
          background: 'linear-gradient(180deg, #0a0a0a 0%, #111111 30%, #0d1f1d 70%, #0a0a0a 100%)',
        }}
      >
        {/* Cinematic grain overlay */}
        <div
          className='fixed inset-0 pointer-events-none z-50 opacity-[0.03]'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Ambient glow effects */}
        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
          <div className='absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-[#205c57]/20 to-[#9eb6a9]/10 rounded-full blur-[120px] animate-pulse' style={{ animationDuration: '8s' }} />
          <div className='absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-[#9eb6a9]/10 to-[#205c57]/15 rounded-full blur-[100px] animate-pulse' style={{ animationDuration: '12s', animationDelay: '2s' }} />
        </div>

        <div className='relative z-10'>
          {/* Navigation */}
          <div className='max-w-7xl mx-auto px-6 pt-8'>
            <Link
              to={`/${currentLang}/portfolio`}
              className='back-link inline-flex items-center text-sm text-white/50 hover:text-[#9eb6a9] transition-all duration-300 group opacity-0'
            >
              <svg
                className='w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M15 19l-7-7 7-7' />
              </svg>
              <span className='tracking-wider uppercase text-xs'>{t('projects.backToPortfolio', 'Back to portfolio')}</span>
            </Link>
          </div>

          {/* Hero Section - Editorial Layout */}
          <div className='max-w-7xl mx-auto px-6 pt-12 pb-24'>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center'>

              {/* Left: Vertical Video */}
              <div className='lg:col-span-5 hero-video-container opacity-0'>
                <div className='relative mx-auto lg:mx-0' style={{ maxWidth: '340px' }}>
                  {/* Glow effect behind video */}
                  <div className='absolute -inset-4 bg-gradient-to-b from-[#9eb6a9]/20 via-[#205c57]/30 to-[#9eb6a9]/20 rounded-3xl blur-2xl opacity-60' />

                  {/* Video container */}
                  <div className='relative aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10'>
                    <video
                      ref={heroVideoRef}
                      src={teaserVideo}
                      className='w-full h-full object-cover'
                      playsInline
                      muted
                      loop
                      preload='metadata'
                      onClick={handlePlayVideo}
                    />

                    {/* Play overlay */}
                    {!isPlaying && (
                      <div
                        className='absolute inset-0 flex items-center justify-center cursor-pointer bg-black/20 hover:bg-black/10 transition-colors duration-300'
                        onClick={handlePlayVideo}
                      >
                        <div className='w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:scale-110 hover:bg-white/20 transition-all duration-300'>
                          <svg className='w-8 h-8 text-white ml-1' fill='currentColor' viewBox='0 0 24 24'>
                            <path d='M8 5v14l11-7z' />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Video badge */}
                    <div className='absolute top-4 left-4'>
                      <span className='px-3 py-1.5 bg-black/60 backdrop-blur-md text-white text-xs tracking-wider uppercase rounded-full border border-white/10'>
                        {t('projects.smi2025.teaserBadge', 'Teaser')}
                      </span>
                    </div>
                  </div>

                  {/* Video caption */}
                  <p className='text-center text-white/40 text-sm mt-4 tracking-wide'>
                    {t('projects.smi2025.tapToPlay', 'Tap to play')}
                  </p>
                </div>
              </div>

              {/* Right: Typography */}
              <div className='lg:col-span-7 text-center lg:text-left'>
                <div className='hero-title opacity-0'>
                  <p className='text-[#9eb6a9] text-sm tracking-[0.3em] uppercase mb-4 font-light'>
                    {t('projects.smi2025.label', 'November 2025')}
                  </p>
                  <h1 className='font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight leading-[0.9] mb-6'>
                    <span className='block text-white/90'>Swiss Mining</span>
                    <span className='block text-[#9eb6a9]'>Institute</span>
                  </h1>
                </div>

                <div className='hero-subtitle opacity-0'>
                  <p className='text-xl sm:text-2xl lg:text-3xl text-white/60 font-light mb-8 leading-relaxed'>
                    {t('projects.smi2025.tagline', 'Gala Dinner & Afterparty')}
                  </p>
                </div>

                <div className='hero-meta opacity-0 flex flex-wrap gap-6 justify-center lg:justify-start mb-10'>
                  <div className='text-center lg:text-left'>
                    <p className='text-3xl lg:text-4xl font-light text-white'>100+</p>
                    <p className='text-white/40 text-sm tracking-wider uppercase'>{t('projects.smi2025.companies', 'Companies')}</p>
                  </div>
                  <div className='w-px h-12 bg-white/10 hidden sm:block' />
                  <div className='text-center lg:text-left'>
                    <p className='text-3xl lg:text-4xl font-light text-white'>1000+</p>
                    <p className='text-white/40 text-sm tracking-wider uppercase'>{t('projects.smi2025.investors', 'Investors')}</p>
                  </div>
                  <div className='w-px h-12 bg-white/10 hidden sm:block' />
                  <div className='text-center lg:text-left'>
                    <p className='text-3xl lg:text-4xl font-light text-white'>2</p>
                    <p className='text-white/40 text-sm tracking-wider uppercase'>{t('projects.smi2025.days', 'Days')}</p>
                  </div>
                </div>

                <div className='hero-cta opacity-0'>
                  <button
                    onClick={openImmersivePlayer}
                    className='inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#205c57] to-[#9eb6a9] text-black font-medium rounded-full hover:shadow-2xl hover:shadow-[#9eb6a9]/20 transition-all duration-500 hover:scale-105 group'
                  >
                    <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M8 5v14l11-7z' />
                    </svg>
                    <span className='tracking-wide'>{t('projects.smi2025.watchTeaser', 'Watch Full Teaser')}</span>
                    <svg className='w-4 h-4 group-hover:translate-x-1 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className='stats-section py-20 border-y border-white/5'>
            <div className='max-w-6xl mx-auto px-6'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='stats-card bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/5 hover:border-[#9eb6a9]/30 transition-colors duration-500'>
                  <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-[#205c57]/30 to-[#9eb6a9]/20 flex items-center justify-center mb-6'>
                    <svg className='w-6 h-6 text-[#9eb6a9]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                    </svg>
                  </div>
                  <p className='text-white/40 text-sm tracking-wider uppercase mb-2'>{t('projects.smi2025.eventDate', 'Event Date')}</p>
                  <p className='text-2xl text-white font-light'>20-21 Nov 2025</p>
                </div>

                <div className='stats-card bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/5 hover:border-[#9eb6a9]/30 transition-colors duration-500'>
                  <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-[#205c57]/30 to-[#9eb6a9]/20 flex items-center justify-center mb-6'>
                    <svg className='w-6 h-6 text-[#9eb6a9]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' />
                    </svg>
                  </div>
                  <p className='text-white/40 text-sm tracking-wider uppercase mb-2'>{t('projects.smi2025.filmingDate', 'Filming Date')}</p>
                  <p className='text-2xl text-white font-light'>25 Nov 2025</p>
                </div>

                <div className='stats-card bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/5 hover:border-[#9eb6a9]/30 transition-colors duration-500'>
                  <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-[#205c57]/30 to-[#9eb6a9]/20 flex items-center justify-center mb-6'>
                    <svg className='w-6 h-6 text-[#9eb6a9]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                    </svg>
                  </div>
                  <p className='text-white/40 text-sm tracking-wider uppercase mb-2'>{t('projects.smi2025.location', 'Location')}</p>
                  <p className='text-2xl text-white font-light'>Zurich, CH</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className='description-section py-24'>
            <div className='max-w-4xl mx-auto px-6 text-center'>
              <p className='description-text text-2xl sm:text-3xl lg:text-4xl text-white/80 font-light leading-relaxed mb-8'>
                {t('projects.smi2025.description1', 'The Swiss Mining Institute returned for its 2025 edition, bringing together')}
                <span className='text-[#9eb6a9]'> {t('projects.smi2025.description1Highlight', "Europe's elite mining industry leaders")}</span>.
              </p>
              <p className='description-text text-lg sm:text-xl text-white/50 font-light leading-relaxed'>
                {t('projects.smi2025.description2', 'We captured the essence of the gala dinner and exclusive afterparty, where deals are made and connections forged over champagne and conversation.')}
              </p>
            </div>
          </div>

          {/* Immersive Video Section */}
          <div className='immersive-section py-32 relative'>
            <div className='max-w-lg mx-auto px-6'>
              <div className='immersive-video relative aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 cursor-pointer group' onClick={openImmersivePlayer}>
                <video
                  src={teaserVideo}
                  className='w-full h-full object-cover'
                  playsInline
                  muted
                  loop
                  autoPlay
                  preload='metadata'
                />

                {/* Hover overlay */}
                <div className='absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center'>
                  <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                    <div className='w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20'>
                      <svg className='w-10 h-10 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24' strokeWidth={1.5}>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15' />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Caption */}
                <div className='absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent'>
                  <p className='text-white/80 text-sm tracking-wider uppercase'>{t('projects.smi2025.clickToExpand', 'Click to expand')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Coming Soon Section */}
          <div className='coming-soon-section py-24 border-t border-white/5'>
            <div className='max-w-6xl mx-auto px-6'>
              <div className='text-center mb-16'>
                <p className='text-[#9eb6a9] text-sm tracking-[0.3em] uppercase mb-4'>{t('projects.smi2025.comingSoonLabel', 'Stay tuned')}</p>
                <h2 className='text-4xl sm:text-5xl font-light text-white mb-4'>
                  {t('projects.smi2025.comingSoonTitle', 'More to come')}
                </h2>
                <p className='text-white/50 text-lg max-w-2xl mx-auto'>
                  {t('projects.smi2025.comingSoonDesc', 'Full aftermovie, photo gallery, and more content coming soon.')}
                </p>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {[
                  { icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z', title: t('projects.smi2025.comingAftermovie', 'Aftermovie'), desc: t('projects.smi2025.comingAftermovieDesc', 'Full cinematic coverage') },
                  { icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', title: t('projects.smi2025.comingGallery', 'Photo Gallery'), desc: t('projects.smi2025.comingGalleryDesc', 'Event photography') },
                  { icon: 'M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M9 12h6m-6 4h6', title: t('projects.smi2025.comingReels', 'Social Reels'), desc: t('projects.smi2025.comingReelsDesc', 'Short-form content') },
                ].map((item, i) => (
                  <div key={i} className='coming-soon-card relative bg-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/5 overflow-hidden group hover:border-[#9eb6a9]/20 transition-colors duration-500'>
                    {/* Blur overlay */}
                    <div className='absolute inset-0 backdrop-blur-[2px] bg-gradient-to-br from-white/[0.02] to-transparent' />

                    <div className='relative z-10'>
                      <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-[#205c57]/20 to-[#9eb6a9]/10 flex items-center justify-center mb-6 opacity-50'>
                        <svg className='w-6 h-6 text-[#9eb6a9]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d={item.icon} />
                        </svg>
                      </div>
                      <h3 className='text-xl text-white/70 font-light mb-2'>{item.title}</h3>
                      <p className='text-white/40 text-sm'>{item.desc}</p>
                      <div className='mt-6'>
                        <span className='inline-flex items-center text-[#9eb6a9]/60 text-xs tracking-wider uppercase'>
                          <span className='w-2 h-2 rounded-full bg-[#9eb6a9]/40 mr-2 animate-pulse' />
                          {t('projects.smi2025.comingSoonBadge', 'Coming soon')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Partner Credit */}
          <div className='py-12 border-t border-white/5'>
            <div className='max-w-6xl mx-auto px-6 text-center'>
              <p className='text-white/30 text-sm font-light tracking-wider'>
                {t('projects.smi.partnerCredit', 'Project delivered in partnership with')}{' '}
                <a
                  href='https://www.swissmininginstitute.ch/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-white/50 hover:text-[#9eb6a9] transition-colors duration-300'
                >
                  {t('projects.smi.partnerName', 'Swiss Mining Institute')}
                </a>
              </p>
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
