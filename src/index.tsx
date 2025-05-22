import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { HelmetProvider } from "react-helmet-async";

import { startTransition } from "react";
import "./index.css";
import "@unocss/reset/tailwind.css";
import "uno.css";
import { SWRConfig } from "swr";
import { useEnhancedFetch } from "lib/fetcher";
import { I18nextProvider } from "react-i18next";
import i18n from "Translation";
render().catch(console.error);
async function render() {
  const routes = (await import("./routes")).default;
  const router = createBrowserRouter(routes);
  startTransition(function () {
    ReactDOM.createRoot(document.body).render(
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
