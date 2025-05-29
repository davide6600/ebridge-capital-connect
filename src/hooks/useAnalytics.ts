
import { useEffect } from 'react';

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
}

export const useAnalytics = () => {
  // Track page views
  const trackPageView = (page: string) => {
    console.log('Page view:', page);
    // In produzione, qui integreresti Google Analytics, Mixpanel, etc.
  };

  // Track user events
  const trackEvent = ({ event, properties }: AnalyticsEvent) => {
    console.log('Event:', event, properties);
    // In produzione, qui integreresti il tuo servizio di analytics
  };

  // Track user login
  const trackLogin = (method: 'email' | 'google') => {
    trackEvent({
      event: 'user_login',
      properties: { method }
    });
  };

  // Track user signup
  const trackSignup = (method: 'email' | 'google') => {
    trackEvent({
      event: 'user_signup',
      properties: { method }
    });
  };

  // Track portfolio actions
  const trackPortfolioAction = (action: string, assetType?: string) => {
    trackEvent({
      event: 'portfolio_action',
      properties: { action, assetType }
    });
  };

  // Track proposal interactions
  const trackProposalAction = (action: string, proposalType?: string) => {
    trackEvent({
      event: 'proposal_action',
      properties: { action, proposalType }
    });
  };

  return {
    trackPageView,
    trackEvent,
    trackLogin,
    trackSignup,
    trackPortfolioAction,
    trackProposalAction
  };
};

// Hook per tracciare automaticamente le page views
export const usePageTracking = (pageName: string) => {
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView(pageName);
  }, [pageName, trackPageView]);
};
