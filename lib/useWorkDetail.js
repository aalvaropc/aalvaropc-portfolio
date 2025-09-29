import { useState, useEffect } from 'react';
import { useI18n } from './i18nContext';

export const useWorkDetail = (workId) => {
  const { locale } = useI18n();
  const [workDetail, setWorkDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!locale || !workId) return;

    const loadWorkDetail = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/locales/${locale}/works-detail.json`);
        
        if (!response.ok) {
          throw new Error(`Failed to load work details: ${response.status}`);
        }

        const data = await response.json();
        const detail = data[workId];
        
        if (!detail) {
          throw new Error(`Work '${workId}' not found`);
        }

        setWorkDetail(detail);
      } catch (err) {
        console.error(`Error loading work detail for ${workId}:`, err);
        setError(err);
        
        // Fallback to Spanish if English fails
        if (locale !== 'es') {
          try {
            const fallbackResponse = await fetch(`/locales/es/works-detail.json`);
            if (fallbackResponse.ok) {
              const fallbackData = await fallbackResponse.json();
              const fallbackDetail = fallbackData[workId];
              if (fallbackDetail) {
                setWorkDetail(fallbackDetail);
                return;
              }
            }
          } catch (fallbackErr) {
            console.error('Fallback loading failed:', fallbackErr);
          }
        }
        
        setWorkDetail(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadWorkDetail();
  }, [locale, workId]);

  return {
    workDetail,
    isLoading,
    error
  };
};

export default useWorkDetail;