import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './translations/en.json';
import uk from './translations/uk.json';
import ru from './translations/ru.json';

export const LOCAL_STORAGE_LANG_KEY = 'lang';

export const localStorageLang = window.localStorage.getItem(
  LOCAL_STORAGE_LANG_KEY,
);
const browserLang = window.navigator?.language.substr(0, 2).toLowerCase();
const language = localStorageLang ?? browserLang;

const translations = {
  en: {
    translation: en,
  },
  uk: {
    translation: uk,
  },
  ru: {
    translation: ru,
  },
};

export const LANGUAGES = [
  {
    name: 'English',
    code: 'en',
  },
  {
    name: 'Українська',
    code: 'uk',
  },
  {
    name: 'Русский',
    code: 'ru',
  },
];

export const isSupportedLanguage = (langCode: string) => {
  return LANGUAGES.find(({ code }) => langCode === code) != null;
};

i18n.use(initReactI18next).init({
  resources: translations,
  lng: language,
  fallbackLng: 'en',
});

export default i18n;
