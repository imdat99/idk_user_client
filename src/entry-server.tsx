import type { Rspack, RsbuildDevServer } from "@rsbuild/core";
import ReactDOMServer from "react-dom/server.edge";
import { tinyassert } from "@hiogawa/utils";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
  type RouterContextProvider,
} from "react-router";
import routes from "routes";
import { I18nextProvider, useTranslation } from "react-i18next";
import { getInstance, i18nextMiddleware } from "Translation/server";
import { Hono } from "hono";

export const handler = new Hono();
declare let __rsbuild_server__: RsbuildDevServer;
handler.use(async (c) => {
  const request = c.req.raw;
  const statsJson = await getStatsJson();
  const { query, dataRoutes } = createStaticHandler(routes);
  //   const remixRequest = await createFetchRequest(request);
  const context = await query(request);
  if (context instanceof Response) {
    return context;
  }
  const router = createStaticRouter(dataRoutes, context);
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
  const getContext = await new Promise<RouterContextProvider>(
    (resolve) => {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const routerContextProvider: any = {
        get: (key: string) => {
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          return (routerContextProvider as any)[key];
        },
      };
      i18nextMiddleware(
        {
          request,
          context: {
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            set: (key: string, value: any) => {
              Object.assign(routerContextProvider, {
                [key]: value,
              });
            },
          } as RouterContextProvider,
          params: {},
        },
        (() => {
          resolve(routerContextProvider);
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        }) as any
      );
    }
  );
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const root = (
      <I18nextProvider i18n={getInstance(getContext)}>
        <Root styles={styles}>
          <StaticRouterProvider
            router={router}
            context={context}
            nonce="the-nonce"
          />
        </Root>
      </I18nextProvider>
  );
  const htmlStream = await ReactDOMServer.renderToReadableStream(root, {
    bootstrapScripts: scripts,
  });
  // console.log("helmetContext", Object.values(helmetContext.helmet).map((h) => h.toComponent()));
  return new Response(htmlStream
  //   .pipeThrough(new TransformStream({
  //   transform(chunk, controller) {
  //     // Giả sử chunk là text
  //     const text = new TextDecoder().decode(chunk);
  //     const modifiedText = text.replace(/<\/head>/g, `${Object.values(helmetContext.helmet).map((h) => h.toString()).join("")}</head>`); // sửa dữ liệu
  //     controller.enqueue(new TextEncoder().encode(modifiedText));
  //   }
  // })
  // )
  , {
    headers: {
      "content-type": "text/html",
    },
  });
});
// async function handler(request: Request): Promise<Response> {

// }

async function getStatsJson(): Promise<Rspack.StatsCompilation> {
  if (import.meta.env.DEV) {
    const stats = await __rsbuild_server__.environments.web.getStats();
    return stats.toJson();
    // biome-ignore lint/style/noUselessElse: <explanation>
  } else {
    const { default: statsJson } = await import(
      /* webpackMode: "eager" */ "../dist/__client_stats.mjs" as string
    );
    return statsJson;
  }
}

function Root(props: { styles: string[]; children?: React.ReactNode }) {
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
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          {props.styles.map((href) => (
            <link key={href} rel="stylesheet" href={href} />
          ))}
        </head>
        <body>{props.children}</body>
      </html>
    </>
  );
}
export default handler;