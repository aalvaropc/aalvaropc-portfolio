import React, { createContext, useContext, useMemo, useCallback } from 'react';
import useLocaleDetection from './useLocaleDetection';
import useTranslations from './useTranslations';

const I18nContext = createContext();

export const I18nProvider = ({ children }) => {
  const { locale, isLoading: localeLoading, changeLocale, supportedLocales } = useLocaleDetection();
  
  // Memoize changeLocale to prevent unnecessary re-renders
  const memoizedChangeLocale = useCallback(changeLocale, [changeLocale]);
  
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

  // Memoize helper functions to prevent re-creation
  const getHero = useCallback(() => commonTranslations?.hero || {}, [commonTranslations]);
  const getAbout = useCallback(() => commonTranslations?.about || {}, [commonTranslations]);
  const getExperience = useCallback(() => commonTranslations?.experience || {}, [commonTranslations]);
  const getSkills = useCallback(() => commonTranslations?.skills || {}, [commonTranslations]);
  const getContact = useCallback(() => commonTranslations?.contact || {}, [commonTranslations]);
  const getWorks = useCallback(() => worksTranslations?.works || {}, [worksTranslations]);
  const getPosts = useCallback(() => postsTranslations?.posts || {}, [postsTranslations]);

  const contextValue = useMemo(() => ({
    locale,
    changeLocale: memoizedChangeLocale,
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
    getHero,
    getAbout,
    getExperience,
    getSkills,
    getContact,
    getWorks,
    getPosts
  }), [
    locale,
    memoizedChangeLocale,
    supportedLocales,
    isLoading,
    commonError,
    t,
    tInterpolate,
    commonTranslations,
    worksTranslations,
    postsTranslations,
    getHero,
    getAbout,
    getExperience,
    getSkills,
    getContact,
    getWorks,
    getPosts
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