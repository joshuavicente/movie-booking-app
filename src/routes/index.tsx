import {
  createRouter,
} from '@tanstack/react-router';
import { RootRoute } from './__root';
import { LoginRoute } from './login-route';
import { LogoutRoute } from './logout-route';
import { HomeRoute } from './_auth.home-route';
import { MyBookingsRoute } from './_auth.my-bookings-route';
import { NotFoundRoute } from './not-found-route';
import { AdminRoute } from './_auth.admin-route';

// Combine route tree
export const routeTree = (root: typeof RootRoute) => root.addChildren([
  LoginRoute,
  LogoutRoute,
  HomeRoute,
  MyBookingsRoute,
  AdminRoute,
  NotFoundRoute,
]);


export const router = createRouter({ 
  routeTree: routeTree(RootRoute),
  context: {
    booking: undefined!, // Placeholder - This will be set by the app's context provider
  }, 
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}