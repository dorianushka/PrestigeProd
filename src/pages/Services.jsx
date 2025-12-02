import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { highlightSecondVideo, smoothScrollTo } from '../utils';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { GRADIENT_CLASS } from '../constants';

const Services = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || i18n.language || 'en';
  const targetRef = useRef(null);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [hoveredService, setHoveredService] = useState(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const toggleFaq = index => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const serviceTypes = [
    {
      id: 'video-production',
      titleKey: 'videoProduction',
      descriptionKey: 'videoProductionDesc',
      featuresKeys: [
        'videoFeature1',
        'videoFeature2',
        'videoFeature3',
        'videoFeature4',
      ],
      ctaKey: 'videoProductionCta',
      icon: 'film',
      contactSubject: 'Video Production Inquiry',
    },
    {
      id: 'photography',
      titleKey: 'photography',
      descriptionKey: 'photographyDesc',
      featuresKeys: ['photoFeature1', 'photoFeature2', 'photoFeature3'],
      ctaKey: 'photographyCta',
      icon: 'aperture',
      contactSubject: 'Photography Inquiry',
    },
    {
      id: 'complete-package',
      titleKey: 'completePackage',
      descriptionKey: 'completePackageDesc',
      featuresKeys: [
        'completeFeature1',
        'completeFeature2',
        'completeFeature3',
        'completeFeature4',
        'completeFeature5',
      ],
      ctaKey: 'completePackageCta',
      popular: true,
      icon: 'diamond',
      contactSubject: 'Complete Package Inquiry',
    },
  ];

  const gear = [
    {
      titleKey: 'sonyAlpha',
      specKey: 'sonyAlphaSpec',
      image: `${import.meta.env.VITE_CLOUDFRONT_URL}/gear/sony_camera.jpg`,
    },
    {
      titleKey: 'djiMavic',
      specKey: 'djiMavicSpec',
      image: `${import.meta.env.VITE_CLOUDFRONT_URL}/gear/dji_drone.jpg`,
    },
  ];

  const canonicalUrl = `https://prestigeproduction.ch/${currentLang}/services`;

  // FAQ data for schema
  const faqData = [
    {
      question: t('services.faq.q1', 'How much does video production cost in Zurich?'),
      answer: t('services.faq.a1', 'Our video production packages are customized based on your specific needs. Contact us for a personalized quote.')
    },
    {
      question: t('services.faq.q2', 'How long does a typical project take?'),
      answer: t('services.faq.a2', 'Project timelines vary based on complexity. Most projects are completed within 2-4 weeks from initial consultation to final delivery.')
    },
    {
      question: t('services.faq.q3', 'Do you offer drone photography?'),
      answer: t('services.faq.a3', 'Yes, we offer professional drone photography and videography services for real estate, events, and commercial projects.')
    },
    {
      question: t('services.faq.q4', 'What areas do you serve?'),
      answer: t('services.faq.a4', 'We serve all of Switzerland, with primary focus on Zurich, Geneva, Basel, Lausanne, and surrounding areas.')
    },
    {
      question: t('services.faq.q5', 'Can I see examples of your work?'),
      answer: t('services.faq.a5', 'Absolutely! Visit our portfolio page to see examples of our video production and photography projects.')
    }
  ];

  // Custom icon components
  const ServiceIcon = ({ type }) => {
    const icons = {
      film: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M2 8h20M2 16h20M6 4v16M18 4v16" />
        </svg>
      ),
      aperture: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
          <circle cx="12" cy="12" r="10" />
          <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94" />
        </svg>
      ),
      diamond: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
          <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
          <path d="M2 9h20M12 21L8 9l4-6 4 6-4 12" />
        </svg>
      ),
    };
    return icons[type] || null;
  };

  return (
    <>
      <Helmet>
        <title>{t('seo.services.title', 'Services | Video Production & Photography Zurich')}</title>
        <meta name="description" content={t('seo.services.description', 'Professional video production, photography, and drone services in Zurich, Switzerland. Real estate videography, corporate videos, event coverage.')} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={t('seo.services.title', 'Services | Prestige Production')} />
        <meta property="og:description" content={t('seo.services.description', 'Professional video production and photography services in Zurich.')} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('seo.services.title', 'Services | Prestige Production')} />
        <meta name="twitter:description" content={t('seo.services.description', 'Professional video production and photography services.')} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {"@type": "ListItem", "position": 1, "name": t('nav.home', 'Home'), "item": `https://prestigeproduction.ch/${currentLang}/`},
              {"@type": "ListItem", "position": 2, "name": t('nav.services', 'Services'), "item": canonicalUrl}
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      </Helmet>
      <main className="bg-[#0a0a0a] text-white font-sans overflow-hidden">
        {/* Subtle noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.015] z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Hero Section - Editorial Cinematic */}
      <section className="relative min-h-screen flex items-end pb-20 md:pb-32">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            src={highlightSecondVideo}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="mb-8"
            >
              <span className="editorial-subheading text-[#c4a962] tracking-[0.3em] text-xs">
                {t('services.hero.eyebrow', 'Visual Excellence')}
              </span>
            </motion.div>

            <div className="overflow-hidden mb-6">
              <motion.h1
                initial={{ y: 120 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[-0.02em] leading-[0.95]"
              >
                {t('services.hero.titleLine1', 'Crafting Visual')}
              </motion.h1>
            </div>

            <div className="overflow-hidden mb-12">
              <motion.h1
                initial={{ y: 120 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
                className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[-0.02em] leading-[0.95] text-[#9eb6a9]"
              >
                {t('services.hero.titleLine2', 'Narratives')}
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-white/60 text-lg md:text-xl max-w-xl mb-12 leading-relaxed"
            >
              {t('services.hero.subtitle', 'Premium video production and photography that transforms brands into compelling stories.')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to={`/${currentLang}/contact`}
                className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden"
              >
                <span className="absolute inset-0 bg-[#c4a962]" />
                <span className="absolute inset-0 bg-[#9eb6a9] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative text-[#0a0a0a] font-medium tracking-wide text-sm uppercase">
                  {t('services.hero.primaryCta', 'Start Your Project')}
                </span>
              </Link>

              <button
                onClick={() => smoothScrollTo('packages')}
                className="group inline-flex items-center gap-3 px-8 py-4 border border-white/20 hover:border-white/40 transition-colors duration-300"
              >
                <span className="text-white/80 group-hover:text-white font-medium tracking-wide text-sm uppercase transition-colors">
                  {t('services.hero.secondaryCta', 'View Services')}
                </span>
                <svg className="w-4 h-4 text-white/60 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 right-8 md:right-12 hidden md:block"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase rotate-90 origin-center translate-x-4">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"
            />
          </div>
        </motion.div>
      </section>

      {/* Value Propositions - Horizontal Scroll Cards */}
      <section className="py-24 md:py-32 border-t border-white/5">
        <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-px bg-white/10"
          >
            {[
              {
                num: '01',
                title: t('services.benefits.expertise', 'Swiss Precision'),
                desc: t('services.benefits.expertiseDesc', 'Professional equipment and years of experience ensuring consistent, high-quality results.'),
              },
              {
                num: '02',
                title: t('services.benefits.efficiency', 'Timely Delivery'),
                desc: t('services.benefits.efficiencyDesc', 'Streamlined process that respects your schedule and delivers on agreed timelines.'),
              },
              {
                num: '03',
                title: t('services.benefits.impact', 'Lasting Impact'),
                desc: t('services.benefits.impactDesc', 'First impressions shape business success. Professional visuals build trust and attract customers.'),
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                viewport={{ once: true }}
                className="group bg-[#0a0a0a] p-8 md:p-12 hover:bg-[#111] transition-colors duration-500"
              >
                <span className="text-[#c4a962] text-xs tracking-[0.3em] font-light">{item.num}</span>
                <h3 className="font-editorial text-2xl md:text-3xl mt-6 mb-4 group-hover:text-[#9eb6a9] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section - Editorial Timeline */}
      <section ref={targetRef} className="py-24 md:py-40 relative">
        {/* Decorative vertical line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block" />

        <div className="px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
          <motion.div style={{ opacity }} className="text-center mb-24">
            <span className="editorial-subheading text-[#c4a962] tracking-[0.3em] text-xs block mb-6">
              {t('services.process.eyebrow', 'Our Approach')}
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.02em] mb-6">
              {t('services.process.title', 'Simple Process,')}
              <br />
              <span className="text-[#9eb6a9]">{t('services.process.highlight', 'Exceptional Results')}</span>
            </h2>
            <div className="editorial-divider mx-auto mt-8" />
          </motion.div>

          <div className="space-y-0">
            {[
              { num: '01', title: t('services.process.step1Title', 'Consultation'), desc: t('services.process.step1Desc', 'We explore your goals, audience, and strategic objectives.') },
              { num: '02', title: t('services.process.step2Title', 'Planning'), desc: t('services.process.step2Desc', 'We develop a creative concept and detailed production plan.') },
              { num: '03', title: t('services.process.step3Title', 'Production'), desc: t('services.process.step3Desc', 'Our team captures high-quality footage using premium equipment.') },
              { num: '04', title: t('services.process.step4Title', 'Post-Production'), desc: t('services.process.step4Desc', 'Expert editing, color grading, and refinement of your visual story.') },
              { num: '05', title: t('services.process.step5Title', 'Delivery'), desc: t('services.process.step5Desc', 'Final content optimized for your platforms with strategic guidance.') },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
                className={`flex items-center gap-8 md:gap-16 py-12 border-b border-white/5 ${
                  idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${idx % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                  <span className="text-[#c4a962] text-sm tracking-[0.2em] font-light">{step.num}</span>
                  <h3 className="font-editorial text-3xl md:text-4xl mt-2 mb-3">{step.title}</h3>
                  <p className="text-white/50 text-base max-w-md inline-block">{step.desc}</p>
                </div>
                <div className="hidden lg:flex w-16 h-16 items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#9eb6a9] relative">
                    <div className="absolute inset-0 rounded-full bg-[#9eb6a9] animate-ping opacity-30" />
                  </div>
                </div>
                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Packages - Refined Cards */}
      <section id="packages" className="py-24 md:py-40 bg-[#080808]">
        <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="editorial-subheading text-[#c4a962] tracking-[0.3em] text-xs block mb-6">
              {t('services.types.eyebrow', 'Services')}
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.02em] mb-6">
              {t('services.types.title', 'Our Services')}
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              {t('services.types.subtitle', 'Clear, transparent pricing for professional visual content that delivers results.')}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {serviceTypes.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
                className={`group relative ${service.popular ? 'lg:-mt-4 lg:mb-4' : ''}`}
              >
                {/* Card background with border */}
                <div className={`absolute inset-0 transition-all duration-500 ${
                  service.popular
                    ? 'bg-gradient-to-b from-[#c4a962]/20 to-transparent'
                    : 'bg-[#0f0f0f]'
                }`} />
                <div className={`absolute inset-0 border transition-colors duration-500 ${
                  service.popular
                    ? 'border-[#c4a962]/30'
                    : hoveredService === index
                      ? 'border-white/20'
                      : 'border-white/5'
                }`} />

                {/* Popular badge */}
                {service.popular && (
                  <div className="absolute -top-px left-1/2 -translate-x-1/2 px-6 py-1.5 bg-[#c4a962] text-[#0a0a0a] text-[10px] tracking-[0.2em] uppercase font-medium">
                    {t('services.types.mostPopular', 'Recommended')}
                  </div>
                )}

                <div className="relative p-8 md:p-10">
                  {/* Icon */}
                  <div className={`w-14 h-14 flex items-center justify-center mb-8 transition-colors duration-300 ${
                    service.popular ? 'text-[#c4a962]' : 'text-[#9eb6a9]'
                  }`}>
                    <ServiceIcon type={service.icon} />
                  </div>

                  <h3 className="font-editorial text-2xl md:text-3xl mb-4">
                    {t(`services.types.${service.titleKey}.title`, service.titleKey)}
                  </h3>

                  <p className="text-white/50 text-sm mb-8 leading-relaxed">
                    {t(`services.types.${service.titleKey}.${service.descriptionKey}`, 'Service description')}
                  </p>

                  {/* Features */}
                  <ul className="space-y-4 mb-10">
                    {service.featuresKeys.map((featureKey, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className={`w-1 h-1 rounded-full mt-2 flex-shrink-0 ${
                          service.popular ? 'bg-[#c4a962]' : 'bg-[#9eb6a9]'
                        }`} />
                        <span className="text-white/70 text-sm">
                          {t(`services.types.${service.titleKey}.${featureKey}`, `Feature ${idx + 1}`)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    to={`/${currentLang}/contact`}
                    state={{ selectedPackage: t(`services.types.${service.titleKey}.title`) }}
                    className={`block w-full text-center py-4 transition-all duration-300 text-sm tracking-wide uppercase font-medium ${
                      service.popular
                        ? 'bg-[#c4a962] text-[#0a0a0a] hover:bg-[#d4b972]'
                        : 'border border-white/20 text-white hover:bg-white hover:text-[#0a0a0a]'
                    }`}
                  >
                    {t(`services.types.${service.titleKey}.${service.ctaKey}`, 'Select')}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Custom Project CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20 relative"
          >
            <div className="absolute inset-0 border border-white/5" />
            <div className="relative p-10 md:p-16 text-center">
              <span className="editorial-subheading text-[#c4a962] tracking-[0.3em] text-xs block mb-4">
                {t('services.custom.eyebrow', 'Bespoke')}
              </span>
              <h3 className="font-editorial text-3xl md:text-4xl mb-4">
                {t('services.custom.title', "Need Something Different?")}
              </h3>
              <p className="text-white/50 max-w-xl mx-auto mb-8">
                {t('services.custom.description', "Have a unique project in mind? We're experts at creating custom solutions tailored to your exact needs.")}
              </p>
              <Link
                to={`/${currentLang}/contact`}
                state={{ selectedPackage: 'Custom Project' }}
                className="inline-flex items-center gap-2 text-[#c4a962] hover:text-[#d4b972] transition-colors text-sm tracking-wide uppercase font-medium"
              >
                {t('services.custom.cta', "Let's Discuss")}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Types - Cinematic Showcase */}
      <section className="py-24 md:py-40">
        <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="editorial-subheading text-[#c4a962] tracking-[0.3em] text-xs block mb-6">
              {t('services.offerings.eyebrow', 'Expertise')}
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.02em]">
              {t('services.offerings.title', 'Premium Content Types')}
            </h2>
          </motion.div>

          <div className="space-y-32 md:space-y-48">
            {/* Cinematic Videos */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              <div className="lg:col-span-7 relative">
                <div className="aspect-[16/10] overflow-hidden bg-[#111]">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source
                      src={`${import.meta.env.VITE_CLOUDFRONT_URL}/videos/hero.mp4`}
                      type="video/mp4"
                    />
                  </video>
                </div>
                {/* Floating label */}
                <div className="absolute -bottom-4 -right-4 md:bottom-8 md:-right-8 bg-[#0a0a0a] border border-white/10 px-6 py-3">
                  <span className="text-[#c4a962] text-xs tracking-[0.2em] uppercase">01</span>
                </div>
              </div>
              <div className="lg:col-span-5 lg:pl-8">
                <h3 className="font-editorial text-3xl md:text-4xl lg:text-5xl mb-6">
                  {t('services.offerings.propertyTours.title', 'Cinematic Videos')}
                </h3>
                <p className="text-white/50 text-base md:text-lg leading-relaxed mb-8">
                  {t('services.offerings.propertyTours.description', 'Immersive visual stories that create an emotional connection with viewers.')}
                </p>
                <div className="flex flex-wrap gap-3">
                  {['4K Resolution', 'Cinema Grade', 'Color Graded'].map((tag, idx) => (
                    <span key={idx} className="px-4 py-2 border border-white/10 text-white/40 text-xs tracking-wider uppercase">
                      {t(`services.offerings.tags.${tag.toLowerCase().replace(' ', '')}`, tag)}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Professional Photography */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              <div className="lg:col-span-5 lg:pr-8 lg:order-1 order-2">
                <h3 className="font-editorial text-3xl md:text-4xl lg:text-5xl mb-6">
                  {t('services.offerings.aerial.title', 'Professional Photography')}
                </h3>
                <p className="text-white/50 text-base md:text-lg leading-relaxed mb-8">
                  {t('services.offerings.aerial.description', 'Stunning high-resolution images that capture every detail with perfect lighting and composition.')}
                </p>
                <div className="flex flex-wrap gap-3">
                  {['High Resolution', 'Perfect Lighting', 'Professional Editing'].map((tag, idx) => (
                    <span key={idx} className="px-4 py-2 border border-white/10 text-white/40 text-xs tracking-wider uppercase">
                      {t(`services.offerings.tags.${tag.toLowerCase().replace(' ', '')}`, tag)}
                    </span>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-7 lg:order-2 order-1 relative">
                <div className="grid grid-cols-5 gap-3">
                  <div className="col-span-3 aspect-[4/5] overflow-hidden bg-[#111]">
                    <img
                      src={`${import.meta.env.VITE_CLOUDFRONT_URL}/images/explore1.jpg`}
                      alt="Professional Photography Sample"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="col-span-2 space-y-3">
                    <div className="aspect-square overflow-hidden bg-[#111]">
                      <img
                        src={`${import.meta.env.VITE_CLOUDFRONT_URL}/images/explore2.jpg`}
                        alt="Professional Photography Sample"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="aspect-square overflow-hidden bg-[#111]">
                      <img
                        src={`${import.meta.env.VITE_CLOUDFRONT_URL}/images/thumbnail_penthouse.png`}
                        alt="Professional Photography Sample"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>
                {/* Floating label */}
                <div className="absolute -bottom-4 -left-4 md:bottom-8 md:-left-8 bg-[#0a0a0a] border border-white/10 px-6 py-3">
                  <span className="text-[#c4a962] text-xs tracking-[0.2em] uppercase">02</span>
                </div>
              </div>
            </motion.div>

            {/* Social Media Content */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              <div className="lg:col-span-5 relative flex justify-center">
                <div className="w-[280px] md:w-[320px] aspect-[9/16] overflow-hidden bg-[#111] rounded-2xl">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source
                      src={`${import.meta.env.VITE_CLOUDFRONT_URL}/videos/lowres_short_reel_showcase_v2_1.mp4`}
                      type="video/mp4"
                    />
                  </video>
                </div>
                {/* Floating label */}
                <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-[#0a0a0a] border border-white/10 px-6 py-3">
                  <span className="text-[#c4a962] text-xs tracking-[0.2em] uppercase">03</span>
                </div>
              </div>
              <div className="lg:col-span-7 lg:pl-8">
                <h3 className="font-editorial text-3xl md:text-4xl lg:text-5xl mb-6">
                  {t('services.offerings.social.title', 'Social Media Content')}
                </h3>
                <p className="text-white/50 text-base md:text-lg leading-relaxed mb-8">
                  {t('services.offerings.social.description', 'Eye-catching reels and shorts optimized for maximum engagement.')}
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Multi-Platform', 'Optimized Formats', 'Trend-Aware'].map((tag, idx) => (
                    <span key={idx} className="px-4 py-2 border border-white/10 text-white/40 text-xs tracking-wider uppercase">
                      {t(`services.offerings.tags.${tag.toLowerCase().replace(' ', '')}`, tag)}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-24 md:py-40 bg-[#080808]">
        <div className="px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="editorial-subheading text-[#c4a962] tracking-[0.3em] text-xs block mb-6">
              {t('services.gear.eyebrow', 'Technology')}
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.02em] mb-6">
              {t('services.gear.title', 'Professional-Grade Equipment')}
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              {t('services.gear.description', 'We invest in the latest cinema-grade technology to capture your brand with exceptional detail and cinematic quality.')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {gear.map(({ titleKey, image, specKey }, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="absolute inset-0 border border-white/5 group-hover:border-white/10 transition-colors duration-500" />
                <div className="relative p-8 md:p-10">
                  <div className="aspect-[4/3] mb-8 overflow-hidden bg-[#111]">
                    <img
                      src={image}
                      alt={t(`services.gear.${titleKey}Alt`, titleKey)}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="font-editorial text-2xl mb-3">
                    {t(`services.gear.${titleKey}`, titleKey)}
                  </h3>
                  <p className="text-white/50 text-sm mb-6">
                    {t(`services.gear.${specKey}`, 'Equipment specifications')}
                  </p>
                  <ul className="space-y-2">
                    {[1, 2, 3].map(i => (
                      <li key={i} className="flex items-center gap-3 text-white/40 text-sm">
                        <span className="w-1 h-1 rounded-full bg-[#9eb6a9]" />
                        {t(`services.gear.${titleKey}Feature${i}`, `Feature ${i}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-40">
        <div className="px-6 md:px-12 lg:px-20 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="editorial-subheading text-[#c4a962] tracking-[0.3em] text-xs block mb-6">
              {t('services.faq.eyebrow', 'Questions')}
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.02em] mb-6">
              {t('services.faq.title', 'Frequently Asked')}
            </h2>
            <p className="text-white/50">{t('services.faq.subtitle', 'Everything you need to know about working with us.')}</p>
          </motion.div>

          <div className="space-y-0">
            {[1, 2, 3, 4, 5].map(i => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="border-b border-white/5"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between py-6 md:py-8 text-left group"
                >
                  <span className="flex items-center gap-6">
                    <span className="text-[#c4a962] text-xs tracking-wider">0{i}</span>
                    <span className="font-editorial text-xl md:text-2xl group-hover:text-[#9eb6a9] transition-colors">
                      {t(`services.faq.q${i}`)}
                    </span>
                  </span>
                  <span className={`w-8 h-8 flex items-center justify-center border border-white/20 transition-all duration-300 ${
                    expandedFaq === i ? 'bg-[#c4a962] border-[#c4a962] rotate-45' : ''
                  }`}>
                    <svg className={`w-3 h-3 transition-colors ${expandedFaq === i ? 'text-[#0a0a0a]' : 'text-white/60'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>
                <AnimatePresence>
                  {expandedFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pl-14 pr-8">
                        <p className="text-white/50 text-base leading-relaxed">
                          {t(`services.faq.a${i}`)}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-white/40 mb-4">{t('services.faq.moreQuestions', 'Have more questions?')}</p>
            <Link
              to={`/${currentLang}/contact`}
              className="inline-flex items-center gap-2 text-[#c4a962] hover:text-[#d4b972] transition-colors text-sm tracking-wide uppercase font-medium"
            >
              {t('services.faq.contactUs', 'Get in Touch')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 md:py-48 relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f1412] to-[#0a0a0a]" />

        <div className="relative px-6 md:px-12 lg:px-20 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="editorial-divider mx-auto mb-12" />

            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[-0.02em] mb-8 leading-tight">
              {t('services.cta.title', 'Ready to Transform Your Visual Marketing?')}
            </h2>

            <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-12">
              {t('services.cta.description', 'Join successful brands and organizations who are seeing higher engagement and stronger results with our premium visual content.')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={`/${currentLang}/contact`}
                className="group relative inline-flex items-center justify-center px-10 py-5 overflow-hidden"
              >
                <span className="absolute inset-0 bg-[#c4a962]" />
                <span className="absolute inset-0 bg-[#9eb6a9] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative text-[#0a0a0a] font-medium tracking-wide text-sm uppercase">
                  {t('services.cta.primaryButton', 'Book Your Consultation')}
                </span>
              </Link>

              <Link
                to={`/${currentLang}/portfolio`}
                className="inline-flex items-center justify-center gap-2 px-10 py-5 border border-white/20 hover:border-white/40 transition-colors duration-300 text-white/80 hover:text-white font-medium tracking-wide text-sm uppercase"
              >
                {t('services.cta.secondaryButton', 'View Portfolio')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      </main>
    </>
  );
};

export default Services;
