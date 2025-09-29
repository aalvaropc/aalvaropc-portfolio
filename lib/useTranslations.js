import { useState, useEffect } from 'react';

const contentCache = new Map();

export const useTranslations = (locale, namespace = 'common') => {
  const [translations, setTranslations] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!locale) return;

    const loadTranslations = async () => {
      const cacheKey = `${locale}-${namespace}`;
      
      // Check cache first
      if (contentCache.has(cacheKey)) {
        setTranslations(contentCache.get(cacheKey));
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/locales/${locale}/${namespace}.json`);
        
        if (!response.ok) {
          throw new Error(`Failed to load translations: ${response.status}`);
        }

        const data = await response.json();
        
        // Cache the loaded translations
        contentCache.set(cacheKey, data);
        setTranslations(data);
      } catch (err) {
        console.error(`Error loading translations for ${locale}/${namespace}:`, err);
        setError(err);
        
        // Fallback to Spanish if English fails, or empty object if Spanish fails
        if (locale !== 'es' && namespace === 'common') {
          try {
            const fallbackResponse = await fetch(`/locales/es/${namespace}.json`);
            if (fallbackResponse.ok) {
              const fallbackData = await fallbackResponse.json();
              contentCache.set(cacheKey, fallbackData);
              setTranslations(fallbackData);
            }
          } catch (fallbackErr) {
            console.error('Fallback translation loading failed:', fallbackErr);
            setTranslations({});
          }
        } else {
          setTranslations({});
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [locale, namespace]);

  // Helper function to get nested translation values
  const t = (key, defaultValue = '') => {
    return key.split('.').reduce((obj, k) => obj?.[k], translations) || defaultValue;
  };

  // Helper function to get translation with interpolation
  const tInterpolate = (key, variables = {}, defaultValue = '') => {
    let translation = t(key, defaultValue);
    
    // Simple interpolation: replace {{variable}} with values
    Object.entries(variables).forEach(([variable, value]) => {
      translation = translation.replace(new RegExp(`{{${variable}}}`, 'g'), value);
    });
    
    return translation;
  };

  return {
    translations,
    isLoading,
    error,
    t,
    tInterpolate
  };
};

export default useTranslations;