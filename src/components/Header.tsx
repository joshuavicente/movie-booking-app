import { NavLink } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

// This component displays the header of the application with navigation links
export const Header = () => {
  const { isLoggedIn, user } = useBooking();

  // Don’t show header if not logged in
  if (!isLoggedIn) return null;

  return (
    <nav
      className="sticky top-0 z-50 bg-white shadow-md px-6 py-4 flex justify-between items-center"
      role="navigation"
      aria-label="Main Navigation"
    >
      {/* App title */}
      <div className="text-xl font-bold">🎟️ Movie Booking App</div>

      {/* Navigation links to Home, My Bookings, and Logout */}
      <div className="flex gap-6 items-center">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold"
              : "text-gray-700 hover:text-blue-500"
          }
          aria-label="Go to Home"
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
          aria-label="Go to My Bookings"
        >
          My Bookings
        </NavLink>
        <NavLink
          to="/logout"
          className="text-gray-700 hover:text-red-500"
          aria-label="Logout"
        >
          Logout
        </NavLink>
      </div>

      {/* Display currently logged in username */}
      <div
        className="text-sm text-gray-600 italic"
        aria-label={`Logged in as ${user?.username}`}
      >
        Logged in as <span className="font-semibold">{user?.username}</span>
      </div>
    </nav>
  );
};
