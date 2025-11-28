import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ValueProposition = () => {
  const { t, i18n } = useTranslation();

  const capabilities = [
    {
      number: '01',
      title: t('valueProposition.capability1.title', 'Cinematic Production'),
      description: t('valueProposition.capability1.desc', 'Cinema-grade 4K+ equipment and techniques that transform ordinary moments into extraordinary visual narratives.'),
    },
    {
      number: '02',
      title: t('valueProposition.capability2.title', 'Brand Storytelling'),
      description: t('valueProposition.capability2.desc', 'Strategic visual content that positions your brand as the premium choice, differentiating you in competitive markets.'),
    },
    {
      number: '03',
      title: t('valueProposition.capability3.title', 'Swiss Precision'),
      description: t('valueProposition.capability3.desc', 'Meticulous attention to detail, reliable timelines, and seamless collaboration from concept to final delivery.'),
    },
  ];

  return (
    <section className='relative overflow-hidden' style={{ background: '#0a0a0a' }}>
      {/* First block - Centered statement */}
      <div className='relative py-32 md:py-48'>
        {/* Subtle background accent */}
        <div
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03]'
          style={{
            background: 'radial-gradient(circle, #9EB6A9 0%, transparent 70%)',
          }}
        />

        <div className='relative z-10 max-w-5xl mx-auto px-6 md:px-12 lg:px-20 text-center'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
          >
            {/* Overline */}
            <span
              className='inline-block text-[11px] tracking-[0.3em] uppercase mb-8'
              style={{ color: '#9EB6A9' }}
            >
              {t('valueProposition.overline', 'Our Philosophy')}
            </span>

            {/* Main statement */}
            <h2
              className='font-serif text-[clamp(1.8rem,4vw,3rem)] leading-[1.3] tracking-[-0.01em] mb-8'
              style={{ color: '#EAEBEC' }}
            >
              {t('valueProposition.mainStatement', 'We believe that exceptional visuals are not merely produced—they are crafted with intention, refined with precision, and delivered with the understanding that your brand deserves nothing less than extraordinary.')}
            </h2>

            {/* Divider */}
            <div
              className='w-16 h-px mx-auto'
              style={{ background: 'linear-gradient(90deg, transparent, #9EB6A9, transparent)' }}
            />
          </motion.div>
        </div>
      </div>

      {/* Second block - Capabilities */}
      <div className='relative py-24 md:py-32 border-t border-white/5'>
        <div className='max-w-7xl mx-auto px-6 md:px-12 lg:px-20'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20'>
            {/* Left column - Section header */}
            <div className='lg:col-span-4'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='lg:sticky lg:top-32'
              >
                <span
                  className='inline-block text-[11px] tracking-[0.3em] uppercase mb-6'
                  style={{ color: '#9EB6A9' }}
                >
                  {t('valueProposition.capabilitiesOverline', 'What We Offer')}
                </span>
                <h3
                  className='font-serif text-[clamp(2rem,4vw,2.5rem)] leading-[1.15] tracking-[-0.02em] mb-6'
                  style={{ color: '#EAEBEC' }}
                >
                  {t('valueProposition.capabilitiesTitle', 'Capabilities')}
                </h3>
                <div
                  className='w-12 h-px'
                  style={{ background: 'linear-gradient(90deg, #9EB6A9, transparent)' }}
                />
              </motion.div>
            </div>

            {/* Right column - Capabilities list */}
            <div className='lg:col-span-8'>
              <div className='space-y-16 md:space-y-20'>
                {capabilities.map((capability, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className='group'
                  >
                    <div className='flex gap-6 md:gap-10'>
                      {/* Number */}
                      <span
                        className='text-sm font-light tracking-wider pt-1'
                        style={{ color: 'rgba(158, 182, 169, 0.5)' }}
                      >
                        {capability.number}
                      </span>

                      {/* Content */}
                      <div className='flex-1'>
                        <h4
                          className='font-serif text-2xl md:text-3xl leading-tight tracking-[-0.01em] mb-4 transition-colors duration-300 group-hover:text-[#9EB6A9]'
                          style={{ color: '#EAEBEC' }}
                        >
                          {capability.title}
                        </h4>
                        <p
                          className='text-lg leading-relaxed max-w-xl'
                          style={{ color: 'rgba(234, 235, 236, 0.6)', fontWeight: 300 }}
                        >
                          {capability.description}
                        </p>
                      </div>
                    </div>

                    {/* Separator */}
                    {index < capabilities.length - 1 && (
                      <div
                        className='mt-16 md:mt-20 h-px ml-12 md:ml-16'
                        style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.05), transparent)' }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Third block - Social proof */}
      <div className='relative py-32 md:py-40 border-t border-white/5'>
        <div className='max-w-7xl mx-auto px-6 md:px-12 lg:px-20'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center'>
            {/* Left - Big number */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className='text-center lg:text-left'
            >
              <div
                className='font-serif text-[clamp(6rem,15vw,12rem)] leading-none tracking-[-0.03em]'
                style={{
                  background: 'linear-gradient(135deg, #9EB6A9 0%, #205C57 50%, #9EB6A9 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                100%
              </div>
              <p
                className='text-lg md:text-xl mt-4'
                style={{ color: 'rgba(234, 235, 236, 0.7)', fontWeight: 300 }}
              >
                {t('valueProposition.satisfactionLabel', 'Client satisfaction rate')}
              </p>
            </motion.div>

            {/* Right - Testimonial style content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span
                className='inline-block text-[11px] tracking-[0.3em] uppercase mb-8'
                style={{ color: '#9EB6A9' }}
              >
                {t('valueProposition.trustedByOverline', 'Trusted By')}
              </span>

              <p
                className='font-serif text-2xl md:text-3xl leading-relaxed mb-10'
                style={{ color: '#EAEBEC' }}
              >
                {t('valueProposition.trustedByStatement', 'From prestigious real estate agencies to leading industry conferences, our clients choose us for our unwavering commitment to quality and our ability to elevate their visual presence.')}
              </p>

              {/* Client logos */}
              <div className='flex items-center gap-10'>
                <img
                  src='/assets/logos/zurich_sothebys_logo.png'
                  alt="Zurich Sotheby's"
                  className='h-8 md:h-10 opacity-60 hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert'
                />
                <div className='w-px h-8 bg-white/10' />
                <img
                  src='/assets/logos/smi_logo.png'
                  alt='Swiss Mining Institute'
                  className='h-8 md:h-10 opacity-60 hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert'
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA block */}
      <div className='relative py-24 md:py-32 border-t border-white/5'>
        <div className='max-w-4xl mx-auto px-6 md:px-12 lg:px-20 text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3
              className='font-serif text-[clamp(1.8rem,4vw,2.5rem)] leading-[1.2] tracking-[-0.01em] mb-10'
              style={{ color: '#EAEBEC' }}
            >
              {t('valueProposition.ctaHeadline', 'Ready to elevate your brand\'s visual presence?')}
            </h3>

            <div className='flex flex-col sm:flex-row gap-5 justify-center'>
              <Link
                to={`/${i18n.language}/contact`}
                className='group relative inline-flex items-center justify-center px-10 py-5 overflow-hidden transition-all duration-300'
                style={{
                  background: '#EAEBEC',
                  color: '#0a0a0a',
                }}
              >
                <span className='relative z-10 text-sm tracking-[0.15em] uppercase font-medium'>
                  {t('valueProposition.ctaPrimary', 'Get Your Quote')}
                </span>
                <span
                  className='absolute inset-0 bg-[#9EB6A9] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out'
                />
                <span className='relative z-10 ml-3 group-hover:translate-x-1 transition-transform duration-300'>
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                  </svg>
                </span>
              </Link>

              <Link
                to={`/${i18n.language}/portfolio`}
                className='group inline-flex items-center justify-center px-10 py-5 transition-all duration-300'
                style={{
                  color: '#EAEBEC',
                  border: '1px solid rgba(234, 235, 236, 0.2)',
                }}
              >
                <span className='text-sm tracking-[0.15em] uppercase font-medium'>
                  {t('valueProposition.ctaSecondary', 'View Portfolio')}
                </span>
                <span className='ml-3 group-hover:translate-x-1 transition-transform duration-300'>
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                  </svg>
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
