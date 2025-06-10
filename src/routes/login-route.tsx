import { createRoute } from "@tanstack/react-router";
import { RootRoute } from "./__root";
import { Login } from "../pages/Login";

export const LoginRoute = createRoute({
  path: '/login',
  getParentRoute: () => RootRoute,
  component: Login,
});
