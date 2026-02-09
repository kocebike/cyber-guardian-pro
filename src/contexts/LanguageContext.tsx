import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations, countryToLanguage, languageNames } from '@/lib/i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  availableLanguages: typeof languageNames;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('bg'); // Default to Bulgarian
  const [isDetected, setIsDetected] = useState(false);

  useEffect(() => {
    // Check localStorage first
    const savedLang = localStorage.getItem('preferredLanguage') as Language;
    if (savedLang && translations[savedLang]) {
      setLanguage(savedLang);
      setIsDetected(true);
      return;
    }

    // Detect language from IP
    const detectLanguage = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const countryCode = data.country_code;
        
        if (countryCode && countryToLanguage[countryCode]) {
          setLanguage(countryToLanguage[countryCode]);
        }
        // If no match, keep Bulgarian as default
      } catch (error) {
        console.log('Could not detect location, using default language');
      } finally {
        setIsDetected(true);
      }
    };

    detectLanguage();
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  const t = (key: string): string => {
    const langTranslations = translations[language];
    if (langTranslations && langTranslations[key]) {
      return langTranslations[key];
    }
    // Fallback to Bulgarian
    if (translations.bg[key]) {
      return translations.bg[key];
    }
    // Fallback to English
    if (translations.en[key]) {
      return translations.en[key];
    }
    return key;
  };

  if (!isDetected) {
    return null; // Or a loading spinner
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, availableLanguages: languageNames }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
