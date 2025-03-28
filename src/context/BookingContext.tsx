import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { userMock } from "../mocks/userMock";
import { Booking } from "../model/bookingModel";
import { User } from "../model/userModel";

// Describes everything the context will store and expose
type BookingContextType = {
  bookings: Booking[]; // All current bookings
  user: Omit<User, "password"> | null; // Logged in user info
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  addBooking: (booking: Booking) => void;
  updateBooking: (id: string, updated: Partial<Booking>) => void;
  cancelBooking: (id: string) => void;
  movieSeatMap: Record<string, number>; // { [movieId]: availableSeats }
};

// Sets up a new Context — basically a tool that allows data sharing across components
const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Helper function to sync bookings to local storage by userId
const syncBookingsToLocalStorage = (
  userId: string,
  updatedBookings: Booking[]
) => {
  const storedBookings = localStorage.getItem("allBookings");
  const checkBookings = storedBookings ? JSON.parse(storedBookings) : []; // Prevents app from crashing with JSON.parse(null) and ensures valid JSON
  const otherUserBookings = checkBookings.filter(
    // Other bookings that don't belong to the current user
    (b: Booking) => b.userId !== userId
  );
  const mergedBookings = [...otherUserBookings, ...updatedBookings]; // Preserves bookings of other users and merges with current user's bookings
  localStorage.setItem("allBookings", JSON.stringify(mergedBookings));
};

// This is a wrapper component that holds the actual state and functions to share.
export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [user, setUser] = useState<Omit<User, "password"> | null>(null);
  const [movieSeatMap, setMovieSeatMap] = useState<Record<string, number>>({});

  // This function checks if the username and password match the mock user
  // and retrieves the bookings for that user
  const login = (username: string, password: string): boolean => {
    const foundUser = userMock.data.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      setUser({ id: foundUser.id, username: foundUser.username });
      const stored = localStorage.getItem("allBookings");
      if (stored) {
        const allBookingsStored = JSON.parse(stored) as Booking[];
        const userBookings = allBookingsStored.filter(
          (b) => b.userId === foundUser.id
        );
        setBookings(userBookings);

        // Calculate available seats for each movie for the logged-in user
        const seatMap: Record<string, number> = {};
        allBookingsStored.forEach((booking) => {
          seatMap[booking.movieId] = Math.max(
            (seatMap[booking.movieId] ?? 50) - booking.seatCount,
            0
          );
        });
        setMovieSeatMap(seatMap);
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setBookings([]);
  };

  // This function adds a new booking to the state and updates the available seats
  const addBooking = (booking: Booking) => {
    const seatCount = Math.min(booking.seatCount, 10); // Limit to 10 seats per booking
    const previousCount =
      movieSeatMap[booking.movieId] ?? booking.availableSeats ?? 0;
    const bookingWithUser = {
      ...booking,
      seatCount,
      username: user?.username || "",
      userId: user?.id || "",
    };

    setBookings((prev) => {
      const updatedBookings = [...prev, bookingWithUser];
      syncBookingsToLocalStorage(user?.id || "", updatedBookings);
      return updatedBookings;
    });

    // Update the available seats in the map
    setMovieSeatMap((prev) => ({
      ...prev,
      [booking.movieId]: Math.max(previousCount - seatCount, 0),
    }));
  };

  // This function updates an existing booking and adjusts the available seats accordingly
  const updateBooking = (id: string, updated: Partial<Booking>) => {
    setBookings((prev) => {
      const updatedBookings = prev.map((b) => {
        if (b.id === id) {
          const oldSeatCount = b.seatCount;
          const newSeatCount = Math.min(updated.seatCount ?? oldSeatCount, 10);
          const diff = oldSeatCount - newSeatCount;

          const previousCount =
            movieSeatMap[b.movieId] ?? b.availableSeats ?? 0;

          setMovieSeatMap((map) => ({
            ...map,
            [b.movieId]: Math.min(
              Math.max(previousCount + diff, 0), // Ensure it doesn't go negative
              50
            ),
          }));

          return { ...b, ...updated, seatCount: newSeatCount };
        }
        return b;
      });
      syncBookingsToLocalStorage(user?.id || "", updatedBookings);
      return updatedBookings;
    });
  };

  // This function cancels a booking and updates the available seats accordingly
  const cancelBooking = (id: string) => {
    setBookings((prev) => {
      const bookingToCancel = prev.find((b) => b.id === id);
      if (!bookingToCancel) return prev;
      const previousCount =
        movieSeatMap[bookingToCancel.movieId] ??
        bookingToCancel.availableSeats ??
        0;

      setMovieSeatMap((map) => ({
        ...map,
        [bookingToCancel.movieId]: Math.min(
          previousCount + bookingToCancel.seatCount,
          50
        ),
      }));

      const updatedBookings = prev.filter((b) => b.id !== id);
      syncBookingsToLocalStorage(user?.id || "", updatedBookings);
      return updatedBookings;
    });
  };

  // To load bookings for logged user from local storage on initial render
  useEffect(() => {
    const stored = localStorage.getItem("allBookings");
    if (stored) {
      const all = JSON.parse(stored) as Booking[];

      const seatMap: Record<string, number> = {};
      all.forEach((booking) => {
        seatMap[booking.movieId] = Math.max(
          (seatMap[booking.movieId] ?? 50) - booking.seatCount,
          0
        );
      });

      setMovieSeatMap(seatMap);
    }
  }, []);

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
    movieSeatMap,
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
