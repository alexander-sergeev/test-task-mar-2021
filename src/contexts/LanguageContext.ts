import React from 'react';

export const LANGUAGE_INITIAL_STATE = {
  language: 'en',
  changeLang: (lang: string) => {},
};

const LanguageContext = React.createContext(LANGUAGE_INITIAL_STATE);

export default LanguageContext;
