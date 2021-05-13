import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en_translations from './locales/en/translations.json';
import de_translations from './locales/de/translations.json';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  resources: {
    en: {
      translations: en_translations
    },
    de: {
      translations: de_translations
    }
  },
  ns: ['translations'],
  defaultNS: 'translations'
});

i18n.languages = ['en', 'de'];

export default i18n;