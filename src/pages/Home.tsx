import { useFetchMovies } from "../hooks/useFetchMovies";
import { MovieCard } from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const Home = () => {
  // Use custom hook to fetch movies from TMDB
  const { movies, loading, error } = useFetchMovies();

  return (
    <div className="p-6">
      {/* Page heading */}
      <h1 className="text-2xl font-bold mb-4">Now Playing</h1>

      {/* Loading state */}
      {loading && <LoadingSpinner />}

      {/* Error state */}
      {!loading && error && <p className="text-red-500 text-lg">⚠️ {error}</p>}

      {/* Empty list state */}
      {!loading && !error && movies.length === 0 && (
        <p className="text-gray-600 text-lg">
          No movies are currently available.
        </p>
      )}

      {/* Movies list */}
      {!loading && !error && movies.length > 0 && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};
