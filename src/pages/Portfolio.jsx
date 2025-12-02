import React, { useRef, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../constants';
import { useTranslation } from 'react-i18next';
import { trackPortfolioView } from '../utils/analytics';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || i18n.language || 'en';

  // Categories with icons
  const categories = [
    { id: 'all', label: t('portfolio.categories.all', 'All Works'), count: projects.length },
    { id: 'realEstate', label: t('portfolio.categories.realEstate', 'Real Estate'), count: projects.filter(p => p.category === 'realEstate').length },
    { id: 'events', label: t('portfolio.categories.events', 'Events'), count: projects.filter(p => p.category === 'events').length },
    { id: 'social', label: t('portfolio.categories.social', 'Social'), count: 4 },
  ];

  // Social reels data - all 4 reels
  const socialReels = [
    {
      id: 'reel-smi-2025',
      src: `${import.meta.env.VITE_CLOUDFRONT_URL}/videos/smi_2025_teaser_vertical.mp4`,
      title: t('portfolio.reels.smi2025.title', 'SMI 2025 Gala'),
      category: 'social',
      type: t('portfolio.reels.eventTeaser', 'Event Teaser'),
      description: t('portfolio.reels.smi2025.description', 'Exclusive gala dinner & afterparty coverage'),
      tags: [t('portfolio.tags.event', 'Event'), t('portfolio.tags.gala', 'Gala')],
      views: 'New',
      isNew: true,
      link: '/portfolio/smi-2025',
    },
    {
      id: 'reel-1',
      src: `${import.meta.env.VITE_CLOUDFRONT_URL}/videos/smi_reel_tavi.mp4`,
      title: t('portfolio.reels.smi.title', 'SMI Event Highlight'),
      category: 'social',
      type: t('portfolio.reels.instagramReel', 'Instagram Reel'),
      description: t('portfolio.reels.smi.description', 'Dynamic event coverage'),
      tags: [t('portfolio.tags.event', 'Event')],
      views: '32k+',
    },
    {
      id: 'reel-2',
      src: `${import.meta.env.VITE_CLOUDFRONT_URL}/videos/Reel_2_penthouse_speech.mp4`,
      title: t('portfolio.reels.penthouseSpeech.title', 'Penthouse Experience'),
      category: 'social',
      type: t('portfolio.reels.instagramReel', 'Instagram Reel'),
      description: t('portfolio.reels.penthouseSpeech.description', 'Luxury real estate content'),
      tags: [t('portfolio.tags.realEstate', 'Real estate'), t('portfolio.tags.luxury', 'Luxury')],
      views: '50k+',
    },
    {
      id: 'reel-3',
      src: `${import.meta.env.VITE_CLOUDFRONT_URL}/videos/Reel_1_penthouse_view.mp4`,
      title: t('portfolio.reels.penthouseViews.title', 'Penthouse Views'),
      category: 'social',
      type: t('portfolio.reels.instagramReel', 'Instagram Reel'),
      description: t('portfolio.reels.penthouseViews.description', 'Stunning property views'),
      tags: [t('portfolio.tags.property', 'Property'), t('portfolio.tags.views', 'Views')],
      views: '28k+',
    },
  ];

  // Filter logic
  const filteredProjects = selectedCategory === 'all'
    ? projects
    : selectedCategory === 'social'
    ? []
    : projects.filter(p => p.category === selectedCategory);

  const shouldShowReels = selectedCategory === 'all' || selectedCategory === 'social';

  const canonicalUrl = `https://prestigeproduction.ch/${currentLang}/portfolio`;

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section reveal
      gsap.fromTo(heroRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.4, ease: 'power3.out', delay: 0.2 }
      );

      // Staggered grid items
      gsap.fromTo('.portfolio-card',
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          }
        }
      );

      // Reels reveal
      gsap.fromTo('.reel-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '#reels-section',
            start: 'top 85%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [selectedCategory]);

  const handleProjectClick = (title) => {
    trackPortfolioView(title, currentLang);
  };

  return (
    <>
      <Helmet>
        <title>{t('seo.portfolio.title', 'Portfolio | Prestige Production - Video & Photo Projects')}</title>
        <meta name="description" content={t('seo.portfolio.description', 'Explore our portfolio of premium video production and photography projects in Zurich, Switzerland. Luxury real estate, corporate events, brand content.')} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={t('seo.portfolio.title', 'Portfolio | Prestige Production')} />
        <meta property="og:description" content={t('seo.portfolio.description', 'Explore our portfolio of premium video production and photography projects.')} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('seo.portfolio.title', 'Portfolio | Prestige Production')} />
        <meta name="twitter:description" content={t('seo.portfolio.description', 'Explore our portfolio of premium video production and photography projects.')} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {"@type": "ListItem", "position": 1, "name": t('nav.home', 'Home'), "item": `https://prestigeproduction.ch/${currentLang}/`},
              {"@type": "ListItem", "position": 2, "name": t('nav.portfolio', 'Portfolio'), "item": canonicalUrl}
            ]
          })}
        </script>
      </Helmet>
      <section
        ref={containerRef}
        className="relative min-h-screen text-white overflow-hidden"
        style={{ background: '#0a0a0a' }}
      >
      {/* Animated film grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Cinematic vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-40"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      {/* Subtle gold ambient glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none z-30 opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(201, 169, 98, 0.15) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Hero Section */}
      <div ref={heroRef} className="relative pt-32 pb-16 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Editorial header with year */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-px bg-gradient-to-r from-[#C9A962] to-transparent" />
              <span
                className="text-xs tracking-[0.4em] uppercase"
                style={{ color: '#C9A962' }}
              >
                {t('portfolio.subtitle', 'Selected Works')}
              </span>
            </div>
            <span
              className="text-xs tracking-[0.2em] tabular-nums hidden md:block"
              style={{ color: 'rgba(201, 169, 98, 0.4)' }}
            >
              2024 — 2025
            </span>
          </div>

          {/* Main headline */}
          <h1
            className="editorial-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-8"
            style={{ color: '#F5F3EE' }}
          >
            {t('portfolio.ourText', 'Our')}{' '}
            <span className="italic" style={{ color: '#C9A962' }}>
              {t('portfolio.portfolioText', 'Portfolio')}
            </span>
          </h1>

          {/* Subtitle with decorative line */}
          <div className="flex items-start gap-8 mb-16">
            <div
              className="w-px h-16 flex-shrink-0 mt-1"
              style={{ background: 'linear-gradient(to bottom, #C9A962, transparent)' }}
            />
            <p
              className="max-w-md text-base leading-relaxed font-light"
              style={{ color: 'rgba(245, 243, 238, 0.6)' }}
            >
              {t(
                'portfolio.description',
                'Cinematic storytelling for luxury real estate and exclusive events. Each frame crafted with intention.'
              )}
            </p>
          </div>

          {/* Category filter - refined tab style */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="group relative px-5 py-2.5 transition-all duration-500 overflow-hidden"
                style={{
                  background: selectedCategory === cat.id
                    ? 'linear-gradient(135deg, #C9A962 0%, #A68B4B 100%)'
                    : 'transparent',
                  border: selectedCategory === cat.id
                    ? '1px solid transparent'
                    : '1px solid rgba(201, 169, 98, 0.25)',
                }}
              >
                {/* Hover background */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: selectedCategory === cat.id
                      ? 'transparent'
                      : 'rgba(201, 169, 98, 0.08)',
                  }}
                />

                <span className="relative flex items-center gap-2">
                  <span
                    className="text-[11px] tracking-[0.2em] uppercase font-medium transition-colors duration-300"
                    style={{
                      color: selectedCategory === cat.id ? '#0a0a0a' : '#C9A962',
                    }}
                  >
                    {cat.label}
                  </span>
                  <span
                    className="text-[9px] tabular-nums px-1.5 py-0.5 rounded-sm transition-colors duration-300"
                    style={{
                      background: selectedCategory === cat.id
                        ? 'rgba(10, 10, 10, 0.2)'
                        : 'rgba(201, 169, 98, 0.15)',
                      color: selectedCategory === cat.id
                        ? '#0a0a0a'
                        : 'rgba(201, 169, 98, 0.7)',
                    }}
                  >
                    {String(cat.count).padStart(2, '0')}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 && (
        <div ref={gridRef} className="px-6 lg:px-16 py-24">
          <div className="max-w-7xl mx-auto">
            {/* Section label */}
            <div className="flex items-center gap-4 mb-16">
              <span
                className="text-[10px] tracking-[0.4em] uppercase"
                style={{ color: 'rgba(201, 169, 98, 0.6)' }}
              >
                {t('portfolio.allProjects', 'All Projects')}
              </span>
              <div className="flex-1 h-px" style={{ background: 'rgba(201, 169, 98, 0.15)' }} />
              <span
                className="text-xs tabular-nums"
                style={{ color: 'rgba(201, 169, 98, 0.4)' }}
              >
                {String(filteredProjects.length).padStart(2, '0')} {t('portfolio.works', 'Works')}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
              >
                {filteredProjects.map((proj, idx) => (
                  <motion.div
                    key={proj.id}
                    layout
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="portfolio-card group"
                    onMouseEnter={() => setHoveredProject(proj.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <Link
                      to={`/${currentLang}${proj.link}`}
                      onClick={() => handleProjectClick(proj.title)}
                      className="block"
                    >
                      {/* Card */}
                      <div
                        className="relative overflow-hidden mb-6 transition-all duration-700 group-hover:shadow-2xl"
                        style={{
                          aspectRatio: '16/10',
                          background: '#111',
                        }}
                      >
                          {proj.video ? (
                            <video
                              playsInline
                              autoPlay
                              muted
                              loop
                              preload="metadata"
                              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                            >
                              <source src={proj.video} type="video/mp4" />
                            </video>
                          ) : (
                            <img
                              src={proj.image}
                              alt={proj.title}
                              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                            />
                          )}

                          {/* Gradient overlay */}
                          <div
                            className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                            style={{
                              background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.2) 40%, transparent 60%)',
                            }}
                          />

                          {/* Index number - large editorial style */}
                          <div className="absolute top-6 left-6">
                            <span
                              className="text-6xl lg:text-7xl font-light opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                              style={{
                                fontFamily: 'Cormorant Garamond, serif',
                                color: '#F5F3EE',
                              }}
                            >
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                          </div>

                          {/* Type badge */}
                          <div className="absolute top-6 right-6">
                            <span
                              className="px-3 py-1.5 text-[9px] tracking-[0.2em] uppercase backdrop-blur-md"
                              style={{
                                background: 'rgba(10, 10, 10, 0.6)',
                                border: '1px solid rgba(201, 169, 98, 0.25)',
                                color: '#C9A962',
                              }}
                            >
                              {proj.typeKey
                                ? t(proj.typeKey, 'Video Production')
                                : t('portfolio.types.videoProduction', 'Video Production')}
                            </span>
                          </div>

                          {/* Bottom content - visible on hover */}
                          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                            <h3
                              className="editorial-heading text-2xl lg:text-3xl xl:text-4xl mb-2 transition-colors duration-300"
                              style={{ color: '#F5F3EE' }}
                            >
                              {proj.title}
                            </h3>
                            <p
                              className="text-xs tracking-[0.15em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0"
                              style={{ color: 'rgba(201, 169, 98, 0.7)' }}
                            >
                              {t('portfolio.quality4k', '4K Cinematic')}
                            </p>
                          </div>

                          {/* View indicator */}
                          <div
                            className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0"
                          >
                            <div
                              className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                              style={{
                                background: 'linear-gradient(135deg, #C9A962 0%, #8B7355 100%)',
                                boxShadow: '0 10px 30px -5px rgba(201, 169, 98, 0.4)',
                              }}
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="#0a0a0a"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </div>
                          </div>

                          {/* Elegant border on hover */}
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{
                              border: '1px solid rgba(201, 169, 98, 0.3)',
                            }}
                          />
                        </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Social Reels Section - Cinematic Film Gallery */}
      {shouldShowReels && (
        <div id="reels-section" className="pb-32 overflow-hidden">
          {/* Section header */}
          <div className="max-w-7xl mx-auto px-6 lg:px-16 mb-12">
            <div className="flex items-end justify-between">
              <div className="flex items-center gap-6">
                <div className="w-12 h-px" style={{ background: '#C9A962' }} />
                <h2
                  className="editorial-heading text-4xl lg:text-5xl"
                  style={{ color: '#F5F3EE' }}
                >
                  {t('portfolio.socialMedia', 'Social')} <span className="italic" style={{ color: '#C9A962' }}>Reels</span>
                </h2>
              </div>

              {/* Decorative film count */}
              <div className="hidden md:flex items-center gap-4">
                <span
                  className="text-[10px] tracking-[0.3em] uppercase"
                  style={{ color: 'rgba(201, 169, 98, 0.4)' }}
                >
                  {t('portfolio.frames', 'Frames')}
                </span>
                <span
                  className="text-4xl font-light tabular-nums"
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    color: '#C9A962',
                  }}
                >
                  {String(socialReels.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {/* Horizontal scrolling film gallery */}
          <div className="relative">
            {/* Film strip decoration */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(201, 169, 98, 0.2) 20%, rgba(201, 169, 98, 0.2) 80%, transparent)' }}
            />

            {/* Centered reels container */}
            <div
              className="flex items-start justify-center gap-6 lg:gap-8 px-6 lg:px-16 py-16 overflow-x-auto scrollbar-hide"
              style={{
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
              }}
            >

              {socialReels.map((reel, i) => {
                const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI'];
                const CardWrapper = reel.link ? Link : 'div';
                const cardProps = reel.link ? { to: `/${currentLang}${reel.link}`, onClick: () => handleProjectClick(reel.title) } : {};

                return (
                  <motion.div
                    key={reel.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="reel-card flex-shrink-0"
                    style={{ scrollSnapAlign: 'start' }}
                  >
                    <CardWrapper {...cardProps} className="group block relative">
                      {/* Ambient glow on hover */}
                      <div
                        className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-2xl"
                        style={{
                          background: 'radial-gradient(ellipse at center, rgba(201, 169, 98, 0.2) 0%, transparent 70%)',
                        }}
                      />

                      {/* Card container */}
                      <div className="relative w-60 lg:w-72 transition-all duration-500 group-hover:-translate-y-3">
                        {/* Roman numeral index */}
                        <div
                          className="absolute -top-10 left-0 text-sm tracking-[0.3em] transition-all duration-300 group-hover:-translate-y-1"
                          style={{
                            fontFamily: 'Cormorant Garamond, serif',
                            color: 'rgba(201, 169, 98, 0.4)',
                          }}
                        >
                          {romanNumerals[i]}
                        </div>

                        {/* Main card */}
                        <div
                          className="relative overflow-hidden transition-all duration-500"
                          style={{
                            aspectRatio: '9/16',
                            background: '#0d0d0d',
                            boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.8)',
                          }}
                        >
                          {/* Video */}
                          <video
                            src={reel.src}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            playsInline
                            muted
                            loop
                            autoPlay
                            preload="metadata"
                          />

                          {/* Gradient overlay */}
                          <div
                            className="absolute bottom-0 left-0 right-0 h-48"
                            style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, transparent 100%)' }}
                          />

                          {/* Content overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-5">
                            <span
                              className="inline-block text-[8px] tracking-[0.25em] uppercase mb-3"
                              style={{ color: '#C9A962' }}
                            >
                              {reel.type}
                            </span>

                            <h3
                              className="text-lg font-medium mb-3 leading-snug"
                              style={{
                                fontFamily: 'Cormorant Garamond, serif',
                                color: '#F5F3EE',
                              }}
                            >
                              {reel.title}
                            </h3>

                            {/* Views with icon */}
                            <div className="flex items-center gap-2">
                              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'rgba(245, 243, 238, 0.4)' }}>
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                              </svg>
                              <span
                                className="text-[11px] tabular-nums font-medium"
                                style={{ color: 'rgba(245, 243, 238, 0.6)' }}
                              >
                                {reel.views}
                              </span>
                            </div>
                          </div>

                          {/* NEW badge for new reels */}
                          {reel.isNew && (
                            <div className="absolute top-4 left-4">
                              <span
                                className="inline-flex items-center gap-1 px-2 py-1 text-[8px] tracking-[0.15em] uppercase font-medium"
                                style={{
                                  background: '#C9A962',
                                  color: '#0a0a0a',
                                }}
                              >
                                <span className="w-1 h-1 rounded-full bg-current animate-pulse" />
                                {t('portfolio.new', 'New')}
                              </span>
                            </div>
                          )}

                          {/* Elegant border on hover */}
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                            style={{
                              border: '1px solid rgba(201, 169, 98, 0.35)',
                              boxShadow: 'inset 0 0 40px rgba(201, 169, 98, 0.05)',
                            }}
                          />
                        </div>

                        {/* Film perforations */}
                        <div className="flex justify-center gap-2 mt-5 opacity-25">
                          {[...Array(5)].map((_, j) => (
                            <div
                              key={j}
                              className="w-1.5 h-3 rounded-sm"
                              style={{ background: 'rgba(201, 169, 98, 0.6)' }}
                            />
                          ))}
                        </div>
                      </div>
                    </CardWrapper>
                  </motion.div>
                );
              })}
            </div>

            {/* Film strip bottom border */}
            <div
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(201, 169, 98, 0.2) 20%, rgba(201, 169, 98, 0.2) 80%, transparent)' }}
            />

            {/* Edge fade gradients */}
            <div
              className="absolute left-0 top-0 bottom-0 w-20 pointer-events-none z-10"
              style={{ background: 'linear-gradient(to right, #0a0a0a, transparent)' }}
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-20 pointer-events-none z-10"
              style={{ background: 'linear-gradient(to left, #0a0a0a, transparent)' }}
            />
          </div>
        </div>
      )}

      {/* CTA Section - Refined editorial style */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: '-100px' }}
        className="px-6 lg:px-16 pb-32"
      >
        <div className="max-w-7xl mx-auto">
          <div
            className="relative py-24 lg:py-32 px-8 lg:px-20 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.06) 0%, rgba(139, 115, 85, 0.03) 100%)',
              border: '1px solid rgba(201, 169, 98, 0.12)',
            }}
          >
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20" style={{ borderTop: '1px solid #C9A962', borderLeft: '1px solid #C9A962' }} />
            <div className="absolute top-0 right-0 w-20 h-20" style={{ borderTop: '1px solid rgba(201, 169, 98, 0.3)', borderRight: '1px solid rgba(201, 169, 98, 0.3)' }} />
            <div className="absolute bottom-0 left-0 w-20 h-20" style={{ borderBottom: '1px solid rgba(201, 169, 98, 0.3)', borderLeft: '1px solid rgba(201, 169, 98, 0.3)' }} />
            <div className="absolute bottom-0 right-0 w-20 h-20" style={{ borderBottom: '1px solid #C9A962', borderRight: '1px solid #C9A962' }} />

            {/* Background pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A962' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            {/* Content */}
            <div className="relative text-center">
              <span
                className="inline-block text-[10px] tracking-[0.4em] uppercase mb-8"
                style={{ color: 'rgba(201, 169, 98, 0.7)' }}
              >
                {t('portfolio.cta.subtitle', 'Start Your Project')}
              </span>

              <h2
                className="editorial-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-8 leading-tight"
                style={{ color: '#F5F3EE' }}
              >
                {t('portfolio.cta.title', 'Ready to create')} <br />
                <span className="italic" style={{ color: '#C9A962' }}>
                  {t('portfolio.cta.titleAccent', 'your vision')}?
                </span>
              </h2>

              <p
                className="max-w-xl mx-auto text-lg lg:text-xl mb-12 font-light leading-relaxed"
                style={{ color: 'rgba(245, 243, 238, 0.5)' }}
              >
                {t(
                  'portfolio.cta.description',
                  "Let's collaborate to bring your story to life with cinematic excellence."
                )}
              </p>

              <Link
                to={`/${currentLang}/contact`}
                className="group inline-flex items-center gap-5 px-10 py-5 transition-all duration-500 hover:gap-7"
                style={{
                  background: 'linear-gradient(135deg, #C9A962 0%, #A68B4B 100%)',
                  color: '#0a0a0a',
                  boxShadow: '0 20px 40px -10px rgba(201, 169, 98, 0.3)',
                }}
              >
                <span className="text-sm tracking-[0.2em] uppercase font-semibold">
                  {t('portfolio.cta.button', 'Get in Touch')}
                </span>
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hide scrollbar utility */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      </section>
    </>
  );
};

export default Portfolio;
