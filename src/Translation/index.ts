import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend, { HttpBackendOptions } from 'i18next-http-backend';
// import i18n from "i18next";
// import translationsVI from '../../public/translations.json'
// import translationsEN from '../../public/translations-en.json'
import { initReactI18next } from 'react-i18next';
export const languages = ['vi', 'en'];
declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}
const i18n = i18next.createInstance();

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    ns: ['common'], // namespace mặc định
    supportedLngs: languages, // danh sách ngôn ngữ hỗ trợ
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // dynamic fetch JSON
    },
    detection: {
      order: ['cookie'],
      caches: ['cookie'],
    },
    react: {
      useSuspense: true, // quan trọng để lazy load hoạt động mượt
    },
  });

export default i18n;
