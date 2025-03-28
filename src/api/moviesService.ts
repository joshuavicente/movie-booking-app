import axios from "axios";

// TMDB API key from environment variables
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

// Fetch the "Now Playing" movies from TMDB API (page 1, English)
export const getNowPlayingMoviesService = async () => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
  );
  return res.data.results; // Return the list of movies
};
