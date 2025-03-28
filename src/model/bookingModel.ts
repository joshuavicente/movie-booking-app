// Represents each booking. When a user books a ticket,
// one of these gets added to the state
export type Booking = {
  id: string;
  movieId: string;
  movieTitle: string;
  showtime: string;
  seatCount: number;
  availableSeats?: number;
  username: string;
  userId: string;
};
