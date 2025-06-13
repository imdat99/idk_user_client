import DashboardLayout from 'components/DashboardLayout';
import ErrorScreen from 'components/Error';
import FullyLoading from 'components/FullyLoading';
import NotfoundPage from 'components/NotfoundPage';
import RootLayout from 'components/RootLayout';
import { PolicyPath, authPath, dashboardPath } from 'lib/constants';
import { createElement as _c } from 'react';
import type { RouteObject } from 'react-router';
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
        children: [
          {
            path: authPath.login,
            lazy: async () => ({
              Component: (await import('./features/Auth/Login')).default,
            }),
          },
          {
            path: authPath.register,
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
