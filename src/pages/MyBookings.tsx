import { useBooking } from "../context/BookingContext";

export const MyBookings = () => {
  const { bookings, cancelBooking } = useBooking();

  const handleCancelBooking = (bookingId: string) => {
    cancelBooking(bookingId);
    alert("Cancelled booking successfully");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>

      {/* Show message if there are no bookings */}
      {bookings.length === 0 ? (
        <p className="text-gray-600">You have no bookings yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-lg bg-white shadow-md p-5 border border-gray-200"
            >
              <h2 className="text-lg font-semibold mb-2">
                {booking.movieTitle}
              </h2>
              <p className="text-gray-600 mb-1">Showtime: {booking.showtime}</p>
              <p className="text-gray-600 mb-3">
                Seat Count: {booking.seatCount}
              </p>
              <button
                onClick={() => handleCancelBooking(booking.id)}
                className="w-full rounded bg-red-500 text-white py-2 hover:bg-red-600 transition"
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
