import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

// Consistent gold colors
const GOLD = '#C9A961';
const GOLD_LIGHT = '#E8D5A3';

const Privacy = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || i18n.language || 'en';
  const canonicalUrl = `https://prestigeproduction.ch/${currentLang}/privacy`;

  return (
    <>
      <Helmet>
        <title>{t('seo.privacy.title', 'Privacy Policy | Prestige Production')}</title>
        <meta name="description" content={t('seo.privacy.description', 'Privacy policy for Prestige Production. Learn how we handle your data and protect your privacy.')} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={t('seo.privacy.title', 'Privacy Policy | Prestige Production')} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta name="robots" content="noindex, follow" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {"@type": "ListItem", "position": 1, "name": t('nav.home', 'Home'), "item": `https://prestigeproduction.ch/${currentLang}/`},
              {"@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": canonicalUrl}
            ]
          })}
        </script>
      </Helmet>
      <div className='min-h-screen bg-black text-white'>
      {/* Header */}
      <div className='bg-gradient-to-b from-zinc-900 to-black py-20'>
        <div className='max-w-4xl mx-auto px-6'>
          <h1 className='text-4xl md:text-5xl font-light mb-4' style={{ color: GOLD }}>
            {t('privacy.title')}
          </h1>
          <p className='text-white/70 text-sm'>
            {t('privacy.lastUpdated')}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className='max-w-4xl mx-auto px-6 py-16'>
        {/* Introduction */}
        <div className='mb-12'>
          <p className='text-white/80 text-lg leading-relaxed'>
            {t('privacy.intro')}
          </p>
        </div>

        {/* Sections */}
        <div className='space-y-12'>
          {[1, 2, 3, 4, 5].map((num) => (
            <section key={num} className='border-l-2 pl-6' style={{ borderColor: `${GOLD}4d` }}>
              <h2 className='text-2xl font-medium mb-4' style={{ color: GOLD }}>
                {t(`privacy.section${num}.title`)}
              </h2>
              <p className='text-white/80 leading-relaxed'>
                {t(`privacy.section${num}.content`)}
              </p>
            </section>
          ))}
        </div>

        {/* Contact CTA */}
        <div
          className='mt-16 p-8 border rounded-lg'
          style={{
            background: `linear-gradient(135deg, ${GOLD}1a, ${GOLD}0d)`,
            borderColor: `${GOLD}4d`
          }}
        >
          <h3 className='text-xl font-medium mb-3' style={{ color: GOLD }}>
            Questions about this policy?
          </h3>
          <p className='text-white/80 mb-4'>
            We're here to help clarify any aspect of our privacy practices.
          </p>
          <a
            href='mailto:info@prestigeproduction.ch'
            className='inline-flex items-center px-6 py-3 text-black font-medium transition-all duration-300 hover:scale-[1.02]'
            style={{ background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})` }}
          >
            Contact Us
          </a>
        </div>
      </div>
      </div>
    </>
  );
};

export default Privacy;
