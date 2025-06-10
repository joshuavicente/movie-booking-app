import { Booking } from "./bookingModel";
import { User } from "./userModel";

export interface BookingContextType{
  bookings: Booking[];
  user: Omit<User, "password"> | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  addBooking: (booking: Booking) => void;
  updateBooking: (id: string, updated: Partial<Booking>) => void;
  cancelBooking: (id: string) => void;
  movieSeatMap: Record<string, number>;
};