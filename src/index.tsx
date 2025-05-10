import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { HelmetProvider } from "react-helmet-async";

import { startTransition } from "react";
import "@unocss/reset/tailwind.css";
import "uno.css";
import { SWRConfig } from "swr";
import { useEnhancedFetch } from "lib/fetcher";
import { I18nextProvider } from "react-i18next";
import i18n from "Translation";
const rootEl = document.getElementById("root");
render().catch(console.error);
async function render() {
  const routes = (await import("./routes")).default;
  const router = createBrowserRouter(routes);
  if (rootEl) {
    const root = ReactDOM.createRoot(rootEl);
    startTransition(function () {
      root.render(
        <I18nextProvider i18n={i18n}>
          <HelmetProvider>
            <SWRConfig
              value={{ provider: () => new Map(), fetcher: useEnhancedFetch() }}
            >
              <RouterProvider router={router} />
            </SWRConfig>
          </HelmetProvider>
        </I18nextProvider>
      );
    });
  }
}
