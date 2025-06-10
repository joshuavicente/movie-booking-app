import { createRoute, redirect } from "@tanstack/react-router";
import { RootRoute } from "./__root";
import { MyBookings } from "../pages/MyBookings";

export const MyBookingsRoute = createRoute({
  path: '/my-bookings',
  getParentRoute: () => RootRoute,

  // Protected route - this runs before the route ever loads:
  beforeLoad: ({ context }) => {
    if (!context.booking.isLoggedIn) {
      throw redirect({ to: '/login' });
    }
  },
  
  component: MyBookings
});