import { useState } from "react";
import { useBooking } from "../context/BookingContext";
import { Movie } from "../hooks/useFetchMovies";
import { nanoid } from "nanoid";

// Define the props that this component will receive
type Props = Readonly<{
  movie: Movie;
}>;

export const MovieCard = ({ movie }: Props) => {
  const { bookings, addBooking, movieSeatMap } = useBooking();
  const [seatCount, setSeatCount] = useState(1);

  const availableSeats = movieSeatMap[movie.id] ?? movie.availableSeats;

  const handleBooking = () => {
    if (availableSeats < seatCount) {
      alert("Not enough seats available.");
      return;
    }

    const existingBooking = bookings.find((b) => b.movieId === movie.id);
    if (existingBooking) {
      alert(
        "You've already booked this movie. Please update it from My Bookings."
      );
      return;
    }

    const newBooking = {
      id: nanoid(),
      movieId: movie.id,
      movieTitle: movie.title,
      showtime: movie.showtime,
      seatCount,
      availableSeats,
    };

    addBooking(newBooking);
    alert(`Successfully booked ${seatCount} seat(s) for "${movie.title}"`);
    setSeatCount(1);
  };

  return (
    <fieldset
      className="rounded-lg bg-white shadow-md p-5 border border-gray-200"
      role="group"
      aria-label={`Movie card for ${movie.title}`}
    >
      <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
      <p className="text-gray-700 mb-3 line-clamp-3">{movie.description}</p>

      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
        <span>Showtime: {movie.showtime}</span>
        <span>Available Seats: {availableSeats}</span>
      </div>

      <label htmlFor={`seat-${movie.id}`} className="text-sm block mb-1">
        Select number of seats (max 10):
      </label>
      <input
        id={`seat-${movie.id}`}
        type="number"
        min={1}
        max={10}
        value={seatCount}
        onChange={(e) => setSeatCount(Math.min(Number(e.target.value), 10))}
        className="mb-3 w-24 rounded border p-1 text-sm"
      />

      <button
        className="w-full rounded bg-blue-600 text-white py-2 hover:bg-blue-700 transition disabled:opacity-50"
        onClick={handleBooking}
        disabled={availableSeats <= 0}
      >
        {availableSeats > 0 ? "Book Now" : "Sold Out"}
      </button>
    </fieldset>
  );
};
