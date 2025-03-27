import axios from "axios"; // Using axios to fetch movie data
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export const getNowPlayingMoviesService = async () => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
  );
  return res.data.results;
};
