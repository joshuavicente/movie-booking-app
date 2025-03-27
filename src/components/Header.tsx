import { NavLink } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

export const Header = () => {
  const { isLoggedIn, user } = useBooking();

  // Don’t show header if not logged in
  if (!isLoggedIn) return null;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* App title */}
      <div className="text-xl font-bold">🎟️ Movie Booking App</div>

      {/* Navigation Links */}
      <div className="flex gap-6 items-center">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold"
              : "text-gray-700 hover:text-blue-500"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/my-bookings"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold"
              : "text-gray-700 hover:text-blue-500"
          }
        >
          My Bookings
        </NavLink>
        <NavLink to="/logout" className="text-gray-700 hover:text-red-500">
          Logout
        </NavLink>
      </div>

      {/* Logged in user info */}
      <div className="text-sm text-gray-600 italic">
        Logged in as <span className="font-semibold">{user?.username}</span>
      </div>
    </nav>
  );
};
