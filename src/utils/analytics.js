// Analytics utility for tracking page views and events
export const trackPageView = (path, title = null) => {
  // Send to GTM dataLayer (recommended approach)
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
      page_path: path,
      page_title: title || document.title,
    });
  }

  // Fallback to gtag if available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GTM-KW98674B', {
      page_path: path,
      page_title: title || document.title,
    });
  }
};

export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }

  // Also send to GTM dataLayer
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...parameters,
    });
  }
};

export const trackLanguageChange = language => {
  trackEvent('language_change', {
    language: language,
    event_category: 'user_interaction',
  });
};

export const trackContactFormSubmit = (formType, language) => {
  trackEvent('contact_form_submit', {
    form_type: formType,
    language: language,
    event_category: 'form_interaction',
  });
};

export const trackPortfolioView = (projectName, language) => {
  trackEvent('portfolio_view', {
    project_name: projectName,
    language: language,
    event_category: 'content_engagement',
  });
};

export const trackServiceInquiry = (serviceName, language) => {
  trackEvent('service_inquiry', {
    service_name: serviceName,
    language: language,
    event_category: 'business_conversion',
  });
};
