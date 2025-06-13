import type { Rspack, RsbuildDevServer } from "@rsbuild/core";
import ReactDOMServer from "react-dom/server.edge";
import { tinyassert } from "@hiogawa/utils";
import { createStaticHandler, createStaticRouter, StaticRouterProvider, type unstable_RouterContextProvider } from "react-router";
import routes from "routes";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { I18nextProvider, useTranslation, withSSR } from "react-i18next";
import { getInstance, i18nextMiddleware } from "i18n.server";
import { resolve } from "path";

declare let __rsbuild_server__: RsbuildDevServer;

export default async function handler(request: Request): Promise<Response> {
    const statsJson = await getStatsJson();
    const { query, dataRoutes } = createStaticHandler(routes)

    const remixRequest = await createFetchRequest(request)
    const context = await query(remixRequest)
    if (context instanceof Response) {
        throw context
    }
    const router = createStaticRouter(dataRoutes, context)
    const scripts: string[] = [];
    const styles: string[] = [];
    tinyassert(statsJson.assets);
    for (const { name } of statsJson.assets) {
        if (name.endsWith(".js") && !name.includes(".hot-update.js")) {
            scripts.push(`/${name}`);
        }
        if (name.endsWith(".css")) {
            styles.push(`/${name}`);
        }
    }
    
    const getContext = await new Promise<unstable_RouterContextProvider>((resolve) => {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const routerContextProvider: any = {
            get: (key: string) => {
                // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                return (routerContextProvider as any)[key];
            }
        }
        i18nextMiddleware({
        request: remixRequest,
        context: {
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            set: (key: string, value: any) => {
                Object.assign(routerContextProvider, {
                    [key]: value
                })
            },
        } as unstable_RouterContextProvider,
        params: {}
        }, 
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        (() => { resolve(routerContextProvider) }) as any);
    })
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const helmetContext: { helmet: HelmetServerState } = { helmet: {} as any }
    const root = <Root styles={styles}>
        <HelmetProvider context={helmetContext}>
            <I18nextProvider i18n={getInstance(getContext)}>

                <StaticRouterProvider
                    router={router}
                    context={context}
                    nonce="the-nonce"
                    />
                    </I18nextProvider>
            </HelmetProvider>
    </Root>;
    const htmlStream = await ReactDOMServer.renderToReadableStream(root, {
        // bootstrapScripts: scripts,
    });
    return new Response(htmlStream, {
        headers: {
            "content-type": "text/html",
        },
    });
}

async function getStatsJson(): Promise<Rspack.StatsCompilation> {
    if (import.meta.env.DEV) {
        const stats = await __rsbuild_server__.environments.web.getStats();
        return stats.toJson();
    // biome-ignore lint/style/noUselessElse: <explanation>
    } else {
        const { default: statsJson } = await import(/* webpackMode: "eager" */ "../dist/__client_stats.mjs" as string);
        return statsJson;
    }
}

function Root(props: { styles: string[], children?: React.ReactNode }) {
    const { i18n } = useTranslation();
    return (
        <>
            <html lang={i18n.language} dir={i18n.dir(i18n.language)}>
                <head>
                    <link
                        rel="apple-touch-icon"
                        sizes="192x192"
                        href="/assets/images/web-app-manifest-192x192.png"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="96x96"
                        href="/assets/images/favicon-96x96.png"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/assets/images/apple-touch-icon.png"
                    />
                    <link rel="manifest" href="/site.webmanifest" />
                    <link rel="icon" href="/assets/images/favicon.ico" />
                    <title>Xemdi - Xem phim online miễn phí</title>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                    />
                    <meta name="theme-color" content="#ffffff" />
                    <meta
                        name="description"
                        content="Xemdi - Your go-to platform for movie and TV show recommendations."
                    />
                    {props.styles.map((href) => (
					    <link key={href} rel="stylesheet" href={href} />
				    ))}
                </head>
                <body>
                        {props.children}
                </body>
            </html>

        </>
    );
}
async function createFetchRequest(request: Request): Promise<Request> {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const origin = `${(request.url.startsWith("https") ? "https" : "http")}://${(request.headers as any).host}`;

    const url = new URL(request.url, origin)
    // const controller = new AbortController()
    // request.on('close', () => {
    //     try {
    //         controller.abort()
    //     } catch (error) {
    //         console.error(error)
    //     }
    // })

    const headers = new Headers()

    for (const [key, values] of Object.entries(request.headers)) {
        if (values) {
            if (Array.isArray(values)) {
                for (const value of values) {
                    headers.append(key, value)
                }
            } else {
                headers.set(key, values)
            }
        }
    }

    const init: RequestInit = {
        method: request.method,
        headers,
        // signal: controller.signal,
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
        const body = await request.text()
        init.body = body || null
        // await readBody(request).then((body) => {
        //     init.body = body;
        // })
    }

    return new Request(url.href, init)
}