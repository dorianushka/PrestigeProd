import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Consistent gold colors
const GOLD = '#C9A961';
const GOLD_LIGHT = '#E8D5A3';

const HowItWorks = () => {
  const { t } = useTranslation();

  const processSteps = [
    {
      number: '01',
      title: t('howItWorks.step1.title', 'Discovery'),
      description: t('howItWorks.step1.desc', 'We begin with a deep dive into your brand, understanding your vision, audience, and objectives.'),
    },
    {
      number: '02',
      title: t('howItWorks.step2.title', 'Concept'),
      description: t('howItWorks.step2.desc', 'Our creative team develops a tailored visual strategy that aligns with your brand identity.'),
    },
    {
      number: '03',
      title: t('howItWorks.step3.title', 'Production'),
      description: t('howItWorks.step3.desc', 'Using cinema-grade equipment, we capture your story with meticulous attention to detail.'),
    },
    {
      number: '04',
      title: t('howItWorks.step4.title', 'Delivery'),
      description: t('howItWorks.step4.desc', 'Polished, refined content delivered on time and ready to elevate your brand presence.'),
    },
  ];

  return (
    <section className='relative overflow-hidden py-24 md:py-32' style={{ background: '#0a0a0a' }}>
      {/* Subtle background elements */}
      <div className='absolute inset-0 pointer-events-none'>
        {/* Top border */}
        <div
          className='absolute top-0 left-0 w-full h-px'
          style={{ background: `linear-gradient(90deg, transparent, ${GOLD}1a, transparent)` }}
        />

        {/* Decorative vertical line */}
        <div
          className='absolute left-1/2 top-0 w-px h-full opacity-[0.03]'
          style={{ background: `linear-gradient(180deg, transparent, ${GOLD}, transparent)` }}
        />
      </div>

      <div className='relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20'>
        {/* Section header - tighter spacing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-16 md:mb-20'
        >
          <span
            className='inline-block text-[11px] tracking-[0.3em] uppercase mb-5'
            style={{ color: GOLD }}
          >
            {t('howItWorks.overline', 'Our Process')}
          </span>

          <h2 className='font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.02em] mb-4'>
            <span style={{ color: '#EAEBEC' }}>
              {t('howItWorks.titlePart1', 'Crafted with')}
            </span>
            <span className='italic' style={{ color: GOLD }}>
              {' '}{t('howItWorks.titlePart2', 'intention')}
            </span>
          </h2>

          <p
            className='text-base md:text-lg max-w-2xl mx-auto'
            style={{ color: 'rgba(234, 235, 236, 0.6)', fontWeight: 300 }}
          >
            {t('howItWorks.subtitle', 'Every project follows a refined process designed to deliver exceptional results.')}
          </p>
        </motion.div>

        {/* Process steps - Tighter grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6'>
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className='relative group'
            >
              {/* Step number with integrated line */}
              <div className='relative mb-5'>
                {/* Number */}
                <span
                  className='font-serif text-5xl md:text-6xl leading-none tracking-[-0.03em] transition-colors duration-500'
                  style={{ color: 'rgba(234, 235, 236, 0.08)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = GOLD}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(234, 235, 236, 0.08)'}
                >
                  {step.number}
                </span>

                {/* Connector line - positioned below the number */}
                {index < processSteps.length - 1 && (
                  <div
                    className='hidden lg:block absolute -bottom-2 left-0 right-0 h-px'
                    style={{
                      background: `linear-gradient(90deg, ${GOLD}40 0%, ${GOLD}14 50%, transparent 100%)`,
                      marginRight: '-24px'
                    }}
                  />
                )}

                {/* Small accent line under number */}
                <div
                  className='absolute -bottom-2 left-0 w-6 h-px transition-all duration-500 group-hover:w-10'
                  style={{ background: `${GOLD}66` }}
                />
              </div>

              {/* Step content - tighter spacing */}
              <h3
                className='font-serif text-xl md:text-2xl leading-tight tracking-[-0.01em] mb-2.5 transition-colors duration-300'
                style={{ color: '#EAEBEC' }}
              >
                {step.title}
              </h3>

              <p
                className='text-sm md:text-base leading-relaxed'
                style={{ color: 'rgba(234, 235, 236, 0.45)', fontWeight: 300 }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom decorative element - smaller */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className='flex justify-center mt-16 md:mt-20'
        >
          <div
            className='w-px h-12'
            style={{ background: `linear-gradient(180deg, ${GOLD}40, transparent)` }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
