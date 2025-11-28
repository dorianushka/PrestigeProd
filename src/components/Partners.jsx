import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const partners = [
  {
    name: 'Swiss Mining Institute',
    logo: `${import.meta.env.VITE_CLOUDFRONT_URL}/logos/smi_logo.png`,
    description: 'Leading mining conference in Europe',
    website: 'https://swissmininginstitute.ch/',
  },
  {
    name: "Zurich Sotheby's",
    logo: `${import.meta.env.VITE_CLOUDFRONT_URL}/logos/zurich_sothebys_logo.png`,
    description: 'International Realty',
    website: 'https://www.ch-sothebysrealty.ch/en',
  },
];

const Partners = () => {
  const { t } = useTranslation();

  // Duplicate partners array for seamless loop
  const marqueePartners = [...partners, ...partners, ...partners, ...partners];

  return (
    <section className='relative overflow-hidden py-32 md:py-40' style={{ background: '#0a0a0a' }}>
      {/* Subtle background */}
      <div className='absolute inset-0 pointer-events-none'>
        {/* Top border */}
        <div
          className='absolute top-0 left-0 w-full h-px'
          style={{ background: 'linear-gradient(90deg, transparent, rgba(158, 182, 169, 0.1), transparent)' }}
        />

        {/* Subtle radial accent */}
        <div
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.02]'
          style={{
            background: 'radial-gradient(circle, #9EB6A9 0%, transparent 60%)',
          }}
        />
      </div>

      <div className='relative z-10'>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-20 md:mb-28 px-6 md:px-12 lg:px-20'
        >
          <span
            className='inline-block text-[11px] tracking-[0.3em] uppercase mb-6'
            style={{ color: '#9EB6A9' }}
          >
            {t('partners.overline', 'Collaborations')}
          </span>

          <h2 className='font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.02em]'>
            <span style={{ color: '#EAEBEC' }}>
              {t('partners.titlePart1', 'Partners we are')}
            </span>
            <span className='italic' style={{ color: '#9EB6A9' }}>
              {' '}{t('partners.titlePart2', 'proud of')}
            </span>
          </h2>
        </motion.div>

        {/* Marquee container */}
        <div className='relative'>
          {/* Fade edges */}
          <div
            className='absolute left-0 top-0 w-32 md:w-48 h-full z-10 pointer-events-none'
            style={{ background: 'linear-gradient(90deg, #0a0a0a 0%, transparent 100%)' }}
          />
          <div
            className='absolute right-0 top-0 w-32 md:w-48 h-full z-10 pointer-events-none'
            style={{ background: 'linear-gradient(-90deg, #0a0a0a 0%, transparent 100%)' }}
          />

          {/* Marquee track */}
          <div className='overflow-hidden py-8'>
            <div
              className='flex items-center gap-16 md:gap-24 animate-marquee hover:[animation-play-state:paused]'
              style={{
                width: 'fit-content',
              }}
            >
              {marqueePartners.map((partner, index) => (
                <a
                  key={index}
                  href={partner.website}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex-shrink-0'
                >
                  <div
                    className='relative px-10 py-8 md:px-14 md:py-10 transition-all duration-500 group-hover:border-[#9EB6A9]/30'
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    {/* Logo */}
                    <div className='h-10 md:h-12 flex items-center justify-center mb-4'>
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className='h-full w-auto max-w-[160px] md:max-w-[180px] object-contain filter brightness-0 invert opacity-60 group-hover:opacity-100 transition-all duration-500'
                        loading='lazy'
                      />
                    </div>

                    {/* Partner info - reveals on hover */}
                    <div className='text-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300'>
                      <div
                        className='w-8 h-px mx-auto mb-3'
                        style={{ background: 'rgba(158, 182, 169, 0.4)' }}
                      />
                      <p
                        className='text-sm'
                        style={{ color: 'rgba(234, 235, 236, 0.7)', fontWeight: 300 }}
                      >
                        {partner.description}
                      </p>
                    </div>

                    {/* Hover glow */}
                    <div
                      className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'
                      style={{
                        background: 'linear-gradient(135deg, rgba(158, 182, 169, 0.05) 0%, transparent 50%)',
                      }}
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className='flex justify-center mt-16 md:mt-24 px-6'
        >
          <div className='flex flex-col items-center'>
            <div
              className='w-px h-16 mb-6'
              style={{ background: 'linear-gradient(180deg, rgba(158, 182, 169, 0.3), transparent)' }}
            />
            <span
              className='text-[10px] tracking-[0.3em] uppercase'
              style={{ color: 'rgba(158, 182, 169, 0.4)' }}
            >
              {t('partners.moreComingSoon', 'More partnerships coming')}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Marquee animation styles */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Partners;
