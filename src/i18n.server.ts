// import { resolve } from 'node:path';
// import Backend from 'i18next-fs-backend'
import HttpBackend, { HttpBackendOptions } from 'i18next-http-backend'
import { unstable_createI18nextMiddleware } from 'remix-i18next/middleware'
declare let __host__: string
function getAllCookies(request: Request): Record<string, string> {
    const cookies = request.headers.get('cookie')
    if (!cookies) return {}
    return Object.fromEntries(
        cookies.split(';').map((cookie) => {
            const [key, value] = cookie.split('=')
            return [key.trim(), decodeURIComponent(value)]
        })
    )
}
const backendOptions: HttpBackendOptions = {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
    request: (_options, url, _payload, callback) => {
        fetch(__host__ + url)
            .then((res) =>
                res.json().then((r) => {
                    callback(null, {
                        data: JSON.stringify(r),
                        status: 200,
                    })
                })
            )
            .catch(() => {
                callback(null, {
                    status: 500,
                    data: '',
                })
            })
    },
}
export const [i18nextMiddleware, getLocale, getInstance] =
    unstable_createI18nextMiddleware({
        detection: {
            // This is the list of languages your application supports
            supportedLanguages: ['vi', 'en'],
            // This is the language you want to use in case the user language is not
            // listed above
            fallbackLanguage: 'en',
            findLocale: async (request: Request) => {
                ;(globalThis as any).__host__ =
                    new URL(request.url).origin || 'http://localhost:3000'
                const cookies = getAllCookies(request)
                return cookies['i18next'] || null
            },
            // cookie: localeCookie,
            // sessionStorage,
            // order: ['cookie'],
        },
        // This is the configuration for i18next used when translating messages server
        // side only
        i18next: {
            backend: backendOptions,
            fallbackLng: 'en',
            debug: false,
            ns: ['common'], // namespace mặc định
            supportedLngs: ['vi', 'en'], // danh sách ngôn ngữ hỗ trợ
            defaultNS: 'common',
        },
        plugins: [
            // Backend
            HttpBackend,
        ],
        // The backend you want to use to load the translations
        // Tip: You could pass `resources` to the `i18next` configuration and avoid
        // a backend here
    })
