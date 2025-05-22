import { Outlet, RouteObject } from 'react-router'
import { createElement as _c } from 'react'
import Error from './components/Error'
import { authPath } from 'lib/constants'
import RootLayout from 'components/RootLayout'
const routes: RouteObject[] = [
    {
        ErrorBoundary: Error,
        HydrateFallback: () =>
            _c('div', { className: 'h-screen' }, 'Loading...'),
        Component: RootLayout,
        children: [
            {
                path: '/',
                ErrorBoundary: Error,
                element: _c(Outlet),
                children: [
                    {
                        index: true,
                        lazy: async () => ({
                            Component: (await import('./features/Home'))
                                .default,
                        }),
                    },
                ],
            },
            {
                ErrorBoundary: Error,
                lazy: async () => ({
                    Component: (await import('./features/Auth')).default,
                }),
                children: [
                    {
                        path: authPath.login,
                        lazy: async () => ({
                            Component: (await import('./features/Auth/Login'))
                                .default,
                        }),
                    },
                    {
                        path: authPath.register,
                        lazy: async () => ({
                            Component: (
                                await import('./features/Auth/Register')
                            ).default,
                        }),
                    },
                    {
                        path: authPath.forgotPassword,
                        lazy: async () => ({
                            Component: (await import('./features/Auth/Forgot'))
                                .default,
                        }),
                    },
                ],
            },
        ],
    },
]
export default routes
