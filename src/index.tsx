import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { HelmetProvider } from "react-helmet-async";

import "@unocss/reset/tailwind.css";
import "uno.css";
import { SWRConfig } from "swr";
import { useEnhancedFetch } from "lib/fetcher";
import { I18nextProvider } from "react-i18next";
import i18n from "Translation";
render().then((Vnode) => {
  createRoot(document.body).render(Vnode);
}).catch(console.error);
async function render(): Promise<React.ReactNode> {
  const routes = (await import("./routes")).default;
  const router = createBrowserRouter(routes);
  return (<I18nextProvider i18n={i18n}>
    <HelmetProvider>
      <SWRConfig value={{ provider: () => new Map(), fetcher: useEnhancedFetch() }}>
        <RouterProvider router={router} />
      </SWRConfig>
    </HelmetProvider>
  </I18nextProvider>);
}
