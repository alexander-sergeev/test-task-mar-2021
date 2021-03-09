import React, { createContext, useContext, useEffect, useState } from 'react';
import i18n, {
  isSupportedLanguage,
  localStorageLang,
  LOCAL_STORAGE_LANG_KEY,
} from '../config/i18n';
import { useAuth } from './AuthContext';

interface LanguageContextState {
  language: string;
  changeLang: (lang: string) => void;
}

export const INITIAL_STATE: LanguageContextState = {
  language: i18n.language,
  changeLang: (lang: string) => {},
};

const LanguageContext = createContext<LanguageContextState>(INITIAL_STATE);

export type LanguageProviderProps = {
  children: React.ReactNode;
};

export const LanguageProvider = (props: LanguageProviderProps) => {
  const [state, setState] = useState(INITIAL_STATE);
  const { profile } = useAuth();

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem(LOCAL_STORAGE_LANG_KEY, lang);
    setState((s) => ({
      ...s,
      language: lang,
    }));
  };

  useEffect(() => {
    if (
      profile != null &&
      isSupportedLanguage(profile.locale) &&
      !localStorageLang
    ) {
      changeLang(profile.locale);
    }
  }, [profile]);

  return (
    <LanguageContext.Provider
      value={{
        ...state,
        changeLang,
      }}
    >
      {props.children}
    </LanguageContext.Provider>
  );
};

export const LanguageConsumer = LanguageContext.Consumer;

export const useLang = () => useContext(LanguageContext);
