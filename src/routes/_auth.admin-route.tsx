import { createRoute, redirect } from "@tanstack/react-router";
import { RootRoute } from "./__root";
import { Admin } from "../pages/Admin";

export const AdminRoute = createRoute({
  path: '/admin',
  getParentRoute: () => RootRoute,

  // Protected route - this runs before the route ever loads:
  beforeLoad: ({ context }) => {
    if (!context.booking.isLoggedIn && !context.booking.user?.role?.includes('admin')) {
      throw redirect({ to: '/login' });
    }
  },

  component: Admin,
});