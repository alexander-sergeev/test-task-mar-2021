import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const LOCAL_STORAGE_LANG_KEY = 'lang';

const localStorageLang = window.localStorage.getItem(LOCAL_STORAGE_LANG_KEY);
const browserLang = window.navigator?.language.substr(0, 2).toLowerCase();
const language = localStorageLang ?? browserLang;

const translations = {
  en: {
    translation: {
      'Home link': 'Home',
      'Login link': 'Login',
      'Your position on map': 'Your current geoposition',
      'Allow access to geolocation': 'Please, allow access to your geolocation',
      'Error 404': 'Page not found | Error 404',
      'Change language': 'Change language',
    },
  },
  ua: {
    translation: {
      'Home link': 'Головна',
      'Login link': 'Увійти',
      'Your position on map': 'Ваша поточна місце розташування',
      'Allow access to geolocation': 'Будь ласка, надайте доступ до геолокації',
      'Error 404': 'Сторінка не знайдена | Помилка 404',
      'Change language': 'Змінити мову',
    },
  },
  ru: {
    translation: {
      'Home link': 'Главная',
      'Login link': 'Войти',
      'Your position on map': 'Ваше текущее местоположение',
      'Allow access to geolocation':
        'Пожалуйста, разрешите доступ к геолокации',
      'Error 404': 'Страница не найдена | Ошибка 404',
      'Change language': 'Сменить язык',
    },
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
