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
    const detectLocale = async () => {
      try {
        // 1. Check localStorage first
        const savedLocale = localStorage.getItem('preferred-locale');
        if (savedLocale && SUPPORTED_LOCALES.includes(savedLocale)) {
          setLocale(savedLocale);
          setIsLoading(false);
          return;
        }

        // 2. Check browser language
        const browserLang = navigator.language.split('-')[0];
        if (SUPPORTED_LOCALES.includes(browserLang)) {
          setLocale(browserLang);
          localStorage.setItem('preferred-locale', browserLang);
          setIsLoading(false);
          return;
        }

        // 3. Try geolocation-based detection
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              try {
                const { latitude, longitude } = position.coords;
                
                // Use a geolocation API to get country code
                const response = await fetch(
                  `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                );
                
                if (response.ok) {
                  const data = await response.json();
                  const countryCode = data.countryCode;
                  
                  const detectedLocale = SPANISH_SPEAKING_COUNTRIES.includes(countryCode) ? 'es' : 'en';
                  setLocale(detectedLocale);
                  localStorage.setItem('preferred-locale', detectedLocale);
                } else {
                  setLocale(FALLBACK_LOCALE);
                }
              } catch (error) {
                console.warn('Error detecting location-based locale:', error);
                setLocale(FALLBACK_LOCALE);
              } finally {
                setIsLoading(false);
              }
            },
            (error) => {
              console.warn('Geolocation error:', error);
              setLocale(FALLBACK_LOCALE);
              setIsLoading(false);
            },
            {
              timeout: 5000,
              enableHighAccuracy: false,
              maximumAge: 300000 // 5 minutes cache
            }
          );
        } else {
          // 4. Fallback to default
          setLocale(FALLBACK_LOCALE);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error in locale detection:', error);
        setLocale(FALLBACK_LOCALE);
        setIsLoading(false);
      }
    };

    detectLocale();
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