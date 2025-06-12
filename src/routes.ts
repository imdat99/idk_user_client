import { Outlet } from 'react-router';
import type { RouteObject } from 'react-router';
import { createElement as _c } from 'react';
import { authPath, dashboardPath, PolicyPath } from 'lib/constants';
import RootLayout from 'components/RootLayout';
import FullyLoading from 'components/FullyLoading';
import ErrorScreen from 'components/Error';
import DashboardLayout from 'components/DashboardLayout';
const routes: RouteObject[] = [
  {
    ErrorBoundary: ErrorScreen,
    HydrateFallback: () => _c(FullyLoading),
    Component: RootLayout,
    children: [
      {
        path: '/',
        element: _c(DashboardLayout),
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
            })
          },
          {
            path: "/:detailPath/detail",
            Component: () => _c("div", { className: "p-6" }, "Settings Page"),
          }
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
        lazy: async () => ({
          Component: (await import('./components/NotfoundPage')).default,
        }),
      }
    ],
  },
];
export default routes;
