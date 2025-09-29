import { useState, useEffect } from 'react';

const SPANISH_SPEAKING_COUNTRIES = [
  'AR', 'BO', 'CL', 'CO', 'CR', 'CU', 'DO', 'EC', 'SV', 'GQ', 
  'GT', 'HN', 'MX', 'NI', 'PA', 'PY', 'PE', 'PR', 'ES', 'UY', 'VE'
];

const FALLBACK_LOCALE = 'es';
const SUPPORTED_LOCALES = ['es', 'en'];

export const useLocaleDetection = () => {
  const [locale, setLocale] = useState(FALLBACK_LOCALE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const detectLocale = async () => {
      try {
        // 1. Check localStorage first
        const savedLocale = localStorage.getItem('preferred-locale');
        if (savedLocale && SUPPORTED_LOCALES.includes(savedLocale)) {
          if (isMounted) {
            setLocale(savedLocale);
            setIsLoading(false);
          }
          return;
        }

        // 2. Check browser language
        const browserLang = navigator.language.split('-')[0];
        if (SUPPORTED_LOCALES.includes(browserLang)) {
          if (isMounted) {
            setLocale(browserLang);
            localStorage.setItem('preferred-locale', browserLang);
            setIsLoading(false);
          }
          return;
        }

        // 3. Check if geolocation was already detected in this session
        const sessionLocale = sessionStorage.getItem('session-locale-detected');
        if (sessionLocale && SUPPORTED_LOCALES.includes(sessionLocale)) {
          if (isMounted) {
            setLocale(sessionLocale);
            setIsLoading(false);
          }
          return;
        }

        // 4. Try geolocation-based detection (only once per session)
        if ('geolocation' in navigator && !sessionStorage.getItem('geolocation-attempted')) {
          sessionStorage.setItem('geolocation-attempted', 'true');
          
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              if (!isMounted) return;
              
              try {
                const { latitude, longitude } = position.coords;
                
                // Use a geolocation API to get country code
                const response = await fetch(
                  `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                );
                
                if (response.ok && isMounted) {
                  const data = await response.json();
                  const countryCode = data.countryCode;
                  
                  const detectedLocale = SPANISH_SPEAKING_COUNTRIES.includes(countryCode) ? 'es' : 'en';
                  setLocale(detectedLocale);
                  sessionStorage.setItem('session-locale-detected', detectedLocale);
                  localStorage.setItem('preferred-locale', detectedLocale);
                } else if (isMounted) {
                  setLocale(FALLBACK_LOCALE);
                }
              } catch (error) {
                console.warn('Error detecting location-based locale:', error);
                if (isMounted) setLocale(FALLBACK_LOCALE);
              } finally {
                if (isMounted) setIsLoading(false);
              }
            },
            (error) => {
              console.warn('Geolocation error:', error);
              if (isMounted) {
                setLocale(FALLBACK_LOCALE);
                setIsLoading(false);
              }
            },
            {
              timeout: 3000,
              enableHighAccuracy: false,
              maximumAge: 600000 // 10 minutes cache
            }
          );
        } else {
          // 5. Fallback to default
          if (isMounted) {
            setLocale(FALLBACK_LOCALE);
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error('Error in locale detection:', error);
        if (isMounted) {
          setLocale(FALLBACK_LOCALE);
          setIsLoading(false);
        }
      }
    };

    detectLocale();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const changeLocale = (newLocale) => {
    if (SUPPORTED_LOCALES.includes(newLocale)) {
      setLocale(newLocale);
      localStorage.setItem('preferred-locale', newLocale);
    }
  };

  return {
    locale,
    isLoading,
    changeLocale,
    supportedLocales: SUPPORTED_LOCALES
  };
};

export default useLocaleDetection;