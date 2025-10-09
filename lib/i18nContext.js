import React, { createContext, useContext, useMemo, useCallback } from 'react';
import useLocaleDetection from './useLocaleDetection';
import useTranslations from './useTranslations';

const I18nContext = createContext();

const I18nProviderComponent = ({ children }) => {
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

  // Simplified helper functions - only create if translations exist
  const getHero = useCallback(() => commonTranslations?.hero || {}, [commonTranslations?.hero]);
  const getAbout = useCallback(() => commonTranslations?.about || {}, [commonTranslations?.about]);
  const getExperience = useCallback(() => commonTranslations?.experience || {}, [commonTranslations?.experience]);
  const getSkills = useCallback(() => commonTranslations?.skills || {}, [commonTranslations?.skills]);
  const getContact = useCallback(() => commonTranslations?.contact || {}, [commonTranslations?.contact]);
  const getWorks = useCallback(() => worksTranslations?.works || {}, [worksTranslations?.works]);
  const getPosts = useCallback(() => postsTranslations?.posts || {}, [postsTranslations?.posts]);

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
    getHero,
    getAbout,
    getExperience,
    getSkills,
    getContact,
    getWorks,
    getPosts
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

I18nProviderComponent.displayName = 'I18nProvider';

export const I18nProvider = React.memo(I18nProviderComponent);

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

export default I18nContext;