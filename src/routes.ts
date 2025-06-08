import { Outlet, RouteObject } from 'react-router'
import { createElement as _c } from 'react'
import Error from './components/Error'
import { authPath, PolicyPath } from 'lib/constants'
import RootLayout from 'components/RootLayout'
import FullyLoading from 'components/FullyLoading'
const routes: RouteObject[] = [
    {
        ErrorBoundary: Error,
        HydrateFallback: () => _c(FullyLoading),
        Component: RootLayout,
        children: [
            {
                path: '/',
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
                    }
                ],
            }

        ],
    },
]
export default routes
