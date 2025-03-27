import { Navigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { JSX } from "react";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useBooking(); // If user is logged in, isLoggedIn will be true

  if (!isLoggedIn) {
    // Redirect to login page if user is not logged in
    return <Navigate to="/" replace />;
  }

  return children;
};
