import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';

import { startTransition } from 'react';
import '@unocss/reset/tailwind.css'
import 'uno.css';
import { SWRConfig } from 'swr';
import { useEnhancedFetch } from 'lib/fetcher';
const rootEl = document.getElementById('root');
render().catch(console.error);
async function render() {
  const routes = (await import('./routes')).default
  const router = createBrowserRouter(routes)
  if (rootEl) {
    const root = ReactDOM.createRoot(rootEl);
    startTransition(function () {
      root.render(
        <HelmetProvider>
          <SWRConfig value={{ provider: () => new Map(), fetcher: useEnhancedFetch() }}>
            <RouterProvider
              router={router}
            />
          </SWRConfig>
        </HelmetProvider>

      );
    })
  }
}