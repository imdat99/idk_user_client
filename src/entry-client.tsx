import { hydrateRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider, createBrowserRouter } from 'react-router';

import i18n from 'Translation';
import { useEnhancedFetch } from 'lib/fetcher';
import { startTransition } from 'react';
import { I18nextProvider } from 'react-i18next';
import { SWRConfig } from 'swr';
import 'uno.css';
render()
  .then((Vnode) => {
    startTransition(() => {
      hydrateRoot(document.body, Vnode);
    });
    // createRoot(document.body).render(Vnode);
  })
  .catch(console.error);
async function render(): Promise<React.ReactNode> {
  const routes = (await import('./routes')).default;
  const router = createBrowserRouter(routes);
  return (
    <HelmetProvider>
      <I18nextProvider i18n={i18n}>
        <SWRConfig
          value={{ provider: () => new Map(), fetcher: useEnhancedFetch() }}
        >
          <RouterProvider router={router} />
        </SWRConfig>
      </I18nextProvider>
    </HelmetProvider>
  );
}
