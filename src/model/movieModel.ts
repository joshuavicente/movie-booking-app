// Define the shape of a Movie
export type Movie = {
  id: string;
  title: string;
  description: string;
  availableSeats: number;
  showtime: string;
};

// Define the props that MovieCard component will receive
export type MovieCardProps = Readonly<{
  movie: Movie;
}>;
