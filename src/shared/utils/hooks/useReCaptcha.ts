// hooks/useReCaptcha.ts

import { GOOGLE_CATPCHA_SITE_KEY, _window } from '@/shared/config/constants';
import { useEffect, useState } from 'react';

const showBadge = () => {
  if (!_window.grecaptcha) return;
  _window.grecaptcha.ready(() => {
    const badge = document.getElementsByClassName('grecaptcha-badge')[0] as HTMLElement;
    if (!badge) return;
    badge.style.display = 'block';
    badge.style.zIndex = '1';
  });
};

const hideBadge = () => {
  if (!_window.grecaptcha) return;
  _window.grecaptcha.ready(() => {
    const badge = document.getElementsByClassName('grecaptcha-badge')[0] as HTMLElement;
    if (!badge) return;
    badge.style.display = 'none';
  });
};

const useReCaptcha = (): { reCaptchaLoaded: boolean; generateReCaptchaToken: (action: string) => Promise<string> } => {
  const [reCaptchaLoaded, setReCaptchaLoaded] = useState(false);

  // Load ReCaptcha script
  useEffect(() => {
    if (typeof _window === 'undefined' || reCaptchaLoaded) return;
    if (_window.grecaptcha) {
      //   showBadge();
      setReCaptchaLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.google.com/recaptcha/api.js?render=${GOOGLE_CATPCHA_SITE_KEY}`;
    script.addEventListener('load', () => {
      setReCaptchaLoaded(true);
      showBadge();
    });
    document.body.appendChild(script);
  }, [reCaptchaLoaded]);

  // Hide badge when unmount
  useEffect(() => hideBadge, []);

  // Get token
  const generateReCaptchaToken = (action: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!reCaptchaLoaded) return reject(new Error('ReCaptcha not loaded'));
      if (typeof _window === 'undefined' || !_window.grecaptcha) {
        setReCaptchaLoaded(false);
        return reject(new Error('ReCaptcha not loaded'));
      }
      _window.grecaptcha.ready(() => {
        _window.grecaptcha.execute(GOOGLE_CATPCHA_SITE_KEY, { action }).then((token: string) => {
          //   console.log('halo');
          //   localStorage.setItem(RECAPTCHA_TOKEN, token);
          resolve(token);
        });
      });
    });
  };

  return { reCaptchaLoaded, generateReCaptchaToken };
};

export default useReCaptcha;
