import { Movie } from "../hooks/useFetchMovies";

// Define the props that this component will receive
type Props = Readonly<{
  movie: Movie;
}>;

export const MovieCard = ({ movie }: Props) => {
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

      {/* Book Now Button (logic to be added later) */}
      <button
        className="w-full rounded bg-blue-600 text-white py-2 hover:bg-blue-700 transition"
        onClick={() => alert(`Booking ${movie.title}...`)}
      >
        Book Now
      </button>
    </div>
  );
};
