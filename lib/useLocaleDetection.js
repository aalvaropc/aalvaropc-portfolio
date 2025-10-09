import { useState, useEffect, useCallback } from 'react';

const SPANISH_SPEAKING_COUNTRIES = [
  'AR', 'BO', 'CL', 'CO', 'CR', 'CU', 'DO', 'EC', 'SV', 'GQ', 
  'GT', 'HN', 'MX', 'NI', 'PA', 'PY', 'PE', 'PR', 'ES', 'UY', 'VE'
];

const FALLBACK_LOCALE = 'es';
const SUPPORTED_LOCALES = ['es', 'en'];

export const useLocaleDetection = () => {
  const [locale, setLocale] = useState(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('preferred-locale');
      if (savedLocale && SUPPORTED_LOCALES.includes(savedLocale)) {
        return savedLocale;
      }
      // Check browser language as fallback
      const browserLang = navigator.language.split('-')[0];
      if (SUPPORTED_LOCALES.includes(browserLang)) {
        return browserLang;
      }
    }
    return FALLBACK_LOCALE;
  });
  
  const [isLoading, setIsLoading] = useState(() => {
    // Only set loading to true if we need to detect locale
    if (typeof window === 'undefined') return true;
    const savedLocale = localStorage.getItem('preferred-locale');
    return !savedLocale;
  });

  useEffect(() => {
    // Skip if we already have a locale from localStorage
    if (typeof window === 'undefined') return;
    
    const savedLocale = localStorage.getItem('preferred-locale');
    if (savedLocale && SUPPORTED_LOCALES.includes(savedLocale)) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    let timeoutId;
    
    const detectLocale = async () => {
      try {
        // 1. Check browser language first
        const browserLang = navigator.language.split('-')[0];
        if (SUPPORTED_LOCALES.includes(browserLang)) {
          if (isMounted) {
            setLocale(browserLang);
            localStorage.setItem('preferred-locale', browserLang);
            setIsLoading(false);
          }
          return;
        }

        // 2. Check session storage to avoid repeated geolocation
        const sessionLocale = sessionStorage.getItem('session-locale-detected');
        if (sessionLocale && SUPPORTED_LOCALES.includes(sessionLocale)) {
          if (isMounted) {
            setLocale(sessionLocale);
            localStorage.setItem('preferred-locale', sessionLocale);
            setIsLoading(false);
          }
          return;
        }

        // 3. Set timeout to prevent infinite waiting
        timeoutId = setTimeout(() => {
          if (isMounted) {
            setLocale(FALLBACK_LOCALE);
            setIsLoading(false);
          }
        }, 5000);

        // 4. Try geolocation only once per session
        if ('geolocation' in navigator && !sessionStorage.getItem('geolocation-attempted')) {
          sessionStorage.setItem('geolocation-attempted', 'true');
          
          const options = {
            timeout: 3000,
            enableHighAccuracy: false,
            maximumAge: 600000 // 10 minutes cache
          };
          
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              if (!isMounted) return;
              clearTimeout(timeoutId);
              
              try {
                const { latitude, longitude } = position.coords;
                
                const response = await fetch(
                  `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
                  { 
                    signal: AbortSignal.timeout(2000) // 2 second timeout for API
                  }
                );
                
                if (response.ok && isMounted) {
                  const data = await response.json();
                  const countryCode = data.countryCode;
                  
                  const detectedLocale = SPANISH_SPEAKING_COUNTRIES.includes(countryCode) ? 'es' : 'en';
                  setLocale(detectedLocale);
                  sessionStorage.setItem('session-locale-detected', detectedLocale);
                  localStorage.setItem('preferred-locale', detectedLocale);
                  setIsLoading(false);
                } else if (isMounted) {
                  setLocale(FALLBACK_LOCALE);
                  setIsLoading(false);
                }
              } catch (error) {
                console.warn('Error detecting location-based locale:', error);
                if (isMounted) {
                  setLocale(FALLBACK_LOCALE);
                  setIsLoading(false);
                }
              }
            },
            (error) => {
              console.warn('Geolocation error:', error);
              clearTimeout(timeoutId);
              if (isMounted) {
                setLocale(FALLBACK_LOCALE);
                setIsLoading(false);
              }
            },
            options
          );
        } else {
          // Fallback immediately if geolocation was already attempted
          clearTimeout(timeoutId);
          if (isMounted) {
            setLocale(FALLBACK_LOCALE);
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error('Error in locale detection:', error);
        clearTimeout(timeoutId);
        if (isMounted) {
          setLocale(FALLBACK_LOCALE);
          setIsLoading(false);
        }
      }
    };

    // Only detect if we don't have a saved locale
    detectLocale();
    
    return () => {
      isMounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []); // Empty dependency array - should only run once

  const changeLocale = useCallback((newLocale) => {
    if (SUPPORTED_LOCALES.includes(newLocale)) {
      setLocale(newLocale);
      localStorage.setItem('preferred-locale', newLocale);
      sessionStorage.setItem('session-locale-detected', newLocale);
    }
  }, []);

  return {
    locale,
    isLoading,
    changeLocale,
    supportedLocales: SUPPORTED_LOCALES
  };
};

export default useLocaleDetection;