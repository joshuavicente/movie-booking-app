import { memo } from "react";
import { BookingCardProps } from "../model/bookingModel";

// This component displays a single booking card with seat update and cancellation controls
const BookingCardComponent = ({
  booking,
  seatCount,
  isUpdating,
  isCancelling,
  onSeatChange,
  onUpdate,
  onCancel,
}: BookingCardProps) => {
  return (
    <div
      className="rounded-lg bg-white shadow-md p-5 border border-gray-200"
      aria-label={`Booking card for ${booking.movieTitle}`}
    >
      {/* Movie title */}
      <h2 className="text-lg font-semibold mb-2">{booking.movieTitle}</h2>

      {/* Showtime and seat count */}
      <p className="text-gray-600 mb-1">Showtime: {booking.showtime}</p>
      <p className="text-gray-600 mb-3">Seat Count: {booking.seatCount}</p>

      {/* Seat update input */}
      <label htmlFor={`update-${booking.id}`} className="text-sm block mb-1">
        Update Seat Count (Max 10):
      </label>
      <input
        id={`update-${booking.id}`}
        type="number"
        min={1}
        max={10}
        value={seatCount}
        onChange={(e) => onSeatChange(Math.min(Number(e.target.value), 10))}
        className="mb-2 w-24 rounded border p-1 text-sm"
      />

      {/* Update booking button */}
      <button
        onClick={onUpdate}
        disabled={isUpdating || seatCount === booking.seatCount}
        className="mb-2 w-full rounded bg-blue-600 text-white py-2 hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
      >
        Update Booking
      </button>

      {/* Cancel booking button */}
      <button
        onClick={onCancel}
        onKeyDown={(e) => e.key === "Enter" && onCancel()}
        disabled={isCancelling}
        className="w-full rounded bg-red-500 text-white py-2 hover:bg-red-600 transition disabled:opacity-50"
      >
        Cancel Booking
      </button>
    </div>
  );
};

// Memoize the BookingCardComponent to optimize performance by avoiding unnecessary re-renders
export const BookingCard = memo(BookingCardComponent);
