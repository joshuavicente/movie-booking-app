import { useEffect, useState } from "react";
import { getNowPlayingMoviesService } from "../api/moviesService";

// Define the shape of a Movie
export type Movie = {
  id: string;
  title: string;
  description: string;
  availableSeats: number;
  showtime: string;
};

// This hook returns loading state, error, and the movie list
export const useFetchMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // It runs once when the component mounts (useEffect)
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getNowPlayingMoviesService(); // Use the service function
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate 2sec fake loading delay

        // Transform TMDB response to match our Movie type
        const transformedMovies = response.map((movie: any) => ({
          id: movie.id.toString(),
          title: movie.title,
          description: movie.overview,
          showtime: "7:00 PM", // You can randomize this or use static for now
          availableSeats: Math.floor(Math.random() * 100) + 1, // Random seats for demo
        }));

        setMovies(transformedMovies);
        setLoading(false);
      } catch (err) {
        console.log("Failed to fetch movies:", err);
        setError("Failed to fetch movies");
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
};
