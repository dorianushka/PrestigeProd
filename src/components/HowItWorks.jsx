import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

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
    <section className='relative overflow-hidden py-32 md:py-40' style={{ background: '#0a0a0a' }}>
      {/* Subtle background elements */}
      <div className='absolute inset-0 pointer-events-none'>
        {/* Top border */}
        <div
          className='absolute top-0 left-0 w-full h-px'
          style={{ background: 'linear-gradient(90deg, transparent, rgba(158, 182, 169, 0.1), transparent)' }}
        />

        {/* Decorative vertical line */}
        <div
          className='absolute left-1/2 top-0 w-px h-full opacity-[0.03]'
          style={{ background: 'linear-gradient(180deg, transparent, #9EB6A9, transparent)' }}
        />
      </div>

      <div className='relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20'>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-24 md:mb-32'
        >
          <span
            className='inline-block text-[11px] tracking-[0.3em] uppercase mb-6'
            style={{ color: '#9EB6A9' }}
          >
            {t('howItWorks.overline', 'Our Process')}
          </span>

          <h2 className='font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.02em] mb-6'>
            <span style={{ color: '#EAEBEC' }}>
              {t('howItWorks.titlePart1', 'Crafted with')}
            </span>
            <span className='italic' style={{ color: '#9EB6A9' }}>
              {' '}{t('howItWorks.titlePart2', 'intention')}
            </span>
          </h2>

          <p
            className='text-lg md:text-xl max-w-2xl mx-auto'
            style={{ color: 'rgba(234, 235, 236, 0.6)', fontWeight: 300 }}
          >
            {t('howItWorks.subtitle', 'Every project follows a refined process designed to deliver exceptional results.')}
          </p>
        </motion.div>

        {/* Process steps - Editorial grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8'>
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className='relative group'
            >
              {/* Connector line for desktop */}
              {index < processSteps.length - 1 && (
                <div
                  className='hidden lg:block absolute top-8 left-full w-full h-px z-0'
                  style={{ background: 'linear-gradient(90deg, rgba(158, 182, 169, 0.2), transparent)' }}
                />
              )}

              {/* Step number */}
              <div className='relative mb-8'>
                <span
                  className='font-serif text-6xl md:text-7xl leading-none tracking-[-0.03em] transition-colors duration-500 group-hover:text-[#9EB6A9]'
                  style={{ color: 'rgba(234, 235, 236, 0.1)' }}
                >
                  {step.number}
                </span>
                <div
                  className='absolute bottom-0 left-0 w-8 h-px transition-all duration-500 group-hover:w-12 group-hover:bg-[#9EB6A9]'
                  style={{ background: 'rgba(158, 182, 169, 0.3)' }}
                />
              </div>

              {/* Step content */}
              <h3
                className='font-serif text-2xl leading-tight tracking-[-0.01em] mb-4 transition-colors duration-300'
                style={{ color: '#EAEBEC' }}
              >
                {step.title}
              </h3>

              <p
                className='text-base leading-relaxed'
                style={{ color: 'rgba(234, 235, 236, 0.5)', fontWeight: 300 }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className='flex justify-center mt-24 md:mt-32'
        >
          <div
            className='w-px h-20'
            style={{ background: 'linear-gradient(180deg, rgba(158, 182, 169, 0.3), transparent)' }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
