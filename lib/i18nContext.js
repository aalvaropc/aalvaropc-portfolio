import React, { createContext, useContext, useMemo } from 'react';
import useLocaleDetection from './useLocaleDetection';
import useTranslations from './useTranslations';

const I18nContext = createContext();

export const I18nProvider = ({ children }) => {
  const { locale, isLoading: localeLoading, changeLocale, supportedLocales } = useLocaleDetection();
  
  const { 
    translations: commonTranslations, 
    isLoading: commonLoading, 
    error: commonError,
    t,
    tInterpolate 
  } = useTranslations(locale, 'common');

  const { 
    translations: worksTranslations, 
    isLoading: worksLoading 
  } = useTranslations(locale, 'works');

  const { 
    translations: postsTranslations, 
    isLoading: postsLoading 
  } = useTranslations(locale, 'posts');

  const isLoading = localeLoading || commonLoading || worksLoading || postsLoading;

  const contextValue = useMemo(() => ({
    locale,
    changeLocale,
    supportedLocales,
    isLoading,
    error: commonError,
    
    // Translation functions
    t,
    tInterpolate,
    
    // Namespace-specific translations
    common: commonTranslations,
    works: worksTranslations,
    posts: postsTranslations,
    
    // Helper functions for specific content
    getHero: () => commonTranslations.hero || {},
    getAbout: () => commonTranslations.about || {},
    getExperience: () => commonTranslations.experience || {},
    getSkills: () => commonTranslations.skills || {},
    getContact: () => commonTranslations.contact || {},
    getWorks: () => worksTranslations.works || {},
    getPosts: () => postsTranslations.posts || {}
  }), [
    locale,
    changeLocale,
    supportedLocales,
    isLoading,
    commonError,
    t,
    tInterpolate,
    commonTranslations,
    worksTranslations,
    postsTranslations
  ]);

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

export default I18nContext;