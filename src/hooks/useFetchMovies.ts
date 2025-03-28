import { useEffect, useState } from "react";
import { getNowPlayingMoviesService } from "../api/moviesService";
import { delay } from "../utils/delayHelper";
import { Movie, TMDBMovie } from "../model/movieModel";

// Custom hook for fetching and transforming TMDB movie data
export const useFetchMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedMovies = localStorage.getItem("movies");

    // Load cached movies if available
    if (storedMovies) {
      setMovies(JSON.parse(storedMovies));
      setLoading(false);
      return;
    }

    // Fetch and transform TMDB movies, then store in localStorage
    const fetchMovies = async () => {
      // Function to simulate a random showtime
      const getRandomShowtime = () => {
        const hours = Math.floor(Math.random() * 12) + 1; // 1 to 12
        const minutes = Math.random() < 0.5 ? "00" : "30";
        const period = Math.random() < 0.5 ? "AM" : "PM";
        return `${hours}:${minutes} ${period}`;
      };

      try {
        const response = await getNowPlayingMoviesService();
        await delay(1000); // Simulated delay for demonstration

        const transformedMovies = response.map((movie: TMDBMovie) => ({
          id: movie.id.toString(),
          title: movie.title,
          description: movie.overview,
          showtime: getRandomShowtime(),
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

  // Clears local storage (movies and bookings) — used for demo reset
  const resetStoredData = () => {
    localStorage.removeItem("movies");
    localStorage.removeItem("allBookings");
  };

  return { movies, loading, error, resetStoredData };
};
