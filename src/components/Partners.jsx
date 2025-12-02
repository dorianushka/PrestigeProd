import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// Consistent gold colors
const GOLD = '#C9A961';
const GOLD_LIGHT = '#E8D5A3';

const partners = [
  {
    name: 'Swiss Mining Institute',
    logo: `${import.meta.env.VITE_CLOUDFRONT_URL}/logos/smi_logo.png`,
    website: 'https://swissmininginstitute.ch/',
  },
  {
    name: "Zurich Sotheby's",
    logo: `${import.meta.env.VITE_CLOUDFRONT_URL}/logos/zurich_sothebys_logo.png`,
    website: 'https://www.ch-sothebysrealty.ch/en',
  },
];

const Partners = () => {
  const { t, i18n } = useTranslation();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      quote: t('partners.testimonials.smi.quote', "Prestige Production captured the essence of our conference with exceptional cinematography. Their attention to detail and professionalism made them invaluable partners for SMI."),
      author: 'Manuel Bally',
      role: t('partners.testimonials.smi.role', 'Organizer'),
      company: 'Swiss Mining Institute',
      partnerIndex: 0,
    },
    {
      id: 2,
      quote: t('partners.testimonials.sothebys.quote', "Working with Prestige Production elevated our property presentations to an entirely new level. Their cinematic approach perfectly showcases luxury real estate."),
      author: 'Soroush Efati',
      role: t('partners.testimonials.sothebys.role', 'Realtor'),
      company: "Zurich Sotheby's International Realty",
      partnerIndex: 1,
    },
  ];

  return (
    <section
      className='relative overflow-hidden py-20 md:py-28'
      style={{
        background: '#050505',
      }}
    >
      {/* Subtle top border */}
      <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent' />

      {/* Main content */}
      <div className='relative z-10 max-w-6xl mx-auto px-6 md:px-10'>

        {/* Compact header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16'
        >
          <div>
            <span className='text-[10px] tracking-[0.3em] uppercase block mb-3' style={{ color: `${GOLD}b3` }}>
              {t('partners.overline', 'Collaborations')}
            </span>
            <h2 className='font-serif text-3xl md:text-4xl tracking-[-0.02em] text-white/90'>
              {t('partners.titlePart1', 'Partners we are')}{' '}
              <span className='italic' style={{ color: GOLD }}>{t('partners.titlePart2', 'proud of')}</span>
            </h2>
          </div>

          {/* Partner logos - inline on desktop */}
          <div className='flex items-center gap-8'>
            {partners.map((partner, index) => (
              <a
                key={partner.name}
                href={partner.website}
                target='_blank'
                rel='noopener noreferrer'
                className='group'
                onMouseEnter={() => setActiveTestimonial(index)}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className='h-8 md:h-10 w-auto object-contain filter brightness-0 invert opacity-40 group-hover:opacity-80 transition-opacity duration-500'
                  loading='lazy'
                />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Testimonials - editorial quote style */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className='relative'
        >
          {/* Quote container */}
          <div className='relative border-l pl-6 md:pl-10' style={{ borderColor: `${GOLD}33` }}>
            {/* Large decorative quote mark */}
            <div className='absolute -left-2 -top-2 font-serif text-6xl md:text-8xl leading-none select-none' style={{ color: `${GOLD}1a` }}>
              "
            </div>

            <AnimatePresence mode='wait'>
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <blockquote className='font-serif text-lg md:text-xl lg:text-2xl text-white/70 leading-relaxed mb-6 max-w-3xl'>
                  {testimonials[activeTestimonial].quote}
                </blockquote>

                <div className='flex items-center gap-4'>
                  <div className='w-8 h-px' style={{ background: `${GOLD}66` }} />
                  <div>
                    <p className='text-white/90 text-sm font-medium'>
                      {testimonials[activeTestimonial].author}
                    </p>
                    <p className='text-white/40 text-xs'>
                      {testimonials[activeTestimonial].role}, {testimonials[activeTestimonial].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial navigation - larger buttons */}
            <div className='flex items-center gap-3 mt-10'>
              {testimonials.map((testimonial, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className='relative h-10 flex items-center justify-center px-4 border transition-all duration-300'
                  style={{
                    borderColor: index === activeTestimonial ? `${GOLD}80` : 'rgba(255,255,255,0.1)',
                    background: index === activeTestimonial ? `${GOLD}1a` : 'transparent',
                  }}
                  aria-label={`${t('partners.viewTestimonial', 'View testimonial from')} ${testimonial.author}`}
                >
                  <span
                    className='text-xs tracking-wide transition-colors duration-300'
                    style={{ color: index === activeTestimonial ? GOLD : 'rgba(255,255,255,0.4)' }}
                  >
                    {testimonial.author.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* New collaborations teaser - subtle, centered */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className='mt-14 md:mt-16 flex items-center justify-center gap-3'
        >
          <div className='w-1.5 h-1.5 rounded-full animate-pulse' style={{ background: `${GOLD}66` }} />
          <p className='text-white/25 text-xs tracking-wide italic'>
            {t('partners.moreComingSoon', 'New collaborations in the works')}
          </p>
        </motion.div>
      </div>

      {/* Final CTA - The only secondary CTA on the page */}
      <div className='relative py-20 md:py-28 border-t border-white/5'>
        <div className='max-w-4xl mx-auto px-6 md:px-12 lg:px-20 text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Simple, elegant headline */}
            <h3
              className='font-serif text-[clamp(1.5rem,4vw,2.5rem)] leading-[1.2] tracking-[-0.01em] mb-8'
              style={{ color: '#EAEBEC' }}
            >
              {t('partners.ctaHeadline', 'Ready to create something')}
              <span className='italic' style={{ color: GOLD }}>
                {' '}{t('partners.ctaHeadlineAccent', 'extraordinary')}
              </span>
              ?
            </h3>

            {/* Single primary CTA */}
            <Link
              to={`/${i18n.language}/contact`}
              className='group relative inline-flex items-center justify-center px-10 py-4 overflow-hidden transition-all duration-300'
              style={{
                background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})`,
                color: '#0a0a0a',
              }}
            >
              <span className='relative z-10 text-sm tracking-[0.15em] uppercase font-medium'>
                {t('partners.ctaPrimary', 'Start Your Project')}
              </span>
              <span
                className='absolute inset-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out'
                style={{ background: GOLD_LIGHT }}
              />
              <span className='relative z-10 ml-3 group-hover:translate-x-1 transition-transform duration-300'>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                </svg>
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Subtle bottom border */}
      <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent' />
    </section>
  );
};

export default Partners;
