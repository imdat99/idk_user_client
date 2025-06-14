import { hydrateRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider, createBrowserRouter, matchRoutes } from 'react-router';

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
  const lazyMatches = matchRoutes(routes, window.location)?.filter((m) => m.route.lazy)
// Load the lazy matches and update the routes before creating your router
// so we can hydrate the SSR-rendered content synchronously

if (typeof window === 'object' && lazyMatches && lazyMatches?.length > 0) {
    await Promise.all(
        lazyMatches.map(async (m) => {
            if (m.route.lazy && typeof m.route.lazy === 'function') {
                const routeModule = await m.route.lazy()
                Object.assign(m.route, {
                    ...routeModule,
                    lazy: undefined,
                })
            }
        })
    )
  }
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
