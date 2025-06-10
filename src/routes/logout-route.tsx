import { createRoute } from "@tanstack/react-router";
import { RootRoute } from "./__root";
import { Logout } from "../pages/Logout";

export const LogoutRoute = createRoute({
  path: '/logout',
  getParentRoute: () => RootRoute,
  component: Logout,
});
