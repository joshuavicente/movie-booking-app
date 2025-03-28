// Represents a single movie booking by a user
export type Booking = {
  id: string;
  movieId: string;
  movieTitle: string;
  showtime: string;
  seatCount: number;
  availableSeats?: number; // Optional, used for reference during updates
  username: string;
  userId: string;
};

// Props expected by the BookingCard component
export type BookingCardProps = {
  booking: Booking;
  seatCount: number;
  isUpdating: boolean;
  isCancelling: boolean;
  onSeatChange: (value: number) => void;
  onUpdate: () => void;
  onCancel: () => void;
};
