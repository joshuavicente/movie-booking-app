import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const Logout = () => {
  const { logout } = useBooking();
  const navigate = useNavigate();

  const hasLoggedOut = useRef(false); // Only logout once to prevent rendering loop

  useEffect(() => {
    if (!hasLoggedOut.current) {
      logout(); // Clear user + bookings
      hasLoggedOut.current = true;
    }

    const timeout = setTimeout(() => {
      navigate("/"); // Redirect to login
    }, 1000); // Slight delay so spinner shows

    return () => clearTimeout(timeout); // Cancels the timeout by returning the function if the component unmounts before it fires
  }, [logout, navigate]);

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-gray-100"
      aria-label="Logging out page"
    >
      <div className="flex flex-col items-center justify-center gap-3 h-40">
        <LoadingSpinner />
        <output className="text-gray-700 text-lg" aria-live="polite">
          Logging out...
        </output>
      </div>
    </main>
  );
};
