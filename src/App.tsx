import { AppRoutes } from "./routes/AppRoutes";
import { Header } from "./components/Header";

// Root component that sets up global layout and routing
export const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header is always rendered but hidden when not logged in */}
      <Header />

      {/* Render route-based content */}
      <AppRoutes />
    </div>
  );
};
