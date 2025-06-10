import { createRoute, redirect } from "@tanstack/react-router";
import { RootRoute } from "./__root";
import { MyBookings } from "../pages/MyBookings";

export const MyBookingsRoute = createRoute({
  path: '/my-bookings',
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
  
  component: MyBookings
});