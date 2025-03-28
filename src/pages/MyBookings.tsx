import { useBooking } from "../context/BookingContext";
import { useState } from "react";
import { Booking } from "../model/bookingModel";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { BookingCard } from "../components/BookingCard";
import { delay } from "../utils/delayHelper";

export const MyBookings = () => {
  const { bookings, cancelBooking, updateBooking } = useBooking();
  const [seatUpdates, setSeatUpdates] = useState<Record<string, number>>({});
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const handleUpdateBooking = async (booking: Booking) => {
    const updatedCount = seatUpdates[booking.id] ?? booking.seatCount;
    setUpdatingId(booking.id);
    await delay(1000); // Simulate a network delay
    updateBooking(booking.id, { seatCount: updatedCount });
    alert("Booking updated successfully");
    setSeatUpdates((prev) => {
      const updated = { ...prev };
      delete updated[booking.id];
      return updated;
    });
    setUpdatingId(null); // Reset the updating state for the next action
  };

  const handleCancelBooking = async (bookingId: string) => {
    setCancellingId(bookingId);
    await delay(1000); // Simulate a network delay
    cancelBooking(bookingId);
    alert("Cancelled booking successfully");
    setCancellingId(null); // Reset the cancelling state for the next action
  };

  return (
    <main className="p-6" role="main">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>

      {/* Show message if there are no bookings */}
      {bookings.length === 0 ? (
        <p className="text-gray-600" aria-live="polite">
          You have no bookings yet.
        </p>
      ) : (
        <>
          {/* Show spinner if a button action is made (Update or Cancel) */}
          {(updatingId || cancellingId) && (
            <div className="flex justify-center mb-4">
              <LoadingSpinner />
            </div>
          )}
          <div
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            aria-label="List of booked movies"
          >
            {bookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                seatCount={seatUpdates[booking.id] ?? booking.seatCount}
                isUpdating={updatingId === booking.id}
                isCancelling={cancellingId === booking.id}
                onSeatChange={(value) =>
                  setSeatUpdates((prev) => ({ ...prev, [booking.id]: value }))
                }
                onUpdate={() => handleUpdateBooking(booking)}
                onCancel={() => handleCancelBooking(booking.id)}
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
};
