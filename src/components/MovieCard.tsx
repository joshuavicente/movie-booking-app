import { useState, memo } from "react";
import { useBooking } from "../context/BookingContext";
import { nanoid } from "nanoid";
import { MovieCardProps } from "../model/movieModel";

// This component displays a single movie card with booking options
const MovieCardComponent = ({ movie }: MovieCardProps) => {
  const { bookings, addBooking, movieSeatMap, user } = useBooking();
  const [seatCount, setSeatCount] = useState(1);

  // Get current available seats from seat map or fallback to initial value
  const availableSeats = movieSeatMap[movie.id] ?? movie.availableSeats;

  // Handle booking logic
  const handleBooking = () => {
    if (availableSeats < seatCount) {
      alert("Not enough seats available.");
      return;
    }

    // Prevent duplicate bookings for the same movie
    const existingBooking = bookings.find((b) => b.movieId === movie.id);
    if (existingBooking) {
      alert(
        "You've already booked this movie. Please update it from My Bookings."
      );
      return;
    }

    // Construct new booking and pass to context
    const newBooking = {
      id: nanoid(),
      movieId: movie.id,
      movieTitle: movie.title,
      showtime: movie.showtime,
      seatCount,
      availableSeats,
      username: user?.username ?? "",
      userId: user?.id ?? "",
    };

    addBooking(newBooking);
    alert(`Successfully booked ${seatCount} seat(s) for "${movie.title}"`);
    setSeatCount(1); // Reset seat count after booking
  };

  return (
    <fieldset
      className="w-[220px] h-[460px] flex flex-col justify-between rounded-lg bg-white shadow-md p-3 border border-gray-200 mx-auto"
      role="group"
      aria-label={`Movie card for ${movie.title}`}
    >
      {/* Movie poster */}
      <img
        src={
          movie.poster
            ? `https://image.tmdb.org/t/p/w500${movie.poster}`
            : "https://via.placeholder.com/500x750?text=No+Image"
        }
        alt={`Poster for ${movie.title}`}
        className="w-full h-50 object-contain rounded-md mb-2"
      />

      {/* Title */}
      <h2 className="text-base font-semibold mb-1 text-center">
        {movie.title}
      </h2>

      {/* Description */}
      <p className="text-gray-700 mb-2 text-xs text-center line-clamp-3">
        {movie.description}
      </p>

      {/* Showtime and available seat display */}
      <div className="flex flex-col gap-1 text-[11px] text-gray-600 mb-2 text-center">
        <span>Showtime: {movie.showtime}</span>
        <span>Available Seats: {availableSeats}</span>
      </div>

      {/* Seat selection input */}
      <label
        htmlFor={`seat-${movie.id}`}
        className="text-[11px] block mb-1 text-center"
      >
        Select number of seats (max 10):
      </label>
      <input
        id={`seat-${movie.id}`}
        type="number"
        min={1}
        max={10}
        value={seatCount}
        onChange={(e) => setSeatCount(Math.min(Number(e.target.value), 10))}
        className="mb-2 w-full rounded border p-1 text-xs"
      />

      {/* Book Now button or Sold Out */}
      <button
        className="w-full rounded bg-blue-600 text-white py-1 text-xs hover:bg-blue-700 transition disabled:opacity-50"
        onClick={handleBooking}
        disabled={availableSeats <= 0}
      >
        {availableSeats > 0 ? "Book Now" : "Sold Out"}
      </button>
    </fieldset>
  );
};

export const MovieCard = memo(MovieCardComponent);
