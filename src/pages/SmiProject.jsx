import { useGSAP } from '@gsap/react';
import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { animateWithGsap } from '../utils/animations';
import {
  explore1Img,
  explore2Img,
  exploreVideo,
  frameImg,
  smoothScrollTo,
} from '../utils';
import gsap from 'gsap';
import { Link, useParams } from 'react-router-dom';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { smiLogo } from '../utils';
import Carousel from '../components/Carousel';
import { Helmet } from 'react-helmet-async';

gsap.registerPlugin(ScrollTrigger);

const SmiProject = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || i18n.language || 'en';

  // Enhanced video reels with metadata - using translation keys
  const videos = [
    {
      id: 'smi-reel-1',
      src: `${import.meta.env.VITE_CLOUDFRONT_URL}/videos/teaser 1_smi.mp4`,
      title: t('projects.smi.carousel.reel1.title', 'SMI conference opening'),
      description: t('projects.smi.carousel.reel1.description', 'Exclusive opening moments of the mining conference'),
      tags: [
        t('portfolio.tags.conference', 'Conference'),
        t('portfolio.tags.mining', 'Mining')
      ],
      views: t('projects.smi.carousel.reel1.views', '15K+'),
      type: t('projects.smi.carousel.reel1.type', 'Event highlight'),
    },
    {
      id: 'smi-reel-2',
      src: `${import.meta.env.VITE_CLOUDFRONT_URL}/videos/teaser 2_smi.mp4`,
      title: t('projects.smi.carousel.reel2.title', 'Industry leaders'),
      description: t('projects.smi.carousel.reel2.description', 'Key speakers and industry insights'),
      tags: [
        t('portfolio.tags.speakers', 'Speakers'),
        t('portfolio.tags.industry', 'Industry')
      ],
      views: t('projects.smi.carousel.reel2.views', '12K+'),
      type: t('projects.smi.carousel.reel2.type', 'Professional content'),
    },
    {
      id: 'smi-reel-3',
      src: `${import.meta.env.VITE_CLOUDFRONT_URL}/videos/teaser 3_smi.mp4`,
      title: t('projects.smi.carousel.reel3.title', 'Conference highlights'),
      description: t('projects.smi.carousel.reel3.description', 'Best moments from the two-day event'),
      tags: [
        t('portfolio.tags.highlights', 'Highlights'),
        t('portfolio.tags.event', 'Event')
      ],
      views: t('projects.smi.carousel.reel3.views', '18K+'),
      type: t('projects.smi.carousel.reel3.type', 'Event summary'),
    },
  ];

  const videoRef = useRef();
  const containerRef = useRef();
  const parallaxRef = useRef();
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Clean title effect without DOM manipulation (Helmet handles SEO)
  useEffect(() => {
    document.title = t(
      'projects.smiTitle',
      'Swiss Mining Institute Event | Premium Event Coverage | Prestige Production',
    );
  }, [t]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Hero title animation
      gsap.fromTo(
        '#features_title',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          delay: 0.4,
          ease: 'power4.out',
        },
      );

      // Main video trigger with enhanced effect
      gsap.to('#exploreVideo', {
        scrollTrigger: {
          trigger: '#exploreVideo',
          toggleActions: 'play pause reverse restart',
          start: '-10% bottom',
        },
        onComplete: () => {
          videoRef.current?.play();
        },
      });

      // Enhanced grow animations
      animateWithGsap(
        '.g_grow',
        { scale: 1, opacity: 1, ease: 'power2.out' },
        { scrub: 3.5 },
      );

      // Improved text animations
      animateWithGsap('.g_text', {
        y: 0,
        opacity: 1,
        ease: 'power2.inOut',
        duration: 1.2,
      });

      // Enhanced fade sections with stagger
      [
        '.fade-section-1',
        '.fade-section-2',
        '.fade-section-3',
        '.fade-section-4',
      ].forEach((selector, index) => {
        gsap.fromTo(
          selector,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: selector,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        );
      });

      // Back link animation
      gsap.fromTo(
        '.after-link',
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          delay: 1,
          duration: 1,
          ease: 'power2.out',
        },
      );

      // Carousel enhancement
      gsap.fromTo(
        '.carousel-container',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.carousel-container',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Parallax effect for background elements
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset;
        const parallax =
          parallaxRef.current.querySelectorAll('.parallax-element');
        parallax.forEach((element, index) => {
          const speed = 0.3 + index * 0.15;
          element.style.transform = `translateY(${scrolled * speed}px)`;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Enhanced SEO Meta Tags */}
      <Helmet>
        <title>
          {t(
            'projects.smi.seoTitle',
            'Swiss Mining Institute 2024 - Premium Event Production | Prestige Production',
          )}
        </title>
        <meta
          name='description'
          content={t(
            'projects.smi.seoDescription',
            'Discover our premium video production coverage of the Swiss Mining Institute 2024 - the most prestigious mining conference in Europe. Featuring exclusive interviews, aftermovies, and luxury event content.',
          )}
        />
        <meta
          name='keywords'
          content={t(
            'projects.smi.seoKeywords',
            'Swiss Mining Institute, luxury event production, mining conference video, premium corporate videos, event videography, conference coverage, aftermovie production',
          )}
        />
        <meta
          property='og:title'
          content={t(
            'projects.smi.seoTitle',
            'Swiss Mining Institute 2024 - Premium Event Production',
          )}
        />
        <meta
          property='og:description'
          content={t(
            'projects.smi.seoDescription',
            'Premium video production coverage of the most prestigious mining conference in Europe',
          )}
        />
        <meta property='og:type' content='article' />
        <meta name='twitter:card' content='summary_large_image' />
        <link
          rel='canonical'
          href={`https://prestigeproduction.ch/${currentLang}/portfolio/smi-project`}
        />
      </Helmet>

      <section
        ref={containerRef}
        className='min-h-screen text-white relative overflow-hidden'
        style={{
          background: 'linear-gradient(180deg, #0a0908 0%, #1a1612 30%, #12100c 70%, #0a0908 100%)',
        }}
      >
        {/* Luxurious golden grain overlay */}
        <div
          className='fixed inset-0 pointer-events-none z-50 opacity-[0.025]'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Decorative background elements with parallax - Golden tones */}
        <div
          ref={parallaxRef}
          className='absolute inset-0 overflow-hidden pointer-events-none'
        >
          <div className='parallax-element absolute top-32 left-10 w-64 h-64 bg-gradient-to-r from-[#D4AF37]/15 to-[#E8D5B7]/10 rounded-full blur-3xl'></div>
          <div className='parallax-element absolute bottom-40 right-10 w-80 h-80 bg-gradient-to-r from-[#E8D5B7]/8 to-[#A67C00]/10 rounded-full blur-3xl'></div>
          <div className='parallax-element absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-[#8B6914]/12 to-[#D4AF37]/8 rounded-full blur-2xl'></div>
          <div className='parallax-element absolute top-1/4 right-1/3 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl animate-pulse' style={{ animationDuration: '6s' }}></div>
        </div>

        <div className='relative z-10 px-6 pt-20 pb-32'>
          {/* Back Link + Aftermovie Link - Enhanced styling */}
          <div className='max-w-6xl mx-auto mb-12 px-2 flex flex-col gap-4 md:flex-row md:justify-between md:items-center after-link'>
            <Link
              to={`/${currentLang}/portfolio`}
              className='inline-flex items-center text-sm text-white/60 hover:text-[#D4AF37] transition-all duration-300 group self-start'
            >
              <svg
                className='w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 19l-7-7 7-7'
                />
              </svg>
              {t('projects.backToPortfolio', 'Go back to our work')}
            </Link>
            <a
              href='#aftermovie'
              onClick={e => {
                e.preventDefault();
                smoothScrollTo('aftermovie');
              }}
              className='inline-flex items-center text-sm tracking-wide text-white/60 hover:text-[#D4AF37] transition-all duration-300 group self-start md:self-auto'
            >
              {t(
                'projects.smi.watchAftermovie',
                'Watch the official aftermovie',
              )}
              <svg
                className='w-4 h-4 ml-2 group-hover:translate-y-1 transition-transform duration-300'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 14l-7 7m0 0l-7-7m7 7V3'
                />
              </svg>
            </a>
          </div>

          {/* Enhanced Headings */}
          <div className='text-center max-w-4xl mx-auto mb-20'>
            <h1
              id='features_title'
              className='text-5xl md:text-6xl font-semibold tracking-tight mb-8 opacity-0 translate-y-6 overflow-visible leading-[1.1]'
            >
              <span className='inline-block animate-text-reveal'>
                {t('projects.smi.tagline', "It's all about luxury.")}
              </span>
            </h1>
            <div className='space-y-3'>
              <h2 className='hero-subtitle text-3xl lg:text-5xl font-light'>
                {t('projects.smi.title', 'Swiss Mining Institute 2024')}
              </h2>
              <h3 className='hero-subtitle text-xl lg:text-2xl text-white/70'>
                {t(
                  'projects.smi.subtitle',
                  'The most prestigious mining conference in the world',
                )}
              </h3>
            </div>
          </div>

          {/* Main Event Video with Enhanced Info */}
          <div className='fade-section-1 max-w-5xl mx-auto mb-24'>
            <div
              className='relative group cursor-pointer transition-transform duration-300 hover:scale-[1.02]'
              onClick={() => setLightboxSrc(exploreVideo)}
            >
              <div className='overflow-hidden rounded-xl relative'>
                <video
                  playsInline
                  id='exploreVideo'
                  className='w-full h-auto max-h-[600px] object-cover rounded-xl'
                  preload='none'
                  loop
                  muted
                  autoPlay
                  ref={videoRef}
                >
                  <source src={exploreVideo} type='video/mp4' />
                </video>

                {/* Video Info Overlay - Responsive */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3 md:p-6 rounded-xl'>
                  <div className='w-full'>
                    <div className='flex items-start justify-between mb-2 md:mb-3'>
                      <h3 className='text-lg md:text-xl font-semibold text-white'>
                        {t('projects.smi.mainVideo.title', 'Event Highlights')}
                      </h3>
                      <span className='text-xs text-white/80 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full shrink-0'>
                        {t('projects.smi.mainVideo.type', 'Highlight Reel')}
                      </span>
                    </div>

                    <p className='text-white/90 text-xs md:text-sm mb-2 md:mb-3 hidden md:block'>
                      {t(
                        'projects.smi.mainVideo.description',
                        'Premium coverage of the most exclusive mining conference in Europe, featuring luxury venues and high-profile networking.',
                      )}
                    </p>

                    <div className='flex items-center justify-between'>
                      <div className='flex flex-wrap gap-1 md:gap-2'>
                        <span className='text-xs text-[#D4AF37] bg-[#D4AF37]/20 backdrop-blur-sm px-1.5 md:px-2 py-0.5 md:py-1 rounded'>
                          {t('projects.smi.mainVideo.tags.luxuryEvent', 'Luxury Event')}
                        </span>
                        <span className='text-xs text-[#D4AF37] bg-[#D4AF37]/20 backdrop-blur-sm px-1.5 md:px-2 py-0.5 md:py-1 rounded'>
                          {t('projects.smi.mainVideo.tags.miningConference', 'Mining Conference')}
                        </span>
                        <span className='text-xs text-[#D4AF37] bg-[#D4AF37]/20 backdrop-blur-sm px-1.5 md:px-2 py-0.5 md:py-1 rounded'>
                          {t('projects.smi.mainVideo.tags.premiumProduction', 'Premium Production')}
                        </span>
                      </div>

                      <div className='flex items-center text-white/80 text-xs shrink-0 ml-2'>
                        <svg
                          className='w-3 h-3 mr-1'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                          <path
                            fillRule='evenodd'
                            d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                            clipRule='evenodd'
                          />
                        </svg>
                        {t('projects.smi.mainVideoViews', '15K+')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Click indicator */}
                <div className='absolute top-3 right-3 md:top-4 md:right-4 bg-black/50 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300'>
                  <svg className='w-4 h-4 text-[#D4AF37]' fill='none' stroke='currentColor' viewBox='0 0 24 24' strokeWidth={2}>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2M16 4h2a2 2 0 012 2v2M16 20h2a2 2 0 002-2v-2' />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Image Grid with Lazy Loading */}
          <div className='fade-section-2 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto mb-20'>
            {[explore1Img, explore2Img].map((src, i) => (
              <div
                key={i}
                className='relative overflow-hidden h-[50vh] rounded-xl cursor-pointer group transition-transform duration-300 hover:scale-[1.02]'
                onClick={() => setLightboxSrc(src)}
              >
                <img
                  src={src}
                  alt={`${t('projects.smi.photoAlt', 'SMI Photo')} ${i + 1}`}
                  className='w-full h-full object-cover g_grow hover:scale-105 transition-transform duration-500 group-hover:brightness-110'
                  loading='lazy'
                  decoding='async'
                />
                {/* Click indicator */}
                <div className='absolute top-3 right-3 md:top-4 md:right-4 bg-black/50 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300'>
                  <svg className='w-4 h-4 text-[#D4AF37]' fill='none' stroke='currentColor' viewBox='0 0 24 24' strokeWidth={2}>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2M16 4h2a2 2 0 012 2v2M16 20h2a2 2 0 002-2v-2' />
                  </svg>
                </div>
                {/* Subtle overlay on hover */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' />
              </div>
            ))}
          </div>

          {/* Video Carousel */}
          <div className='fade-section-2-carousel max-w-6xl mx-auto mb-24'>
            <div className='text-center mb-8'>
              <h2 className='text-3xl font-semibold mb-4'>
                {t('projects.smi.moreReels', 'More reels from the event')}
              </h2>
              <div className='flex items-center justify-center gap-2 md:gap-3 text-white/60 text-xs md:text-sm mb-6'>
                <div className='flex items-center gap-1'>
                  <svg className='w-5 h-5' fill='none' stroke='url(#leftGradient)' viewBox='0 0 24 24' strokeWidth={2}>
                    <defs>
                      <linearGradient id='leftGradient' x1='0%' y1='0%' x2='100%' y2='0%'>
                        <stop offset='0%' stopColor='#D4AF37' />
                        <stop offset='100%' stopColor='#8B6914' />
                      </linearGradient>
                    </defs>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15 19l-7-7 7-7' />
                  </svg>
                </div>
                <span className='hidden md:inline'>{t('projects.smi.swipeLeft', 'Swipe or drag to navigate')}</span>
                <span className='md:hidden'>{t('projects.smi.swipeLeftMobile', 'Swipe to navigate')}</span>
                <div className='flex items-center gap-1'>
                  <svg className='w-5 h-5' fill='none' stroke='url(#rightGradient)' viewBox='0 0 24 24' strokeWidth={2}>
                    <defs>
                      <linearGradient id='rightGradient' x1='0%' y1='0%' x2='100%' y2='0%'>
                        <stop offset='0%' stopColor='#8B6914' />
                        <stop offset='100%' stopColor='#D4AF37' />
                      </linearGradient>
                    </defs>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
                  </svg>
                </div>
              </div>
            </div>
            <div className='min-h-[400px] md:h-[600px] flex items-center justify-center relative group px-4 md:px-0'>
              <div className='absolute inset-0 bg-gradient-to-r from-[#D4AF37]/5 via-transparent to-[#D4AF37]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'></div>
              <Carousel items={videos} baseWidth={1000} loop={true} round={false} />
            </div>
          </div>

          {/* Description Text */}
          <div className='fade-section-3 space-y-6 max-w-3xl mx-auto mb-24 px-4'>
            <p className='text-lg text-white/80 g_text'>
              {t('projects.smi.intro1Part1', 'The Swiss Mining Institute is')}{' '}
              <span className='text-white'>
                {t(
                  'projects.smi.intro1Part2',
                  'the biggest and most exclusive mining conference in Europe',
                )}
              </span>
              .{' '}
              {t(
                'projects.smi.intro1Part3',
                'Hosting 1000+ investors, 100+ listed companies and over 2700 meetings arranged over 2 days.',
              )}
            </p>
            <p className='text-lg text-white/80 g_text'>
              {t('projects.smi.intro2', 'For two days, we captured everything a camera lens could reach. From interviews, panel discussions and the official aftermovie to photos, social content and more, we delivered it all.')}
            </p>
          </div>

          {/* YouTube Aftermovie */}
          <div
            id='aftermovie'
            className='fade-section-4 max-w-5xl mx-auto mb-24 text-center scroll-mt-40'
          >
            <h2 className='text-3xl font-semibold mb-2 relative inline-block after:block after:h-[2px] after:bg-white/40 after:w-0 after:absolute after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-700'>
              {t(
                'projects.smi.watchOfficialAftermovie',
                'Watch the Official Aftermovie',
              )}
            </h2>
            <div className='aspect-video w-full mt-6 rounded-xl overflow-hidden shadow-lg'>
              <iframe
                width='100%'
                height='100%'
                src='https://www.youtube.com/embed/8wwsxj5VIFI'
                title={t('projects.smi.aftermovieTitle', 'Official Aftermovie')}
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* YouTube Interview */}
          <div className='fade-section-4 max-w-5xl mx-auto text-center mb-24'>
            <h2 className='text-3xl font-semibold mb-2 relative inline-block after:block after:h-[2px] after:bg-white/40 after:w-0 after:absolute after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-700'>
              {t('projects.smi.featuredInterviews', 'Featured Interviews')}
            </h2>
            {/* New description text */}
            <p className='mt-4 text-lg text-white/80 max-w-3xl mx-auto'>
              {t(
                'projects.smi.interviewsDesc',
                "We've had the privilege to sit down with trail-blazing CEOs and forward-thinking investors who are reshaping the mining ecosystem. Dive in for candid insights you won't hear anywhere else.",
              )}
            </p>
            <div className='aspect-video w-full mt-6 rounded-xl overflow-hidden shadow-lg'>
              <iframe
                width='100%'
                height='100%'
                src='https://www.youtube.com/embed/WkSTG_GQUJQ'
                title={t('projects.smi.interviewTitle', 'Interview')}
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              ></iframe>
            </div>
            <div className='aspect-video w-full mt-6 rounded-xl overflow-hidden shadow-lg'>
              <iframe
                width='100%'
                height='100%'
                src='https://www.youtube.com/embed/y2YmLoOGi_w'
                title={t('projects.smi.interviewTitle', 'Interview')}
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Enhanced Lightbox Modal with Accessibility */}
          {lightboxSrc && (
            <div
              className='fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4'
              onClick={() => setLightboxSrc(null)}
              role='dialog'
              aria-modal='true'
              aria-label={t('projects.smi.lightboxLabel', 'Media viewer')}
            >
              <button
                onClick={() => setLightboxSrc(null)}
                className='absolute top-4 right-4 text-white/80 hover:text-white text-2xl z-10 p-2 rounded-full bg-black/50 backdrop-blur-sm transition-all duration-300'
                aria-label={t('projects.smi.closeLightbox', 'Close viewer')}
              >
                ×
              </button>

              <div
                className='max-w-6xl w-full'
                onClick={e => e.stopPropagation()}
              >
                {lightboxSrc.endsWith('.mp4') ? (
                  <video
                    src={lightboxSrc}
                    controls
                    autoPlay
                    className='w-full h-auto max-h-[90vh] rounded-xl shadow-2xl'
                    preload='metadata'
                  />
                ) : (
                  <img
                    src={lightboxSrc}
                    alt={t('projects.smi.enlargedImage', 'Enlarged view')}
                    className='w-full h-auto max-h-[90vh] object-contain rounded-xl shadow-2xl'
                    loading='lazy'
                  />
                )}
              </div>
            </div>
          )}

          {/* Subtle Partner Credit */}
          <div className='mt-2 text-center border-t border-white/5 pt-2'>
            <p className='text-white/40 text-sm font-light tracking-wider'>
              {t('projects.smi.partnerCredit', 'Project delivered in partnership with')}{' '}
              <a
                href='https://www.swissmininginstitute.ch/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-white/60 hover:text-[#D4AF37] transition-colors duration-300 font-medium'
              >
                {t('projects.smi.partnerName', 'Swiss Mining Institute')}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default SmiProject;
