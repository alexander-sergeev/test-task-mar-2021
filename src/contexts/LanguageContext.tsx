import React, { createContext, useContext, useState } from 'react';
import i18n from '../i18n';

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

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
    setState((s) => ({
      ...s,
      language: lang,
    }));
  };

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
