import { useState } from "react";
import { useFetchMovies } from "../hooks/useFetchMovies";
import { MovieCard } from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { delay } from "../utils/delayHelper";

export const Home = () => {
  const { movies, loading, error, resetStoredData } = useFetchMovies();
  const [resetting, setResetting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  // Handler to reset locally stored movies and bookings (demo reset)
  const handleResetStoredData = async () => {
    if (window.confirm("Are you sure you want to reset the demo data?")) {
      setResetting(true);
      await delay(1000); // Simulate loading state
      resetStoredData();
      alert("Demo data reset successfully");
      window.location.reload();
    }
  };

  return (
    <main className="p-6" role="main">
      {/* Page heading and reset button */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Now Playing</h1>
        <button
          onClick={handleResetStoredData}
          disabled={resetting}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Reset Demo
        </button>
      </div>

      {/* Loading spinner */}
      {(loading || resetting) && <LoadingSpinner />}

      {/* Error message */}
      {!loading && error && (
        <p className="text-red-500 text-lg" role="alert" aria-live="polite">
          ⚠️ {error}
        </p>
      )}

      {/* Empty movies fallback */}
      {!loading && !error && movies.length === 0 && (
        <p className="text-gray-600 text-lg" aria-live="polite">
          No movies are currently available.
        </p>
      )}

      {/* Movies list with pagination */}
      {!loading && !error && currentMovies.length > 0 && (
        <>
          {/* Pagination controls */}
          <div className="flex justify-center mt-6 gap-2 mb-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`px-3 py-1 text-sm rounded ${
                  num === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>

          {/* Movie cards grid */}
          <div
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
            aria-label="Now Playing Movies"
          >
            {currentMovies.map((movie) => (
              <div key={movie.id} aria-label={`Movie card for ${movie.title}`}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
};
