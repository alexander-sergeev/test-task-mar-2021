import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          'Home link': 'Home',
          'Login link': 'Login',
          'Your position on map': 'Your current geoposition',
          'Allow access to geolocation': 'Please, allow access to your geolocation',
        }
      }
    },
    lng: 'en',
    fallbackLng: 'en',
  });


export default i18n;
