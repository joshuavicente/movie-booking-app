import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes";
import "./index.css";
import { BookingProvider, useBooking } from "./context/BookingContext";

export function RouterWithBookingContext() {
  const booking =  useBooking();
  return <RouterProvider router={router} context={{ booking }} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BookingProvider>
      <RouterWithBookingContext />
    </BookingProvider>
  </StrictMode>
);
