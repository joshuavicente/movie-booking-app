import { AppRoutes } from "./routes/AppRoutes";
import { Header } from "./components/Header";

export const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Header /> {/* Always rendered, hides itself if not logged in */}
      <AppRoutes />
    </div>
  );
};
