import { useEffect, useState } from "react";
import axios from "axios"; // Using axios to fetch movie data

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
        const apiKey = import.meta.env.VITE_TMDB_API_KEY; // Get the API key from .env
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
        );
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate 2sec fake loading delay

        // Transform TMDB response to match our Movie type
        const transformedMovies = response.data.results.map((movie: any) => ({
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
