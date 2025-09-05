import DashboardLayout from 'components/DashboardLayout';
import ErrorScreen from 'components/Error';
import FullyLoading from 'components/FullyLoading';
import NotfoundPage from 'components/NotfoundPage';
import RootLayout from 'components/RootLayout';
import { PolicyPath, authPath, dashboardPath } from 'lib/constants';
import { runOnClient } from 'lib/utils';
import { createElement as _c } from 'react';
import { redirect, type RouteObject } from 'react-router';
const routes: RouteObject[] = [
  {
    ErrorBoundary: ErrorScreen,
    HydrateFallback: FullyLoading,
    Component: RootLayout,
    children: [
      {
        path: '/',
        Component: DashboardLayout,
        children: [
          {
            index: true,
            loader: () => redirect(dashboardPath.overview),
          },
          {
            path: dashboardPath.overview,
            lazy: async () => ({
              Component: (await import('./features/Home')).default,
            }),
          },
          {
            path: dashboardPath.personalInfo,
            lazy: async () => ({
              Component: (await import('./features/Profile')).default,
            }),
          },
          {
            path: '/:detailPath/detail',
            Component: () => _c('div', { className: 'p-6' }, 'Settings Page'),
          },
        ],
      },
      {
        lazy: async () => ({
          Component: (await import('./features/Auth')).default,
        }),
        path: "",
        children: [
          {
            path: authPath.login,
            lazy: async () => ({
              Component: (await import('./features/Auth/Login')).default,
            }),
          },
          {
            path: authPath.register,
            loader: runOnClient(async () => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve({
                    data: {
                      number: 1
                    }
                  });
                }, 3000); // Simulate a delay for loading
              })
            }),
            lazy: async () => ({
              Component: (await import('./features/Auth/Register')).default,
            }),
          },
          {
            path: authPath.forgotPassword,
            lazy: async () => ({
              Component: (await import('./features/Auth/Forgot')).default,
            }),
          },
        ],
      },
      {
        lazy: async () => ({
          Component: (await import('./features/Policy')).default,
        }),
        children: [
          {
            path: PolicyPath.privacy,
            lazy: async () => ({
              Component: (await import('./features/Policy/Privacy')).default,
            }),
          },
        ],
      },
      {
        path: '*',
        Component: NotfoundPage,
      },
    ],
  },
];
export default routes;
