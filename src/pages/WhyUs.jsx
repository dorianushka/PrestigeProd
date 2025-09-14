import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GRADIENT_CLASS } from '../constants';

// Register ScrollTrigger and ScrollToPlugin plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// --- Icon Components ---
const IconWrapper = ({ children, className }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.5'
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

  // Team member skills to showcase expertise
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

  // Helper function to get the appropriate approach point text
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

  // Helper function to get the appropriate approach description text
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

  // Approach tabs data
  const approachTabs = [
    { id: 'vision', icon: VisionIcon },
    { id: 'creativity', icon: CreativityIcon },
    { id: 'execution', icon: ExecutionIcon },
    { id: 'results', icon: ResultsIcon },
  ];

  useEffect(() => {
    document.title = t('whyUs.pageTitle', 'Why Us | Prestige Production');
  }, [t]);

  // Function to smoothly scroll to sections
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
    // Initial fade in animations
    gsap.from('.fade-in', {
      opacity: 0,
      y: 20,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out',
    });

    // Team photo reveal animation
    gsap.fromTo(
      '.team-photo-reveal',
      { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
      {
        scrollTrigger: {
          trigger: teamRef.current,
          start: 'top 80%',
        },
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 1.2,
        ease: 'power3.out',
      },
    );

    // Individual team members staggered entrance
    gsap.from('.team-individual', {
      scrollTrigger: {
        trigger: individualSectionRef.current,
        start: 'top 70%',
      },
      y: 50,
      opacity: 0,
      stagger: 0.3,
      duration: 0.8,
      ease: 'back.out(1.7)',
    });

    // Approach section tab animations
    /* gsap.from('.approach-tab', {
      scrollTrigger: {
        trigger: approachSectionRef.current,
        start: 'top 75%',
      },
      opacity: 0,
      x: -30,
      stagger: 0.15,
      duration: 0.6,
      ease: 'power2.out',
    }); */

    // We removed testimonial cards GSAP animation to avoid conflicts with Framer Motion

    // Set up ScrollTrigger for navigation dots
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

  // Team member data
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
    <section
      ref={sectionRef}
      className='relative w-full min-h-screen bg-gradient-to-b from-black via-gray-900/20 to-black text-white pt-20 overflow-hidden'
    >
      {/* Quick navigation menu */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className='fixed left-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col gap-6'
      >
        <div className='flex flex-col items-center gap-1'>
          <motion.button
            onClick={() => scrollToSection(teamRef)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === 'team'
                ? 'bg-[#2d5f59] shadow-lg shadow-[#2d5f59]/50'
                : 'bg-white/40 hover:bg-[#2d5f59]/80'
            }`}
            whileHover={{ scale: 1.5 }}
            aria-label='Go to Team section'
          />
          <div className='h-10 w-px bg-white/20'></div>
          <motion.button
            onClick={() => scrollToSection(individualSectionRef)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === 'individuals'
                ? 'bg-[#2d5f59] shadow-lg shadow-[#2d5f59]/50'
                : 'bg-white/40 hover:bg-[#2d5f59]/80'
            }`}
            whileHover={{ scale: 1.5 }}
            aria-label='Go to Team Members section'
          />
          <div className='h-10 w-px bg-white/20'></div>
          <motion.button
            onClick={() => scrollToSection(approachSectionRef)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === 'approach'
                ? 'bg-[#2d5f59] shadow-lg shadow-[#2d5f59]/50'
                : 'bg-white/40 hover:bg-[#2d5f59]/80'
            }`}
            whileHover={{ scale: 1.5 }}
            aria-label='Go to Approach section'
          />
          <div className='h-10 w-px bg-white/20'></div>
          <motion.button
            onClick={() => scrollToSection(ctaSectionRef)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === 'cta'
                ? 'bg-[#2d5f59] shadow-lg shadow-[#2d5f59]/50'
                : 'bg-white/40 hover:bg-[#2d5f59]/80'
            }`}
            whileHover={{ scale: 1.5 }}
            aria-label='Go to CTA section'
          />
        </div>
      </motion.div>

      <div className='max-w-6xl mx-auto px-6 sm:px-10 relative z-10'>
        {/* Headline with animated gradient */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='text-center'
        >
          {/* Title heading */}
          <h1 className='text-5xl md:text-7xl font-light fade-in mb-8 text-center relative'>
            {t('whyUs.title', 'Why Work With Us?')}
            <div className='absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-0.5 w-32 bg-gradient-to-r from-transparent via-[#2d5f59] to-transparent'></div>
          </h1>

          <p className='text-xl text-center text-white/70 fade-in mb-6 max-w-3xl mx-auto leading-relaxed'>
            {t(
              'whyUs.subtitle',
              "Prestige Production is more than just a video company, it's a partnership built on vision, creativity, and performance.",
            )}
          </p>

          {/* Abstract decorative symbol */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 100, delay: 0.5 }}
            className='w-12 h-12 mx-auto mb-16'
          >
            <div className='relative w-full h-full'>
              <div className='absolute inset-0 bg-gradient-to-r from-[#2d5f59] to-[#F4FF78] rounded-full opacity-20 animate-pulse'></div>
              <div className='absolute inset-1 bg-black rounded-full flex items-center justify-center'>
                <span className='text-white/70 text-xl'>✦</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Duo Photo with enhanced presentation */}
        <div ref={teamRef} key={duo.nameKey} className='mb-32'>
          <div className='rounded-2xl mb-12 shadow-xl overflow-hidden max-w-4xl mx-auto relative'>
            {/* Photo reveal animation container */}
            <div className='team-photo-reveal'>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className='relative'
              >
                <img
                  src={duo.image}
                  alt={t(`whyUs.team.${duo.nameKey}.name`, 'Alex & Dorian')}
                  className='w-full h-auto object-cover'
                  loading='eager'
                />
                {/* Gradient overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70'></div>
              </motion.div>
            </div>

            {/* Caption overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className='absolute bottom-0 left-0 right-0 p-8 text-left'
            >
              <span className='px-3 py-1 text-xs rounded-full bg-white/20 backdrop-blur-sm text-white/90 mb-4 inline-block'>
                {t('whyUs.teamLabel', 'Our team')}
              </span>
              <h2 className='text-3xl sm:text-4xl font-medium mb-1 text-white'>
                {t(`whyUs.team.${duo.nameKey}.name`, 'Dorian & Alex')}
              </h2>
              <p className='text-white/80 text-sm mb-2 font-light'>
                {t(
                  `whyUs.team.${duo.nameKey}.role`,
                  'Founders of Prestige Production',
                )}
              </p>
            </motion.div>
          </div>

          {/* Team story */}
          <div className='text-white/80 text-md space-y-5 max-w-3xl mx-auto px-4'>
            {duo.descriptionKeys.map((key, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx, duration: 0.6 }}
                viewport={{ once: true }}
                className={idx === 0 ? 'text-lg' : ''}
              >
                {t(
                  `whyUs.team.${duo.nameKey}.description.${key}`,
                  "We're Alex and Dorian, co-founders of Prestige Production—a creative studio built on a shared passion for visual storytelling.",
                )}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Meet The Team Heading */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-3xl md:text-5xl font-light mb-4'>
            <span>{t('whyUs.meetThe', 'Meet The ')} </span>
            <span className={`${GRADIENT_CLASS} bg-clip-text text-transparent`}>
              {t('whyUs.creativeMinus', 'Creative Minds')}
            </span>
          </h2>
          <div className='w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#2d5f59]/50 to-transparent'></div>
        </motion.div>

        {/* Individuals with enhanced presentation */}
        <div
          ref={individualSectionRef}
          className='grid md:grid-cols-2 gap-x-16 gap-y-20 items-start mb-32'
        >
          {individuals.map((member, idx) => (
            <div key={member.nameKey} className='team-individual'>
              <div className='flex flex-col md:flex-row gap-8 items-center md:items-start'>
                {/* Photo with hover effect */}
                <motion.div
                  whileHover={{
                    y: -5,
                    boxShadow: '0 25px 50px -12px rgba(45, 95, 89, 0.25)',
                  }}
                  transition={{ duration: 0.3 }}
                  className={`w-3/4 sm:w-1/2 md:w-2/5 mx-auto md:mx-0 aspect-[3/4] rounded-xl overflow-hidden shadow-lg ${
                    member.nameKey === 'dorian'
                      ? 'bg-gradient-to-br from-[#2d5f59]/40 to-black/20'
                      : 'bg-gradient-to-br from-[#2d5f59]/40 to-black/20'
                  }`}
                >
                  <img
                    src={member.image}
                    alt={t(`whyUs.team.${member.nameKey}.name`, member.nameKey)}
                    className='w-full h-full object-cover hover:scale-105 transition duration-700'
                  />
                </motion.div>

                {/* Content with enhanced presentation */}
                <div className='w-full md:w-3/5 text-center md:text-left'>
                  <h3 className='text-2xl font-medium mb-2'>
                    {t(`whyUs.team.${member.nameKey}.name`, member.nameKey)}
                  </h3>
                  <p
                    className={`inline-block px-3 py-1 rounded-full text-white text-xs mb-5 ${
                      member.nameKey === 'dorian' || member.nameKey === 'alex'
                        ? 'bg-[#2d5f59]/40'
                        : 'bg-[#2d5f59]/40'
                    }`}
                  >
                    {t(`whyUs.team.${member.nameKey}.role`, 'Role')}
                  </p>

                  {/* Expertise areas with interactive pills */}
                  <div className='flex flex-wrap justify-center md:justify-start gap-2 mb-5'>
                    {skills[member.nameKey]?.map((skill, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        onClick={() =>
                          setActiveSkill(
                            activeSkill === `${member.nameKey}-${i}`
                              ? null
                              : `${member.nameKey}-${i}`,
                          )
                        }
                        className={`cursor-pointer text-xs px-3 py-1 rounded-full transition-colors duration-300 ${
                          activeSkill === `${member.nameKey}-${i}`
                            ? 'bg-[#2d5f59] text-white'
                            : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }`}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>

                  {/* Description with enhanced typography */}
                  <div className='text-white/70 space-y-4'>
                    {member.descriptionKeys.map((key, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 * i, duration: 0.5 }}
                        viewport={{ once: true }}
                        className='text-sm leading-relaxed text-center md:text-left'
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
            </div>
          ))}
        </div>

        {/* Our Approach Section */}
        <div ref={approachSectionRef} className='mb-32'>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='text-center mb-6 md:mb-10'
          >
            <h2 className='text-3xl md:text-5xl font-light mb-4'>
              <span>{t('whyUs.approach.title', 'Our ')} </span>
              <span
                className={`${GRADIENT_CLASS} bg-clip-text text-transparent`}
              >
                {t('whyUs.approach.highlight', 'Approach')}
              </span>
            </h2>
            <div className='w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#2d5f59]/50 to-transparent'></div>
          </motion.div>

          <div className='bg-gradient-to-b from-pp-charcoal/20 to-black/10 rounded-2xl p-4 md:p-8 shadow-xl backdrop-blur-sm border border-pp-grey/10'>
            {/* Approach Tabs */}
            <div className='flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12'>
              {approachTabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`approach-tab flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
                      activeTab === tab.id
                        ? 'bg-pp-teal text-white shadow-lg shadow-pp-teal/20'
                        : 'bg-pp-charcoal/60 text-pp-ice/80 border border-pp-grey/20 hover:bg-pp-grey/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className='w-4 h-4' />
                    <span className=''>
                      {t(
                        `whyUs.approach.${tab.id}.tab`,
                        tab.id.charAt(0).toUpperCase() + tab.id.slice(1),
                      )}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Tab Content with illustrations */}
            <div className='grid md:grid-cols-5 gap-8 md:gap-12 items-center'>
              <div className='md:col-span-3 order-2 md:order-1'>
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className='text-2xl md:text-3xl mb-4 font-light'>
                      {t(
                        `whyUs.approach.${activeTab}.title`,
                        `Our ${
                          activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
                        }`,
                      )}
                    </h3>
                    <p className='text-white/70 text-md mb-6 leading-relaxed'>
                      {t(
                        `whyUs.approach.${activeTab}.description`,
                        getApproachDescription(activeTab),
                      )}
                    </p>
                    <ul className='space-y-4'>
                      {[1, 2, 3].map(i => (
                        <motion.li
                          key={i}
                          className='flex items-center gap-4'
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <div
                            className={`flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-pp-teal/20 text-pp-teal`}
                          >
                            <CheckIcon className='w-3 h-3' />
                          </div>
                          <span className='text-white/80'>
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

              <div className='md:col-span-2 order-1 md:order-2 relative'>
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className='relative'
                >
                  <div className='aspect-square w-full rounded-2xl flex items-center justify-center bg-gradient-to-b from-pp-charcoal/20 to-black/10 border border-pp-grey/10'>
                    <motion.div
                      key={activeTab}
                      initial={{ scale: 0.5, opacity: 0, rotate: -30 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className='w-3/5 h-3/5 text-pp-teal/50'
                    >
                      {React.createElement(
                        approachTabs.find(t => t.id === activeTab)?.icon,
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <motion.div
          ref={ctaSectionRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='py-20 px-6 rounded-3xl relative overflow-hidden mt-16 mb-10 text-center bg-black/30 border border-[#2d5f59]/20 shadow-xl'
        >
          {/* Background elements */}
          <div className='absolute inset-0 bg-gradient-to-b from-[#2d5f59]/10 to-black/20 z-0'></div>

          {/* Content wrapper */}
          <div className='relative z-10'>
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className='inline-block px-6 py-2 rounded-full bg-pp-teal/20 text-pp-ice/90 text-sm font-medium mb-8 border border-pp-teal/30'
            >
              {t('whyUs.ctaSection.label', 'Take the next step')}
            </motion.span>

            <h2 className='text-3xl md:text-5xl font-light mb-6'>
              {t('whyUs.ctaSection.title', 'Ready to create something')}{' '}
              <span
                className={`${GRADIENT_CLASS} bg-clip-text text-transparent`}
              >
                {t('whyUs.ctaSection.highlight', 'exceptional?')}
              </span>
            </h2>

            <p className='text-white/70 text-lg max-w-2xl mx-auto mb-10'>
              {t(
                'whyUs.ctaSection.description',
                'Let our creative team transform your vision into impactful visual content that resonates with your audience.',
              )}
            </p>

            <div className='flex flex-col sm:flex-row gap-5 justify-center'>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='relative'
              >
                <Link
                  to={`/${currentLang}/contact`}
                  className={`${GRADIENT_CLASS} text-white text-xl font-medium px-10 py-4 rounded-full hover:shadow-lg hover:shadow-[#2d5f59]/30 transition-all inline-flex items-center gap-3`}
                >
                  <span>{t('whyUs.cta', "Let's work together")}</span>
                  <span className='text-xl'>→</span>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='relative'
              >
                <Link
                  to={`/${currentLang}/portfolio`}
                  className='bg-black/30 backdrop-blur-sm text-white border border-white/10 text-xl font-medium px-10 py-4 rounded-full hover:bg-black/40 transition-all inline-flex items-center gap-3'
                >
                  <span>
                    {t('whyUs.ctaSection.portfolioCta', 'View Our Work')}
                  </span>
                  <span className='text-xl'>→</span>
                </Link>
              </motion.div>
            </div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className='flex flex-wrap justify-center gap-x-10 gap-y-4 mt-16 text-white/70 text-sm'
            >
              <div className='flex items-center gap-3'>
                <span className='text-pp-teal'>✓</span>{' '}
                {t(
                  'whyUs.ctaSection.trustIndicators.quality',
                  'Premium quality',
                )}
              </div>
              <div className='flex items-center gap-3'>
                <span className='text-pp-teal'>✓</span>{' '}
                {t(
                  'whyUs.ctaSection.trustIndicators.timelines',
                  'Reliable timelines',
                )}
              </div>
              <div className='flex items-center gap-3'>
                <span className='text-pp-teal'>✓</span>{' '}
                {t(
                  'whyUs.ctaSection.trustIndicators.satisfaction',
                  'Satisfaction guaranteed',
                )}
              </div>
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className='fixed bottom-8 right-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center text-white border border-white/10 shadow-lg z-50 transition-all duration-300 hover:shadow-xl'
        whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0,0,0,0.2)' }}
        whileTap={{ scale: 0.95 }}
      >
        <span className='transform -rotate-90'>→</span>
      </motion.button>
    </section>
  );
};

export default WhyUs;
