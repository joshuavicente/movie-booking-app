import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { MyBookings } from "../pages/MyBookings";
import { Logout } from "../pages/Logout";
import { NotFound } from "../pages/NotFound";
import { ProtectedRoute } from "./ProtectedRoute";

// Defines the route structure of the app
export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public route: Login */}
      <Route path="/" element={<Login />} />

      {/* Protected routes (require login) */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-bookings"
        element={
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
        }
      />

      {/* Public route: Logout + wildcard fallback */}
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
