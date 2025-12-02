import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Refined gold accent color
const GOLD = '#C9A961';
const GOLD_LIGHT = '#E8D5A3';

// --- Icon Components ---
const IconWrapper = ({ children, className }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    {children}
  </svg>
);

const VisionIcon = ({ className }) => (
  <IconWrapper className={className}>
    <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
    <circle cx='12' cy='12' r='3' />
  </IconWrapper>
);

const CreativityIcon = ({ className }) => (
  <IconWrapper className={className}>
    <path d='M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z' />
  </IconWrapper>
);

const ExecutionIcon = ({ className }) => (
  <IconWrapper className={className}>
    <circle cx='12' cy='12' r='3' />
    <path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 16.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z' />
  </IconWrapper>
);

const ResultsIcon = ({ className }) => (
  <IconWrapper className={className}>
    <path d='M18 20V10M12 20V4M6 20v-6' />
  </IconWrapper>
);

const CheckIcon = ({ className }) => (
  <IconWrapper className={className}>
    <polyline points='20 6 9 17 4 12' />
  </IconWrapper>
);

// Decorative diamond element
const Diamond = ({ className = '' }) => (
  <svg viewBox='0 0 20 20' className={className} fill='currentColor'>
    <path d='M10 0L20 10L10 20L0 10L10 0Z' />
  </svg>
);

const WhyUs = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || i18n.language || 'en';
  const sectionRef = useRef(null);
  const teamRef = useRef(null);
  const individualSectionRef = useRef(null);
  const approachSectionRef = useRef(null);
  const ctaSectionRef = useRef(null);
  const [activeSkill, setActiveSkill] = useState(null);
  const [activeTab, setActiveTab] = useState('vision');
  const [activeSection, setActiveSection] = useState('team');

  const skills = {
    dorian: [
      t('whyUs.skills.dorian.0', 'Creative direction'),
      t('whyUs.skills.dorian.1', 'Cinematography'),
      t('whyUs.skills.dorian.2', 'Brand strategy'),
    ],
    alex: [
      t('whyUs.skills.alex.0', 'Technical production'),
      t('whyUs.skills.alex.1', 'Post processing'),
      t('whyUs.skills.alex.2', 'Color grading'),
    ],
  };

  const getApproachPointText = (tab, index) => {
    if (tab === 'vision') {
      if (index === 1) return 'Deep stakeholder interviews to understand needs';
      if (index === 2) return 'Market and audience research';
      if (index === 3) return 'Strategic alignment with your business goals';
    }
    if (tab === 'creativity') {
      if (index === 1) return 'Innovative concept development';
      if (index === 2) return 'Visual storytelling expertise';
      if (index === 3) return 'Brand-aligned aesthetic direction';
    }
    if (tab === 'execution') {
      if (index === 1) return 'Premium equipment and production values';
      if (index === 2) return 'Expert crew and technical excellence';
      if (index === 3) return 'Thorough quality control process';
    }
    if (tab === 'results') {
      if (index === 1) return 'Performance metrics tracking';
      if (index === 2) return 'Audience engagement analysis';
      if (index === 3) return 'Tangible business outcome reporting';
    }
    return '';
  };

  const getApproachDescription = tab => {
    switch (tab) {
      case 'vision':
        return "We begin by deeply understanding your brand's unique needs and goals. Every project starts with a clear vision of what success means to you and your audience.";
      case 'creativity':
        return 'Our creative team combines artistic expertise with strategic thinking to develop concepts that are both innovative and aligned with your objectives.';
      case 'execution':
        return 'With meticulous planning and technical excellence, we bring concepts to life using premium equipment and production techniques.';
      case 'results':
      default:
        return 'We measure success through audience engagement, brand perception shifts, and business outcomes—delivering content that achieves real results.';
    }
  };

  const approachTabs = [
    { id: 'vision', icon: VisionIcon, num: '01' },
    { id: 'creativity', icon: CreativityIcon, num: '02' },
    { id: 'execution', icon: ExecutionIcon, num: '03' },
    { id: 'results', icon: ResultsIcon, num: '04' },
  ];

  const canonicalUrl = `https://prestigeproduction.ch/${currentLang}/why-us`;

  const scrollToSection = ref => {
    if (ref && ref.current) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: ref.current, offsetY: 100 },
        ease: 'power3.inOut',
      });
    }
  };

  useGSAP(() => {
    gsap.from('.fade-in', {
      opacity: 0,
      y: 30,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power3.out',
    });

    gsap.fromTo(
      '.team-photo-reveal',
      { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
      {
        scrollTrigger: {
          trigger: teamRef.current,
          start: 'top 80%',
        },
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 1.4,
        ease: 'power4.out',
      },
    );

    gsap.from('.team-individual', {
      scrollTrigger: {
        trigger: individualSectionRef.current,
        start: 'top 70%',
      },
      y: 60,
      opacity: 0,
      stagger: 0.25,
      duration: 1,
      ease: 'power3.out',
    });

    const sections = [
      { ref: teamRef, name: 'team' },
      { ref: individualSectionRef, name: 'individuals' },
      { ref: approachSectionRef, name: 'approach' },
      { ref: ctaSectionRef, name: 'cta' },
    ];

    sections.forEach(section => {
      if (section.ref.current) {
        ScrollTrigger.create({
          trigger: section.ref.current,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => setActiveSection(section.name),
          onEnterBack: () => setActiveSection(section.name),
        });
      }
    });
  }, []);

  const teamMembers = [
    {
      nameKey: 'duo',
      image: '/assets/images/duo.png',
      roleKey: 'duoRole',
      descriptionKeys: ['duoDesc1', 'duoDesc2', 'duoDesc3'],
    },
    {
      nameKey: 'dorian',
      image: '/assets/images/dorian.jpg',
      roleKey: 'dorianRole',
      descriptionKeys: ['dorianDesc1', 'dorianDesc2', 'dorianDesc3'],
    },
    {
      nameKey: 'alex',
      image: '/assets/images/alex.jpg',
      roleKey: 'alexRole',
      descriptionKeys: ['alexDesc1', 'alexDesc2', 'alexDesc3'],
    },
  ];

  const [duo, ...individuals] = teamMembers;

  return (
    <>
      <Helmet>
        <title>{t('seo.whyUs.title', 'Why Choose Us | Prestige Production Zurich')}</title>
        <meta name="description" content={t('seo.whyUs.description', 'Meet the team behind Prestige Production. Award-winning video production and photography team in Zurich, Switzerland. Creative excellence guaranteed.')} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={t('seo.whyUs.title', 'Why Choose Us | Prestige Production')} />
        <meta property="og:description" content={t('seo.whyUs.description', 'Meet our expert video and photo team in Zurich.')} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('seo.whyUs.title', 'Why Choose Us | Prestige Production')} />
        <meta name="twitter:description" content={t('seo.whyUs.description', 'Meet our expert team.')} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {"@type": "ListItem", "position": 1, "name": t('nav.home', 'Home'), "item": `https://prestigeproduction.ch/${currentLang}/`},
              {"@type": "ListItem", "position": 2, "name": t('nav.whyUs', 'Why Us'), "item": canonicalUrl}
            ]
          })}
        </script>
      </Helmet>
      <section
        ref={sectionRef}
        className='relative w-full min-h-screen text-white overflow-hidden'
        style={{
          background: 'linear-gradient(180deg, #0a0a0a 0%, #0d0d0d 50%, #080808 100%)',
        }}
      >
      {/* Subtle grain texture overlay */}
      <div
        className='fixed inset-0 pointer-events-none opacity-[0.03] z-50'
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Refined navigation dots */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className='fixed left-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col items-center'
      >
        {[
          { ref: teamRef, name: 'team' },
          { ref: individualSectionRef, name: 'individuals' },
          { ref: approachSectionRef, name: 'approach' },
          { ref: ctaSectionRef, name: 'cta' },
        ].map((section, i) => (
          <React.Fragment key={section.name}>
            <motion.button
              onClick={() => scrollToSection(section.ref)}
              className='group relative p-2'
              whileHover={{ scale: 1.2 }}
              aria-label={`Go to ${section.name} section`}
            >
              <div
                className={`w-2 h-2 transition-all duration-500 ${
                  activeSection === section.name
                    ? 'rotate-45 scale-125'
                    : 'rotate-0'
                }`}
                style={{
                  backgroundColor: activeSection === section.name ? GOLD : 'rgba(255,255,255,0.25)',
                  boxShadow: activeSection === section.name ? `0 0 20px ${GOLD}40` : 'none',
                }}
              />
            </motion.button>
            {i < 3 && <div className='h-8 w-px bg-white/10' />}
          </React.Fragment>
        ))}
      </motion.div>

      <div className='max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10 pt-24 pb-20'>

        {/* ═══════════════════════════════════════════════════════════════════
            HERO SECTION - Editorial Magazine Style
        ═══════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className='text-center mb-32'
        >
          {/* Decorative top element */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className='flex items-center justify-center gap-4 mb-12'
          >
            <div className='h-px w-16 bg-gradient-to-r from-transparent to-white/20' />
            <Diamond className='w-2 h-2 text-white/30' />
            <div className='h-px w-16 bg-gradient-to-l from-transparent to-white/20' />
          </motion.div>

          {/* Editorial label */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='inline-block text-[10px] tracking-[0.35em] uppercase mb-8'
            style={{ color: GOLD }}
          >
            Prestige Production
          </motion.span>

          {/* Main title - serif editorial */}
          <h1 className='font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light fade-in mb-8 tracking-tight'>
            {t('whyUs.title', 'Why Work With Us?')}
          </h1>

          {/* Elegant underline */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '120px' }}
            transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
            className='h-px mx-auto mb-10'
            style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }}
          />

          {/* Subtitle with refined typography */}
          <p className='text-lg sm:text-xl text-white/60 fade-in max-w-2xl mx-auto leading-relaxed font-light'>
            {t(
              'whyUs.subtitle',
              "Prestige Production is more than just a video company, it's a partnership built on vision, creativity, and performance.",
            )}
          </p>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════════
            TEAM DUO SECTION - Magazine Spread Layout
        ═══════════════════════════════════════════════════════════════════ */}
        <div ref={teamRef} key={duo.nameKey} className='mb-40'>
          <div className='relative max-w-5xl mx-auto'>
            {/* Frame decoration */}
            <div className='absolute -inset-4 border border-white/5 pointer-events-none' />
            <div
              className='absolute -inset-4 border pointer-events-none'
              style={{
                borderColor: `${GOLD}10`,
                transform: 'translate(8px, 8px)',
              }}
            />

            {/* Main image container */}
            <div className='team-photo-reveal relative overflow-hidden'>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className='relative'
              >
                <img
                  src={duo.image}
                  alt={t(`whyUs.team.${duo.nameKey}.name`, 'Alex & Dorian')}
                  className='w-full h-auto object-cover'
                  loading='eager'
                />
                {/* Cinematic gradient overlay */}
                <div
                  className='absolute inset-0'
                  style={{
                    background: 'linear-gradient(0deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 40%, transparent 70%)',
                  }}
                />
                {/* Side vignette */}
                <div
                  className='absolute inset-0'
                  style={{
                    background: 'linear-gradient(90deg, rgba(0,0,0,0.3) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.3) 100%)',
                  }}
                />
              </motion.div>

              {/* Caption overlay - editorial style */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className='absolute bottom-0 left-0 right-0 p-8 sm:p-12'
              >
                <div className='flex items-end justify-between'>
                  <div>
                    <span
                      className='inline-block text-[10px] tracking-[0.3em] uppercase mb-4'
                      style={{ color: GOLD }}
                    >
                      {t('whyUs.teamLabel', 'The Founders')}
                    </span>
                    <h2 className='font-serif text-4xl sm:text-5xl font-light text-white mb-2'>
                      {t(`whyUs.team.${duo.nameKey}.name`, 'Dorian & Alex')}
                    </h2>
                    <p className='text-white/50 text-sm tracking-wide'>
                      {t(
                        `whyUs.team.${duo.nameKey}.role`,
                        'Founders of Prestige Production',
                      )}
                    </p>
                  </div>
                  {/* Decorative element */}
                  <div className='hidden sm:block'>
                    <Diamond className='w-3 h-3' style={{ color: GOLD }} />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Team story - editorial column layout */}
          <div className='mt-16 max-w-3xl mx-auto'>
            <div className='grid md:grid-cols-[1fr_2px_1fr] gap-8 md:gap-12'>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <p className='text-white/70 leading-relaxed font-light'>
                  {t(
                    `whyUs.team.${duo.nameKey}.description.duoDesc1`,
                    "We're Alex and Dorian, co-founders of Prestige Production—a creative studio built on a shared passion for visual storytelling.",
                  )}
                </p>
              </motion.div>

              {/* Vertical divider */}
              <div
                className='hidden md:block self-stretch'
                style={{ background: `linear-gradient(180deg, transparent, ${GOLD}30, transparent)` }}
              />

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className='space-y-6'
              >
                {duo.descriptionKeys.slice(1).map((key, idx) => (
                  <p key={idx} className='text-white/60 text-sm leading-relaxed'>
                    {t(
                      `whyUs.team.${duo.nameKey}.description.${key}`,
                      'Description paragraph',
                    )}
                  </p>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            MEET THE TEAM HEADING
        ═══════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className='text-center mb-20'
        >
          <span
            className='inline-block text-[10px] tracking-[0.3em] uppercase mb-6'
            style={{ color: GOLD }}
          >
            {t('whyUs.meetThe', 'Meet The')}
          </span>
          <h2 className='font-serif text-4xl md:text-5xl lg:text-6xl font-light'>
            {t('whyUs.creativeMinus', 'Creative Minds')}
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className='h-px mx-auto mt-8'
            style={{ background: `linear-gradient(90deg, transparent, ${GOLD}50, transparent)` }}
          />
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════════
            INDIVIDUAL TEAM MEMBERS - Asymmetric Editorial Layout
        ═══════════════════════════════════════════════════════════════════ */}
        <div
          ref={individualSectionRef}
          className='mb-40 space-y-32'
        >
          {individuals.map((member, idx) => (
            <div
              key={member.nameKey}
              className={`team-individual flex flex-col ${
                idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-12 lg:gap-20 items-center`}
            >
              {/* Photo with artistic frame */}
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.5 }}
                className='w-full lg:w-2/5 relative group'
              >
                {/* Frame decorations */}
                <div
                  className='absolute -inset-3 border opacity-0 group-hover:opacity-100 transition-opacity duration-700'
                  style={{ borderColor: `${GOLD}20` }}
                />
                <div className='absolute -inset-3 border border-white/5 translate-x-2 translate-y-2' />

                <div className='aspect-[3/4] overflow-hidden relative'>
                  <img
                    src={member.image}
                    alt={t(`whyUs.team.${member.nameKey}.name`, member.nameKey)}
                    className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                  />
                  {/* Hover overlay */}
                  <div
                    className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500'
                    style={{
                      background: `linear-gradient(45deg, ${GOLD}10, transparent)`,
                    }}
                  />
                </div>

                {/* Corner accent */}
                <div
                  className='absolute -bottom-2 -right-2 w-8 h-8 border-r border-b'
                  style={{ borderColor: GOLD }}
                />
              </motion.div>

              {/* Content */}
              <div className='w-full lg:w-3/5 text-center lg:text-left'>
                {/* Name and role */}
                <div className='mb-8'>
                  <h3 className='font-serif text-3xl sm:text-4xl font-light mb-3'>
                    {t(`whyUs.team.${member.nameKey}.name`, member.nameKey)}
                  </h3>
                  <span
                    className='inline-block text-xs tracking-[0.2em] uppercase px-4 py-2'
                    style={{
                      color: GOLD,
                      border: `1px solid ${GOLD}30`,
                    }}
                  >
                    {t(`whyUs.team.${member.nameKey}.role`, 'Role')}
                  </span>
                </div>

                {/* Skills */}
                <div className='flex flex-wrap justify-center lg:justify-start gap-3 mb-8'>
                  {skills[member.nameKey]?.map((skill, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(201, 169, 97, 0.15)' }}
                      onClick={() =>
                        setActiveSkill(
                          activeSkill === `${member.nameKey}-${i}`
                            ? null
                            : `${member.nameKey}-${i}`,
                        )
                      }
                      className='cursor-pointer text-xs px-4 py-2 transition-all duration-300 border border-white/10 text-white/60 hover:text-white/90'
                      style={{
                        backgroundColor: activeSkill === `${member.nameKey}-${i}`
                          ? `${GOLD}20`
                          : 'transparent',
                        borderColor: activeSkill === `${member.nameKey}-${i}`
                          ? `${GOLD}40`
                          : 'rgba(255,255,255,0.1)',
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                {/* Description */}
                <div className='space-y-4'>
                  {member.descriptionKeys.map((key, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.15 * i, duration: 0.6 }}
                      viewport={{ once: true }}
                      className='text-white/60 text-sm leading-relaxed'
                    >
                      {t(
                        `whyUs.team.${member.nameKey}.description.${key}`,
                        'Description paragraph',
                      )}
                    </motion.p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            OUR APPROACH SECTION - Refined Tab Interface
        ═══════════════════════════════════════════════════════════════════ */}
        <div ref={approachSectionRef} className='mb-40'>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className='text-center mb-16'
          >
            <span
              className='inline-block text-[10px] tracking-[0.3em] uppercase mb-6'
              style={{ color: GOLD }}
            >
              {t('whyUs.approach.title', 'Our Process')}
            </span>
            <h2 className='font-serif text-4xl md:text-5xl lg:text-6xl font-light'>
              {t('whyUs.approach.highlight', 'The Approach')}
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '80px' }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
              className='h-px mx-auto mt-8'
              style={{ background: `linear-gradient(90deg, transparent, ${GOLD}50, transparent)` }}
            />
          </motion.div>

          {/* Approach container with border */}
          <div
            className='relative p-8 md:p-12 lg:p-16'
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%)',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            {/* Corner accents */}
            <div className='absolute top-0 left-0 w-12 h-12 border-t border-l' style={{ borderColor: `${GOLD}30` }} />
            <div className='absolute top-0 right-0 w-12 h-12 border-t border-r' style={{ borderColor: `${GOLD}30` }} />
            <div className='absolute bottom-0 left-0 w-12 h-12 border-b border-l' style={{ borderColor: `${GOLD}30` }} />
            <div className='absolute bottom-0 right-0 w-12 h-12 border-b border-r' style={{ borderColor: `${GOLD}30` }} />

            {/* Tabs - horizontal numbers */}
            <div className='flex justify-center gap-2 sm:gap-4 mb-12'>
              {approachTabs.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className='relative px-4 sm:px-6 py-3 transition-all duration-500 group'
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Background */}
                    <div
                      className='absolute inset-0 transition-all duration-500'
                      style={{
                        background: isActive
                          ? `linear-gradient(180deg, ${GOLD}15 0%, transparent 100%)`
                          : 'transparent',
                        borderTop: isActive ? `2px solid ${GOLD}` : '2px solid transparent',
                      }}
                    />

                    <div className='relative flex items-center gap-2 sm:gap-3'>
                      <span
                        className='text-xs font-light'
                        style={{ color: isActive ? GOLD : 'rgba(255,255,255,0.3)' }}
                      >
                        {tab.num}
                      </span>
                      <Icon
                        className='w-4 h-4 hidden sm:block'
                        style={{ color: isActive ? GOLD : 'rgba(255,255,255,0.4)' }}
                      />
                      <span
                        className='text-sm tracking-wide capitalize transition-colors duration-300'
                        style={{ color: isActive ? 'white' : 'rgba(255,255,255,0.5)' }}
                      >
                        {t(
                          `whyUs.approach.${tab.id}.tab`,
                          tab.id.charAt(0).toUpperCase() + tab.id.slice(1),
                        )}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className='grid lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
              {/* Text content */}
              <div className='order-2 lg:order-1'>
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className='font-serif text-2xl sm:text-3xl font-light mb-6'>
                      {t(
                        `whyUs.approach.${activeTab}.title`,
                        `Our ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`,
                      )}
                    </h3>
                    <p className='text-white/60 leading-relaxed mb-8'>
                      {t(
                        `whyUs.approach.${activeTab}.description`,
                        getApproachDescription(activeTab),
                      )}
                    </p>
                    <ul className='space-y-4'>
                      {[1, 2, 3].map(i => (
                        <motion.li
                          key={i}
                          className='flex items-start gap-4'
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <div
                            className='flex-shrink-0 w-5 h-5 flex items-center justify-center mt-0.5'
                            style={{ color: GOLD }}
                          >
                            <CheckIcon className='w-4 h-4' />
                          </div>
                          <span className='text-white/70 text-sm'>
                            {t(
                              `whyUs.approach.${activeTab}.point${i}`,
                              getApproachPointText(activeTab, i),
                            )}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Visual element */}
              <div className='order-1 lg:order-2'>
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className='relative aspect-square max-w-md mx-auto'
                >
                  {/* Decorative circles */}
                  <div
                    className='absolute inset-0 rounded-full border opacity-20'
                    style={{ borderColor: GOLD }}
                  />
                  <div
                    className='absolute inset-8 rounded-full border opacity-10'
                    style={{ borderColor: GOLD }}
                  />
                  <div
                    className='absolute inset-16 rounded-full border opacity-5'
                    style={{ borderColor: GOLD }}
                  />

                  {/* Center icon */}
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <motion.div
                      key={activeTab}
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className='w-24 h-24'
                      style={{ color: `${GOLD}60` }}
                    >
                      {React.createElement(
                        approachTabs.find(t => t.id === activeTab)?.icon,
                      )}
                    </motion.div>
                  </div>

                  {/* Animated rotating element */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    className='absolute inset-0'
                  >
                    <Diamond
                      className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2'
                      style={{ color: GOLD }}
                    />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            CTA SECTION - Premium Editorial Style
        ═══════════════════════════════════════════════════════════════════ */}
        <motion.div
          ref={ctaSectionRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className='relative py-24 px-8 text-center'
        >
          {/* Background gradient */}
          <div
            className='absolute inset-0'
            style={{
              background: `radial-gradient(ellipse at center, ${GOLD}08 0%, transparent 70%)`,
            }}
          />

          {/* Border frame */}
          <div className='absolute inset-0 border border-white/5' />
          <div className='absolute top-4 left-4 right-4 bottom-4 border' style={{ borderColor: `${GOLD}10` }} />

          <div className='relative z-10'>
            {/* Decorative element */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className='flex items-center justify-center gap-4 mb-10'
            >
              <div className='h-px w-12' style={{ background: `linear-gradient(90deg, transparent, ${GOLD}40)` }} />
              <Diamond className='w-2 h-2' style={{ color: GOLD }} />
              <div className='h-px w-12' style={{ background: `linear-gradient(270deg, transparent, ${GOLD}40)` }} />
            </motion.div>

            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className='inline-block text-[10px] tracking-[0.35em] uppercase mb-8'
              style={{ color: GOLD }}
            >
              {t('whyUs.ctaSection.label', 'Take the next step')}
            </motion.span>

            <h2 className='font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6'>
              {t('whyUs.ctaSection.title', 'Ready to create something')}{' '}
              <span style={{ color: GOLD }}>
                {t('whyUs.ctaSection.highlight', 'exceptional?')}
              </span>
            </h2>

            <p className='text-white/50 text-lg max-w-2xl mx-auto mb-12 font-light'>
              {t(
                'whyUs.ctaSection.description',
                'Let our creative team transform your vision into impactful visual content that resonates with your audience.',
              )}
            </p>

            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row gap-6 justify-center'>
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={`/${currentLang}/contact`}
                  className='inline-flex items-center gap-3 px-10 py-4 text-black font-medium tracking-wide transition-all duration-300'
                  style={{
                    background: `linear-gradient(135deg, ${GOLD_LIGHT} 0%, ${GOLD} 100%)`,
                  }}
                >
                  <span>{t('whyUs.cta', "Let's work together")}</span>
                  <span className='text-lg'>→</span>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={`/${currentLang}/portfolio`}
                  className='inline-flex items-center gap-3 px-10 py-4 font-light tracking-wide border transition-all duration-300 text-white/80 hover:text-white'
                  style={{ borderColor: `${GOLD}40` }}
                >
                  <span>
                    {t('whyUs.ctaSection.portfolioCta', 'View Our Work')}
                  </span>
                  <span className='text-lg'>→</span>
                </Link>
              </motion.div>
            </div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className='flex flex-wrap justify-center gap-x-12 gap-y-4 mt-16 text-white/40 text-xs tracking-wide'
            >
              {[
                t('whyUs.ctaSection.trustIndicators.quality', 'Premium quality'),
                t('whyUs.ctaSection.trustIndicators.timelines', 'Reliable timelines'),
                t('whyUs.ctaSection.trustIndicators.satisfaction', 'Satisfaction guaranteed'),
              ].map((text, i) => (
                <div key={i} className='flex items-center gap-2'>
                  <Diamond className='w-1.5 h-1.5' style={{ color: GOLD }} />
                  <span>{text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Back to top button */}
      <motion.button
        onClick={() => {
          gsap.to(window, {
            duration: 0.8,
            scrollTo: 0,
            ease: 'power2.inOut',
          });
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className='fixed bottom-8 right-8 w-12 h-12 flex items-center justify-center z-40 transition-all duration-300 group'
        style={{
          border: `1px solid ${GOLD}30`,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(8px)',
        }}
        whileHover={{
          y: -4,
          borderColor: GOLD,
          boxShadow: `0 8px 24px ${GOLD}20`,
        }}
        whileTap={{ scale: 0.95 }}
      >
        <span
          className='transform -rotate-90 text-sm transition-colors duration-300'
          style={{ color: GOLD }}
        >
          →
        </span>
      </motion.button>
      </section>
    </>
  );
};

export default WhyUs;
