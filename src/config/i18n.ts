import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './translations/en.json';
import ua from './translations/ua.json';
import ru from './translations/ru.json';

const LOCAL_STORAGE_LANG_KEY = 'lang';

const localStorageLang = window.localStorage.getItem(LOCAL_STORAGE_LANG_KEY);
const browserLang = window.navigator?.language.substr(0, 2).toLowerCase();
const language = localStorageLang ?? browserLang;

const translations = {
  en: {
    translation: en,
  },
  ua: {
    translation: ua,
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
    code: 'ua',
  },
  {
    name: 'Русский',
    code: 'ru',
  },
];

i18n.use(initReactI18next).init({
  resources: translations,
  lng: language,
  fallbackLng: 'en',
});

i18n.on('languageChanged', (lang) => {
  localStorage.setItem(LOCAL_STORAGE_LANG_KEY, lang);
});

export default i18n;
