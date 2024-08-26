import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend'; // Import the HTTP backend

i18n
  .use(HttpBackend) // Use the HTTP backend
  .use(initReactI18next)
  .init({
    backend: {
     
      loadPath: '/locales/{{lng}}/translation.json',
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
  });

export default i18n;

