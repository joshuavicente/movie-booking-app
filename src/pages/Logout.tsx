import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const Logout = () => {
  const { logout } = useBooking();
  const navigate = useNavigate();

  useEffect(() => {
    logout(); // Clear user + bookings
    const timeout = setTimeout(() => {
      navigate("/"); // Redirect to login
    }, 1000); // Slight delay so spinner shows

    return () => clearTimeout(timeout); // Cancels the timeout by returning the function if the component unmounts before it fires
  }, [logout, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center gap-3">
        <LoadingSpinner />
        <p className="text-gray-700 text-lg">Logging out...</p>
      </div>
    </div>
  );
};
