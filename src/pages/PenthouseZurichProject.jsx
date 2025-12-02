import { useGSAP } from '@gsap/react';
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const PenthouseZurichProject = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || i18n.language || 'en';
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    document.title = t(
      'projects.penthouseSeoTitle',
      'Luxury Real Estate Video Production Zurich | Penthouse Marketing Switzerland | Prestige Production',
    );

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        t(
          'projects.penthouseSeoDescription',
          'Professional real estate video production in Zurich, Switzerland. Luxury property marketing with cinematic videos, social media content, and premium photography.',
        ),
      );
    }
  }, [t]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Hero reveal animation
      gsap.fromTo(heroRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.4, ease: 'power3.out', delay: 0.2 }
      );

      // Staggered content sections
      gsap.fromTo('.fade-section',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.fade-section',
            start: 'top 80%',
          },
        }
      );

      // Stats animation
      gsap.fromTo('.stat-card',
        { opacity: 0, scale: 0.9, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.stats-grid',
            start: 'top 80%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const reels = [
    {
      id: 'penthouse-reel-1',
      src: `${import.meta.env.VITE_CLOUDFRONT_URL}/videos/Reel_1_penthouse_view.mp4`,
      title: t('projects.penthouse.reel1Title', 'Penthouse Views'),
      views: '28k+',
      type: t('projects.penthouse.reelType', 'Instagram Reel'),
    },
    {
      id: 'penthouse-reel-2',
      src: `${import.meta.env.VITE_CLOUDFRONT_URL}/videos/Reel_2_penthouse_speech.mp4`,
      title: t('projects.penthouse.reel2Title', 'Penthouse Experience'),
      views: '50k+',
      type: t('projects.penthouse.reelType2', 'Social Content'),
    },
  ];

  return (
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

      <div className="relative z-10">
        {/* Hero Section */}
        <div ref={heroRef} className="relative pt-28 pb-16 px-6 lg:px-16">
          <div className="max-w-6xl mx-auto">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-12"
            >
              <Link
                to={`/${currentLang}/portfolio`}
                className="group inline-flex items-center gap-3 transition-all duration-300"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: 'rgba(201, 169, 98, 0.1)',
                    border: '1px solid rgba(201, 169, 98, 0.3)',
                  }}
                >
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5"
                    style={{ color: '#C9A962' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
                <span
                  className="text-xs tracking-[0.2em] uppercase transition-colors duration-300 group-hover:text-[#C9A962]"
                  style={{ color: 'rgba(201, 169, 98, 0.6)' }}
                >
                  {t('projects.backToPortfolio', 'Back to Portfolio')}
                </span>
              </Link>
            </motion.div>

            {/* Editorial header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-px bg-gradient-to-r from-[#C9A962] to-transparent" />
                <span
                  className="text-xs tracking-[0.4em] uppercase"
                  style={{ color: '#C9A962' }}
                >
                  {t('projects.penthouse.category', 'Luxury Real Estate')}
                </span>
              </div>
              <span
                className="text-xs tracking-[0.2em] tabular-nums hidden md:block"
                style={{ color: 'rgba(201, 169, 98, 0.4)' }}
              >
                Zurich, Switzerland
              </span>
            </div>

            {/* Main headline */}
            <h1
              className="editorial-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-8"
              style={{ color: '#F5F3EE' }}
            >
              {t('projects.penthouse.titlePart1', 'A Penthouse')}{' '}
              <span className="italic" style={{ color: '#C9A962' }}>
                {t('projects.penthouse.titlePart2', 'Story')}
              </span>
            </h1>

            {/* Subtitle with decorative line */}
            <div className="flex items-start gap-8 mb-12">
              <div
                className="w-px h-20 flex-shrink-0 mt-1"
                style={{ background: 'linear-gradient(to bottom, #C9A962, transparent)' }}
              />
              <div>
                <p
                  className="max-w-lg text-base leading-relaxed font-light mb-4"
                  style={{ color: 'rgba(245, 243, 238, 0.6)' }}
                >
                  {t(
                    'projects.penthouse.heroDesc',
                    "Cinematic storytelling for Zurich Sotheby's International Realty. A 304 m² penthouse atop the Mobimo Tower, brought to life through architectural narrative."
                  )}
                </p>
                <div className="flex items-center gap-4">
                  <span
                    className="text-[10px] tracking-[0.3em] uppercase"
                    style={{ color: 'rgba(201, 169, 98, 0.5)' }}
                  >
                    {t('projects.penthouse.partner', "Zurich Sotheby's")}
                  </span>
                  <div className="w-1 h-1 rounded-full" style={{ background: '#C9A962' }} />
                  <span
                    className="text-[10px] tracking-[0.3em] uppercase"
                    style={{ color: 'rgba(201, 169, 98, 0.5)' }}
                  >
                    Soroush Efati
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                onClick={() => document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center gap-4 px-7 py-4 transition-all duration-500"
                style={{
                  background: 'linear-gradient(135deg, #C9A962 0%, #A68B4B 100%)',
                  color: '#0a0a0a',
                  boxShadow: '0 20px 40px -10px rgba(201, 169, 98, 0.3)',
                }}
              >
                <span className="text-sm tracking-[0.15em] uppercase font-semibold">
                  {t('projects.penthouse.viewResults', 'View Results')}
                </span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.button>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                onClick={() => document.getElementById('why-video-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center gap-4 px-7 py-4 transition-all duration-500"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(201, 169, 98, 0.4)',
                  color: '#C9A962',
                }}
              >
                <span className="text-sm tracking-[0.15em] uppercase font-medium">
                  {t('projects.penthouse.whyVideo', 'Why Video Sells')}
                </span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Project Details Card */}
        <div className="fade-section px-6 lg:px-16 pb-20">
          <div className="max-w-6xl mx-auto">
            <div
              className="relative p-8 lg:p-12 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.06) 0%, rgba(139, 115, 85, 0.03) 100%)',
                border: '1px solid rgba(201, 169, 98, 0.12)',
              }}
            >
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16" style={{ borderTop: '1px solid #C9A962', borderLeft: '1px solid #C9A962' }} />
              <div className="absolute bottom-0 right-0 w-16 h-16" style={{ borderBottom: '1px solid #C9A962', borderRight: '1px solid #C9A962' }} />

              <div className="flex items-center gap-4 mb-8">
                <div
                  className="w-12 h-12 flex items-center justify-center"
                  style={{
                    background: 'rgba(201, 169, 98, 0.1)',
                    border: '1px solid rgba(201, 169, 98, 0.25)',
                  }}
                >
                  <svg
                    className="w-5 h-5"
                    style={{ color: '#C9A962' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3
                  className="text-lg tracking-[0.1em] uppercase"
                  style={{ color: '#C9A962' }}
                >
                  {t('projects.penthouse.projectTitle', 'Project Overview')}
                </h3>
              </div>

              <p
                className="text-lg leading-relaxed mb-10 max-w-3xl"
                style={{ color: 'rgba(245, 243, 238, 0.7)', fontFamily: 'Cormorant Garamond, serif' }}
              >
                {t(
                  'projects.penthouse.description',
                  "We partnered with Zurich Sotheby's International Realty to bring to life one of Zurich's most exceptional properties, a 304 m² penthouse perched atop the Mobimo Tower. Through cinematic visuals, architectural storytelling, and a detail-oriented production process, we created a complete content suite tailored to the luxury market.",
                )}
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="flex items-start gap-4">
                  <div
                    className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(201, 169, 98, 0.1)' }}
                  >
                    <svg className="w-4 h-4" style={{ color: '#C9A962' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1" style={{ color: '#F5F3EE' }}>
                      {t('projects.penthouse.address', 'Turbinenstrasse 18, 8005 Zürich')}
                    </div>
                    <div className="text-xs tracking-[0.1em] uppercase" style={{ color: 'rgba(201, 169, 98, 0.5)' }}>
                      {t('projects.location', 'Switzerland')}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(201, 169, 98, 0.1)' }}
                  >
                    <svg className="w-4 h-4" style={{ color: '#C9A962' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <div>
                    <a
                      href="https://www.zurichsothebysrealty.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium mb-1 hover:underline transition-colors duration-300"
                      style={{ color: '#C9A962' }}
                    >
                      zurichsothebysrealty.com
                    </a>
                    <div className="text-xs tracking-[0.1em] uppercase" style={{ color: 'rgba(201, 169, 98, 0.5)' }}>
                      {t('projects.penthouse.client', 'Client')}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(201, 169, 98, 0.1)' }}
                  >
                    <svg className="w-4 h-4" style={{ color: '#C9A962' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1" style={{ color: '#F5F3EE' }}>
                      {t('projects.penthouse.deliverables', 'Film + Social Content')}
                    </div>
                    <div className="text-xs tracking-[0.1em] uppercase" style={{ color: 'rgba(201, 169, 98, 0.5)' }}>
                      {t('projects.penthouse.scope', 'Scope')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Video Section */}
        <div className="fade-section px-6 lg:px-16 pb-24">
          <div className="max-w-6xl mx-auto">
            {/* Section label */}
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-px" style={{ background: '#C9A962' }} />
              <h2
                className="editorial-heading text-3xl lg:text-4xl"
                style={{ color: '#F5F3EE' }}
              >
                {t('projects.penthouse.featuredText', 'Featured')}{' '}
                <span className="italic" style={{ color: '#C9A962' }}>
                  {t('projects.penthouse.filmText', 'Film')}
                </span>
              </h2>
            </div>

            <div className="relative group">
              {/* Ambient glow */}
              <div
                className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-2xl"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(201, 169, 98, 0.15) 0%, transparent 70%)',
                }}
              />

              <div
                className="relative aspect-video w-full overflow-hidden"
                style={{ border: '1px solid rgba(201, 169, 98, 0.2)' }}
              >
                {!videoLoaded && (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: '#111' }}
                  >
                    <div
                      className="w-12 h-12 rounded-full animate-spin"
                      style={{
                        border: '2px solid rgba(201, 169, 98, 0.2)',
                        borderTopColor: '#C9A962',
                      }}
                    />
                  </div>
                )}
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/VcBclEEyqG4?modestbranding=1&rel=0&controls=1"
                  title="Penthouse Zurich"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onLoad={() => setVideoLoaded(true)}
                  className={`transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
              </div>

              {/* Decorative film perforations */}
              <div className="flex justify-center gap-3 mt-6 opacity-30">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-4 rounded-sm"
                    style={{ background: 'rgba(201, 169, 98, 0.6)' }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div id="results-section" className="fade-section px-6 lg:px-16 pb-24">
          <div className="max-w-6xl mx-auto">
            {/* Section header */}
            <div className="flex items-end justify-between mb-16">
              <div className="flex items-center gap-6">
                <div className="w-12 h-px" style={{ background: '#C9A962' }} />
                <h2
                  className="editorial-heading text-3xl lg:text-4xl"
                  style={{ color: '#F5F3EE' }}
                >
                  {t('projects.penthouse.socialText', 'Social')}{' '}
                  <span className="italic" style={{ color: '#C9A962' }}>
                    {t('projects.penthouse.resultsText', 'Results')}
                  </span>
                </h2>
              </div>
              <span
                className="text-[10px] tracking-[0.3em] uppercase hidden md:block"
                style={{ color: 'rgba(201, 169, 98, 0.4)' }}
              >
                {t('projects.penthouse.performance', 'Performance Metrics')}
              </span>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <motion.div
                className="stat-card relative p-8 text-center group"
                style={{
                  background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.08) 0%, rgba(139, 115, 85, 0.04) 100%)',
                  border: '1px solid rgba(201, 169, 98, 0.15)',
                }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="absolute top-0 left-0 w-8 h-8"
                  style={{ borderTop: '1px solid rgba(201, 169, 98, 0.4)', borderLeft: '1px solid rgba(201, 169, 98, 0.4)' }}
                />
                <div
                  className="text-4xl lg:text-5xl font-light mb-3"
                  style={{ fontFamily: 'Cormorant Garamond, serif', color: '#C9A962' }}
                >
                  50K+
                </div>
                <div className="text-sm font-medium mb-1" style={{ color: '#F5F3EE' }}>
                  {t('projects.penthouse.results.views', 'Total Views')}
                </div>
                <div className="text-xs" style={{ color: 'rgba(245, 243, 238, 0.5)' }}>
                  {t('projects.penthouse.results.viewsDesc', 'Across all platforms')}
                </div>
              </motion.div>

              <motion.div
                className="stat-card relative p-8 text-center group"
                style={{
                  background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.08) 0%, rgba(139, 115, 85, 0.04) 100%)',
                  border: '1px solid rgba(201, 169, 98, 0.15)',
                }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="absolute top-0 left-0 w-8 h-8"
                  style={{ borderTop: '1px solid rgba(201, 169, 98, 0.4)', borderLeft: '1px solid rgba(201, 169, 98, 0.4)' }}
                />
                <div
                  className="text-4xl lg:text-5xl font-light mb-3"
                  style={{ fontFamily: 'Cormorant Garamond, serif', color: '#C9A962' }}
                >
                  1K+
                </div>
                <div className="text-sm font-medium mb-1" style={{ color: '#F5F3EE' }}>
                  {t('projects.penthouse.results.likes', 'Likes')}
                </div>
                <div className="text-xs" style={{ color: 'rgba(245, 243, 238, 0.5)' }}>
                  {t('projects.penthouse.results.likesDesc', 'High engagement rate')}
                </div>
              </motion.div>

              <motion.div
                className="stat-card relative p-8 text-center group"
                style={{
                  background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.08) 0%, rgba(139, 115, 85, 0.04) 100%)',
                  border: '1px solid rgba(201, 169, 98, 0.15)',
                }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="absolute top-0 left-0 w-8 h-8"
                  style={{ borderTop: '1px solid rgba(201, 169, 98, 0.4)', borderLeft: '1px solid rgba(201, 169, 98, 0.4)' }}
                />
                <div
                  className="text-4xl lg:text-5xl font-light mb-3"
                  style={{ fontFamily: 'Cormorant Garamond, serif', color: '#C9A962' }}
                >
                  100+
                </div>
                <div className="text-sm font-medium mb-1" style={{ color: '#F5F3EE' }}>
                  {t('projects.penthouse.results.comments', 'Comments')}
                </div>
                <div className="text-xs" style={{ color: 'rgba(245, 243, 238, 0.5)' }}>
                  {t('projects.penthouse.results.commentsDesc', 'Active community')}
                </div>
              </motion.div>
            </div>

            {/* Key Achievements */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative p-6 flex items-start gap-5"
                style={{
                  background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.06) 0%, transparent 100%)',
                  border: '1px solid rgba(201, 169, 98, 0.12)',
                }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #C9A962 0%, #A68B4B 100%)',
                  }}
                >
                  <svg className="w-5 h-5" style={{ color: '#0a0a0a' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2" style={{ color: '#F5F3EE' }}>
                    {t('projects.penthouse.results.topPerformer', '#2 Best Performing Reel')}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(245, 243, 238, 0.6)' }}>
                    {t('projects.penthouse.results.topPerformerDesc', "Second highest engagement on Zurich Sotheby's Instagram page")}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="relative p-6 flex items-start gap-5"
                style={{
                  background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.06) 0%, transparent 100%)',
                  border: '1px solid rgba(201, 169, 98, 0.12)',
                }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #C9A962 0%, #A68B4B 100%)',
                  }}
                >
                  <svg className="w-5 h-5" style={{ color: '#0a0a0a' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2" style={{ color: '#F5F3EE' }}>
                    {t('projects.penthouse.results.growth', '7x More Views')}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(245, 243, 238, 0.6)' }}>
                    {t('projects.penthouse.results.growthDesc', 'Than their usual content + significant follower growth')}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Reels Section */}
        <div className="fade-section pb-24 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 lg:px-16 mb-12">
            <div className="flex items-end justify-between">
              <div className="flex items-center gap-6">
                <div className="w-12 h-px" style={{ background: '#C9A962' }} />
                <h2
                  className="editorial-heading text-3xl lg:text-4xl"
                  style={{ color: '#F5F3EE' }}
                >
                  {t('projects.penthouse.socialText2', 'Social')}{' '}
                  <span className="italic" style={{ color: '#C9A962' }}>
                    {t('projects.penthouse.reelsText', 'Reels')}
                  </span>
                </h2>
              </div>
              <div className="hidden md:flex items-center gap-4">
                <span
                  className="text-[10px] tracking-[0.3em] uppercase"
                  style={{ color: 'rgba(201, 169, 98, 0.4)' }}
                >
                  {t('portfolio.frames', 'Frames')}
                </span>
                <span
                  className="text-3xl font-light tabular-nums"
                  style={{ fontFamily: 'Cormorant Garamond, serif', color: '#C9A962' }}
                >
                  02
                </span>
              </div>
            </div>
          </div>

          {/* Film strip decoration */}
          <div
            className="h-px mb-12"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(201, 169, 98, 0.2) 20%, rgba(201, 169, 98, 0.2) 80%, transparent)' }}
          />

          {/* Reels */}
          <div className="flex justify-center gap-8 lg:gap-12 px-6 lg:px-16">
            {reels.map((reel, i) => {
              const romanNumerals = ['I', 'II'];
              return (
                <motion.div
                  key={reel.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  {/* Ambient glow on hover */}
                  <div
                    className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-2xl"
                    style={{
                      background: 'radial-gradient(ellipse at center, rgba(201, 169, 98, 0.2) 0%, transparent 70%)',
                    }}
                  />

                  {/* Card container */}
                  <div className="relative w-64 lg:w-72 transition-all duration-500 group-hover:-translate-y-3">
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
                      <video
                        src={reel.src}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        playsInline
                        muted
                        loop
                        autoPlay
                        controls
                        preload="metadata"
                      />

                      {/* Gradient overlay */}
                      <div
                        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
                        style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, transparent 100%)' }}
                      />

                      {/* Content overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none">
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
                </motion.div>
              );
            })}
          </div>

          {/* Film strip bottom border */}
          <div
            className="h-px mt-12"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(201, 169, 98, 0.2) 20%, rgba(201, 169, 98, 0.2) 80%, transparent)' }}
          />
        </div>

        {/* Why Video Section */}
        <div id="why-video-section" className="fade-section px-6 lg:px-16 pb-24">
          <div className="max-w-6xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-16">
              <span
                className="inline-block text-[10px] tracking-[0.4em] uppercase mb-6"
                style={{ color: 'rgba(201, 169, 98, 0.7)' }}
              >
                {t('projects.penthouse.whyUsSubtitle', 'Data-Driven Insights')}
              </span>
              <h2
                className="editorial-heading text-3xl lg:text-5xl mb-6"
                style={{ color: '#F5F3EE' }}
              >
                {t('projects.penthouse.whyUsTitle1', 'Why premium content')}{' '}
                <span className="italic" style={{ color: '#C9A962' }}>
                  {t('projects.penthouse.whyUsTitle2', 'sells faster')}
                </span>
              </h2>
              <p
                className="max-w-2xl mx-auto text-base leading-relaxed"
                style={{ color: 'rgba(245, 243, 238, 0.5)' }}
              >
                {t('projects.penthouse.whyUsDesc', 'Data-driven insights on how professional video content transforms real estate marketing')}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left - Stats and Benefits */}
              <div className="space-y-8">
                {/* Stat Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative p-6 text-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.1) 0%, rgba(139, 115, 85, 0.05) 100%)',
                      border: '1px solid rgba(201, 169, 98, 0.2)',
                    }}
                  >
                    <div
                      className="text-3xl lg:text-4xl font-light mb-2"
                      style={{ fontFamily: 'Cormorant Garamond, serif', color: '#C9A962' }}
                    >
                      403%
                    </div>
                    <div className="text-xs" style={{ color: 'rgba(245, 243, 238, 0.7)' }}>
                      {t('projects.penthouse.whyUs.stat1', 'More Inquiries')}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="relative p-6 text-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.1) 0%, rgba(139, 115, 85, 0.05) 100%)',
                      border: '1px solid rgba(201, 169, 98, 0.2)',
                    }}
                  >
                    <div
                      className="text-3xl lg:text-4xl font-light mb-2"
                      style={{ fontFamily: 'Cormorant Garamond, serif', color: '#C9A962' }}
                    >
                      68%
                    </div>
                    <div className="text-xs" style={{ color: 'rgba(245, 243, 238, 0.7)' }}>
                      {t('projects.penthouse.whyUs.stat2', 'Faster Sales')}
                    </div>
                  </motion.div>
                </div>

                {/* Benefits List */}
                <div className="space-y-4">
                  {[
                    {
                      icon: (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      ),
                      title: t('projects.penthouse.whyUs.benefit1', 'Enhanced Buyer Engagement'),
                      desc: t('projects.penthouse.whyUs.benefit1Desc', 'Viewers retain 95% of a message from video, creating stronger emotional connection.'),
                    },
                    {
                      icon: (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      ),
                      title: t('projects.penthouse.whyUs.benefit2', 'Attract Premium Clients'),
                      desc: t('projects.penthouse.whyUs.benefit2Desc', '73% of homeowners are more likely to list with an agent who offers video content.'),
                    },
                    {
                      icon: (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      ),
                      title: t('projects.penthouse.whyUs.benefit3', 'Boost Organic Traffic'),
                      desc: t('projects.penthouse.whyUs.benefit3Desc', 'Video drives a 157% increase in organic traffic from search engines.'),
                    },
                    {
                      icon: (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      ),
                      title: t('projects.penthouse.whyUs.benefit4', 'Gain a Competitive Edge'),
                      desc: t('projects.penthouse.whyUs.benefit4Desc', 'With only 38% of agents using video, premium content makes you the top choice.'),
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4 p-4"
                      style={{
                        background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.04) 0%, transparent 100%)',
                        border: '1px solid rgba(201, 169, 98, 0.1)',
                      }}
                    >
                      <div
                        className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(201, 169, 98, 0.1)' }}
                      >
                        <svg className="w-5 h-5" style={{ color: '#C9A962' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {item.icon}
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1" style={{ color: '#F5F3EE' }}>
                          {item.title}
                        </h4>
                        <p className="text-xs leading-relaxed" style={{ color: 'rgba(245, 243, 238, 0.5)' }}>
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right - Project Impact */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div
                  className="relative p-8 lg:p-10"
                  style={{
                    background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.08) 0%, rgba(139, 115, 85, 0.04) 100%)',
                    border: '1px solid rgba(201, 169, 98, 0.15)',
                  }}
                >
                  {/* Decorative corners */}
                  <div className="absolute top-0 left-0 w-12 h-12" style={{ borderTop: '1px solid #C9A962', borderLeft: '1px solid #C9A962' }} />
                  <div className="absolute bottom-0 right-0 w-12 h-12" style={{ borderBottom: '1px solid #C9A962', borderRight: '1px solid #C9A962' }} />

                  <div className="text-center mb-8">
                    <h4
                      className="text-xl font-medium mb-2"
                      style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5F3EE' }}
                    >
                      {t('projects.penthouse.whyUs.proofTitle', "This Project's Impact")}
                    </h4>
                    <p className="text-xs" style={{ color: 'rgba(201, 169, 98, 0.6)' }}>
                      {t('projects.penthouse.whyUs.proofDesc', 'Real results from our Zurich penthouse campaign')}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { label: t('projects.penthouse.whyUs.impactSocialReach', 'Social media reach'), value: '50K+ views' },
                      { label: t('projects.penthouse.whyUs.impactEngagement', 'Engagement rate'), value: '7x above average' },
                      { label: t('projects.penthouse.whyUs.impactExposure', 'International exposure'), value: 'Global audience' },
                      { label: t('projects.penthouse.whyUs.impactBrand', 'Brand recognition'), value: '#2 best reel' },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center p-4"
                        style={{ background: 'rgba(201, 169, 98, 0.05)' }}
                      >
                        <span className="text-sm" style={{ color: 'rgba(245, 243, 238, 0.7)' }}>
                          {item.label}
                        </span>
                        <span className="text-sm font-medium" style={{ color: '#C9A962' }}>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div
                    className="mt-8 pt-8 text-center"
                    style={{ borderTop: '1px solid rgba(201, 169, 98, 0.15)' }}
                  >
                    <div
                      className="text-2xl lg:text-3xl font-light mb-2"
                      style={{ fontFamily: 'Cormorant Garamond, serif', color: '#C9A962' }}
                    >
                      {t('projects.penthouse.whyUs.firstThreeDays', '30K views in first 3 days')}
                    </div>
                    <p className="text-xs" style={{ color: 'rgba(245, 243, 238, 0.5)' }}>
                      {t('projects.penthouse.whyUs.firstThreeDaysDesc', 'Exceptional initial performance across all platforms')}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="px-6 lg:px-16 pb-32"
        >
          <div className="max-w-5xl mx-auto">
            <div
              className="relative py-20 lg:py-28 px-8 lg:px-16 overflow-hidden text-center"
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
              <div className="relative">
                <span
                  className="inline-block text-[10px] tracking-[0.4em] uppercase mb-8"
                  style={{ color: 'rgba(201, 169, 98, 0.7)' }}
                >
                  {t('projects.penthouse.ctaSubtitle', 'Start Your Project')}
                </span>

                <h2
                  className="editorial-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-8 leading-tight"
                  style={{ color: '#F5F3EE' }}
                >
                  {t('projects.penthouse.ctaTitle1', 'Ready to showcase')}{' '}
                  <br className="hidden sm:block" />
                  <span className="italic" style={{ color: '#C9A962' }}>
                    {t('projects.penthouse.ctaTitle2', 'your property')}?
                  </span>
                </h2>

                <p
                  className="max-w-xl mx-auto text-base lg:text-lg mb-12 font-light leading-relaxed"
                  style={{ color: 'rgba(245, 243, 238, 0.5)' }}
                >
                  {t(
                    'projects.penthouse.ctaDesc',
                    'Let us create premium content that elevates your luxury properties and captures the attention of discerning buyers.'
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
                    {t('projects.penthouse.ctaButton', 'Start Your Project')}
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
      </div>
    </section>
  );
};

export default PenthouseZurichProject;
