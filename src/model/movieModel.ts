// Define the shape of a Movie
export type Movie = {
  id: string;
  title: string;
  description: string;
  availableSeats: number;
  showtime: string;
  poster: string;
};

// Define the shape of a Movie from TMDB API
export type TMDBMovie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
};

// Define the props that MovieCard component will receive
export type MovieCardProps = Readonly<{
  movie: Movie;
}>;
