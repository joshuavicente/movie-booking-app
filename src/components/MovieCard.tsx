import { useBooking } from "../context/BookingContext";
import { Movie } from "../hooks/useFetchMovies";
import { nanoid } from "nanoid";

// Define the props that this component will receive
type Props = Readonly<{
  movie: Movie;
}>;

export const MovieCard = ({ movie }: Props) => {
  const { addBooking } = useBooking();

  const handleBooking = () => {
    if (movie.availableSeats <= 0) {
      alert("No seats available for this movie.");
      return;
    }

    const newBooking = {
      id: nanoid(),
      movieId: movie.id,
      movieTitle: movie.title,
      showtime: movie.showtime,
      seatCount: 1, // Currently fixed to 1 seat per booking
    };

    addBooking(newBooking);
    alert(`Successfully booked "${movie.title}"!`);
  };

  return (
    <div className="rounded-lg bg-white shadow-md p-5 border border-gray-200">
      {/* Movie Title */}
      <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>

      {/* Movie Description */}
      <p className="text-gray-700 mb-3 line-clamp-3">{movie.description}</p>

      {/* Showtime and Seats info */}
      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
        <span>Showtime: {movie.showtime}</span>
        <span>Available Seats: {movie.availableSeats}</span>
      </div>

      {/* Book Now Button */}
      <button
        className="w-full rounded bg-blue-600 text-white py-2 hover:bg-blue-700 transition"
        onClick={handleBooking}
        disabled={movie.availableSeats <= 0}
      >
        {movie.availableSeats > 0 ? "Book Now" : "Sold Out"}
      </button>
    </div>
  );
};
