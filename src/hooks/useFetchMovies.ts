import { useEffect, useState } from "react";
import { getNowPlayingMoviesService } from "../api/moviesService";
import { delay } from "../utils/delayHelper";
import { Movie, TMDBMovie } from "../model/movieModel";

// This hook returns loading state, error, and the movie list
export const useFetchMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // It runs once when the component mounts (useEffect)
  useEffect(() => {
    const storedMovies = localStorage.getItem("movies");
    if (storedMovies) {
      setMovies(JSON.parse(storedMovies));
      setLoading(false);
      return;
    }

    const fetchMovies = async () => {
      try {
        const response = await getNowPlayingMoviesService();
        await delay(1000); // Simulate network delay

        // Transform TMDB response to match our Movie type
        const transformedMovies = response.map((movie: TMDBMovie) => ({
          id: movie.id.toString(),
          title: movie.title,
          description: movie.overview,
          showtime: "7:00 PM",
          availableSeats: 50,
          poster: movie.poster_path,
        }));
        setMovies(transformedMovies);
        localStorage.setItem("movies", JSON.stringify(transformedMovies));
        setLoading(false);
      } catch (err) {
        console.log("Failed to fetch movies:", err);
        setError("Failed to fetch movies");
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // This function is used to reset the stored movies and bookings
  // in local storage for demo purposes
  const resetStoredData = () => {
    localStorage.removeItem("movies");
    localStorage.removeItem("allBookings");
  };

  return { movies, loading, error, resetStoredData };
};
