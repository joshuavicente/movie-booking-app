import { createRoute, redirect } from "@tanstack/react-router";
import { RootRoute } from "./__root";
import { Home } from "../pages/Home";

export const HomeRoute = createRoute({
  path: '/home',
  getParentRoute: () => RootRoute,

  // Runs before the route ever loads:
  beforeLoad: ({ context, location }) => {
    if (!context.booking.isLoggedIn) {
      throw redirect({
        to: '/login',
         // stash original URL so can redirect back after login
        search: { redirect: location.href },
      })
    }
  },

  component: Home,
});