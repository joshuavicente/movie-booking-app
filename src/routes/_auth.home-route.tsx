import { createRoute, redirect } from "@tanstack/react-router";
import { RootRoute } from "./__root";
import { Home } from "../pages/Home";

export const HomeRoute = createRoute({
  path: '/home',
  getParentRoute: () => RootRoute,

  // Protected route - this runs before the route ever loads:
  beforeLoad: ({ context }) => {
    if (!context.booking.isLoggedIn) {
      throw redirect({ to: '/login' });
    }
  },

  component: Home,
});