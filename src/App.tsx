import { ReactNode } from "react";
import { Header } from "./components/Header";

type AppProps = {
  children: ReactNode;
};

// Root component that sets up global layout and routing
export const App = ({ children }: AppProps) => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header is always rendered but hidden when not logged in */}
      <Header />

      {/* Render route-based content */}
      {children}
    </div>
  );
};
