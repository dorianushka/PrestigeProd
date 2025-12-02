import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import {
  PaperAirplaneIcon,
  EnvelopeIcon,
  UserIcon,
  ChatBubbleBottomCenterTextIcon,
  PhoneIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { TagIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';
import { useParams, useLocation } from 'react-router-dom';
import {
  trackContactFormSubmit,
  trackServiceInquiry,
} from '../utils/analytics';

// Consistent gold colors from the site
const GOLD = '#C9A961';
const GOLD_LIGHT = '#E8D5A3';

const Contact = () => {
  const formRef = useRef(null);
  const containerRef = useRef(null);
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const location = useLocation();
  const currentLang = lang || i18n.language || 'en';
  const { selectedPackage } = location.state || {};

  const canonicalUrl = `https://prestigeproduction.ch/${currentLang}/contact`;

  // Handle URL parameters and selected package for prefilling form
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const service = urlParams.get('service');
    const subject = urlParams.get('subject');

    if (service && subject) {
      let prefillMessage = '';

      switch (service) {
        case 'video-production':
          prefillMessage = t(
            'contact.prefillVideoProduction',
            "Hi! I'm interested in your video production services. I'd like to discuss my project and get a custom quote.",
          );
          break;
        case 'photography':
          prefillMessage = t(
            'contact.prefillPhotography',
            "Hello! I'd like to learn more about your photography services and get a quote for my project.",
          );
          break;
        case 'complete-package':
          prefillMessage = t(
            'contact.prefillCompletePackage',
            "Hi! I'm interested in your complete video + photo package. Could we discuss my project requirements and pricing?",
          );
          break;
        default:
          prefillMessage = t(
            'contact.prefillGeneral',
            "Hello! I'm interested in your services and would like to discuss my project.",
          );
      }

      setFormData(prev => ({
        ...prev,
        message: prefillMessage,
      }));

      trackServiceInquiry(service, currentLang);
    } else if (selectedPackage) {
      const prefillMessage =
        selectedPackage === 'Custom Project'
          ? t(
              'contact.prefillCustomProject',
              "Hello! I'm interested in creating a custom project with Prestige Production. I'd like to discuss my specific requirements and get a tailored quote.",
            )
          : t(
              'contact.prefillSelectedPackage',
              "Hi! I'm interested in the \"{packageName}\" package. I'd like to learn more about what's included and discuss my project requirements.",
              { packageName: selectedPackage },
            );

      setFormData(prev => ({
        ...prev,
        message: prefillMessage,
      }));

      trackServiceInquiry(selectedPackage, currentLang);
    }
  }, [location.search, selectedPackage]);

  useEffect(() => {
    const calendlyScriptId = 'calendly-widget-script';
    let script = document.getElementById(calendlyScriptId);

    const hideLoadingOverlay = () => {
      const loadingOverlay = document.querySelector('.calendly-loading');
      if (loadingOverlay) {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
          if (loadingOverlay) loadingOverlay.style.display = 'none';
        }, 300);
      }
    };

    const initializeCalendly = () => {
      if (window.Calendly) {
        const widgetContainer = document.querySelector(
          '.calendly-inline-widget',
        );
        if (widgetContainer && !widgetContainer.hasChildNodes()) {
          window.Calendly.initInlineWidget({
            url: 'https://calendly.com/dorian-quilfen/30min',
            parentElement: widgetContainer,
            prefill: {},
            utm: {},
          });
        }
        const observer = new MutationObserver((mutationsList, observer) => {
          for (const mutation of mutationsList) {
            if (
              mutation.type === 'childList' &&
              widgetContainer.querySelector('iframe')
            ) {
              hideLoadingOverlay();
              observer.disconnect();
              return;
            }
          }
        });
        if (widgetContainer) {
          observer.observe(widgetContainer, { childList: true, subtree: true });
        }
      }
    };

    if (script && window.Calendly) {
      initializeCalendly();
    } else if (!script) {
      script = document.createElement('script');
      script.id = calendlyScriptId;
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;

      script.onload = () => {
        initializeCalendly();
      };

      script.onerror = () => {
        console.error('Failed to load Calendly script.');
        const loadingOverlay = document.querySelector('.calendly-loading');
        if (loadingOverlay) {
          loadingOverlay.innerHTML = `
            <div class="text-center">
              <p class="text-red-400 mb-2">${t(
                'contact.calendarLoadError',
                'Failed to load calendar',
              )}</p>
              <p class="text-white/60 text-sm">${t(
                'contact.contactDirectly',
                'Please contact us directly',
              )}</p>
            </div>
          `;
        }
      };

      document.body.appendChild(script);
    }

    const fallbackTimeout = setTimeout(hideLoadingOverlay, 5000);

    return () => {
      clearTimeout(fallbackTimeout);
    };
  }, [t]);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Orchestrated reveal sequence
    tl.from('.contact-hero-line', {
      scaleX: 0,
      duration: 1.2,
      transformOrigin: 'left center',
    })
    .from('.contact-label', {
      opacity: 0,
      y: 20,
      duration: 0.8,
    }, '-=0.6')
    .from('.contact-title span', {
      opacity: 0,
      y: 60,
      duration: 1,
      stagger: 0.1,
    }, '-=0.4')
    .from('.contact-subtitle', {
      opacity: 0,
      y: 30,
      duration: 0.8,
    }, '-=0.5')
    .from('.contact-form-card', {
      opacity: 0,
      y: 40,
      scale: 0.98,
      duration: 1,
    }, '-=0.4')
    .from('.contact-info-item', {
      opacity: 0,
      x: -30,
      duration: 0.6,
      stagger: 0.15,
    }, '-=0.6')
    .from('.contact-decorative', {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
    }, '-=0.8');

  }, { scope: containerRef });

  const validateEmail = email => /^\S+@\S+\.\S+$/.test(email);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    let fieldError;

    if (name === 'email') {
      if (!value.trim())
        fieldError = t('contact.emailRequired', 'Email is required');
      else if (!validateEmail(value))
        fieldError = t(
          'contact.emailInvalid',
          'Please enter a valid email address',
        );
    } else {
      if (!value.trim())
        fieldError = t(
          `contact.${name}Required`,
          `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
        );
    }

    setErrors(prev => {
      const newErrors = { ...prev };
      if (fieldError) newErrors[name] = fieldError;
      else delete newErrors[name];
      return newErrors;
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    setErrors({});

    const formData = new FormData(formRef.current);
    const name = formData.get('name')?.trim();
    const email = formData.get('email')?.trim();
    const message = formData.get('message')?.trim();

    const urlParams = new URLSearchParams(location.search);
    const service = urlParams.get('service');
    const subject = urlParams.get('subject');

    const newErrors = {};
    if (!name) newErrors.name = t('contact.nameRequired', 'Name is required');
    if (!email)
      newErrors.email = t('contact.emailRequired', 'Email is required');
    else if (!validateEmail(email))
      newErrors.email = t(
        'contact.emailInvalid',
        'Please enter a valid email address',
      );
    if (!message)
      newErrors.message = t('contact.messageRequired', 'Message is required');

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      setIsSubmitting(false);
      const firstErrorField = Object.keys(newErrors)[0];
      document.getElementById(firstErrorField)?.focus();
      return;
    }

    try {
      const response = await fetch('https://formspree.io/f/mrbqwrvq', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setStatus('SUCCESS');
        formRef.current.reset();
        setFormData({ name: '', email: '', message: '' });

        trackContactFormSubmit(service || 'general', currentLang);

        setTimeout(() => {
          document.getElementById('success-message')?.focus();
        }, 100);
      } else {
        setStatus('ERROR');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('ERROR');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('seo.contact.title', 'Contact Us | Prestige Production Zurich')}</title>
        <meta name="description" content={t('seo.contact.description', 'Get in touch with Prestige Production for video production and photography services in Zurich, Switzerland. Book a consultation today.')} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={t('seo.contact.title', 'Contact Us | Prestige Production')} />
        <meta property="og:description" content={t('seo.contact.description', 'Get in touch for premium video and photo services.')} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('seo.contact.title', 'Contact Us | Prestige Production')} />
        <meta name="twitter:description" content={t('seo.contact.description', 'Get in touch for video and photo services.')} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {"@type": "ListItem", "position": 1, "name": t('nav.home', 'Home'), "item": `https://prestigeproduction.ch/${currentLang}/`},
              {"@type": "ListItem", "position": 2, "name": t('nav.contact', 'Contact'), "item": canonicalUrl}
            ]
          })}
        </script>
      </Helmet>
      <section
        ref={containerRef}
        className='contact-page relative w-full min-h-screen bg-black text-white overflow-hidden'
      >
      {/* Ambient background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-3xl opacity-10"
          style={{ background: `radial-gradient(circle, ${GOLD} 0%, transparent 70%)` }}
        />
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${GOLD}14 0%, transparent 70%)` }}
        />
      </div>

      {/* Decorative elements */}
      <div
        className="contact-decorative absolute top-32 right-12 w-px h-32 hidden lg:block"
        style={{ background: `linear-gradient(to bottom, ${GOLD}66, transparent)` }}
      />
      <div
        className="contact-decorative absolute bottom-48 left-12 w-24 h-px hidden lg:block"
        style={{ background: `linear-gradient(to right, ${GOLD}66, transparent)` }}
      />

      <div className='relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-20'>

        {/* Hero Section - Compact */}
        <div className="mb-12 lg:mb-16">
          <div
            className="contact-hero-line w-16 h-px mb-6"
            style={{ background: `linear-gradient(to right, ${GOLD}, ${GOLD}80)` }}
          />

          <p
            className="contact-label font-sans text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: `${GOLD}cc` }}
          >
            {t('contact.getInTouch', 'Get in Touch')}
          </p>

          <h1 className='contact-title font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-[1] tracking-tight mb-6'>
            <span className="block">{t('contact.title', "Let's create something")}</span>
            <span
              className="block mt-2"
              style={{
                background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t('contact.exceptional', 'exceptional')}
            </span>
          </h1>

          <p className='contact-subtitle max-w-xl text-base sm:text-lg text-white/50 font-light leading-relaxed'>
            {t(
              'contact.subtitle',
              'Every great project begins with a conversation. Tell us about your vision.',
            )}
          </p>
        </div>

        {/* Main Content Grid - Form First */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left Column - Form Card (now first/larger) */}
          <div className="lg:col-span-7 order-1">

            {selectedPackage && (
              <div className='mb-6'>
                <div
                  className='inline-flex items-center gap-3 backdrop-blur-sm rounded-full px-5 py-2.5 border'
                  style={{
                    backgroundColor: `${GOLD}15`,
                    borderColor: `${GOLD}33`,
                  }}
                >
                  <TagIcon className='w-4 h-4' style={{ color: GOLD }} />
                  <span className='text-white/70 text-sm'>
                    {t('contact.selectedPackage', 'Selected Package:')}{' '}
                    <span className='font-medium text-white'>
                      {selectedPackage}
                    </span>
                  </span>
                </div>
              </div>
            )}

            <div className="contact-form-card relative">
              {/* Card background with subtle gradient border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl" />
              <div className="absolute inset-0 rounded-2xl border border-white/10" />

              <div className="relative p-6 sm:p-8 lg:p-10">

                {status === 'SUCCESS' ? (
                  <div
                    id='success-message'
                    tabIndex='-1'
                    className='text-center py-12'
                    role='alert'
                    aria-live='polite'
                  >
                    <div
                      className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${GOLD}33, ${GOLD}15)` }}
                    >
                      <svg className="w-8 h-8" style={{ color: GOLD }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className='font-serif text-2xl text-white mb-3'>
                      {t('contact.successMessage', 'Message sent successfully')}
                    </h3>
                    <p className='text-white/50 text-sm max-w-md mx-auto'>
                      {t(
                        'contact.successSubtext',
                        "Thank you for reaching out. We'll get back to you within 24 hours.",
                      )}
                    </p>
                  </div>
                ) : (
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    noValidate
                    className='space-y-6'
                    aria-label={t('contact.formLabel', 'Contact form')}
                  >
                    <input
                      type='hidden'
                      name='_subject'
                      value={(() => {
                        const urlParams = new URLSearchParams(location.search);
                        const service = urlParams.get('service');
                        const subject = urlParams.get('subject');

                        if (service && subject) {
                          return `${subject} - ${currentLang.toUpperCase()}`;
                        }
                        if (selectedPackage) {
                          return `New inquiry for ${selectedPackage} - ${currentLang.toUpperCase()}`;
                        }
                        return `Message from Prestige Production site (${currentLang})`;
                      })()}
                    />

                    {selectedPackage && (
                      <input
                        type='hidden'
                        name='Selected Package'
                        value={selectedPackage}
                      />
                    )}

                    {/* Name Field */}
                    <div className="form-field-group">
                      <label htmlFor='name' className='block text-xs tracking-[0.15em] uppercase text-white/40 mb-2'>
                        {t('contact.namePlaceholder', 'Your Name')}
                      </label>
                      <div
                        className={`relative rounded-xl transition-all duration-500`}
                        style={{
                          boxShadow: focusedField === 'name' ? `0 0 0 1px ${GOLD}80` : 'none'
                        }}
                      >
                        <div className="absolute inset-0 rounded-xl bg-white/[0.03]" />
                        <div className="relative flex items-center">
                          <UserIcon
                            className={`w-5 h-5 ml-4 transition-colors duration-300`}
                            style={{ color: focusedField === 'name' ? GOLD : 'rgba(255,255,255,0.2)' }}
                          />
                          <input
                            id='name'
                            name='name'
                            type='text'
                            value={formData.name}
                            placeholder={t('contact.nameInputPlaceholder', 'Enter your name')}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            disabled={isSubmitting}
                            aria-describedby={errors.name ? 'name-error' : undefined}
                            aria-invalid={!!errors.name}
                            className={`w-full bg-transparent px-3 py-4 text-white placeholder-white/30 focus:outline-none text-base ${
                              errors.name ? 'text-red-400' : ''
                            }`}
                          />
                        </div>
                      </div>
                      {errors.name && (
                        <p
                          id='name-error'
                          className='text-red-400 text-xs mt-2 ml-1'
                          role='alert'
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="form-field-group">
                      <label htmlFor='email' className='block text-xs tracking-[0.15em] uppercase text-white/40 mb-2'>
                        {t('contact.emailLabel', 'Email Address')}
                      </label>
                      <div
                        className={`relative rounded-xl transition-all duration-500`}
                        style={{
                          boxShadow: focusedField === 'email' ? `0 0 0 1px ${GOLD}80` : 'none'
                        }}
                      >
                        <div className="absolute inset-0 rounded-xl bg-white/[0.03]" />
                        <div className="relative flex items-center">
                          <EnvelopeIcon
                            className={`w-5 h-5 ml-4 transition-colors duration-300`}
                            style={{ color: focusedField === 'email' ? GOLD : 'rgba(255,255,255,0.2)' }}
                          />
                          <input
                            id='email'
                            name='email'
                            type='email'
                            value={formData.email}
                            placeholder={t('contact.emailInputPlaceholder', 'you@example.com')}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            disabled={isSubmitting}
                            aria-describedby={errors.email ? 'email-error' : undefined}
                            aria-invalid={!!errors.email}
                            className={`w-full bg-transparent px-3 py-4 text-white placeholder-white/30 focus:outline-none text-base ${
                              errors.email ? 'text-red-400' : ''
                            }`}
                          />
                        </div>
                      </div>
                      {errors.email && (
                        <p
                          id='email-error'
                          className='text-red-400 text-xs mt-2 ml-1'
                          role='alert'
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div className="form-field-group">
                      <label
                        htmlFor='message'
                        className='block text-xs tracking-[0.15em] uppercase text-white/40 mb-2'
                      >
                        {t('contact.messageLabel', 'Your Message')}
                      </label>
                      <div
                        className={`relative rounded-xl transition-all duration-500`}
                        style={{
                          boxShadow: focusedField === 'message' ? `0 0 0 1px ${GOLD}80` : 'none'
                        }}
                      >
                        <div className="absolute inset-0 rounded-xl bg-white/[0.03]" />
                        <div className="relative flex">
                          <ChatBubbleBottomCenterTextIcon
                            className={`w-5 h-5 ml-4 mt-4 flex-shrink-0 transition-colors duration-300`}
                            style={{ color: focusedField === 'message' ? GOLD : 'rgba(255,255,255,0.2)' }}
                          />
                          <textarea
                            id='message'
                            name='message'
                            rows={4}
                            value={formData.message}
                            placeholder={t(
                              'contact.messageInputPlaceholder',
                              'Tell us about your project, timeline, and vision...',
                            )}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField(null)}
                            disabled={isSubmitting}
                            aria-describedby={
                              errors.message ? 'message-error' : undefined
                            }
                            aria-invalid={!!errors.message}
                            className={`w-full bg-transparent px-3 py-4 text-white placeholder-white/30 resize-none focus:outline-none text-base leading-relaxed ${
                              errors.message ? 'text-red-400' : ''
                            }`}
                          />
                        </div>
                      </div>
                      {errors.message && (
                        <p
                          id='message-error'
                          className='text-red-400 text-xs mt-2 ml-1'
                          role='alert'
                        >
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {status === 'ERROR' && (
                      <div
                        className='rounded-xl bg-red-500/10 border border-red-500/20 p-4'
                        role='alert'
                        aria-live='polite'
                      >
                        <p className='text-red-400 font-medium text-sm'>
                          {t(
                            'contact.errorMessage',
                            'Something went wrong. Please try again.',
                          )}
                        </p>
                        <p className='text-white/50 text-xs mt-1'>
                          {t(
                            'contact.errorSubtext',
                            'Or contact us directly at info@prestigeproduction.ch',
                          )}
                        </p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className='pt-2'>
                      <button
                        type='submit'
                        disabled={isSubmitting || Object.keys(errors).length > 0}
                        className={`group relative w-full sm:w-auto px-8 py-4 rounded-full font-medium text-sm tracking-wide overflow-hidden transition-all duration-500 ${
                          isSubmitting || Object.keys(errors).length > 0
                            ? 'bg-white/10 text-white/40 cursor-not-allowed'
                            : 'text-black hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                        }`}
                        style={
                          isSubmitting || Object.keys(errors).length > 0
                            ? {}
                            : {
                                background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})`,
                                boxShadow: `0 10px 30px -10px ${GOLD}40`
                              }
                        }
                        aria-describedby='submit-status'
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <>
                              <div className='w-4 h-4 border-2 border-white/40 border-t-transparent rounded-full animate-spin'></div>
                              {t('contact.sendingButton', 'Sending...')}
                            </>
                          ) : (
                            <>
                              <PaperAirplaneIcon className='w-4 h-4' />
                              {t('contact.sendButton', 'Send Message')}
                            </>
                          )}
                        </span>

                        {/* Button shine effect */}
                        {!isSubmitting && Object.keys(errors).length === 0 && (
                          <span className='absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent' />
                        )}
                      </button>
                      <div id='submit-status' className='sr-only' aria-live='polite'>
                        {isSubmitting
                          ? t('contact.submittingStatus', 'Form is being submitted')
                          : ''}
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Info */}
          <div className="lg:col-span-5 order-2 space-y-10">

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="contact-info-item group">
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500"
                    style={{
                      borderColor: 'rgba(255,255,255,0.1)',
                    }}
                  >
                    <EnvelopeIcon
                      className="w-4 h-4 text-white/40 group-hover:text-white transition-colors duration-500"
                      style={{ '--tw-text-opacity': 1 }}
                    />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.15em] uppercase text-white/30 mb-1">
                      {t('contact.email', 'Email')}
                    </p>
                    <a
                      href='mailto:info@prestigeproduction.ch'
                      className='text-white/80 hover:text-white transition-colors duration-300 text-sm'
                      style={{ '--hover-color': GOLD }}
                    >
                      info@prestigeproduction.ch
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact-info-item group">
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500"
                    style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                  >
                    <PhoneIcon className="w-4 h-4 text-white/40 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.15em] uppercase text-white/30 mb-1">
                      {t('contact.phone', 'Phone')}
                    </p>
                    <a
                      href='tel:+41762021959'
                      className='text-white/80 hover:text-white transition-colors duration-300 text-sm'
                    >
                      +41 76 202 19 59
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact-info-item group">
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500"
                    style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                  >
                    <MapPinIcon className="w-4 h-4 text-white/40 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.15em] uppercase text-white/30 mb-1">
                      {t('contact.location', 'Location')}
                    </p>
                    <p className='text-white/80 text-sm'>
                      Zurich, Switzerland
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="contact-info-item">
              <a
                href='https://wa.me/41762021959'
                target='_blank'
                rel='noopener noreferrer'
                className='group inline-flex items-center gap-3 px-5 py-3 text-black transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]'
                style={{
                  background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})`,
                  boxShadow: `0 8px 24px -8px ${GOLD}40`
                }}
                aria-label={t('contact.whatsappLabel', 'Chat with us on WhatsApp')}
              >
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488' />
                </svg>
                <span className="font-medium text-sm">
                  {t('contact.whatsapp', 'Chat on WhatsApp')}
                </span>
              </a>
            </div>

            {/* Decorative quote */}
            <div className="contact-info-item hidden lg:block pt-6 border-t border-white/5">
              <blockquote className="text-white/30 text-sm italic leading-relaxed font-serif">
                "The details are not the details. They make the design."
              </blockquote>
              <p className="text-white/20 text-xs mt-2 tracking-wider">— Charles Eames</p>
            </div>
          </div>
        </div>

        {/* Calendly Section */}
        <div className='mt-24 lg:mt-32'>
          <div className="text-center mb-12">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-6" />

            <p className="font-sans text-xs tracking-[0.3em] uppercase text-white/40 mb-4">
              {t('contact.meetingCTA', 'Schedule a Meeting')}
            </p>

            <h2 className='font-serif text-3xl sm:text-4xl lg:text-5xl font-light leading-tight mb-4'>
              {t('contact.reserveTime1', 'Reserve your')}{' '}
              <span
                style={{
                  background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {t('contact.creative', 'creative')}
              </span>{' '}
              {t('contact.reserveTime2', 'time')}
            </h2>

            <p className='text-white/40 text-base max-w-xl mx-auto'>
              {t(
                'contact.scheduleCall',
                'Book a 30-minute consultation to discuss your project in detail.',
              )}
            </p>
          </div>

          {/* Calendly inline widget */}
          <div className='relative max-w-4xl mx-auto'>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02]" />
            <div className="absolute inset-0 rounded-2xl border border-white/10" />

            <div
              className='calendly-inline-widget relative rounded-2xl overflow-hidden'
              data-url='https://calendly.com/dorian-quilfen/30min'
              style={{
                minWidth: '300px',
                height: 'clamp(550px, 70vh, 750px)',
                maxWidth: '100%',
              }}
            ></div>

            {/* Loading placeholder */}
            <div className='absolute inset-0 rounded-2xl bg-black/90 backdrop-blur-sm flex items-center justify-center calendly-loading'>
              <div className='text-center'>
                <div
                  className='w-8 h-8 border-2 rounded-full animate-spin mx-auto mb-4'
                  style={{ borderColor: `${GOLD}50`, borderTopColor: GOLD }}
                ></div>
                <p className='text-white/50 text-sm'>
                  {t('contact.loadingCalendar', 'Loading calendar...')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Animation Styles */}
      <style>{`
        .contact-page {
          --gold: ${GOLD};
          --gold-light: ${GOLD_LIGHT};
        }

        .calendly-loading {
          transition: opacity 0.5s ease-in-out;
        }

        .calendly-inline-widget iframe {
          border-radius: 1rem;
        }

        /* Focus indicators */
        input:focus, textarea:focus, button:focus {
          outline: none;
        }

        /* Selection color */
        ::selection {
          background: ${GOLD}4d;
          color: white;
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          .calendly-inline-widget {
            min-height: 480px !important;
            height: 60vh !important;
          }
        }

        /* Reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
      </section>
    </>
  );
};

export default Contact;
