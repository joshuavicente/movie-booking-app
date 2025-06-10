import { createRoute } from "@tanstack/react-router";
import { RootRoute } from "./__root";
import { NotFound } from "../pages/NotFound";

export const NotFoundRoute = createRoute({
  path: '*',
  getParentRoute: () => RootRoute,
  component: NotFound,
});