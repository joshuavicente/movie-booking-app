// Represents a transformed movie used throughout the app
export type Movie = {
  id: string;
  title: string;
  description: string;
  availableSeats: number;
  showtime: string;
  poster: string;
};

// Raw movie shape returned from TMDB API
export type TMDBMovie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
};

// Props expected by the MovieCard component
export type MovieCardProps = Readonly<{
  movie: Movie;
}>;
