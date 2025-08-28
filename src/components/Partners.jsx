import React from 'react';
import { useTranslation } from 'react-i18next';
import { GRADIENT_CLASS } from '../constants';

const partners = [
  {
    name: 'Swiss Mining Institute',
    logo: `${import.meta.env.VITE_CLOUDFRONT_URL}/logos/smi_logo.png`,
    description: 'Biggest mining conference in Europe',
    website: 'https://swissmininginstitute.ch/',
  },
  {
    name: "Zurich Sotheby's",
    logo: `${
      import.meta.env.VITE_CLOUDFRONT_URL
    }/logos/zurich_sothebys_logo.png`,
    description: 'International Realty',
    website: 'https://www.ch-sothebysrealty.ch/en',
  },
];

const Partners = () => {
  const { t } = useTranslation();

  return (
    <section className='bg-black py-24 overflow-hidden relative'>
      {/* Enhanced background with gradient mesh */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-blue-900/10'></div>
        <div className='absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-radial from-purple-500/5 to-transparent rounded-full transform -translate-x-1/2 -translate-y-1/2 blur-3xl'></div>
      </div>

      <div className='screen-max-width mx-auto px-5 sm:px-10 relative z-10'>
        {/* Refined header */}
        <div className='text-center mb-12'>
          <h2 className='text-5xl md:text-7xl font-extralight mb-6 text-white tracking-tight leading-tight'>
            {t('partners.title', 'Partners we are')}{' '}
            <span
              className={`${GRADIENT_CLASS} bg-clip-text text-transparent font-light`}
            >
              {t('partners.proud', 'proud')}
            </span>{' '}
            {t('partners.of', 'of')}
          </h2>
        </div>

        <style>{`
          .premium-marquee {
            position: relative;
            width: 100%;
            overflow: hidden;
            padding: 60px 0;
          }

          .premium-marquee::before,
          .premium-marquee::after {
            content: '';
            position: absolute;
            top: 0;
            width: 200px;
            height: 100%;
            z-index: 10;
            pointer-events: none;
          }

          .premium-marquee::before {
            left: 0;
            background: linear-gradient(to right, #000000 0%, rgba(0,0,0,0.8) 40%, transparent 100%);
          }

          .premium-marquee::after {
            right: 0;
            background: linear-gradient(to left, #000000 0%, rgba(0,0,0,0.8) 40%, transparent 100%);
          }

          .premium-track {
            display: flex;
            width: fit-content;
            animation: premiumFlow 15s linear infinite;
          }

          .premium-group {
            display: flex;
            align-items: center;
            gap: 120px;
            min-width: max-content;
            padding-right: 120px;
          }

          @keyframes premiumFlow {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .premium-card {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 24px 20px;
            background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
            border: 1px solid rgba(255,255,255,0.06);
            border-radius: 16px;
            backdrop-filter: blur(20px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            min-width: 180px;
            min-height: 100px;
            cursor: pointer;
            overflow: hidden;
          }

          .premium-card::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 16px;
            padding: 1px;
            background: linear-gradient(135deg, 
              rgba(147, 51, 234, 0.2) 0%, 
              rgba(79, 70, 229, 0.2) 25%,
              rgba(236, 72, 153, 0.2) 50%,
              rgba(59, 130, 246, 0.2) 75%,
              rgba(147, 51, 234, 0.2) 100%
            );
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: xor;
            -webkit-mask-composite: xor;
            opacity: 0;
            transition: opacity 0.6s ease;
          }

          .premium-card::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%);
            transform: scale(0);
            transition: transform 0.6s ease;
            border-radius: 50%;
          }

          .premium-marquee:hover .premium-track {
            animation-play-state: paused;
          }

          .premium-card:hover {
            transform: translateY(-12px) scale(1.03);
            background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%);
            border-color: rgba(255,255,255,0.12);
            box-shadow: 
              0 32px 64px rgba(0,0,0,0.4),
              0 0 0 1px rgba(255,255,255,0.08),
              inset 0 1px 0 rgba(255,255,255,0.1);
          }

          .premium-card:hover::before {
            opacity: 1;
          }

          .premium-card:hover::after {
            transform: scale(1);
          }

          .premium-logo {
            height: 36px;
            width: auto;
            max-width: 120px;
            object-fit: contain;
            filter: grayscale(100%) brightness(0.8) contrast(1.2);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            margin: 0 auto;
            display: block;
          }

          .premium-card:hover .premium-logo {
            filter: grayscale(0%) brightness(1) contrast(1);
            transform: scale(1.1);
          }

          .partner-info {
            text-align: center;
            opacity: 0;
            transform: translateY(8px);
            transition: all 0.4s ease 0.1s;
            margin-top: 8px;
          }

          .premium-card:hover .partner-info {
            opacity: 1;
            transform: translateY(0);
          }

          .partner-name {
            color: rgba(255,255,255,0.95);
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 4px;
            letter-spacing: 0.025em;
          }

          .partner-description {
            color: rgba(255,255,255,0.6);
            font-size: 11px;
            font-weight: 400;
            letter-spacing: 0.05em;
            text-transform: uppercase;
          }

          @media (max-width: 1024px) {
            .premium-group {
              gap: 80px;
              padding-right: 80px;
            }
            
            .premium-card {
              padding: 20px 16px;
              min-width: 160px;
              min-height: 90px;
            }
            
            .premium-logo {
              height: 32px;
              max-width: 110px;
            }
          }

          @media (max-width: 768px) {
            .premium-group {
              gap: 60px;
              padding-right: 60px;
            }
            
            .premium-card {
              padding: 18px 14px;
              min-width: 140px;
              min-height: 80px;
            }
            
            .premium-logo {
              height: 28px;
              max-width: 100px;
            }

            .partner-name {
              font-size: 14px;
            }

            .partner-description {
              font-size: 10px;
            }
          }
        `}</style>

        <div className='premium-marquee'>
          <div className='premium-track'>
            {/* First set of partners */}
            <div className='premium-group'>
              {partners.map((partner, idx) => (
                <a
                  key={`primary-${idx}`}
                  href={partner.website}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='premium-card'
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className='premium-logo'
                    loading='lazy'
                  />
                  <div className='partner-info'>
                    <div className='partner-name'>{partner.name}</div>
                    <div className='partner-description'>
                      {partner.description}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Duplicate set for seamless loop */}
            <div className='premium-group'>
              {partners.map((partner, idx) => (
                <a
                  key={`duplicate-${idx}`}
                  href={partner.website}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='premium-card'
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className='premium-logo'
                    loading='lazy'
                  />
                  <div className='partner-info'>
                    <div className='partner-name'>{partner.name}</div>
                    <div className='partner-description'>
                      {partner.description}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
