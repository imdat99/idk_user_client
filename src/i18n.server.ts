import { resolve } from 'node:path';
// import Backend from 'i18next-fs-backend'
import { unstable_createI18nextMiddleware } from 'remix-i18next/middleware';

export const [i18nextMiddleware, getLocale, getInstance] =
  unstable_createI18nextMiddleware({
    detection: {
      // This is the list of languages your application supports
      supportedLanguages: ['vi', 'en'],
      // This is the language you want to use in case the user language is not
      // listed above
      fallbackLanguage: 'en',
    },
    // This is the configuration for i18next used when translating messages server
    // side only
    i18next: {
      backend: { loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json') },
    },
    // The backend you want to use to load the translations
    // Tip: You could pass `resources` to the `i18next` configuration and avoid
    // a backend here
  });
