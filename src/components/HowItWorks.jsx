import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Consistent gold colors
const GOLD = '#C9A961';

const HowItWorks = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const processSteps = [
    {
      number: '01',
      title: t('howItWorks.step1.title', 'Discovery'),
      hook: t('howItWorks.step1.hook', 'We listen first.'),
      detail: t('howItWorks.step1.detail', 'Your vision, your audience, your goals.'),
    },
    {
      number: '02',
      title: t('howItWorks.step2.title', 'Concept'),
      hook: t('howItWorks.step2.hook', 'Strategy meets creativity.'),
      detail: t('howItWorks.step2.detail', 'Storyboards, shot lists, visual direction.'),
    },
    {
      number: '03',
      title: t('howItWorks.step3.title', 'Production'),
      hook: t('howItWorks.step3.hook', 'Cinema-grade capture.'),
      detail: t('howItWorks.step3.detail', 'Sony cameras. DJI drones. Professional lighting.'),
    },
    {
      number: '04',
      title: t('howItWorks.step4.title', 'Delivery'),
      hook: t('howItWorks.step4.hook', 'On time. Every time.'),
      detail: t('howItWorks.step4.detail', 'Polished edits ready for any platform.'),
    },
  ];

  return (
    <section
      ref={containerRef}
      className='relative overflow-hidden py-20 md:py-28'
      style={{ background: '#050505' }}
    >
      {/* Static drone video background */}
      <motion.div
        style={{ y: backgroundY }}
        className='absolute inset-0 pointer-events-none'
      >
        <div className='absolute inset-0'>
          <video
            autoPlay
            muted
            loop
            playsInline
            className='w-full h-full object-cover'
            style={{ filter: 'grayscale(100%) brightness(0.3) contrast(1.1)' }}
          >
            <source src='/assets/videos/explore.mp4' type='video/mp4' />
          </video>
          {/* Gradient overlays */}
          <div
            className='absolute inset-0'
            style={{
              background: 'linear-gradient(to right, #050505 0%, transparent 30%, transparent 70%, #050505 100%)',
            }}
          />
          <div
            className='absolute inset-0'
            style={{
              background: 'linear-gradient(to bottom, #050505 0%, transparent 20%, transparent 80%, #050505 100%)',
            }}
          />
        </div>
      </motion.div>

      {/* Top border */}
      <div
        className='absolute top-0 left-0 w-full h-px'
        style={{ background: `linear-gradient(90deg, transparent, ${GOLD}1a, transparent)` }}
      />

      <div className='relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20'>
        {/* Compact header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='mb-12 md:mb-16'
        >
          <div className='flex items-center gap-3 mb-4'>
            <div className='w-8 h-px' style={{ background: `${GOLD}66` }} />
            <span
              className='text-[10px] tracking-[0.3em] uppercase'
              style={{ color: GOLD }}
            >
              {t('howItWorks.overline', 'Our Process')}
            </span>
          </div>
        </motion.div>

        {/* Interactive process steps - horizontal on desktop */}
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-4'>
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className='group relative cursor-pointer'
              onMouseEnter={() => setActiveStep(index)}
              onFocus={() => setActiveStep(index)}
              tabIndex={0}
            >
              {/* Step card */}
              <div
                className={`relative p-5 md:p-6 border transition-all duration-500 ${
                  activeStep === index
                    ? 'border-white/20 bg-white/[0.03]'
                    : 'border-white/5 bg-transparent'
                }`}
              >
                {/* Active indicator */}
                <div
                  className={`absolute top-0 left-0 w-full h-px transition-all duration-500 ${
                    activeStep === index ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)` }}
                />

                {/* Number */}
                <div className='flex items-baseline gap-3 mb-4'>
                  <span
                    className={`font-serif text-3xl md:text-4xl leading-none tracking-[-0.03em] transition-colors duration-500 ${
                      activeStep === index ? '' : ''
                    }`}
                    style={{ color: activeStep === index ? GOLD : 'rgba(234, 235, 236, 0.1)' }}
                  >
                    {step.number}
                  </span>
                  <span
                    className='font-serif text-lg md:text-xl tracking-[-0.01em]'
                    style={{ color: '#EAEBEC' }}
                  >
                    {step.title}
                  </span>
                </div>

                {/* Hook - the memorable line */}
                <p
                  className='text-sm md:text-base font-medium mb-2'
                  style={{ color: activeStep === index ? '#EAEBEC' : 'rgba(234, 235, 236, 0.5)' }}
                >
                  {step.hook}
                </p>

                {/* Detail - visible on active */}
                <p
                  className={`text-xs md:text-sm transition-all duration-500 ${
                    activeStep === index ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'
                  }`}
                  style={{ color: `${GOLD}99` }}
                >
                  {step.detail}
                </p>

                {/* Bottom accent */}
                <div
                  className={`absolute bottom-0 left-0 h-px transition-all duration-700 ${
                    activeStep === index ? 'w-full' : 'w-0'
                  }`}
                  style={{ background: `linear-gradient(90deg, ${GOLD}60, transparent)` }}
                />
              </div>

              {/* Connector line for desktop */}
              {index < processSteps.length - 1 && (
                <div
                  className='hidden lg:block absolute top-1/2 -right-2 w-4 h-px'
                  style={{ background: `${GOLD}20` }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Equipment callout - differentiator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className='mt-12 md:mt-16 flex items-center justify-center gap-6 md:gap-10'
        >
          <div className='flex items-center gap-2'>
            <div className='w-1.5 h-1.5 rounded-full' style={{ background: GOLD }} />
            <span className='text-[10px] tracking-[0.2em] uppercase text-white/30'>Sony A6700</span>
          </div>
          <div className='w-px h-3 bg-white/10' />
          <div className='flex items-center gap-2'>
            <div className='w-1.5 h-1.5 rounded-full' style={{ background: GOLD }} />
            <span className='text-[10px] tracking-[0.2em] uppercase text-white/30'>Sigma Lenses</span>
          </div>
          <div className='w-px h-3 bg-white/10' />
          <div className='flex items-center gap-2'>
            <div className='w-1.5 h-1.5 rounded-full' style={{ background: GOLD }} />
            <span className='text-[10px] tracking-[0.2em] uppercase text-white/30'>DJI Air 3</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
