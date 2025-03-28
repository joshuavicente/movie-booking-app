import { Navigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { JSX } from "react";

// Route guard for protecting routes from unauthorized access
export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useBooking(); // Check login state from context

  // Redirect to login if user is not authenticated
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // Render protected child route
  return children;
};
