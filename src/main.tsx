import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { BookingProvider } from "./context/BookingContext";

// Entry point: bootstraps the React app and wraps it with required providers
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Enables client-side routing */}
    <BrowserRouter>
      {/* Provides global booking state context */}
      <BookingProvider>
        {/* Renders app layout and route logic */}
        <App />
      </BookingProvider>
    </BrowserRouter>
  </StrictMode>
);
