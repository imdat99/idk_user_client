import { Outlet, RouteObject } from "react-router";
import { createElement as _c } from "react";
import Error from "./components/Error";
const routes: RouteObject[] = [
  {
    path: "/",
    ErrorBoundary: Error,
    element: _c(Outlet),
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import("./features/Home")).default,
        }),
      },
    ],
  },
  {
    ErrorBoundary: Error,
    lazy: async () => ({
      Component: (await import("./features/Auth")).default,
    }),
    children: [
      {
        path: "/login",
        lazy: async () => ({
          Component: (await import("./features/Auth/Login")).default,
        }),
      },
      {
        path: "/signup",
        lazy: async () => ({
          Component: (await import("./features/Auth/Register")).default,
        }),
      },
    ],
  },
];
export default routes;
