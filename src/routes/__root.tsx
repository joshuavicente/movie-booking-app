import { Outlet, createRootRouteWithContext  } from "@tanstack/react-router";
import type { BookingContextType } from "../model/ContextModel";
import { App } from "../App";

export const RootRoute = createRootRouteWithContext<{
  booking: BookingContextType;
}>()({
  component: () => (
    <App>
      <Outlet />
    </App>
  ),
});