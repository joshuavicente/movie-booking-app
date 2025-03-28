import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { delay } from "../utils/delayHelper";

export const Logout = () => {
  const { logout } = useBooking();
  const navigate = useNavigate();

  const hasLoggedOut = useRef(false); // Prevent multiple calls to logout()

  useEffect(() => {
    let isMounted = true; // Prevent navigation after component unmount

    const logoutAndRedirect = async () => {
      if (!hasLoggedOut.current) {
        logout(); // Clear user + bookings from context
        hasLoggedOut.current = true;
      }

      await delay(1000); // Simulate delay for spinner visibility

      if (isMounted) {
        navigate("/"); // Redirect to login
      }
    };

    logoutAndRedirect();

    // Cleanup to prevent state updates on unmounted component
    return () => {
      isMounted = false;
    };
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
