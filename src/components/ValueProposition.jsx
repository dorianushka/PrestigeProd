import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Consistent gold colors
const GOLD = '#C9A961';
const GOLD_LIGHT = '#E8D5A3';

const ValueProposition = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.4, 0.4, 0]);

  const capabilities = [
    {
      number: '01',
      title: t('valueProposition.capability1.title', 'Cinematic Production'),
      stat: '4K+',
      statLabel: t('valueProposition.capability1.statLabel', 'Resolution'),
    },
    {
      number: '02',
      title: t('valueProposition.capability2.title', 'Brand Storytelling'),
      stat: '100%',
      statLabel: t('valueProposition.capability2.statLabel', 'Satisfaction'),
    },
    {
      number: '03',
      title: t('valueProposition.capability3.title', 'Swiss Precision'),
      stat: '48h',
      statLabel: t('valueProposition.capability3.statLabel', 'Turnaround'),
    },
  ];

  return (
    <section ref={containerRef} className='relative overflow-hidden' style={{ background: '#0a0a0a' }}>
      {/* Main block - Statement with cinematic video backdrop */}
      <div className='relative py-24 md:py-32'>
        {/* Full-bleed video background with scroll-driven animation */}
        <div className='absolute inset-0 overflow-hidden'>
          <motion.div
            style={{ scale: videoScale, opacity: videoOpacity }}
            className='absolute inset-0'
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className='w-full h-full object-cover'
              style={{ filter: 'grayscale(100%) contrast(1.2)' }}
            >
              <source src='/assets/videos/lowres_short_reel_showcase_v2_1.mp4' type='video/mp4' />
            </video>
            {/* Gold tint overlay */}
            <div
              className='absolute inset-0'
              style={{
                background: `linear-gradient(135deg, ${GOLD}15 0%, transparent 50%, ${GOLD}10 100%)`,
                mixBlendMode: 'overlay'
              }}
            />
          </motion.div>

          {/* Vignette effect */}
          <div
            className='absolute inset-0 pointer-events-none'
            style={{
              boxShadow: 'inset 0 0 200px 100px #0a0a0a',
            }}
          />
        </div>

        {/* Subtle radial accent */}
        <div
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03]'
          style={{
            background: `radial-gradient(circle, ${GOLD} 0%, transparent 60%)`,
          }}
        />

        <div className='relative z-10 max-w-4xl mx-auto px-6 md:px-12 lg:px-20 text-center'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
          >
            {/* Single impactful statement - dramatically reduced */}
            <h2
              className='font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.2] tracking-[-0.02em]'
              style={{ color: '#EAEBEC' }}
            >
              {t('valueProposition.mainStatement', 'Your brand deserves')}
              <span className='italic block mt-2' style={{ color: GOLD }}>
                {t('valueProposition.mainStatementAccent', 'nothing less than extraordinary.')}
              </span>
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Capabilities - Condensed horizontal layout with stats */}
      <div className='relative py-16 md:py-20 border-t border-white/5'>
        <div className='max-w-7xl mx-auto px-6 md:px-12 lg:px-20'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8'>
            {capabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className='group relative'
              >
                {/* Card with hover effect */}
                <div
                  className='relative p-6 md:p-8 border border-white/5 transition-all duration-500 group-hover:border-white/10'
                  style={{ background: 'rgba(255,255,255,0.01)' }}
                >
                  {/* Number accent */}
                  <span
                    className='absolute top-4 right-4 text-[10px] tracking-[0.2em]'
                    style={{ color: `${GOLD}50` }}
                  >
                    {capability.number}
                  </span>

                  {/* Stat - big visual anchor */}
                  <div
                    className='font-serif text-4xl md:text-5xl lg:text-6xl leading-none tracking-[-0.03em] mb-3 transition-colors duration-300'
                    style={{ color: 'rgba(234, 235, 236, 0.1)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = `${GOLD}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(234, 235, 236, 0.1)';
                    }}
                  >
                    {capability.stat}
                  </div>

                  {/* Title */}
                  <h4
                    className='font-serif text-lg md:text-xl leading-tight tracking-[-0.01em] mb-1'
                    style={{ color: '#EAEBEC' }}
                  >
                    {capability.title}
                  </h4>

                  {/* Stat label */}
                  <p
                    className='text-xs tracking-wider uppercase'
                    style={{ color: `${GOLD}80` }}
                  >
                    {capability.statLabel}
                  </p>

                  {/* Hover line accent */}
                  <div
                    className='absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700'
                    style={{ background: `linear-gradient(90deg, ${GOLD}60, transparent)` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Client logos - simplified, no redundant text */}
      <div className='relative py-12 md:py-16 border-t border-white/5'>
        <div className='max-w-7xl mx-auto px-6 md:px-12 lg:px-20'>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12'
          >
            <span
              className='text-[10px] tracking-[0.3em] uppercase'
              style={{ color: `${GOLD}60` }}
            >
              {t('valueProposition.trustedByOverline', 'Trusted By')}
            </span>

            <div className='flex items-center gap-8 md:gap-12'>
              <img
                src='/assets/logos/zurich_sothebys_logo.png'
                alt="Zurich Sotheby's"
                className='h-6 md:h-8 opacity-40 hover:opacity-70 transition-opacity duration-300 filter brightness-0 invert'
                loading='lazy'
              />
              <div className='w-px h-6 bg-white/10' />
              <img
                src='/assets/logos/smi_logo.png'
                alt='Swiss Mining Institute'
                className='h-6 md:h-8 opacity-40 hover:opacity-70 transition-opacity duration-300 filter brightness-0 invert'
                loading='lazy'
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
