import { useBooking } from "../context/BookingContext";
import { useState } from "react";
import { Booking } from "../model/bookingModel";
import { LoadingSpinner } from "../components/LoadingSpinner";
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
              <div
                key={booking.id}
                className="rounded-lg bg-white shadow-md p-5 border border-gray-200"
                aria-label={`Booking card for ${booking.movieTitle}`}
              >
                <h2 className="text-lg font-semibold mb-2">
                  {booking.movieTitle}
                </h2>
                <p className="text-gray-600 mb-1">
                  Showtime: {booking.showtime}
                </p>
                <p className="text-gray-600 mb-3">
                  Seat Count: {booking.seatCount}
                </p>

                <label
                  htmlFor={`update-${booking.id}`}
                  className="text-sm block mb-1"
                >
                  Update Seat Count (Max 10):
                </label>
                <input
                  id={`update-${booking.id}`}
                  type="number"
                  min={1}
                  max={10}
                  value={seatUpdates[booking.id] ?? booking.seatCount}
                  onChange={(e) =>
                    setSeatUpdates((prev) => ({
                      ...prev,
                      [booking.id]: Math.min(Number(e.target.value), 10),
                    }))
                  }
                  className="mb-2 w-24 rounded border p-1 text-sm"
                />
                <button
                  onClick={() => handleUpdateBooking(booking)}
                  disabled={
                    // Prevent double clicks during update and if the seat count is unchanged
                    updatingId === booking.id ||
                    seatUpdates[booking.id] === undefined ||
                    seatUpdates[booking.id] === booking.seatCount
                  }
                  className="mb-2 w-full rounded bg-blue-600 text-white py-2 hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  Update Booking
                </button>

                <button
                  onClick={() => handleCancelBooking(booking.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleCancelBooking(booking.id);
                  }}
                  disabled={cancellingId === booking.id} // Prevent double clicks during cancellation
                  className="w-full rounded bg-red-500 text-white py-2 hover:bg-red-600 transition disabled:opacity-50"
                >
                  Cancel Booking
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
};
