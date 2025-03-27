import { createContext, useContext, useState, ReactNode } from "react";

// Represents each booking. When a user books a ticket,
// one of these gets added to the state
export type Booking = {
  id: string;
  movieId: string;
  movieTitle: string;
  showtime: string;
  seatCount: number;
};

// Defines a fake user model with a username and password
type User = {
  username: string;
  password: string;
};

// Describes everything the context will store and expose
type BookingContextType = {
  bookings: Booking[];
  user: Omit<User, "password"> | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  addBooking: (booking: Booking) => void;
  updateBooking: (id: string, updated: Partial<Booking>) => void;
  cancelBooking: (id: string) => void;
};

// Sets up a new Context — basically a tool that allows data sharing across components
const BookingContext = createContext<BookingContextType | undefined>(undefined);

// A fake user to use for login
const MOCK_USER: User = {
  username: "admin",
  password: "password123",
};

// This is a wrapper component that holds the actual state and functions to share.
export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [user, setUser] = useState<Omit<User, "password"> | null>(null);

  const login = (username: string, password: string): boolean => {
    if (username === MOCK_USER.username && password === MOCK_USER.password) {
      setUser({ username });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setBookings([]);
  };

  const addBooking = (booking: Booking) => {
    setBookings((prev) => [...prev, booking]);
  };

  const updateBooking = (id: string, updated: Partial<Booking>) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updated } : b))
    );
  };

  const cancelBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  // 'value' is the object being shared with any component that wants to consume this context
  const value: BookingContextType = {
    bookings,
    user,
    isLoggedIn: !!user, // Converts user to a boolean, if it doesn't exist, it's false
    login,
    logout,
    addBooking,
    updateBooking,
    cancelBooking,
  };

  // {children} means any components inside this provider will be able to access this shared state
  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};

// A custom hook that allows any component to access the shared state or context data
export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context)
    throw new Error("useBooking must be used within BookingProvider");
  return context;
};
