import { useState } from "react";
import { useFetchMovies } from "../hooks/useFetchMovies";
import { MovieCard } from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { delay } from "../utils/delayHelper";

export const Home = () => {
  // Use custom hook to fetch movies from TMDB
  const { movies, loading, error, resetStoredData } = useFetchMovies();
  const [resetting, setResetting] = useState(false);

  const handleResetStoredData = async () => {
    if (window.confirm("Are you sure you want to reset the demo data?")) {
      setResetting(true);
      await delay(1000); // Simulate network delay
      resetStoredData();
      window.location.reload();
    }
  };

  return (
    <main className="p-6" role="main">
      {/* Page heading */}
      <h1 className="text-2xl font-bold mb-4">Now Playing</h1>

      {/* Show spinner on loading state*/}
      {(loading || resetting) && <LoadingSpinner />}

      {/* Error state */}
      {!loading && error && (
        <p className="text-red-500 text-lg" role="alert" aria-live="polite">
          ⚠️ {error}
        </p>
      )}

      {/* Empty list state */}
      {!loading && !error && movies.length === 0 && (
        <p className="text-gray-600 text-lg" aria-live="polite">
          No movies are currently available.
        </p>
      )}

      {/* Reset Local Stored Data */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => handleResetStoredData()}
          disabled={resetting} // Disable button while resetting
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Reset Demo
        </button>
      </div>

      {/* Movies list */}
      {!loading && !error && movies.length > 0 && (
        <div
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          aria-label="Now Playing Movies"
        >
          {movies.map((movie) => (
            <div key={movie.id} aria-label={`Movie card for ${movie.title}`}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
};
