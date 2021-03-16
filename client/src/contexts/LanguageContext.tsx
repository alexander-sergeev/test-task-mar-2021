import React, { createContext, useContext, useEffect, useState } from 'react';
import i18n, {
  browserLang,
  isSupportedLanguage,
  localStorageLang,
  LOCAL_STORAGE_LANG_KEY,
} from '../config/i18n';
import { useAuth } from './AuthContext';

interface LanguageContextState {
  language: string;
  changeLang: (lang: string, storeChoice: boolean) => void;
}

export const INITIAL_STATE: LanguageContextState = {
  language: i18n.language,
  changeLang: (lang: string, storeChoice: boolean) => {},
};

const LanguageContext = createContext<LanguageContextState>(INITIAL_STATE);

export type LanguageProviderProps = {
  children: React.ReactNode;
};

export const LanguageProvider = (props: LanguageProviderProps) => {
  const [state, setState] = useState(INITIAL_STATE);
  const { profile } = useAuth();

  const changeLang = (lang: string, storeChoice = false) => {
    i18n.changeLanguage(lang);
    if (storeChoice) {
      localStorage.setItem(LOCAL_STORAGE_LANG_KEY, lang);
    }
    setState((s) => ({
      ...s,
      language: lang,
    }));
  };

  useEffect(() => {
    if (localStorageLang != null) {
      return;
    }
    if (profile != null && isSupportedLanguage(profile.locale)) {
      changeLang(profile.locale, false);
    } else {
      changeLang(browserLang);
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
