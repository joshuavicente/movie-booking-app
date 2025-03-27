// For testing TMDB API, uncomment the line //import "./tmdb-test"; in src/main.tsx
import axios from "axios";

const testTMDB = async () => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
    );

    console.log("✅ API Response:", res.data.results.slice(0, 3)); // just show top 3
  } catch (error) {
    console.error("❌ API failed:", error);
  }
};

testTMDB();
