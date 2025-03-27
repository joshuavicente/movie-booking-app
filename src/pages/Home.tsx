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
      {error && <p className="text-red-500">{error}</p>}

      {/* Movies list */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* Only show when data is available */}
        {!loading &&
          !error &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};
